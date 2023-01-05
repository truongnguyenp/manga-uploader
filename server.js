const express = require('express');
const cors = require("cors");
const multer = require('multer');
const fs = require('fs');
const bodyparser = require(`body-parser`)
const path = require('path')
const app = express();
const router = require('./router/index')
const uploads = path.join(__dirname, 'uploads');
app.use(bodyparser.json())
app.set('view engine', 'ejs');
app.use(cors());
app.use('/', router)
app.use(express.static(uploads))

app.listen(3000);
