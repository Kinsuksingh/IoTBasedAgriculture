import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import MyNavbar from '../../components/MyNavbar/MyNavbar'


function Home() {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_REACT_APP_apiKey,
      authDomain: import.meta.env.VITE_REACT_APP_authDomain,
      databaseURL: import.meta.env.VITE_REACT_APP_url,
      projectId: import.meta.env.VITE_REACT_APP_projectId,
      storageBucket: import.meta.env.VITE_REACT_APP_storageBucket,
      messagingSenderId: import.meta.env.VITE_REACT_APP_messagingSenderId,
      appId: import.meta.env.VITE_REACT_APP_appId,
    }
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    return(
        <div>
            <MyNavbar/>
        </div>
    )
}

export default Home









