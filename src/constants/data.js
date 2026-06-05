// Predefined quotes categorized for the interactive Quote Generator
export const MOTIVATIONAL_QUOTES = {
  discipline: [
    { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
    { text: "We must all suffer one of two things: the pain of discipline or the pain of regret.", author: "Jim Rohn" },
    { text: "Self-discipline is the magic power that makes you virtually unstoppable.", author: "Brian Tracy" },
    { text: "Freedom is secured not by the fulfilling of one's desires, but by the removal of desire.", author: "Epictetus" }
  ],
  resilience: [
    { text: "Do not pray for an easy life, pray for the strength to endure a difficult one.", author: "Bruce Lee" },
    { text: "The impediment to action advances action. What stands in the way becomes the way.", author: "Marcus Aurelius" },
    { text: "Grit is passion and perseverance for very long-term goals.", author: "Angela Duckworth" },
    { text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche" }
  ],
  focus: [ // Note: earlier it was discipline, resilience, and vision. In App.jsx line 753 was: {['discipline', 'resilience', 'vision']}. Wait, let's keep it 'vision' or check.
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { text: "If you don't know where you are going, you'll end up somewhere else.", author: "Yogi Berra" },
    { text: "Your vision will become clear only when you can look into your own heart.", author: "Carl Jung" },
    { text: "Create the highest, grandest vision possible for your life, because you become what you believe.", author: "Oprah Winfrey" }
  ],
  vision: [ // Let's support both 'focus' and 'vision' just in case, to make it fully bulletproof!
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { text: "If you don't know where you are going, you'll end up somewhere else.", author: "Yogi Berra" },
    { text: "Your vision will become clear only when you can look into your own heart.", author: "Carl Jung" },
    { text: "Create the highest, grandest vision possible for your life, because you become what you believe.", author: "Oprah Winfrey" }
  ]
};

// Helper to get a random quote from a category
export const getRandomQuote = (category) => {
  const categoryQuotes = MOTIVATIONAL_QUOTES[category] || MOTIVATIONAL_QUOTES.discipline;
  const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
  return categoryQuotes[randomIndex];
};

// Assessment Questions for the Mindset Quiz
export const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    question: "When faced with a significant setback or failure, your immediate response is to:",
    options: [
      { text: "See it as proof of your limitations and feel discouraged.", score: 1 },
      { text: "Analyze what went wrong, but feel hesitant to try again immediately.", score: 2 },
      { text: "Reframe it as valuable feedback, adapt, and build a stronger plan.", score: 3 }
    ]
  },
  {
    id: 2,
    question: "How consistent are you with your daily habits and routines?",
    options: [
      { text: "Mainly reactive; I go with the flow of the day.", score: 1 },
      { text: "Consistent when motivated, but fall off during stress.", score: 2 },
      { text: "Disciplined and structured; habits are non-negotiable anchors.", score: 3 }
    ]
  },
  {
    id: 3,
    question: "When setting goals for yourself, you typically:",
    options: [
      { text: "Set vague aspirations without a timeline or execution plan.", score: 1 },
      { text: "Define clear goals, but struggle to break them into daily actions.", score: 2 },
      { text: "Establish a clear vision, key milestones, and a daily checklist.", score: 3 }
    ]
  },
  {
    id: 4,
    question: "How do you handle high-pressure environments or stressful situations?",
    options: [
      { text: "Experience anxiety that significantly degrades performance.", score: 1 },
      { text: "Manage to get through, but feel emotionally exhausted afterwards.", score: 2 },
      { text: "Thrive under pressure, using the stress as focus and energy.", score: 3 }
    ]
  },
  {
    id: 5,
    question: "When someone succeeds in your field, how do you feel?",
    options: [
      { text: "Envious or insecure, questioning your own path.", score: 1 },
      { text: "Happy for them, but sometimes compare yourself negatively.", score: 2 },
      { text: "Inspired; I study their strategies to accelerate my own growth.", score: 3 }
    ]
  }
];
