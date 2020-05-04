import React from 'react'

const UserPassword = ({passwordChange}) => {
	return(
		<div>
		 <label>User Password</label>
		<input type="password" onChange={passwordChange}/>
		</div>
	);
};

export default UserPassword; 