import React, { Component } from 'react'
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import axios from 'axios'
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import './UserNotes.css'

class UserNotes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Note:'your note..'
        }
        this.handleAddNote = this.handleAddNote.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClearNoteInput = this.handleClearNoteInput.bind(this);
    }

    componentDidMount(){
        this.props.getUserNotes();
    }

    handleAddNote= async (event)=>{
        event.preventDefault();
		var AddNoteObject = {
            AuthCode:read_cookie('CookieAuth'),
            Note:this.state.Note
		}
		await axios.post(`https://localhost:44360/api/user/addnote`, AddNoteObject)
			.then(res => {
                console.log("App.js - note added successfuly");
			}).catch(err=>{
				console.log("App.js - cannot add the note  ---- "+err);
            });
        //document.location.reload();
        this.props.getUserNotes();
    }
    handleNoteChange=(event)=>{
        this.setState({Note:event.target.value});
    }
    handleDelete = (noteId)=>{
        return async event => {
            event.preventDefault()
            var DeleteNoteObject = {
                AuthCode:read_cookie('CookieAuth'),
                NoteId:noteId
            }
            await axios.post(`https://localhost:44360/api/user/deletenote`, DeleteNoteObject)
                .then(res => {
                    console.log("App.js - note deleted successfuly");
                }).catch(err=>{
                    console.log("App.js - cannot deleted the note  ---- "+err);
                });
            //document.location.reload();
            this.props.getUserNotes();
          }
    }
    handleClearNoteInput=()=>{
        document.getElementById("notearea").value = "";
        this.setState({Note:''});
    }

    render() {
        return(
           <div className="notesContainer">

                <form onSubmit={this.props.handleLogOut} className="logOutForm">
					<input type="submit" value="LogOut" className="logOutButton"/>
				</form>

                <div>
						<label style={{color: "white"}}>
                         <textarea className="textArea" id="notearea" cols="40" rows="5"  onChange={this.handleNoteChange}>{this.state.Note}</textarea>
						</label>
                        <br/>
						<button onClick={this.handleAddNote} className="buttonAdd">Add Note</button>
                        <button onClick={this.handleClearNoteInput} className="buttonAdd">Clear Field</button>
				</div>
               <hr/>
               <h2 className="header">Notes</h2>
               <div className="scrollStyle">
               {
                  this.props.userNotes.map((note)=>{
                      return(
                          <div style={{color: "black"}}> 
                              <p className="note">"{note.note}"</p>
                              <form onSubmit={this.handleDelete(note.noteId)}>
						        <input type="submit" value="Delete" className="buttonDelete"/>
				              </form>
                              <hr/>
                          </div>
                      );
                  })
                   }
               </div>
           </div>
        );
    }
}

export default UserNotes;