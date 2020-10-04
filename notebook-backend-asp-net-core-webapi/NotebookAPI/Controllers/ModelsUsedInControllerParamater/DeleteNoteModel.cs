using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotebookAPI.Controllers.ModelsUsedInControllerParamater
{
    public class DeleteNoteModel
    {
        public string authCode { get; set; }
        public int NoteId { get; set; }
    }
}
