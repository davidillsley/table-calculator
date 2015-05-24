var selection = require("sdk/selection");
var cm = require("sdk/context-menu");

cm.Item({
  label: "Crunch these numbers...",
  context: [cm.SelectorContext("td")],
  contentScript: 'self.on("click", function (node, data) {' +
                 ' self.postMessage("");' +
                 '});',
  onMessage: showPanel
})

function showPanel() {
  var selectionString = flattenSelection();
  var numbers = require("./parse").parseSelection(selectionString);
  var panel = require("sdk/panel").Panel({
    contentURL: "./content.html",
    contentScriptFile: "./contentscript.js"
  });

  panel.port.on("setClipboard", function(data) {
    require("sdk/clipboard").set(data.value.toString())
  })

  panel.port.emit("numbersDetails",require("./stats").calculate(numbers));
  panel.show();
}

function flattenSelection(){
   var selectionString = "";
   if(selection.html){
      if (!selection.isContiguous) {
        for (var subselection in selection) {
          selectionString = selectionString + subselection.html;
        }
      }else{
        selectionString = selection.html
      }
    }
    return selectionString;
}
