using Mirror;
using UnityEngine;
using UnityEngine.UI;
using System.Collections.Generic;

namespace PokerGame.Network
{
    public class PokerNetworkManager : NetworkManager
    {
        [Header("Poker Game Settings")]
        public int maxPlayers = 6;
        public GameObject playerPrefab;
        public GameObject gameTablePrefab;
        
        [Header("UI References")]
        public GameObject hostButton;
        public GameObject joinButton;
        public InputField ipAddressInput;
        public Text connectionStatusText;
        public GameObject lobbyUI;
        public GameObject gameUI;
        
        private PokerGameManager gameManager;
        
        public override void Start()
        {
            base.Start();
            SetupUI();
        }
        
        void SetupUI()
        {
            if (hostButton != null)
                hostButton.GetComponent<Button>().onClick.AddListener(StartHostGame);
                
            if (joinButton != null)
                joinButton.GetComponent<Button>().onClick.AddListener(StartClientGame);
        }
        
        public void StartHostGame()
        {
            // Enable Wi-Fi hotspot message
            connectionStatusText.text = "Starting host... Enable Wi-Fi Hotspot on this device";
            StartHost();
        }
        
        public void StartClientGame()
        {
            if (ipAddressInput != null && !string.IsNullOrEmpty(ipAddressInput.text))
            {
                networkAddress = ipAddressInput.text;
            }
            else
            {
                networkAddress = "192.168.43.1"; // Default hotspot IP
            }
            
            connectionStatusText.text = $"Connecting to {networkAddress}...";
            StartClient();
        }
        
        public override void OnStartHost()
        {
            base.OnStartHost();
            connectionStatusText.text = "Host started! Share your IP: " + GetLocalIPAddress();
            ShowLobby();
        }
        
        public override void OnStartClient()
        {
            base.OnStartClient();
            connectionStatusText.text = "Connecting...";
        }
        
        public override void OnClientConnect()
        {
            base.OnClientConnect();
            connectionStatusText.text = "Connected to host!";
            ShowLobby();
        }
        
        public override void OnClientDisconnect()
        {
            base.OnClientDisconnect();
            connectionStatusText.text = "Disconnected from host";
            ShowMainMenu();
        }
        
        public override void OnServerAddPlayer(NetworkConnectionToClient conn)
        {
            if (numPlayers >= maxPlayers)
            {
                conn.Disconnect();
                return;
            }
            
            GameObject player = Instantiate(playerPrefab);
            NetworkServer.AddPlayerForConnection(conn, player);
            
            // Initialize game manager if this is the first player
            if (gameManager == null && NetworkServer.active)
            {
                GameObject gameTable = Instantiate(gameTablePrefab);
                NetworkServer.Spawn(gameTable);
                gameManager = gameTable.GetComponent<PokerGameManager>();
            }
        }
        
        void ShowMainMenu()
        {
            if (lobbyUI != null) lobbyUI.SetActive(false);
            if (gameUI != null) gameUI.SetActive(false);
            if (hostButton != null) hostButton.SetActive(true);
            if (joinButton != null) joinButton.SetActive(true);
        }
        
        void ShowLobby()
        {
            if (lobbyUI != null) lobbyUI.SetActive(true);
            if (hostButton != null) hostButton.SetActive(false);
            if (joinButton != null) joinButton.SetActive(false);
        }
        
        public void ShowGame()
        {
            if (lobbyUI != null) lobbyUI.SetActive(false);
            if (gameUI != null) gameUI.SetActive(true);
        }
        
        string GetLocalIPAddress()
        {
            var host = System.Net.Dns.GetHostEntry(System.Net.Dns.GetHostName());
            foreach (var ip in host.AddressList)
            {
                if (ip.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
                {
                    return ip.ToString();
                }
            }
            return "127.0.0.1";
        }
    }
}