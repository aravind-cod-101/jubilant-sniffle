import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import restaurantFinder from "../api/restaurantFinder";
import { RestaurantsContext } from "./../context/RestaurantContext";
const UpdateRestaurant = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchData = async (id) => {
      const response = await restaurantFinder.get(`/${id}`);
      setName(response.data.data.restaurant.name);
      setLocation(response.data.data.restaurant.location);
      setPrice(response.data.data.restaurant.price);
    };
    fetchData(id);
  }, []);
  const { restaurants, addRestaurants } = useContext(RestaurantsContext);

  const initialValues = {
    name,
    location,
    price,
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeLocation = (e) => {
    setLocation(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(initialValues);

    const updatedData = await restaurantFinder.put(`/${id}`, initialValues);
    console.log(updatedData);
    navigate("/");
  };

  return (
    <div>
      <form
        className="p-2 d-md-flex flex-column justify-content-between "
        action=""
        onSubmit={handleSubmit}
      >
        <div className="form-group mt-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            onChange={handleChangeName}
            value={name}
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            className="form-control"
            onChange={handleChangeLocation}
            value={location}
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="price">Price</label>
          <input
            min={1}
            max={5}
            type="number"
            value={price}
            onChange={handleChangePrice}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary mt-3" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
