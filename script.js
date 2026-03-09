/* BIRTHDAY WEBSITE - MAIN APP FILE
   Modules loaded before this: config.js, media-manifest.js, utils.js, gallery.js, sections.js */

/* 1. ENTRANCE - DOORBELL */
const entrance = $('#entrance');
const surpriseScreen = $('#surprise-screen');
const mainContent = $('#main-content');

$('#doorbell-btn').addEventListener('click', () => {
    entrance.classList.add('bye-bye');
    setTimeout(() => {
        entrance.style.display = 'none';
        surpriseScreen.classList.remove('hidden');
        launchConfetti(120);
        setTimeout(() => {
            surpriseScreen.classList.add('fade-out');
            setTimeout(() => {
                surpriseScreen.style.display = 'none';
                mainContent.classList.remove('hidden');
                window.scrollTo(0, 0);
                initEverything();
            }, 1000);
        }, 2500);
    }, 800);
});

/* 2. INIT EVERYTHING */
function initEverything() {
    // Initialize Supabase first
    if (typeof initSupabase === 'function') {
        initSupabase();
    }
    
    setupHero();
    setupRoasts();
    setupSillyStats();
    setupScratchCards();
    setup8Ball();
    setupBirthdayQuiz = function(){}; // replaced by Eras
    setupEras();
    setupCake();
    setupGiftBox();
    setupSecretLetter();
    generateWishes();
    setupGuestbook();
    setupPhotoUpload();
    setupUploadedPhotosGallery();
    generatePolaroids();
    generateCarousel();
    generateMosaic();
    generateTimeline();
    setupLightbox();
    setupSpinWheel();
    setupBalloons();
    setupScrollReveal();
    setupConfettiBtn();
    // setupEmojiRain(); // Disabled - causes lag
    // setupCursorTrail(); // Disabled - causes lag
    // setupRandomPopups(); // Disabled - was annoying
    setupSillyEasterEggs();
    setupProgressBar();
    // setupGlitterClicks(); // Disabled - causes lag
    setupSectionEffects();
    // setupFloatingHearts(); // Disabled - causes lag
    setupTimeToasts();
    setupRainbowMode();
    setupSurpriseTransitions();
    // setTimeout(setupCardSparkles, 500); // Disabled - causes lag
    setTimeout(() => launchFireworks(3), 400);
    setTimeout(() => showTimeToast('🎉', 'Welcome!! You are about to have the BEST time!'), 1500);
}

/* 3. CONFETTI */
function launchConfetti(count) {
    count = count || 60;
    var canvas = $('#confetti-canvas');
    var shapes = ['🎊','🎉','✨','⭐','💖','🌟','🎈','🥳'];
    var colors = ['#ff6b9d','#ffd93d','#c084fc','#60a5fa','#6ee7b7','#ff8c42','#ff4757'];
    for (var i = 0; i < count; i++) {
        var piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.animationDuration = rand(2, 5) + 's';
        piece.style.animationDelay = Math.random() * 0.8 + 's';
        if (Math.random() > 0.5) {
            piece.textContent = pick(shapes);
            piece.style.fontSize = rand(14, 28) + 'px';
        } else {
            piece.style.width = rand(8, 14) + 'px';
            piece.style.height = rand(8, 16) + 'px';
            piece.style.background = pick(colors);
            piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        }
        canvas.appendChild(piece);
        setTimeout(function(p) { return function() { p.remove(); }; }(piece), 6000);
    }
}

/* 4. BALLOONS */
function setupBalloons() {
    var container = $('#footer-balloons');
    var colors = ['#ff6b9d','#ffd93d','#c084fc','#60a5fa','#6ee7b7','#ff8c42','#ff4757'];
    for (var i = 0; i < 12; i++) {
        var b = document.createElement('div');
        b.className = 'balloon';
        b.style.left = rand(5, 95) + '%';
        b.style.background = pick(colors);
        b.style.animationDuration = rand(8, 18) + 's';
        b.style.animationDelay = rand(0, 10) + 's';
        b.style.width = rand(28, 45) + 'px';
        b.style.height = rand(35, 55) + 'px';
        container.appendChild(b);
    }
}

/* 5. SCROLL REVEAL */
function setupScrollReveal() {
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    $$('.reveal, .timeline-entry, .wish-card').forEach(function(el) { observer.observe(el); });
}

/* 6. PARTY BUTTON */
function setupConfettiBtn() {
    $('#panic-btn').addEventListener('click', function() {
        launchConfetti(120);
        launchFireworks(4);
        shakeScreen();
        showPopup('🎉', 'PARTY MODE ACTIVATED!! 🥳🎊🎈');
        document.body.style.animation = 'wiggle 0.3s ease 3';
        setTimeout(function() { document.body.style.animation = ''; }, 1000);
    });
}

/* 7. EMOJI RAIN */
function setupEmojiRain() {
    var container = $('#emoji-rain');
    var emojis = ['🎂','🎈','🎁','🎉','⭐','💖','🧁','🎊','✨','🥳','🍰','🎵'];
    setInterval(function() {
        if (Math.random() > 0.6) return;
        var emoji = document.createElement('div');
        emoji.className = 'rain-emoji';
        emoji.textContent = pick(emojis);
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.animationDuration = rand(4, 9) + 's';
        emoji.style.fontSize = rand(14, 30) + 'px';
        container.appendChild(emoji);
        setTimeout(function() { emoji.remove(); }, 10000);
    }, 500);
}

/* 8. CURSOR TRAIL */
function setupCursorTrail() {
    var container = $('#cursor-trail');
    var trailEmojis = ['✨','⭐','💖','🌟','💫'];
    var lastTime = 0;
    document.addEventListener('mousemove', function(e) {
        var now = Date.now();
        if (now - lastTime < 80) return;
        lastTime = now;
        var trail = document.createElement('div');
        trail.className = 'trail-emoji';
        trail.textContent = pick(trailEmojis);
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        container.appendChild(trail);
        setTimeout(function() { trail.remove(); }, 1000);
    });
}

/* 9. RANDOM POPUP SURPRISES */
function setupRandomPopups() {
    var usedIndices = new Set();
    function schedulePopup() {
        var delay = rand(15000, 35000);
        setTimeout(function() {
            if (document.hidden) { schedulePopup(); return; }
            var idx;
            do { idx = rand(0, CONFIG.popupMessages.length - 1); } while (usedIndices.has(idx) && usedIndices.size < CONFIG.popupMessages.length);
            usedIndices.add(idx);
            if (usedIndices.size >= CONFIG.popupMessages.length) usedIndices.clear();
            var msg = CONFIG.popupMessages[idx];
            showPopup(msg.emoji, msg.text);
            schedulePopup();
        }, delay);
    }
    schedulePopup();
}

function showPopup(emoji, text) {
    var popup = document.createElement('div');
    popup.className = 'random-popup';
    popup.style.top = rand(15, 70) + '%';
    popup.style.left = rand(10, 60) + '%';
    popup.innerHTML = '<div class="popup-emoji">' + emoji + '</div><div class="popup-text">' + text + '</div>';
    popup.addEventListener('click', function() { popup.remove(); });
    $('#random-popups').appendChild(popup);
    setTimeout(function() {
        popup.style.transition = 'all 0.5s ease';
        popup.style.opacity = '0';
        popup.style.transform = 'scale(0.5) rotate(10deg)';
        setTimeout(function() { popup.remove(); }, 500);
    }, 5000);
}

/* 10. SILLY EASTER EGGS */
function setupSillyEasterEggs() {
    document.addEventListener('dblclick', function() { launchConfetti(25); });
    var konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    var ki = 0;
    document.addEventListener('keydown', function(e) {
        if (e.key === konami[ki]) { ki++; if (ki === konami.length) { ki = 0; megaSurprise(); } }
        else ki = 0;
    });
    var lastShake = 0;
    window.addEventListener('devicemotion', function(e) {
        var acc = e.accelerationIncludingGravity;
        if (!acc) return;
        if (Math.abs(acc.x) + Math.abs(acc.y) + Math.abs(acc.z) > 40 && Date.now() - lastShake > 2000) {
            lastShake = Date.now();
            launchConfetti(50);
        }
    });
    var typed = '';
    document.addEventListener('keydown', function(e) {
        typed += e.key.toLowerCase();
        if (typed.length > 10) typed = typed.slice(-10);
        if (typed.includes('party')) {
            typed = '';
            launchConfetti(80);
            showPopup('🕺', 'DID SOMEONE SAY PARTY?! 🎉🎉🎉');
        }
    });
}

/* 11. SPIN THE WHEEL */
function setupSpinWheel() {
    var canvas = document.getElementById('wheel-canvas');
    var ctx = canvas.getContext('2d');
    var btn = $('#spin-btn');
    var result = $('#spin-result');
    var dares = CONFIG.spinDares;
    var numSlices = dares.length;
    var sliceAngle = (2 * Math.PI) / numSlices;
    var colors = ['#ff6b9d','#ffd93d','#c084fc','#60a5fa','#6ee7b7','#ff8c42','#ff4757','#a78bfa'];
    var currentAngle = 0;
    var spinning = false;

    function drawWheel(angle) {
        ctx.clearRect(0, 0, 320, 320);
        var cx = 160, cy = 160, r = 150;
        for (var i = 0; i < numSlices; i++) {
            var startAngle = angle + i * sliceAngle;
            var endAngle = startAngle + sliceAngle;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, r, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = colors[i % colors.length];
            ctx.fill();
            ctx.strokeStyle = '#2d1b4e';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(startAngle + sliceAngle / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = 'white';
            ctx.font = 'bold 13px Fredoka, sans-serif';
            ctx.shadowColor = 'rgba(0,0,0,0.4)';
            ctx.shadowBlur = 2;
            var emoji = dares[i].substring(0, 2);
            ctx.fillText(emoji, r - 15, 5);
            ctx.restore();
        }
        ctx.beginPath();
        ctx.arc(cx, cy, 22, 0, 2 * Math.PI);
        ctx.fillStyle = '#2d1b4e';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx, cy, 18, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.font = 'bold 14px Fredoka';
        ctx.fillStyle = '#2d1b4e';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🎉', cx, cy);
    }

    drawWheel(0);

    btn.addEventListener('click', function() {
        if (spinning) return;
        spinning = true;
        btn.disabled = true;
        result.textContent = '';
        var extraRotations = rand(5, 10) * 2 * Math.PI;
        var randomOffset = Math.random() * 2 * Math.PI;
        var totalAngle = extraRotations + randomOffset;
        var startTime = null;
        var duration = 4000;

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            var elapsed = timestamp - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var angle = currentAngle + totalAngle * eased;
            drawWheel(angle);
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                currentAngle = (currentAngle + totalAngle) % (2 * Math.PI);
                spinning = false;
                btn.disabled = false;
                var normalized = ((2 * Math.PI) - (currentAngle % (2 * Math.PI))) % (2 * Math.PI);
                var sliceIndex = Math.floor(normalized / sliceAngle) % numSlices;
                result.textContent = '🎯 ' + dares[sliceIndex];
                launchConfetti(30);
                showPopup('🎡', dares[sliceIndex]);
            }
        }
        requestAnimationFrame(animate);
    });
}

/* 12. MEGA SURPRISE (Konami code) */
function megaSurprise() {
    launchConfetti(200);
    launchFireworks(6);
    shakeScreen();
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#ff6b9d,#c084fc,#60a5fa,#6ee7b7);background-size:400% 400%;animation:gradientShift 3s ease infinite;cursor:pointer;';
    overlay.innerHTML = '<div style="text-align:center;padding:40px;"><div style="font-size:8rem;animation:popperBounce 0.5s ease infinite alternate;">🥳</div><h1 style="font-family:Bubblegum Sans,cursive;font-size:clamp(2rem,8vw,5rem);color:white;text-shadow:4px 4px 0 rgba(0,0,0,0.2);">YOU FOUND THE SECRET!! 🏆</h1><p style="font-family:Caveat,cursive;font-size:2rem;color:rgba(255,255,255,0.9);margin-top:16px;">Happy Birthday ' + CONFIG.friendName + '!! 🎂🎉🎈</p><p style="font-family:Patrick Hand,cursive;font-size:1.2rem;color:rgba(255,255,255,0.6);margin-top:24px;">(click anywhere to close, you nerd 🤓)</p></div>';
    overlay.addEventListener('click', function() { overlay.remove(); });
    document.body.appendChild(overlay);
}

/* 13. SCROLL PROGRESS BAR */
function setupProgressBar() {
    var bar = $('#progress-bar');
    var emoji = $('#progress-emoji');
    if (!bar || !emoji) return;
    var milestoneEmojis = [
        { pct: 0, e: '🎂' }, { pct: 15, e: '🎈' }, { pct: 30, e: '🎉' }, { pct: 45, e: '🥳' },
        { pct: 60, e: '💖' }, { pct: 75, e: '🎊' }, { pct: 90, e: '🌟' }, { pct: 100, e: '👑' }
    ];
    window.addEventListener('scroll', function() {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var pct = Math.min(100, docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
        bar.style.width = pct + '%';
        emoji.style.left = pct + '%';
        var currentEmoji = '🎂';
        for (var i = 0; i < milestoneEmojis.length; i++) {
            if (pct >= milestoneEmojis[i].pct) currentEmoji = milestoneEmojis[i].e;
        }
        emoji.textContent = currentEmoji;
    }, { passive: true });
}

/* 14. GLITTER CLICK BURSTS */
function setupGlitterClicks() {
    var container = $('#glitter-container');
    if (!container) return;
    var burstEmojis = ['✨','💖','⭐','🌟','💫','🎉','🎈','🎊'];
    var colors = ['#ff6b9d','#ffd93d','#c084fc','#60a5fa','#6ee7b7','#ff8c42','#ff4757','#a78bfa'];
    document.addEventListener('click', function(e) {
        if (['BUTTON','INPUT','TEXTAREA','A','CANVAS'].indexOf(e.target.tagName) >= 0) return;
        var cx = e.clientX;
        var cy = e.clientY;
        for (var i = 0; i < 12; i++) {
            var p = document.createElement('div');
            p.className = 'glitter-piece';
            var size = rand(5, 12);
            p.style.cssText = 'left:' + cx + 'px;top:' + cy + 'px;width:' + size + 'px;height:' + size + 'px;background:' + pick(colors) + ';--tx:' + rand(-80, 80) + 'px;--ty:' + rand(-100, 20) + 'px;--rot:' + rand(-360, 360) + 'deg;--dur:' + (rand(5, 10) / 10) + 's;border-radius:' + (Math.random() > 0.5 ? '50%' : '2px') + ';';
            container.appendChild(p);
            setTimeout(function(el) { return function() { el.remove(); }; }(p), 1000);
        }
        for (var j = 0; j < 4; j++) {
            var el = document.createElement('div');
            el.className = 'click-emoji-burst';
            el.textContent = pick(burstEmojis);
            var angle = (j / 4) * 360 + rand(-20, 20);
            var dist1 = rand(40, 70);
            var dist2 = rand(80, 140);
            el.style.cssText = 'left:' + cx + 'px;top:' + cy + 'px;--tx:' + (Math.cos(angle * Math.PI / 180) * dist1) + 'px;--ty:' + (Math.sin(angle * Math.PI / 180) * dist1 - 30) + 'px;--tx2:' + (Math.cos(angle * Math.PI / 180) * dist2) + 'px;--ty2:' + (Math.sin(angle * Math.PI / 180) * dist2 - 60) + 'px;--rot:' + rand(-60, 60) + 'deg;--rot2:' + rand(-180, 180) + 'deg;';
            container.appendChild(el);
            setTimeout(function(el2) { return function() { el2.remove(); }; }(el), 1000);
        }
    });
}

/* 15. FIREWORKS */
var fireworksAnimId = null;
function launchFireworks(count) {
    count = count || 3;
    var canvas = $('#fireworks-canvas');
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext('2d');
    var particles = [];
    var colors = ['#ff6b9d','#ffd93d','#c084fc','#60a5fa','#6ee7b7','#ff8c42','#ff4757','#ffffff','#a78bfa'];
    for (var f = 0; f < count; f++) {
        (function(fi) {
            setTimeout(function() {
                var x = rand(100, window.innerWidth - 100);
                var y = rand(80, window.innerHeight / 2);
                for (var i = 0; i < 80; i++) {
                    var angle = (i / 80) * Math.PI * 2;
                    var speed = rand(3, 9) + Math.random() * 3;
                    particles.push({
                        x: x, y: y,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        color: pick(colors),
                        alpha: 1,
                        size: rand(3, 6),
                        decay: 0.012 + Math.random() * 0.01,
                        gravity: 0.12,
                        trail: []
                    });
                }
            }, fi * 400);
        })(f);
    }
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = particles.length - 1; i >= 0; i--) {
            var p = particles[i];
            p.trail.push({ x: p.x, y: p.y, alpha: p.alpha });
            if (p.trail.length > 5) p.trail.shift();
            for (var ti = 0; ti < p.trail.length; ti++) {
                var t = p.trail[ti];
                ctx.beginPath();
                ctx.arc(t.x, t.y, p.size * (ti / p.trail.length) * 0.6, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = t.alpha * (ti / p.trail.length) * 0.4;
                ctx.fill();
            }
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();
            ctx.globalAlpha = 1;
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.vx *= 0.98;
            p.alpha -= p.decay;
            if (p.alpha <= 0) particles.splice(i, 1);
        }
        if (particles.length > 0) {
            fireworksAnimId = requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    if (fireworksAnimId) cancelAnimationFrame(fireworksAnimId);
    animate();
}

/* 16. SCREEN SHAKE */
function shakeScreen() {
    document.body.classList.remove('screen-shake');
    void document.body.offsetWidth;
    document.body.classList.add('screen-shake');
    setTimeout(function() { document.body.classList.remove('screen-shake'); }, 700);
}

/* 17. SECTION SPOTLIGHT + STAMP */
var sectionStamps = {
    'roast': '🔥', 'silly-stats': '📊', 'polaroid-wall': '📸',
    'carousel-section': '🎞️', 'scratch-section': '🎰', 'spin-section': '🎡',
    'magic-8ball': '🎱', 'eras-section': '🌟', 'cake-section': '🎂',
    'gift-section': '🎁', 'mosaic': '🖼️', 'timeline': '📅',
    'letter-section': '💌', 'wishes': '💌', 'guestbook': '📝'
};

function setupSectionEffects() {
    var flash = $('#section-flash');
    var sections = $$('main .section');
    var seenStamps = new Set();
    var stampObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            var sec = entry.target;
            var id = sec.id;
            if (flash) {
                flash.classList.remove('flash-on');
                void flash.offsetWidth;
                flash.classList.add('flash-on');
            }
            var title = sec.querySelector('.section-title');
            if (title) {
                title.classList.remove('spotlight');
                void title.offsetWidth;
                title.classList.add('spotlight');
            }
            if (id && sectionStamps[id] && !seenStamps.has(id)) {
                seenStamps.add(id);
                var stamp = sec.querySelector('.section-stamp');
                if (!stamp) {
                    stamp = document.createElement('div');
                    stamp.className = 'section-stamp';
                    stamp.textContent = sectionStamps[id];
                    sec.style.position = 'relative';
                    sec.appendChild(stamp);
                }
                setTimeout(function() { stamp.classList.add('stamped'); }, 200);
            }
        });
    }, { threshold: 0.25, rootMargin: '0px 0px -10% 0px' });
    sections.forEach(function(sec) { stampObserver.observe(sec); });
}

/* 18. FLOATING HEARTS ON MOUSE MOVE */
function setupFloatingHearts() {
    var container = $('#hearts-container');
    if (!container) return;
    var hearts = ['❤️','💖','💕','💗','💓','💝','🩷','✨'];
    var lastHeart = 0;
    document.addEventListener('mousemove', function(e) {
        var now = Date.now();
        if (now - lastHeart < 200) return;
        if (Math.random() > 0.35) return;
        lastHeart = now;
        var h = document.createElement('div');
        h.className = 'float-heart';
        h.textContent = pick(hearts);
        h.style.cssText = 'left:' + e.clientX + 'px;top:' + e.clientY + 'px;--hx1:' + rand(-40, 40) + 'px;--hy1:' + rand(-60, -20) + 'px;--hx2:' + rand(-80, 80) + 'px;--hy2:' + rand(-150, -80) + 'px;--hr1:' + rand(-30, 30) + 'deg;--hr2:' + rand(-60, 60) + 'deg;--dur:' + (rand(15, 30) / 10) + 's;font-size:' + rand(12, 22) + 'px;';
        container.appendChild(h);
        setTimeout(function() { h.remove(); }, 3100);
    });
}

/* 19. TIME-ON-SITE TOASTS */
function setupTimeToasts() {
    var messages = [
        { sec: 20, emoji: '👀', text: "You've been here 20 seconds... getting emotional yet? 😭" },
        { sec: 60, emoji: '⏱️', text: '1 whole minute of birthday energy! You are in it now 🥳' },
        { sec: 120, emoji: '🍕', text: '2 minutes! Honestly deserves a pizza break 🍕' },
        { sec: 300, emoji: '🏆', text: '5 minutes!! You are COMMITTED. True bestie behavior 💅' },
        { sec: 600, emoji: '👑', text: '10 MINUTES?! You literally live here now. Rent is due. 👑' }
    ];
    var shown = new Set();
    var startTime = Date.now();
    setInterval(function() {
        var elapsed = Math.floor((Date.now() - startTime) / 1000);
        for (var i = 0; i < messages.length; i++) {
            var m = messages[i];
            if (elapsed >= m.sec && !shown.has(m.sec)) {
                shown.add(m.sec);
                showTimeToast(m.emoji, m.text);
            }
        }
    }, 1000);
}

function showTimeToast(emoji, text) {
    var toast = document.createElement('div');
    toast.className = 'time-toast';
    toast.innerHTML = emoji + ' ' + text;
    document.body.appendChild(toast);
    setTimeout(function() {
        toast.style.transition = 'all 0.5s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-120%)';
        setTimeout(function() { toast.remove(); }, 500);
    }, 5000);
}

/* 20. RAINBOW MODE (type "rainbow") */
function setupRainbowMode() {
    var typed = '';
    var rainbowOn = false;
    var indicator = $('#rainbow-indicator');
    document.addEventListener('keydown', function(e) {
        typed += e.key.toLowerCase();
        if (typed.length > 12) typed = typed.slice(-12);
        if (typed.indexOf('rainbow') >= 0 && !rainbowOn) {
            rainbowOn = true;
            typed = '';
            document.body.classList.add('rainbow-mode');
            if (indicator) indicator.classList.remove('hidden');
            launchConfetti(60);
            launchFireworks(2);
            showPopup('🌈', 'RAINBOW MODE ACTIVATED!! Everything is extra now 🌈✨');
            setTimeout(function() {
                document.body.classList.remove('rainbow-mode');
                rainbowOn = false;
                if (indicator) indicator.classList.add('hidden');
            }, 10000);
        }
    });
}

/* 21. CARD HOVER SPARKLES */
function setupCardSparkles() {
    var sparkleEmojis = ['✨','⭐','💫','🌟'];
    var cards = $$('.roast-card, .stat-card, .wish-card, .polaroid');
    cards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            for (var i = 0; i < 5; i++) {
                (function(idx) {
                    setTimeout(function() {
                        var s = document.createElement('div');
                        s.className = 'sparkle-particle';
                        s.textContent = pick(sparkleEmojis);
                        s.style.cssText = 'left:' + rand(10, 90) + '%;top:' + rand(10, 90) + '%;--sx:' + rand(-40, 40) + 'px;--sy:' + rand(-50, -10) + 'px;';
                        card.style.position = 'relative';
                        card.style.overflow = 'visible';
                        card.appendChild(s);
                        setTimeout(function() { s.remove(); }, 900);
                    }, idx * 80);
                })(i);
            }
        });
    });
}

/* 22. SURPRISE SECTION TRANSITIONS */
function setupSurpriseTransitions() {
    var surpriseMessages = [
        { emoji: '🎂', text: 'New section, who dis? 👀' },
        { emoji: '🚀', text: 'Scrolling to greatness...' },
        { emoji: '💅', text: 'Another iconic section loading...' },
        { emoji: '🥳', text: 'It keeps getting better!!' },
        { emoji: '🔥', text: 'HOT CONTENT AHEAD 🔥' },
        { emoji: '🌟', text: 'Stars only from here on out ⭐' }
    ];
    var lastSection = '';
    var msgIdx = 0;
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            var id = entry.target.id;
            if (id === lastSection || !id) return;
            lastSection = id;
            if (Math.random() < 0.45) {
                var m = surpriseMessages[msgIdx % surpriseMessages.length];
                msgIdx++;
                var toast = document.createElement('div');
                toast.className = 'scroll-timer-toast';
                toast.textContent = m.emoji + ' ' + m.text;
                document.body.appendChild(toast);
                setTimeout(function() {
                    toast.style.transition = 'all 0.4s ease';
                    toast.style.opacity = '0';
                    toast.style.transform = 'translateX(120%)';
                    setTimeout(function() { toast.remove(); }, 400);
                }, 2200);
            }
        });
    }, { threshold: 0.4 });
    $$('main .section').forEach(function(sec) { observer.observe(sec); });
}
