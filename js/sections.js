/* ═══════════════════════════════════════════════════════════════
   🎮 INTERACTIVE SECTIONS
   Roasts, Stats, Scratch Cards, Quiz, Cake, Gift, etc.
   ═══════════════════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────────────────────
   HERO
   ────────────────────────────────────────────────────────────── */
function setupHero() {
    const nameEl = $('#hero-name');
    if (CONFIG.petName) {
        nameEl.innerHTML = `${CONFIG.friendName} <span style="font-size: 0.8em; opacity: 0.85;">(aka ${CONFIG.petName} 💖)</span>`;
    } else {
        nameEl.textContent = CONFIG.friendName;
    }
}

/* ──────────────────────────────────────────────────────────────
   ROAST SECTION 🔥
   ────────────────────────────────────────────────────────────── */
function setupRoasts() {
    const container = $('#roast-cards');
    CONFIG.roasts.forEach((roast) => {
        const card = document.createElement('div');
        card.className = 'roast-card reveal';
        card.style.setProperty('--rot', rand(-3, 3) + 'deg');
        card.innerHTML = `
            <div class="roast-emoji">${roast.emoji}</div>
            <p class="roast-text">${roast.text}</p>
        `;
        card.addEventListener('click', () => {
            card.style.animation = 'none';
            card.offsetHeight;
            card.style.animation = 'wiggle 0.5s ease';
        });
        container.appendChild(card);
    });
}

/* ──────────────────────────────────────────────────────────────
   SILLY STATS 📊
   ────────────────────────────────────────────────────────────── */
function setupSillyStats() {
    const grid = $('#stats-grid');
    CONFIG.sillyStats.forEach((stat, i) => {
        const card = document.createElement('div');
        card.className = 'stat-card reveal';
        card.style.setProperty('--hover-rot', (i % 2 === 0 ? 3 : -3) + 'deg');
        card.innerHTML = `
            <div class="stat-emoji">${stat.emoji}</div>
            <span class="stat-number">${stat.number}</span>
            <span class="stat-label">${stat.label}</span>
        `;
        grid.appendChild(card);
    });
}

/* ──────────────────────────────────────────────────────────────
   SCRATCH CARDS 🎰
   ────────────────────────────────────────────────────────────── */
function setupScratchCards() {
    const grid = $('#scratch-grid');
    CONFIG.scratchSecrets.forEach((secret) => {
        const card = document.createElement('div');
        card.className = 'scratch-card reveal';
        card.innerHTML = `
            <div class="scratch-secret">${secret}</div>
            <div class="scratch-cover">
                <span class="scratch-label">🎰 SCRATCH ME! 🎰</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

/* ──────────────────────────────────────────────────────────────
   MAGIC 8-BALL 🎱
   ────────────────────────────────────────────────────────────── */
function setup8Ball() {
    const ball = $('#eight-ball');
    const answer = $('#ball-answer');

    ball.addEventListener('click', () => {
        ball.classList.remove('answered');
        ball.classList.add('shaking');

        setTimeout(() => {
            ball.classList.remove('shaking');
            answer.textContent = pick(CONFIG.eightBallAnswers);
            ball.classList.add('answered');
        }, 600);
    });
}

/* ──────────────────────────────────────────────────────────────
   BIRTHDAY CAKE 🎂
   ────────────────────────────────────────────────────────────── */
function setupCake() {
    const row = $('#candles-row');
    const status = $('#cake-status');
    const blowAllBtn = $('#blow-all-btn');
    const numCandles = 7;
    let blown = 0;
    const candles = [];

    function blowCandle(candle) {
        if (!candle.classList.contains('blown')) {
            candle.classList.add('blown');
            blown++;

            if (blown === numCandles) {
                status.textContent = "🥳 You did it! Now make a wish!! (no we won't ask what it is) ✨";
                blowAllBtn.style.display = 'none';
                launchConfetti(100);
                setTimeout(() => {
                    showPopup("🎂", "The cake is a lie... jk HAPPY BIRTHDAY!! 🥳🎉");
                }, 1500);
            } else {
                status.textContent = `${numCandles - blown} candle${numCandles - blown > 1 ? 's' : ''} left! Keep going! 🌬️`;
            }
        }
    }

    for (let i = 0; i < numCandles; i++) {
        const candle = document.createElement('div');
        candle.className = 'candle';
        candle.innerHTML = '<div class="candle-flame"></div>';
        candle.addEventListener('click', () => blowCandle(candle));
        row.appendChild(candle);
        candles.push(candle);
    }

    blowAllBtn.addEventListener('click', () => {
        const unblown = candles.filter(c => !c.classList.contains('blown'));
        unblown.forEach((candle, i) => {
            setTimeout(() => blowCandle(candle), i * 200);
        });
    });
}

/* ──────────────────────────────────────────────────────────────
   BIRTHDAY QUIZ 🧠
   ────────────────────────────────────────────────────────────── */
function setupBirthdayQuiz() {
    const container = $('#quiz-container');
    const questions = CONFIG.quizQuestions;
    let currentQ = 0;
    let score = 0;

    function renderQuestion() {
        const q = questions[currentQ];
        const card = document.createElement('div');
        card.className = 'quiz-card';
        card.innerHTML = `
            <p class="quiz-progress">Question ${currentQ + 1} of ${questions.length}</p>
            <h3 class="quiz-question">${q.q}</h3>
            <div class="quiz-options">
                ${q.options.map((opt, i) => `<button class="quiz-option" data-idx="${i}">${opt}</button>`).join('')}
            </div>
        `;
        container.innerHTML = '';
        container.appendChild(card);

        card.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.idx);
                const isCorrect = idx === q.answer;

                card.querySelectorAll('.quiz-option').forEach(b => {
                    b.style.pointerEvents = 'none';
                    if (parseInt(b.dataset.idx) === q.answer) b.classList.add('correct');
                    else if (b === btn && !isCorrect) b.classList.add('wrong');
                });

                if (isCorrect) score++;

                setTimeout(() => {
                    currentQ++;
                    if (currentQ < questions.length) {
                        renderQuestion();
                    } else {
                        showResults();
                    }
                }, 1200);
            });
        });
    }

    function showResults() {
        const pct = Math.round((score / questions.length) * 100);
        let msg;
        if (pct === 100) msg = "You're basically a stalker 👀💯 Perfect score!!";
        else if (pct >= 60) msg = "Not bad! You actually pay attention 🤩";
        else if (pct >= 40) msg = "Hmm... do you even KNOW this person? 🤔";
        else msg = "Did you just guess randomly?? 💯 fake friend behavior 😂";

        container.innerHTML = `
            <div class="quiz-card">
                <h3 class="quiz-question">🏆 Quiz Complete!</h3>
                <p class="quiz-score">${score}/${questions.length}</p>
                <p class="quiz-result-text">${msg}</p>
                <button class="quiz-restart-btn" id="quiz-restart">🔁 Try Again</button>
            </div>
        `;

        launchConfetti(pct >= 60 ? 80 : 20);

        $('#quiz-restart').addEventListener('click', () => {
            currentQ = 0;
            score = 0;
            renderQuestion();
        });
    }

    renderQuestion();
}

/* ──────────────────────────────────────────────────────────────
   EXPLODING GIFT BOX 🎁
   ────────────────────────────────────────────────────────────── */
function setupGiftBox() {
    const box = $('#gift-box');
    const hint = $('#gift-hint');
    const msg = $('#gift-message');
    let opened = false;

    box.addEventListener('click', () => {
        if (opened) return;
        opened = true;

        box.classList.add('opened');
        hint.style.display = 'none';

        const burstEmojis = ['🎉', '✨', '🎁', '❤️', '🎈', '🥳', '⭐', '🌟', '💖', '🎂', '🌊', '🔥'];
        const burstContainer = document.createElement('div');
        burstContainer.className = 'gift-emojis-burst';
        box.appendChild(burstContainer);

        burstEmojis.forEach((emoji, i) => {
            const el = document.createElement('div');
            el.className = 'burst-emoji';
            el.textContent = emoji;
            const angle = (i / burstEmojis.length) * 360;
            const dist = rand(80, 200);
            el.style.setProperty('--bx', `${Math.cos(angle * Math.PI / 180) * dist}px`);
            el.style.setProperty('--by', `${Math.sin(angle * Math.PI / 180) * dist - 50}px`);
            el.style.setProperty('--br', `${rand(-180, 180)}deg`);
            el.style.animationDelay = `${i * 0.05}s`;
            burstContainer.appendChild(el);
        });

        msg.textContent = pick(CONFIG.giftMessages);
        setTimeout(() => msg.classList.add('visible'), 400);
        launchConfetti(80);
    });
}

/* ──────────────────────────────────────────────────────────────
   BIRTHDAY WISHES 💌
   ────────────────────────────────────────────────────────────── */
function generateWishes() {
    const grid = $('#wishes-grid');
    CONFIG.wishes.forEach(wish => {
        const card = document.createElement('div');
        card.className = 'wish-card reveal';
        card.style.setProperty('--rot', rand(-2, 2) + 'deg');
        card.innerHTML = `
            <p class="wish-text">${wish.text}</p>
            <p class="wish-author">— ${wish.author}</p>
        `;
        grid.appendChild(card);
    });
}

/* ──────────────────────────────────────────────────────────────
   GUESTBOOK 📝
   ────────────────────────────────────────────────────────────── */
async function setupGuestbook() {
    const btn = $('#send-wish-btn');
    const nameInput = $('#guest-name');
    const wishInput = $('#guest-wish');
    const wall = $('#notes-wall');

    const noteColors = ['#ffd93d', '#ff9fbb', '#a0e7e5', '#b4f8c8', '#fbe7c6', '#c3b1e1', '#ffb7b2'];

    // Load messages from Supabase OR fallback to localStorage
    let useSupabase = typeof supabaseClient !== 'undefined' && supabaseClient;
    
    if (useSupabase) {
        console.log('📡 Loading guestbook from Supabase...');
        const result = await getGuestbookMessages();
        if (result.success) {
            result.data.forEach(msg => {
                const color = pick(noteColors);
                addPostIt(msg.guest_name, msg.message, color, wall);
            });
            
            // Subscribe to real-time updates
            subscribeToGuestbook((newMessage) => {
                const color = pick(noteColors);
                addPostIt(newMessage.guest_name, newMessage.message, color, wall);
                launchConfetti(20);
            });
        } else {
            console.warn('⚠️ Failed to load from Supabase, using localStorage');
            useSupabase = false;
        }
    }
    
    if (!useSupabase) {
        // Fallback to localStorage
        const saved = JSON.parse(localStorage.getItem('bdayNotes') || '[]');
        saved.forEach(n => addPostIt(n.name, n.text, n.color, wall));
    }

    btn.addEventListener('click', async () => {
        const name = nameInput.value.trim();
        const text = wishInput.value.trim();
        if (!name || !text) return;

        const color = pick(noteColors);
        
        // Disable button during submission
        btn.disabled = true;
        btn.textContent = 'Sending...';

        if (useSupabase) {
            // Save to Supabase
            const result = await addGuestbookMessage(name, text);
            if (result.success) {
                console.log('✅ Message saved to database');
                addPostIt(name, text, color, wall);
                launchConfetti(30);
            } else {
                console.error('❌ Failed to save:', result.error);
                alert('Oops! Failed to save your message. Please try again.');
            }
        } else {
            // Save to localStorage
            addPostIt(name, text, color, wall);
            const saved = JSON.parse(localStorage.getItem('bdayNotes') || '[]');
            saved.push({ name, text, color });
            localStorage.setItem('bdayNotes', JSON.stringify(saved));
            launchConfetti(30);
        }

        // Re-enable button
        btn.disabled = false;
        btn.textContent = 'SEND WISH 💌';
        nameInput.value = '';
        wishInput.value = '';
    });
}

function addPostIt(name, text, color, wall) {
    const note = document.createElement('div');
    note.className = 'post-it';
    note.style.setProperty('--rot', rand(-6, 6) + 'deg');
    note.style.setProperty('--note-color', color);
    note.innerHTML = `
        <div class="post-it-name">${name}</div>
        <div class="post-it-text">${text}</div>
    `;
    wall.appendChild(note);
}

/* ──────────────────────────────────────────────────────────────
   SECRET LETTER 💌
   ────────────────────────────────────────────────────────────── */
function setupSecretLetter() {
    const textEl = $('#letter-text');
    const text = CONFIG.letterText;
    let started = false;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            started = true;
            typewriterEffect(textEl, text);
            observer.disconnect();
        }
    }, { threshold: 0.3 });

    observer.observe(textEl.closest('.letter-paper'));
}

function typewriterEffect(el, text) {
    let i = 0;
    const cursor = document.createElement('span');
    cursor.className = 'letter-cursor';
    el.appendChild(cursor);

    function type() {
        if (i < text.length) {
            const char = text[i];
            el.insertBefore(document.createTextNode(char), cursor);
            i++;
            const delay = char === '\n' ? 150 : char === ' ' ? 30 : rand(20, 60);
            setTimeout(type, delay);
        } else {
            setTimeout(() => cursor.remove(), 2000);
        }
    }

    type();
}
