using UnityEngine;
using UnityEngine.UI;
using TMPro;
using System;

namespace PokerGame.Network
{
    public class ServerListItem : MonoBehaviour
    {
        [Header("UI References")]
        public TextMeshProUGUI serverNameText;
        public TextMeshProUGUI playerCountText;
        public TextMeshProUGUI gameStateText;
        public Button joinButton;
        
        private ServerResponse serverData;
        private Action<ServerResponse> onJoinCallback;
        
        public void Setup(ServerResponse server, Action<ServerResponse> onJoin)
        {
            serverData = server;
            onJoinCallback = onJoin;
            
            UpdateDisplay();
            
            if (joinButton != null)
                joinButton.onClick.AddListener(OnJoinClicked);
        }
        
        void UpdateDisplay()
        {
            if (serverNameText != null)
                serverNameText.text = serverData.serverName;
                
            if (playerCountText != null)
                playerCountText.text = $"{serverData.playerCount}/{serverData.maxPlayers}";
                
            if (gameStateText != null)
                gameStateText.text = serverData.gameState;
                
            // Disable join button if server is full
            if (joinButton != null)
                joinButton.interactable = serverData.playerCount < serverData.maxPlayers;
        }
        
        void OnJoinClicked()
        {
            onJoinCallback?.Invoke(serverData);
        }
    }
}