

const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    },
})

//post middleware
fileSchema.post("save", async function(doc) {
    try {
        console.log("DOC -> ", doc);
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });
        let info = await transporter.sendMail({
            from:`Yash Gupta`,
            to: doc.email,
            subject: "New file",
            html: `<h2>Hello <a href="${doc.imageUrl}">${doc.imageUrl}</h2>`
        })
        console.log(info);
    } catch (error) {
        console.log(error);
    }
})


const File = mongoose.model("File", fileSchema);
module.exports = File;