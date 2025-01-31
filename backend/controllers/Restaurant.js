import Restaurant from "../models/restaurantSchema.js";

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
    try{
        const restaurant = await Restaurant.findById(req.params.id);
        if(!restaurant){
            return res.status(404).json({
                message: "Restaurant not found",
            });
        }
        res.status(200).json({
            message: "Restaurant fetched successfully",
            data: restaurant
        });
    }
    catch(err){
        res.status(500).json({
            message: "An error occurred while fetching restaurant",
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
    try{
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updatedRestaurant){
            return res.status(404).json({
                message: "Restaurant not found",
            });
        }
        res.status(200).json({
            message: "Restaurant updated successfully", data: updatedRestaurant });
    }

    catch(err){
        res.status(500).json({
            message: "An error occurred while updating restaurant",
            error: err.message
        });
    }
}

export const deleteRestaurant = async (req, res) => {
    try{
        const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
        if(!deletedRestaurant){
            return res.status(404).json({
                message: "Restaurant not found",
            });
        }
        res.status(200).json({
            message: "Restaurant deleted successfully", data: deletedRestaurant });
    }

    catch(err){
        res.status(500).json({
            message: "An error occurred while deleting restaurant",
            error: err.message
        });
    }
}

