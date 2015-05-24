exports.calculate = function(numbers){
    var total = 0;
    for(var i in numbers){
      total+=numbers[i]
    }
    var mean = 0;
    var median = 0;
    if(numbers.length != 0){
      mean = total/numbers.length;
      if(numbers.length  == 1){
        median = numbers[0];
      }else if(numbers.length %2 == 1){
        median = (numbers[(numbers.length -1)/2]+numbers[(numbers.length +1)/2])/2;
      }else{
        median = numbers[numbers.length /2];
      }
    }
    return {
            "numbers":numbers.sort(function(a,b){return a-b}),
            "count":numbers.length,
            "total":total,
            "mean":mean,
            "median":median
           };
}

