using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotebookAPI.Controllers.ModelsUsedInControllerParamater
{
    public class LoginDataModel
    {
        // lowercase to match json format
        public string UserName { get; set; }
        public string UserPassword { get; set; }
    }
}
