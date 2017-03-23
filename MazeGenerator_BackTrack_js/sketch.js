// Maze Generator
// Depth-first Search
// Recursive Backtracker
// Array 2D

//global variables
var cols, rows;
var w = 20;
var grid = [];
var current;

var stack = [];

var counter = 0;

function setup(){
  //creating canvas
  createCanvas(400,400);
  frameRate(10);

  //scaling the grid
  cols = width/w;
  rows = width/w;

  //making 2D array;
  for (i = 0; i < rows; i++){
    for(j = 0; j < cols; j++){
      grid[i] = [];
    }
  }

  //adding object to every array
    for (i = 0; i < rows; i++){
      for(j = 0; j < cols; j++){
        var temp = new Cell( i, j);
        // console.log(temp);
        grid[i][j] = temp;
        // console.log(grid[i][j]);
      }
    }

  current = grid[0][0];
}

function draw(){
  //drawing canvas
  background(51);

  //drawing the grid
  for(i = 0; i < rows; i++){
    for(j = 0; j < cols; j++){
      grid[i][j].show();
    }
  }

  current.vissited = true;
  current.hightlight();

  //STEP 1
  var next = current.checkNeighbors();
  if(next){
    next.vissited = true;

    //STEP 2
    stack.push(current);

    //STEP 3
    removeWalls(current, next);

    //STEP 4
      current = next;
      if(counter < 100){
        counter++;
      }
      else {
        counter = 0;
        console.log("counter");
      }

  }else if (stack.length > 0){

    //STEP 1
    var cell = stack.pop();

    //STEP 2
    current = cell;
  }
}


function Cell( i, j){
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.vissited = false;

  this.show = function(){
    var x = this.i * w;
    var y = this.j * w;
    stroke(255);

    //declaring walls
    if(this.walls[0])  line(x    , y    , x + w, y    ); // top wall
    if(this.walls[1])  line(x + w, y    , x + w, y + w); // right wall
    if(this.walls[2])  line(x + w, y + w, x    , y + w); // bottom wall
    if(this.walls[3])  line(x    , y + w, x    , y    ); // left wall

    if(this.vissited){
      noStroke();
      fill(255, 0, 255, 100);
      rect(x,y,w,w);
    }
  }

  this.hightlight = function(){
      var x = this.i * w;
      var y = this.j * w;
      noStroke();
      fill(0, 0, 255, 100);
      rect(x,y,w,w);
  }



  this.checkNeighbors = function(){
    var neighbors = [];

    //checking for neighbors
    if( j-1 >= 0){
      var top = grid[i][j-1];
      // console.log(top);
    }
    if( i + 1 <= rows - 1){
      var right = grid[i+1][j];
      // console.log(right);
    }
    if( j + 1 <= cols - 1){
      var bottom = grid[i][j+1];
      // console.log(bottom);
    }
    if( i - 1 >= 0){
      var left = grid[i-1][j];
      // console.log(left);
    }

    //adding available neighbors
    if(counter == 99){
      if(top)    neighbors.push(top);
      if(right)  neighbors.push(right);
      if(bottom) neighbors.push(bottom);
      if(left)   neighbors.push(left);
    } else {
      if(top && !top.vissited)    neighbors.push(top);
      if(right && !right.vissited)  neighbors.push(right);
      if(bottom && !bottom.vissited) neighbors.push(bottom);
      if(left && !left.vissited)   neighbors.push(left);
    }

    // making its move
    if(neighbors.length > 0){
      var r = floor(random(0,neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }

  }
}

function removeWalls( a, b){
  var x = a.i - b.i;
  var y = a.j - b.j;
  //horizontal
  if (x == 1){
    a.walls[3] = false;
    b.walls[1] = false;
  }else if (x == -1){
    a.walls[1] = false;
    b.walls[3] = false;
  }
  //vertical
  if (y == 1){
    a.walls[0] = false;
    b.walls[2] = false;
  }else if (y == -1){
    a.walls[2] = false;
    b.walls[0] = false;
  }

}
