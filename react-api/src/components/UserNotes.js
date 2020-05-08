import React from 'react';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import axios from 'axios'

class UserNotes extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      userpassword:'',
      usernotes:[]
    }
  }

  handleOnClickShowNotes = async ()=>{
    this.setState({username:this.props.userStatus.userName,userpassword:this.props.userStatus.userPassword});
    const userObject = {
      userName:this.props.userStatus.userName,
      userPassword:this.props.userStatus.userPassword
    }
      await axios.post(`https://apiforreact20200507165551.azurewebsites.net/api/post/getusernotes`, userObject )
      .then(res => {
        this.setState({usernotes:res.data});
      });
  }

  componentDidMount(){
    
  }

  render(){
    return ( 
      <div>
        <button type="button" onClick={this.handleOnClickShowNotes}>Show My Notes</button>
        <ul> 
          {
            this.state.usernotes.map((note,i)=>{
              return <li>{this.state.usernotes[i]}</li>
            })
          }
        </ul>
      </div>
    );
  }
}


export default UserNotes;