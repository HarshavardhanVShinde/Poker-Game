using Mirror;
using Mirror.Discovery;
using UnityEngine;
using UnityEngine.UI;
using System.Collections.Generic;

namespace PokerGame.Network
{
    public class PokerNetworkDiscovery : NetworkDiscoveryBase<ServerRequest, ServerResponse>
    {
        [Header("Discovery UI")]
        public GameObject serverListPanel;
        public Transform serverListContent;
        public GameObject serverItemPrefab;
        public Button refreshButton;
        
        private Dictionary<long, ServerResponse> discoveredServers = new Dictionary<long, ServerResponse>();
        
        void Start()
        {
            if (refreshButton != null)
                refreshButton.onClick.AddListener(StartDiscovery);
        }
        
        #region Server
        
        /// <summary>
        /// Process the request from a client
        /// </summary>
        /// <param name="request">Request coming from client</param>
        /// <param name="endpoint">Address of the client that sent the request</param>
        /// <returns>A message containing information about this server</returns>
        protected override ServerResponse ProcessRequest(ServerRequest request, System.Net.IPEndPoint endpoint)
        {
            try
            {
                // Get game info
                PokerGameManager gameManager = FindObjectOfType<PokerGameManager>();
                int playerCount = 0;
                int maxPlayers = 6;
                
                if (gameManager != null)
                {
                    playerCount = gameManager.GetComponent<PokerGameManager>().players.Count;
                    maxPlayers = gameManager.maxPlayers;
                }
                
                return new ServerResponse
                {
                    serverId = ServerId,
                    serverName = $"Poker Game ({playerCount}/{maxPlayers})",
                    playerCount = playerCount,
                    maxPlayers = maxPlayers,
                    gameState = gameManager?.currentState.ToString() ?? "Waiting"
                };
            }
            catch (System.Exception)
            {
                return new ServerResponse
                {
                    serverId = ServerId,
                    serverName = "Poker Game",
                    playerCount = 0,
                    maxPlayers = 6,
                    gameState = "Waiting"
                };
            }
        }
        
        #endregion
        
        #region Client
        
        /// <summary>
        /// Create a message that will be broadcasted on the network to discover servers
        /// </summary>
        /// <returns>An instance of ServerRequest with data to be broadcasted</returns>
        protected override ServerRequest GetRequest()
        {
            return new ServerRequest();
        }
        
        /// <summary>
        /// Process the answer from a server
        /// </summary>
        /// <param name="response">Response that came from the server</param>
        /// <param name="endpoint">Address of the server that replied</param>
        protected override void ProcessResponse(ServerResponse response, System.Net.IPEndPoint endpoint)
        {
            // Add or update server in our list
            discoveredServers[response.serverId] = response;
            
            // Update UI
            UpdateServerList();
        }
        
        public void StartDiscovery()
        {
            discoveredServers.Clear();
            UpdateServerList();
            StartDiscovery();
            
            // Stop discovery after 5 seconds
            Invoke(nameof(StopDiscovery), 5f);
        }
        
        void UpdateServerList()
        {
            if (serverListContent == null || serverItemPrefab == null) return;
            
            // Clear existing items
            foreach (Transform child in serverListContent)
            {
                Destroy(child.gameObject);
            }
            
            // Create items for discovered servers
            foreach (var server in discoveredServers.Values)
            {
                CreateServerListItem(server);
            }
        }
        
        void CreateServerListItem(ServerResponse server)
        {
            GameObject item = Instantiate(serverItemPrefab, serverListContent);
            ServerListItem listItem = item.GetComponent<ServerListItem>();
            
            if (listItem != null)
            {
                listItem.Setup(server, OnServerSelected);
            }
        }
        
        void OnServerSelected(ServerResponse server)
        {
            // Connect to selected server
            PokerNetworkManager networkManager = FindObjectOfType<PokerNetworkManager>();
            if (networkManager != null)
            {
                // Find the endpoint for this server
                foreach (var kvp in discoveredServers)
                {
                    if (kvp.Value.serverId == server.serverId)
                    {
                        networkManager.networkAddress = server.serverName; // This should be the IP
                        networkManager.StartClient();
                        break;
                    }
                }
            }
            
            // Hide server list
            if (serverListPanel != null)
                serverListPanel.SetActive(false);
        }
        
        public void ShowServerList()
        {
            if (serverListPanel != null)
                serverListPanel.SetActive(true);
                
            StartDiscovery();
        }
        
        public void HideServerList()
        {
            if (serverListPanel != null)
                serverListPanel.SetActive(false);
                
            StopDiscovery();
        }
        
        #endregion
    }
    
    [System.Serializable]
    public class ServerRequest : NetworkMessage
    {
        // Add any data you want to send to servers here
    }
    
    [System.Serializable]
    public class ServerResponse : NetworkMessage
    {
        public long serverId;
        public string serverName;
        public int playerCount;
        public int maxPlayers;
        public string gameState;
    }
}