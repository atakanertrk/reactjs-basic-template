import React from 'react'
import { Link } from 'react-router-dom'

function About({match}){
	return(
		<div>
			<h1>About Page {match.params.username} </h1>
		</div>
	);
}

export default About;