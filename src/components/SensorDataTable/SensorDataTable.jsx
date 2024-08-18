import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';

function SensorDataTable({timestamps=[],sensorDataByTime=[]}) {
  SensorDataTable.propTypes = {
    timestamps: PropTypes.arrayOf(PropTypes.string).isRequired,
    sensorDataByTime: PropTypes.arrayOf(PropTypes.object).isRequired,
  };
  
  const sensorCategories = ['Humidity %', 'Rain Status', 'Soil Moisture', 'Ph Levels', 'Temperature °C'];

  const getSensorDataForTime = (timestamp) => { // Clearer function name
    const sensorData = sensorDataByTime.find(data => Object.keys(data)[0] === timestamp);
    if (!sensorData) return null;

    return (
      <tr key={timestamp} className='text-center'>
        <td>date</td>
        <td>{timestamp}</td>
        <td>{sensorData[timestamp].humidity}</td>
        <td>{sensorData[timestamp].rainStatus}</td>
        <td>{sensorData[timestamp].soilMoisture}</td>
        <td>{sensorData[timestamp].phLevel}</td>
        <td>{sensorData[timestamp].temperature}</td>
      </tr>
    );
  };
  

  return (
    <Table responsive>
      <thead>
        <tr className='text-center'>
          <th>Date</th>
          <th>Time Stamp</th>
          {sensorCategories.map((sensor) => (
            <th key={sensor}>{sensor}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timestamps.map(timestamp => getSensorDataForTime(timestamp))}
      </tbody>
    </Table>
  );
}

export default SensorDataTable;