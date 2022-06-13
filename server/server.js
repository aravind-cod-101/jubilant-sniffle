// import
require("dotenv").config();
const express = require("express");
const db = require("./db/index");

// code
const app = express();
var restaurants = require("./restaurants.json");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to YELP!!");
});

// Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("select * from restaurants");
    console.log("Getting all the restaurants...");
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "failed",
      data: {
        err,
      },
    });
  }
});

// Get a single restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    console.log(req);

    const record = await db.query("select * from restaurants where id= $1", [
      req.params.id,
    ]);
    res.status(200).json({
      status: "success",
      data: {
        restaurant: record.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      data: {
        err,
      },
    });
  }
});

// Post method
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    console.log(req.body);
    const data = req.body;
    const results = await db.query(
      "insert into restaurants (name,location,price) values($1,$2,$3) returning *",
      [data.name, data.location, data.price]
    );

    res.json({
      status: "success",
      data: {
        restaurant: results.rows,
      },
    });
  } catch (err) {
    res.json({
      status: "failed",
      data: {
        err,
      },
    });
  }
});

// update method
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params.id);
    const result = await db.query(
      "update restaurants set name = $1, location = $2, price=$3 where id = $4 returning *",
      [req.body.name, req.body.location, req.body.price, req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        restaurant: result.rows,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      data: {
        err,
      },
    });
  }
});

// delete method

app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const results = await db.query("delete from restaurants where id = $1", [
      req.params.id,
    ]);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      data: {
        err,
      },
    });
  }
});
// end of program
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`);
});
