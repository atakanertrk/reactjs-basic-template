using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SignalrServerWebAPI.Controllers;
using System.Net.Http;
using System.Net;
//using static SignalrServerWebAPI.Controllers.MessageController;
using System.Collections.Specialized;
using SignalrServerWebAPI.Models;
using DocumentFormat.OpenXml.Spreadsheet;

namespace SignalrServerWebAPI.Hubs
{
    // see the messagecontroller for other operations
    public class MessageHub : Hub
    {
        static List<string> groups = new List<string>();
        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "allusers");
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "allusers");
            await DisconnectFromAllGroups();
            await base.OnDisconnectedAsync(exception);
        }

        public Task CreateGroup(string groupName)
        {
            if (!groups.Contains(groupName))
            {
                groups.Add(groupName);
                return Clients.All.SendAsync("GetAllGroups", groups);
            }
            else
            {
                throw new InvalidOperationException();
            }
        }

        public Task JoinToGroup(string groupName)
        {
            return Groups.AddToGroupAsync(Context.ConnectionId,groupName);
        }
        public Task GetAllGroups()
        {
           return Clients.Caller.SendAsync("GetAllGroups", groups);
        }

        public Task SendMessageToGroup(SendMessageToGroupModel data)
        {
            return Clients.Group(data.GroupName).SendAsync("GetGroupMessages", $" {data.GroupName} ( {data.UserName} ) : {data.Message}" );
        }

        public async Task DisconnectFromAllGroups()
        {
            foreach (var group in groups)
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, group);
            }
        }

    }
}
