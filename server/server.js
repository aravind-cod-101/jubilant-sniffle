require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
var restaurants = require("./restaurants.json");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to YELP!!");
});

// Get all restaurants
app.get("/api/v1/restaurants", (req, res) => {
  console.log("Getting all the restaurants...");
  res.status(200).json({
    status: "success",
    data: {
      restaurants,
    },
  });
});

// Get a single restaurant
app.get("/api/v1/restaurants/:id", (req, res) => {
  console.log(req);
  const id = req.params.id;

  res.send(id);
  // res.status(200).json({
  //     status: "success",
  //     data:{

  //     }
  // })
});

// Post method
app.post("/api/v1/restaurants", (req, res) => {
  console.log(req.body);
  const data = req.body;
  restaurants.push(data);
  res.json({
    status: "success",
    data: {
      restaurants,
    },
  });
});

// update method
app.put("/api/v1/restaurants/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  res.send("Updated");
});

// delete method

app.delete("/api/v1/restaurants/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  res.send("Deleted");
});
// end of program
app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`);
});
