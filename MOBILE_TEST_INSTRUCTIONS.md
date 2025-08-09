# 📱 Mobile Testing Instructions

## 🌐 Access Your Flashcard App on Phone

### Your Server Details
- **Mac IP Address**: `192.168.1.239`
- **Port**: `8000`
- **Server Status**: ✅ Running on all network interfaces

### 📲 How to Access on Your Phone

#### Option 1: Direct URL
Open your phone's web browser and go to:
```
http://192.168.1.239:8000/index.html
```

#### Option 2: QR Code
*Note: You can use any QR code generator to create a QR code for the URL above*

### 🔧 Test Scenarios

#### Basic Functionality Test
1. **Landing Page**: Enter `LearnChinesewithHelen11295`
2. **Slide to Unlock**: Use slide gesture or press Enter
3. **Study Mode**: 
   - Tap cards to flip (Chinese/Pinyin ↔ English/Thai)
   - Test speech synthesis (should auto-pronounce)

#### Swipe Gesture Testing
1. **Swipe Right**: Card should be saved (heart icon fills)
2. **Swipe Left**: Card should be marked difficult (question mark fills)
3. **Tap Icons**: Test grid, heart, and question mark navigation

#### Multi-Round State Persistence Test
1. **Round 1**: 
   - Swipe card #12 LEFT (mark as difficult)
   - Swipe card #13 RIGHT (save)
   - Swipe card #14 RIGHT (save)
   - Go through all 114 cards
2. **Complete & Restart**: Click "Click to Restart"
3. **Round 2**:
   - Swipe card #12 RIGHT (should move from difficult to saved)
   - Swipe card #13 RIGHT again (should stay in saved)
   - Swipe card #14 LEFT (should move from saved to difficult)
4. **Verify**: Check that card states updated correctly

#### Collection Views Test
1. **Grid Icon**: Should show all 114 cards in 2-column layout
2. **Heart Icon**: Should show only saved cards
3. **Question Mark Icon**: Should show only difficult cards
4. **Navigation**: Tap any card to jump directly to it

### 📱 Mobile-Specific Features to Test
- ✅ Touch-friendly button sizes (44px minimum)
- ✅ Responsive card sizing
- ✅ Smooth gesture recognition
- ✅ Swipe threshold optimization
- ✅ Portrait/landscape orientation
- ✅ iOS Safari and Android Chrome compatibility

### 🎯 Expected Results
- **Smooth Animations**: Card flips and transitions should be fluid
- **Gesture Recognition**: Swipes should be accurately detected
- **State Persistence**: Card lists should maintain across restart
- **Audio**: Text-to-speech should work (may need user interaction first)
- **Visual Design**: Glassmorphism effects and gradients should render correctly

### 🔊 Audio Testing Notes
- **First Interaction**: iOS requires user interaction before audio can play
- **Languages**: Should auto-detect and pronounce Chinese, Thai, and English
- **Auto-Play**: Cards should auto-pronounce when changing

### 🚨 Troubleshooting
If you can't access the app:
1. **Same WiFi**: Ensure phone and Mac are on the same WiFi network
2. **Firewall**: Mac firewall might be blocking connections
3. **Alternative IP**: Try `http://192.168.1.239:8000` (without index.html)
4. **Browser**: Try different browsers (Safari, Chrome, Firefox)

### 🎉 Success Criteria
✅ App loads and displays correctly on mobile
✅ All swipe gestures work smoothly
✅ Card states persist across rounds as specified
✅ Navigation between screens works
✅ Speech synthesis functions
✅ Responsive design looks good on phone screen

---
*Ready for deployment to pinyinflash.com when testing is complete!*
