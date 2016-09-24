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
var width = Number(svg.attr('width'));
var height = Number(svg.attr('height'));
var radius = 20;

//create enemiesat random x and y location
var enemyCircles = d3.range(0, gameOptions.nEnemies).map(function(i) {
  return {
    id: i,
    x: Math.floor(Math.random() * ( width - radius * 2)),
    y: Math.floor(Math.random() * ( height - radius * 2))
  }; 
});

//bind d3 data of coordinates and radius to enemy circles
//and set to color white
//this has to be circle because we are making circle elements
//with a circle x and circle y and radius?
svg.selectAll('.enemyCircle')
	.data(enemyCircles, function(d) { return d.id; })
	.enter().append('circle')
    .attr('class', 'enemyCircle')
		.attr('cx', function(d) { return d.x; })
		.attr('cy', function(d) { return d.y; })
		.attr('r', radius)
		.style('fill', 'black');


//move to a new random location every second
var enemyNewLocation = function() {
  svg.selectAll('circle.enemyCircle')
    .data(enemyCircles)
    .transition()
      .duration(750)
    .attr('cx', function (d) { return d.x = Math.floor(Math.random() * ( width - radius * 2)); })
    .attr('cy', function (d) { return d.y = Math.floor(Math.random() * ( height - radius * 2) + radius); });
};    
//cool thing for later: change radius every second as well

//interval function that calls update function
setInterval(enemyNewLocation, 1000);
  //update function 
    //calls enemyNewLocation
    //calls playerNewLocation
    //calls score update

//players
var player = [{id: 999, x: 300, y: 300}];
//make a player and append to svg container
//remember this binding!
var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on('dragstart', function (d) { return dragstarted.bind(this)(d); })
    .on('drag', function(d) { return dragged.bind(this)(d); })
    .on('dragend', function(d) { return dragended.bind(this)(d); });


svg.selectAll('.player')
  .data(player)
  .enter().append('circle')
      .attr('class', 'player')
      .attr('cx', function(d) { return d.x; })
      .attr('cy', function(d) { return d.y; })
      .attr('r', radius)
      .style('fill', 'red')
      .call(drag);
//make player draggable --> when dragged, call dragstarted
//when moving, call dragged/ when done, call end


//dragstarted happens on start--> creates active class
//using raise to allow movement
var dragstarted = function(d) {
  d3.select(this).classed('dragging', true);

};

//during drag, allows cx and cy to change to where you move them
//we can't use svg.select(this) -- it gives us an error that we
//cannot query the object... does that mean it can't get object SVGcircle from the svg? 
var dragged = function(d) {
  d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y);
};

//after drag, set raise to false
var dragended = function(d) {
  d3.select(this).classed('dragging', false);
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