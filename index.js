//Express
const express = require("express");
const api = express();
const port = 3000;
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const loginSchema = require("./Schema/loginSchema");
const stockSchema = require("./Schema/stockSchema");

//BodyParser
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Send Email
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "",
    pass: "",
  },
});

//MongoDB
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://Vojta:fQpGpaNnhOfyCZFy@erashop.iijwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function () {
  console.log("Connected");
});

api.use(cors());

api.post("/user/new", urlencodedParser, async (req, res) => {
  const { newUser, newPass, newEmail, newTelNumber, newState } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashed = await bcrypt.hash(newPass, salt);

  const newTelNumberNumber = Number(newTelNumber);
  const date = new Date();
  date.setHours(date.getHours() + 2);

  if (
    newUser === "" ||
    newPass === "" ||
    newEmail === "" ||
    newTelNumber === "" ||
    newState === ""
  ) {
  } else {
    loginSchema.findOne({ username: newUser }, (err, user) => {
      if (user) {
        res.send("User already exists");
      } else {
        var token = jwt.sign({ username: newUser }, "supersecret", {
          expiresIn: "3d",
        });

        const schema = new loginSchema({
          username: newUser,
          password: hashed,
          email: newEmail,
          ballance: 100,
          dateCreated: date,
          telnumber: newTelNumberNumber,
          state: newState,
          token: token,
        })

          .save()
          .then(() => {
            res.json({
              status: 200,
              message: "Success",
              data: schema,
            });
          })
          .catch((err) => {
            res.json({
              status: 500,
              message: "Internal Server Error",
            });
            console.log(err);
          });
      }
    });
  }
});

api.post("/user/changePass", urlencodedParser, (req, res) => {
  const { username, newPass } = req.body;

  if (username === "" || newPass === "") {
    res.status(400).send("Error: username and newPass are empty");
  } else {
    loginSchema.findOne({ username: username }, (err, user) => {
      if (user) {
        user.password = newPass;
        user.save();
        res.json({
          status: 200,
          message: "Success",
        });
      } else {
        res.json({
          status: 404,
          message: "User not found",
        });
      }
    });
  }
});

api.post("/user/ballance/down", urlencodedParser, (req, res) => {
  const { username, ballance } = req.body;

  loginSchema.findOne({ username: username }, (err, user) => {
    if (user) {
      console.log(user);
      if (user.ballance >= ballance) {
        loginSchema.findOneAndUpdate(
          { username: username },
          { $set: { ballance: user.ballance - ballance } },
          (err, user) => {
            if (err) {
              res.json({
                status: 500,
                message: "Internal Server Error",
              });
            } else {
              res.json({
                status: 200,
                message: "Success",
              });
            }
          }
        );
      } else {
        res.json({
          status: 400,
          message: "Not enough ballance",
        });
      }
    } else {
      res.json({
        status: 404,
        message: "User not found",
      });
    }
  });
});

api.post("/user/ballance/up", urlencodedParser, (req, res) => {
  const { token, ballance } = req.body;

  const ballanceNumber = Number(ballance);

  jwt.verify(token, "supersecret", (err, decoded) => {
    if (err) {
      res.json({
        status: 401,
        message: "Unauthorized",
      });
    } else {
      loginSchema.findOne({ username: decoded.username }, (err, user) => {
        if (user) {
          loginSchema.findOneAndUpdate(
            { username: decoded.username },
            { $set: { ballance: user.ballance + ballanceNumber } },
            (err, user) => {
              if (err) {
                res.json({
                  status: 500,
                  message: "Internal Server Error",
                });
              } else {
                res.json({
                  status: 200,
                  message: "Success",
                });
              }
            }
          );
        } else {
          res.json({
            status: 404,
            message: "User not found",
          });
        }
      });
    }
  });
});

api.post("/user/remove", urlencodedParser, (req, res) => {
  const { token } = req.body;

  jwt.verify(token, "supersecret", (err, decoded) => {
    if (err) {
      res.json({
        status: 401,
        message: "Unauthorized",
      });
    } else {
      loginSchema.findOneAndDelete(
        { username: decoded.username },
        (err, user) => {
          if (err) {
            res.json({
              status: 500,
              message: "Internal Server Error",
            });
            console.log(err);
          } else {
            res.json({
              status: 200,
              message: "Success",
            });
          }
        }
      );
    }
  });
});

api.post("/login", urlencodedParser, async (req, res) => {
  const { username, password } = req.body;

  loginSchema.findOne({ username: username }, (err, user) => {
    console.log(user);
    if (user) {
      if (bcrypt.compare(user.password) === password) {
        let token = jwt.sign({ username: username }, "supersecret", {
          expiresIn: "3d",
        });
        res.status(200).json(token);
      } else {
        res.json({
          status: 401,
          message: "Wrong password",
        });
      }
    } else {
      res.json({
        status: 404,
        message: "User not found",
      });
    }
  });
});

api.post("/stock/add", urlencodedParser, (req, res) => {
  const { itemName, itemPrice, itemQuantity } = req.body;

  if (itemName === "" || itemPrice === "" || itemQuantity === "") {
    res
      .status(400)
      .send("Error: itemName, itemPrice and itemQuantity are empty");
  } else {
    const schema = new stockSchema({
      name: itemName,
      price: itemPrice,
      quantity: itemQuantity,
    })

      .save()
      .then(() => {
        res.json({
          status: 200,
          message: "Success",
          data: schema,
        });
      })
      .catch((err) => {
        res.json({
          status: 500,
          message: "Internal Server Error",
        });
        console.log(err);
      });
  }
});

api.post("/stock/remove", urlencodedParser, (req, res) => {
  const { itemName } = req.body;

  if (itemName === "") {
    res.status(400).send("Error: itemName is empty");
  } else {
    stockSchema.findOneAndDelete({ name: itemName }, (err, user) => {
      if (user) {
        res.json({
          status: 200,
          message: "Success",
        });
      } else {
        res.json({
          status: 404,
          message: "Item not found",
        });
      }
    });
  }
});

api.post("/stock/price", urlencodedParser, (req, res) => {
  const { itemName, itemPrice } = req.body;

  if (itemName === "" || itemPrice === "") {
    res.status(400).send("Error: itemName and itemPrice are empty");
  } else {
    stockSchema.findOneAndUpdate(
      { name: itemName },
      { $set: { price: itemPrice } },
      (err, user) => {
        if (err) {
          res.json({
            status: 500,
            message: "Internal Server Error",
          });
        } else {
          res.json({
            status: 200,
            message: "Success",
          });
        }
      }
    );
  }
});

api.get("/stock/data", (req, res) => {
  stockSchema.find({}, (err, items) => {
    if (err) {
      res.json({
        status: 500,
        message: "Internal Server Error",
      });
    } else {
      res.json({
        status: 200,
        message: "Success",
        data: items,
      });
    }
  });
});

api.post("/user/cart/add", urlencodedParser, (req, res) => {
  const { token, itemName } = req.body;

  if (token === "" || itemName === "") {
    res.status(400).send("Error: token, itemName are empty");
  } else {
    jwt.verify(token, "supersecret", function (err, decoded) {
      if (!err) {
        loginSchema.findOne({ username: decoded.username }, (err, user) => {
          if (user) {
            stockSchema.findOne({ name: itemName }, (err, item) => {
              if (item) {
                if (item.quantity > 0) {
                  loginSchema.findOneAndUpdate(
                    { username: decoded.username },
                    {
                      $push: {
                        cart: {
                          item: itemName,
                          price: item.price,
                          quantity: 1,
                        },
                      },
                    },
                    (err, user) => {
                      if (err) {
                        res.json({
                          status: 500,
                          message: "Internal Server Error",
                        });
                      } else {
                        res.json({
                          status: 200,
                          message: "Success",
                        });
                      }
                    }
                  );
                } else {
                  res.json({
                    status: 404,
                    message: "Item not available",
                  });
                }
              } else {
                res.json({
                  status: 404,
                  message: "Item not found",
                });
              }
            });
          } else {
            res.json({
              status: 404,
              message: "User not found",
            });
          }
        });
      } else {
        res.json({
          status: 401,
          message: "Wrong token",
        });
      }
    });
  }
});

api.post("/user/cart/quantity", urlencodedParser, (req, res) => {
  const { token, itemName, quantity } = req.body;

  const newQuantity = Number(quantity);

  if (token === "" || itemName === "" || quantity === "") {
    res.status(400).send("Error: token, itemName and quantity are empty");
  } else {
    jwt.verify(token, "supersecret", function (err, decoded) {
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
                    res.json({
                      status: 200,
                      message: "Success",
                    });
                  })
                  .catch((err) => {
                    res.json({
                      status: 500,
                      message: "Internal Server Error",
                    });
                    console.log(err);
                  });
              } else {
                res.json({
                  status: 404,
                  message: "Item not found",
                });
              }
            });
          } else {
            res.json({
              status: 404,
              message: "User not found",
            });
          }
        });
      } else {
        res.json({
          status: 401,
          message: "Wrong token",
        });
      }
    });
  }
});

api.post("/user/cart/remove", urlencodedParser, (req, res) => {
  const { token, itemName } = req.body;

  if (token === "" || itemName === "") {
    res.status(400).send("Error: token and itemName are empty");
  } else {
    jwt.verify(token, "supersecret", function (err, decoded) {
      if (!err) {
        loginSchema.findOne({ username: decoded.username }, (err, user) => {
          if (user) {
            loginSchema.findOneAndUpdate(
              { username: decoded.username },
              {
                $pull: {
                  cart: {
                    item: itemName,
                  },
                },
              },
              (err, user) => {
                if (err) {
                  res.json({
                    status: 500,
                    message: "Internal Server Error",
                  });
                } else {
                  res.json({
                    status: 200,
                    message: "Success",
                  });
                }
              }
            );
          } else {
            res.json({
              status: 404,
              message: "User not found",
            });
          }
        });
      } else {
        res.json({
          status: 401,
          message: "Wrong token",
        });
      }
    });
  }
});

api.post("/user/cart/removeall", urlencodedParser, (req, res) => {
  const { token } = req.body;

  if (token === "") {
    res.status(400).send("Error: token is empty");
  } else {
    jwt.verify(token, "supersecret", function (err, decoded) {
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
                  res.json({
                    status: 500,
                    message: "Internal Server Error",
                  });
                } else {
                  res.json({
                    status: 200,
                    message: "Success",
                  });
                }
              }
            );
          } else {
            res.json({
              status: 404,
              message: "User not found",
            });
          }
        });
      } else {
        res.json({
          status: 401,
          message: "Wrong token",
        });
      }
    });
  }
});

api.post("/user/purchase", urlencodedParser, (req, res) => {
  const { token } = req.body;

  if (token === "") {
    res.status(400).send("Error: token is empty");
  } else {
    jwt.verify(token, "supersecret", function (err, decoded) {
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
                        res.json({
                          status: 500,
                          message: "Internal Server Error",
                        });
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
                              res.json({
                                status: 500,
                                message: "Internal Server Error",
                              });
                            } else {
                              res.json({
                                status: 200,
                                message: "Success",
                              });
                            }
                          }
                        );
                      }
                    }
                  );
                  const options = {
                    from: "",
                    to: user.email,
                    subject: "EraShop Purchase",
                    text:
                      "Thank you for your purchase, we hope you enjoy your purchase. Your purchase details are below: \n" +
                      user.cart
                        .map(
                          (item) =>
                            "Product name: " +
                            item.item +
                            "\n" +
                            "Prodcut price: " +
                            item.price +
                            "\n" +
                            " "
                        )
                        .join("\n") +
                      "\nTotal Price: " +
                      totalPrice +
                      "\nYour ballance is now: " +
                      user.ballance -
                      totalPrice +
                      "\n\nThank you for shopping with EraShop",
                  };
                  setTimeout(() => {
                    transporter.sendMail(options, (err, info) => {
                      if (err) {
                        console.log(err);
                      }
                    });
                  }, 10000);
                } else {
                  res.json({
                    status: 404,
                    message: "Item not found",
                  });
                }
              });
            });
          } else {
            res.json({
              status: 404,
              message: "User not found",
            });
          }
        });
      } else {
        res.json({
          status: 401,
          message: "Wrong token",
        });
      }
    });
  }
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
        res.json({
          status: 200,
          message: "Success",
          item,
        });
      } else {
        res.json({
          status: 404,
          message: "Item not found",
        });
      }
    });
  }
});

api.get("/user/data", urlencodedParser, async (req, res) => {
  const result = await loginSchema.find();
  res.json({
    data: result,
  });
});


function verifyToken(){

}

api.listen(port, () => {
  console.log("localhost/" + port);
});
