import React from 'react';
import axios from 'axios';
import './Notes.css';

class Notes extends React.Component {

 constructor(props){
    super(props);
    this.state={
      selectedNote:''
    }
  }

onClickNote = async (event) =>{
  this.state.selectedNote = event.target.innerText;
  navigator.clipboard.writeText(this.state.selectedNote);
  alert("Note is copied and selected. You can delete the note with delte button");
  if(this.state.selectedNote!==''){
    this.props.selectedNoteCallBack(this.state.selectedNote);
  }
}

render(){
  return(
      <div className="noteDiv">
        <button onClick={this.onClickNote} className="note">
           {this.props.note[0]}
        </button><br/>
        <span className="notedate">date: {this.props.note[1]}</span><br/>
      </div>
  );
}
  

}

export default Notes;