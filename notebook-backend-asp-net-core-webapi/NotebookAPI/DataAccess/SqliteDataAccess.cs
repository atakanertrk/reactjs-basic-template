using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Linq;
using System.Threading.Tasks;
using NotebookAPI.Models;
using Dapper;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace NotebookAPI.DataAccess
{
    public class SqliteDataAccess : ISqliteDataAccess
    {
        public UserModel InsertUser(string userName, string userPassword)
        {
            string authcode = GenerateHashCode(userName, userPassword);
            using (IDbConnection cnn = new SQLiteConnection(@"Data Source=.\NotesAndUsersDB.db"))
            {

                var p = new DynamicParameters();
                p.Add("@AuthCode", authcode);
                p.Add("@UserName", userName);

                string sql = $@"insert into UserAccounts(AuthCode,UserName) 
                                values(@AuthCode,@UserName); select * from UserAccounts where AuthCode=@AuthCode";

                var output = cnn.Query<UserModel>(sql, p).ToList().First();
                return output;
            }
        }

        // validate user auth code by name and password
        public UserModel UserValidation(string userName, string userPassword)
        {
            string authcode = GenerateHashCode(userName, userPassword);
            using (IDbConnection cnn = new SQLiteConnection(@"Data Source=.\NotesAndUsersDB.db"))
            {
                var p = new DynamicParameters();
                p.Add("@AuthCode", authcode);

                string sql = $@"select * from UserAccounts where AuthCode=@AuthCode";

                var output = cnn.Query<UserModel>(sql, p).ToList().First();

                return output;
            }
        }

        public UserModel GetUserDetailsByAuthCode(string authCode)
        {
            using (IDbConnection cnn = new SQLiteConnection(@"Data Source=.\NotesAndUsersDB.db"))
            {
                var p = new DynamicParameters();
                p.Add("@AuthCode", authCode);

                string sql = $@"select * from UserAccounts where AuthCode=@AuthCode";

                var output = cnn.Query<UserModel>(sql, p).ToList().First();

                return output;
            }
        }


        public List<UserNoteModel> GetUserNotes(string authCode)
        {
            var userDetails = GetUserDetailsByAuthCode(authCode);
            int userId = userDetails.UserId;
            using (IDbConnection cnn = new SQLiteConnection(@"Data Source=.\NotesAndUsersDB.db"))
            {
                var p = new DynamicParameters();
                p.Add("@UserId", userId);

                string sql = $@"select * from UserNotes where UserId=@UserId";

                var output = cnn.Query<UserNoteModel>(sql, p).ToList();

                return output;
            }
        }
        public bool DeleteUserNote(string authCode, int NoteId)
        {
            bool status = false;
            var userDetails = GetUserDetailsByAuthCode(authCode);
            int userId = userDetails.UserId;
            using (IDbConnection cnn = new SQLiteConnection(@"Data Source=.\NotesAndUsersDB.db"))
            {
                var p = new DynamicParameters();
                p.Add("@NoteId", NoteId);
                p.Add("@UserId", userId);

                string sql = $@"Delete from UserNotes where NoteId=@NoteId and UserId=@UserId";

                cnn.Execute(sql, p);
                status = true;
            }
            return status;
        }

        public bool AddNote(string authCode, string Note)
        {
            bool status = false;
            var userDetails = GetUserDetailsByAuthCode(authCode);
            int userId = userDetails.UserId;
            using (IDbConnection cnn = new SQLiteConnection(@"Data Source=.\NotesAndUsersDB.db"))
            {
                var p = new DynamicParameters();
                p.Add("@UserId", userId);
                p.Add("@Note", Note);

                string sql = $@"Insert into UserNotes(UserId,Note) Values(@UserId,@Note)";

                cnn.Execute(sql, p);
                status = true;
            }
            return status;
        }

        public string GenerateHashCode(string UserName, string UserPassword)
        {
            //return UserName + UserPassword;
            var crypt = new SHA256Managed();
            string hash = String.Empty;
            byte[] crypto = crypt.ComputeHash(Encoding.ASCII.GetBytes(UserName+UserPassword));
            foreach (byte theByte in crypto)
            {
                hash += theByte.ToString("x2");
            }
            return hash;
        }
    }
}