import dotenv from "dotenv";
import mongodb from "mongodb";
dotenv.config();

const MongoClient = mongodb.MongoClient;
let _db;

export const DB_URL = `mongodb+srv://ssomcandy777_db_user:${process.env.MONGODB_PASSWORD}@testserver.vmsatbv.mongodb.net/shop?retryWrites=true&w=majority&appName=TestServer`;

const mongoConnect = (callback) => {
  MongoClient.connect(DB_URL)
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

export default mongoConnect;
