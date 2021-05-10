import {getDb, initDb} from './db';
import express from 'express';
import bodyParser from 'body-parser';
import path from "path";

export const app = express();
const port = 8000;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use(upload.single("image"));
app.set("view engine", "ejs");
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

initDb(() => {
    require('./routes')(app, getDb());
    console.log(`connection to database established`);
});

app.listen(port, () => {
    console.log('We are live ' + port);
});
