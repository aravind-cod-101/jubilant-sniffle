import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import restaurantFinder from '../api/restaurantFinder';
import { useParams } from 'react-router-dom';


const AddReview = () => {
const navigate = useNavigate()
const {id} = useParams();


const[name,setName] = useState('')
const handleName=(e)=>{
    setName(e.target.value)
}

const [rating,setRating] =useState('')
    const handleRating =(e)=>{
setRating(e.target.value)
    }

const[review,setReview] = useState('')

const handleReview = (e) => {
    setReview(e.target.value)
}

const initialValues = {
    name,
    rating,
    review
}


const handleSubmit = async(e) => {
    // console.log(initialValues)
try{
    const postData = await restaurantFinder.post(`/${id}/addReview`,initialValues)

    console.log(postData)
}catch(err){
    console.log(err)
}
}


  return (
    <div className='mb-2'>
    <button className='btn btn-warning' onClick={() => {(navigate('/'))}}>Back to Home</button>

        <h4 className='text-center mt-3 mb-3'>Add a review</h4>

<form action="">
    <div className="row">
        <div className="form-group col-8">
<label htmlFor="name">Name</label>
<input id="name" placeholder='name' type='text' className='form-control' value={name} onChange={handleName}/>


</div>
<div className="form-group col-4">
<label htmlFor="rating">Rating</label>
            <select id="rating" className="form-select" defaultValue={'DEFAULT'} onChange={handleRating}>
                <option value="DEFAULT" disabled>Select Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
</div>



            
        
    </div>
    <div className="form-group mt-3">
        <label htmlFor="Review">Review</label>
        <textarea id="Review" className='form-control' value={review} onChange={handleReview}>

        </textarea>
    </div>
    <div className="d-flex justify-content-start mt-4">
    <button className='btn btn-primary' type='submit' onClick={(e) => {handleSubmit(e)}}>Submit</button>

    </div>
    
</form>
    </div>
  )
}

export default AddReview