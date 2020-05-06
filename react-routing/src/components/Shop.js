import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'

function Shop({match}){
	return(
		<div>
			<h1>Shop page {match.params.username}</h1>
		</div>
	);
}

export default Shop;