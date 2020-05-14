import React from 'react';
import './UserForm.css';
import axios from 'axios';

class UserForm extends React.Component {

 constructor(props){
    super(props);
    this.state={
      UserName:'',
      UserPassword:'',
      UserNotes:[],
      status:''
    }
  }


  UserNameOnChange = (event) =>{
    this.setState({UserName:event.target.value});
  }
  UserPasswordOnChange = (event) =>{
    this.setState({UserPassword:event.target.value});
  }
  _handleKey = (event) =>{
    if(event.key==='Enter'){
      this.LoginOnClick();
    }
  }
  RegisterOnClick = async () =>{
    if(this.state.UserName==='' || this.state.UserPassword===''){
      this.state.status="write your username and password...";
      this.forceUpdate();
    }
    else{
       const userObject ={
          UserName:this.state.UserName,
          UserPassword:this.state.UserPassword
        };
        await axios.put(`https://localhost:44308/api/registeruser`, userObject )
        .then(res => {
          if(res.data==='userexist'){
            this.state.status=`user is exist:${this.state.UserName}`;
            this.forceUpdate();
          }else if(res.data==='error'){
            this.state.status="server error, try later"
            this.forceUpdate();
          }else{
            this.state.status="register SUCESS you can login."
            this.LoginOnClick();
            this.forceUpdate();
          }
        });      
    }
  }
  LoginOnClick = async () =>{
    if(this.state.UserName==='' || this.state.UserPassword===''){
      this.state.status="write your username and password !";
      this.forceUpdate();
    }
    else{
        const userObject ={
          UserName:this.state.UserName,
          UserPassword:this.state.UserPassword
        };
         await axios.post(`https://localhost:44308/api/getnotes`, userObject )
          .then(res => {
            console.log("*********************");
            console.log(res.data);
            console.log("*********************");
            if(res.data.length!==0){
              if(res.data[0][0]!=='notvalid'){
                this.setState({UserNotes:res.data});
                this.props.getUserNotes(this.state.UserNotes,this.state.UserName,this.state.UserPassword);
              }else{
                this.state.status="username or password is wrong !"
                this.forceUpdate();
              } 
            }else{
              this.setState({UserNotes:res.data});
              this.props.getUserNotes(this.state.UserNotes,this.state.UserName,this.state.UserPassword);
            }

          });      
    }

  }


  render(){
    return (
      <div className="formDiv">
          <h3>{this.state.status}</h3>
          <label className="mylabel">Username</label><br/>
          <input className="myinput" onChange={this.UserNameOnChange} onKeyDown={this._handleKey} type="text"/><br/>
          <label className="mylabel">Password</label><br/>
          <input className="myinput" onChange={this.UserPasswordOnChange} onKeyDown={this._handleKey} type="password"/><br/>
          <button onClick={this.LoginOnClick} className="formButton">Login</button><br/>
          <p className="myp" onClick={this.RegisterOnClick}>or create account</p>
      </div>
    );}
  
}

export default UserForm;