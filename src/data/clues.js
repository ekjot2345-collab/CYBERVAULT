const clues = [
  // =========================
  // BOLLYWOOD
  // =========================

  {
    question: "In Munna Bhai M.B.B.S., what is Munna's real profession before becoming a doctor?",
    answer: "DON",
  },
  {
    question: "In Welcome, what is Majnu Bhai famous for creating?",
    answer: "PAINTINGS",
  },
  {
    question: "In Bhool Bhulaiyaa, what is the name of the spirit everyone fears?",
    answer: "MANJULIKA",
  },
  {
    question: "In 3 Idiots, what is Rancho's real name?",
    answer: "PHUNSUKH",
  },
  {
    question: "In Andaz Apna Apna, what is Teja's famous title?",
    answer: "CRIMEMASTER",
  },
  {
    question: "In Dhamaal, what are the four friends searching for?",
    answer: "TREASURE",
  },
  {
    question: "In PK, what does the alien search for on Earth?",
    answer: "GOD",
  },
  {
    question: "In Drishyam, what evidence does Vijay hide to protect his family?",
    answer: "BODY",
  },
  {
    question: "In Zindagi Na Milegi Dobara, which country do the friends travel through?",
    answer: "SPAIN",
  },
  {
    question: "In Fukrey, what do the friends use to predict their future?",
    answer: "DREAMS",
  },
  {
    question: "In Yeh Jawaani Hai Deewani, what is Bunny's dream profession?",
    answer: "TRAVELER",
  },
  {
    question: "In Barfi!, what condition does Barfi have?",
    answer: "MUTE",
  },
  {
    question: "In Queen, which country does Rani travel to after her wedding gets cancelled?",
    answer: "FRANCE",
  },
  {
    question: "In Rockstar, what instrument does Janardhan play?",
    answer: "GUITAR",
  },
  {
    question: "In Brahmāstra, what is Ranbir Kapoor's character's special power?",
    answer: "FIRE",
  },

  // =========================
  // HOLLYWOOD
  // =========================

  {
    question: "In Avengers: Endgame, what does Thanos want to collect?",
    answer: "STONES",
  },
  {
    question: "In The Matrix, which pill does Neo choose?",
    answer: "RED",
  },
  {
    question: "In Avatar, what is the name of the blue species?",
    answer: "NA'VI",
  },

  // =========================
  // SONGS & MUSIC
  // =========================

  {
    question: 'Who sang the famous song "Kesariya"?',
    answer: "ARijit".toUpperCase(),
  },
  {
    question: 'Which movie has the song "Jai Jai Shivshankar"?',
    answer: "WAR",
  },
  {
    question: 'In "Naatu Naatu", which movie features this song?',
    answer: "RRR",
  },
  {
    question: '"Chaiyya Chaiyya" was performed on what?',
    answer: "TRAIN",
  },
  {
    question: '"Apna Bana Le" belongs to which movie?',
    answer: "BHEDIYA",
  },
  {
    question: '"Ghungroo" song is from which movie?',
    answer: "WAR",
  },
  {
    question: 'Which song has the famous line "Aankh Marey"?',
    answer: "SIMMBA",
  },
  {
    question: '"London Thumakda" belongs to which movie?',
    answer: "QUEEN",
  },
  {
    question: 'Which place is famous for the step "Lungi Dance"?',
    answer: "CHENNAI",
  },
  {
    question: 'Which song features the line "Abhi Toh Party Shuru Hui Hai"?',
    answer: "KHOOBSURAT",
  },

  // =========================
  // RIDDLES
  // =========================

  {
    question: "I am a color, but lovers search for me. I became famous with a song from a superhero movie. Who am I?",
    answer: "KESARIYA",
  },
  {
    question: "I have keys but open no doors. I have space but no room. Who am I?",
    answer: "KEYBOARD",
  },
  {
    question: "I have a face, two hands, but no arms. Who am I?",
    answer: "CLOCK",
  },
  {
    question: "I have teeth but I never bite. Who am I?",
    answer: "COMB",
  },
  {
    question: "I get shorter every time I work. What am I?",
    answer: "PENCIL",
  },
  {
    question: "I am always in front of you but can never be seen. What am I?",
    answer: "FUTURE",
  },
  {
    question: "I speak without a mouth and hear without ears. What am I?",
    answer: "ECHO",
  },
  {
    question: "I can be cracked, but I am not an egg. I can be broken, but I am not glass. What am I?",
    answer: "PASSWORD",
  },
  {
    question: "I have no body, but I have a heartbeat. What am I?",
    answer: "SERVER",
  },
  {
    question: "I have no legs, but I can make you run faster than anything. What am I?",
    answer: "DEADLINE",
  },
  {
    question: "I have cities but no houses, forests but no trees, and rivers but no water. What am I?",
    answer: "MAP",
  },
  {
    question: "I have 13 hearts but no organs. What am I?",
    answer: "CARDS",
  },
  {
    question: "What can you catch but never throw?",
    answer: "COLD",
  },
  {
    question: "What has many keys but cannot open a single lock?",
    answer: "PIANO",
  },
  {
    question: "What has an eye but cannot see, and lives in the middle of a storm?",
    answer: "HURRICANE",
  },
  {
    question: "What can run but never walks, has a bed but never sleeps?",
    answer: "RIVER",
  },
  {
    question: "What disappears the moment you say its name?",
    answer: "SILENCE",
  },
  {
    question: "A man shaves several times a day but still has a beard. Who is he?",
    answer: "BARBER",
  },
  {
    question: "What five-letter word becomes shorter when you add two letters to it?",
    answer: "SHORT",
  },
  {
    question: "What has a neck but no head and wears a cap?",
    answer: "BOTTLE",
  },
  {
    question: "What can be cracked, made, told and played?",
    answer: "JOKE",
  },
  {
    question: "If you have me, you want to share me. If you share me, you no longer have me. What am I?",
    answer: "SECRET",
  },
  {
    question: "If you overtake the person in second place, what place are you in?",
    answer: "SECOND",
  },

  // =========================
  // TECH
  // =========================

  {
    question: "The brain of a computer?",
    answer: "CPU",
  },
  {
    question: "The company behind the iPhone?",
    answer: "APPLE",
  },
  {
    question: "The company that owns Instagram?",
    answer: "META",
  },
  {
    question: "The company behind ChatGPT?",
    answer: "OPENAI",
  },
  {
    question: "Google's AI chatbot?",
    answer: "GEMINI",
  },
  {
    question: "A copy of important files?",
    answer: "BACKUP",
  },
  {
    question: "The device that distributes Wi-Fi?",
    answer: "ROUTER",
  },
  {
    question: "A computer's temporary memory?",
    answer: "RAM",
  },
  {
    question: "Apple's mobile operating system?",
    answer: "IOS",
  },
  {
    question: "Microsoft's operating system?",
    answer: "WINDOWS",
  },
  {
    question: "The key commonly used to refresh a webpage?",
    answer: "F5",
  },
  {
    question: "The language commonly used to style websites?",
    answer: "CSS",
  },
  {
    question: "The language used to structure webpages?",
    answer: "HTML",
  },
  {
    question: "The technology behind contactless payments?",
    answer: "NFC",
  },
];


// Get a random set of 3 clues
export function getRandomClueSet() {
  const shuffled = [...clues].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

export default clues;