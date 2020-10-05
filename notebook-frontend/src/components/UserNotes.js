import React, { Component } from 'react'
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import axios from 'axios'
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import './UserNotes.css'

class UserNotes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Note: 'your note..'
        }
        this.handleAddNote = this.handleAddNote.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClearNoteInput = this.handleClearNoteInput.bind(this);
    }

    componentDidMount() {
        this.props.getUserNotes();
    }

    // PUT is used to send data to a server to create/update a resource. The difference between POST and PUT is 
    // that PUT requests are idempotent. ... In contrast, calling a POST request repeatedly have side effects 
    // of creating the same resource multiple times. We have used PUT because we will call this method repeatedly
    handleAddNote = async (event) => {
        event.preventDefault();
        var AddNoteObject = {
            AuthCode: read_cookie('CookieAuth'),
            Note: this.state.Note
        }
        await fetch(`https://localhost:44360/api/user/addnote`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(AddNoteObject)
        })
        .then((res) => console.log(res))
        .catch(error => console.error('Unable to ADD item.', error));

        this.props.getUserNotes();
    }
    handleNoteChange = (event) => {
        this.setState({ Note: event.target.value });
    }
    handleDelete = (noteId) => {
        return async event => {
            event.preventDefault()
            var DeleteNoteObject = {
                AuthCode: read_cookie('CookieAuth'),
                NoteId: noteId
            }
            await fetch(`https://localhost:44360/api/user/deletenote`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(DeleteNoteObject)
            })
            .then((res) => console.log(res))
            .catch(error => console.error('Unable to delete item.', error));

            this.props.getUserNotes();
        }
    }
    handleClearNoteInput = () => {
        document.getElementById("notearea").value = "";
        this.setState({ Note: '' });
    }

    render() {
        return (
            <div className="notesContainer">

                <form onSubmit={this.props.handleLogOut} className="logOutForm">
                    <input type="submit" value="LogOut" className="logOutButton" />
                </form>

                <div>
                    <label style={{ color: "white" }}>
                        <textarea className="textArea" id="notearea" cols="40" rows="5" onChange={this.handleNoteChange}>{this.state.Note}</textarea>
                    </label>
                    <br />
                    <button onClick={this.handleAddNote} className="buttonAdd">Add Note</button>
                    <button onClick={this.handleClearNoteInput} className="buttonAdd">Clear Field</button>
                </div>
                <hr />
                <h2 className="header">Notes</h2>
                <div className="scrollStyle">
                    {
                        this.props.userNotes.map((note) => {
                            return (
                                <div style={{ color: "black" }}>
                                    <p className="note">"{note.note}"</p>
                                    <form onSubmit={this.handleDelete(note.noteId)}>
                                        <input type="submit" value="Delete" className="buttonDelete" />
                                    </form>
                                    <hr />
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