// script.js — Arabic Language History Site
document.addEventListener("DOMContentLoaded", () => {

    // ── Hamburger / Mobile Menu ──────────────────────────────
    const hamburger   = document.getElementById('hamburger');
    const mobileMenu  = document.getElementById('mobile-menu');
    const mobileClose = document.getElementById('mobile-menu-close');
    document.querySelectorAll('.mobile-menu-links a').forEach(l => l.addEventListener('click', closeMenu));
    function openMenu()  { mobileMenu.classList.add('active'); hamburger.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function closeMenu() { mobileMenu.classList.remove('active'); hamburger.classList.remove('open'); document.body.style.overflow = ''; }
    if (hamburger)   hamburger.addEventListener('click', () => mobileMenu.classList.contains('active') ? closeMenu() : openMenu());
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);

    // ── Typing Effect (Hero) ──────────────────────────────────
    const titleEl   = document.getElementById('main-title');
    const toType    = "تاريخ لغة الضاد";
    let tIdx = 0;
    function typeWriter() {
        if (!titleEl) return;
        if (tIdx < toType.length) {
            titleEl.textContent += toType.charAt(tIdx++);
            setTimeout(typeWriter, Math.floor(Math.random() * 130) + 70);
        }
    }
    setTimeout(typeWriter, 800);

    // ── Ink Splash (Click) ────────────────────────────────────
    document.addEventListener('click', (e) => {
        if (e.target.closest('button, a, input, canvas, .canvas-paper')) return;
        const d = document.createElement('div');
        d.className = 'ink-splash';
        d.style.left = e.clientX + 'px'; d.style.top = e.clientY + 'px';
        document.body.appendChild(d);
        setTimeout(() => d.remove(), 1500);
    });

    // ── Navbar Scroll ─────────────────────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 50));

    // ── Smooth Scroll ─────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const t = document.querySelector(a.getAttribute('href'));
            if (t && a.getAttribute('href') !== '#') t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ── Dotting interaction ───────────────────────────────────
    const dotBtn = document.getElementById('toggle-dots');
    const dotTxt = document.getElementById('dotting-text');
    let dotted = false;
    if (dotBtn && dotTxt) {
        dotTxt.textContent = "ٮسم الله الرحمں الرحىم";
        dotBtn.addEventListener('click', () => {
            dotted = !dotted;
            dotTxt.textContent = dotted ? "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" : "ٮسم الله الرحمں الرحىم";
            dotTxt.style.color = dotted ? 'var(--accent-indigo)' : 'rgba(44,37,32,0.4)';
            dotBtn.textContent = dotted ? "إزالة النقاط" : "أضف النقاط والحركات";
        });
    }

    // ── AI Button ─────────────────────────────────────────────
    const aiBtn = document.getElementById('ai-translate-btn');
    const aiBox = document.getElementById('ai-result');
    if (aiBtn && aiBox) {
        aiBtn.addEventListener('click', () => {
            aiBox.style.display = 'block';
            void aiBox.offsetWidth;
            aiBox.classList.remove('hidden');
            aiBtn.textContent = "تم التحليل بنجاح ✓";
        });
    }

    // ── Staggered Card Reveal ─────────────────────────────────
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const p = entry.target.querySelector('.glass-panel');
                if (p && !p.classList.contains('revealed')) p.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll('.timeline-section').forEach(s => revealObserver.observe(s));

    // ══════════════════════════════════════════════════════════
    //  LIQUID INK CANVAS ENGINE — Smooth Bezier Spline
    // ══════════════════════════════════════════════════════════
    const canvas      = document.getElementById('ink-canvas');
    const bleedCanvas = document.getElementById('ink-canvas-bleed');
    if (!canvas || !bleedCanvas) return;

    const ctx      = canvas.getContext('2d');
    const bleedCtx = bleedCanvas.getContext('2d');
    const canvasPaper = document.getElementById('canvas-paper');
    const hint     = document.getElementById('canvas-hint');
    const hintRef  = document.getElementById('hint-ref');

    // ── State ──
    let isDrawing    = false;
    let isErasing    = false;
    let brushSize    = 3;       // base radius
    let inkR = 22, inkG = 33, inkB = 62;  // default indigo
    let lastX = 0, lastY = 0;
    let lastWidth    = brushSize;
    let lastVelocity = 0;
    let points       = [];      // rolling smoothing buffer

    // Custom cursor element
    const cursor = document.createElement('div');
    cursor.className = 'canvas-cursor';
    document.body.appendChild(cursor);

    function updateCursor(x, y, size) {
        cursor.style.left   = x + 'px';
        cursor.style.top    = y + 'px';
        cursor.style.width  = (size * 2 + 6) + 'px';
        cursor.style.height = (size * 2 + 6) + 'px';
        cursor.style.borderColor = `rgba(${inkR},${inkG},${inkB},0.5)`;
        cursor.style.opacity = '1';
    }
    function hideCursor() { cursor.style.opacity = '0'; }

    // ── Canvas setup (HiDPI) ──
    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        const dpr  = window.devicePixelRatio || 1;
        const W    = Math.round(rect.width  * dpr);
        const H    = Math.round(rect.height * dpr);

        // Save drawing
        const savedSharp = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const savedBleed = bleedCtx.getImageData(0, 0, bleedCanvas.width, bleedCanvas.height);

        canvas.width      = W; canvas.height      = H;
        bleedCanvas.width = W; bleedCanvas.height = H;

        ctx.scale(dpr, dpr); bleedCtx.scale(dpr, dpr);
        ctx.putImageData(savedSharp, 0, 0);
        bleedCtx.putImageData(savedBleed, 0, 0);
        applyCtxDefaults();
    }
    function applyCtxDefaults() {
        [ctx, bleedCtx].forEach(c => {
            c.lineCap  = 'round';
            c.lineJoin = 'round';
        });
    }

    // ── Get coordinates ──
    function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const src  = e.touches ? e.touches[0] : e;
        return {
            x: (src.clientX - rect.left),
            y: (src.clientY - rect.top)
        };
    }

    // ── Velocity-based width ──
    function calcWidth(dist) {
        const vel = Math.min(dist, 40);
        const target = brushSize * 2 * (1 - vel / 80);  // fast=thin, slow=thick
        lastWidth = lastWidth * 0.75 + Math.max(brushSize * 0.6, target) * 0.25;
        return Math.max(1, lastWidth);
    }

    // ── Draw a smooth segment between two points ──
    function drawSegment(c, x1, y1, x2, y2, w) {
        c.beginPath();
        c.lineWidth   = w;
        c.strokeStyle = `rgba(${inkR},${inkG},${inkB},0.88)`;
        c.shadowColor = `rgba(${inkR},${inkG},${inkB},0.3)`;
        c.shadowBlur  = w * 1.5;
        c.moveTo(x1, y1);
        c.lineTo(x2, y2);
        c.stroke();
        c.shadowBlur = 0;
    }

    // ── Smooth through points buffer with Catmull-Rom ──
    function drawSmooth() {
        if (points.length < 4) return;
        const [p0, p1, p2, p3] = points.slice(-4);
        const dist  = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        const w     = isErasing ? brushSize * 5 : calcWidth(dist);

        if (isErasing) {
            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(p2.x, p2.y, w, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0,0,0,0.6)';
            ctx.fill();
            ctx.restore();
            bleedCtx.save();
            bleedCtx.globalCompositeOperation = 'destination-out';
            bleedCtx.beginPath();
            bleedCtx.arc(p2.x, p2.y, w * 1.5, 0, Math.PI * 2);
            bleedCtx.fillStyle = 'rgba(0,0,0,0.6)';
            bleedCtx.fill();
            bleedCtx.restore();
            return;
        }

        // Catmull-Rom control points
        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        ctx.beginPath();
        ctx.lineWidth   = w;
        ctx.strokeStyle = `rgba(${inkR},${inkG},${inkB},0.90)`;
        ctx.shadowColor = `rgba(${inkR},${inkG},${inkB},0.2)`;
        ctx.shadowBlur  = w * 0.8;
        ctx.moveTo(p1.x, p1.y);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Bleed layer: same path, wider + softer
        bleedCtx.beginPath();
        bleedCtx.lineWidth   = w * 2.2;
        bleedCtx.strokeStyle = `rgba(${inkR},${inkG},${inkB},0.55)`;
        bleedCtx.moveTo(p1.x, p1.y);
        bleedCtx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
        bleedCtx.stroke();
    }

    // ── Events ──
    function onStart(e) {
        e.preventDefault();
        isDrawing = true;
        if (hint) hint.classList.add('hidden');
        const { x, y } = getPos(e);
        lastX = x; lastY = y; lastWidth = brushSize;
        points = [{ x, y }, { x, y }];  // seed for spline

        // Dot at start
        ctx.beginPath();
        ctx.arc(x, y, isErasing ? brushSize * 2 : brushSize, 0, Math.PI * 2);
        ctx.fillStyle = isErasing ? 'rgba(0,0,0,0)' : `rgba(${inkR},${inkG},${inkB},0.9)`;
        ctx.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
        updateCursor(e.clientX || (e.touches && e.touches[0].clientX), e.clientY || (e.touches && e.touches[0].clientY), brushSize);
    }

    function onMove(e) {
        e.preventDefault();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);

        // Update cursor even when not drawing
        if (clientX) updateCursor(clientX, clientY, brushSize);

        if (!isDrawing) return;
        const { x, y } = getPos(e);
        const dist = Math.hypot(x - lastX, y - lastY);
        if (dist < 1.5) return; // skip micro-movements

        points.push({ x, y });
        if (points.length > 6) points.shift(); // rolling window

        drawSmooth();
        lastX = x; lastY = y;
    }

    function onEnd(e) { isDrawing = false; points = []; }
    function onLeave(e) { isDrawing = false; hideCursor(); }

    // Show cursor when entering canvas paper
    canvasPaper.addEventListener('mouseenter', () => cursor.style.opacity = '1');
    canvasPaper.addEventListener('mouseleave', () => hideCursor());

    canvas.addEventListener('mousedown',  onStart);
    canvas.addEventListener('mousemove',  onMove);
    canvas.addEventListener('mouseup',    onEnd);
    canvas.addEventListener('mouseleave', onLeave);
    canvas.addEventListener('touchstart', onStart,  { passive: false });
    canvas.addEventListener('touchmove',  onMove,   { passive: false });
    canvas.addEventListener('touchend',   onEnd);

    // ── Tool buttons ──
    document.querySelectorAll('.tool-btn:not(.erase-btn)').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            brushSize = parseInt(btn.dataset.size) || 3;
            isErasing = false;
        });
    });
    const eraseBtn = document.getElementById('tool-erase');
    if (eraseBtn) eraseBtn.addEventListener('click', () => {
        document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
        eraseBtn.classList.add('active');
        isErasing = true;
    });

    // ── Ink color swatches ──
    document.querySelectorAll('.ink-color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.ink-color-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            isErasing = false;
            const hex = btn.dataset.color;
            inkR = parseInt(hex.substring(0,2), 16);
            inkG = parseInt(hex.substring(2,4), 16);
            inkB = parseInt(hex.substring(4,6), 16);
            cursor.style.borderColor = `rgba(${inkR},${inkG},${inkB},0.5)`;
        });
    });

    // ── Letter palette ──
    document.querySelectorAll('.letter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.letter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const ch = btn.dataset.letter;
            if (hintRef) {
                hintRef.style.transform = 'scale(1.3) rotate(-8deg)';
                hintRef.style.color = `rgba(${inkR},${inkG},${inkB},0.1)`;
                hintRef.textContent = ch;
                setTimeout(() => {
                    hintRef.style.transform = '';
                    hintRef.style.color = '';
                }, 500);
            }
            if (hint && hint.classList.contains('hidden')) {
                // show hint briefly again
                hint.classList.remove('hidden');
                setTimeout(() => hint.classList.add('hidden'), 800);
            }
        });
    });

    // ── Clear canvas ──
    const clearBtn = document.getElementById('clear-canvas');
    if (clearBtn) clearBtn.addEventListener('click', () => {
        const W = canvas.width / (window.devicePixelRatio || 1);
        const H = canvas.height / (window.devicePixelRatio || 1);
        ctx.clearRect(0, 0, W, H);
        bleedCtx.clearRect(0, 0, W, H);
        if (hint) { hint.style.opacity = '1'; hint.classList.remove('hidden'); }
    });

    // ── Download ──
    const dlBtn = document.getElementById('download-canvas');
    if (dlBtn) dlBtn.addEventListener('click', () => {
        const off = document.createElement('canvas');
        off.width = canvas.width; off.height = canvas.height;
        const oc = off.getContext('2d');
        oc.fillStyle = '#fdf9f2';
        oc.fillRect(0, 0, off.width, off.height);
        oc.filter = 'blur(4px)'; oc.globalAlpha = 0.35;
        oc.drawImage(bleedCanvas, 0, 0);
        oc.filter = 'none'; oc.globalAlpha = 1;
        oc.drawImage(canvas, 0, 0);
        const link = document.createElement('a');
        link.download = 'لوحة-الخطاط.png';
        link.href = off.toDataURL('image/png');
        link.click();
    });

    // ── Resize ──
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeCanvas, 300);
    });

    // Initial setup
    applyCtxDefaults();
});
