import React, { useContext } from 'react'
import { useState } from 'react'
import restaurantFinder from '../api/restaurantFinder';
import { RestaurantsContext } from './../context/RestaurantContext';
const AddRestaurant = (props) => {
    const [name,setName] = useState('');
    const [location,setLocation] = useState('')
    const [price,setPrice]= useState('')

    const {addRestaurants} = useContext(RestaurantsContext);

const initialValues = {
    name,
    location,
    price
}

const handleChangeName = (e) => {
    setName(e.target.value)
}

const handleChangeLocation = (e) => {
    setLocation(e.target.value)
}
const handleChangePrice = (e) => {
    setPrice(e.target.value)
}


const handleSubmit = async (e) => {
    e.preventDefault()
    
    console.log(initialValues)
try{

    const response = await restaurantFinder.post('/',initialValues)
console.log(response)

addRestaurants(response.data.data.restaurant[0])


}catch(e){
    console.log(e)
}


}

  return (
    <div className='d-flex align-items-center justify-content-center mt-5'>
        <form onSubmit={handleSubmit}>
            <div className="row  align-items-center">
                <div className="col">
                <input type="text" className="form-control" placeholder='Name' value={name} onChange={handleChangeName}/>
                </div>
                <div className="col">
                <input type="text" className="form-control" placeholder='Location' value={location} onChange={handleChangeLocation}/>
                </div>
                <div className="col">
                <select className='form-select' onChange={handleChangePrice} defaultValue={'DEFAULT'}>
<option value='DEFAULT' disabled>Select Price</option>
<option value="1">$</option>
<option value="2">$$</option>
<option value="3">$$$</option>
<option value="4">$$$$</option>
<option value="5">$$$$$</option>
                </select>

                </div>
                <div className="col">
                <button type='submit' className='btn btn-outline-primary'>Add</button>

                </div>
            </div>
        </form>
        
    </div>

  )
}

export default AddRestaurant