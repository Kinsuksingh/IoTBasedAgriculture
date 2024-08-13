
import { useState, useEffect } from 'react';
import MyNavbar from '../../components/MyNavbar/MyNavbar';
import axios from 'axios';
import { Container } from 'react-bootstrap';

function Tables() {
  const [sensorData, setSensorData] = useState({});
  const databaseSecret = import.meta.env.VITE_YOUR_DATABASE_SECRET
  const url = `https://smart-agriculture-27cf2-default-rtdb.firebaseio.com/sensors.json?auth=${databaseSecret}`



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setSensorData(response.data)
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <MyNavbar />
      <Container>
      <h1>Smart Agriculture Dashboard</h1>
      <p>Real-time data from your sensors</p>

      {/* Display sensor data here */}
      {Object.keys(sensorData).length > 0 ? (
        <div>
          {/* Render sensor data using appropriate components or formatting */}
          {/* Example: */}
          <p>Temperature: {sensorData.temperature}</p>
          <p>Humidity: {sensorData.humidity}</p>
          {/* ... other sensor data */}
        </div>
      ) : (
        <p>Loading sensor data...</p>
      )}
      </Container>
    </div>
  );
}

export default Tables;