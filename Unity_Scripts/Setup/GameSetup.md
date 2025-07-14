# 🎮 Unity Poker Game Setup Guide

## 📋 **Prerequisites**

1. **Unity 2021.3 LTS** or later
2. **Mirror Networking** package installed
3. **Android Build Support** module
4. **TextMeshPro** package (usually included)

---

## 🔧 **Step 1: Project Setup**

### Install Mirror Networking
1. Open **Package Manager** (Window → Package Manager)
2. Click **+** → **Add package from git URL**
3. Enter: `https://github.com/MirrorNetworking/Mirror.git`
4. Click **Add**

### Import TextMeshPro
1. Go to **Window → TextMeshPro → Import TMP Essential Resources**
2. Click **Import**

---

## 🏗️ **Step 2: Scene Structure**

### Create Main Scene Hierarchy:
```
PokerGameScene
├── NetworkManager (Empty GameObject)
├── Canvas (UI Canvas)
│   ├── MainMenu
│   │   ├── HostButton
│   │   ├── JoinButton
│   │   └── IPAddressInput
│   ├── GameUI
│   │   ├── PlayerSeats (6 seats)
│   │   ├── CommunityCards
│   │   ├── ActionButtons
│   │   └── GameInfo
│   └── Modals
│       ├── WinnerPanel
│       └── ServerListPanel
├── GameManager (Empty GameObject)
├── AudioManager (Empty GameObject)
└── NetworkDiscovery (Empty GameObject)
```

---

## 🎯 **Step 3: Component Assignment**

### NetworkManager GameObject:
- Add **PokerNetworkManager** script
- Set **Player Prefab** (create from PokerPlayer script)
- Configure **Transport** (use KCP Transport for mobile)

### GameManager GameObject:
- Add **PokerGameManager** script
- Add **CardDealer** script
- Reference UI elements

### Canvas Setup:
- Set **Canvas Scaler** to "Scale With Screen Size"
- Reference Resolution: **375 x 812**
- Screen Match Mode: **Match Width Or Height** (0.5)

---

## 🃏 **Step 4: Prefab Creation**

### Player Prefab:
1. Create empty GameObject named "PokerPlayer"
2. Add **NetworkIdentity** component
3. Add **PokerPlayer** script
4. Save as prefab in Resources folder

### Card Prefab:
1. Create UI Image GameObject
2. Add **CardUI** script
3. Setup card front/back images
4. Add Button component for interaction
5. Save as prefab

---

## 📱 **Step 5: Android Build Settings**

### Build Settings:
1. **File → Build Settings**
2. Select **Android** platform
3. Click **Switch Platform**

### Player Settings:
1. **Edit → Project Settings → Player**
2. Set **Company Name** and **Product Name**
3. **Android Settings:**
   - Minimum API Level: **21** (Android 5.0)
   - Target API Level: **30** or higher
   - Scripting Backend: **IL2CPP**
   - Target Architectures: **ARM64** ✓

### Permissions:
In **Player Settings → Android → Publishing Settings:**
- **Internet**: ✓ (Required for networking)
- **Access Network State**: ✓
- **Access WiFi State**: ✓

---

## 🔗 **Step 6: Network Configuration**

### KCP Transport Setup:
1. Add **KCP Transport** component to NetworkManager
2. Set **Port**: 7777
3. **Timeout**: 10000ms
4. **Max Connections**: 6

### Network Discovery:
1. Add **PokerNetworkDiscovery** script to NetworkDiscovery GameObject
2. Configure UI references for server list
3. Set **Broadcast Port**: 47777

---

## 🎨 **Step 7: UI Setup**

### Apply Design Colors:
```csharp
// Main theme color
Color primaryColor = new Color(0f, 0.9f, 0.765f, 1f); // #00E6C3

// Background colors
Color backgroundColor = new Color(0.961f, 0.961f, 0.961f, 1f); // #F5F5F5
Color surfaceColor = Color.white;

// Card colors
Color cardBackColor = new Color(0.722f, 0.902f, 1f, 1f); // #B8E6FF
```

### Button Styling:
- Use **rounded corners** (Image Type: Sliced)
- Apply **shadow effects** using duplicate images
- Set **transition animations** (Color Tint)

---

## 🎵 **Step 8: Audio Setup**

### AudioManager Configuration:
1. Add **Audio Source** components (2x - SFX and Music)
2. Import sound files to **Resources/Audio** folder
3. Assign clips to **AudioManager** script
4. Configure volume levels

---

## 📦 **Step 9: Build Process**

### Pre-Build Checklist:
- [ ] All scripts compile without errors
- [ ] Prefabs are properly configured
- [ ] Network settings are correct
- [ ] UI references are assigned
- [ ] Audio clips are imported

### Build Steps:
1. **File → Build Settings**
2. Click **Add Open Scenes**
3. Select **Android** platform
4. Click **Build** or **Build and Run**
5. Choose output folder
6. Wait for build completion

---

## 🧪 **Step 10: Testing**

### Local Testing:
1. Build APK and install on 2+ Android devices
2. One device: Enable **Wi-Fi Hotspot**
3. Other devices: Connect to the hotspot
4. Test host/join functionality

### Network Testing:
1. Host device: Click **Host Game**
2. Client devices: Enter host IP or use **Server Discovery**
3. Test game flow: dealing, betting, folding
4. Verify synchronization across all devices

---

## 🔧 **Troubleshooting**

### Common Issues:

**Connection Failed:**
- Check Wi-Fi hotspot is enabled
- Verify IP address is correct (usually 192.168.43.1)
- Ensure firewall isn't blocking Unity

**Cards Not Syncing:**
- Verify NetworkIdentity on all networked objects
- Check SyncVar usage in scripts
- Ensure proper ClientRpc calls

**UI Not Responsive:**
- Check Canvas Scaler settings
- Verify button raycast targets
- Test on different screen sizes

**Build Errors:**
- Update to latest Unity LTS
- Reimport Mirror package
- Check Android SDK/NDK versions

---

## 📚 **Additional Resources**

- **Mirror Documentation**: https://mirror-networking.gitbook.io/docs/
- **Unity Android Guide**: https://docs.unity3d.com/Manual/android.html
- **Mobile Optimization**: https://docs.unity3d.com/Manual/MobileOptimization.html

---

## ✅ **Final Checklist**

- [ ] Mirror Networking installed and configured
- [ ] All scripts added and references assigned
- [ ] Player and Card prefabs created
- [ ] UI properly scaled for mobile
- [ ] Android build settings configured
- [ ] Network discovery working
- [ ] Audio system implemented
- [ ] Game logic tested locally
- [ ] APK builds successfully
- [ ] Multi-device testing completed

**Your offline multiplayer poker game is now ready for deployment! 🎉**