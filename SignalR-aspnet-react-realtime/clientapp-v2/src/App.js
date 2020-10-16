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
      senderUserId: ""
    };
  }

  componentDidMount = async () => {
    const hubConnection = await new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44339/message")
      .build();
    try {
      await hubConnection.start();
      this.setState({ senderUserId: hubConnection.connectionId })
      console.log("connection success");
      console.log("your id is : " + this.state.connectionId);
    } catch (error) {
      console.log("connection failed : ");
    }

    hubConnection.on("getDM", message => {
      console.log("recall from server");
      console.log(message);
      var ul = document.getElementById("messages");
      var li = document.createElement("li");
      li.innerText = message;
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
    var response = await fetch('https://localhost:44339/api/message/senddm', {
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
  
  render() {
    return (
      <div className="App">
        <h4>your id is = {this.state.senderUserId}</h4>
        <h4>hello this is client app</h4>
        <ul id="messages">
          <li>All Messages</li>
        </ul>
        <div>
          <form onSubmit={this.handleSubmitSend}>
            <input onChange={this.handleChangeToWho}></input>
            <input onChange={this.handleChangeMessage}></input>
            <button type="submit">send</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
