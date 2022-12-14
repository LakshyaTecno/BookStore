const Book = require("../models/bookSchema");
const Magazine = require("../models/magazinesSchema");
const { parse } = require("json2csv");

exports.createNewBook = async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      isbn: req.body.isbn,
      authors: req.body.authors,
      description: req.body.description,
    };
    const book = await Book.create(data);
    const csvBook = parse([book]);
    console.log(csvBook);
    console.log(`#### New Book '${book.title}' created ####`);
    res.status(201).send(book);
  } catch (err) {
    console.log("#### Error while creating new book #### ", err);
    res.status(500).send({
      message: "Internal server error while creating new book",
    });
  }
};

exports.createNewMagazine = async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      isbn: req.body.isbn,
      authors: req.body.authors,
      publishedAt: req.body.publishedAt,
    };
    const magazine = await Magazine.create(data);
    const csvMagazine = parse([magazine]);
    console.log(csvMagazine);
    console.log(`#### New Book '${magazine.title}' created ####`);
    res.status(201).send(magazine);
  } catch (err) {
    console.log("#### Error while creating new magazine #### ", err);
    res.status(500).send({
      message: "Internal server error while creating new magazine",
    });
  }
};

exports.getSingleBook = async (req, res) => {
  try {
    const book = req.bookInParams;
    res.status(200).send(book);
  } catch (err) {
    console.log("#### Error while getting the book ####", err.message);
    res.status(500).send({
      message: "Internal server error while getting the book",
    });
  }
};

exports.getBookandMagazine = async (req, res) => {
  try {
    const books = await Book.find({ authors: req.params.authors });
    const magazines = await Magazine.find({ authors: req.params.authors });
    const result = [...books, ...magazines];
    console.log(result);
    if (!books && !magazines) {
      return res.status(400).send({
        message: "author email passed dosen't exist",
      });
    }
    res.status(200).send(result);
  } catch (err) {
    console.log(
      "#### Error while reading the book and Magazine info #### ",
      err.message
    );
    return res.status(500).send({
      message: "Internal server error while reading the user data",
    });
  }
};

exports.getAllBookandMagazineSorted = async (req, res) => {
  try {
    const book = await Book.find();
    const magazine = await Magazine.find();
    const result = [...book, ...magazine];
    console.log(result);

    function compareStrings(a, b) {
      // Assuming you want case-insensitive comparison
      a = a.toLowerCase();
      b = b.toLowerCase();

      return a < b ? -1 : a > b ? 1 : 0;
    }

    result.sort(function (a, b) {
      return compareStrings(a.city, b.city);
    });
    console.log(result);

    res.status(200).send(result);
  } catch (err) {
    console.log(
      "#### Error while reading the book and Magazine info #### ",
      err.message
    );
    return res.status(500).send({
      message: "Internal server error while reading the user data",
    });
  }
};
