import express from "express";
import bodyParser from "body-parser";
import qr from 'qr-image';
import fs from 'fs';
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

function generateQR(req, res, next) {
    let url = req.body["url"];
    var qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream(__dirname + '/public/img/siteQR.png'));
    next();
}

app.use(generateQR);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html"); 
    });

app.post("/index", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");

});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
