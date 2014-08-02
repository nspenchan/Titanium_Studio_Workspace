module.exports = function () {
  var view = Ti.UI.createView({
  	backgroundColor: "#fff",
  });
  var label = Ti.UI.createLabel({
    text: "Hello"
  });
  view.add(label);
  return view;
};