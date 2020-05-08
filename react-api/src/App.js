import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm'
import UserNotes from './components/UserNotes'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      userName:'',
      userPassword:'',
      isUserValid:null
    }
  }

  handleLogOutClick=()=>{
    this.setState({userName:'',userPassword:'',isUserValid:null});
  }

  getUserLoginInfos=(username,userpassword,isuservalid)=>{
    this.setState({userName:username,userPassword:userpassword,isUserValid:isuservalid});
    console.log(` appjs callback result ${username} , ${userpassword} , ${isuservalid}`);
    this.render();
  }

  render(){
    console.log(`appjs render calıştı, ${this.state.isuservalid}`);
    var loginStatus;
    if(this.state.isUserValid===null){
      loginStatus =<div><h1>Waiting to user login</h1> <LoginForm callBackUserLoginForm={this.getUserLoginInfos}/></div> 
    }else if(this.state.isUserValid===true){
      loginStatus = <div><h1>Sucess</h1><button type="button" onClick={this.handleLogOutClick}>Logout</button> <UserNotes userStatus={this.state}/> </div> 
    }else if(this.state.isUserValid===false){
      loginStatus = <div> <h1>user is not valid</h1> <LoginForm callBackUserLoginForm={this.getUserLoginInfos}/> </div>
    }
    return ( 
        <div>
          {loginStatus}
        </div>
      );
    }
  


}


export default App;
