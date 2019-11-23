// Storage to control and expose shared variables on app.

// General storage
let storage: any = {};

/**
 * Enum that contains the possible variables.
 *
 * TODO: this should not be here. Somehow this must be dynamic fetched.
 */
export enum items {
  // controls the remaining time
  secs,
  // Holds pokemon's name and id
  pokemons
}

/**
 * Set a variable on storage.
 *
 * @param {items} item which variable to guard
 * @param {*} value the value of the variable
 */
export function set(item: items, value: any) {
  storage[item] = value;
}

/**
 * Retrieves a variable form storage.
 * If it does not contains a value, return undefined.
 *
 * @param {items} item which variable to retrieve
 * @returns currently variable's stored value
 */
export function get(item: items) {
  return storage[item];
}
