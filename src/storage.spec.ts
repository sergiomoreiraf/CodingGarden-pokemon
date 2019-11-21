import * as storage from './storage';

describe('Apps Storage', () => {
  it('should be defined', () => {
    expect(storage).toBeDefined();
  });
  it('should return undefined it no value is inside', () => {
    expect(storage.get(storage.items.secs)).toBeUndefined();
    expect(storage.get(storage.items.pokemons)).toBeUndefined();
  });
  it('should store and retrieve a simple value', () => {
    storage.set(storage.items.secs, 1);
    expect(storage.get(storage.items.secs)).toBe(1);
  });
  it('should store and retrieve a more complex object', () => {
    const temp = { 0: 'Hello', 1: 'There' };
    storage.set(storage.items.pokemons, temp);
    expect(storage.get(storage.items.pokemons)).toStrictEqual(temp);
  });
});
