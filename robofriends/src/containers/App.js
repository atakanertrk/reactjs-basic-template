import React, { Component } from 'react'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import './App.css'
import Scroll from '../components/Scroll'
import UserName from '../components/UserName'
import UserPassword from '../components/UserPassword'
import Test from './Test'

class App extends Component {
	constructor(props) {
		//console.log("constructor");
		super(props)
		//for searchbox
		this.state = {
			robots:[],
			searchfield: '',
			error: null,
		    isLoaded: false,
		    items: [],
		    users:[],
		    username:'',
			password:'',
			notes:[],
			userId:[],
			userValid:false
			
		}
	}

	onSearchChange = (event) => {
		//console.log("onsearchchange");
		this.setState({searchfield:event.target.value});
	}

	onUsernameChange = (event) => {
		console.log(this.state.username);
		this.setState({username:event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({password:event.target.value});
	}
	onClickGetNotes = () => {
	/*	var name = this.state.username;
		var password = this.state.password;
		alert(`your name: ${name} , you password:${password} `);  */
		
		/*var result = this.state.notes.filter(notes =>{
		 return notes.userName.toLowerCase().includes(this.state.username.toLowerCase())
		});
		this.setState({youremial:result[0].email})*/
		if(this.state.users.length!==0){
			for(var i=0;i<this.state.users.length;i++){
				if(this.state.users[i].userName===this.state.username && this.state.users[i].userPassword===this.state.password){
					this.setState({username:this.state.users[i].userName,password:this.state.users[i].password});
					this.state.userValid=true;
					alert(`your name: ${this.state.username} your password: ${this.state.password}`);
				}
			}
		}
	}
	
	componentDidMount(){
		//console.log("component did mount");
		fetch('https://jsonplaceholder.typicode.com/users').then(response=>{
			return response.json();
		}).then(users=>{
			this.setState({robots:users});
		});

		var targeturl = 'http://demo5944413.mockable.io';
		fetch(targeturl).then(response=>{
			return response.json();
		}).then(data=>{
			this.setState({users:data});
		});
	}



	render(){
		const filiteredRobots = this.state.robots.filter(robot =>{
		 return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
		})
		if(this.state.robots.length===0){
			return <h1>LOADING</h1>
		}
		else{
			if(this.state.userValid===true){
				console.log("here");
				console.log(this.state.username);
				return (
				<div className='tc'>
					<h1>Robo Friends</h1>
					<Test uname={this.state.username}/>
					<div>
						<UserName nameChange={this.onUsernameChange}/>
						<UserPassword passwordChange={this.onPasswordChange}/>
						<button onClick={this.onClickGetNotes}>See Notes</button>
						
					</div>
					<SearchBox searchChange={this.onSearchChange}/>
					<Scroll>
						<CardList robots={filiteredRobots}/>
					</Scroll>
				</div>
				
			);
			}else{
				return (
				<div className='tc'>
					<h1>Robo Friends</h1>
					<p>waiting to user login</p>
					<div>
						<UserName nameChange={this.onUsernameChange}/>
						<UserPassword passwordChange={this.onPasswordChange}/>
						<button onClick={this.onClickGetNotes}>See Notes</button>
						
					</div>
					<SearchBox searchChange={this.onSearchChange}/>
					<Scroll>
						<CardList robots={filiteredRobots}/>
					</Scroll>
				</div>
				
			);
			}
			
		}
  } 
}

export default App;