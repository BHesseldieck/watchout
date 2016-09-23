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

//create axes why?
var axes = {
  x: d3.scale.linear().domain([0, 100]).range([0, gameOptions.width]),
  y: d3.scale.linear().domain([0, 100]).range([0, gameOptions.height])
};

//create a board that is svg of given width and height above
d3.select('.board').append('svg:svg')
                .attr('width', gameOptions.width)
                .attr('height', gameOptions.height);

//set variables so that we can use them in creating enemies
var svg = d3.select('svg');
//+ turns it to number instead of string
var width = +svg.attr('width');
var height = +svg.attr('height');
var radius = 20;

//create enemiesat random x and y location
var enemyCircles = d3.range(0, gameOptions.nEnemies).map(function(i) {
  return {
    id: i,
    x: Math.floor(Math.random() * ( width - radius * 2)),
    y: Math.floor(Math.random() * ( width - radius * 2))
  }; 
});

//bind d3 data of coordinates and radius to enemy circles
//and set to color white
//this has to be circle because we are making circle elements
//with a circle x and circle y and radius?
svg.selectAll('circleEnemey')
	.data(enemyCircles)
	.enter().append('circle')
		.attr('cx', function(d) { return d.x; })
		.attr('cy', function(d) { return d.y; })
		.attr('r', radius)
		.style('fill', 'black');
		//can set to random color following the tutorial

var player = {id: 99999, x: 100, y: 100};
//make a player and append to svg container
svg.append('circle')
		.attr('cx', player.x)
		.attr('cy', player.y)
		.attr('r', radius)
		.style('fill', 'red')
		.call(d3.drag()
			.on('start', dragStarted)
			.on('drag', dragged)
			.on('end', dragEnded));

//make player draggable --> when dragged, call dragstarted
//when moving, call dragged/ when done, call end


//dragstarted happens on start--> creates active class
//using raise to allow movement
var dragStarted = function(d) {
  d3.select(this).raise().classed('active', true);
};

//during drag, allows cx and cy to change to where you move them
var dragged = function(d) {
  d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y);
};

//after drag, set raise to false
var dragEnded = function(d) {
  d3.select(this).classed('active', false);
};

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
