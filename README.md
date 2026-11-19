# QUADRA — QR Code Studio 🔳

A modern, minimal web-based QR code studio built with Vanilla HTML, CSS, and JavaScript. Create QR codes for links, text, Wi-Fi, and email, shape them in six distinct patterns, and export them as print-ready PNG or SVG, all inside your browser with no sign-up and no tracking.

## ✨ Features
- **Four Content Types:** Generate codes for URL, Text, Wi-Fi (WPA, WEP, or open networks), and Email (with an optional subject line).
- **Six QR Patterns:** Choose from **Square**, **Pixel**, **Lines**, **Columns**, **Rounded**, or **Dots**, each with a live icon preview. Lines and Columns merge neighboring modules into continuous bars for a bold, graphic look.
- **Custom Colors & Contrast Check:** Pick your own code and background colors or start from a preset (**Mono**, **Cobalt**, **Safety**, **Forest**). A warning appears when the contrast is too low to scan reliably.
- **Error Correction Levels:** Select **L (7%)**, **M (15%)**, **Q (25%)**, or **H (30%)** depending on how much damage tolerance you need.
- **Live QR Info:** See the QR version, module grid size, character count, and error correction level update as you type.
- **Print-Ready Export:** Download a `1024 px` PNG or a resolution-independent SVG, with the quiet zone already included.
- **Modern Industrial UI/UX:** A Swiss-poster inspired design with bold condensed typography, hard-edged panels, and a signal-yellow accent. Features an animated wave reveal when the code changes, a moving scan line, an interactive `<canvas>` background grid that follows your pointer or touch, automatic dark mode, a fully responsive layout, and support for `prefers-reduced-motion`.
- **Private by Design:** Every code is generated locally in your browser. Nothing you type is ever sent anywhere.
- **Minimal Dependencies:** Pure vanilla JavaScript with no frameworks or build tools, using only `qrcode-generator` for the underlying QR matrix calculations.

## 🎮 How to Use
1. Open the app and choose a content type: **URL**, **Text**, **Wi-Fi**, or **Email**.
2. Enter your content (for example, `example.com/welcome`). The QR code updates live as you type.
3. Pick a pattern under **02 Pattern** and set your colors manually or with a preset.
4. Choose an error correction level (**M** is a solid default, while **Q** or **H** is recommended for printed codes and stylized patterns).
5. Click **PNG** or **SVG** to download your code. Test it with a few phones before a large print run!

## 🛠️ Tech Stack
- **HTML5:** Semantic document structure, a custom inline SVG logo, and native `<details>` accordions for the FAQ.
- **CSS3:** Custom properties (variables), Flexbox, CSS Grid, light and dark themes via `prefers-color-scheme`, keyframe animations, and scroll-reveal transitions.
- **JavaScript (ES6+):** Pattern engine, HTML5 Canvas rendering for the preview and PNG export, SVG generator, interactive background grid, and UI state management.
- **Libraries & Fonts:** `qrcode-generator` 1.4.4 (MIT), paired with `Big Shoulders Display` and `IBM Plex Mono` typography.

## 📁 Project Structure
```text
quadra/
│
├── index.html      # Page structure, inline SVG logo, studio panels, specs, and FAQ
├── style.css       # Industrial yellow & concrete styling, light/dark theme, animations, and responsive design
├── script.js       # QR generation, pattern engine, canvas rendering, PNG/SVG export, and background grid
└── README.md       # Project documentation
```

## 📝 Good to Know
- **Static Codes Only:** The content is encoded directly in the pattern. Codes never expire, but they cannot be edited or tracked after printing.
- **Scan Margin on Stylized Patterns:** Keep strong contrast between foreground and background colors and test before printing. Light codes on dark backgrounds are not supported by every scanner.

## 📄 License
Released under the MIT License.  
QR Code is a registered trademark of DENSO WAVE INCORPORATED.
