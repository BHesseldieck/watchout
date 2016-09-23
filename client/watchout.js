// start slingin' some d3 here.
var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0
};

var axes = {
  x: d3.scale.linear().domain([0, 100]).range([0, gameOptions.width]),
  y: d3.scale.linear().domain([0, 100]).range([0, gameOptions.height])
};

d3.select('.board').append('svg:svg')
                .attr('width', gameOptions.width)
                .attr('height', gameOptions.height);

var svg = d3.select('svg');
//+ turns it to number instead of string
var width = +svg.attr('width');
var height = +svg.attr('height');
var radius = 32;
//create enemies

var circles = d3.range(0, gameOptions.nEnemies).map(function(i) {
  return {
    id: i,
    x: Math.floor(Math.random() * ( width - radius * 2)),
    y: Math.floor(Math.random() * ( width - radius * 2))
  }; 
});

svg.selectAll('circle')
	.data(circles)
	.enter().append('circle')
		.attr('cx', function(d) { return d.x; })
		.attr('cy', function(d) { return d.y; })
		.attr('r', radius)
		.style('fill', function(d, i) { return 'white'; });

//remember to add dragability on these

//score updates
var updateScore = function() { 
  d3.select('#current-score')
    .text(gameStats.score.toString());
};

var updateBestScore = function() {
  gameStats.bestScore =
    _.max [gameStats.bestScore, gameStats.score];

  d3.select('#best-score').text(gameStats.bestScore.toString());
};
