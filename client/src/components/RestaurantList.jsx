import React from 'react'

const RestaurantList = () => {
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
                </tr>
                <tr>
                    <td>McDonalds</td>
                    <td>New York</td>
                    <td>$$</td>
                    <td>Rating</td>
                    <td><button className='btn btn-warning'>Edit</button></td>
                    <td><button className='btn btn-danger'>Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default RestaurantList