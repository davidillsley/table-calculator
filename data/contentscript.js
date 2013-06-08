self.port.on("numbersDetails", function(myAddonEventPayload) {
  // Handle the event
  var numbersString = "";
  for(i in myAddonEventPayload.numbers){
      if(i!=0){
          numbersString+=", ";
      }
      numbersString+=myAddonEventPayload.numbers[i];
  }
  var shortString = numbersString;
  if(numbersString.length > 250){
      shortString = numbersString.substring(0,249)+"...";
  }
  
  document.getElementById("numbers").textContent = shortString;
  document.getElementById("count").textContent = myAddonEventPayload.count;
  document.getElementById("total").textContent = myAddonEventPayload.total;
  document.getElementById("mean").textContent = myAddonEventPayload.mean;
  document.getElementById("median").textContent = myAddonEventPayload.median;
  document.getElementById("listCopy").addEventListener("click", function(){self.port.emit("stringForClipboard",{"string":numbersString})});
  document.getElementById("sumCopy").addEventListener("click", function(){self.port.emit("numberForClipboard",{"number":myAddonEventPayload.total})});
  document.getElementById("meanCopy").addEventListener("click", function(){self.port.emit("numberForClipboard",{"number":myAddonEventPayload.mean})});
  document.getElementById("medianCopy").addEventListener("click", function(){self.port.emit("numberForClipboard",{"number":myAddonEventPayload.median})});
});