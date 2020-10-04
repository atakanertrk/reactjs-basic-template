using NotebookAPI.Models;
using System.Collections.Generic;

namespace NotebookAPI.DataAccess
{
    public interface ISqliteDataAccess
    {
        string GenerateHashCode(string UserName, string UserPassword);
        UserModel GetUserDetailsByAuthCode(string authCode);
        List<UserNoteModel> GetUserNotes(string authCode);
        UserModel InsertUser(string userName, string userPassword);
        UserModel UserValidation(string userName, string userPassword);
    }
}