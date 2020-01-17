const areTwoPointsEqual = function(snakeHead, foodLocation) {
  const [colId1, rowId1] = snakeHead;
  const [colId2, rowId2] = foodLocation;
  return colId1 === colId2 && rowId1 === rowId2;
};

class Game {
  #snake;
  #ghostSnake;
  #food;
  #score;
  constructor(snake, ghostSnake, food, score) {
    this.#snake = snake;
    this.#ghostSnake = ghostSnake;
    this.#food = food;
    this.#score = score;
  }

  get currentStatus() {
    const snake = { location: this.#snake.location };
    snake.type = this.#snake.species;
    snake.previousTail = this.#snake.previousTailPosition;
    const ghostSnake = { location: this.#ghostSnake.location };
    ghostSnake.type = this.#ghostSnake.species;
    ghostSnake.previousTail = this.#ghostSnake.previousTailPosition;
    const food = { location: [...this.#food.position] };
    return { snake, ghostSnake, food };
  }

  turnSnake(turnDirection) {
    this.#snake[turnDirection]();
  }

  turnGhostSnake() {
    this.#ghostSnake.turnRight();
  }

  isSnakeGotFood() {
    const snakeHead = this.#snake.getHead();
    const foodLocation = this.#food.position;
    return areTwoPointsEqual(snakeHead, foodLocation);
  }

  get foodLocation() {
    return this.#food.position;
  }

  get previousFoodPosition() {
    return this.#food.getPreviousFoodPosition();
  }

  generateNewFood() {
    const colId = Math.floor(Math.random() * NUM_OF_COLS);
    const rowId = Math.floor(Math.random() * NUM_OF_ROWS);
    const previousFoodPosition = [...this.#food.position];
    const newFood = new Food(colId, rowId, previousFoodPosition);
    this.#food = newFood;
  }

  update() {
    this.#snake.move();
    this.#ghostSnake.move();
    if (this.isSnakeGotFood()) {
      this.generateNewFood();
      this.#snake.grow();
      this.#score.updateScore(5);
    }
  }

  get newScore() {
    return this.#score.newScore;
  }
}
