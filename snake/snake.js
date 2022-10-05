let canvas = document.getElementById('canvas');
let pointBoard = document.getElementById("pointBoard");
let ROWS = 40;
let COLS = 40;
let size = 10;
let pixels = new Map();
let currentSnake = [[0,0],[0,1],[0,2],[0,3],[0,4]];
let moveRight = ([x,y]) => [x , y + 1];
let moveLeft = ([x,y]) => [x , y - 1];
let moveUp = ([x,y]) => [x - 1 , y];
let moveDown = ([x,y]) => [x + 1 , y];
let currentDirection = moveRight;;
let currentFoodKeys = toKey([10, 10]);
let point = 0;

function toPosSet(pos) {
  let set = new Set();
  for ([x, y] of pos) {
    let position = x + "_" + y;
    set.add(position)
  }
  return set
}

function toKey([x, y]) {
  return x + "_" + y;
}
function drawBoard() {
  for(let i = 0; i < ROWS; i++) { 
	for(let j =0; j< COLS; j++) {
        let pixel = document.createElement('div');
        pixel.style.width = 10 + 'px';
        pixel.style.height = 10 + 'px';
        pixel.style.border = '1px solid #aaa';
        pixel.style.position = 'absolute';
        pixel.style.marginTop = i * size +'px';
        pixel.style.marginLeft = j * size +'px';
        canvas.appendChild(pixel);
    let position = i + "_" + j;
    pixels.set(position, pixel);
	}
 }
};
drawBoard();
drawSnake(currentSnake);


function drawSnake(snake) {
  let snakePositions = toPosSet(snake);

  for(let i = 0; i < ROWS; i++) { 
      for(let j =0; j< COLS; j++) {
        let position = i + '_' + j;
        let pixel = pixels.get(position);            
        pixel.style.backgroundColor = 
        snakePositions.has(position) ? 'black' : 'white';
        let foodPixel = pixels.get(currentFoodKeys);
        foodPixel.style.backgroundColor = pixels.has(currentFoodKeys)
          ? "red"
          : "white";
        if (snakePositions.has(currentFoodKeys)) {
          currentFoodKeys = toKey([
            Math.floor(Math.random() * ROWS),
            Math.floor(Math.random() * ROWS),
          ]);
          point++;
          pointBoard.innerHTML = point;
        }
      }
  }
}

function step() {
  currentSnake.shift();
  let head = currentSnake[currentSnake.length-1];
  let newHead = currentDirection(head);
  currentSnake.push(newHead);
  // checkGameOver(newHead);
  drawSnake(currentSnake);
}

let gameInterval = setInterval(() => {
	step()
},60);

document.addEventListener('keydown' ,(e) => {
	switch(e.key) {
		case "ArrowUp":
		currentDirection = moveUp;
		break;
		case "ArrowDown":
		currentDirection = moveDown;
		break;
		case "ArrowLeft":
		currentDirection = moveLeft;
		break;
		case "ArrowRight":
		currentDirection = moveRight;
		break;

	}
});

function checkGameOver(head) {
	if(head[0] < 0 || head[1] < 0 ) {
       canvas.style.borderColor = 'red';
       clearInterval(gameInterval);
	}
	if(head[0] > ROWS || head[1] > COLS ) {
       canvas.style.borderColor = 'red';
       clearInterval(gameInterval);
	}
}















