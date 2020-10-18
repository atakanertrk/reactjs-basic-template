import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as signalR from "@microsoft/signalr";
import { render } from '@testing-library/react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reciverUserId: "",
      message: "",
      senderUserId: "",
      groupName: "",
      connection: null,
      groupNameCreate: "",
      messageToGroup: "",
      joinedGroups: [],
      userName: ""
    };
  }

  componentDidMount = async () => {
    const hubConnection = await new signalR.HubConnectionBuilder()
      .withUrl("https://serverreactapi.azurewebsites.net/message")
      .build();
    try {
      await hubConnection.start();
      this.setState({ senderUserId: hubConnection.connectionId, connection: hubConnection })
      console.log("connection success");
    } catch (error) {
      console.log("connection failed : ");
      alert("server is not started, connection failed");
      this.setState({ senderUserId: "server is not avilable" });
    }

    hubConnection.on("getDM", message => {
      console.log("recall from server");
      console.log(message);
      var ul = document.getElementById("messages");
      var li = document.createElement("li");
      li.innerText = message;
      ul.appendChild(li);
    })

    hubConnection.on("GetAllGroups", groups => {
      console.log(groups);
      var ol = document.getElementById("groups");
      ol.innerHTML = "";
      groups.forEach(group => {
        var li = document.createElement("li");
        li.innerText = group;
        ol.appendChild(li);
      });
    })

    hubConnection.on("GetGroupMessages", groupMessages => {
      var ul = document.getElementById("groupMessages");
      var li = document.createElement("li");
      li.innerText = groupMessages;
      ul.appendChild(li);
    })
  }

  handleChangeToWho = (event) => {
    this.state.reciverUserId = event.target.value;
  }
  handleChangeMessage = (event) => {
    this.state.message = event.target.value;
  }
  handleSubmitSend = async (event) => {
    event.preventDefault();
    var DmObject = {
      Message: this.state.message,
      senderUserId: this.state.senderUserId,
      reciverUserId: this.state.reciverUserId
    }
    // 
    var response = await fetch('https://serverreactapi.azurewebsites.net/api/message/senddm', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(DmObject)
    });
    var ul = document.getElementById("messages");
    var li = document.createElement("li");
    li.innerText = "you said : " + this.state.message + " to " + this.state.reciverUserId;
    ul.appendChild(li);
    console.log(response);
  }
  handleGroupNameChange = (event) => {
    this.setState({ groupName: event.target.value });
  }
  handleLoginGroupSubmit = async (event) => {
    event.preventDefault();
    try {
      await this.state.connection.invoke("JoinToGroup", this.state.groupName);
      var ol = document.getElementById("joinedGroups");
      var li = document.createElement("li");
      li.innerText = this.state.groupName;
      ol.appendChild(li);
    } catch (err) {
      console.error(err);
    }
  }
  handleCreateGroupSubmit = async (event) => {
    event.preventDefault();
    try {
      await this.state.connection.invoke("CreateGroup", this.state.groupNameCreate);
      await this.state.connection.invoke("JoinToGroup", this.state.groupNameCreate);
      this.state.groupName = this.state.groupNameCreate;
      var ol = document.getElementById("joinedGroups");
      var li = document.createElement("li");
      li.innerText = this.state.groupNameCreate;
      ol.appendChild(li);
    } catch (err) {
      console.error(err);
    }
  }
  handleCreateGroupNameChange = (event) => {
    this.state.groupNameCreate = event.target.value;
  }
  handleMessageJoinedGroupSubmit = async (event) => {
    event.preventDefault();
    var SendMessageToGroupModel = {
      Message: this.state.messageToGroup,
      GroupName: this.state.groupName,
      UserName : this.state.userName
    }
    try {
      if(this.state.GroupName !== ""){
        await this.state.connection.invoke("SendMessageToGroup", SendMessageToGroupModel);
      }
    } catch (err) {
      console.error(err);
    }
  }
  handleMessageJoinedGroupChange = (event) => {
    this.state.messageToGroup = event.target.value;
  }
  handleDisconnectFromGroups = async (event) => {
    event.preventDefault();
    try {
      await this.state.connection.invoke("DisconnectFromAllGroups");
      var ol = document.getElementById("joinedGroups");
      ol.innerHTML = "";
      this.state.GroupName = "";
    } catch (err) {
      console.error(err);
    }
  }
  handleUserNameSubmit = async (event) => {
    event.preventDefault();
    alert("user name is : " + this.state.userName);
    this.setState({ userName: this.state.userName });
    setTimeout(() => {  this.state.connection.invoke("GetAllGroups"); }, 2000);
  }
  handleUserNameChange = async (event) => {
    this.state.userName = event.target.value;
  }

  render() {
    if (this.state.userName !== "") {
      return (
        <div>
          <h3>{this.state.userName}</h3>
          <div style={{border:"4px solid green", boxSizing:"border-box"}}>
          <div>
            <h3>Join or create group chat</h3>
            <form onSubmit={this.handleLoginGroupSubmit}>
              Group Name:
                  <input onChange={this.handleGroupNameChange}></input>
              <button type="submit">join</button>
            </form>
            <form onSubmit={this.handleCreateGroupSubmit}>
              Group Name:
                  <input onChange={this.handleCreateGroupNameChange}></input>
              <button type="submit">Create</button>
            </form>
            <h5>All Public Groups</h5>
            <ol id="groups" style={{ textAlign: "left" }}>
            </ol>
            <h5>All Joined Groups</h5>
            <ol id="joinedGroups" style={{ textAlign: "left" }}>
            </ol>
            <form onSubmit={this.handleDisconnectFromGroups}>
              <button type="submit">Disconnect From All Groups</button>
            </form>
          </div>
          <div>
            <form onSubmit={this.handleMessageJoinedGroupSubmit}>
              SendMessageToAllJoinedGroups:
                  <input onChange={this.handleMessageJoinedGroupChange}></input>
              <button type="submit">Send to all joined groups</button>
            </form>
          </div>
          <div>
            <h5>All Recived Messages From Joined Groups</h5>
            <ol id="groupMessages" style={{ textAlign: "left" }}>
              <li>..</li>
            </ol>
          </div>
          </div>
          
          <div className="App" style={{ border: "4px solid red", margin: "50px" }}>
            <ul id="messages" style={{ textAlign: "center", listStyle: "none" }}>
              <h5>Send and Recive Direct Messages via Id</h5>
              <h4>your id is = {this.state.senderUserId}</h4>
            </ul>
            <hr />
            <div>
              <form onSubmit={this.handleSubmitSend}>
                reciver id:
                  <input onChange={this.handleChangeToWho}></input>
                   message:
                  <input onChange={this.handleChangeMessage}></input>
                <button type="submit">send</button>
              </form>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <form onSubmit={this.handleUserNameSubmit}>
          Submit Your User Name For The Session:
          <input onChange={this.handleUserNameChange}></input>
          <button type="submit">Submit user name</button>
        </form>
      );
    }

  }
}

export default App;
