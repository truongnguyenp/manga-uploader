const router = require('express').Router();
const multer = require('multer');
require('dotenv').config();
const SharpMulter = require("sharp-multer");
const path = require('path')
const host = process.env.RENDER_EXTERNAL_HOSTNAME ?? process.env.HOST;
const LOGO = __dirname + "/images/logo.png";
router.get('/', (req, res) => {
    res.render('index');
});

const storage = SharpMulter({
    destination: (req, file, callback) => callback(null, "./uploads"),
    imageOptions: {
        fileFormat: "jpg",
        quality: 80,
        useTimestamp: true,
    },
    watermarkOptions: {
        input: "./logo/logo.png", // watermark image location
        location: "top-right",
    },
});
const upload = multer({ storage }).array("files", 50);
router.post('/upload', function (req, res, next) {
    upload(req, res, function (err) {
        const files = req?.files;
        const fileNameLists = files.map((file) => {
            return `${host}/${file?.filename}`
        })
        console.log(JSON.stringify(fileNameLists))
        if (err) {
            res.json("err")
        }
        else {
            res.json(fileNameLists);
        }
    });

})
module.exports = router;