export const categories = [
  { name: "Pizzas" },
  { name: "Breakfast" },
  { name: "Snacks" },
  { name: "Milkshakes" },
  { name: "Drinks" },
];


export const _ingredients = [
  {
    name: "Cheese Crust",
    price: 179,
    imageUrl: "/Cheese-Crust.png",
  },
  {
    name: "Creamy Mozzarella",
    price: 79,
    imageUrl: "/Creamy-Mozzarella.png",
  },
  {
    name: "Cheddar & Parmesan",
    price: 79,
    imageUrl: "/Cheddar-and-Parmesan.png",
  },
  {
    name: "Jalapeno Pepper",
    price: 59,
    imageUrl: "/Jalapeno-Pepper.png",
  },
  {
    name: "Tender Chicken",
    price: 79,
    imageUrl: "/Tender-Chicken.png",
  },
  {
    name: "Mushrooms",
    price: 59,
    imageUrl: "/Mushrooms.png",
  },
  {
    name: "Ham",
    price: 79,
    imageUrl: "/Ham.png",
  },
  {
    name: "Spicy Pepperoni",
    price: 79,
    imageUrl: "/Spicy-Pepperoni.png",
  },
  {
    name: "Spicy Chorizo",
    price: 79,
    imageUrl: "/Spicy-Chorizo.png",
  },
  {
    name: "Pickles",
    price: 59,
    imageUrl: "/Pickles.png",
  },
  {
    name: "Fresh Tomatoes",
    price: 59,
    imageUrl: "/Fresh-Tomatoes.png",
  },
  {
    name: "Red Onion",
    price: 59,
    imageUrl: "/Red-Onion.png",
  },
  {
    name: "Juicy Pineapples",
    price: 59,
    imageUrl: "/Juicy-Pineapple.png",
  },
  {
    name: "Italian Herbs",
    price: 39,
    imageUrl: "/Italian-Herbs.png",
  },
  {
    name: "Bell Pepper",
    price: 59,
    imageUrl: "/Bell-Pepper.png",
  },
  {
    name: "Feta Cubes",
    price: 79,
    imageUrl: "/Feta-Cubes.png",
  },
  {
    name: "Meatballs",
    price: 79,
    imageUrl: "/Meatballs.png",
  },
].map((obj, index) => ({ id: index + 1, ...obj }));


export const products = [
  {
    name: "Omelette with Ham & Mushrooms",
    imageUrl: "/Omelette-Ham-Mushrooms.webp",
    categoryId: 2,
  },
  {
    name: "Omelette with Pepperoni",
    imageUrl: "/Omelette-Pepperoni.webp",
    categoryId: 2,
  },
  {
    name: "Latte Coffee",
    imageUrl: "/Latte.webp",
    categoryId: 2,
  },
  {
    name: "Ham & Cheese Sandwich",
    imageUrl: "/Ham-Cheese-Sandwich.webp",
    categoryId: 3,
  },
  {
    name: "Chicken Nuggets",
    imageUrl: "/Chicken-Nuggets.webp",
    categoryId: 3,
  },
  {
    name: "Baked Potatoes with Sauce 🌱",
    imageUrl: "/Baked-Potatoes-Sauce.webp",
    categoryId: 3,
  },
  {
    name: "Dodster",
    imageUrl: "/Dodster.webp",
    categoryId: 3,
  },
  {
    name: "Spicy Dodster 🌶️🌶️",
    imageUrl: "/Spicy-Dodster.webp",
    categoryId: 3,
  },
  {
    name: "Banana Milkshake",
    imageUrl: "/Banana-Milkshake.webp",
    categoryId: 4,
  },
  {
    name: "Caramel Apple Milkshake",
    imageUrl: "/Caramel-Apple-Milkshake.webp",
    categoryId: 4,
  },
  {
    name: "Oreo Milkshake",
    imageUrl: "/Oreo-Milkshake.webp",
    categoryId: 4,
  },
  {
    name: "Classic Milkshake 👶",
    imageUrl: "/Classic-Milkshake.webp",
    categoryId: 4,
  },
  {
    name: "Irish Cappuccino",
    imageUrl: "/Irish-Cappuccino.webp",
    categoryId: 5,
  },
  {
    name: "Caramel Cappuccino",
    imageUrl: "/Caramel-Cappuccino.webp",
    categoryId: 5,
  },
  {
    name: "Coconut Latte",
    imageUrl: "/Coconut-Latte.webp",
    categoryId: 5,
  },
  {
    name: "Americano",
    imageUrl: "/Americano.webp",
    categoryId: 5,
  },
  {
    name: "Latte",
    imageUrl: "/Latte.webp",
    categoryId: 5,
  },
];
