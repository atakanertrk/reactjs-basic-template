using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RoundTheCode.ReactSignalR.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public string Welcome()
        {
            return "welcome to signalR server";
        }
    }
}
