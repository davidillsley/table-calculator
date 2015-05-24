var stats = require("lib/stats")

exports.test_stats_1 = function (test) {
  var results = stats.calculate([1])
  // {"numbers":[1],"count":1,"total":1,"mean":1,"median":1}
  test.assertEqual(1, results.numbers)
  test.assertEqual(1, results.count)
  test.assertEqual(1, results.total)
  test.assertEqual(1, results.mean)
  test.assertEqual(1, results.median)
}
