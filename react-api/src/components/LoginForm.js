import React from 'react';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import axios from 'axios'

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state={
      userName:'',
      userPassword:'',
      isUserValid:null
    }
  }

  handleUsernameChange=(event)=>{
    this.setState({userName:event.target.value});
  }
  handlePasswordChange=(event)=>{
    this.setState({userPassword:event.target.value});
  }

  handleClickLogin= async ()=>{
    const uname = this.state.userName;
    const upassword = this.state.userPassword;
    console.log(`login clicked ${uname} ${upassword}`);
    
      const userObject = {
      userName:uname,
      userPassword:upassword
    }
    console.log("1")
    await axios.post(`https://apiforreact20200507165551.azurewebsites.net/api/post/isvalid`, userObject )
      .then(res => {
        console.log("2 --api started")
        this.setState({isUserValid:res.data});
        console.log(`3 --api finished : ${this.state.isUserValid}`)
      });
    console.log("4 api should end ")

    if(this.state.isUserValid===true){
      console.log("user is valid");
      this.props.callBackUserLoginForm(uname,upassword,this.state.isUserValid);
    }else if(this.state.isUserValid===false){
      console.log("user is not valid");
      this.props.callBackUserLoginForm(uname,upassword,this.state.isUserValid);
    }else{
      console.log(`returned null : ${this.state.isUserValid}`);
    }
  }

  render(){
    return ( 
      <div>
        <input onChange={this.handleUsernameChange} type="text" placeholder="user name"/><br/>
        <input onChange={this.handlePasswordChange} type="password" placeholder="user password"/><br/>
        <button type="button" onClick={this.handleClickLogin}>Login</button>
      </div>
    );
  }
}


export default LoginForm;