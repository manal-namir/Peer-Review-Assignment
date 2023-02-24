const express = require('express');
let books = require("./livresdb.js");
let isValid = require("./users.js").isValid;
let users = require("./users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {

  try {
    const username = req.body.username;
    const password = req.body.password;
    if (isValid(username)) {
      if (users.length > 0) {
        for (let user in users) {
          if (users[user].username === username) {
            return res.status(400).json({message: "Username already exists"});
          }
        }
      }
      users.push({username: username, password: password});
      return res.status(200).json({message: "User registered successfully"});
    }
    else {
      return res.status(400).json({message: "Username is not valid"});
    }
  } catch (error) {
    return res.status(500).json({message: "Error in registering the user", error: error});
  }
});

public_users.get('/',async function (req, res) {

  try {
    const bookList = JSON.stringify(books);
    return res.status(200).json({message: bookList});
  } catch (error) {
    return res.status(500).json({message: "Error in getting the book list", error: error});
  }
});


public_users.get('/isbn/:isbn',function (req, res) {
 
  try {
    const isbn = req.params.isbn;
    let bookList = [];
    for (let book in books) {
      if (books[book].isbn === isbn) {
        bookList.push(books[book]);
      }
    }
    if (bookList.length > 0) {
      return res.status(200).json({message: bookList});
    }
    else {
      return res.status(404).json({message: "Book not found"});
    }
  }
  catch (error) {
    return res.status(500).json({message: "Error in getting the book details", error });
  }
 });
  

public_users.get('/author/:author',function (req, res) {
 
  try {
    const author = req.params.author;
    let bookList = [];
    for (let book in books) {
      if (books[book].author === author) {
        bookList.push(books[book]);
      }
    }
    if (bookList.length > 0) {
      return res.status(200).json({message: bookList});
    } else {
      return res.status(404).json({message: "Book not found"});
    }
  }
  catch (error) {
    return res.status(500).json({message: "Error in getting the book details", error });
  }
});


public_users.get('/title/:title',function (req, res) {

  try {
    const title = req.params.title;
    let bookList = [];
    for (let book in books) {
      if (books[book].title === title) {
        bookList.push(books[book]);
      }
    }
    if (bookList.length > 0) {
      return res.status(200).json({message: bookList});
    } else {
      return res.status(404).json({message: "Book not found"});
    }
  }
  catch (error) {
    return res.status(500).json({message: "Error in getting the book details", error });
  }
});


public_users.get('/review/:isbn',function (req, res) {

  try {
    const isbn = req.params.isbn;
    let bookList = [];
    for (let book in books) {
      if (books[book].isbn === isbn) {
        bookList.push(books[book]);
      }
    }
    if (bookList.length > 0) {
      return res.status(200).json({message: bookList[0].review});
    } else {
      return res.status(404).json({message: "Book not found"});
    }
  }
  catch (error) {
    return res.status(500).json({message: "Error in getting the book details", error });
  }
});

module.exports.general = public_users;
