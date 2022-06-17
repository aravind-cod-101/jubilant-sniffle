import React from 'react'
import StarRating from './StarRating';

const Reviews = ({reviews}) => {
  return (



    <div className='row p-2'>
        {reviews.map(item => {
  return(
    <div key={item.id} className="card text-white bg-primary m-2" style={{maxWidth:"30%"}}>
    <div className="card-header d-flex justify-content-between">
    <span>{item.name}</span>        
    <span ><StarRating rating={item.rating}/></span>
    </div>
    <div className="card-body">
        <p className="card-text">
        {item.review}
            </p></div>
    </div>
    
    
  )
})}
       
        </div>
  )
}

export default Reviews