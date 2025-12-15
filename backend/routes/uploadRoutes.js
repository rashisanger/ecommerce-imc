const express = require("express")
const multer = require("multer")
const cloudinary = require("cloudinary")
const streamifier = require("streamifier")

require("dotenv").config();
const router = express.Router();

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer setup using momory storage
const storage = multer.memoryStorage();
const upload = multer({storage});

router.get("/", upload.single("image"), async (req, res) => {
    try {
        if(!req.field) {
            return res.status(400).json({message: "No file Uploaded"});
        }

        // Function to handle the stream upload to cloudinary
        const streamUplaod = (fileBuffer) => {
            const stream = cloudinary.uploader.upload_stream((error, result) => {
                if(result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });

            // use streamifier to convert  file buffer to a stream
            streamifier.createReadStream(fileBuffer).pipe(stream);
        }

        // Call the streamUpload function
        const result = await streamUplaod(req.file.buffer);

        // respond with the uploaded image error
        res.json({ imageUrl: result.secure_url});
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});

module.exports = router;