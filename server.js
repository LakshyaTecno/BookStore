const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const serverConfig = require("./configs/serverConfig");
const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");
const Book = require("../BookStore/models/bookSchema");
const fs = require("fs");
const { parse } = require("csv-parse");

const Author = require("../BookStore/models/authorsSchema");
const Magazine = require("../BookStore/models/magazinesSchema");

const authorsPath = `${__dirname}/csv/authors.csv`;
const booksPath = `${__dirname}/csv/books.csv`;
const magazinePath = `${__dirname}/csv/magazines.csv`;

const csvtoJson = async (path) => {
  var result = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(
        parse({
          trim: true,
          columns: true,
          delimiter: ";",
          skip_empty_lines: true,
        })
      )
      .on("data", (row) => {
        result.push(row);
        //console.log(row);
      })
      .on("end", function () {
        //do something with csvData
        resolve(result);
      });
  });
};

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connected to mongodb");
});

db.once("open", () => {
  console.log("connected to mongodb");

  init();
});

async function init() {
  try {
    var authors = await csvtoJson(authorsPath);
    var books = await csvtoJson(booksPath);
    var magazines = await csvtoJson(magazinePath);

    await Book.collection.drop();

    await Magazine.collection.drop();

    await Author.collection.drop();

    const curbooks = await Book.insertMany(books);

    const curauthors = await Author.insertMany(authors);

    const curmagazine = await Magazine.insertMany(magazines);
    // console.log(curbooks, curauthors, curmagazine);
  } catch (err) {
    console.log("err in db initialization", err.message);
  }
}

require("./routes/route")(app);

app.listen(serverConfig.PORT, () => {
  console.log("server started at port number ", serverConfig.PORT);
});
