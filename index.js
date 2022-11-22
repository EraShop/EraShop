//Express
const express = require("express");
const api = express();
const port = 3000;
const cors = require("cors");
const bcrypt = require("bcrypt");
const loginSchema = require("./Schema/loginSchema");
const stockSchema = require("./Schema/stockSchema");
const nodemailer = require("nodemailer");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const hbs = require("nodemailer-express-handlebars");

require("dotenv").config();

//BodyParser
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

//MongoDB
const mongoose = require("mongoose");
const {
  application
} = require("express");
mongoose.connect(
  "mongodb+srv://Vojta:fQpGpaNnhOfyCZFy@erashop.iijwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function () {
  console.log("Connected");
});

//NodeMailer
let transporter = nodemailer.createTransport({
  host: "smtp.seznam.cz",
  port: 465,
  secure: true,
  auth: {
    user: "support@erasmustartup.eu",
    pass: "ErasmuSupport12321",
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: "express-handlebars",
    viewPath: "./mails/",
  })
);

api.use(cors());
api.use(morgan("dev"));

api.use(async function verifyToken(req, res, next) {
  if (req.headers["authorization"]) {
    try {
      let token = req.headers["authorization"].split(" ")[1];
      const {
        username
      } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await loginSchema.findOne({
        username: username
      });
      if (!user) {
        return res.status(404).json("Not found");
      }
      req.user = user;
    } catch (err) {
      return res.status(500).json({
        message: err
      });
    }
  }
  next();
});

api.put("/login", jsonParser, (req, res) => {
  if (req.body.username && req.body.password) {
    loginSchema.findOne({
      username: req.body.username
    }, (err, user) => {
      if (err) {
        res.status(500).send("Server error");
      } else {
        if (!user) {
          res.status(404).send("User not found");
        } else {
          bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
              res.status(500).send("Server error");
            } else if (result) {
              const token = jwt.sign({
                  username: user.username
                },
                process.env.JWT_SECRET, {
                  expiresIn: "1h"
                },
                (err, token) => {
                  if (err) {
                    res.status(500).send("Server error");
                  } else {
                    res.status(200).json({
                      token
                    });
                  }
                }
              );
            } else {
              res.status(401).send("Wrong password");
            }
          });
        }
      }
    });
  } else {
    res.status(400).send("Bad request");
  }
});

api.get("/user", (req, res) => {
  if (!req.user) {
    return res.status(401).send("Unauthorized");
  }
  return res.status(200).json({
    username: req.user.username,
    email: req.user.email,
    state: req.user.state,
    ballance: req.user.ballance,
    ownedItems: req.user.ownedItems
  });
});

api.delete("/user/delete/all", (req, res) => {
  loginSchema.deleteMany({}, (err) => {
    if (err) {
      res.status(500).send("Server error");
    } else {
      res.status(200).send("Deleted");
    }
  });
});

api.post("/user/new", jsonParser, async (req, res) => {
  const body = req.body
  if (typeof body.username !== 'string' && typeof body.email !== 'string' && typeof body.state !== 'string') {
    return res.status(400).send("Bad request")
  }
  const user = await loginSchema.findOne({
    username: body.username
  })
  const email = await loginSchema.findOne({
    email: body.email
  })
  if (user || email) {
    return res.status(400).send("Data for user already exists")
  }

  let hashPas = Math.random().toString(36).slice(-12);
  let password = bcrypt.hashSync(hashPas, 10)
  let newUser = new loginSchema({
    username: body.username,
    password: password,
    email: body.email,
    state: body.state,
    ballance: 100,
  })
  try {
    await newUser.save()
    let mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: newUser.email,
      context: {
        name: newUser.username,
        password: hashPas,
      },
      template: "welcome",
    }
    transporter.sendMail(mailOptions);
    return res.status(201).send("User created")
  } catch (err) {
    return res.status(500).send(err.message)
  }
})

api.get("/user/cart", (req, res) => {
  if (!req.user) {
    res.status(401).send("Unauthorized");
  }
  return res.status(200).json(req.user.cart);
});

api.post("/user/cart/add", jsonParser, async (req, res) => {
  if (!req.user) {
    res.status(401).send("Unauthorized");
  }
  const body = req.body;
  if (!body._id) {
    return res.status(400).send("Bad request");
  }
  try {
    const item = await stockSchema.findById(body._id);
    if (!item) {
      return res.status(404).send("Not found");
    }
    await req.user.cart.push(item);
    await req.user.save((err, user) => {
      if (err) {
        return res.status(500).send(err.message);
      } else {
        return res.status(200).send("Item added to cart");
      }
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

api.post("/user/cart/remove", jsonParser, (req, res) => {
  if (checkToken(req.headers.authorization)) {
    loginSchema.findOne({
        username: req.headers.authorization
      },
      (err, user) => {
        if (user) {
          stockSchema.findOne({
            name: req.body.item
          }, (err, item) => {
            if (user.cart.includes(item)) {
              user.cart.splice(user.cart.indexOf(item), 1);
              user.save((err, user) => {
                res.status(200).send("Item removed from cart");
              });
            } else {
              res.status(404).send("Item not in cart");
            }
          });
        } else {
          res.status(404).send("User not found");
        }
      }
    );
  } else {
    res.status(401).send("Unauthorized");
  }
});

api.delete("/user/cart/remove/all", async (req, res) => {
  if (!req.user) {
    return res.status(401).send("Unauthorized");
  }
  try {
    await req.user.cart.splice(0, req.user.cart.length);
    await req.user.save((err, user) => {
      if (err) {
        return res.status(500).send("Server error");
      } else {
        return res.status(200).send("Cart cleared");
      }
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

api.post("/user/purchase", (req, res) => {
  if (!req.user) {
    return res.status(401).send("Unauthorized");
  } else if (req.user.cart.length === 0) {
    return res.status(400).send("Cart is empty");
  }
  let total = 0;
  req.user.cart.forEach((item) => {
    total += item.price;
  });

  if (req.user.ballance >= total) {
    req.user.ballance -= total;
    req.user.cart.forEach((item) => {
      loginSchema.find({
        state: item.state
      }, (err, users) => {
        users.forEach(async (user) => {
          user.ballance += item.price / users.length;
          await user.save();
        });
      });
    });

    req.user.ownedItems = req.user.ownedItems.concat(req.user.cart);
    req.user.cart = [];
    req.user.save((err, user) => {
      if (err) {
        return res.status(500).send("Server error");
      }
    });
    let mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: user.email,
      subject: "Your purchase",
      text: "Thanks for your purchase" +
        user.cart +
        "Total: " +
        total +
        "€Era" +
        "U can find your items in attached file",
      attachments: [{
        filename: item.file,
        path: "/stock/" + item.file,
      }, ],
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.send(err);
      } else {
        res.send(info);
      }
    });
  }
});

api.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});