import { calculateMines } from './createGame'

describe("createGame", () => {
  describe("calculateMines", () => {
    const height = 6;
    const width = 8;
    const gameField = [
      "free", "free", "open", "mine", "free", "mine", "mine", "mine",
      "free", "free", "free", "free", "free", "mine", "free", "mine",
      "free", "mine", "mine", "free", "free", "mine", "mine", "mine",
      "free", "free", "free", "free", "free", "free", "free", "free",
      "free", "free", "free", "free", "free", "free", "free", "free",
      "mine", "free", "free", "free", "free", "free", "free", "free",
    ];
    const mines = [
      0, 0, 1, 0, 3, 2, 4, 2,
      1, 2, 3, 2, 4, 4, 8, 4,
      1, 1, 1, 1, 2, 2, 4, 2,
      1, 2, 2, 1, 1, 2, 3, 2,
      1, 1, 0, 0, 0, 0, 0, 0,
      0, 1, 0, 0, 0, 0, 0, 0,
    ];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        it(`(${x},${y})`, () => expect(calculateMines(gameField, width, height, x, y))
          .toEqual(mines[x + y * width]));
      }
    }
  });
});
