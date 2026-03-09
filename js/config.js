/* ═══════════════════════════════════════════════════════════════
   🎂 CONFIGURATION FILE — PERSONALIZE YOUR BIRTHDAY WEBSITE!
   ═══════════════════════════════════════════════════════════════ */

const CONFIG = {
    friendName: "Manasi",              // ← Change to your friend's name!
    petName: "Patti",                  // ← Her pet name/nickname
    birthday: "2005-03-12",            // ← Change to YYYY-MM-DD
    mediaFolder: "Pictures",           // ← Folder containing the media files

    // Video extensions (to distinguish from images)
    videoExtensions: [".mp4", ".mov", ".webm", ".avi", ".mkv"],

    // Birthday roasts (make these personal & funny!)
    roasts: [
        { emoji: "😴", text: "Remember that time you fell asleep during your OWN birthday party? Iconic behavior honestly." },
        { emoji: "🤳", text: "Takes 47 selfies to get 'the one' and then posts it with the caption 'first try lol'" },
        { emoji: "🍕", text: "Once cried because the pizza place was closed. Priorities = CORRECT." },
        { emoji: "💀", text: "Your dance moves look like you're fighting an invisible bee. And LOSING." },
        { emoji: "📱", text: "Replies to texts 3 days later with 'omg I just saw this' — babe we ALL know you saw it." },
        { emoji: "🧠", text: "Has the memory of a goldfish but somehow remembers that embarrassing thing from 2019." },
        { emoji: "😤", text: "Gets mad at GPS for 'being rude' when it says 'recalculating.' Ma'am, YOU missed the turn." },
        { emoji: "🥺", text: "Acts tough but cries watching puppy videos. Every. Single. Time." },
    ],

    // Silly life stats
    sillyStats: [
        { emoji: "😴", number: "4,380+", label: "Naps taken (and counting)" },
        { emoji: "🍕", number: "2,847", label: "Pizza slices consumed" },
        { emoji: "🤳", number: "∞", label: "Selfies in camera roll" },
        { emoji: "😂", number: "50,000+", label: "Times you made us laugh" },
        { emoji: "☕", number: "9,125", label: "Cups of coffee ☕ needed" },
        { emoji: "📱", number: "3 days", label: "Avg text reply time" },
        { emoji: "🎵", number: "42,069", label: "Songs played on repeat" },
        { emoji: "🛒", number: "∞", label: '"I need this" purchases' },
        { emoji: "🐕", number: "10,000+", label: "Dogs pet on the street" },
        { emoji: "💅", number: "100%", label: "Iconic-ness level" },
    ],

    // Scratch card secrets
    scratchSecrets: [
        "She once wore her shirt inside out ALL day and nobody told her 😭",
        "Still has a Spotify playlist called 'crying in the shower' from 2019 💀",
        "Googled 'how to adult' at least 14 times this year 🧠",
        "Has 847 unread emails and isn't even sorry about it 📧",
        "Once called the teacher 'Mom' in HIGH SCHOOL 😂",
        "Her search history includes 'is it bad to eat cereal for dinner every day' 🥣",
        "Cried watching Shrek. SHREK. The ogre movie. 🧅",
        "Still doesn't know her left from her right. It's been 20+ years. ↔️",
        "Once waved back at someone who wasn't waving at her. We all saw. 👋",
        "Has said 'I'll start the diet on Monday' every week since 2021 🍩",
        "Accidentally liked her crush's photo from 2017. The scroll of shame. 📱",
        "Laughed so hard she snorted milk out of her nose. In public. 🥛",
    ],

    // Magic 8-ball answers (birthday themed)
    eightBallAnswers: [
        "100% YES bestie!! 🎉",
        "The birthday gods say... YAAAS 👑",
        "Absolutely not lmaooo 💀",
        "Ask again after cake 🎂",
        "Signs point to you being iconic ✨",
        "My sources say SLAY 💅",
        "Better not tell you now (it's embarrassing) 😬",
        "Outlook: more pizza in your future 🍕",
        "Without a doubt, queen 👸",
        "Reply hazy, try eating cake first 🧁",
        "Don't count on it bestie 😂",
        "YES YES YES a thousand times YES 🥳",
        "The universe says... nah fam 😭",
        "Concentrate and ask again (jk idk either) 🤷",
        "It is certain... that you're getting older 👴",
    ],

    // Birthday wishes
    wishes: [
        { text: "Happy Birthday to the most chaotic, lovable, hilarious human I know! Never change (except maybe your texting speed) 😂💕", author: "Your BFF" },
        { text: "Another year of being absolutely unhinged and we LOVE you for it! Here's to more embarrassing stories! 🥂", author: "The Squad" },
        { text: "You're not getting older, you're getting... more experienced at being iconic. Happy Birthday legend! 👑", author: "Your No.1 Fan" },
        { text: "May your birthday be as bright and extra as you are! (and that's saying something because you are VERY extra) ✨", author: "With all the love" },
        { text: "To someone who makes ordinary days feel like adventures — Happy Birthday! Let's make this year even more unhinged! 🎢", author: "Your Partner in Crime" },
        { text: "You deserve the world and also a nap. Probably the nap first. Happy Birthday! 😴❤️", author: "Sleep Gang" },
    ],

    // Random popup messages
    popupMessages: [
        { emoji: "🎂", text: "PSA: It's someone's birthday and they're AMAZING!" },
        { emoji: "👀", text: "Plot twist: you're getting older 💀" },
        { emoji: "🎁", text: "Your gift is this website. You're welcome. 😤" },
        { emoji: "🧁", text: "Fun fact: you've now eaten approximately a TRUCK of cake in your lifetime 🚛" },
        { emoji: "🎈", text: "This balloon is for you! 🎈 (it's virtual, don't try to pop it)" },
        { emoji: "🤔", text: "Quick question: are you even real or just a main character? 💅" },
        { emoji: "📢", text: "ATTENTION: Birthday queen passing through! Make way! 👑" },
        { emoji: "🥳", text: "Reminder: you are legally required to have fun today." },
    ],

    // Spin wheel dares
    spinDares: [
        "💃 Do your best dance move RIGHT NOW",
        "🤳 Post the worst selfie on your story",
        "🎵 Sing happy birthday to yourself loudly",
        "😂 Tell everyone your most embarrassing story",
        "🙌 Call your bestie and scream HAPPY BIRTHDAY",
        "🤪 Make the weirdest face possible for a photo",
        "🍕 You get free pizza today (just kidding... unless?)",
        "💑 Text your crush 'hey' (no chickening out!)",
    ],

    // Birthday quiz (section replaced by Eras)
    quizQuestions: [],

    // Gift messages
    giftMessages: [
        "You're not just a friend, you're family ❤️ We love you more than words (and more than pizza, and that's saying A LOT) 🍕💫",
        "Here's your gift: unlimited hugs, eternal friendship, and the promise that we'll always have your back. No returns accepted! 🎁🤗",
        "The real gift was the memories we made along the way... jk we also got you cake 🎂🎉",
    ],

    // Secret letter text
    letterText: `Dear Birthday Superstar ✨,

Okay so... I'm writing this letter because saying all this out loud would be WAY too emotional and my mascara can't handle that right now 😂

But seriously — you are one of the most incredible humans on this planet. Your laugh is literally contagious (and kinda loud but we love that), your heart is made of pure gold, and your ability to make everyone around you smile is a genuine superpower.

Thank you for being YOU. For the late night talks, the random adventures, the ugly-crying movie nights, and for always knowing exactly what to say (or what meme to send).

Here's to another year of being absolutely unhinged, wildly iconic, and unapologetically YOU.

Happy Birthday, queen. We love you SO MUCH. 💖

— Your People 🤍`,
};
