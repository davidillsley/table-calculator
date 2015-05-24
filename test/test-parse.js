var parse = require("lib/parse")

exports.test_parse_1 = function (test) {
  checkResults(test, parse.parseSelection("<td>1</td>"), [1]);
}

exports.test_parse_2 = function (test) {
  checkResults(test, parse.parseSelection("<td>1</td><td>2</td>"), [1,2]);
}

exports.test_parse_3 = function (test) {
  checkResults(test, parse.parseSelection("<td>1</td><td>2</td><td>3</td></tr>"), [1,2,3]);
}

exports.test_parse_4 = function (test) {
  checkResults(test, parse.parseSelection("<td>(1)</td><td>2</td><td>3</td></tr>"), [-1,2,3]);
}

exports.test_parse_5 = function (test) {
  checkResults(test, parse.parseSelection("<td>(-1)</td><td>2</td><td>3</td></tr>"), [1,2,3]);
}

exports.test_parse_6 = function (test) {
  checkResults(test, parse.parseSelection("<td>+1</td><td>2</td><td>3</td></tr>"), [1,2,3]);
}

function checkResults(test, results, numbers){
  test.assertEqual(numbers.length, results.length)
  for(var i in results){
    test.assertEqual(results[i],numbers[i]);
  }
}
