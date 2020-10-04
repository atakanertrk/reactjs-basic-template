using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotebookAPI.Models
{
    public class UserModel
    {
        public int UserId { get; set; }
        public string AuthCode { get; set; }
        public string UserName { get; set; }
    }
}
