import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';

function SensorDataTable({standardizedData}) {
  SensorDataTable.propTypes = {
    standardizedData: PropTypes.arrayOf(PropTypes.object).isRequired,
  };
  
  const sensorCategories = ['Date','Time Stamp', 'Temperature °C','Humidity %', 'Soil Moisture', 'Ph Levels', 'Rain Status'];

  const getSensorDataForTime = (sensordata) => {
    return (
      <tr key={sensordata.id} className='text-center'>
        <td>{sensordata.date}</td>
        <td>{sensordata.time}</td>
        <td>{sensordata.temperature}</td>
        <td>{sensordata.humidity}</td>
        <td>{sensordata.soilMoisture}</td>
        <td>{sensordata.phLevel}</td>
        <td>{sensordata.rainStatus}</td>
      </tr>
    );
  };
  

  return (
    <Table responsive>
      <thead>
        <tr className='text-center'>
          {sensorCategories.map((sensor) => (
            <th key={sensor}>{sensor}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {standardizedData.map(sensordata => getSensorDataForTime(sensordata))}
      </tbody>
    </Table>
  );
}

export default SensorDataTable;