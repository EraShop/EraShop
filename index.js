//Express
const express = require("express");
const api = express();
const port = 3000;
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const loginSchema = require("./Schema/loginSchema");
const stockSchema = require("./Schema/stockSchema");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.seznam.cz",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAILPASS,
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: "express-handlebars",
    viewPath: "./mails/",
  })
);

const mongoose = require("mongoose");
const { append } = require("express/lib/response");
mongoose.connect(process.env.MONGODB);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function () {
  console.log("Connected");
});
api.use(express.json());
api.use(cors());
api.use("/images", express.static(__dirname + "/images"));

api.post("/user/new", async (req, res) => {
  const { newUser, newPass, newEmail, newState } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashed = await bcrypt.hash(newPass, salt);

  const date = new Date();
  date.setHours(date.getHours() + 2);

  if (newUser === "" || newPass === "" || newEmail === "" || newState === "") {
    res.status(400).send("Please fill all fields");
  } else {
    loginSchema.findOne({ username: newUser }, (err, user) => {
      if (user) {
        res.send("User already exists");
      } else {
        const schema = new loginSchema({
          username: newUser,
          password: hashed,
          email: newEmail,
          ballance: 100,
          dateCreated: date,
          state: newState,
        })

          .save()
          .then(() => {
            res.status(200).send("User created");
            const options = {
              from: process.env.MAIL,
              to: user.email,
              subject: "Welcome to Era Store",
              template: "welcome",
            };
            transporter.sendMail(options, (err, info) => {
              if (err) {
                console.log(err);
              }
            });
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    });
  }
});

api.post("/user/changePass", verifyToken, async (req, res) => {
  const { newPass } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashed = await bcrypt.hash(newPass, salt);

  if (hashed === "") {
    res.status(400).send("Error: username and newPass are empty");
  } else {
    jwt.verify(req.token, process.env.JWT, (err, decoded) => {
      loginSchema.findOne({ username: decoded.username }, (err, user) => {
        if (user) {
          user.password = hashed;
          user.save();
          res.status(200).send("Password changed");
          const options = {
            from: process.env.MAIL,
            to: user.email,
            subject: "Changed password on Era Store",
            template: "password",
          };
          setTimeout(() => {
            transporter.sendMail(options, (err, info) => {
              if (err) {
                console.log(err);
              }
            });
          }, 10000);
        } else {
          res.status(400).send("Error: user not found");
        }
      });
    });
  }
});

api.post("/login", async (req, res) => {
  const { username, password } = req.body;

  loginSchema.findOne({ username: username }, (err, user) => {
    console.log(user);
    if (user) {
      if (bcrypt.compare(password, user.password)) {
        let token = jwt.sign({ username: username }, process.env.JWT, {
          expiresIn: "3d",
        });
        res.status(200).json(token);
      } else {
        res.status(400).send("Error: wrong password");
      }
    } else {
      res.status(400).send("Error: user not found");
    }
  });
});

api.post("/stock/add", (req, res) => {
  const {
    itemName,
    itemPrice,
    itemDescription,
    itemMaterial,
    itemOrigin,
    itemQuantity,
  } = req.body;

  if (
    itemName === "" ||
    itemPrice === "" ||
    itemDescription === "" ||
    itemQuantity === "" ||
    itemMaterial === "" ||
    itemOrigin === ""
  ) {
    res.status(400).send("Error: requests are empty");
  } else {
    const schema = new stockSchema({
      name: itemName,
      price: itemPrice,
      description: itemDescription,
      material: itemMaterial,
      origin: itemOrigin,
      quantity: itemQuantity,
    })

      .save()
      .then(() => {
        res.status(200).send("Stock added");
      })
      .catch((err) => {
        res.status(500).send(err);
        console.log(err);
      });
  }
});

api.post("/stock/remove", verifyToken, (req, res) => {
  const { itemName } = req.body;

  if (itemName === "") {
    res.status(400).send("Error: itemName is empty");
  } else {
    stockSchema.findOneAndDelete({ name: itemName }, (err, user) => {
      if (user) {
        res.status(200).send("Stock removed");
      } else {
        res.status(400).send("Error: item not found");
      }
    });
  }
});

api.post("/stock/price", (req, res) => {
  const { itemName, itemPrice } = req.body;

  if (itemName === "" || itemPrice === "") {
    res.status(400).send("Error: itemName and itemPrice are empty");
  } else {
    stockSchema.findOneAndUpdate(
      { name: itemName },
      { $set: { price: itemPrice } },
      (err, user) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send("Price updated");
        }
      }
    );
  }
});

api.get("/stock/data", (req, res) => {
  stockSchema.find({}, (err, items) => {
    if (err) {
      req.status(500).send(err);
    } else {
      res.status(200).json(items);
    }
  });
});

//Get data about user by token
api.get("/user/data", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT, (err, decoded) => {
    if (err) {
      res.status(401).send("Not logged in");
    } else {
      loginSchema.findOne({ username: decoded.username }, (err, user) => {
        if (user) {
          res.status(200).json({
            username: user.username,
            ballance: user.ballance,
            email: user.email,
          });
        } else {
          res.status(400).send("Error: user not found");
        }
      });
    }
  });
});

api.post("/user/cart/add", verifyToken, (req, res) => {
  const { itemName } = req.body;

  if (itemName === "") {
    res.status(400).send("Error: token, itemName are empty");
  } else {
    jwt.verify(req.token, process.env.JWT, function (err, decoded) {
      if (!err) {
        loginSchema.findOne({ username: decoded.username }, (err, user) => {
          if (user) {
            stockSchema.findOne({ name: itemName }, (err, item) => {
              if (item) {
                if (item.quantity > 0) {
                  if (!user.cart.includes(itemName)) {
                    loginSchema.findOneAndUpdate(
                      { username: decoded.username },
                      {
                        $push: {
                          cart: {
                            name: item.name,
                            price: item.price,
                            quantity: 1,
                          },
                        },
                      },
                      (err, user) => {
                        if (err) {
                          res.status(500).send(err);
                        }
                      }
                    );
                    res.status(200).send("Item added to cart");
                  } else {
                    loginSchema.findOneAndUpdate(
                      { username: decoded.username },
                      {
                        $inc: {
                          [`cart.$.quantity`]: 1,
                        },
                      },
                      (err, user) => {
                        if (err) {
                          res.status(500).send(err);
                        }
                      }
                    );
                    res.status(200).send("Item quantity increased");
                  }
                } else {
                  res.status(400).send("Error: item out of stock");
                }
              } else {
                res.status(400).send("Error: item not found");
              }
            });
          } else {
            res.status(400).send("Error: user not found");
          }
        });
      } else {
        res.status(401).send("Not logged in");
      }
    });
  }
});

api.get("/user/cart/data", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT, (err, decoded) => {
    if (err) {
      res.status(401).send("Not logged in");
    } else {
      loginSchema.findOne({ username: decoded.username }, (err, user) => {
        if (user) {
          //Make total price
          let totalPrice = 0;
          user.cart.forEach((item) => {
            totalPrice += item.price * item.quantity;
          });
          res.status(200).json({
            cart: user.cart,
            totalPrice: totalPrice,
          });
        } else {
          res.status(400).send("Error: user not found");
        }
      });
    }
  });
});

api.post("/user/cart/quantity", verifyToken, (req, res) => {
  const { itemName, quantity } = req.body;

  const newQuantity = Number(quantity);

  if (itemName === "" || quantity === "") {
    res.status(400).send("Error: token, itemName and quantity are empty");
  } else {
    jwt.verify(req.token, process.env.JWT, function (err, decoded) {
      if (!err) {
        loginSchema.findOne({ username: decoded.username }, (err, user) => {
          if (user) {
            stockSchema.findOne({ name: itemName }, (err, item) => {
              if (item) {
                loginSchema
                  .findOneAndUpdate(
                    { username: decoded.username },
                    {
                      $set: {
                        cart: {
                          item: itemName,
                          price: item.price,
                          quantity: newQuantity,
                        },
                      },
                    }
                  )
                  .then(() => {
                    res.status(200).send("Quantity updated");
                  })
                  .catch((err) => {
                    res.status(500).send(err);
                    console.log(err);
                  });
              } else {
                res.status(404).send("Item not found");
              }
            });
          } else {
            res.status(404).send("User not found");
          }
        });
      } else {
        res.status(401).send("Wrong token");
      }
    });
  }
});

api.post("/user/cart/remove", verifyToken, (req, res) => {
  const { itemName } = req.body;

  if (itemName === "") {
    res.status(400).send("Error: token and itemName are empty");
  } else {
    jwt.verify(req.token, process.env.JWT, function (err, decoded) {
      if (!err) {
        console.log(itemName);
        loginSchema.findOneAndUpdate(
          { username: decoded.username },
          {
            $pull: {
              cart: {
                name: itemName,
              },
            },
          },
          (err, user) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).send("Item removed from cart");
            }

            console.log(user);
          }
        );
      } else {
        res.status(401).send("Not logged in");
      }
    });
  }
});

api.post("/user/cart/removeall", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT, function (err, decoded) {
    if (!err) {
      loginSchema.findOne({ username: decoded.username }, (err, user) => {
        if (user) {
          loginSchema.findOneAndUpdate(
            { username: decoded.username },
            {
              $set: {
                cart: [],
              },
            },
            (err, user) => {
              if (err) {
                res.status(500).send(err);
              } else {
                res.status(200).send("Success");
              }
            }
          );
        } else {
          res.status(404).send("User not found");
        }
      });
    } else {
      res.status(401).send("Wrong token");
    }
  });
});

api.post("/user/purchase", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT, function (err, decoded) {
    if (!err) {
      loginSchema.findOne({ username: decoded.username }, (err, user) => {
        if (user) {
          let totalPrice = 0;
          user.cart.forEach((allItem) => {
            totalPrice += allItem.price * allItem.quantity;
          });
          user.cart.forEach((item) => {
            stockSchema.findOne({ name: item.item }, (err, stockItem) => {
              if (
                stockItem &&
                stockItem.quantity >= item.quantity &&
                user.ballance >= totalPrice
              ) {
                stockSchema.findOneAndUpdate(
                  { name: item.item },
                  {
                    $inc: {
                      quantity: -item.quantity,
                    },
                  },
                  (err, stockItem) => {
                    if (err) {
                      res.status(500).send("Internal Server Error");
                    } else {
                      loginSchema.findOneAndUpdate(
                        { username: decoded.username },
                        {
                          $inc: {
                            ballance: -totalPrice,
                          },
                          $set: {
                            cart: [],
                            ownedItems: [
                              ...user.ownedItems,
                              ...user.cart.map((item) => item),
                            ],
                          },
                        },
                        (err, user) => {
                          if (err) {
                            res.status(500).send("Internal Server Error");
                          } else {
                            res.status(200).send("Success");
                          }
                        }
                      );
                    }
                  }
                );
                const path = `./files/${item.item.toLowerCase()}.pdf`;
                const options = {
                  from: process.env.MAIL,
                  to: user.email,
                  subject: "Your EraStore Purchase",
                  template: "purchase",
                  attachments: [
                    {
                      filename: item.item + ".pdf",
                      path: path,
                    },
                  ],
                };
                transporter.sendMail(options, (err, info) => {
                  if (err) {
                    console.log(err);
                  }
                });
              } else {
                res.status(400).send("Error: Insufficient stock");
              }
            });
          });
        } else {
          res.status(404).send("User not found");
        }
      });
    } else {
      res.status(401).send("Wrong token");
    }
  });
});

api.get("/stock/:item", (req, res) => {
  const { item } = req.params;
  if (item.includes("-")) {
    item = item.replace(/-/g, " ");
  }
  if (item === "") {
    res.status(400).send("Error: item is empty");
  } else {
    stockSchema.findOne({ name: item }, (err, item) => {
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).send("Error: item not found");
      }
    });
  }
});

api.get("/kafka", verifyToken, async (req, res) => {
  jwt.verify(req.token, process.env.JWT, function (err, decoded) {
    if (!err) {
      loginSchema.findOne({ username: decoded.username }, (err, user) => {
        if (user) {
          res.status(200);
        } else {
          res.status(404).send("User not found");
        }
      });
    } else {
      res.status(401).send("Forbidden");
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(401).send("Not logged in");
  }
}

api.listen(port, () => {
  console.log("localhost/" + port);
});
