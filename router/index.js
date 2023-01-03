const router = require('express').Router();
const multer = require('multer');
router.get('/', (req, res) => {
    res.render('index');
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage }).single("file");
router.post('/upload', function (req, res, next) {
    upload(req, res, function (err) {
        console.log(req.file);
        if (err) {
            res.json("pls upload jpg file")
        }
        else {
            res.json(`"${host}/${req.file.filename}"`);
        }
    });

})
module.exports = router;