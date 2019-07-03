using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message, double latitud, double longitud)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task DiHola()
        {
            await Clients.All.SendAsync("RecibeHola");
        }
    }
}