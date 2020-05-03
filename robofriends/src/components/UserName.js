import React from 'react'

const UserName = ({nameChange}) => {
	return(
		<div>
		 <label>User Name</label>
		<input type="text" onChange={nameChange}/>
		</div>
	);
};

export default UserName; 