var selection = require("selection");
var cm = require("context-menu");
cm.Item({
  label: "Crunch these numbers...",
  context: [cm.SelectorContext("td")],
  contentScript: 'self.on("click", function (node, data) {' +
                 ' self.postMessage("");' +
                 '});',
  onMessage: function () {
    var selectionString = "";    
    if(selection.html){
      if (!selection.isContiguous) {
        for (var subselection in selection) {
          selectionString = selectionString +subselection.html;
        } 
      }else{
        selectionString = selection.html
      }
    }
    var count = 0;
    var values = {};
    var myRe = />\s*([\(]?[\+|\-]?[\d|\,]+\.?\d*\)?)[\s|\%|\)]*</g; 
    while ((myArray = myRe.exec(selectionString)) != null)  {
      var extractedNumber = myArray[1].replace(",","","g").replace("\(","-").replace("\)","").replace("--","")  
      var num = parseFloat(extractedNumber)
      values[count] = num;
      count++;
    }
    var total = 0;
    var numbers = new Array(count);
    for(i in values){
      total +=values[i];
      numbers[i] = values[i];
    }
    const data = require("self").data;
    var panel = require("panel").Panel({
      contentURL: data.url("content.html"),
      contentScriptFile: data.url("contentscript.js")
    });
    numbers.sort(function(a,b){return a-b});
    var mean = 0;
    var median = 0;
    if(count != 0){
      mean = total/count;
      if(count == 1){
        median = numbers[0];
      }else if(count%2 == 1){
        median = (numbers[(count-1)/2]+numbers[(count+1)/2])/2;
      }else{
        median = numbers[count/2];
      }
    }
    panel.port.on("numberForClipboard",function(numberFromScript){require("clipboard").set(""+numberFromScript.number)})
    panel.port.on("stringForClipboard",function(stringFromScript){require("clipboard").set(stringFromScript.string)})
    panel.port.emit("numbersDetails",{"numbers":numbers, "count":count,"total":total.toFixed(4),"mean":mean.toFixed(4),"median":median.toFixed(4)});
    panel.show();
  }
})




