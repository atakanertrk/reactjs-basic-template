using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalrServerWebAPI.Models
{
    public class RequestMessage
    {
        public string Message { get; set; }
        public string senderUserId { get; set; }
        public string reciverUserId { get; set; }
    }
}
