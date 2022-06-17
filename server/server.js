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

app.get("/api/v1/restaurants/:id/reviewCount", async (req, res) => {
  try {
    const average_rating = await db.query(
      "select trunc(AVG(rating),2) as average_rating from reviews where restaurant_id=$1",
      [req.params.id]
    );
    const count = await db.query(
      "select COUNT(rating) from reviews where restaurant_id=$1",
      [req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        count: count.rows[0],
        average: average_rating.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    // const results = await db.query("select * from restaurants");
    const restaurantReviewData = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), trunc(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id"
    );
    console.log("Getting all the restaurants...");

    res.status(200).json({
      status: "success",
      results: restaurantReviewData.rows.length,
      data: {
        restaurants: restaurantReviewData.rows,
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
    const restaurant = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), trunc(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id= $1",
      [req.params.id]
    );

    const reviews = await db.query(
      "select * from reviews where restaurant_id = $1",
      [req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
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

// post method for review
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "insert into reviews(restaurant_id,name,review,rating) values($1,$2,$3,$4) returning *",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );

    res.status(200).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// update method
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
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
