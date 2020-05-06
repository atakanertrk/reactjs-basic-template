import React from 'react';
import './App.css';
import About from './components/About' 
import Shop from './components/Shop'
import Nav from './components/Nav'
import Home from './components/Home'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import { Link } from 'react-router-dom'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:''
    }
  }

  getUserLoginInfos=(userName,userPassword)=>{
    this.setState({username:userName,password:userPassword});
    console.log("appjs callback çalıştı");
  }

  render(){
    return (
      <div>
        <h1 className="showuserNameTopLeft">{this.state.username}</h1>
        <h1 className="showuserNameTopLeft">{this.state.password}</h1>
        <Router>
          <div className="App">
              <Nav callbackFromParent={this.getUserLoginInfos}/>
              <Switch>
                <Route path="/" exact  component={Home}/>
                <Route path="/about"exact component={About}/>
                <Route path="/shop" exact component={Shop}/>
              </Switch>
          </div>
        </Router>
      </div>
    );
  }
}


export default App;
