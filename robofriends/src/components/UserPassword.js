import React from 'react'

const UserPassword = ({passwordChange}) => {
	return(
		<div>
		 <label>User Password</label>
		<input type="text" onChange={passwordChange}/>
		</div>
	);
};

export default UserPassword; 