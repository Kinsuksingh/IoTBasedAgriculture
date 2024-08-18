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


  const sensorDataWithDateAndTime = [
    { '12:00 AM': { humidity: 23, rainStatus: 1, soilMoisture: 25, phLevel: 7.2, temperature: 28 } },
    { '01:00 AM': { humidity: 25, rainStatus: 0, soilMoisture: 23, phLevel: 7.1, temperature: 26 } },
    // ... Add more data objects
];

const dummyDate = '2024-01-01'; // Replace with desired date

const correctedData = sensorDataWithDateAndTime.map(dataPoint => {
    const time = Object.keys(dataPoint)[0]; // Extract time
    const values = dataPoint[time]; // Extract values

    return {
        date: dummyDate,
        time,
        ...values
    };
});

console.log(correctedData);


  return (
    <div>
      <MyNavbar />
      <Container>
      <h1>Datewise Agriculture Data</h1>
      <SensorDataTable correctedData={correctedData} timestamps={timestamps} sensorDataByTime={sensorDataByTime}/>
      </Container>
    </div>
  );
}

export default Tables;