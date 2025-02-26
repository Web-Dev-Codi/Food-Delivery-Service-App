
const menuItems = [
  {
    name: "Samosa",
    price: 5,
    short_desc:"Crispy fried pastry with spicy potato filling",
    description:
      "A crispy, golden-brown fried pastry filled with a flavorful and spicy mashed potato mixture, seasoned with aromatic spices like cumin, coriander, and garam masala. This popular snack is known for its crunchy exterior and soft, savory interior, making it a delicious treat often enjoyed with chutneys or tea.",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738584143/samosa_yyuhnl.webp",
    availability: "Available",
    restaurant: "67a08c18a817ad598a39bd54",
    ratings: 4.5,
  },
  {
    name: "Butter Chicken",
    price: 15,
    short_desc:"Creamy tomato-based chicken curry",
    description:
      "A rich and creamy tomato-based chicken curry, slow-cooked to perfection with tender pieces of chicken simmered in a luscious, spiced tomato gravy. Infused with aromatic ingredients like garlic, ginger, garam masala, and a touch of cream, this dish offers a perfect balance of tangy, spicy, and savory flavors. Often enjoyed with naan or basmati rice, this comforting and indulgent curry is a favorite in Indian cuisine",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738584143/butter-chicken_tsnbga.jpg",
    availability: "Available",
    restaurant: "67a08c18a817ad598a39bd54",
    ratings: 4.5,
  },
  {
    name: "Gulab Jamun",
    price: 7,
    short_desc: "Deep-fried dumplings soaked in sugar syrup",
    description:
      "Golden-brown deep-fried dumplings with a soft, melt-in-your-mouth texture, soaked in a fragrant sugar syrup infused with cardamom, rose water, or saffron. These sweet treats are crispy on the outside and irresistibly soft on the inside, absorbing the rich syrup for a luscious, caramelized flavor. Often served warm, they are a popular festive and celebratory dessert, enjoyed with a garnish of chopped nuts like almonds or pistachios.",
    category: "Dessert",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738584143/Gulab-Jamun_ry0uvd.jpg",
    availability: "Available",
    restaurant: "67a08c18a817ad598a39bd54",
    ratings: 4.5,
  },
  {
    name: "Mango Lassi",
    price: 4,
    short_desc: "Yogurt-based mango smoothie",
    description:
      "A smooth and creamy yogurt-based mango drink, blended to perfection with ripe, juicy mangoes for a naturally sweet and refreshing flavor. This luscious beverage is enhanced with a hint of cardamom or saffron, adding a touch of aromatic warmth. Often served chilled, it has a rich, velvety texture that makes it a perfect summer cooler or a delightful accompaniment to a hearty meal. Popular in Indian cuisine, this drink is both nourishing and indulgent.",

    category: "Beverages",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738584142/mango_lassi_ibs2ol.jpg",
    availability: "Available",
    restaurant: "67a08c18a817ad598a39bd54",
    ratings: 4.5,
  },
  {
    name: "Buffalo Wings",
    price: 9,
    short_desc: "Crispy chicken wings in spicy sauce",
    description:
      "Crispy, deep-fried or baked chicken wings coated in a bold and flavorful spicy sauce, delivering the perfect balance of heat and tanginess. The wings are seasoned with a blend of spices, then tossed in a rich, buttery hot sauce for an irresistible kick. Served alongside cool and creamy ranch dressing, which adds a refreshing contrast to the fiery flavors, these wings are a favorite for game nights, parties, or any occasion that calls for a deliciously messy bite.",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738584141/Buffalo_Wings_islhkv.jpg",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
    ratings: 4.5,
  },
  {
    name: "Steak",
    price: 22,
    short_desc: "Grilled steak with mashed potatoes",
  
    description:
      "A perfectly grilled, juicy steak seasoned with a blend of salt, pepper, and aromatic herbs, seared to lock in its rich, smoky flavor. Cooked to your preferred doneness, the tender steak pairs beautifully with a side of creamy, buttery mashed potatoes, whipped to smooth perfection. This classic and hearty dish offers a satisfying balance of savory flavors and comforting textures, making it a favorite for steak lovers and a staple at steakhouses and family dinners alike.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738763604/Steak_Gemuse_uub0dk.jpg",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
    ratings: 4.5,
  },
  {
    name: "Cheesecake",
    price: 8,
    
    short_desc: "Rich and creamy New York-style cheesecake",
    description:
      "A rich and creamy New York-style cheesecake with a smooth, velvety texture and a perfectly balanced sweet-tangy flavor. Baked to perfection on a buttery graham cracker crust, this classic dessert is known for its dense yet luscious consistency. Often enjoyed plain or topped with fresh berries, fruit compote, or a drizzle of caramel, it’s a timeless treat that delivers indulgence in every bite.",
    category: "Dessert",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738584142/Cheesecake_oxqsli.jpg",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
    ratings: 4.5,
  },
  {
    name: "Root Beer Float",
    price: 5,
    short_desc: "Fizzy root beer with a scoop of vanilla ice cream",
    description:
      "A nostalgic and refreshing treat, combining the fizzy sweetness of root beer with a creamy scoop of vanilla ice cream. The root beer’s bold, herbal flavor blends beautifully with the smooth, velvety ice cream, creating a delicious float with layers of sweetness and effervescence. This indulgent dessert drink, often served in a chilled glass, offers the perfect balance of bubbly refreshment and creamy richness, making it a timeless favorite for all ages.",
    category: "Beverages",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738584142/Root_Beer_Float_rnwr4x.jpg",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
    ratings: 4.5,
  },
  {
    name: "Chicken tandoori",
    price: 6,
    short_desc: "Marinated, roasted chicken with mint chutney",
    description:
      "Tender, juicy chicken marinated in a rich blend of spiced yogurt, infused with aromatic ingredients like garlic, ginger, turmeric, and garam masala. The marinated chicken is then roasted to perfection in a traditional tandoor, imparting a smoky flavor and crispy exterior while keeping the inside moist and flavorful. Served alongside fresh lemon wedges to add a zesty kick and accompanied by a refreshing mint chutney, this dish is a savory delight that combines rich spices and tangy freshness in every bite.",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/Indian-food-menu/tandoori-3856045_640_jqkql8.jpg",
    availability: "Available",
    restaurant: "67a08c18a817ad598a39bd54",
    ratings: 4.5,
  },
  {
    name: "Matar Paneer",
    price: 10,
    
    
    short_desc: "Paneer and green peas in a rich tomato gravy",
    description:
      "Delicate, soft cubes of paneer simmered with tender green peas in a rich, flavorful tomato-based gravy. The dish is infused with aromatic spices like cumin, coriander, and garam masala, creating a perfect balance of savory and mildly tangy flavors. The smooth, creamy gravy envelops the paneer and peas, making each bite comforting and satisfying. Finished with a garnish of fresh coriander, this dish offers a burst of freshness and a vibrant touch, making it a beloved vegetarian delight in Indian cuisine.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/Indian-food-menu/matar-paneer-1_h8zk8f.webp",
    availability: "Available",
    restaurant: "67a08c18a817ad598a39bd54",
    ratings: 4.5,
  },
  {
    name: "Hyderabadi Chiken Biryani",
    price: 15,
    short_desc: "Fragrant basmati rice with marinated chicken",
    description:
      "Fragrant basmati rice cooked to fluffy perfection with tender, marinated chicken, infused with a blend of aromatic spices like cinnamon, cardamom, cloves, and saffron. The chicken is marinated in a mixture of yogurt and spices, allowing it to soak up the flavors before being cooked along with the rice, creating a harmonious blend of rich, savory, and slightly tangy notes. Each grain of rice is delicately flavored, while the chicken remains juicy and tender, making this dish a comforting and satisfying one-pot meal, often enjoyed with raita or a side salad.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520511/Indian-food-menu/chiken-biryani_q5iqj8.jpg",
    availability: "Available",
    restaurant: "67a08c18a817ad598a39bd54",
    ratings: 4.5,
  },
  {
    name: "VegPuff",
    price: 4,
    short_desc: "Crispy pastry with spiced potato filling",
    description:
      "A crispy, golden-brown deep-fried pastry, delicately encasing a savory filling of spiced potatoes, peas, and onions. The mixture is seasoned with a blend of aromatic spices like cumin, coriander, turmeric, and garam masala, offering a perfect balance of earthy, warm flavors. The crispy exterior gives way to the soft, flavorful interior, making each bite a delightful combination of crunch and spice. This popular snack, often enjoyed with tangy chutneys or yogurt, is a perfect bite-sized treat for any occasion.",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/Indian-food-menu/vegpuff_omlqxd.jpg",
    availability: "Available",
    restaurant: "67a08c18a817ad598a39bd54",
    ratings: 4.5,
  },
  {
    name: "Pastries",
    short_desc: "Assorted flaky pastries with sweet fillings",
    price: 5,
    description:
      "Delightful, flaky pastries with a light and buttery texture, offering a melt-in-your-mouth experience. These pastries are filled with a wide range of delicious flavors, from indulgent, rich chocolate to refreshing, fruity fillings like berries or citrus. Each bite offers a perfect balance of crispiness and sweetness, making these pastries the ideal choice for a sweet treat or a satisfying dessert. Whether enjoyed with coffee, tea, or as an afternoon snack, they bring a touch of luxury to any occasion.",
    category: "Dessert",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/Indian-food-menu/Assorted_Pastries_-_Indian_s86lne.jpg",
    availability: "Available",
    restaurant: "67a08c18a817ad598a39bd54",
    ratings: 4.5,
  },
  {
    name: "Egg Biryani",
    price: 12,
    short_desc: "Fragrant rice with boiled eggs and spices",
    description:
      "Fragrant basmati rice cooked to fluffy perfection with tender boiled eggs, infused with a medley of aromatic spices such as cumin, cinnamon, cloves, and cardamom. The spices blend seamlessly with the soft, golden yolks and white, creating a rich, flavorful dish. Fresh herbs like coriander and mint add a touch of freshness, enhancing the overall taste. Served alongside cooling raita, this dish offers a satisfying combination of warmth, spices, and creaminess, making it a delightful, wholesome meal.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/Indian-food-menu/Egg-Biryani-Featured-1_v3omzq.jpg",
    availability: "Available",
    restaurant: "67a08c18a817ad598a39bd54",
    ratings: 4.5,
  },
  {
    name: "Rasamalai",
    price: 8,
    short_desc: "Spongy cottage cheese dumplings in saffron milk",
    description:
      "Soft and spongy cottage cheese dumplings, delicately soaked in a sweet, saffron-infused milk that adds a rich, aromatic flavor. These dumplings, also known as rasgulla or ras malai, absorb the milk to create a melt-in-your-mouth texture that’s both indulgent and comforting. The saffron imparts a luxurious, golden hue and an exotic fragrance, while the milk creates a creamy, velvety sauce. Garnished with chopped nuts such as pistachios or almonds, this dessert offers a perfect balance of sweetness, creaminess, and texture, making it a delightful treat for any occasion.",
    category: "Dessert",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/Indian-food-menu/rasamalai_dss8ho.jpg",
    availability: "Available",
    restaurant: "67a08c18a817ad598a39bd54",
    ratings: 4.5,
  },
  {
    name: "Mutton Biryani",
    price: 16,
    short_desc: "Fragrant rice with tender mutton pieces",
    description:
      "Fragrant basmati rice cooked to perfection with tender mutton pieces, slow-cooked to absorb the rich flavors of aromatic spices like cumin, cloves, cinnamon, and cardamom. The spices infuse the rice and meat, creating a flavorful and aromatic dish that’s both comforting and satisfying. Fresh herbs like mint and coriander add a burst of freshness to each bite. Served with a cooling raita on the side, this dish offers a perfect balance of savory, spicy, and creamy flavors, making it an indulgent and hearty meal.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/Indian-food-menu/mutton-biryani_ytpbki.jpg",
    availability: "Available",
    restaurant: "67a08c18a817ad598a39bd54",
    ratings: 4.5,
  },
  {
    name: "Idli",
    price: 10,
    short_desc: "Steamed rice cakes with coconut chutney and sambar",
    description:
      "Soft and fluffy steamed rice cakes, known as idlis, made from a fermented batter of rice and lentils that gives them a light, airy texture. These savory cakes are delicately steamed to perfection, offering a mild, slightly tangy flavor. Typically served with a side of cooling coconut chutney, which adds a creamy and slightly sweet contrast, and a bowl of flavorful sambar, a spicy and tangy lentil-based stew with vegetables. This wholesome and healthy meal is a popular breakfast or snack option, offering a balanced combination of protein, fiber, and essential nutrients.",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/Indian-food-menu/idli-breakfast_msw6cr.webp",
    availability: "Available",
    restaurant: "67a08c18a817ad598a39bd54",
    ratings: 4.5,
  },
  {
    name: "Omelette",
    price: 6,
    short_desc: "Fluffy egg dish with a variety of fillings",
    description:
      "A versatile egg dish that can be made plain or with a variety of fillings, perfect for breakfast or a snack. It can be customized with ingredients like cheese, vegetables, meats, or herbs to suit different tastes. Quick to prepare, this dish is high in protein and can be served with toast, salad, or as a standalone meal. Ideal for busy mornings or a light, satisfying meal any time of the day.",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520512/Indian-food-menu/omlet-starter_ftngrz.jpg",
    availability: "Available",
    restaurant: "67a08c18a817ad598a39bd54",
    ratings: 4.5,
  },
  {
    name: "Plain Dosa",
    short_desc: "Crispy rice crepe with spiced potato filling",
    price: 8,
    description:
      "A crispy, golden-brown dosa filled with a flavorful and spicy potato filling, served with coconut chutney and sambar for a delicious and satisfying meal. This South Indian classic combines the crunch of the dosa with the soft, spiced mashed potatoes, creating a perfect balance of textures and flavors. The coconut chutney adds a creamy, mildly sweet contrast, while the sambar provides a tangy, spiced lentil-based accompaniment. Whether enjoyed for breakfast, lunch, or dinner, this dish is a comforting and wholesome treat loved by many.",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/Indian-food-menu/Plain-Dosa_cc5rqu.webp",
    availability: "Available",
    restaurant: "67a08c18a817ad598a39bd54",
    ratings: 4.5,
  },
  {
    name: "Pani Puri",
    price: 6,
    short_desc: "Crispy puris filled with spiced water and chutney",
    description:
      "Crispy, hollow puris filled with a spicy and tangy mixture of flavored water, tamarind chutney, chaat masala, mashed potatoes, onions, and chickpeas, making for a flavorful and refreshing snack. This popular Indian street food, known as pani puri or golgappa, bursts with a medley of sweet, sour, and spicy flavors in every bite. The crunchy puris soak up the spiced water, creating an explosion of taste and texture. Often enjoyed as a fun and interactive treat, pani puri is perfect for gatherings, evening snacks, or simply indulging in a burst of deliciousness.",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/Indian-food-menu/panipuri-7245805_640_dkokbc.jpg",
    availability: "Available",
    restaurant: "67a08c18a817ad598a39bd54",
    ratings: 4.5,
  },
  {
    name: "Veg Pulav",
    short_desc: "Fragrant rice dish with mixed vegetables",
    price: 10,
    description:
      "A fragrant and flavorful rice dish made with long-grain basmati rice, mixed vegetables, and a blend of aromatic spices, cooked to perfection for a rich and satisfying taste. This vibrant dish, known as vegetable pulao or veg biryani, is infused with the warmth of spices like cumin, cardamom, cinnamon, and bay leaves, enhancing its depth of flavor. Served with cool and creamy raita, this meal offers a delightful contrast of textures and tastes. Perfect for lunch, dinner, or special occasions, it’s a wholesome and comforting dish loved by all.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/Indian-food-menu/veg_pulao_gcpetz.jpg",
    availability: "Available",
    restaurant: "67a08c18a817ad598a39bd54",
    ratings: 4.5,
  },
  {
    name: "Tres Leches Cake",
    price: 4,
    short_desc: "Moist sponge cake soaked in three kinds of milk",
    description:
      "A light, airy sponge cake soaked in a luscious blend of three kinds of milk—evaporated milk, condensed milk, and heavy cream—creating a rich, moist texture that melts in your mouth. This classic tres leches cake is topped with a fluffy layer of whipped cream and garnished with fresh berries for a perfect balance of sweetness and freshness. The combination of the creamy soak and the airy sponge makes every bite indulgent yet refreshing. Ideal for celebrations or as a delightful dessert, this treat is a favorite for those who love moist and decadent cakes.",
    category: "Dessert",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/Tres-Leches-Cake-1-1_qiwbzr.jpg",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
    ratings: 4.5,
  },
  {
    name: "Quesadilla",
    price: 4,
    short_desc: "Grilled tortilla with melted cheese and filling",  
    description:
      "A flour tortilla filled with a savory mixture of melted cheese, seasoned meat (such as beef, chicken, or pork), beans, and sautéed vegetables, then folded in half and grilled until golden and crispy. This quesadilla is a deliciously satisfying snack or meal, offering a perfect balance of flavors and textures. The crispy exterior contrasts with the warm, gooey filling, making it a crowd-pleaser. Served with salsa, sour cream, or guacamole, it’s ideal for lunch, dinner, or as an appetizer for gatherings. Easy to customize with your favorite ingredients for a personalized twist!",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/quesadilla_kv2zvh.jpg",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
    ratings: 4.5,
  },
  {
    name: "Mole Poblano",
    price: 12,
    short_desc: "Rich, flavorful sauce made with dried chilies and chocolate",
    description:
      "A rich, flavorful sauce made from a blend of dried chilies, dark chocolate, tomatoes, and an array of aromatic spices like cinnamon, cumin, and garlic, creating a complex and deeply satisfying taste. This mole sauce is traditionally served over chicken or turkey, providing a perfect contrast of savory, spicy, and subtly sweet flavors. The velvety texture of the sauce coats the meat, making each bite a mouthwatering experience. This dish is often served with rice or tortillas, making for a hearty, comforting meal that's perfect for special occasions or a cozy dinner.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/mole_poblano_zo9ouh.jpg",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
    ratings: 4.5,
  },
  {
    name: "Guacamole",
    price: 6,
    short_desc: "Creamy avocado dip with tomatoes and spices",
    description:
      "A creamy dip made from ripe mashed avocados, finely chopped onions, juicy tomatoes, and a blend of zesty spices like lime, garlic, and cilantro, creating a rich and refreshing flavor. This guacamole is perfect for dipping crispy tortilla chips, spreading on tacos or burritos, or even pairing with grilled meats. Its creamy texture and bright, tangy taste make it an irresistible addition to any Mexican-inspired meal. Whether enjoyed as an appetizer, side dish, or snack, guacamole is always a crowd favorite!",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/Guacamole_m5nxod.jpg",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
    ratings: 4.5,
  },
  {
    name: "Chicken ranchero",
    price: 14,
    short_desc: "Tender chicken in spicy tomato sauce with rice and beans",
    description:
      " Tender chicken breasts simmered in a flavorful, spicy tomato sauce with sautéed onions, bell peppers, garlic, and a blend of spices, creating a hearty and comforting dish. The sauce is rich, tangy, and mildly spicy, perfectly complementing the tender chicken. Served with a side of fluffy rice and seasoned beans, this dish offers a well-rounded, satisfying meal. The rice soaks up the savory sauce, while the beans add an extra layer of flavor and texture, making it a wholesome and filling meal perfect for lunch or dinner..",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/chicken-ranch-tacos_mdaemr.webp",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
    ratings: 4.5,
  },

  {
    name: "Chicken fajitas",
    price: 12,
    short_desc: "Grilled chicken with bell peppers and onions on a hot skillet",
    description:
      "Sizzling strips of grilled chicken, bell peppers, and onions seasoned with a blend of spices like cumin, chili powder, and garlic, served on a hot skillet. These chicken fajitas are perfect for assembling your own tacos or burritos, allowing you to customize each bite with your favorite toppings. The tender, flavorful chicken pairs beautifully with the charred vegetables, creating a delicious and satisfying meal. Served with warm tortillas, salsa, guacamole, and sour cream, this dish is a crowd-pleaser that's perfect for gatherings or family dinners.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/chicken-fajitas_s5tob0.jpg",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
    ratings: 4.5,
  },
  {
    name: "Salsa bjruzi",
    price: 8,
    short_desc: "Fresh tomato salsa with onions, jalapeños, and cilantro",
    description:
      "A testy and flavorful dip made from ripe tomatoes, onions, jalapeños, cilantro, and lime juice, seasoned with a blend of spices like cumin, garlic, and chili powder. This salsa is perfect for dipping crispy tortilla chips, topping tacos or burritos, or even serving as a side dish for grilled meats. Its fresh, tangy taste and vibrant colors make it a versatile and delicious addition to any Mexican-inspired meal. Whether enjoyed as an appetizer, condiment, or snack, salsa is always a crowd favorite!",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/Salsa-starter_bjruzj.jpg",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
    ratings: 4.5,
  },
  {
    name: "Enchiladas",
    price: 10,
    short_desc: "Rolled tortillas filled with chicken, cheese, and sauce",
    description:
      "Corn tortillas filled with a savory mixture of shredded chicken, cheese, and onions, rolled up and topped with a rich, spicy tomato sauce and melted cheese. These enchiladas are baked until bubbly and golden, creating a delicious and comforting dish. The tender chicken, gooey cheese, and tangy sauce combine to create a perfect balance of flavors and textures. Served with a side of rice and beans, this dish is a satisfying and flavorful meal that's perfect for lunch or dinner.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/enchiladas_gzr2g1.jpg",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
    ratings: 4.5,
  },
  {
    name: "Burrito",
    price: 12,
    short_desc: "Large flour tortilla filled with rice, beans, and meat",
    description:
      "A large flour tortilla filled with seasoned rice, beans, cheese, and your choice of meat (such as beef, chicken, or pork), wrapped up and grilled until warm and toasty. This burrito is a hearty and satisfying meal, offering a perfect balance of flavors and textures. The warm, savory filling pairs beautifully with the crispy exterior, creating a delicious and comforting dish. Served with salsa, guacamole, and sour cream, it's a crowd-pleaser that's perfect for lunch or dinner.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/burrito_g6hkrb.jpg",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
    ratings: 4.5,
  },
  {
    name: "Flan",
    price: 5,
    short_desc: "Creamy custard dessert with caramel sauce",
    description:
      "A creamy and decadent custard dessert made with eggs, milk, sugar, and vanilla, baked until set and topped with a rich caramel sauce. This flan is known for its smooth, silky texture and sweet, caramelized flavor, creating a luxurious treat that melts in your mouth. Often served chilled, it offers a perfect balance of sweetness and creaminess, making it a delightful dessert for any occasion.",
    category: "Dessert",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/Flan_bw7xpp.jpg",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
    ratings: 4.5,
  },
  {
    name: "Molletes",
    price: 5,
    short_desc: "Open-faced sandwich with refried beans and cheese",
    description:
      "A simple and delicious open-faced sandwich made with bolillo bread, refried beans, melted cheese, and a sprinkle of salsa, broiled until warm and bubbly. These molletes are perfect for breakfast, brunch, or a quick snack, offering a perfect balance of flavors and textures. The warm, toasty bread pairs beautifully with the creamy beans and gooey cheese, creating a comforting and satisfying dish. Served with a side of salsa, it's a flavorful and easy-to-make meal that's sure to please.",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520510/mexican%20food/starter-Molletes_zgvy4k.jpg",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
    ratings: 4.5,
  },
  {
    name: "Empanadas",
    price: 6,
    short_desc: "Crispy pastries filled with seasoned beef and cheese",
    description:
      "Crispy, golden-brown pastries filled with a savory mixture of seasoned ground beef, onions, peppers, and cheese, then baked until warm and delicious. These empanadas are perfect for a quick snack or a light meal, offering a perfect balance of flavors and textures. The flaky, buttery crust pairs beautifully with the rich, savory filling, creating a satisfying and comforting dish. Served with a side of salsa or guacamole, they're a crowd-pleaser that's perfect for any occasion.",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520510/mexican%20food/Empanadas_arblao.jpg",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
    ratings: 4.5,
  },

  {
    name: "Margarita",
    price: 4,
    short_desc: "Classic tequila cocktail with lime juice and orange liqueur",
    description:
      "A classic cocktail made with smooth tequila, freshly squeezed lime juice, and a splash of orange liqueur, such as Cointreau or Triple Sec, creating a perfect balance of tangy, citrusy, and slightly sweet flavors. This margarita is served over ice in a glass rimmed with salt, enhancing the flavors with a touch of savory contrast. The crisp and refreshing nature of the drink makes it an ideal choice for warm weather, casual gatherings, or any occasion that calls for a delicious, lively cocktail. Enjoy it as is or customize with fruit purees for a twist on the traditional!. ",
    category: "Beverages",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738615939/margarita-baverages_mp2enk.jpg",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
    ratings: 4.5,
  },
  {
    name: "Paloma",
    price: 6,
    short_desc: "Refreshing tequila cocktail with grapefruit soda",
    description:
      "A refreshing and tangy cocktail made with tequila, grapefruit soda, lime juice, and a pinch of salt, served over ice for a zesty and invigorating drink. This paloma is perfect for warm weather, offering a bright and citrusy flavor that's both refreshing and satisfying. The combination of tequila and grapefruit creates a perfect balance of sweet, sour, and savory notes, making it a delightful choice for casual gatherings, parties, or any occasion that calls for a lively and flavorful cocktail.",
    category: "Beverages",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738616056/paloma-drink-_inb4ph.jpg",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
    ratings: 4.5,
  },

  {
    name: "Esquites",
    price: 8,
    short_desc: "Grilled corn kernels with mayonnaise, cheese, and spices",
    description:
      "A flavorful and satisfying Mexican street food made with grilled corn kernels, mayonnaise, cotija cheese, chili powder, and lime juice, served in a cup for a delicious and easy-to-eat snack. This esquites is perfect for enjoying on the go or as a side dish, offering a perfect balance of sweet, savory, tangy, and spicy flavors. The creamy mayonnaise and salty cheese complement the charred corn, while the lime juice adds a zesty kick. Whether enjoyed as a snack or a side dish, esquites is a popular and delicious treat loved by many.",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/esquites_mcprqx.jpg",
    availability: "Available",
    restaurant: "67a08dfda817ad598a39bd58",
    ratings: 4.5,
  },
  {
    name: "Pisco Sour",
    price: 3,
    short_desc: "Classic Peruvian cocktail with pisco, lime juice, and egg white",
    description:
      "A classic Peruvian cocktail made with pisco, lime juice, simple syrup, and egg white, shaken until frothy and served in a chilled glass for a refreshing and tangy drink. This pisco sour is known for its unique combination of sweet, sour, and slightly bitter flavors, creating a perfect balance of taste and texture. The frothy egg white adds a creamy and luxurious touch, while the lime juice provides a zesty kick. Enjoyed as a pre-dinner drink or a casual cocktail, it's a delightful choice for any occasion.",
    category: "Beverages",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660456/Pisco_SOur-drink_e19tkf.avif",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
    ratings: 4.5,
  },
  {
    name: "Caipirinha",
    price: 4,
    short_desc: "Refreshing Brazilian cocktail with cachaça, lime, and sugar",
    description:
      "A refreshing Brazilian cocktail made with cachaça, lime, sugar, and ice, muddled together to create a zesty and invigorating drink. This caipirinha is known for its bright, citrusy flavor and slightly sweet taste, making it a perfect choice for warm weather or casual gatherings. The combination of cachaça and lime creates a perfect balance of tangy, sweet, and slightly bitter notes, offering a lively and refreshing cocktail that's sure to please. Enjoy it as is or customize with fresh fruit for a fun twist on the classic.",
    category: "Beverages",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660200/Caipirinha-drink_xsoxxp.jpg",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
    ratings: 4.5,
  },
  {
    name: "Chicha Morada",
    price: 12,
    short_desc: "Sweet Peruvian beverage made from purple corn and fruit",
    description:
      " A traditional Peruvian beverage made from purple corn, pineapple, cinnamon, cloves, and lime juice, simmered together to create a sweet, tangy, and aromatic drink. This chicha morada is known for its vibrant color and refreshing taste, offering a perfect balance of fruity, spicy, and citrusy flavors. Served chilled over ice, it's a delightful and invigorating drink that's perfect for warm weather or as a refreshing accompaniment to any meal.",
    category: "Beverages",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660109/chica_morada_-bevarage_yxj2ge.jpg",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
    ratings: 4.5,
  },

  {
    name: "Pollo Asado",
    price: 8,
    short_desc: "Grilled chicken marinated in citrus juices and spices",
    description:
      "Juicy and flavorful grilled chicken marinated in a blend of citrus juices, garlic, herbs, and spices, creating a tender and aromatic dish. This pollo asado is perfect for a casual meal or a festive gathering, offering a perfect balance of savory, tangy, and slightly smoky flavors. The charred exterior of the chicken adds a delicious crunch, while the juicy interior remains moist and flavorful. Served with rice, beans, and tortillas, it's a satisfying and delicious meal that's sure to please.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660143/PolloAsado-maincourse_vl7zxc.avif",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
    ratings: 4.5,
  },

  {
    name: "pabellon Criollo",
    price: 10,
    short_desc: "Venezuelan dish with shredded beef, black beans, rice, and plantains",
    description:
      "A traditional Venezuelan dish made with shredded beef, black beans, rice, and fried plantains, offering a perfect balance of savory, sweet, and tangy flavors. This pabellon criollo is known for its hearty and satisfying taste, combining tender beef with creamy beans, fluffy rice, and crispy plantains. The rich and flavorful beef pairs beautifully with the sweet plantains, creating a delicious and comforting meal. Served with a side of rice and beans, it's a wholesome and satisfying dish that's perfect for lunch or dinner.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660132/Pabellon_criollo-maincourse_a0gcpd.avif",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
    ratings: 4.5,
  },
  {
    name: "Bandeja Paisa",
    price: 12,
    short_desc: "Colombian platter with grilled steak, chorizo, chicharrón, and more",
    description:
      "A hearty Colombian platter featuring grilled steak, chorizo sausage, chicharrón (crispy pork belly), rice, beans, avocado, fried egg, and arepas, offering a delicious and satisfying meal. This bandeja paisa is known for its generous portions and rich, flavorful ingredients, creating a perfect balance of savory, smoky, and creamy flavors. The combination of meats, beans, and rice provides a hearty and satisfying meal that's perfect for lunch or dinner. Served with fresh avocado and crispy arepas, it's a delightful and indulgent dish that's sure to please.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660194/bandeja-paisa-maincourse_olj3vt.jpg",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
    ratings: 4.5,
  },
  {
    name: "Feijoada",
    price: 10,
    short_desc: "Brazilian stew with black beans, pork, sausage, and beef",
    description:
      "A rich and flavorful Brazilian stew made with black beans, pork, sausage, and beef, simmered together with onions, garlic, and spices for a hearty and satisfying dish. This feijoada is known for its complex and savory flavors, offering a perfect balance of smoky, salty, and slightly sweet tastes. The tender meats and creamy beans create a comforting and indulgent meal that's perfect for lunch or dinner. Served with rice, collard greens, and orange slices, it's a delicious and traditional dish that's sure to please.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660353/Feijoda_Brazilian_mzdtwc.avif",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
    ratings: 4.5,
  },
  {
    name: "Empanadas",
    price: 8,
    short_desc: "Crispy pastries filled with seasoned beef and cheese",
    description:
      "Crispy, golden-brown pastries filled with a savory mixture of seasoned ground beef, onions, peppers, and cheese, then baked until warm and delicious. These empanadas are perfect for a quick snack or a light meal, offering a perfect balance of flavors and textures. The flaky, buttery crust pairs beautifully with the rich, savory filling, creating a satisfying and comforting dish. Served with a side of salsa or guacamole, they're a crowd-pleaser that's perfect for any occasion.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660327/empanadas-starters_jr8qfz.avif",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
    ratings: 4.5,
  },
  {
    name: "Lomo Saltado",
    price: 12,
    short_desc: "Peruvian stir-fry with beef, onions, tomatoes, and fries",
    description:
      "A classic Peruvian stir-fry made with marinated strips of beef, onions, tomatoes, and peppers, sautéed together with soy sauce, vinegar, and spices, creating a flavorful and satisfying dish. This lomo saltado is known for its tender beef, crisp vegetables, and bold, tangy sauce, offering a perfect balance of savory, sweet, and tangy flavors. Served with a side of rice and fries, it's a hearty and delicious meal that's perfect for lunch or dinner. The combination of beef, vegetables, and starches provides a well-rounded and satisfying dish that's sure to please.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660361/Lomo_Saltado-maincourse_lyvzay.avif",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
    ratings: 4.5,
  },
  {
    name: "Arepas",
    price: 6,
    short_desc: "Cornmeal patties filled with cheese, meats, or beans",
    description:
      "A popular Venezuelan and Colombian dish made with cornmeal dough, shaped into patties, and griddled until crispy and golden, then filled with a variety of savory ingredients like cheese, meats, beans, or avocado. These arepas are perfect for breakfast, lunch, or a quick snack, offering a perfect balance of crispy, creamy, and savory flavors. The crispy exterior of the arepas contrasts beautifully with the soft, creamy filling, creating a delightful and satisfying meal. Served with a side of fresh salsa or guacamole, they're a delicious and versatile dish that's sure to please.",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660095/Arepas-starters_krax6x.avif",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
    ratings: 4.5,
  },
  {
    name: "Brigadeiro",
    price: 5,
    short_desc: "Brazilian chocolate truffles rolled in sprinkles",
    description:
      "A popular Brazilian dessert made with condensed milk, cocoa powder, butter, and chocolate sprinkles, rolled into bite-sized balls and coated with more sprinkles for a sweet and indulgent treat. These brigadeiros are perfect for parties, celebrations, or as a special treat, offering a perfect balance of creamy, chocolaty, and slightly crunchy textures. The rich and fudgy flavor of the chocolate pairs beautifully with the sweetened condensed milk, creating a delightful and satisfying dessert. Whether enjoyed as a snack or a dessert, brigadeiros are a beloved treat that's sure to please.",
    category: "Dessert",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660102/Brigadeiro-dessert_fcyeq2.avif",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
    ratings: 4.5,
  },

  {
    name: "De Dulce de Leche",
    price: 6,
    short_desc: "Argentine caramelized milk spread",
    description:
      "A rich and creamy Argentine dessert made with sweetened milk that's been slowly cooked until thick and caramelized, creating a luscious and indulgent treat. This dulce de leche is perfect for spreading on toast, filling pastries, or drizzling over ice cream, offering a perfect balance of sweet, creamy, and slightly tangy flavors. The caramelized milk creates a velvety texture and a rich, caramel-like taste that's both comforting and satisfying. Whether enjoyed on its own or as a topping, dulce de leche is a beloved treat that's sure to please.",
    category: "Dessert",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660209/De_Dulce_De_Leche-Dessert_itfrpn.avif",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
    ratings: 4.5,
  },
  {
    name: "Alfajores",
    price: 5,
    short_desc: "South American sandwich cookies with dulce de leche",
    description:
      "A popular South American dessert made with two buttery cookies sandwiched together with dulce de leche, then coated in powdered sugar or dipped in chocolate for a sweet and indulgent treat. These alfajores are perfect for snacking, dessert, or as a special treat, offering a perfect balance of crumbly, creamy, and sweet flavors. The buttery cookies provide a delicate crunch, while the dulce de leche adds a rich and creamy sweetness. Whether enjoyed with a cup of coffee or as a dessert, alfajores are a beloved treat that's sure to please.",
    category: "Beverages",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660254/delicious-alfajores-Dessert_kvp25m.avif",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
    ratings: 4.5,
  },

  {
    name: "Torta Tres Leches",
    price: 4,
    short_desc: "Moist sponge cake soaked in three kinds of milk",
    description:
      " A light and moist sponge cake soaked in a sweet and creamy blend of three kinds of milk—evaporated milk, condensed milk, and heavy cream—creating a rich and indulgent dessert. This torta tres leches is perfect for celebrations, parties, or as a special treat, offering a perfect balance of sweet, creamy, and airy textures. The sponge cake soaks up the luscious milk mixture, creating a melt-in-your-mouth experience with every bite. Topped with a fluffy layer of whipped cream and fresh berries, it's a delightful and indulgent dessert that's sure to please.",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738661694/porciontresleches_cujkma.png",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
    ratings: 4.5,
  },
  {
    name: "Tom Yum Soup",
    price: 5,
    short_desc: "Spicy and tangy Thai soup with lemongrass and shrimp",
    description:
      "A spicy and tangy soup made with lentils (or lentil soup), flavored with a variety of aromatic spices like cumin, coriander, turmeric, and chili, creating a rich and warming dish. The tanginess often comes from ingredients like tamarind, lemon juice, or tomatoes, adding a zesty contrast to the earthy lentils. It may also include vegetables such as onions, carrots, or spinach for added texture and flavor. Perfect as a hearty meal, it’s often served with rice or bread, making it a comforting, satisfying choice for lunch or dinner. It’s a nourishing dish that’s both flavorful and filling!",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738620154/Tom_Yum_Soup_lcgkd7.jpg",
    availability: "Available",
    restaurant: "67a08cdba817ad598a39bd56",
    ratings: 4.5,
  },
  {
    name: "Som Tum Papaya Salad",
    price: 6,
    short_desc: "Spicy Thai salad with shredded green papaya and peanuts",
    description:
      " A refreshing and spicy salad made with shredded green papaya, tomatoes, green beans, peanuts, and a zesty dressing of lime juice, fish sauce, and chili, creating a perfect balance of sweet, sour, salty, and spicy flavors. This som tum papaya salad is known for its vibrant colors and bold taste, offering a light and refreshing dish that's perfect for warm weather. The crunchy papaya and peanuts contrast beautifully with the tangy dressing, creating a delicious and satisfying salad. Served as a side dish or a light meal, it's a popular and flavorful choice loved by many.",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738620153/papaya-salad-som-tum-thai_rycqyr.avif",
    availability: "Available",
    restaurant: "67a08cdba817ad598a39bd56",
    ratings: 4.5,
  },
  {
    name: "Chiken Satay",
    price: 8,
    short_desc: "Grilled chicken skewers with peanut sauce",
    description:
      " A classic Thai appetizer made with marinated and grilled chicken skewers, served with a creamy peanut sauce for dipping, creating a perfect balance of savory, sweet, and nutty flavors. This chiken satay is known for its tender and flavorful chicken, charred to perfection on the grill, offering a delicious and satisfying starter. The creamy peanut sauce adds a rich and nutty taste that complements the smoky chicken, creating a delightful combination of flavors and textures. Served with a side of cucumber salad, it's a popular and delicious choice for any occasion.",
    category: "Starters",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738620149/chicken-Satay_rxwtpt.avif",
    availability: "Available",
    restaurant: "67a08cdba817ad598a39bd56",
    ratings: 4.5,
  },
  {
    name: "Pad Thai",
    price: 12,
    short_desc: "Stir-fried rice noodles with shrimp, tofu, and peanuts",
    description:
      "A classic Thai stir-fried noodle dish made with rice noodles, shrimp, tofu, eggs, peanuts, and a tangy tamarind sauce, creating a perfect balance of sweet, sour, and salty flavors. This pad thai is known for its vibrant colors and bold taste, offering a light and satisfying meal that's perfect for lunch or dinner. The chewy noodles and crunchy peanuts contrast beautifully with the tangy sauce, creating a delicious and flavorful dish. Served with a side of lime wedges and bean sprouts, it's a popular and beloved choice loved by many.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738620152/flavorful-pad-thai-dish-_sgqyih.avif",
    availability: "Available",
    restaurant: "67a08cdba817ad598a39bd56",
    ratings: 4.5,
  },
  {
    name: "Green Curry",
    price: 10,
    short_desc: "Spicy Thai curry with chicken, eggplant, and basil",
    description:
      " A fragrant and spicy curry made with Chicken, eggplant, bell peppers, and Thai basil, simmered in a rich and creamy coconut milk sauce, creating a perfect balance of sweet, savory, and spicy flavors. This green curry is known for its vibrant colors and bold taste, offering a light and satisfying meal that's perfect for lunch or dinner. The tender chicken and crunchy vegetables contrast beautifully with the creamy sauce, creating a delicious and flavorful dish. Served with a side of jasmine rice, it's a popular and beloved choice loved by many.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738620149/Chiken-green-curry-_myqyhb.avif",
    availability: "Available",
    restaurant: "67a08cdba817ad598a39bd56",
    ratings: 4.5,
  },

  {
    name: "Chicken Massaman Curry",
    price: 14,
    short_desc: "Rich Thai curry with chicken, potatoes, and peanuts",
    description:
      " A rich and aromatic curry made with Chicken, potatoes, onions, peanuts, and a blend of spices like cinnamon, cardamom, and cloves, simmered in a creamy coconut milk sauce, creating a perfect balance of sweet, savory, and spicy flavors. This chiken massaman curry is known for its complex and bold taste, offering a hearty and satisfying meal that's perfect for lunch or dinner. The tender chicken and creamy potatoes contrast beautifully with the fragrant sauce, creating a delicious and flavorful dish. Served with a side of jasmine rice, it's a popular and beloved choice loved by many.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738620149/chiken_massaman_curry_armtjg.webp",
    availability: "Available",

    restaurant: "67a08cdba817ad598a39bd56",
    ratings: 4.5,
  },

  {
    name: "Thai Basil Fried Rice",
    price: 12,
    short_desc: "Fried rice with chicken, bell peppers, and Thai basil",
    description:
      "A flavorful and aromatic fried rice made with Chicken, bell peppers, onions, Thai basil, and a blend of spices like garlic, chili, and fish sauce, creating a perfect balance of sweet, savory, and spicy flavors. This Thai basil fried rice is known for its vibrant colors and bold taste, offering a light and satisfying meal that's perfect for lunch or dinner. The tender chicken and crunchy vegetables contrast beautifully with the fragrant rice, creating a delicious and flavorful dish. Served with a side of lime wedges and cucumber slices, it's a popular and beloved choice loved by many.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/Salsa-starter_bjruzj.jpg",
    availability: "Available",
    restaurant: "67a08cdba817ad598a39bd56",
    ratings: 4.5,
  },
  {
    name: "Mango Sticky Rice",
    price: 6,
    short_desc: "Sweet Thai dessert with ripe mangoes and coconut milk",
    description:
      "A sweet and creamy dessert made with ripe mangoes, sticky rice, coconut milk, and sugar, creating a perfect balance of sweet, tangy, and creamy flavors. This mango sticky rice is known for its vibrant colors and tropical taste, offering a light and refreshing treat that's perfect for dessert or a snack. The juicy mangoes and chewy rice contrast beautifully with the creamy coconut milk, creating a delicious and satisfying dish. Served with a sprinkle of sesame seeds, it's a popular and beloved choice loved by many.",
    category: "Dessert",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738620153/Mangosticky_rice-Dessert_tdv2vr.webp",
    availability: "Available",
    restaurant: "67a08cdba817ad598a39bd56",
    ratings: 4.5,
  },
  {
    name: "Steamed Fish with Lime",
    price: 15,
    short_desc: "Light and flavorful Thai dish with fresh fish and lime",
    description:
      "A light and flavorful dish made with fresh fish fillets, garlic, ginger, lime juice, and a blend of spices like coriander, cumin, and turmeric, steamed to perfection for a tender and aromatic meal. This steamed fish with lime is known for its delicate and fragrant taste, offering a healthy and satisfying option that's perfect for lunch or dinner. The tender fish and zesty lime contrast beautifully with the aromatic spices, creating a delicious and flavorful dish. Served with a side of jasmine rice and steamed vegetables, it's a popular and beloved choice loved by many.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738620153/Steamed_fish_with_Lemon_agsswk.avif",
    availability: "Available",
    restaurant: "67a08cdba817ad598a39bd56",
    ratings: 4.5,
  },
  {
    name: "Coconut Ice Cream",
    price: 6,
    short_desc: "Creamy Thai dessert made with coconut milk and shredded coconut",
    description:
      "A creamy and refreshing dessert made with coconut milk, sugar, and shredded coconut, churned until smooth and frozen for a cool and indulgent treat. This coconut ice cream is known for its rich and tropical flavor, offering a light and satisfying dessert that's perfect for a hot day. The creamy coconut milk and sweet sugar create a perfect balance of sweet and creamy tastes, while the shredded coconut adds a delightful crunch. Served in a bowl or cone, it's a popular and beloved choice loved by many.",
    category: "Dessert",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738620149/coconut-ice-cream-coconut-dessert_jfagqg.avif",
    availability: "Available",
    restaurant: "67a08cdba817ad598a39bd56",
    ratings: 4.5,
  },
  {
    name: "Thai Pumpkin Custard",
    price: 5,
    short_desc: "Sweet and creamy dessert made with Kabocha squash and coconut milk",
    description:
      "A sweet and creamy dessert made with Kabocha squash, coconut milk, eggs, and sugar, steamed until set and topped with a rich coconut cream sauce, creating a perfect balance of sweet, creamy, and slightly savory flavors. This Thai pumpkin custard is known for its vibrant colors and tropical taste, offering a light and satisfying treat that's perfect for dessert or a snack. The tender squash and creamy coconut milk contrast beautifully with the rich coconut cream, creating a delicious and flavorful dish. Served with a sprinkle of sesame seeds, it's a popular and beloved choice loved by many.",
    category: "Dessert",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738622101/Kabocha-Custard-3-800_pzmzjn.jpg",
    availability: "Available",
    restaurant: "67a08cdba817ad598a39bd56",
    ratings: 4.5,
  },
  {
    name: "Thai Iced Tea",
    price: 4,
    short_desc: "Sweet and creamy beverage made with black tea and condensed milk",
    description:
      "A sweet and creamy beverage made with black tea, sugar, and condensed milk, served over ice for a refreshing and indulgent drink. This Thai iced tea is known for its vibrant colors and bold taste, offering a light and satisfying treat that's perfect for a hot day. The strong black tea and sweet condensed milk create a perfect balance of sweet and creamy tastes, while the ice adds a refreshing touch. Served in a tall glass, it's a popular and beloved choice loved by many.",
    category: "Beverages",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738619749/depositphotos_71672447-stock-photo-thai-milk-tea_l27nej.webp",
    availability: "Available",
    restaurant: "67a08cdba817ad598a39bd56",
    ratings: 4.5,
  },

  {
    name: "Roselle Juice",
    price: 3,
    short_desc: "Tangy and refreshing beverage made with dried hibiscus flowers",
    description:
      "A tangy and refreshing beverage made with dried hibiscus flowers, sugar, and water, steeped until rich and flavorful, then served over ice for a cool and invigorating drink. This roselle juice is known for its vibrant color and bold taste, offering a light and satisfying treat that's perfect for a hot day. The tangy hibiscus flowers and sweet sugar create a perfect balance of sweet and sour tastes, while the ice adds a refreshing touch. Served in a tall glass, it's a popular and beloved choice loved by many.",
    category: "Beverages",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738620080/roselle-juice-ready-drink-glass_1150-26238_c0l1lv.avif",
    availability: "Available",
    restaurant: "67a08cdba817ad598a39bd56",
    ratings: 4.5,
  },
  {
    name: "Thai Coconut Water",
    price: 5,
    short_desc: "Refreshing beverage made with fresh coconut water",
    description:
      "A light and refreshing beverage made with fresh coconut water, served in a young coconut for a cool and hydrating drink. This Thai coconut water is known for its clear and slightly sweet taste, offering a light and satisfying treat that's perfect for a hot day. The fresh coconut water provides a natural and refreshing flavor, while the young coconut adds a fun and tropical touch. Served with a straw, it's a popular and beloved choice loved by many.",
    category: "Beverages",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738623000/coconut-drink-with-straw-small-umbrella-white-table_9975-124808_zule9k.avif",
    availability: "Available",
    restaurant: "67a08cdba817ad598a39bd56",
    ratings: 4.5,
  },
  {
    name: "Thai Basil Fried Rice",
    price: 12,
    short_desc: "Fried rice with chicken, bell peppers, and Thai basil",
    description:
      "A flavorful and aromatic fried rice made with Chicken, bell peppers, onions, Thai basil, and a blend of spices like garlic, chili, and fish sauce, creating a perfect balance of sweet, savory, and spicy flavors. This Thai basil fried rice is known for its vibrant colors and bold taste, offering a light and satisfying meal that's perfect for lunch or dinner. The tender chicken and crunchy vegetables contrast beautifully with the fragrant rice, creating a delicious and flavorful dish. Served with a side of lime wedges and cucumber slices, it's a popular and beloved choice loved by many.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/Salsa-starter_bjruzj.jpg",
    availability: "Not Available",
    restaurant: "67a08cdba817ad598a39bd56",
    ratings: 4.5,
  },
  {
    name: "Green Curry",
    price: 10,
    short_desc: "Spicy Thai curry with chicken, eggplant, and basil",
    description:
      " A fragrant and spicy curry made with Chicken, eggplant, bell peppers, and Thai basil, simmered in a rich and creamy coconut milk sauce, creating a perfect balance of sweet, savory, and spicy flavors. This green curry is known for its vibrant colors and bold taste, offering a light and satisfying meal that's perfect for lunch or dinner. The tender chicken and crunchy vegetables contrast beautifully with the creamy sauce, creating a delicious and flavorful dish. Served with a side of jasmine rice, it's a popular and beloved choice loved by many.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738620149/Chiken-green-curry-_myqyhb.avif",
    availability: "Available",
    restaurant: "67a08cdba817ad598a39bd56",
    ratings: 4.5,
  },
  {
    name: "De Dulce de Leche",
    price: 6,
    short_desc: "Argentine caramelized milk spread",
    description:
      "A rich and creamy Argentine dessert made with sweetened milk that's been slowly cooked until thick and caramelized, creating a luscious and indulgent treat. This dulce de leche is perfect for spreading on toast, filling pastries, or drizzling over ice cream, offering a perfect balance of sweet, creamy, and slightly tangy flavors. The caramelized milk creates a velvety texture and a rich, caramel-like taste that's both comforting and satisfying. Whether enjoyed on its own or as a topping, dulce de leche is a beloved treat that's sure to please.",
    category: "Dessert",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738660209/De_Dulce_De_Leche-Dessert_itfrpn.avif",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
    ratings: 4.5,
  },
  {
    name: "Steak",
    price: 22,
    short_desc: "Grilled steak with mashed potatoes",
    description:
      "A perfectly grilled, juicy steak seasoned with a blend of salt, pepper, and aromatic herbs, seared to lock in its rich, smoky flavor. Cooked to your preferred doneness, the tender steak pairs beautifully with a side of creamy, buttery mashed potatoes, whipped to smooth perfection. This classic and hearty dish offers a satisfying balance of savory flavors and comforting textures, making it a favorite for steak lovers and a staple at steakhouses and family dinners alike.",
    category: "Main Course",
    imageUrl:
      "https://res.cloudinary.com/difmxsysx/image/upload/v1738763604/Steak_Gemuse_uub0dk.jpg",
    availability: "Available",
    restaurant: "67a08f0fa817ad598a39bd5a",
    ratings: 4.5,
  },
  
];
export default menuItems;
