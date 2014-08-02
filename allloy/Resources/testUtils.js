function resetTestApp(callback) {
    var paths = exports.paths;
    wrench.rmdirSyncRecursive(paths.harness, true);
    wrench.mkdirSyncRecursive(paths.harness, 511);
    wrench.copyDirSyncRecursive(paths.harnessTemplate, paths.harness);
    exec('alloy new "' + paths.harness + '"', function(error) {
        if (error) {
            console.error("Failed to create new alloy project at " + paths.harness);
            process.exit();
        }
        callback();
    });
}

function getExecObject(args) {
    args = Array.prototype.slice.call(args, 0);
    return {
        error: args[0],
        stdout: args[1],
        stderr: args[2]
    };
}

function toBeTssFile() {
    var actual = this.actual;
    var style;
    try {
        var die = U.die;
        U.die = function(msg, e) {
            U.die = die;
            throw U.createErrorOutput(msg, e);
        };
        style = styler.loadStyle(actual);
        U.die = die;
    } catch (e) {
        U.die = die || U.die;
        return false;
    }
    if (_.isObject(style)) return true;
    return false;
}

function toBeJavascript() {
    try {
        return uglifyjs.parse(this.actual);
    } catch (e) {
        return false;
    }
}

function toBeJavascriptFile(expected) {
    var actual = this.actual;
    var notText = this.isNot ? " not" : "";
    this.message = function() {
        return "Expected " + actual + notText + " to be a Javascript file";
    };
    try {
        var js = fs.readFileSync(this.actual, "utf8");
        return toBeJavascript.call({
            actual: js
        }, expected);
    } catch (e) {
        return false;
    }
}

var exec = require("child_process").exec, fs = require("fs"), os = require("os"), wrench = require("wrench"), path = require("path"), _ = require("../../Alloy/lib/alloy/underscore")._, uglifyjs = require("uglify-js"), U = require("../../Alloy/utils"), styler = require("../../Alloy/commands/compile/styler");

var alloyRoot = path.join(__dirname, "..", "..");

var IS_WIN = /^win/i.test(os.platform());

exports.TIMEOUT_DEFAULT = IS_WIN ? 5e3 : 2e3;

exports.paths = {
    templates: path.join(alloyRoot, "Alloy", "template"),
    harnessTemplate: path.join(alloyRoot, "test", "projects", "HarnessTemplate"),
    harness: path.join(alloyRoot, "test", "projects", "Harness")
};

exports.asyncExecTest = function(cmd, opts) {
    opts = opts || {};
    runs(function() {
        var self = this;
        self.done = false;
        var asyncFunc = function() {
            exec(cmd, function() {
                self.done = true;
                self.output = getExecObject(arguments);
            });
        };
        opts.reset ? resetTestApp(function() {
            asyncFunc();
        }) : asyncFunc();
    });
    waitsFor(function() {
        return this.done;
    }, 'exec("' + cmd + '") timed out', opts.timeout || exports.TIMEOUT_DEFAULT);
    runs(opts.test || function() {
        expect(this.output.error).toBeNull();
    });
};

exports.addMatchers = function() {
    beforeEach(function() {
        this.addMatchers({
            toBeJavascript: toBeJavascript,
            toBeJavascriptFile: toBeJavascriptFile,
            toBeTssFile: toBeTssFile,
            toHaveNoUndefinedStyles: function() {
                return !_.find(this.actual, function(o) {
                    return "undefined" === o.key && o.isApi;
                });
            },
            toHaveSameContentAs: function(expected) {
                return U.normalizeReturns(fs.readFileSync(this.actual, "utf8")) === U.normalizeReturns(fs.readFileSync(expected, "utf8"));
            },
            toExist: function() {
                return path.existsSync(this.actual);
            },
            toBeArray: function() {
                return _.isArray(this.actual);
            },
            toBeObject: function() {
                return _.isObject(this.actual);
            }
        });
    });
};