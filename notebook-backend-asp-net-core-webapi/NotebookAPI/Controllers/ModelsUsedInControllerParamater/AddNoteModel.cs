using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotebookAPI.Controllers.ModelsUsedInControllerParamater
{
    public class AddNoteModel
    {
        public string authCode { get; set; }
        public string Note { get; set; }
    }
}
