import Restaurant from "../models/restaurantSchema.js";
import User from "../models/userSchema.js";
import Sentiment from 'sentiment';
import Order from "../models/orderSchema.js";

export const getRestaurants = async (req, res) => {
    try{
        const restaurants = await Restaurant.find();
        if(!restaurants){
            return res.status(404).json({
                message: "No restaurants found",
            });
        }
        res.status(200).json({
            message: "All restaurants fetched successfully",
            data: restaurants
        });

    }
    catch(err){
        res.status(500).json({
            message: "An error occurred while fetching restaurants",
            error: err.message
        });
    }

}

export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }
    res.status(200).json({
      message: "Restaurant fetched successfully",
      data: restaurant,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while fetching restaurant",
      error: err.message,
    });
  }
};

export const getRestaurantByName = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Please provide a valid restaurant name.",
      });
    }

    const restaurants = await Restaurant.find({
      name: new RegExp(name.trim(), "i"), // 'i' makes it case-insensitive
    }).lean();

    if (restaurants.length === 0) {
      return res.status(404).json({
        message: `No restaurant found with the name "${name}".`,
      });
    }

    res.status(200).json({
      message: "Restaurants fetched successfully.",
      data: restaurants, // Now returning an array
    });

  } catch (err) {
    console.error("Error fetching restaurant:", err);
    res.status(500).json({ 
      message: "An error occurred while fetching the restaurant.", 
      error: err.message 
    });
  }
};


export const createRestaurant = async (req, res) => {
    try{
        const  {name,location,images,contact,operatingHours} = req.body;
        if(!name || !location || !images || !contact || !operatingHours){
            return res.status(400).json({
                message: "Please provide all required fields",
            });
        }
        const validImageURLs = images.every((imageUrl) => {
            return imageUrl.startsWith("https://res.cloudinary.com/");
          });
          if (!validImageURLs) {
            return res.status(400).json({
              message: "All image URLs must be from Cloudinary.",
            });
          }
        const newRestaurant = await Restaurant.create({ name,location,images,contact,operatingHours});

        if(!newRestaurant){
            return res.status(400).json({
                message: "An error occurred while creating restaurant",
            });
        }
        res.status(201).json({
            message: "Restaurant created successfully",
            data: newRestaurant
        });

    }
    catch(err){
        res.status(500).json({
            message: "An error occurred while creating restaurant",
            error: err.message
        });
    }
};

export const updateRestaurant = async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true , runValidators: true },
    );
    if (!updatedRestaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }
    res.status(200).json({
      message: "Restaurant updated successfully",
      data: updatedRestaurant,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while updating restaurant",
      error: err.message,
    });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deletedRestaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }
    res.status(200).json({
      message: "Restaurant deleted successfully",
      data: deletedRestaurant,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while deleting restaurant",
      error: err.message,
    });
  }
};


export const addReview = async (req, res) => {
    try{
        const { rating, comment } = req.body;

           //  Ensure user exists
        const validUser = await User.findById(req.userId);
        console.log("Username",validUser.name)
        if (!validUser) {
          return res.status(401).json({
            message: "User needs to sign up or log in to add a review.",
          });

        }

    // Prevent admins from reviewing
        if(validUser.role === "admin"){
            return res.status(403).json({
                message: "Admins are not allowed to add reviews.",
              });
        }

       // Ensure restaurant exists
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
          return res.status(404).json({
            message: "Restaurant not found.",
          });
        }

        // Ensure rating and comment are provided
        if(!rating || rating < 1 || rating >= 6){
            return res.status(400).json({
                message: "Rating must be between 1 and 6.",
              });
        }
        if(!comment || comment.trim().length === 0 || comment.trim().length > 500){
            return res.status(400).json({
                message: "Comment must be less than 500 characters.",
              });
        }

         // Sentiment analysis: Filter out negative reviews based on comment sentiment
    const sentiment = new Sentiment();
    const result = sentiment.analyze(comment);
    console.log("Sentiment Score:", result.score);  // Helps to debug and adjust thresholds if needed


    // Check if the sentiment score is negative (you can adjust this threshold)
    if (result.score < 0) {
      return res.status(400).json({
        message: "Negative comments are not allowed. Please submit a positive review.",
      });
    }
 // Ensure the user has ordered from this restaurant
 const order = await Order.findOne({
  userId: req.userId,
  
}).populate({
  path: "cartId",
  select: "items", 
  populate: {
    path: "items.foodItemId", // Populate food items in the cart
    select: "restaurant", // Only get restaurant reference from the food item
  },
});
if (!order || !order.cartId || !order.cartId.items.length) {
  return res.status(400).json({
    message: "No items found in the order. Cannot validate restaurant.",
  });
}
 // Check if the order's food items are from the same restaurant
 const isFromRestaurant = order.cartId.items.some((item) => {
  if (!item.foodItemId || !item.foodItemId.restaurant) {
    console.error("Missing foodItemId or restaurant in cart item", item);
    return false;
  }
  return item.foodItemId.restaurant.toString() === req.params.id;
});

if (!isFromRestaurant) {
  return res.status(400).json({
    message: "You must have ordered from this restaurant to leave a review.",
  });
}


        // Ensure user has not already reviewed
        const alreadyReviewed = restaurant.reviews.find(
            (review) => review.user.toString() === req.userId.toString()
          );
          if (alreadyReviewed) {
            return res.status(400).json({
              message: "You have already reviewed this restaurant.",
            });
          }

          // Create the new review
          const newReview = {
            user: req.userId,
            userName: validUser.name , // Store user's name in the review
            rating,
            comment,
          };
          console.log("New Review Data:", newReview);

        restaurant.reviews.push(newReview);
        restaurant.calculateAverageRating();
        await restaurant.save();
        res.status(201).json({
          message: "Review added successfully.",
          data: restaurant,
        });

    }
    catch (err) {
      console.error("Error occurred while adding review:", err);  // Log detailed error info
      res.status(500).json({
        message: "An error occurred while adding review",
        error: err.message,
      });
    }
};


