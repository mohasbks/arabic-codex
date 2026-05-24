<div align="center">

# ✦ Arabic Codex ✦
### المخطوطة العربية

**An immersive digital museum chronicling 1,500 years of the Arabic language**
*من نقوش الصحراء · إلى عصر الذكاء الاصطناعي*

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-Visit%20Site-C5A059?style=for-the-badge&labelColor=16213e)](https://arabic-codex.vercel.app)
[![Repo](https://img.shields.io/badge/GitHub-mohasbks%2Farabic--codex-16213e?style=for-the-badge&logo=github)](https://github.com/mohasbks/arabic-codex)
[![License](https://img.shields.io/badge/License-MIT-7b241c?style=for-the-badge)](LICENSE)
[![Made with](https://img.shields.io/badge/Made%20with-HTML%20·%20CSS%20·%20JS-c5a059?style=for-the-badge)](#)

</div>

---

<table>
<tr>
<td width="50%">

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Birmingham_Quran_manuscript_full.jpg/800px-Birmingham_Quran_manuscript_full.jpg" width="100%" alt="Birmingham Quran Manuscript — one of the oldest in the world"/>

<sub>📜 مخطوطة قرآنية من برمنغام — من أقدم المخطوطات في العالم</sub>

</td>
<td width="50%">

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Alhambra_Patio_de_los_Leones.jpg/800px-Alhambra_Patio_de_los_Leones.jpg" width="100%" alt="Alhambra — Palace of Arabic Calligraphy"/>

<sub>🌹 الحمراء — فردوس الحروف العربية في الأندلس</sub>

</td>
</tr>
</table>

---

## ✦ عن المشروع | About

> **Arabic Codex** is not a website — it is a **living manuscript**. Built with pure HTML, CSS, and Vanilla JavaScript, it takes the visitor on an immersive journey through the complete history of the Arabic language; from the *Mu'allaqat* poetry of pre-Islamic Arabia, through the golden age of *Bayt al-Hikma* in Baghdad and the splendour of Andalusia, to the challenges of the digital age and AI.

> **Arabic Codex** ليس موقعاً عادياً — إنه **مخطوطة حية** مبنية بـ HTML وCSS وJavaScript فقط. تأخذ الزائر في رحلة غامرة عبر التاريخ الكامل للغة العربية؛ من قصائد المعلقات الجاهلية، مروراً بعصر بيت الحكمة في بغداد وروائع الأندلس، وصولاً إلى تحديات العصر الرقمي والذكاء الاصطناعي.

---

## 🏛️ المحطات | The Seven Eras

<table>
<tr><td>🏜️ <b>الجذور الأولى</b></td><td>الشعر الجاهلي · المعلقات السبع · لغة الفصحى قبل الإسلام</td></tr>
<tr><td>📜 <b>عصر التدوين</b></td><td>تفاعل حي: شاهد لحظة وُلدت فيها النقاط لحماية القرآن الكريم</td></tr>
<tr><td>🔭 <b>بيت الحكمة</b></td><td>بغداد عاصمة العلم · العربية لغة الطب والفلك والجبر والخوارزمية</td></tr>
<tr><td>🌹 <b>الأندلس</b></td><td>فردوس الحروف · الموشحات · الخط في قصور غرناطة وإشبيلية</td></tr>
<tr><td>🖨️ <b>النهضة</b></td><td>المطبعة العربية · الصحافة · شعراء النهضة وأحمد شوقي</td></tr>
<tr><td>🤖 <b>العصر الرقمي</b></td><td>تحديات اللغة العربية في عصر الخوارزميات والذكاء الاصطناعي</td></tr>
<tr><td>🖌️ <b>مختبر الخطاط</b></td><td>ارسم بحبر رقمي سائل · 4 ألوان أثرية · تحميل كصورة PNG</td></tr>
</table>

---

## 🎨 التصميم | Design System

<table>
<tr>
<td align="center">🪶</td><td><b>Arabic Heritage Fonts</b><br/>Aref Ruqaa · Amiri · Reem Kufi</td>
<td align="center">🔮</td><td><b>Premium Glassmorphism</b><br/>backdrop-filter blur + gold borders</td>
</tr>
<tr>
<td align="center">📜</td><td><b>Parchment Texture</b><br/>SVG noise + aged paper gradient</td>
<td align="center">🃏</td><td><b>Staggered Card Settle</b><br/>Micro-tilt animation on scroll reveal</td>
</tr>
<tr>
<td align="center">💧</td><td><b>Liquid Ink Engine</b><br/>Catmull-Rom splines + dual canvas bleed</td>
<td align="center">📱</td><td><b>Fully Responsive</b><br/>Mobile-first + fullscreen overlay menu</td>
</tr>
</table>

---

## 🖌️ The Ink Lab Engine

The calligraphy canvas uses a **Catmull-Rom spline** algorithm for perfectly smooth, gap-free strokes — like real ink flowing on paper:

```javascript
// 4-point rolling buffer → smooth bezier curves
const cp1x = p1.x + (p2.x - p0.x) / 6;
const cp2x = p2.x - (p3.x - p1.x) / 6;
ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);

// Dual canvas: sharp ink layer + blurred bleed layer beneath
bleedCtx.lineWidth = strokeWidth * 2.2;   // capillary ink spread
bleedCtx.filter   = 'blur(4px)';
bleedCtx.opacity  =  0.35;
```

Features: `4 antique ink colors` · `velocity-based stroke width` · `custom cursor` · `touch support` · `PNG export`

---

## ⚡ Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Canvas API](https://img.shields.io/badge/Canvas_API-16213e?style=flat-square)
![Google Fonts](https://img.shields.io/badge/Google_Fonts-4285F4?style=flat-square&logo=google&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000?style=flat-square&logo=vercel)

**Zero dependencies · No frameworks · No build step**

---

## 🚀 Run Locally

```bash
git clone https://github.com/mohasbks/arabic-codex.git
cd arabic-codex

# Open with VS Code Live Server, or:
python -m http.server 8080
# → http://localhost:8080
```

---

## 📁 Structure

```
arabic-codex/
├── index.html   ← Full page — 7 eras + Ink Lab
├── style.css    ← Design system, glassmorphism, animations
├── script.js    ← Canvas engine, scroll reveals, interactivity
└── README.md
```

---

<div align="center">

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Basmala_word.svg/1200px-Basmala_word.svg.png" width="400" alt="Bismillah Arabic Calligraphy"/>

<br/>

*صُنع بعشق اللغة العربية · Made with love for the Arabic language*

**© 2025 mohasbks · MIT License**

</div>
