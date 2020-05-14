import React from 'react';
import axios from 'axios';
import Notes from './Notes';
import Scroll from './Scroll';
import './UserNotesPage.css'

class UserNotesPage extends React.Component {

 constructor(props){
    super(props);
    this.state={
      username:'',
      userpassword:'',
      usernotes:[],
      note:'',
      day:'',
      month:'',
      year:'',
      fulldate:'',
      selectednote:''
    }
  }

noteOnChange = (event) =>{
  console.log(event.target.value);
  this.setState({note:event.target.value});
}
dayOnChange = (event) =>{
  console.log(event.target.value);
  this.setState({day:event.target.value});
}
monthOnChange = (event) =>{
  console.log(event.target.value);
  this.setState({month:event.target.value});
}
yearOnChange = (event) =>{
  console.log(event.target.value);
  this.setState({year:event.target.value});
}
addNoteOnClick = async () =>{
  this.state.fulldate = `${this.state.day}.${this.state.month}.${this.state.year}`;
  const noteObject ={
    UserName:this.state.username,
    UserNote:this.state.note,
    NoteDate:this.state.fulldate
   };
  const userObject = {
    UserName:this.state.username,
    userpassword:this.state.userpassword
  }

  await axios.put(`https://localhost:44308/api/addnote`, noteObject )
  .then(res => {
  });

  await axios.post(`https://localhost:44308/api/getnotes`, userObject )
  .then(res => {
    this.state.usernotes = res.data;
  }); 
  this.props.refreshCallBack(this.state.usernotes);
}

deleteNoteOnClick = async () =>{
   const deleteObject = {
    UserName:this.state.username,
    UserNote:this.state.selectednote
   }
   const userObject = {
     UserName:this.state.username,
     userpassword:this.state.userpassword
   }
   await axios.put(`https://localhost:44308/api/deletenote`, deleteObject )
  .then(res => {
  });
  
  await axios.post(`https://localhost:44308/api/getnotes`, userObject )
  .then(res => {
    this.state.usernotes = res.data;
  }); 
  this.props.refreshCallBack(this.state.usernotes);
}

selectedNoteCallBack = (selectedNote) =>{
  this.state.selectednote = selectedNote;
}

_handleKeyDown = (event) =>{
  if(event.key==='Enter'){
    this.addNoteOnClick();
  }
}

render(){
  this.state.username = this.props.username;
  this.state.usernotes=this.props.usernotes;
  this.state.userpassword = this.props.userpassword;
  const listnotes = this.state.usernotes.map((notes) =>
    <div>
      <Notes selectedNoteCallBack={this.selectedNoteCallBack} note={notes}/>
    </div>
  );
  return(
    <div>
      <Scroll>
        {listnotes}
      </Scroll>
      <div>
        <input onChange={this.noteOnChange} onKeyDown={this._handleKeyDown} className="noteInput" maxLength="200" type="text" placeholder="write your note here..."/>
        <input onChange={this.dayOnChange} onKeyDown={this._handleKeyDown} className="inputDate" maxLength="2" type="text" placeholder="dd"/>
        :<input onChange={this.monthOnChange} onKeyDown={this._handleKeyDown} className="inputDate" maxLength="2" type="text" placeholder="mm"/>
        :<input onChange={this.yearOnChange} onKeyDown={this._handleKeyDown} className="inputDateLong" maxLength="4" type="text" placeholder="yyyy"/>
        <input onClick={this.addNoteOnClick} className="buttonEnter" type="submit" value="Enter"/><br/>
        <div><span className="deleteText">click to note you want to</span><input onClick={this.deleteNoteOnClick} className="deleteBtn" type="submit" value="Delete"/></div>
      </div>
    </div>
  );
}
  

}

export default UserNotesPage;