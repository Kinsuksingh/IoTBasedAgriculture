import { useState, useEffect } from 'react';
import MyNavbar from '../../components/MyNavbar/MyNavbar';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import SensorDataTable from '../../components/SensorDataTable/SensorDataTable';

function Tables() {
  const [sensorData, setSensorData] = useState({});
  const databaseSecret = import.meta.env.VITE_YOUR_DATABASE_SECRET
  const url = `https://smart-agriculture-27cf2-default-rtdb.firebaseio.com/sensors-data.json?auth=${databaseSecret}`



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data.friday
        console.log(data)
        setSensorData(response.data)
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchData();
  }, []);

  const timestamps = ['12:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM'];
  const sensorDataByTime = [ // More descriptive than timeStampss
    { '12:00 AM': { humidity: 23, rainStatus: 1, soilMoisture: 25, phLevel: 7.2, temperature: 28 } },
    { '01:00 AM': { humidity: 25, rainStatus: 0, soilMoisture: 23, phLevel: 7.1, temperature: 26 } },
    // ... Add more data objects
  ];


  return (
    <div>
      <MyNavbar />
      <Container>
      <h1>Smart Agriculture Data in Daywise</h1>
      <SensorDataTable timestamps={timestamps} sensorDataByTime={sensorDataByTime}/>
      </Container>
    </div>
  );
}

export default Tables;