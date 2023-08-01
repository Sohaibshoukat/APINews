import './App.css';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import NewComponent from './Components/NewComponent';

export default function App(){
  const APIKey=process.env.REACT_APP_NEWS_API

  const [progress, setprogress] = useState(0)
    return (
      <>
      <Router>
      <LoadingBar
        height={4}
        color='#f11946'
        progress={progress}
      />
            <Navbar/>
            <Routes>
                <Route exact path="/" element={<NewComponent APIKey={APIKey} setProgress={setprogress} key="India"  Language={"en"}page_size={6}/>} />
                <Route exact path="/French" element={<NewComponent APIKey={APIKey} setProgress={setprogress} key="US" Language={"fr"}page_size={6}/>}/>
                <Route exact path="/Itelian" element={<NewComponent APIKey={APIKey} setProgress={setprogress}  key="China" Language={"it"}page_size={6}/>} />
            </Routes>
      </Router>
      </>
    )
  }

