import { outOfBounds } from './utilities'

describe("utilities", () => {
  describe("outOfBounds", () => {
    describe("from (0,0)", () => {
      it("offset (-1,-1)", () => expect(outOfBounds(9, 9, 0, 0, -1, -1)).toEqual(true));
      it("offset (0,-1)", () => expect(outOfBounds(9, 9, 0, 0, 0, -1)).toEqual(true));
      it("offset (1,-1)", () => expect(outOfBounds(9, 9, 0, 0, 1, -1)).toEqual(true));

      it("offset (-1,0)", () => expect(outOfBounds(9, 9, 0, 0, -1, 0)).toEqual(true));
      it("offset (0,0)", () => expect(outOfBounds(9, 9, 0, 0, 0, 0)).toEqual(false));
      it("offset (1,0)", () => expect(outOfBounds(9, 9, 0, 0, 1, 0)).toEqual(false));

      it("offset (-1,1)", () => expect(outOfBounds(9, 9, 0, 0, -1, 1)).toEqual(true));
      it("offset (0,1)", () => expect(outOfBounds(9, 9, 0, 0, 0, 1)).toEqual(false));
      it("offset (1,1)", () => expect(outOfBounds(9, 9, 0, 0, 1, 1)).toEqual(false));
    });

    describe("from (9,9)", () => {
      it("offset (-1,-1)", () => expect(outOfBounds(9, 9, 8, 8, -1, -1)).toEqual(false));
      it("offset (0,-1)", () => expect(outOfBounds(9, 9, 8, 8, 0, -1)).toEqual(false));
      it("offset (1,-1)", () => expect(outOfBounds(9, 9, 8, 8, 1, -1)).toEqual(true));

      it("offset (-1,0)", () => expect(outOfBounds(9, 9, 8, 8, -1, 0)).toEqual(false));
      it("offset (0,0)", () => expect(outOfBounds(9, 9, 8, 8, 0, 0)).toEqual(false));
      it("offset (1,0)", () => expect(outOfBounds(9, 9, 8, 8, 1, 0)).toEqual(true));

      it("offset (-1,1)", () => expect(outOfBounds(9, 9, 8, 8, -1, 1)).toEqual(true));
      it("offset (0,1)", () => expect(outOfBounds(9, 9, 8, 8, 0, 1)).toEqual(true));
      it("offset (1,1)", () => expect(outOfBounds(9, 9, 8, 8, 1, 1)).toEqual(true));
    });
  });
});
