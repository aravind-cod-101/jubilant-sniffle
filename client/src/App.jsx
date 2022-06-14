import React from 'react';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import UpdatePage from './routes/UpdatePage';
import RestaurantDetailsPage from './routes/RestaurantDetailsPage';
import Home from './routes/Home';
import { RestaurantsContextProvider } from './context/RestaurantContext';
const App =() => {
    return (

    
    
    <RestaurantsContextProvider>
    <div className='container'>
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/restaurants/:id/update" element={<UpdatePage />} />
                <Route exact path="/restaurants/:id" element={<RestaurantDetailsPage />} />

            </Routes>
        </Router>
    </div>
    </RestaurantsContextProvider>
    )
}

export default App;