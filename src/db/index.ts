const client = require("mongodb").MongoClient;
const config = require("../config/db");
import mongoose from 'mongoose';

let _db: any = mongoose.connection;

export const initDb = (callback: () => void) => {
    // if (_db) {
    //     console.warn("Trying to init DB again!");
    //     return callback(null, _db);
    // }

    const connected = (err: any, db: any) => {
        // if (err) {
        //     return callback(err);
        // }
        // _db = db.db(config.nameDb);
        // return callback(null, _db);
    }

    mongoose.connect(config.urlDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(callback);
    // _db.on('error', console.error.bind(console, 'connection error:'));
    // _db.connect('open', connected);
}

export const getDb = () => {
    return _db;
}