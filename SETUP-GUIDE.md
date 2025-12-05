# 🛠️ कंप्लीट सेटअप गाइड - AstroQuiz 2026

**समय: 1-2 घंटे | बजट: ₹3K-7K | टेक्निकल लेवल: Beginner**

---

## 📋 स्टेप-बाय-स्टेप इंस्ट्रक्शन्स

### 🌐 STEP 1: होस्टिंग + डोमेन (₹1500-2500)

#### Option A: Hostinger (Recommended)
1. **Hostinger.in** पर जाओ
2. **Premium Shared Hosting** चुनो (₹149/महीना)
3. फ्री डोमेन सिलेक्ट करो: `astroquiz2026.in` (या similar)
4. पेमेंट करो (12 महीने = ₹1800)
5. cPanel एक्सेस मिलेगा

#### Option B: 000webhost (Free - टेस्टिंग के लिए)
1. **000webhost.com** पर signup करो
2. New website create करो
3. Subdomain मिलेगा: `yourname.000webhostapp.com`
4. File Manager यूज़ करो

---

### 📁 STEP 2: फाइल्स अपलोड

#### cPanel से:
1. cPanel login करो
2. **File Manager** ओपन करो
3. `public_html` फोल्डर में जाओ
4. सभी फाइल्स अपलोड करो:
```
public_html/
├── index.html
├── quizzes/
│   └── quiz.html
├── css/
│   ├── style.css
│   └── quiz.css
├── js/
│   ├── main.js
│   ├── quiz-engine.js
│   ├── quiz-handler.js
│   ├── result-generator.js
│   └── viral-hooks.js
├── api/
│   ├── generate-ai-result.php
│   ├── save-push-subscriber.php
│   └── send-push-notification.php
├── includes/
│   ├── adsterra-ads.html
│   └── onesignal-init.js
└── data/ (फोल्डर बनाओ - 755 permissions)
```

5. **Permissions सेट करो:**
   - `data/` फोल्डर: 755 (read/write)
   - `api/` files: 644

---

### 🔔 STEP 3: OneSignal सेटअप (Push Notifications)

1. **OneSignal.com** पर signup करो (फ्री)
2. **New App/Website** create करो
   - Name: `AstroQuiz 2026`
   - Platform: **Web Push**
3. **Web Configuration:**
   - Site URL: `https://astroquiz2026.in`
   - Auto Resubscribe: **ON**
   - Welcome Notification: **ON**
     - Title: `🎯 Welcome!`
     - Message: `डेली प्रेडिक्शन्स पाओ!`
4. **Keys कॉपी करो:**
   - App ID: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
   - REST API Key: `your-rest-api-key`

5. **फाइल में paste करो:**
```javascript
// includes/onesignal-init.js (line 4)
appId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
```

6. **Service Worker अपलोड:**
   - OneSignal dashboard से `OneSignalSDKWorker.js` डाउनलोड करो
   - `public_html/` रूट में अपलोड करो

---

### 💰 STEP 4: Adsterra सेटअप (Ads)

1. **Adsterra.com** पर signup करो
2. **Add Website:**
   - URL: `astroquiz2026.in`
   - Category: Entertainment / Lifestyle
   - Traffic: Other sources
3. **Approval wait** (24-48 hours)

4. **Ad Codes generate करो** (Approve होने के बाद):

#### A. Social Bar (Top)
```javascript
// Dashboard > Social Bar > Create
// Settings:
- Display: Top
- Frequency: Every page
// Copy Code
```

#### B. Native Ads (Content)
```javascript
// Dashboard > Native Ads > Create
// Settings:
- Size: 300x250
- Style: Match site design
// Copy Code
```

#### C. Popunder (Result Page)
```javascript
// Dashboard > Popunder > Create
// Settings:
- Trigger: On click
- Frequency: 1 per 24h
- Categories: Games, Lifestyle
// Copy Code
```

5. **Paste करो:**
```html
<!-- includes/adsterra-ads.html -->
<!-- Replace 'YOUR_ADSTERRA_XXXX_KEY' with actual keys -->
```

---

### 🤖 STEP 5: OpenAI API (Optional - AI Results)

#### Option A: OpenAI (Paid)
1. **Platform.openai.com** पर signup करो
2. Billing में $5-10 add करो
3. **API Keys** section में जाओ
4. **Create new secret key**
5. Key कॉपी करो: `sk-proj-xxxxx...`

```php
// api/generate-ai-result.php (line 8)
$openaiApiKey = 'sk-proj-your-key-here';
```

#### Option B: Fallback (Free)
- OpenAI key मत डालो
- Built-in templates यूज़ होंगे
- Predictions फिर भी काम करेंगे!

---

### 🎨 STEP 6: साइट कस्टमाइज़ करो

#### A. डोमेन अपडेट
```javascript
// js/viral-hooks.js (lines 6, 22, 58)
// Find:
window.location.origin
// Replace with:
https://astroquiz2026.in
```

#### B. लाइव काउंट चेंज
```javascript
// js/main.js (line 1)
let liveCount = 2847; // अपना स्टार्टिंग नंबर डालो
```

#### C. थीम कलर्स
```css
/* css/style.css (lines 11-17) */
:root {
    --primary: #8B5CF6;    /* बदलो */
    --secondary: #EC4899;  /* बदलो */
}
```

---

### 📊 STEP 7: Analytics सेट करो

1. **Google Analytics**
   - analytics.google.com पर जाओ
   - Property बनाओ
   - Tracking ID कॉपी करो: `G-XXXXXXXXXX`

2. **HTML में paste:**
```html
<!-- index.html और quiz.html के <head> में -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## ✅ टेस्टिंग चेकलिस्ट

### 1. बेसिक फंक्शनलिटी
- [ ] साइट लोड हो रही है?
- [ ] होम पेज दिख रहा है?
- [ ] क्विज़ cards clickable हैं?
- [ ] टाइमर काउंटडाउन चल रहा है?

### 2. क्विज़ Flow
- [ ] क्विज़ ओपन होता है?
- [ ] क्वेश्चन्स दिख रहे हैं?
- [ ] Options clickable हैं?
- [ ] Progress bar मूव हो रहा है?
- [ ] Loading screen दिखता है?
- [ ] Result दिखता है?

### 3. शेयरिंग
- [ ] WhatsApp बटन काम कर रहा है?
- [ ] Twitter बटन redirect करता है?
- [ ] Download बटन काम कर रहा है?

### 4. Push Notifications
- [ ] पॉपअप आता है?
- [ ] Subscribe बटन काम करता है?
- [ ] Dashboard में subscriber दिखता है?

### 5. Ads (Adsterra approve होने के बाद)
- [ ] Social bar टॉप पर है?
- [ ] Native ads दिख रहे हैं?
- [ ] Popunder ट्रिगर हो रहा है?

---

## 🐛 कॉमन इशूज + फिक्सेस

### ❌ Issue: साइट 404 Error
```
✅ Fix:
- cPanel में जाओ
- Domains section में default document check करो
- index.html को default सेट करो
```

### ❌ Issue: CSS/JS लोड नहीं हो रहे
```
✅ Fix:
- File paths check करो (case-sensitive)
- Browser console errors देखो
- Hard refresh करो (Ctrl+Shift+R)
```

### ❌ Issue: Push popup नहीं आ रहा
```
✅ Fix:
- OneSignalSDKWorker.js रूट में है?
- HTTPS enabled है? (HTTP पर नहीं चलेगा)
- Browser notifications allow हैं?
```

### ❌ Issue: Ads नहीं दिख रहे
```
✅ Fix:
- Adsterra approval check करो
- Ad blocker disable करो
- Keys सही paste किए?
- 24h wait करो (review time)
```

### ❌ Issue: PHP Errors
```
✅ Fix:
- PHP version check करो (7.4+)
- File permissions (api/ = 644)
- Error log देखो (cPanel > Error Logs)
```

---

## 📱 मोबाइल टेस्टिंग

### Chrome DevTools से:
1. F12 press करो
2. Device toolbar टॉगल (Ctrl+Shift+M)
3. iPhone/Android सिलेक्ट करो
4. साइट टेस्ट करो

### Real Device पर:
1. अपने फोन से साइट ओपन करो
2. Speed check करो (<3s लोड)
3. टच interactions टेस्ट करो
4. शेयर बटन्स ट्राई करो

---

## 🚀 लाइव जाने से पहले

### Final Checklist:
- [ ] सभी API keys सही हैं
- [ ] डोमेन पूरी साइट में अपडेट है
- [ ] Privacy Policy पेज है (legal)
- [ ] Terms & Conditions पेज है
- [ ] Contact page/email है
- [ ] Social मीडिया लिंक्स हैं
- [ ] Google Analytics काम कर रहा है
- [ ] पूरी साइट मोबाइल पर टेस्ट की

### Speed Optimization:
- [ ] इमेजेस compress करो (TinyPNG)
- [ ] CSS/JS minify करो
- [ ] Caching enable करो (cPanel)
- [ ] CDN यूज़ करो (Cloudflare - फ्री)

---

## 🎯 First Day Plan

1. **सुबह:** साइट लाइव करो + टेस्ट करो
2. **दोपहर:** Social मीडिया पर शेयर करो
3. **शाम:** First 100 visitors ट्रैक करो
4. **रात:** Ads performance देखो

---

## 📞 हेल्प चाहिए?

### Resources:
- **Hostinger Support:** 24/7 chat
- **OneSignal Docs:** documentation.onesignal.com
- **Adsterra FAQ:** adsterra.com/faq

### Debug Tools:
- **Browser Console:** F12 > Console
- **Network Tab:** API calls check करो
- **cPanel Error Logs:** errors देखो

---

## 🎉 Next Steps

लाइव होने के बाद:
1. ✅ Daily push भेजो (retention)
2. ✅ New quizzes ऐड करो (engagement)
3. ✅ UGC collect करो (social proof)
4. ✅ Influencers को reach करो
5. ✅ Paid ads ट्राई करो (scale faster)

---

**🚀 तुम्हारी साइट रेडी है! अब स्केल करो और earn करो! 💰**