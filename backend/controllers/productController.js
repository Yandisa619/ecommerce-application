import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

// function for adding products
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        const images = [image1, image2, image3, image4].filter(item => item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                try {
                    let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                    return result.secure_url;
                } catch (err) {
                    console.error(`Image upload failed: ${err.message}`);
                    return null;
                }
            })
        );

        imagesUrl = imagesUrl.filter(url => url !== null); 

        let parsedSizes = [];
        try {
            if (!sizes) {
                return res.status(400).json({ success: false, message: "Sizes field is required" });
            }
            parsedSizes = JSON.parse(sizes);
        
            if (!Array.isArray(parsedSizes)) {
                return res.status(400).json({ success: false, message: "Sizes must be an array" });
            }
        } catch (err) {
            return res.status(400).json({ success: false, message: "Invalid sizes format" });
        }
        

        const productData = {
            name,
            description,
            price: Number(price),
            image: imagesUrl,
            category,
            subCategory,
            sizes: parsedSizes,
            bestseller: bestseller === "true",
            date: Date.now()
        };

        const product = new productModel(productData);
        await product.save();

        res.status(201).json({ success: true, message: "Product Added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
    console.log("Received sizes:", sizes);

};

// function for listing products
const listProduct = async (req,res) => {
    try {
        const products = await productModel.find({});
        res.json({success:true,products})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// function for removing products
const removeProduct = async (req,res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: "Product Removed"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// function for product information
const singleProduct = async (req,res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message})
    }
}

export {listProduct, addProduct, removeProduct, singleProduct}