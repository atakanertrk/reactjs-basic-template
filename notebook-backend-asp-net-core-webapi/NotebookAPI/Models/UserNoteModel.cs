using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotebookAPI.Models
{
    public class UserNoteModel
    {
        public int NoteId { get; set; }
        public int UserId { get; set; }
        public string Note { get; set; }
    }
}
