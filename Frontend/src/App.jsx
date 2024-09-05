import {BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Charts from './pages/Charts/Charts'
import Tables from './pages/Tables/Tables'
import Prediction from './pages/Prediction/Prediction'
import Track from './pages/Track/Track'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/data" element={<Charts/>}/>
        <Route path="/history" element={<Tables/>}/>
        <Route path="/predict" element={<Prediction/>}/>
        <Route path="/track" element={<Track/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
