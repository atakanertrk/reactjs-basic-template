import React from 'react';
import './App.css';
import UserForm from './Components/UserForm'
import UserNotesPage from './Components/UserNotesPage'
class App extends React.Component {

 constructor(props){
    super(props);
    this.state={
      UserName:'',
      userPassword:'',
      AreNotesRecived:false,
      UserNotes:[]
    }
  }

  getUserNotes=(usernotes,username,userpassword)=>{
      this.setState({UserNotes:usernotes,AreNotesRecived:true,UserName:username,UserPassword:userpassword});
  } 
  refreshCallBack = (usernotes) =>{
    this.state.UserNotes = usernotes;
    this.forceUpdate();
  }

  logOutHandle = ()=>{
    this.state.AreNotesRecived=false;
    this.state.UserNotes=[];
    this.forceUpdate();
  }

  render(){
    let UserOrForm;
    if(this.state.AreNotesRecived){
      UserOrForm = <div><button className="logoutBtn" onClick={this.logOutHandle}>logout</button><UserNotesPage refreshCallBack={this.refreshCallBack} username={this.state.UserName} userpassword={this.state.UserPassword} usernotes={this.state.UserNotes}/></div>
    }else{
      UserOrForm = <UserForm getUserNotes={this.getUserNotes} /> 
    }
    return (
      <div className="App">
        <h2 className="headerStyle"> Create and manage notes</h2>
        {UserOrForm}
      </div>
    );}
  
}

export default App;
