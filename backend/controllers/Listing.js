
import {Listing} from "../models/Listing.js";
import { uploadOnCloudinary } from "../utility/cloudinary.js";
import mongoose from "mongoose";


export const createListing = async (req, res) => {
  try {
    const { title, description, price,location,category } = req.body;

    if (!title || !description || !price || !location || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let imageData = null;

    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

      if (!cloudinaryResponse) {
        return res.status(500).json({
          success: false,
          message: "Image upload failed",
        });
      }
      imageData = {
        url: cloudinaryResponse.url,
        public_id: cloudinaryResponse.public_id,
      };
    }

    const listing = await Listing.create({
      title,
      description,
      price,
      category,
      seller: req.user._id,
      images: imageData ? [imageData] : [],
      location
    });

    res.status(201).json({
      success: true,
      message: "Listing created successfully",
      listing,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};



export const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    if (listing.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this listing",
      });
    }

    const { title, description, price,location,category  } = req.body;
      console.log(req.body)
   
    listing.title = title || listing.title;
    listing.description = description || listing.description;
    listing.price = price || listing.price;
    listing.location = location || listing.location;
    listing.category = category || listing.category;

    if (req.file) {
      if (listing.images.length > 0 && listing.images[0].public_id) {
        await cloudinary.uploader.destroy(listing.images[0].public_id);
      }

      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

      if (cloudinaryResponse) {
        listing.images = [
          {
            url: cloudinaryResponse.secure_url,
            public_id: cloudinaryResponse.public_id,
          },
        ];
      }
    }

    await listing.save();

    res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      listing,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

  
    if (listing.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this listing",
      });
    }

    if (listing.images.length > 0 && listing.images[0].public_id) {
      await cloudinary.uploader.destroy(listing.images[0].public_id);
    }

    await listing.deleteOne();

    res.status(200).json({
      success: true,
      message: "Listing deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


export const getSingleListing = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid listing ID",
      });
    }

    const listing = await Listing.findById(id)
      .populate("seller", "name email phone")
      .populate("category", "name");

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    return res.status(200).json({
      success: true,
      listing,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


export const getMyListings = async (req, res) => {
  try {
    const listings = await Listing.find({
      seller: req.user._id
    })
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: listings.length,
      listings,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};



export const getAllListings = async (req, res) => {
  try {

    const { keyword, category, minPrice, maxPrice } = req.query;

    let filter = {};
    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    const listings = await Listing.find(filter)
      .populate("category", "name")
      .populate("seller", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: listings.length,
      listings,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};