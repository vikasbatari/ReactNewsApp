import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

 state={
  progress:0
  }
  setProgress =(progress)=>{
    this.setState({progress:progress})
  }
  static pagecont = 20;
  render() {
    return (
      <div>
   
       <Navbar/>  
       <LoadingBar
        color='#f11946'
        progress={this.state.progress}       
      />


       <Routes>       
        <Route exact="true" path="/" element={<News setProgress={this.setProgress}  key="general" pageSize={this.pagecont} country="in" category="general"/>} />         
        <Route exact="true" path="/entertainment" element={<News setProgress={ this.setProgress}  key="entertainment" pageSize={this.pagecont} country="in" category="entertainment"/>} />         
        <Route exact="true" path="/health" element={<News setProgress={ this.setProgress}  key="health" pageSize={this.pagecont} country="in" category="health"/>} /> 
        <Route exact="true" path="/science" element={<News setProgress={ this.setProgress}  key="science" pageSize={this.pagecont} country="in" category="science"/>} /> 
        <Route exact="true" path="/sports" element={<News setProgress={ this.setProgress}  key="sports" pageSize={this.pagecont} country="in" category="sports"/>} /> 
        <Route exact="true" path="/technology" element={<News setProgress={ this.setProgress}  key="technology" pageSize={this.pagecont} country="in" category="technology"/>} /> 
        <Route exact="true" path="/business" element={<News setProgress={ this.setProgress}  key="business" pageSize={this.pagecont} country="in" category="business"/>} /> 
             
     </Routes>


      </div>
    )
  }
}

