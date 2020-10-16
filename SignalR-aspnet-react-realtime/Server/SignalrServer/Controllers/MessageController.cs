using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalrServerWebAPI.Hubs;
using SignalrServerWebAPI.Models;

namespace SignalrServerWebAPI.Controllers
{
    [ApiController]
    public class MessageController : Controller
    {
        protected readonly IHubContext<MessageHub> _messageHub;

        public MessageController([NotNull]IHubContext<MessageHub> messageHub) 
        {
            _messageHub = messageHub;
        }


        [Route("api/message/senddm")]
        [HttpPost]
        public async Task<IActionResult> SendDM([FromBody] RequestMessage message)
        {
            await _messageHub.Clients.Client(message.reciverUserId).SendAsync("getDM", $"{message.senderUserId} said : {message.Message}");
            return Ok();
        }


    }
}
