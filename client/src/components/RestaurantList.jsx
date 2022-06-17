import React, {useEffect} from 'react'
import { useContext } from 'react'
import restaurantFinder from '../api/restaurantFinder'
import { RestaurantsContext } from './../context/RestaurantContext';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

const RestaurantList = () => {
    const {restaurants,setRestaurants} = useContext(RestaurantsContext);

    const navigate = useNavigate()
    const response = async() => {
        try{
            await restaurantFinder.get('/').then(res => setRestaurants(res.data.data.restaurants))
          } catch(e) {
            console.log(e)
        }
        }
    useEffect( () => {
response();
},[])

const handleDelete = async(e,id) => {
    e.stopPropagation()
    const response  = await restaurantFinder.delete(`/${id}`);
    console.log(response)
    setRestaurants(restaurants.filter(restaurant => {
        return restaurant.id !== id
    }))
}


const handleUpdate = (e,id) => {
    e.stopPropagation()
   
    navigate(`/restaurants/${id}/update`);
}


const handleReview = (id) => {
    navigate(`/restaurants/${id}`)
}

const renderRating = (restaurant) => {

    if(!restaurant.count){
        return <span className='text-warning'>0 reviews</span>
    }
    return(
        <>
        <StarRating rating={restaurant.average_rating}/>
        <span className="text-warning ml-2">{restaurant.count}</span>
        </>
    )
}

const noData = (restaurants) => {
    if(restaurants === null){
        return <h1 className='text-warning'>No data available</h1>
    }
}


  return (
    <div>
        <table className='table table-dark table-hover container mt-5'>
            <thead>
                <tr className='table-info'>
                    <th scope="col">Restaurant</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price Range</th>
                    <th scope="col">Ratings</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
               
        

            {restaurants && restaurants.map((item,index) => {
                return(
                      <tr key={index} style={{"cursor" : "pointer"}} onClick={() => handleReview(item.id)}>
                      <td>{item.name}</td>
                      <td>{item.location}</td>
                      <td>{"$".repeat(item.price)}</td>
                      <td>{renderRating(item)}</td>
                    <td><button className='btn btn-warning' onClick={(e) => handleUpdate(e,item.id)}>Edit</button></td>
                    <td><button className='btn btn-danger' onClick={(e)=> handleDelete(e,item.id)}>Delete</button></td>
                      </tr>
                    
                    
                )})}




                {/* <tr>
                    <td>McDonalds</td>
                    <td>New York</td>
                    <td>$$</td>
                    <td>Rating</td>
                    <td><button className='btn btn-warning'>Edit</button></td>
                    <td><button className='btn btn-danger'>Delete</button></td>
                </tr>
                <tr>
                    <td>McDonalds</td>
                    <td>New York</td>
                    <td>$$</td>
                    <td>Rating</td>
                    <td><button className='btn btn-warning'>Edit</button></td>
                    <td><button className='btn btn-danger'>Delete</button></td>
                </tr>
                <tr>
                    <td>McDonalds</td>
                    <td>New York</td>
                    <td>$$</td>
                    <td>Rating</td>
                    <td><button className='btn btn-warning'>Edit</button></td>
                    <td><button className='btn btn-danger'>Delete</button></td>
                </tr>
                <tr>
                    <td>McDonalds</td>
                    <td>New York</td>
                    <td>$$</td>
                    <td>Rating</td>
                    <td><button className='btn btn-warning'>Edit</button></td>
                    <td><button className='btn btn-danger'>Delete</button></td>
                </tr> */}
            </tbody>
        </table>
    </div>
  )
}

export default RestaurantList