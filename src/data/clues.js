const clues = [
  // =========================
  // BOLLYWOOD
  // =========================
  {
    id: "BW-01",
    category: "BOLLYWOOD",
    question: "In Munna Bhai M.B.B.S., what is Munna's real profession before becoming a doctor?",
    answer: "DON",
  },
  {
    id: "BW-02",
    category: "BOLLYWOOD",
    question: "In Welcome, what is Majnu Bhai famous for creating?",
    answer: "PAINTINGS",
  },
  {
    id: "BW-03",
    category: "BOLLYWOOD",
    question: "In Bhool Bhulaiyaa, what is the name of the spirit everyone fears?",
    answer: "MANJULIKA",
  },
  {
    id: "BW-04",
    category: "BOLLYWOOD",
    question: "In 3 Idiots, what is Rancho's real name?",
    answer: "PHUNSUKH",
  },
  {
    id: "BW-05",
    category: "BOLLYWOOD",
    question: "In Andaz Apna Apna, what is Teja's famous title?",
    answer: "CRIMEMASTER",
  },
  {
    id: "BW-06",
    category: "BOLLYWOOD",
    question: "In Dhamaal, what are the four friends searching for?",
    answer: "TREASURE",
  },
  {
    id: "BW-07",
    category: "BOLLYWOOD",
    question: "In PK, what does the alien search for on Earth?",
    answer: "GOD",
  },
  {
    id: "BW-08",
    category: "BOLLYWOOD",
    question: "In Drishyam, what evidence does Vijay hide to protect his family?",
    answer: "BODY",
  },
  {
    id: "BW-09",
    category: "BOLLYWOOD",
    question: "In Zindagi Na Milegi Dobara, which country do the friends travel through?",
    answer: "SPAIN",
  },
  {
    id: "BW-10",
    category: "BOLLYWOOD",
    question: "In Fukrey, what do the friends use to predict their future?",
    answer: "DREAMS",
  },
  {
    id: "BW-11",
    category: "BOLLYWOOD",
    question: "In Yeh Jawaani Hai Deewani, what is Bunny's dream profession?",
    answer: "TRAVELER",
  },
  {
    id: "BW-12",
    category: "BOLLYWOOD",
    question: "In Barfi!, what condition does Barfi have?",
    answer: "MUTE",
  },
  {
    id: "BW-13",
    category: "BOLLYWOOD",
    question: "In Queen, which country does Rani travel to after her wedding gets cancelled?",
    answer: "FRANCE",
  },
  {
    id: "BW-14",
    category: "BOLLYWOOD",
    question: "In Rockstar, what instrument does Janardhan play?",
    answer: "GUITAR",
  },
  {
    id: "BW-15",
    category: "BOLLYWOOD",
    question: "In Brahmāstra, what is Ranbir Kapoor's character's special power?",
    answer: "FIRE",
  },

  // =========================
  // HOLLYWOOD
  // =========================
  {
    id: "HW-01",
    category: "HOLLYWOOD",
    question: "In Avengers: Endgame, what does Thanos want to collect?",
    answer: "STONES",
  },
  {
    id: "HW-02",
    category: "HOLLYWOOD",
    question: "In The Matrix, which pill does Neo choose?",
    answer: "RED",
  },
  {
    id: "HW-03",
    category: "HOLLYWOOD",
    question: "In Avatar, what is the name of the blue species?",
    answer: "NA'VI",
  },

  // =========================
  // SONGS & MUSIC
  // =========================
  {
    id: "MU-01",
    category: "SONGS & MUSIC",
    question: 'Who sang the famous song "Kesariya"?',
    answer: "ARIJIT",
  },
  {
    id: "MU-02",
    category: "SONGS & MUSIC",
    question: 'Which movie has the song "Jai Jai Shivshankar"?',
    answer: "WAR",
  },
  {
    id: "MU-03",
    category: "SONGS & MUSIC",
    question: 'In "Naatu Naatu", which movie features this song?',
    answer: "RRR",
  },
  {
    id: "MU-04",
    category: "SONGS & MUSIC",
    question: '"Chaiyya Chaiyya" was performed on what?',
    answer: "TRAIN",
  },
  {
    id: "MU-05",
    category: "SONGS & MUSIC",
    question: '"Apna Bana Le" belongs to which movie?',
    answer: "BHEDIYA",
  },
  {
    id: "MU-06",
    category: "SONGS & MUSIC",
    question: '"Ghungroo" song is from which movie?',
    answer: "WAR",
  },
  {
    id: "MU-07",
    category: "SONGS & MUSIC",
    question: 'Which song has the famous line "Aankh Marey"?',
    answer: "SIMMBA",
  },
  {
    id: "MU-08",
    category: "SONGS & MUSIC",
    question: '"London Thumakda" belongs to which movie?',
    answer: "QUEEN",
  },
  {
    id: "MU-09",
    category: "SONGS & MUSIC",
    question: 'Which place is famous for the step "Lungi Dance"?',
    answer: "CHENNAI",
  },
  {
    id: "MU-10",
    category: "SONGS & MUSIC",
    question: 'Which song features the line "Abhi Toh Party Shuru Hui Hai"?',
    answer: "KHOOBSURAT",
  },

  // =========================
  // RIDDLES
  // =========================
  {
    id: "RD-01",
    category: "RIDDLES",
    question: "I am a color, but lovers search for me. I became famous with a song from a superhero movie. Who am I?",
    answer: "KESARIYA",
  },
  {
    id: "RD-02",
    category: "RIDDLES",
    question: "I have keys but open no doors. I have space but no room. Who am I?",
    answer: "KEYBOARD",
  },
  {
    id: "RD-03",
    category: "RIDDLES",
    question: "I have a face, two hands, but no arms. Who am I?",
    answer: "CLOCK",
  },
  {
    id: "RD-04",
    category: "RIDDLES",
    question: "I have teeth but I never bite. Who am I?",
    answer: "COMB",
  },
  {
    id: "RD-05",
    category: "RIDDLES",
    question: "I get shorter every time I work. What am I?",
    answer: "PENCIL",
  },
  {
    id: "RD-06",
    category: "RIDDLES",
    question: "I am always in front of you but can never be seen. What am I?",
    answer: "FUTURE",
  },
  {
    id: "RD-07",
    category: "RIDDLES",
    question: "I speak without a mouth and hear without ears. What am I?",
    answer: "ECHO",
  },
  {
    id: "RD-08",
    category: "RIDDLES",
    question: "I can be cracked, but I am not an egg. I can be broken, but I am not glass. What am I?",
    answer: "PASSWORD",
  },
  {
    id: "RD-09",
    category: "RIDDLES",
    question: "I have no body, but I have a heartbeat. What am I?",
    answer: "SERVER",
  },
  {
    id: "RD-10",
    category: "RIDDLES",
    question: "I have no legs, but I can make you run faster than anything. What am I?",
    answer: "DEADLINE",
  },
  {
    id: "RD-11",
    category: "RIDDLES",
    question: "I have cities but no houses, forests but no trees, and rivers but no water. What am I?",
    answer: "MAP",
  },
  {
    id: "RD-12",
    category: "RIDDLES",
    question: "I have 13 hearts but no organs. What am I?",
    answer: "CARDS",
  },
  {
    id: "RD-13",
    category: "RIDDLES",
    question: "What can you catch but never throw?",
    answer: "COLD",
  },
  {
    id: "RD-14",
    category: "RIDDLES",
    question: "What has many keys but cannot open a single lock?",
    answer: "PIANO",
  },
  {
    id: "RD-15",
    category: "RIDDLES",
    question: "What has an eye but cannot see, and lives in the middle of a storm?",
    answer: "HURRICANE",
  },
  {
    id: "RD-16",
    category: "RIDDLES",
    question: "What can run but never walks, has a bed but never sleeps?",
    answer: "RIVER",
  },
  {
    id: "RD-17",
    category: "RIDDLES",
    question: "What disappears the moment you say its name?",
    answer: "SILENCE",
  },
  {
    id: "RD-18",
    category: "RIDDLES",
    question: "A man shaves several times a day but still has a beard. Who is he?",
    answer: "BARBER",
  },
  {
    id: "RD-19",
    category: "RIDDLES",
    question: "What five-letter word becomes shorter when you add two letters to it?",
    answer: "SHORT",
  },
  {
    id: "RD-20",
    category: "RIDDLES",
    question: "What has a neck but no head and wears a cap?",
    answer: "BOTTLE",
  },
  {
    id: "RD-21",
    category: "RIDDLES",
    question: "What can be cracked, made, told and played?",
    answer: "JOKE",
  },
  {
    id: "RD-22",
    category: "RIDDLES",
    question: "If you have me, you want to share me. If you share me, you no longer have me. What am I?",
    answer: "SECRET",
  },
  {
    id: "RD-23",
    category: "RIDDLES",
    question: "If you overtake the person in second place, what place are you in?",
    answer: "SECOND",
  },

  // =========================
  // TECH
  // =========================
  {
    id: "TC-01",
    category: "TECH",
    question: "The brain of a computer?",
    answer: "CPU",
  },
  {
    id: "TC-02",
    category: "TECH",
    question: "The company behind the iPhone?",
    answer: "APPLE",
  },
  {
    id: "TC-03",
    category: "TECH",
    question: "The company that owns Instagram?",
    answer: "META",
  },
  {
    id: "TC-04",
    category: "TECH",
    question: "The company behind ChatGPT?",
    answer: "OPENAI",
  },
  {
    id: "TC-05",
    category: "TECH",
    question: "Google's AI chatbot?",
    answer: "GEMINI",
  },
  {
    id: "TC-06",
    category: "TECH",
    question: "A copy of important files?",
    answer: "BACKUP",
  },
  {
    id: "TC-07",
    category: "TECH",
    question: "The device that distributes Wi-Fi?",
    answer: "ROUTER",
  },
  {
    id: "TC-08",
    category: "TECH",
    question: "A computer's temporary memory?",
    answer: "RAM",
  },
  {
    id: "TC-09",
    category: "TECH",
    question: "Apple's mobile operating system?",
    answer: "IOS",
  },
  {
    id: "TC-10",
    category: "TECH",
    question: "Microsoft's operating system?",
    answer: "WINDOWS",
  },
  {
    id: "TC-11",
    category: "TECH",
    question: "The key commonly used to refresh a webpage?",
    answer: "F5",
  },
  {
    id: "TC-12",
    category: "TECH",
    question: "The language commonly used to style websites?",
    answer: "CSS",
  },
  {
    id: "TC-13",
    category: "TECH",
    question: "The language used to structure webpages?",
    answer: "HTML",
  },
  {
    id: "TC-14",
    category: "TECH",
    question: "The technology behind contactless payments?",
    answer: "NFC",
  },
];

// Get a random set of 3 clues with a random set number (1 - 10)
export function getRandomClueSet() {
  const setNumber = Math.floor(Math.random() * 10) + 1;
  const shuffled = [...clues].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).map((clue) => ({
    ...clue,
    set: setNumber,
  }));
}

export default clues;