import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import restaurantFinder from '../api/restaurantFinder';
import { useState } from 'react';
import { useContext } from 'react';
import { RestaurantsContext } from './../context/RestaurantContext';
import StarRating from './../components/StarRating';
import Reviews from './../components/Reviews';
import AddReview from './../components/AddReview';


const RestaurantDetailsPage = () => {

const {id} =  useParams();

const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext);


useEffect(() =>{
  const fetchData = async() => {
    try{
      const response = await restaurantFinder.get(`/${id}`)
      console.log(response)
      setSelectedRestaurant(response.data.data)
      
    }catch(err){
      console.log(err)
    }
    
  }
  fetchData()
},[])

  return (
    <div>

      {selectedRestaurant && (<>
<h1 className='font-weight-light display-5 text-center'>{selectedRestaurant && selectedRestaurant.restaurant.name}</h1>  
<h6 className='mt-2 text-center'><StarRating rating={selectedRestaurant.restaurant.average_rating}/><span className='text-warning'>{selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})`:'(0)'}</span></h6>
    <div className='mt-17'><Reviews reviews={selectedRestaurant.reviews}/></div>
    <div><AddReview /></div>
        </>)}
    </div>
  )
}

export default RestaurantDetailsPage