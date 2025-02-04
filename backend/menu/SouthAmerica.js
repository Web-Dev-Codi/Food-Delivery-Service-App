// Initilising items for Mexican Menu
const SouthAmericaMenuItems = [
  {
    name: "Pisco Sour",
    price: 3,
    description:
      "A classic cocktail made with pisco, lime juice, simple syrup, and egg white, served in a chilled glass for a refreshing and tangy drink.",
    category: "Beverages",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660456/Pisco_SOur-drink_e19tkf.avif",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
  },
  {
    name: "Caipirinha",
    price: 4,
    description:
      "A Brazilian cocktail made with cachaça, sugar, and lime, served over ice for a refreshing and tangy drink.",
    category: "Beverages",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660200/Caipirinha-drink_xsoxxp.jpg",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
  },
  {
    name: "Chicha Morada",
    price: 12,
    description:
      " A sweet and tangy Peruvian drink made from purple corn, pineapple, cinnamon, and cloves, served over ice for a refreshing and colorful beverage.",
    category: "Beverages",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660112/chicha_Morada-drink_bdxdp4.avif",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
  },

  {
    name: "Pollo Asado",
    price: 8,
    description:
      "A flavorful and juicy grilled chicken marinated in a blend of citrus, garlic, and spices, served with rice, beans, and tortillas for a satisfying meal.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660143/PolloAsado-maincourse_vl7zxc.avif",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
  },

  {
    name: "pabellon Criollo",
    price: 10,
    description:
      "A traditional Venezuelan dish made with shredded beef, black beans, rice, and fried plantains, served with a fried egg on top for a hearty and satisfying meal.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660132/Pabellon_criollo-maincourse_a0gcpd.avif",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
  },
  {
    name: "Bandeja Paisa",
    price: 12,
    description:
      "A hearty Colombian platter made with grilled steak, chorizo, chicharrón, rice, beans, avocado, and a fried egg, perfect for a filling and satisfying meal.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660194/bandeja-paisa-maincourse_olj3vt.jpg",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
  },
  {
    name: "Feijoada",
    price: 10,
    description:
      "A rich and hearty Brazilian stew made with black beans, pork, sausage, and beef, served with rice, collard greens, and orange slices for a flavorful and satisfying meal.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660353/Feijoda_Brazilian_mzdtwc.avif",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
  },
  {
    name: "Empanadas",
    price: 8,
    description:
      "A flaky pastry filled with a savory mixture of meat, cheese, and vegetables, perfect for a snack or light meal.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660327/empanadas-starters_jr8qfz.avif",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
  },
  {
    name: "Lomo Saltado",
    price: 12,
    description:
      "A Peruvian stir-fry made with marinated beef, onions, tomatoes, and French fries, served with rice for a flavorful and satisfying meal.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660361/Lomo_Saltado-maincourse_lyvzay.avif",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
  },
  {
    name: "Arepas",
    price: 6,
    description:
      "A traditional Colombian dish made with cornmeal dough, filled with cheese, meat, or beans, and grilled until crispy, served with avocado and tomato salsa for a delicious and satisfying meal.",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660095/Arepas-starters_krax6x.avif",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
  },
  {
    name: "Brigadeiro",
    price: 5,
    description:
      "A popular Brazilian dessert made with condensed milk, cocoa powder, butter, and chocolate sprinkles, rolled into bite-sized balls for a sweet and indulgent treat.",
    category: "Dessert",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660102/Brigadeiro-dessert_fcyeq2.avif",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
  },

  {
    name: "De Dulce de Leche",
    price: 6,
    description:
      "A sweet and creamy Argentinean dessert made with milk, sugar, and vanilla, cooked until thick and caramelized, perfect for spreading on toast or pastries.",
    category: "Dessert",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660209/De_Dulce_De_Leche-Dessert_itfrpn.avif",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
  },
  {
    name: "Alfajores",
    price: 5,
    description:
      "A popular South American dessert made with two shortbread cookies sandwiched together with dulce de leche, rolled in coconut or powdered sugar for a sweet and indulgent treat.",
    category: "Beverages",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660254/delicious-alfajores-Dessert_kvp25m.avif",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
  },

  {
    name: "Torta Tres Leches",
    price: 4,
    description:
      " A light and moist sponge cake soaked in a sweet mixture of three kinds of milk, topped with whipped cream and fresh berries for a rich and indulgent dessert.",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738661694/porciontresleches_cujkma.png",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
  },
];

export default MexicanMenuItems;
