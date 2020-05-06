import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'

function MustLogin(){
  return(
    <div>
      <h1>You Must Login To Access This Page</h1>
    </div>
  );
}

export default MustLogin;