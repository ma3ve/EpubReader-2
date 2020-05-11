const express = require("express");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const auth = require("./auth");
const User = require("../models/User");

const router = express.Router();

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    Bucket: process.env.AWS_BUCKET,
});

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        },
        fileFilter: function (req, file, cb) {
            checkFileType(file, cb);
        },
    }),
});

function checkFileType(file, cb) {
    const filetypes = /epub/;
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Error: Epub files only");
    }
}

const singleUplaod = upload.single("image");

router.post("/api/bookUpload", auth, (req, res) => {
    singleUplaod(req, res, (err, some) => {
        if (err) return res.status(400).json({ success: false, error: err });
        if (req.file.location) {
            const { user } = req;
            user.book = req.file.key;
            user.save();
            res.json({ success: true, Book: req.file.location });
        } else
            return res
                .status(400)
                .json({ success: false, error: "epub required" });
    });
});

router.get("/api/book", auth, (req, res, next) => {
    var params = { Bucket: process.env.AWS_BUCKET, Key: req.user.book };
    s3.getObject(params, function (err, data) {
        res.writeHead(200, { "Content-Type": "multipart/form-data" });
        res.write(data.Body, "binary");
        res.end(null, "binary");
    });
});

router.delete("/api/book", auth, async (req, res) => {
    const { user } = req;
    try {
        var params = { Bucket: process.env.AWS_BUCKET, Key: user.book };

        s3.deleteObject(params, async function (err, data) {
            if (err) console.log(err, err.stack);
            else {
                user.book = null;
                user.page = null;
                await user.save();
                res.json({ success: true });
            }
        });
    } catch (error) {
        res.json({ success: false, error });
        console.log(error);
    }
});

module.exports = router;
