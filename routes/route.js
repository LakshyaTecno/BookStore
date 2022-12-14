const controller = require("../controllers/controller");
const validateIdInParams = require("../middlewares/paramsVerifier");

module.exports = (app) => {
  app.get(
    "/bookstore/api/v1/books/:isbn",
    [validateIdInParams.bookInParams],
    controller.getSingleBook
  );
  app.get(
    "/bookstore/api/v1/books/magazine/:authors",
    controller.getBookandMagazine
  );
  app.get(
    "/bookstore/api/v1/books/magazine/sorted",
    controller.getAllBookandMagazineSorted
  );
  app.post("/bookstore/api/v1/books", controller.createNewBook);
  app.post("/bookstore/api/v1/magazines", controller.createNewMagazine);
};
