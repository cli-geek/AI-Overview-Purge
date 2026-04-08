# AI Overview Purger

Remove AI-generated overviews from Google Search results for a cleaner, distraction-free browsing experience.

---

## ✨ Features

* 🚫 Removes Google AI Overviews automatically
* ⚡ Runs in real-time as results load
* 🧠 Lightweight and efficient (minimal performance impact)
* 🔘 Simple toggle to enable or disable anytime
* 🔒 No data collection — everything runs locally

---

## 📦 Installation

### Chrome / Firefox (via Web Store)
This extension is currently pending review by Google and Mozilla. After review, you may install the extension at the store pages:

**Firefox** : https://addons.mozilla.org/en-US/firefox/addon/google-ai-overview-purger/

**Chrome** : Pending approval

### 🔵 Chrome (Manual / Dev)

1. Clone this repository:

   ```bash
   git clone https://github.com/cli-geek/AI-Overview-Purge.git
   ```
2. Open `chrome://extensions/`
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the project folder

---

### 🟣 Firefox (Manual)

1. Go to `about:addons`
2. Click ⚙️ → **Install Add-on From File**
3. Select the packaged `.zip`

---

## 🧪 How It Works

This extension removes AI overview elements from Google Search pages by:

* Injecting lightweight content scripts
* Observing DOM changes in real-time
* Removing targeted elements as they appear

All processing happens locally in your browser.

---

## 🔐 Privacy

This extension does **not**:

* Collect user data
* Track browsing activity
* Send any external requests

The only stored value is a local setting for enabling/disabling the extension.

---

## 🛠 Development

### Project Structure

```
.
├── manifest.json
├── content.js
├── background.js
├── popup.html
├── popup.js
├── browser-polyfill.js
├── icons/
```

---

### Cross-Browser Support

This project supports both:

* Chrome (Manifest V3 - service worker)
* Firefox (background scripts)

Separate branches are used for compatibility:

* `main` → Chrome
* `firefox` → Firefox

---

## 🚀 Roadmap

* Improve selector resilience against Google UI changes
* Add per-site or per-feature toggles
* Optimize performance further
* Enhance UI/UX

---

## 📄 License

This project is licensed under the Mozilla Public License 2.0.

---

## 🙌 Acknowledgements

Based on and inspired by earlier work in removing AI-generated content from search results.

---

## ⭐ Support

If you find this useful, consider starring the repo!