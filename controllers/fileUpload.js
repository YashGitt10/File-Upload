

const File = require("../models/File");
const cloudinary = require('cloudinary').v2

exports.localFileUpload = async(req,res) => {
    try {
        //fetch file
        const file = req.files.file;
        console.log("FILES -> ", file);
        let path= __dirname + "/files/" + Date.now() + `.${file.name.split('.')[3]}`;
        console.log("PATH -> ", path);
        file.mv(path, (err) => {
            console.log(err);
        });
        res.json({
            success:true,
            message:"Local file uploaded Successfully",
        });
    } catch (error) {
        console.log(error);
    }
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = {folder};
    if(quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload handler
function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

exports.imageUpload = async(req,res) => {
    try {
        //fetch data
        const {name, tags, email} = req.body;
        console.log(name, tags, email);
        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[3].toLowerCase();
        if(!isFileTypeSupported(fileType,supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:"File format not supported",
            })
        }

        //supported file format
        const response = await uploadFileToCloudinary(file, "Yash");
        console.log(response);

        //save in db
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image file uploaded Successfully",
        });
    } catch (error) {
        console.log(error);
    }
}

//video upload
exports.videoUpload = async(req,res) => {
    try {
        //fetch data
        const {name, tags, email} = req.body;
        console.log(name, tags, email);
        const file = req.files.videoFile;
        console.log(file);

        //validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        if(!isFileTypeSupported(fileType,supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:"File format not supported",
            })
        }

        //supported file format
        const response = await uploadFileToCloudinary(file, "Yash");
        console.log(response);

        //save in db
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image file uploaded Successfully",
        });
    } catch (error) {
        console.log(error);
    }
}


exports.imagesizeReducer = async(req,res) => {
    try {
        //fetch data
        const {name, tags, email} = req.body;
        console.log(name, tags, email);
        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[3].toLowerCase();
        if(!isFileTypeSupported(fileType,supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:"File format not supported",
            })
        }

        //supported file format
        const response = await uploadFileToCloudinary(file, "Yash", 30); //quality value 30 (ranges from 0-100)
        console.log(response);

        //save in db
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image file uploaded Successfully",
        });
    } catch (error) {
        console.log(error);
    }
}