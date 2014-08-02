function Controller() {
    function clickImage() {
        Titanium.UI.createAlertDialog({
            title: "Image View",
            message: "You clicked me!"
        }).show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "apple";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.apple = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "apple"
    });
    $.__views.apple && $.addTopLevelView($.__views.apple);
    $.__views.imageView = Ti.UI.createImageView({
        image: "/images/apple_logo.jpg",
        width: 24,
        height: 24,
        top: 100,
        id: "imageView"
    });
    $.__views.apple.add($.__views.imageView);
    clickImage ? $.__views.imageView.addEventListener("click", clickImage) : __defers["$.__views.imageView!click!clickImage"] = true;
    $.__views.l = Ti.UI.createLabel({
        bottom: 20,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#999",
        text: "Click Image of Apple Logo",
        id: "l"
    });
    $.__views.apple.add($.__views.l);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.apple.open();
    __defers["$.__views.imageView!click!clickImage"] && $.__views.imageView.addEventListener("click", clickImage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;