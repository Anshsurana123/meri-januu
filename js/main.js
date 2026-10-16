// Main Interactive Experience for Asking Out Aarya (Makdi Basanti / Jannu / Baby)
document.addEventListener('DOMContentLoaded', () => {
  // 1. State
  let lovePercent = 88;
  let prettyCount = 999995;
  let prettyTurboInterval = null;
  let millionUnlocked = false;
  let pizzaCount = 0;
  let chocoCount = 0;
  let jhumkaCount = 0;
  let catPets = 0;
  let ragebaitIndex = 0;
  let sorrySpamRunning = false;
  let noButtonDodges = 0;
  let currentLightboxIndex = 0;

  // All 9 Photos Metadata for Lightbox
  const photosData = [
    {
      src: 'assets/photos/photo1-cozy-selfie.jpg',
      title: 'Tangled Up With My Jannu 💕',
      caption: 'Sitting close together — whether you call me Akashi Pakkshi, Baby, or Baccha, right next to you is my favorite place in the universe.'
    },
    {
      src: 'assets/photos/photo2-tight-hug.jpg',
      title: 'How Much I Love Hugging You 🫂💖',
      caption: 'Our tightest warm bear hug! Wrapping my arms all the way around you and holding your waist makes the whole world melt away.'
    },
    {
      src: 'assets/photos/photo3-waist-close.jpg',
      title: 'Obsessed With Your Waist 🔥🥺',
      caption: 'Close-up proof of how much I love holding your waist. My hands were literally made to hold you close, baby.'
    },
    {
      src: 'assets/photos/photo4-holding-hands.jpg',
      title: 'Holding Hands & Cream Stone Memories 🍨💋',
      caption: 'Our fingers intertwined tightly across the table — reminding me of our very first kiss at Cream Stone and how much we love each other!'
    },
    {
      src: 'assets/photos/photo5-waist-hug.jpg',
      title: 'Both Hands Around My Baby 🫶',
      caption: 'Hugging you from behind with both hands locked around your waist. My prettiest Makdi Basanti fits so perfectly in my arms.'
    },
    {
      src: 'assets/photos/photo6-cute-pout.jpg',
      title: 'The Prettiest Girl in the Universe 😍👑',
      caption: 'Look at that adorable pout and those gorgeous curls while I hold your waist! No wonder I call you pretty a million times a day.'
    },
    {
      src: 'assets/photos/photo7-curls-hug.jpg',
      title: 'Your Pretty Curls + My Warm Hugs 🌸',
      caption: 'From your pretty curls down to your waist, your clingy baccha is 1,000,000% head over heels in love with you.'
    },
    {
      src: 'assets/photos/photo8-back-hug.jpg',
      title: 'Never Letting Go of Your Waist 💗',
      caption: 'Every time we are together, my hands automatically find their home right around your waist, my sweet Jannu.'
    },
    {
      src: 'assets/photos/cat.jpeg',
      title: 'Your Super Cute Fluffy Cat! 🐱🐾',
      caption: 'Look at that majestic grey floof and giant fluffy tail! Officially the cutest kitty in the world, belonging to the prettiest girl in the world.'
    }
  ];

  // Helper: Boost Love Meter
  const loveFill = document.getElementById('love-meter-fill');
  const loveText = document.getElementById('love-meter-text');
  function boostLoveMeter(amount = 2) {
    lovePercent = Math.min(100, lovePercent + amount);
    if (loveFill) loveFill.style.width = `${lovePercent}%`;
    if (loveText) loveText.textContent = lovePercent >= 100 ? '100% MAX 💖' : `${lovePercent}%`;
  }

  // Helper: Spawn Floating Toast near element or coordinates
  function spawnFloatingToast(text, x, y) {
    const toast = document.createElement('div');
    toast.className = 'floating-love-toast';
    toast.textContent = text;
    const posX = Math.min(window.innerWidth - 220, Math.max(16, (x || window.innerWidth / 2) - 80));
    const posY = Math.min(window.innerHeight - 80, Math.max(40, (y || window.innerHeight / 2) - 20));
    toast.style.left = `${posX}px`;
    toast.style.top = `${posY}px`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1550);
  }

  // Helper: Safe Confetti Burst
  function fireConfetti(options = {}) {
    if (typeof window.confetti === 'function') {
      window.confetti({
        particleCount: options.particleCount || 70,
        spread: options.spread || 75,
        origin: options.origin || { y: 0.65 },
        colors: ['#ff4d6d', '#ff8fa3', '#ffb3c1', '#f59e0b', '#c9184a']
      });
    }
  }

  // 2. Top Bar Pet-Name Switcher (Makdi Basanti / Jannu / Baby)
  const nickBtns = document.querySelectorAll('.nick-pill-btn');
  const dynamicNickSpans = document.querySelectorAll('.dynamic-her-nick');
  nickBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      nickBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const chosenNick = btn.getAttribute('data-her-nick');
      dynamicNickSpans.forEach(span => {
        span.textContent = chosenNick;
      });
      if (window.loveAudio) window.loveAudio.playSparkle();
      boostLoveMeter(2);
      spawnFloatingToast(`Calling my girl: ${chosenNick} 💖`, e.clientX, e.clientY);
    });
  });

  // 3. Music Box Button
  const musicBtn = document.getElementById('btn-music-box');
  const musicIcon = document.getElementById('music-icon');
  const musicLabel = document.getElementById('music-label');
  if (musicBtn) {
    musicBtn.addEventListener('click', () => {
      if (!window.loveAudio) return;
      const playing = window.loveAudio.toggleBGM();
      musicBtn.classList.toggle('playing', playing);
      if (musicIcon) musicIcon.textContent = playing ? '🎶' : '🎵';
      if (musicLabel) musicLabel.textContent = playing ? 'Playing Our Song...' : 'Play Our Melody';
      boostLoveMeter(3);
    });
  }

  // 4. Nickname Dictionary Cards
  document.querySelectorAll('.nickname-item').forEach(card => {
    card.addEventListener('click', (e) => {
      const msg = card.getAttribute('data-toast') || 'I love you so much, baby! 💖';
      if (window.loveAudio) window.loveAudio.playSparkle();
      boostLoveMeter(2);
      spawnFloatingToast(msg, e.clientX, e.clientY);
    });
  });

  // 5. 1,000,000x "You're So Pretty" Live Counter
  const prettyOdometer = document.getElementById('pretty-odometer');
  const prettyComplimentEl = document.getElementById('pretty-live-compliment');
  const prettyMilestoneBanner = document.getElementById('pretty-milestone-banner');
  const btnPrettyOnce = document.getElementById('btn-pretty-once');
  const btnPrettyTurbo = document.getElementById('btn-pretty-turbo');

  const prettyCompliments = [
    '“You are THE prettiest girl in the entire universe, my Jannu! 😍💖”',
    '“Look at those gorgeous curls and that cute face, Makdi Basanti! 🥺✨”',
    '“Prettiest smile, prettiest eyes, prettiest waist, prettiest soul! 👑”',
    '“Even calling you pretty 1,000,000 times a day isn’t enough, baby! 💕”',
    '“When you wear jhumke, my heart literally forgets how to beat! ✨🔔”',
    '“Your Akashi Pakkshi is 1000% mesmerized by how pretty you are! 🐦💗”',
    '“No wonder your baccha gets jealous — look how stunning my girl is! 🔥🥺”',
    '“Prettiest when you laugh, prettiest when you pout, prettiest always! 🌸”'
  ];

  function incrementPrettyCounter(step = 1, clientX, clientY) {
    prettyCount += step;
    if (prettyOdometer) {
      prettyOdometer.textContent = prettyCount.toLocaleString();
    }
    if (prettyComplimentEl) {
      const quote = prettyCompliments[prettyCount % prettyCompliments.length];
      prettyComplimentEl.textContent = quote;
    }
    if (!millionUnlocked && prettyCount >= 1000000) {
      millionUnlocked = true;
      if (prettyMilestoneBanner) prettyMilestoneBanner.classList.add('unlocked');
      if (window.loveAudio) window.loveAudio.playCelebrationFanfare();
      fireConfetti({ particleCount: 95, spread: 90 });
      spawnFloatingToast('👑 1,000,000x PRETTY UNLOCKED!! 💖', clientX, clientY);
    }
    boostLoveMeter(1);
  }

  if (btnPrettyOnce) {
    btnPrettyOnce.addEventListener('click', (e) => {
      if (window.loveAudio) window.loveAudio.playSparkle();
      incrementPrettyCounter(1, e.clientX, e.clientY);
      spawnFloatingToast('You’re SO pretty, Jannu! 😍✨', e.clientX, e.clientY);
    });
  }

  if (btnPrettyTurbo) {
    btnPrettyTurbo.addEventListener('click', (e) => {
      if (prettyTurboInterval) {
        clearInterval(prettyTurboInterval);
        prettyTurboInterval = null;
        btnPrettyTurbo.textContent = '🚀 Toggle Turbo “Pretty” Spam';
      } else {
        btnPrettyTurbo.textContent = '⏸️ Stop Turbo Pretty Spam (Running!)';
        if (window.loveAudio) window.loveAudio.playSparkle();
        prettyTurboInterval = setInterval(() => {
          incrementPrettyCounter(17, e.clientX, e.clientY);
        }, 90);
      }
    });
  }

  // 6. 9-Photo Scrapbook Filtering, Heart Likes & Lightbox
  const filterPills = document.querySelectorAll('.filter-pill');
  const polaroidCards = document.querySelectorAll('.scrapbook-polaroid');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');

      polaroidCards.forEach(card => {
        const cats = card.getAttribute('data-category') || '';
        if (filter === 'all' || cats.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
      if (window.loveAudio) window.loveAudio.playChatPop(true);
    });
  });

  // Heart buttons on each Polaroid
  document.querySelectorAll('.btn-heart-photo').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const countSpan = btn.querySelector('.heart-count');
      if (countSpan) {
        const val = parseInt(countSpan.textContent, 10) || 100;
        countSpan.textContent = String(val + 1);
      }
      btn.classList.add('liked');
      if (window.loveAudio) window.loveAudio.playSparkle();
      boostLoveMeter(2);
      spawnFloatingToast('❤️ Loved this memory of us!', e.clientX, e.clientY);
    });
  });

  // Lightbox Modal
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const btnCloseLightbox = document.getElementById('btn-close-lightbox');
  const btnPrevPhoto = document.getElementById('btn-prev-photo');
  const btnNextPhoto = document.getElementById('btn-next-photo');

  function openLightbox(index) {
    currentLightboxIndex = (index + photosData.length) % photosData.length;
    const item = photosData[currentLightboxIndex];
    if (lightboxImg) {
      lightboxImg.src = item.src;
      lightboxImg.alt = item.title;
    }
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxCaption) lightboxCaption.textContent = item.caption;
    if (lightboxModal) lightboxModal.classList.add('open');
    if (window.loveAudio) window.loveAudio.playSparkle();
    boostLoveMeter(1);
  }

  function closeLightbox() {
    if (lightboxModal) lightboxModal.classList.remove('open');
  }

  document.querySelectorAll('[data-photo-index]').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('.btn-heart-photo')) return;
      const idx = parseInt(el.getAttribute('data-photo-index'), 10) || 0;
      openLightbox(idx);
    });
  });

  if (btnCloseLightbox) btnCloseLightbox.addEventListener('click', closeLightbox);
  if (btnPrevPhoto) btnPrevPhoto.addEventListener('click', () => openLightbox(currentLightboxIndex - 1));
  if (btnNextPhoto) btnNextPhoto.addEventListener('click', () => openLightbox(currentLightboxIndex + 1));
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // 7. Cream Stone First Kiss Button
  const btnCreamStoneKiss = document.getElementById('btn-cream-stone-kiss');
  const creamStoneIcons = document.getElementById('cream-stone-icons');
  if (btnCreamStoneKiss) {
    btnCreamStoneKiss.addEventListener('click', (e) => {
      if (window.loveAudio) window.loveAudio.playCelebrationFanfare();
      fireConfetti({ particleCount: 65, spread: 80 });
      boostLoveMeter(4);
      if (creamStoneIcons) {
        creamStoneIcons.innerHTML = '<span>🍨</span><span>💋</span><span>💖</span><span>💋</span><span>🍦</span>';
      }
      spawnFloatingToast('🍨💋 First Kiss at Cream Stone Forever! 💖', e.clientX, e.clientY);
    });
  }

  // 8. Ragebait vs. Sorry Spam Chat Simulator
  const chatViewport = document.getElementById('chat-messages-viewport');
  const chatMoodPill = document.getElementById('chat-mood-pill');
  const convinceFill = document.getElementById('convince-fill');
  const convincePercent = document.getElementById('convince-percent');
  const btnDoRagebait = document.getElementById('btn-do-ragebait');
  const btnDoSorrySpam = document.getElementById('btn-do-sorry-spam');

  const ragebaitPairs = [
    {
      me: 'Makdi basanti, I think your cute cat loves me 1% more than she loves you 😼🐾',
      her: 'EXCUSE ME AKASHI PAKKSHI?! 😤🥺 My cat is mine!! Don’t talk to me bye!'
    },
    {
      me: 'Oye jannu, what if I eat the last cheesy slice of pizza AND your chocolate right now? 🍕🍫👀',
      her: 'Hmph!! 😭😤 You always ragebait me baccha! I am actually mad now 🥺'
    },
    {
      me: 'Wait I only called you pretty 999,998 times today instead of a million 😜',
      her: 'See?! You don’t love me anymore akashi pakkshi 🥺💔 Going offline bye!'
    },
    {
      me: 'Makdi basanti is 50% spider, 50% dramatic baby 🕷️💃😜',
      her: 'STOP RAGEBAITING ME BABYYY 😭😤 Say sorry 20 times right now or no hugs!!'
    }
  ];

  const sorrySpamMessages = [
    'SORRYYYY BABYYYY 🥺🥺🥺',
    'I’m so sorry my jannuuuu please don’t be mad 😭💖',
    'Sorry sorry sorry sorry my prettiest makdi basanti!!',
    'Your akashi pakkshi was just teasing you because you look SO cute when you pout 🥺',
    'Baccha is sorryyyyy please look at me babyyy 👉👈',
    'I love you a lottt jannu, I’m sorryyyy 😭❤️❤️',
    'I’m bringing hot cheesy pizza 🍕 + your favorite chocolates 🍫 right now!!',
    'And buying you the prettiest jhumke too ✨🔔',
    'Please forgive your silly baccha?? 🥺🫂',
    'Let me hold your waist and give you the tightest hug right now!! 💕',
    'SORRYYYY MY PRETTIEST GIRL IN THE UNIVERSE 😭💖✨'
  ];

  function appendChatBubble(sender, text, type = 'outgoing') {
    if (!chatViewport) return;
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${type}`;
    const senderSpan = document.createElement('span');
    senderSpan.className = 'chat-bubble-sender';
    senderSpan.textContent = sender;
    bubble.appendChild(senderSpan);
    bubble.appendChild(document.createTextNode(text));
    chatViewport.appendChild(bubble);
    chatViewport.scrollTop = chatViewport.scrollHeight;
  }

  function updateConvinceMeter(pct, moodText) {
    if (convinceFill) convinceFill.style.width = `${pct}%`;
    if (convincePercent) convincePercent.textContent = `${pct}%`;
    if (chatMoodPill && moodText) chatMoodPill.textContent = moodText;
  }

  if (btnDoRagebait) {
    btnDoRagebait.addEventListener('click', () => {
      if (sorrySpamRunning) return;
      const pair = ragebaitPairs[ragebaitIndex % ragebaitPairs.length];
      ragebaitIndex++;

      if (window.loveAudio) window.loveAudio.playChatPop(false);
      appendChatBubble('Akashi Pakkshi 🐦', pair.me, 'outgoing');
      updateConvinceMeter(35, 'Mood: Emotional & Pouting 🥺😤');

      setTimeout(() => {
        if (window.loveAudio) window.loveAudio.playChatPop(true);
        appendChatBubble('Makdi Basanti 💖', pair.her, 'incoming');
      }, 650);
    });
  }

  if (btnDoSorrySpam) {
    btnDoSorrySpam.addEventListener('click', (e) => {
      if (sorrySpamRunning) return;
      sorrySpamRunning = true;
      btnDoSorrySpam.textContent = '🥺 Spamming Sorry for Jannu... 💌';

      let idx = 0;
      const spamTimer = setInterval(() => {
        if (idx < sorrySpamMessages.length) {
          if (window.loveAudio) window.loveAudio.playChatPop(false);
          appendChatBubble('Your Baccha (Akashi Pakkshi) 🥺🐦', sorrySpamMessages[idx], 'outgoing');
          const progress = Math.min(98, 40 + Math.round(((idx + 1) / sorrySpamMessages.length) * 58));
          updateConvinceMeter(progress, 'Mood: Melting from Sorry Spam 🥺💓');
          idx++;
        } else {
          clearInterval(spamTimer);
          setTimeout(() => {
            if (window.loveAudio) window.loveAudio.playSparkle();
            appendChatBubble(
              'Makdi Basanti 💖',
              'Hehe fineee I forgive you akashi pakkshi 🥺❤️ You know I love your sorry spam! Come hug my waist tight right now, my baccha 🫂💋',
              'incoming'
            );
            updateConvinceMeter(100, 'Mood: 100% Convinced & Blushing 🥰💖');
            boostLoveMeter(5);
            fireConfetti({ particleCount: 50, spread: 65 });
            spawnFloatingToast('Sorry Spam Worked 100%! 🥺💖', e.clientX, e.clientY);
            btnDoSorrySpam.textContent = '🥺💌 UNLEASH THE SORRY SPAM (x15 Burst!)';
            sorrySpamRunning = false;
          }, 450);
        }
      }, 175);
    });
  }

  // 9. Her Favorites Starter Pack (Pizza, Chocolates, Jhumke, Cute Cat)
  const btnGivePizza = document.getElementById('btn-give-pizza');
  const pizzaCounterPill = document.getElementById('pizza-counter-pill');
  if (btnGivePizza) {
    btnGivePizza.addEventListener('click', (e) => {
      pizzaCount++;
      if (pizzaCounterPill) pizzaCounterPill.textContent = `Slices Served: ${pizzaCount} 🍕`;
      if (window.loveAudio) window.loveAudio.playSparkle();
      boostLoveMeter(2);
      spawnFloatingToast('🍕 Extra cheesy pizza slice for my Jannu!', e.clientX, e.clientY);
    });
  }

  const btnGiveChoco = document.getElementById('btn-give-choco');
  const chocoCounterPill = document.getElementById('choco-counter-pill');
  const chocoNotes = [
    '🍫 Sweet chocolate for my even sweeter Baby!',
    '🍫 Dark silk chocolate + a forehead kiss from Akashi Pakkshi!',
    '🍫 Unlimited chocolates whenever Makdi Basanti craves them!',
    '🍫 Still only 1% as sweet as our first kiss at Cream Stone!'
  ];
  if (btnGiveChoco) {
    btnGiveChoco.addEventListener('click', (e) => {
      chocoCount++;
      if (chocoCounterPill) chocoCounterPill.textContent = `Chocolates Unwrapped: ${chocoCount} 🍫`;
      if (window.loveAudio) window.loveAudio.playSparkle();
      boostLoveMeter(2);
      spawnFloatingToast(chocoNotes[chocoCount % chocoNotes.length], e.clientX, e.clientY);
    });
  }

  const btnJingleJhumka = document.getElementById('btn-jingle-jhumka');
  const jhumkaSvg = document.getElementById('jhumka-svg');
  const jhumkaStatusPill = document.getElementById('jhumka-status-pill');
  if (btnJingleJhumka) {
    btnJingleJhumka.addEventListener('click', (e) => {
      jhumkaCount++;
      if (jhumkaSvg) {
        jhumkaSvg.classList.remove('swinging');
        void jhumkaSvg.offsetWidth;
        jhumkaSvg.classList.add('swinging');
      }
      if (jhumkaStatusPill) jhumkaStatusPill.textContent = `Jhumke Gifted: ${jhumkaCount} Pairs ✨`;
      if (window.loveAudio) window.loveAudio.playJhumkaJingle();
      boostLoveMeter(3);
      spawnFloatingToast('✨ Pretty jhumke for the prettiest girl alive! 🔔💖', e.clientX, e.clientY);
    });
  }

  const btnPetKitty = document.getElementById('btn-pet-kitty');
  const catStatusPill = document.getElementById('cat-status-pill');
  if (btnPetKitty) {
    btnPetKitty.addEventListener('click', (e) => {
      catPets++;
      if (catStatusPill) catStatusPill.textContent = `Purr Level: ${catPets * 100}% Happy Floof 🐾`;
      if (window.loveAudio) window.loveAudio.playPurr(2000);
      boostLoveMeter(3);
      spawnFloatingToast('🐾 Purrrrr~ Your cute cat approves of Akashi Pakkshi! 🐱💖', e.clientX, e.clientY);
    });
  }

  // 10. Date Activity Chips & Proposal Finale
  const activityChips = document.querySelectorAll('.date-activity-chip');
  const certActivitiesList = document.getElementById('certificate-activities-list');

  function syncSelectedActivities() {
    const chosen = [];
    activityChips.forEach(chip => {
      if (chip.classList.contains('selected')) {
        chosen.push(chip.getAttribute('data-activity'));
      }
    });
    if (certActivitiesList) {
      certActivitiesList.textContent = chosen.length > 0
        ? chosen.join(' • ')
        : 'All of them! Pizza, Chocolates, Jhumke, Cream Stone & Endless Waist Hugs!';
    }
  }

  activityChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
      if (window.loveAudio) window.loveAudio.playChatPop(true);
      syncSelectedActivities();
    });
  });

  // Proposal YES & Playful Runaway NO
  const btnSayYes = document.getElementById('btn-say-yes');
  const btnSayNo = document.getElementById('btn-say-no');
  const dodgeTeaseMsg = document.getElementById('dodge-tease-msg');
  const celebrationModal = document.getElementById('celebration-modal');
  const btnCloseCelebration = document.getElementById('btn-close-celebration');
  const btnDoneCelebration = document.getElementById('btn-done-celebration');
  const btnMoreConfetti = document.getElementById('btn-more-confetti');

  const noDodgeLines = [
    '“Hey Makdi Basanti, that button is broken! Click YES baby! 🥺👉👈”',
    '“Wait I’ll spam SORRY 10,000 times right now if you click YES! 😭💌”',
    '“I already promised Pizza 🍕 + Chocolates 🍫 + Pretty Jhumke ✨!!”',
    '“Remember our first kiss at Cream Stone?! You HAVE to say YES, Jannu! 🍨💋”',
    '“Even your cute fluffy cat voted YES for Akashi Pakkshi! 🐱🐾”',
    '“Okay I replaced the No button with YES because we love each other a lottt! 💖”'
  ];

  function dodgeNoButton(e) {
    if (!btnSayNo) return;
    noButtonDodges++;
    if (window.loveAudio) window.loveAudio.playDodgeBounce();

    const msg = noDodgeLines[Math.min(noButtonDodges - 1, noDodgeLines.length - 1)];
    if (dodgeTeaseMsg) dodgeTeaseMsg.textContent = msg;

    if (noButtonDodges >= 6) {
      btnSayNo.textContent = '💖 Okay fine, YES my Baccha! 🥺';
      btnSayNo.style.background = 'linear-gradient(135deg, #ff4d6d, #c9184a)';
      btnSayNo.style.color = '#ffffff';
      btnSayNo.style.borderColor = 'transparent';
      btnSayNo.style.transform = 'translate(0, 0) scale(1.05)';
      return;
    }

    const offsetX = (Math.random() - 0.5) * 220;
    const offsetY = (Math.random() - 0.5) * 90;
    btnSayNo.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${Math.max(0.78, 1 - noButtonDodges * 0.04)})`;
    if (btnSayYes) {
      btnSayYes.style.transform = `scale(${Math.min(1.18, 1 + noButtonDodges * 0.03)})`;
    }
    if (e) {
      spawnFloatingToast('🥺 Sorry sorry sorry baby, say YES!', e.clientX, e.clientY);
    }
  }

  if (btnSayNo) {
    btnSayNo.addEventListener('mouseenter', dodgeNoButton);
    btnSayNo.addEventListener('click', (e) => {
      if (noButtonDodges >= 6) {
        triggerYesCelebration();
      } else {
        dodgeNoButton(e);
      }
    });
  }

  function triggerYesCelebration() {
    syncSelectedActivities();
    boostLoveMeter(100);
    if (window.loveAudio) window.loveAudio.playCelebrationFanfare();
    if (celebrationModal) celebrationModal.classList.add('open');

    // Multi-wave celebratory confetti
    fireConfetti({ particleCount: 100, spread: 90, origin: { y: 0.6 } });
    setTimeout(() => fireConfetti({ particleCount: 80, spread: 110, origin: { x: 0.25, y: 0.55 } }), 300);
    setTimeout(() => fireConfetti({ particleCount: 80, spread: 110, origin: { x: 0.75, y: 0.55 } }), 600);
  }

  if (btnSayYes) {
    btnSayYes.addEventListener('click', triggerYesCelebration);
  }

  if (btnCloseCelebration) {
    btnCloseCelebration.addEventListener('click', () => celebrationModal.classList.remove('open'));
  }
  if (btnDoneCelebration) {
    btnDoneCelebration.addEventListener('click', () => {
      fireConfetti({ particleCount: 90, spread: 100 });
      celebrationModal.classList.remove('open');
    });
  }
  if (btnMoreConfetti) {
    btnMoreConfetti.addEventListener('click', () => {
      if (window.loveAudio) window.loveAudio.playCelebrationFanfare();
      fireConfetti({ particleCount: 110, spread: 100 });
    });
  }

  // Keyboard shortcuts for modals
  document.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.classList.contains('open')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') openLightbox(currentLightboxIndex - 1);
      if (e.key === 'ArrowRight') openLightbox(currentLightboxIndex + 1);
    } else if (celebrationModal && celebrationModal.classList.contains('open') && e.key === 'Escape') {
      celebrationModal.classList.remove('open');
    }
  });

  // 11. Ambient Floating Petals & Hearts Canvas
  const canvas = document.getElementById('petals-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 6 + Math.random() * 8,
      speedY: 0.4 + Math.random() * 0.75,
      speedX: (Math.random() - 0.5) * 0.5,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.02,
      color: ['#ffb3c1', '#ff8fa3', '#ffccd5', '#fbcfe8'][Math.floor(Math.random() * 4)]
    }));

    function drawHeart(cx, cy, r, color, rot) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.42;
      ctx.moveTo(0, r * 0.35);
      ctx.bezierCurveTo(-r, -r * 0.4, -r * 0.5, -r * 1.1, 0, -r * 0.45);
      ctx.bezierCurveTo(r * 0.5, -r * 1.1, r, -r * 0.4, 0, r * 0.35);
      ctx.fill();
      ctx.restore();
    }

    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.angle) * 0.25;
        p.angle += p.spin;
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        drawHeart(p.x, p.y, p.size, p.color, p.angle);
      }
      requestAnimationFrame(animateCanvas);
    }
    animateCanvas();
  }
});
