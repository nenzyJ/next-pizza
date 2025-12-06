export const mapSize = {
  20: "Small",
  30: "Middle",
  40: "Big",
} as const;

export const mapPizzaType = {
  1: "traditional",
  2: "slim",
} as const;

export const pizzaSizes = Object.entries(mapSize).map(([value, name]) => ({
  value,
  name,
}));
export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
  value,
  name,
}));

export type PizzaSize = keyof typeof mapSize;
export type PizzaType = keyof typeof mapPizzaType;
