import { generateRandomNumbers } from './util';

describe('Util functions', () => {
  describe('Random Number Generator', () => {
    it('should return empty array if to < from', () => {
      expect(generateRandomNumbers(1, 0, 0)).toStrictEqual([]);
    });
    it('should return empty array if howMany > from - to', () => {
      expect(generateRandomNumbers(0, 1, 3)).toStrictEqual([]);
    });
    it('should return empty array if init size > howMany', () => {
      expect(generateRandomNumbers(0, 1, 1, [1, 2])).toStrictEqual([]);
    });
    it('should return expected array 1', () => {
      let ret = generateRandomNumbers(0, 3, 4);
      ret.sort((a, b) => a - b);
      expect(ret).toStrictEqual([0, 1, 2, 3]);
    });
    it('should return expected array 2', () => {
      let ret = generateRandomNumbers(2, 8, 7);
      ret.sort((a, b) => a - b);
      expect(ret).toStrictEqual([2, 3, 4, 5, 6, 7, 8]);
    });
    it('should return expected array 3', () => {
      const ret = generateRandomNumbers(2, 5, 2);
      expect(ret.length).toBe(2);
      expect(ret[0]).toBeGreaterThanOrEqual(2);
      expect(ret[0]).toBeLessThanOrEqual(5);
      expect(ret[1]).toBeGreaterThanOrEqual(2);
      expect(ret[1]).toBeLessThanOrEqual(5);
      expect(ret[0]).not.toBe(ret[1]);
    });
    it('should return expected array 4', () => {
      let ret = generateRandomNumbers(1, 3, 2, [1, 2]);
      expect(ret).toStrictEqual([1, 2]);
    });
    it('should return expected array 5', () => {
      let ret = generateRandomNumbers(10, 10000, 5, [10, 20, 30, 40, 50]);
      expect(ret).toStrictEqual([10, 20, 30, 40, 50]);
    });
    it('should return expected array 6', () => {
      let ret = generateRandomNumbers(0, 10, 3, [0, 1]);
      expect(ret[0]).toBe(0);
      expect(ret[1]).toBe(1);
      expect(ret[2]).toBeGreaterThanOrEqual(2);
      expect(ret[2]).toBeLessThanOrEqual(10);
    });
  });
});
