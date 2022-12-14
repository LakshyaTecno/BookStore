const Book = require("../models/bookSchema");
const Magazine = require("../models/magazinesSchema");
const bookInParams = async (req, res, next) => {
  try {
    const book = await Book.findOne({ isbn: req.params.isbn });

    if (!book) {
      return res.status(400).send({
        message: "isbn passed dosen't exist",
      });
    }
    req.bookInParams = book;
    next();
  } catch (err) {
    console.log("#### Error while reading the book info #### ", err.message);
    return res.status(500).send({
      message: "Internal server error while reading the user data",
    });
  }
};

// const bookInParams = async (req,res,next)=>{

//     try{

//         const book = await Book.findOne({isbn : req.params.isbn});

//         if(!book){
//             return res.status(400).send({
//                 message : "isbn passed dosen't exist"
//             })
//         }
//         req.bookInParams = book;
//         next();

//     }catch(err){
//         console.log("#### Error while reading the book info #### ", err.message);
//         return res.status(500).send({
//             message : "Internal server error while reading the user data"
//         })
//     }
// }

const validateIdInParams = {
  bookInParams,
};

module.exports = validateIdInParams;
