var express = require('express');
var multer = require('multer');
var fs = require('fs');
var bodyparser = require(`body-parser`)
var path = require('path')
var app = express();
var uploads = path.join(__dirname, 'uploads');
const host = "localhost";
app.use(bodyparser.json())
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
app.use(express.static(uploads))

var upload = multer({ storage: storage }).single("file");
app.post('/upload', function (req, res, next) {
    upload(req, res, function (err) {
        console.log(req.file);
        if (err) {
            res.json("pls upload jpg file")
        }
        else {
            res.json(`"${host}/uploads/${req.file.filename}"`);
        }
    });

})

app.listen(3000);
