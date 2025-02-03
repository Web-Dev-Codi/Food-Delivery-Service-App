import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImage(imagePath) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: path.dirname(imagePath).replace(/\\/g, "/").split("/").pop(), // Use folder name as Cloudinary folder
      use_filename: true, // Keep original filename
      unique_filename: true,
    });
    console.log(
      `✅ Uploaded ${path.basename(imagePath)} to ${result.secure_url}`,
    );
    return result;
  } catch (error) {
    console.error(
      `❌ Failed to upload ${path.basename(imagePath)}:`,
      error.message,
    );
    return null;
  }
}

async function getImagesFromDirectory(directory) {
  const files = await fs.readdir(directory);
  return files
    .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
    .map((file) => path.join(directory, file));
}

async function uploadImagesFromFolders() {
  try {
    // Get all images from both folders
    const indianFoodImages = await getImagesFromDirectory(
      path.join(__dirname, "Indian-food-menu"),
    );
    const mexicanFoodImages = await getImagesFromDirectory(
      path.join(__dirname, "mexican food"),
    );

    console.log(`Found ${indianFoodImages.length} images in Indian food menu`);
    console.log(
      `Found ${mexicanFoodImages.length} images in Mexican food menu`,
    );

    // Upload all images
    const allImages = [...indianFoodImages, ...mexicanFoodImages];
    const results = await Promise.all(allImages.map(uploadImage));

    // Filter out failed uploads
    const successfulUploads = results.filter((result) => result !== null);
    console.log(
      `\n✨ Successfully uploaded ${successfulUploads.length} out of ${allImages.length} images`,
    );
  } catch (error) {
    console.error("❌ Error during upload process:", error.message);
  }
}

// Run the upload function
uploadImagesFromFolders();
