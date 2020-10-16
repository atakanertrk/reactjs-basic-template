# Asp.net core web api signalR implementation - Client: ReactJS - realtime chat demo
* https://www.youtube.com/watch?v=AOPq7ewHOqs&feature=youtu.be&ab_channel=AtakanErt%C3%BCrk
![signalr](https://github.com/atakanertrk/reactjs-basic-template/blob/master/images/signalr.png)

# Notebook Website

* Client Side: ReactJS, Axios
* Server Side: Asp.net Core Web Api, Dapper 
* Database: SQLite, SHA256 Hashed String generated for user authentication in server side SHA256(username+password) = authentication code
* Hashed authentication code stored in Client Cookie and used in Http requests

* calling a POST request repeatedly have side effects of creating the same resource multiple times. So we have used PUT for Adding Note
> HttpPost(Login,GetNotes) - HttpPut(AddNote,CreateAccount) - HttpDelete(DeleteNote)

### https://www.youtube.com/watch?v=9sB8oT6AKow&feature=youtu.be&ab_channel=AtakanErt%C3%BCrk

## Login Page
![loginpage](https://github.com/atakanertrk/reactjs-basic-template/blob/master/images/loginPage.png)
## Cookie / Authentication
![authentication](https://github.com/atakanertrk/reactjs-basic-template/blob/master/images/authentication.png)
## Notes Page
![notesPage](https://github.com/atakanertrk/reactjs-basic-template/blob/master/images/notesPage.png)
## Web API
![webapi](https://github.com/atakanertrk/reactjs-basic-template/blob/master/images/webapi.png)
## Database
![database](https://github.com/atakanertrk/reactjs-basic-template/blob/master/images/database.png)
