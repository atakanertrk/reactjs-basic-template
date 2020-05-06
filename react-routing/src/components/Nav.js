import React from 'react'
import { Link } from 'react-router-dom'

class Nav extends React.Component{

	constructor(props){
    super(props);
	this.state={
		username:'',
		password:''
    }}

    handleClickLogin=()=>{
    	this.props.callbackFromParent(this.state.username,this.state.password);
    	console.log("login tıklandı");
    }
    handleClickLogout=()=>{
    	this.props.callbackFromParent('','');
    	this.state.username='';
    	this.state.password='';
    	console.log("logout tıklandı");
    }
    handleUsernameChange=(event)=>{
    	this.setState({username: event.target.value});
    }
    handlePasswordChange=(event)=>{
    	this.setState({password: event.target.value});
    }

	render(){
		return(
		<nav>
		<Link to={`/`} className="navStyle">
			<h3>Home</h3>
		</Link>
			<ul className="nav-links">
				<Link to={`/about/${this.state.username}`} className="navStyle">
					<li>About</li>
				</Link>
				<Link to={`/shop/${this.state.username}`} className="navStyle">
					<li>Shop</li>
				</Link>	
			</ul>
			<div className="inputForm">
				<input className="inputForm-input" onChange={this.handleUsernameChange} type="text" placeholder="user name"/><br/>
				<input className="inputForm-input" onChange={this.handlePasswordChange} type="password" placeholder="user password"/><br/>
				<button type="button" onClick={this.handleClickLogin}>Login</button>
				<button type="button" onClick={this.handleClickLogout}>LoginOut</button>
			</div>
		</nav>
		);
	}
	
}

export default Nav;