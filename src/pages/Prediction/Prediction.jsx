import { useEffect, useState } from 'react';
import axios from 'axios'
import MyNavbar from '../../components/MyNavbar/MyNavbar'

function Prediction() {
    const [prediction, setPrediction] = useState('no data')
    const fetchAPI = async () => {
        try {
            const response = await axios.get("/api/app");
            setPrediction(response.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(()=>{
        fetchAPI()
    },[])
    return(
        <div>
            <MyNavbar/>
            <h1>Crop Prediction</h1>
            <p>{prediction}</p>
        </div>
    )
}

export default Prediction