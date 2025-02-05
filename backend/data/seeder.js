//menu item database




const menuItems = [
  
    {
      "name": "Samosa",
      "price": 5,
      "description": "Crispy fried pastry with spicy potato filling",
      "category": "Starters",
      "imageUrl": "https://res.cloudinary.com/difmxsysx/image/upload/v1738584143/samosa_yyuhnl.webp",
      "availability": "Available",
      "restaurant": "67a08c18a817ad598a39bd54"
    },
    {
      "name": "Butter Chicken",
      "price": 15,
      "description": "Creamy tomato-based chicken curry",
      "category": "Main Course",
      "imageUrl": "https://res.cloudinary.com/difmxsysx/image/upload/v1738584143/butter-chicken_tsnbga.jpg",
      "availability": "Available",
      "restaurant": "67a08c18a817ad598a39bd54"
    },
    {
      "name": "Gulab Jamun",
      "price": 7,
      "description": "Deep-fried dumplings soaked in sugar syrup",
      "category": "Dessert",
      "imageUrl": "https://res.cloudinary.com/difmxsysx/image/upload/v1738584143/Gulab-Jamun_ry0uvd.jpg",
      "availability": "Available",
      "restaurant": "67a08c18a817ad598a39bd54"
    },
    {
      "name": "Mango Lassi",
      "price": 4,
      "description": "Sweet yogurt-based mango drink",
      "category": "Beverages",
      "imageUrl": "https://res.cloudinary.com/difmxsysx/image/upload/v1738584142/mango_lassi_ibs2ol.jpg",
      "availability": "Available",
      "restaurant": "67a08c18a817ad598a39bd54"
    },
    {
      "name": "Buffalo Wings",
      "price": 9,
      "description": "Spicy chicken wings served with ranch dressing",
      "category": "Starters",
      "imageUrl": "https://res.cloudinary.com/difmxsysx/image/upload/v1738584141/Buffalo_Wings_islhkv.jpg",
      "availability": "Available",
      "restaurant": "67a08f0fa817ad598a39bd5a"
    },
    {
      "name": "Steak",
      "price": 22,
      "description": "Grilled steak with mashed potatoes",
      "category": "Main Course",
      "imageUrl": "https://res.cloudinary.com/difmxsysx/image/upload/v1738763604/Steak_Gemuse_uub0dk.jpg",
      "availability": "Available",
      "restaurant": "67a08f0fa817ad598a39bd5a"
    },
    {
      "name": "Cheesecake",
      "price": 8,
      "description": "Classic New York-style cheesecake",
      "category": "Dessert",
      "imageUrl": "https://res.cloudinary.com/difmxsysx/image/upload/v1738584142/Cheesecake_oxqsli.jpg",
      "availability": "Available",
      "restaurant": "67a08f0fa817ad598a39bd5a"
    },
    {
      "name": "Root Beer Float",
      "price": 5,
      "description": "Root beer with a scoop of vanilla ice cream",
      "category": "Beverages",
      "imageUrl": "https://res.cloudinary.com/difmxsysx/image/upload/v1738584142/Root_Beer_Float_rnwr4x.jpg",
      "availability": "Available",
      "restaurant": "67a08f0fa817ad598a39bd5a"
    },
    {
      "name": "Chicken tandoori",
      "price": 6,
      "description": "Juicy chicken marinated in spiced yogurt, roasted to perfection in a tandoor, and served with fresh lemon wedges and mint chutney.",
      "category": "Starters",
      "imageUrl": "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/Indian-food-menu/tandoori-3856045_640_jqkql8.jpg",
      "availability": "Available",
      "restaurant": "67a08c18a817ad598a39bd54"
    },
    {
      "name": "Matar Paneer",
      "price": 10,
      "description": "Soft paneer cubes cooked with green peas in a rich, spiced tomato-based gravy, served with fresh coriander garnish.",
      "category": "Main Course",
      "imageUrl": "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/Indian-food-menu/matar-paneer-1_h8zk8f.webp",
      "availability": "Available",
      "restaurant": "67a08c18a817ad598a39bd54"
    },
    {
      "name": "Hyderabadi Chiken Biryani",
      "price": 15,
      "description": "Fragrant basmati rice cooked with marinated chicken and aromatic spices.",
      "category": "Main Course",
      "imageUrl": "https://res.cloudinary.com/difmxsysx/image/upload/v1738520511/Indian-food-menu/chiken-biryani_q5iqj8.jpg",
      "availability": "Available",
      "restaurant": "67a08c18a817ad598a39bd54"
    },
    {
      "name": "VegPuff",
      "price": 4,
      "description": "Crispy deep-fried pastry filled with spiced potatoes and peas and onions.",
      "category": "Starters",
      "imageUrl": "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/Indian-food-menu/vegpuff_omlqxd.jpg",
      "availability": "Available",
      "restaurant": "67a08c18a817ad598a39bd54"
    },
    {
      "name": "Pastries",
      "price": 5,
      "description": "Delightful, flaky pastries with a buttery texture, available in a variety of flavors, from rich chocolate to fruity delights, perfect for a sweet treat.",
      "category": "Dessert",
      "imageUrl": "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/Indian-food-menu/Assorted_Pastries_-_Indian_s86lne.jpg",
      "availability": "Available",
      "restaurant": "67a08c18a817ad598a39bd54"
    },
    {
      "name": "Egg Biryani",
      "price": 12,
      "description": "Fragrant basmati rice cooked with boiled eggs, aromatic spices, and herbs, served with raita for a flavorful experience.",
      "category": "Main Course",
      "imageUrl": "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/Indian-food-menu/Egg-Biryani-Featured-1_v3omzq.jpg",
      "availability": "Available",
      "restaurant": "67a08c18a817ad598a39bd54"
    },
    {
      "name": "Rasamalai",
      "price": 8,
      "description": "Soft and spongy cottage cheese dumplings soaked in sweet, saffron-infused milk, garnished with chopped nuts for a rich and creamy dessert experience.",
      "category": "Dessert",
      "imageUrl": "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/Indian-food-menu/rasamalai_dss8ho.jpg",
      "availability": "Available",
      "restaurant": "67a08c18a817ad598a39bd54"
    },
    {
      "name": "Mutton Biryani",
      "price": 16,
      "description": "Fragrant basmati rice cooked with tender mutton pieces, aromatic spices, and herbs, served with raita for a flavorful experience.",
      "category": "Main Course",
      "imageUrl": "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/Indian-food-menu/mutton-biryani_ytpbki.jpg",
      "availability": "Available",
      "restaurant": "67a08c18a817ad598a39bd54"
    },
    {
      "name": "Idli",
      "price": 10,
      "description": "Soft and fluffy steamed rice cakes made from a fermented batter of rice and lentils, served with coconut chutney and flavorful sambar for a wholesome and healthy meal.",
      "category": "Starters",
      "imageUrl": "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/Indian-food-menu/idli-breakfast_msw6cr.webp",
      "availability": "Available",
      "restaurant": "67a08c18a817ad598a39bd54"
    },
    {
      "name": "Omelette",
      "price": 6,
      "description": "A versatile egg dish that can be made plain or with a variety of fillings, perfect for breakfast or snack item.",
      "category": "Starters",
      "imageUrl": "https://res.cloudinary.com/difmxsysx/image/upload/v1738520512/Indian-food-menu/omlet-starter_ftngrz.jpg",
      "availability": "Available",
      "restaurant": "67a08c18a817ad598a39bd54"
    },
    {
      "name": "Plain Dosa",
      "price": 8,
      "description": "A crispy, golden-brown dosa filled with a spicy potato filling, served with coconut chutney and sambar for a delicious and satisfying meal.",
      "category": "Starters",
      "imageUrl": "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/Indian-food-menu/Plain-Dosa_cc5rqu.webp",
      "availability": "Available",
      "restaurant": "67a08c18a817ad598a39bd54"
    },
    {
      "name": "Pani Puri",
      "price": 6,
      "description": "Crispy, hollow puris filled with a spicy and tangy mixture of flavored water, tamarind chutney, chaat masala, potato, onion, and chickpeas, perfect for a flavorful and refreshing snack.",
      "category": "Starters",
      "imageUrl": "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/Indian-food-menu/panipuri-7245805_640_dkokbc.jpg",
      "availability": "Available",
      "restaurant": "67a08c18a817ad598a39bd54"
    },
    {
      "name": "Veg Pulav",
      "price": 10,
      "description": "A fragrant and flavorful rice dish made with basmati rice, mixed vegetables, and aromatic spices, served with raita for a delicious and satisfying meal.",
      "category": "Main Course",
      "imageUrl": "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/Indian-food-menu/veg_pulao_gcpetz.jpg",
      "availability": "Available",
      "restaurant": "67a08c18a817ad598a39bd54"
    },
    {
      name: "Tres Leches Cake",
      price: 4,
      description:
        "A light, airy sponge cake soaked in a sweet mixture of three kinds of milk, topped with whipped cream and fresh berries.",
      category: "Dessert",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/Tres-Leches-Cake-1-1_qiwbzr.jpg",
      availability: "Available",
      restaurant: "67a08dfda817ad598a39bd58",
    },
    {
      name: "Quesadilla",
      price: 4,
      description:
        "A flour tortilla filled with a savory mixture of cheese, meat, beans, and vegetables, folded in half and grilled until crispy.",
      category: "Starters",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/quesadilla_kv2zvh.jpg",
      availability: "Available",
      restaurant: "67a08dfda817ad598a39bd58",
    },
    {
      name: "Mole Poblano",
      price: 12,
      description:
        "A rich, flavorful sauce made from a blend of chilies, chocolate, and spices, served over chicken or turkey for a delicious and hearty meal.",
      category: "Main Course",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/mole_poblano_zo9ouh.jpg",
      availability: "Available",
      restaurant: "67a08dfda817ad598a39bd58",
    },
    {
      name: "Guacamole",
      price: 6,
      description:
        "A creamy dip made from mashed avocados, onions, tomatoes, and spices, perfect for dipping tortilla chips or spreading on tacos and burritos.",
      category: "Starters",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/Guacamole_m5nxod.jpg",
      availability: "Available",
      restaurant: "67a08dfda817ad598a39bd58",
    },
    {
      name: "Chicken ranchero",
      price: 14,
      description:
        "Tender chicken breasts cooked in a spicy tomato sauce with onions, peppers, and garlic, served with rice and beans for a satisfying meal.",
      category: "Main Course",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/chicken-ranch-tacos_mdaemr.webp",
      availability: "Available",
      restaurant: "67a08dfda817ad598a39bd58",
    },
  
    {
      name: "Chicken fajitas",
      price: 12,
      description:
        "Sizzling strips of chicken cooked with bell peppers and onions, served with warm tortillas, guacamole, and sour cream for a fun and interactive meal.",
      category: "Main Course",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/chicken-fajitas_s5tob0.jpg",
      availability: "Available",
      restaurant: "67a08dfda817ad598a39bd58",
    },
    {
      name: "Salsa bjruzi",
      price: 8,
      description:
        "A spicy and tangy sauce made from tomatoes, onions, chilies, and cilantro, perfect for dipping tortilla chips or topping tacos and burritos.",
      category: "Starters",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/Salsa-starter_bjruzj.jpg",
      availability: "Available",
      restaurant: "67a08dfda817ad598a39bd58",
    },
    {
      name: "Enchiladas",
      price: 10,
      description:
        "Corn tortillas filled with a savory mixture of meat, cheese, and beans, rolled up and topped with a spicy sauce and melted cheese.",
      category: "Main Course",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/enchiladas_gzr2g1.jpg",
      availability: "Available",
      restaurant: "67a08dfda817ad598a39bd58",
    },
    {
      name: "Burrito",
      price: 12,
      description:
        "A large flour tortilla filled with a savory mixture of meat, rice, beans, and cheese, rolled up and grilled until crispy, served with salsa and sour cream.",
      category: "Main Course",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/burrito_g6hkrb.jpg",
      availability: "Available",
      restaurant: "67a08dfda817ad598a39bd58",
    },
    {
      name: "Flan",
      price: 5,
      description:
        "A rich and creamy custard dessert topped with caramel sauce, perfect for a sweet treat after a meal.",
      category: "Dessert",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/Flan_bw7xpp.jpg",
      availability: "Available",
      restaurant: "67a08dfda817ad598a39bd58",
    },
    {
      name: "Molletes",
      price: 5,
      description:
        "A traditional Mexican dish made with bolillo bread, refried beans, cheese, and salsa, perfect for breakfast or a light meal.",
      category: "Starters",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738520510/mexican%20food/starter-Molletes_zgvy4k.jpg",
      availability: "Available",
      restaurant: "67a08dfda817ad598a39bd58",
    },
    {
      name: "Empanadas",
      price: 6,
      description:
        "A flaky pastry filled with a savory mixture of meat, cheese, and vegetables, perfect for a snack or light meal.",
      category: "Starters",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738520510/mexican%20food/Empanadas_arblao.jpg",
      availability: "Available",
      restaurant: "67a08dfda817ad598a39bd58",
    },
  
    {
      name: "Margarita",
      price: 4,
      description:
        "A classic cocktail made with tequila, lime juice, and orange liqueur, served in a salt-rimmed glass for a refreshing and tangy drink.",
      category: "Beverages",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738615939/margarita-baverages_mp2enk.jpg",
      availability: "Available",
      restaurant: "67a08dfda817ad598a39bd58",
    },
    {
      name: "Paloma",
      price: 6,
      description:
        "A refreshing cocktail made with tequila, grapefruit soda, and lime juice, served over ice for a tangy and bubbly drink.",
      category: "Beverages",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738616056/paloma-drink-_inb4ph.jpg",
      availability: "Available",
      restaurant: "67a08dfda817ad598a39bd58",
    },
  
    {
      name: "Esquites",
      price: 8,
      description:
        "A popular Mexican street food made with corn kernels cooked with mayonnaise, cheese, chili powder, and lime juice, served in a cup for a flavorful and spicy snack.",
      category: "Starters",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/esquites_mcprqx.jpg",
      availability: "Available",
      restaurant: "67a08dfda817ad598a39bd58",
    },
    {
      name: "Pisco Sour",
      price: 3,
      description:
        "A classic cocktail made with pisco, lime juice, simple syrup, and egg white, served in a chilled glass for a refreshing and tangy drink.",
      category: "Beverages",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738660456/Pisco_SOur-drink_e19tkf.avif",
      availability: "Available",
      restaurant: "67a08f0fa817ad598a39bd5a",
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
      restaurant: "67a08f0fa817ad598a39bd5a",
    },
    {
      name: "Chicha Morada",
      price: 12,
      description:
        " A sweet and tangy Peruvian drink made from purple corn, pineapple, cinnamon, and cloves, served over ice for a refreshing and colorful beverage.",
      category: "Beverages",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738660109/chica_morada_-bevarage_yxj2ge.jpg",
      availability: "Available",
      restaurant: "67a08f0fa817ad598a39bd5a",
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
      restaurant: "67a08f0fa817ad598a39bd5a",
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
      restaurant: "67a08f0fa817ad598a39bd5a",
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
      restaurant: "67a08f0fa817ad598a39bd5a",
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
      restaurant: "67a08f0fa817ad598a39bd5a",
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
      restaurant: "67a08f0fa817ad598a39bd5a",
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
      restaurant: "67a08f0fa817ad598a39bd5a",
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
      restaurant: "67a08f0fa817ad598a39bd5a",
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
      restaurant: "67a08f0fa817ad598a39bd5a",
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
      restaurant: "67a08f0fa817ad598a39bd5a",
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
      restaurant: "67a08f0fa817ad598a39bd5a",
    },
  
    {
      name: "Torta Tres Leches",
      price: 4,
      description:
        " A light and moist sponge cake soaked in a sweet mixture of three kinds of milk, topped with whipped cream and fresh berries for a rich and indulgent dessert.",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738661694/porciontresleches_cujkma.png",
      availability: "Available",
      restaurant: "67a08f0fa817ad598a39bd5a",
    },
    {
      name: "Tom Yum Soup",
      price: 5,
      description: " A spicy and sour soup made with lemonegrass, kaff",
      category: "Starters",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738620154/Tom_Yum_Soup_lcgkd7.jpg",
      availability: "Available",
      restaurant: "67a08cdba817ad598a39bd56",
    },
    {
      name: "Som Tum Papaya Salad",
      price: 6,
      description:
        "A spicy and tangy salad made with shredded green papaya, tomatoes, green beans, and peanuts, dressed with a lime and fish sauce vinaigrette.",
      category: "Starters",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738620153/papaya-salad-som-tum-thai_rycqyr.avif",
      availability: "Available",
      restaurant: "67a08cdba817ad598a39bd56",
    },
    {
      name: "Chiken Satay",
      price: 8,
      description:
        " Grilled chicken skewers marinated in a blend of spices and served with a creamy peanut sauce for dipping.",
      category: "Starters",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738620149/chicken-Satay_rxwtpt.avif",
      availability: "Available",
      restaurant: "67a08cdba817ad598a39bd56",
    },
    {
      name: "Pad Thai",
      price: 12,
      description:
        "A classic stir-fried noodle dish made with rice noodles, shrimp, tofu, eggs, and bean sprouts, flavored with tamarind, fish sauce, and peanuts.",
      category: "Main Course",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738620152/flavorful-pad-thai-dish-_sgqyih.avif",
      availability: "Available",
      restaurant: "67a08cdba817ad598a39bd56",
    },
    {
      name: "Green Curry",
      price: 10,
      description:
        "A spicy and aromatic curry made with green chilies, lemone, Chicken, and coconut milk, served with steamed rice for a satisfying meal.",
      category: "Main Course",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738620149/Chiken-green-curry-_myqyhb.avif",
      availability: "Available",
      restaurant: "67a08cdba817ad598a39bd56",
    },
  
    {
      name: "Chicken Massaman Curry",
      price: 14,
      description:
        " A rich and flavorful curry made with Chicken, potatoes, onions, and peanuts, flavored with a blend of spices and coconut milk.",
      category: "Main Course",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738620149/chiken_massaman_curry_armtjg.webp",
      availability: "Available",
      restaurant: "67a08cdba817ad598a39bd56",
    },
    {
      name: "Thai Basil Fried Rice",
      price: 12,
      description:
        "A fragrant and spicy stir-fried rice dish made with Chicken, basil, chilies, and garlic, served with a fried egg on top for a delicious and satisfying meal.",
      category: "Main Course",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738520508/mexican%20food/Salsa-starter_bjruzj.jpg",
      availability: "Available",
      restaurant: "67a08cdba817ad598a39bd56",
    },
    {
      name: "Mango Sticky Rice",
      price: 6,
      description:
        "A classic Thai dessert made with sweet sticky rice, fresh mango slices, and coconut milk, perfect for a sweet treat after a meal.",
      category: "Dessert",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738620153/Mangosticky_rice-Dessert_tdv2vr.webp",
      availability: "Available",
      restaurant: "67a08cdba817ad598a39bd56",
    },
    {
      name: "Steamed Fish with Lime",
      price: 15,
      description:
        "A light and flavorful dish made with steamed fish fillets, lime juice, garlic, and cilantro, perfect for a healthy and delicious meal.",
      category: "Main Course",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738620153/Steamed_fish_with_Lemon_agsswk.avif",
      availability: "Available",
      restaurant: "67a08cdba817ad598a39bd56",
    },
    {
      name: "Coconut Ice Cream",
      price: 6,
      description:
        "A creamy and refreshing dessert made with coconut milk, sugar, and shredded coconut, perfect for a sweet and tropical treat.",
      category: "Dessert",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738620149/coconut-ice-cream-coconut-dessert_jfagqg.avif",
      availability: "Available",
      restaurant: "67a08cdba817ad598a39bd56",
    },
    {
      name: "Thai Pumpkin Custard",
      price: 5,
      description:
        "A sweet and creamy dessert made with pumpkin, coconut milk, eggs, and sugar, steamed to perfection for a rich and satisfying treat.",
      category: "Dessert",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738622101/Kabocha-Custard-3-800_pzmzjn.jpg",
      availability: "Available",
      restaurant: "67a08cdba817ad598a39bd56",
    },
    {
      name: "Thai Iced Tea",
      price: 4,
      description:
        "A sweet and creamy iced tea made with black tea, condensed milk, and sugar, served over ice for a refreshing and indulgent drink.",
      category: "Beverages",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738619749/depositphotos_71672447-stock-photo-thai-milk-tea_l27nej.webp",
      availability: "Available",
      restaurant: "67a08cdba817ad598a39bd56",
    },
  
    {
      name: "Roselle Juice",
      price: 3,
      description:
        "A tangy and refreshing juice made from the calyces of the roselle plant, sweetened with sugar and served over ice for a cooling and invigorating drink.",
      category: "Beverages",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738620080/roselle-juice-ready-drink-glass_1150-26238_c0l1lv.avif",
      availability: "Available",
      restaurant: "67a08cdba817ad598a39bd56",
    },
    {
      name: "Thai Coconut Water",
      price: 5,
      description:
        "Fresh and hydrating coconut water served in a young coconut for a natural and refreshing drink.",
      category: "Beverages",
      imageUrl:
        "https://res.cloudinary.com/difmxsysx/image/upload/v1738623000/coconut-drink-with-straw-small-umbrella-white-table_9975-124808_zule9k.avif",
      availability: "Available",
      restaurant: "67a08cdba817ad598a39bd56",
    }
  
  
  
];
export default menuItems;

