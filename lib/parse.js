exports.parseSelection = function(selectionHtmlString){
    var count = 0;
    var values = {};
    var myRe = />\s*([\(]?[\+|\-]?[\d|\,]+\.?\d*\)?)[\s|\%|\)]*</g;
    var myArray;
    while ((myArray = myRe.exec(selectionHtmlString)) != null)  {
      var extractedNumber = myArray[1].replace(",","","g").replace("\(","-").replace("\)","").replace("--","")  
      values[count] = extractedNumber;
      count++;
    }
    var numbers = new Array(count);
    for(var i in values){
      numbers[i] = parseFloat(values[i]);
    }
    return numbers;
}

