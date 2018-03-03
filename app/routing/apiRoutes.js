var friendData = require("../data/friends");
module.exports = function (app) {
  app.get("/api/friends", function (req, res) {
    res.json(friendData);
  });

  app.post("/api/friends", function (req, res) {
    var finalScore = [];
    var minIndex;
    //console.log(req.body)
    var me = req.body;
    friendData.forEach(function (friend) {
      finalScore.push(compareScore(me, friend));
    })
    minIndex = findMinPosition(finalScore);
    friendData.push(req.body);
    res.json(friendData[minIndex]);
  });

  app.post("/api/clear", function () {
    friendData = [];
  });
};

function compareScore(me, friend) {
  var totalScore = 0;
  for (var i = 0; i < 10; i++) {
    totalScore += Math.abs(parseInt(me.scores[i]) - parseInt(friend.scores[i]))
    //console.log("for"+ i + ":" + Math.abs(parseInt(friend.scores[i])));
    // console.log("for"+ i + ":" + Math.abs(parseInt(myScore.scores[i])));
    // console.log("total score" + totalScore);
    // console.log(totalScore);
  }
  return totalScore;
}
function findMinPosition(arr) {
  if (arr.length === 0) {
    return -1;
  }
  var min = arr[0];
  var minIndex = 0;
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      minIndex = i;
      min = arr[i];
    }
  }
  return minIndex;
}