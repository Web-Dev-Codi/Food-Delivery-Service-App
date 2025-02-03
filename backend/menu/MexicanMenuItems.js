// Initilising items for Mexican Menu (Restaurant id ?)


const MexicanMenuItems = [
  {
    name: "Tres Leches Cake",
    price: 350,
    description:
      "A light, airy sponge cake soaked in a sweet mixture of three kinds of milk, topped with whipped cream and fresh berries.",
    category: "Dessert",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/Tres-Leches-Cake-1-1_qiwbzr.jpg",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
  },
  {
    name: "Quesadilla",
    price: 250,
    description:
      "A flour tortilla filled with a savory mixture of cheese, meat, beans, and vegetables, folded in half and grilled until crispy.",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/quesadilla_kv2zvh.jpg",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
  },
  {
    name: "Mole Poblano",
    price: 120,
    description:
      "A rich, flavorful sauce made from a blend of chilies, chocolate, and spices, served over chicken or turkey for a delicious and hearty meal.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/mole_poblano_zo9ouh.jpg",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
  },
  {
    name: "Guacamole",
    price: 50,
    description:
      "A creamy dip made from mashed avocados, onions, tomatoes, and spices, perfect for dipping tortilla chips or spreading on tacos and burritos.",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/Guacamole_m5nxod.jpg",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
  },
  {
    name: "Chicken ranchero",
    price: 400,
    description:
      "Tender chicken breasts cooked in a spicy tomato sauce with onions, peppers, and garlic, served with rice and beans for a satisfying meal.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/chicken-ranch-tacos_mdaemr.webp",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
  },

  {
    name: "Chiken fajitas",
    price: 100,
    description:
      "Sizzling strips of chicken cooked with bell peppers and onions, served with warm tortillas, guacamole, and sour cream for a fun and interactive meal.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/chicken-fajitas_s5tob0.jpg",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
  },
  {
    name: "Salsa bjruzi",
    price: 180,
    description:
      "A spicy and tangy sauce made from tomatoes, onions, chilies, and cilantro, perfect for dipping tortilla chips or topping tacos and burritos.",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/Salsa-starter_bjruzj.jpg",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
  },
  {
    name: "Enchiladas",
    price: 100,
    description:
      "Corn tortillas filled with a savory mixture of meat, cheese, and beans, rolled up and topped with a spicy sauce and melted cheese.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/enchiladas_gzr2g1.jpg",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
  },
  {
    name: "Burrito",
    price: 180,
    description:
      "A large flour tortilla filled with a savory mixture of meat, rice, beans, and cheese, rolled up and grilled until crispy, served with salsa and sour cream.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/burrito_g6hkrb.jpg",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
  },
  {
    name: "Flan",
    price: 180,
    description:
      "A rich and creamy custard dessert topped with caramel sauce, perfect for a sweet treat after a meal.",
    category: "Dessert",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/Flan_bw7xpp.jpg",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
  },
  {
    name: "Molletes",
    price: 180,
    description:
      "A traditional Mexican dish made with bolillo bread, refried beans, cheese, and salsa, perfect for breakfast or a light meal.",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520510/mexican%20food/starter-Molletes_zgvy4k.jpg",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
  },
  {
    name: "Empanadas",
    price: 180,
    description:
      "A flaky pastry filled with a savory mixture of meat, cheese, and vegetables, perfect for a snack or light meal.",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520510/mexican%20food/Empanadas_arblao.jpg",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
  },

  {
    name: "Margarita",
    price: 180,
    description:
      "A classic cocktail made with tequila, lime juice, and orange liqueur, served in a salt-rimmed glass for a refreshing and tangy drink.",
    category: "Beverages",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738615939/margarita-baverages_mp2enk.jpg",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
  },
  {
    name: "Paloma",
    price: 680,
    description:
      "A refreshing cocktail made with tequila, grapefruit soda, and lime juice, served over ice for a tangy and bubbly drink.",
    category: "Beverages",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738616056/paloma-drink-_inb4ph.jpg",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
  },

  {
    name: "Esquites",
    price: 380,
    description:
      "A popular Mexican street food made with corn kernels cooked with mayonnaise, cheese, chili powder, and lime juice, served in a cup for a flavorful and spicy snack.",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/esquites_mcprqx.jpg",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
  },
];

export default MexicanMenuItems;
