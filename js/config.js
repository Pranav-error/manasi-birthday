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
        { emoji: "😴", text: "You say you're nonchalant but saying that makes you the most CHALANT 🐒" },
        { emoji: "🤳", text: "Those biceps are impressive, I almost saw them for a second" },
        { emoji: "🍕", text: "says we should eat DBC having a cold because the chocolate in is hot" },
        { emoji: "💀", text: "Your dance moves look like you're fighting an invisible bee. And LOSING." },
        { emoji: "📱", text: "Replies to texts 3 days later with 'omg I just saw this' —  we ALL know you saw it." },
        { emoji: "🧠", text: "Has the memory of a goldfish but somehow remembers that embarrassing thing from 2019." },
        { emoji: "😤", text: "You’re proof that growing older doesn’t mean growing up." },
        { emoji: "🥺", text: "Acts tough but cries watching movies. Every. Single. Time." },
    ],

    // Silly life stats
    sillyStats: [
        { emoji: "😴", number: "7,665+", label: "Naps taken (and counting)" },
        { emoji: "🍕", number: "2,847", label: "Pizza slices consumed" },
        { emoji: "🤳", number: "∞", label: "Selfies in camera roll" },
        { emoji: "😂", number: "50,000+", label: "Times you made us laugh" },
        { emoji: "☕", number: "3,650+", label: "Cups of coffee ☕ needed" },
        { emoji: "📱", number: "3 days", label: "Avg text reply time" },
        { emoji: "🎵", number: "42,069", label: "Songs played on repeat" },
        { emoji: "🛒", number: "∞", label: '"I need this" purchases' },
        { emoji: "🐕", number: "10,000+", label: "Dogs pet on the street" },
        { emoji: "💅", number: "100%", label: "Iconic-ness level" },
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
        { text: `1) Happy Birthday to the perfect partner in crime, to the one who can fight ( or so she thinks ) and to one of the best people I know 🤩🤩\n2) Don't stop slaying and continue being the wonderful person you are 💪💃\n3) You are the Tom to my Jerry and the Max to my Eleven`, author: "Arya" },
        { text: "To one of the coolest(🤥) people I know, I honestly don't remember how we became friends, but I'm really glad we did.Happyyyy birthdayyyyy Manasisisi🍑🍑", author: "Reyna" },
        { text: "Happiestt bdayy to the prettiest girl i know, and uk that I would be the first person  to ask u out if I was a boy 😞🖤,anyways my chicken partner let's go on a biryani date 🫠", author: "your chicken partner(aka Asha)" },
        { text: "Happy Birthday Patti 🎉As annoying as you are, you’re just as amazing too — never change!And reminder: you are officially becoming an aunty now 😂✨", author: "pranav" },
        { text: "from seeing you for the first time and thinking she seems like a bitch to now thinking shes a bitch weve come a far way i dont have a sibling but youre the closest thing to one to my kaleshi aurat i hope you continue to shine like you always do your presence makes my day so much better happy birthday pattti", author: "Pragathi" },
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
        "🙌 Call yourself a bitch and scream YOUR LESBIAN",
        "🤪 Make the weirdest face possible for a photo",
        "🍕 You get free pizza today (just kidding... unless?)",
        "💑 Text your X 'hey' (no chickening out!)",
    ],

    // Birthday quiz (section replaced by Eras)
    quizQuestions: [],

    // Gift messages
    giftMessages: [
        "You're not just a friend, you're family ❤️ We love you more than words (and more than DBC, and that's saying A LOT) 🍕💫",
        "Here's your gift: unlimited hugs, eternal friendship, and the promise that we'll always have your back. No returns accepted! 🎁🤗",
        "The real gift was the memories we made along the way... jk we also got you cake in the mrng 🎂🎉",
    ],

    // Secret letter text
    letterText: `Dear patti ✨,

Okay so... writing this letter because saying all this out loud would be WAY too emotional and your mascara(if u have put on some) can't handle that right now 😂

But seriously — you are one of the most incredible animals on this planet. Your laugh is literally contagious (and kinda irritating but we love that), your heart is made of pure aluminum, and your ability to make everyone around you smile is a genuine superpower.

Thank you for being YOU. The random places we went, the bullying, and for always knowing exactly what to say(but not telling).

Here's to another year of being absolutely unhinged, wildly iconic, and unapologetically YOU.

Happy Birthday, Patti. hoping that u stop reading meesages from drop down We love you SO MUCH. 💖

— Your Friends 🤍`,
};
