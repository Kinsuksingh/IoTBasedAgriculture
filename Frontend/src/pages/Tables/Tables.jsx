import { useState, useEffect } from 'react';
import MyNavbar from '../../components/MyNavbar/MyNavbar';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import SensorDataTable from '../../components/SensorDataTable/SensorDataTable';

function Tables() {
  const [sensorData, setSensorData] = useState({});
  const databaseSecret = import.meta.env.VITE_YOUR_DATABASE_SECRET
  const url = `https://smart-agriculture-27cf2-default-rtdb.firebaseio.com/sensors-data.json?auth=${databaseSecret}`

  const standardizedData = [
    {id:1,day: '2024-01-01', readingCount: '12:00 AM', humidity: 23, rainStatus: 1, soilMoisture: 25,phLevel: 7.2, temperature: 28}, 
    {id:2,day: '2024-01-01', readingCount: '01:00 AM', humidity: 25, rainStatus: 0, soilMoisture: 23,phLevel: 7.1, temperature: 26}
    ]

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
  }, [url]);


  

// Example usage:
// const standardizedDatas = Object.values(sensorData);


  return (
    <div>
      <MyNavbar />
      <Container>
      <h1>Daywise Agriculture Data</h1>
      <SensorDataTable standardizedData={standardizedData}/>
      </Container>
    </div>
  );
}

export default Tables;