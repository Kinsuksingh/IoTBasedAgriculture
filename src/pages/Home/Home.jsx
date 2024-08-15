import { useState, useEffect } from "react";
import FirebaseConfig from "../../firebase/FirebaseConfig";
import { initializeApp } from "firebase/app";
import {ref, get, child, getDatabase } from "firebase/database";
import MyNavbar from '../../components/MyNavbar/MyNavbar'
import { Container } from "react-bootstrap";



function Home() {
    let [wifi, setWifi] = useState('')
    let [SoilMoisture, setSoilMois] = useState('')
    let [temperature, setTemp] = useState('')
    let [humidity, setHumidity] = useState('')
    let [rainStatus, setRainStatus] = useState('')
    let [soilPh, setSoilPh] = useState('')

    useEffect(() => {
        setInterval(() => {
            getData();
        }, 1000); // Interval: Fetch data every second
    }, []);

    const app = initializeApp(FirebaseConfig);
    const database = getDatabase(app);
    let getData = () => {
        const dbref = ref(database)
        get(child(dbref, "live-sensors-data")).then(snapshot => {
            if (snapshot.exists()){
                setWifi('Online')
                setSoilMois(snapshot.val().soilMoisture)
                setTemp(snapshot.val().temperature)
                setHumidity(snapshot.val().humidity)
                setRainStatus(snapshot.val().rainStatus)
                setSoilPh(snapshot.val().soilPh)
            }else{
                setWifi('Ofline')
            }
        })
    }

    return(
        <div>
            <MyNavbar/>
            <Container>
            <div>
                <h1>wifi status:{wifi}</h1>
                <h1>soilMois:{SoilMoisture}</h1>
                <h1>temp:{temperature}</h1>
                <h1>humi:{humidity}</h1>
                <h1>rainStatus:{rainStatus?'true':'false'}</h1>
                <h1>soil ph : {soilPh}</h1>
            </div>
            </Container>
        </div>
    )
}

export default Home









