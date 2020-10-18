using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalrServerWebAPI.Models
{
    public class SendMessageToGroupModel
    {
        public string Message { get; set; }
        public string GroupName { get; set; }
        public string UserName { get; set; }
    }
}
