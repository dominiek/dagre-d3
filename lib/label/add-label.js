var addTextLabel = require("./add-text-label"),
    addHtmlLabel = require("./add-html-label"),
    addSVGLabel  = require("./add-svg-label");

module.exports = addLabel;

function addLabel(root, node, location) {
  var label = node.label;
  var labelSvg = root.append("g");

  // Allow the label to be a string, a function that returns a DOM element, or
  // a DOM element itself.
  if (node.labelType === "svg") {
    addSVGLabel(labelSvg, node);
  } else if (typeof label !== "string" || node.labelType === "html") {
    addHtmlLabel(labelSvg, node);
  } else {
    addTextLabel(labelSvg, node);
  }

  var labelBBox = labelSvg.node().getBBox();
  var y;
  var x = (-labelBBox.width / 2);
  switch(location) {
    case "top":
    case "top-center":
      y = (-node.height / 2);
      break;
    case "top-left":
      y = (-node.height / 2);
      x = (-node.width / 2);
      break;
    case "top-right":
      y = (-node.height / 2);
      x = (node.width / 2) - labelBBox.width;
      break;
    case "bottom":
    case "bottom-center":
      y = (node.height / 2) - labelBBox.height;
      break;
    case "bottom-left":
      y = (node.height / 2) - labelBBox.height;
      x = (-node.width / 2);
      break;
    case "bottom-right":
      y = (node.height / 2) - labelBBox.height;
      x = (node.width / 2) - labelBBox.width;
      break;
    default:
      y = (-labelBBox.height / 2);
  }
  labelSvg.attr("transform",
                "translate(" + x + "," + y + ")");

  return labelSvg;
}
