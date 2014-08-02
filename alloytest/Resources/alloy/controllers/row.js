function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "row";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        width: Ti.UI.FILL,
        height: "86dp",
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.title = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        left: "24dp",
        color: "#a62901",
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        },
        text: "Menu",
        id: "title"
    });
    $.__views.row.add($.__views.title);
    $.__views.image = Ti.UI.createImageView({
        width: "120dp",
        height: "60dp",
        right: "24dp",
        id: "image",
        image: "/image1.jpg"
    });
    $.__views.row.add($.__views.image);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.row.backgroundColor = args.bgcolor ? "faf8f5" : "#eee4db";
    $.title.text = "Menu" + args.id;
    $.image.image = "/image" + args.id + ".jpg";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;