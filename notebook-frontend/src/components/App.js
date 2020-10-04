import React, { Component } from 'react'
import './App.css'
import UserNotes from './UserNotes.js'
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import axios from 'axios'
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			UserName: '',
			UserPassword: '',
			IsLoggedIn:false,
			UserNotes:[],
			Note:'',
			Status:''
		}
		this.handleUserName = this.handleUserName.bind(this);
		this.handleUserPassword = this.handleUserPassword.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.getUserNotes = this.getUserNotes.bind(this);
		this.handleLogOut = this.handleLogOut.bind(this);
		this.handleCreateAccount = this.handleCreateAccount.bind(this);
	}

	handleUserName = (event) => {
		this.setState({ UserName: event.target.value, Status:'' });
	}
	handleUserPassword = (event) => {
		this.setState({ UserPassword: event.target.value, Status:'' });
	}
	handleLogin = async (event) => {
		event.preventDefault();
		var LoginObject = {
			UserName:this.state.UserName,
			UserPassword:this.state.UserPassword
		}
		await axios.post(`https://localhost:44360/api/user/login`, LoginObject)
			.then(res => {
				bake_cookie('CookieAuth', res.data.authCode);
				this.setState({IsLoggedIn:true});
			}).catch(err=>{
				if(err.response===undefined){
					this.setState({Status:"Cannot connect to server, try it later"});
				}
				else{
					this.setState({Status:"Login failed, username or password is wrong"});
				}
			});
	}
	handleLogOut=(event)=>{
		event.preventDefault();
		delete_cookie('CookieAuth');
		this.setState({IsLoggedIn:false});
		document.location.reload();
	}
	handleCreateAccount= async (event)=>{
		event.preventDefault();
		var LoginObject = {
			UserName:this.state.UserName,
			UserPassword:this.state.UserPassword
		}
		await axios.post(`https://localhost:44360/api/user/createaccount`, LoginObject)
			.then(res => {
				bake_cookie('CookieAuth', res.data.authCode);
				this.setState({IsLoggedIn:true});
			}).catch(err=>{
				if(err.response===undefined){
					this.setState({Status:"Cannot connect to server, try it later"});
				}
				else{
					this.setState({Status:"Username/Password is not valid or already in use"});
				}
			});
	}

	getUserNotes = async () =>{
		var AuthObject = {
            authCode: read_cookie('CookieAuth')
		}
       axios.post(`https://localhost:44360/api/user/notes`, AuthObject)
            .then(res => {
                this.setState({ UserNotes: res.data });
            }).catch(err => {
                console.log("App.js - cannot get notes   ---- " + err);
			});
	}


	render() {
		let cookie = read_cookie('CookieAuth');
		if(this.state.IsLoggedIn === true || cookie.length !== 0){
			return(
				<UserNotes getUserNotes={this.getUserNotes} handleLogOut={this.handleLogOut} userNotes={this.state.UserNotes} />
			);
		}
		else if(this.state.IsLoggedIn===false){
			return (
				<div style={{textAlign:"center", paddingTop:"10%"}}>
					<h3 style={{color:"darkred"}}>{this.state.Status}</h3>
					<form onSubmit={this.handleLogin}>
						<label className="customLabel">
							UserName:<br/>
						  <input type="text" value={this.state.UserName} onChange={this.handleUserName} className="customInput" />
						</label>
						<br/>
						<label className="customLabel">
							UserPassword:<br/>
						  <input type="text" value={this.state.UserPassword} onChange={this.handleUserPassword} className="customInput"/>
						</label>
						<br/>
						<input type="submit" value="Login" className="customButton" />
					</form>
					<form onSubmit={this.handleCreateAccount}>
						<input type="submit" value="CreateAccountWithFollowingInformation" className="customButton"/>
					</form>
				</div>
	
			);
		}
	}
}

export default App;