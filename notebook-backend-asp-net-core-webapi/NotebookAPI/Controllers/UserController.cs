using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NotebookAPI.Models;
using NotebookAPI.DataAccess;
using Microsoft.AspNetCore.Http;
using NotebookAPI.Controllers.ModelsUsedInControllerParamater;

namespace NotebookAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private SqliteDataAccess _dataAccess;

        public UserController()
        {
            _dataAccess = new SqliteDataAccess();
        }

        public string All()
        {
            return @" POST ( api/user/createaccount - api/user/login - api/user/notes ..... list goes on..)";
        }

        [HttpPost]
        public IActionResult CreateAccount([FromBody] LoginDataModel data)
        {
            var result = _dataAccess.InsertUser(data.UserName,data.UserPassword);
            return Created("createaccount",result);
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginDataModel data)
        {
            var result = _dataAccess.UserValidation(data.UserName,data.UserPassword); 
            return Ok(result);
        }

        [HttpPost]
        public IActionResult Notes([FromBody] AuthenticationValueModel data)
        {
            var result = _dataAccess.GetUserNotes(data.authCode);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult DeleteNote([FromBody] DeleteNoteModel data)
        {
            var result = _dataAccess.DeleteUserNote(data.authCode,data.NoteId);
            if (result)
            {
                // HTTP 204 No Content: The server successfully processed the request, but is not returning any content
                return StatusCode(204);
            }
            else
            {
                return StatusCode(400);
            }
        }
        [HttpPost]
        public IActionResult AddNote([FromBody] AddNoteModel data)
        {
            var result = _dataAccess.AddNote(data.authCode, data.Note);
            if (result)
            {
                // HTTP 204 No Content: The server successfully processed the request, but is not returning any content
                return StatusCode(204);
            }
            else
            {
                return StatusCode(400);
            }
        }
    }
}
