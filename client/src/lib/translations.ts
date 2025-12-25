export type Language = 'en' | 'ko';

export interface Translations {
  // Common UI
  restart: string;
  level: string;
  stars: string;
  completed: string;
  back: string;
  chooseLevel: string;
  
  // Home page
  welcomeBack: string;
  welcomeNew: string;
  adventuresCompleted: string;
  letsKeepLearning: string;
  pickAdventure: string;
  mathAdventure: string;
  countSortSolve: string;
  historyAdventure: string;
  meetHeroes: string;
  adventureMode: string;
  worldProgress: string;
  math: string;
  history: string;
  adventure: string;
  parentInsights: string;
  progressFolder: string;
  notStarted: string;
  noProgressYet: string;
  completeHistory: string;
  rhythm: string;
  art: string;
  reflection: string;
  myArtwork: string;
  howIFelt: string;
  sessions: string;
  bestRhythm: string;
  badges: string;
  bonusPoints: string;
  rhythmGame: string;
  levelProgress: string;
  startAdventureInsight: string;
  allCompleteInsight: string;
  mathProgressInsight: string;
  historyProgressInsight: string;
  amazingProgressInsight: string;
  excellentProgressInsight: string;
  goodStartInsight: string;
  adventuresCompletedInsight: string;
  explorer: string;
  navigator: string;
  voyager: string;
  captain: string;
  copyright: string;
  pageTitle: string;
  
  // Math World
  mathWorldWelcome: string;
  mathWorldComplete: string;
  mathWorldProgress: string;
  
  // History World
  historyWorldWelcome: string;
  historyWorldComplete: string;
  historyWorldProgress: string;
  
  // Era Info
  moorsTitle: string;
  moorsDescription: string;
  innovatorsTitle: string;
  innovatorsDescription: string;
  pioneersTitle: string;
  pioneersDescription: string;
  
  // Math Level titles
  counting: string;
  shapes: string;
  patterns: string;
  sorting: string;
  comparing: string;
  
  // Game UI
  tapToContinue: string;
  correct: string;
  tryAgain: string;
  greatJob: string;
  levelComplete: string;
  starsEarned: string;
  nextLevel: string;
  backToWorld: string;
  startGame: string;
  playAgain: string;
  letsGo: string;
  
  // Adventure Mode
  adventureWelcome: string;
  adventureComplete: string;
  adventureProgress: string;
  
  // History figures
  tariqIbnZiyad: string;
  tariqDescription: string;
  
  // Instructions
  listenToStory: string;
  watchAndLearn: string;
  yourTurn: string;
  
  // Level UI
  checkMyAnswer: string;
  finish: string;
  amazingCorrect: string;
  oopsTryAgain: string;
  wonderfulJob: string;
  nextAdventure: string;
  animals: string;
  sounds: string;
  levelNotFound: string;
  help: string;
  learnedAbout: string;
  
  // Math Level Instructions
  mathL1Instruction: string;
  mathL2Instruction: string;
  mathL3Instruction: string;
  mathL4Instruction: string;
  mathL5Instruction: string;
  mathL6Instruction: string;
  mathL7Instruction: string;
  mathL8Instruction: string;
  mathL9Instruction: string;
  mathL10Instruction: string;
  
  // Sprout Hints
  hintCounting1: string;
  hintCounting2: string;
  hintCounting3: string;
  hintPatterns1: string;
  hintPatterns2: string;
  hintPatterns3: string;
  hintSequences1: string;
  hintSequences2: string;
  hintSequences3: string;
  hintTapSelect1: string;
  hintTapSelect2: string;
  hintTapSelect3: string;
  hintTapOrder1: string;
  hintTapOrder2: string;
  hintTapOrder3: string;
  hintSizeSelect1: string;
  hintSizeSelect2: string;
  hintSizeSelect3: string;
  hintAddition1: string;
  hintAddition2: string;
  hintAddition3: string;
  hintFractions1: string;
  hintFractions2: string;
  hintFractions3: string;
  
  // Adventure Level Content
  advL1Title: string;
  advL1Instruction: string;
  advL2Title: string;
  advL2Instruction: string;
  advL3Title: string;
  advL3Instruction: string;
  advL4Title: string;
  advL4Instruction: string;
  advL5Title: string;
  advL5Instruction: string;
  
  // Adventure Drag/Match Labels
  round: string;
  square: string;
  pointy: string;
  circle: string;
  triangle: string;
  red: string;
  yellow: string;
  purple: string;
  apple: string;
  banana: string;
  grapes: string;
  woof: string;
  meow: string;
  moo: string;
  
  // History Level Content
  histL1Greeting: string;
  histL1Activity: string;
  tariqJourneyTitle: string;
  tariqJourneyIntro: string;
  tariqJourneyDesc: string;
  startAdventure: string;
  tariqArtPrompt: string;
  tariqReflectionPrompt: string;
  
  // Tariq Reflection Overlay
  howDidTheyFeel: string;
  howDidTheyFeelDesc: string;
  pickFeelingColor: string;
  pickFeelingEmoji: string;
  whyPickFeelings: string;
  needIdeas: string;
  hideIdeas: string;
  thinkAboutQuestions: string;
  tellUsWhatYouThink: string;
  completeLevel: string;
  berbersName: string;
  berbersDesc: string;
  visigothsName: string;
  visigothsDesc: string;
  alliesName: string;
  alliesDesc: string;
  happyGold: string;
  braveRed: string;
  scaredPurple: string;
  curiousGreen: string;
  proudBlue: string;
  worriedGray: string;
  
  histL2Greeting: string;
  histL2Activity: string;
  histL3Greeting: string;
  histL3Activity: string;
  histL4Greeting: string;
  histL4Activity: string;
  histL5Greeting: string;
  histL5Activity: string;
  histL6Greeting: string;
  histL6Activity: string;
  histL7Greeting: string;
  histL7Activity: string;
  histL8Greeting: string;
  histL8Activity: string;
  histL9Greeting: string;
  histL9Activity: string;
  histL10Greeting: string;
  histL10Activity: string;
  
  // History Figure Names/Titles
  tariqTitle: string;
  abdAlRahmanName: string;
  abdAlRahmanTitle: string;
  averroesName: string;
  averroesTitle: string;
  paulJohnName: string;
  paulJohnTitle: string;
  maryGoldaName: string;
  maryGoldaTitle: string;
  williamName: string;
  williamTitle: string;
  maryKennerName: string;
  maryKennerTitle: string;
  kingSejongName: string;
  kingSejongTitle: string;
  ameliaName: string;
  ameliaTitle: string;
  hiddenFiguresName: string;
  hiddenFiguresTitle: string;
  
  // Drag Match Labels
  sun: string;
  moon: string;
  star: string;
  welcomeToSpain: string;
  hello: string;
  thankYouVeryMuch: string;
  howAreYou: string;
  yes: string;
  
  // Level 7 Invention Labels
  vacuum: string;
  lawnMower: string;
  toaster: string;
  sprinkler: string;
  washingMachine: string;
  electricCar: string;
  
  // History Level Titles
  histL1LevelTitle: string;
  histL1LevelDesc: string;
  histL2LevelTitle: string;
  histL2LevelDesc: string;
  histL3LevelTitle: string;
  histL3LevelDesc: string;
  histL4LevelTitle: string;
  histL4LevelDesc: string;
  histL5LevelTitle: string;
  histL5LevelDesc: string;
  histL6LevelTitle: string;
  histL6LevelDesc: string;
  histL7LevelTitle: string;
  histL7LevelDesc: string;
  histL8LevelTitle: string;
  histL8LevelDesc: string;
  histL9LevelTitle: string;
  histL9LevelDesc: string;
  histL10LevelTitle: string;
  histL10LevelDesc: string;
  
  // Math Level Titles
  mathL1LevelTitle: string;
  mathL1LevelDesc: string;
  mathL2LevelTitle: string;
  mathL2LevelDesc: string;
  mathL3LevelTitle: string;
  mathL3LevelDesc: string;
  mathL4LevelTitle: string;
  mathL4LevelDesc: string;
  mathL5LevelTitle: string;
  mathL5LevelDesc: string;
  mathL6LevelTitle: string;
  mathL6LevelDesc: string;
  mathL7LevelTitle: string;
  mathL7LevelDesc: string;
  mathL8LevelTitle: string;
  mathL8LevelDesc: string;
  mathL9LevelTitle: string;
  mathL9LevelDesc: string;
  mathL10LevelTitle: string;
  mathL10LevelDesc: string;
  
  // Badges
  badgeRhythmRookie: string;
  badgeRhythmRookieDesc: string;
  badgeRhythmMaster: string;
  badgeRhythmMasterDesc: string;
  badgeSpeedRacer: string;
  badgeSpeedRacerDesc: string;
  badgeArtExplorer: string;
  badgeArtExplorerDesc: string;
  badgeCreativeGenius: string;
  badgeCreativeGeniusDesc: string;
  badgeDeepThinker: string;
  badgeDeepThinkerDesc: string;
  badgeEmpathyStar: string;
  badgeEmpathyStarDesc: string;
  badgeVoyager: string;
  badgeVoyagerDesc: string;
  badgeCaptain: string;
  badgeCaptainDesc: string;
  earnedBadges: string;
  
  // Bonus Quest
  bonusQuest: string;
  bonusQuestWelcome: string;
  bonusQuestAmazing: string;
  bonusQuestGreat: string;
  bonusQuestGood: string;
  bonusQuestNote: string;
  bonusQuestGame: string;
  playBonusQuest: string;
  
  // Walkthrough UI
  walkthroughSkip: string;
  walkthroughBack: string;
  walkthroughNext: string;
  walkthroughLetsGo: string;
  
  // Counting walkthrough
  countingTitle1: string;
  countingDesc1: string;
  countingMascot1: string;
  countingTitle2: string;
  countingDesc2: string;
  countingMascot2: string;
  countingTitle3: string;
  countingDesc3: string;
  countingMascot3: string;
  countingTitle4: string;
  countingDesc4: string;
  countingMascot4: string;
  
  // Sorting walkthrough
  sortingTitle1: string;
  sortingDesc1: string;
  sortingMascot1: string;
  sortingTitle2: string;
  sortingDesc2: string;
  sortingMascot2: string;
  sortingTitle3: string;
  sortingDesc3: string;
  sortingMascot3: string;
  sortingTitle4: string;
  sortingDesc4: string;
  sortingMascot4: string;
  
  // Patterns walkthrough
  patternsTitle1: string;
  patternsDesc1: string;
  patternsMascot1: string;
  patternsTitle2: string;
  patternsDesc2: string;
  patternsMascot2: string;
  patternsTitle3: string;
  patternsDesc3: string;
  patternsMascot3: string;
  patternsTitle4: string;
  patternsDesc4: string;
  patternsMascot4: string;
  
  // Tap-select walkthrough
  tapSelectTitle1: string;
  tapSelectDesc1: string;
  tapSelectMascot1: string;
  tapSelectTitle2: string;
  tapSelectDesc2: string;
  tapSelectMascot2: string;
  tapSelectTitle3: string;
  tapSelectDesc3: string;
  tapSelectMascot3: string;
  tapSelectTitle4: string;
  tapSelectDesc4: string;
  tapSelectMascot4: string;
  
  // Addition walkthrough
  additionTitle1: string;
  additionDesc1: string;
  additionMascot1: string;
  additionTitle2: string;
  additionDesc2: string;
  additionMascot2: string;
  additionTitle3: string;
  additionDesc3: string;
  additionMascot3: string;
  additionTitle4: string;
  additionDesc4: string;
  additionMascot4: string;
  
  // Size-select walkthrough
  sizeSelectTitle1: string;
  sizeSelectDesc1: string;
  sizeSelectMascot1: string;
  sizeSelectTitle2: string;
  sizeSelectDesc2: string;
  sizeSelectMascot2: string;
  sizeSelectTitle3: string;
  sizeSelectDesc3: string;
  sizeSelectMascot3: string;
  sizeSelectTitle4: string;
  sizeSelectDesc4: string;
  sizeSelectMascot4: string;
  
  // Fractions walkthrough
  fractionsTitle1: string;
  fractionsDesc1: string;
  fractionsMascot1: string;
  fractionsTitle2: string;
  fractionsDesc2: string;
  fractionsMascot2: string;
  fractionsTitle3: string;
  fractionsDesc3: string;
  fractionsMascot3: string;
  fractionsTitle4: string;
  fractionsDesc4: string;
  fractionsMascot4: string;
  
  // Matching walkthrough
  matchingTitle1: string;
  matchingDesc1: string;
  matchingMascot1: string;
  matchingTitle2: string;
  matchingDesc2: string;
  matchingMascot2: string;
  matchingTitle3: string;
  matchingDesc3: string;
  matchingMascot3: string;
  matchingTitle4: string;
  matchingDesc4: string;
  matchingMascot4: string;
  
  // History walkthrough
  historyWalkTitle1: string;
  historyWalkDesc1: string;
  historyWalkMascot1: string;
  historyWalkTitle2: string;
  historyWalkDesc2: string;
  historyWalkMascot2: string;
  historyWalkTitle3: string;
  historyWalkDesc3: string;
  historyWalkMascot3: string;
  historyWalkTitle4: string;
  historyWalkDesc4: string;
  historyWalkMascot4: string;
  
  // Reflective Feedback
  feedbackAmazingJob: string;
  feedbackGreatEffort: string;
  feedbackKeepTrying: string;
  feedbackSproutThinking: string;
  feedbackHowYouSolvedIt: string;
  feedbackWhatWorkedWell: string;
  feedbackAnotherWay: string;
  feedbackTime: string;
  feedbackHints: string;
  feedbackSteps: string;
  feedbackTryAgain: string;
  feedbackNextLevel: string;
  feedbackDone: string;
  feedbackSuccessStrategy: string;
  feedbackSuccessWhatWorked: string;
  feedbackSuccessAlternative: string;
  feedbackSuccessEncouraging: string;
  feedbackPartialStrategy: string;
  feedbackPartialWhatWorked: string;
  feedbackPartialAlternative: string;
  feedbackPartialEncouraging: string;
  feedbackRetryStrategy: string;
  feedbackRetryWhatWorked: string;
  feedbackRetryAlternative: string;
  feedbackRetryEncouraging: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Common UI
    restart: "Restart",
    level: "Level",
    stars: "Stars",
    completed: "completed",
    back: "Back",
    chooseLevel: "Choose Your Level",
    
    // Home page
    welcomeBack: "Welcome back! You've completed",
    welcomeNew: "Hi! I'm Princess Amara! Pick an adventure with me and my friends!",
    adventuresCompleted: "adventures",
    letsKeepLearning: "Let's keep learning!",
    pickAdventure: "Pick an adventure with me and my friends!",
    mathAdventure: "Math Adventure",
    countSortSolve: "Count, sort, and solve puzzles!",
    historyAdventure: "History Adventure",
    meetHeroes: "Meet amazing heroes from the past!",
    adventureMode: "Adventure Mode",
    worldProgress: "World Progress",
    math: "Math",
    history: "History",
    adventure: "Adventure",
    parentInsights: "Parent Insights",
    progressFolder: "Progress Folder",
    notStarted: "Not Started",
    noProgressYet: "No progress yet",
    completeHistory: "Complete a History Adventure to see your work here!",
    rhythm: "Rhythm",
    art: "Art",
    reflection: "Reflection",
    myArtwork: "My Artwork",
    howIFelt: "How I Felt",
    sessions: "Sessions",
    bestRhythm: "Best Rhythm",
    badges: "Badges",
    bonusPoints: "Bonus Points",
    rhythmGame: "Rhythm Game",
    levelProgress: "Level {current} / {total}",
    startAdventureInsight: "Start an adventure to see insights about your child's learning progress!",
    allCompleteInsight: "Amazing! 25 adventures completed with 100 stars earned!",
    mathProgressInsight: "Great progress in Math ({count} levels)! Consider exploring more History adventures.",
    historyProgressInsight: "Great progress in History ({count} levels)! Consider exploring more Math adventures.",
    amazingProgressInsight: "Amazing! {count} adventures completed with {stars} stars earned!",
    excellentProgressInsight: "Excellent progress! {count} adventures completed. Keep up the great work!",
    goodStartInsight: "Good start! {count} adventures completed. Your child is learning well!",
    adventuresCompletedInsight: "{count} adventure(s) completed so far. Every step counts!",
    explorer: "Explorer",
    navigator: "Navigator",
    voyager: "Voyager",
    captain: "Captain",
    copyright: "© 2025 EDUNIPLAY",
    pageTitle: "Princess Amara's Learning Adventures",
    
    // Math World
    mathWorldWelcome: "Welcome to Math World! Let's count, sort, and solve puzzles together!",
    mathWorldComplete: "Amazing! You finished all the math adventures!",
    mathWorldProgress: "Great job! You've completed {count} math adventures. Keep going!",
    
    // History World
    historyWorldWelcome: "Welcome to History World! Let's meet amazing heroes from the past!",
    historyWorldComplete: "Wow! You've met all the historical heroes!",
    historyWorldProgress: "Fantastic! You've completed {count} history adventures. Who will you meet next?",
    
    // Era Info
    moorsTitle: "The Moors",
    moorsDescription: "Meet brilliant scholars and builders!",
    innovatorsTitle: "Native American & African Innovators",
    innovatorsDescription: "Discover amazing inventors and scientists!",
    pioneersTitle: "Asian Navigators & Women Pioneers",
    pioneersDescription: "Explore with brave explorers and mathematicians!",
    
    // Math Level titles
    counting: "Counting",
    shapes: "Shapes",
    patterns: "Patterns",
    sorting: "Sorting",
    comparing: "Comparing",
    
    // Game UI
    tapToContinue: "Tap to continue",
    correct: "Correct!",
    tryAgain: "Try again!",
    greatJob: "Great job!",
    levelComplete: "Level Complete!",
    starsEarned: "Stars Earned",
    nextLevel: "Next Level",
    backToWorld: "Back to World",
    startGame: "Start Game",
    playAgain: "Play Again",
    letsGo: "Let's Go!",
    
    // Adventure Mode
    adventureWelcome: "Welcome to Adventure Mode! Explore exciting challenges!",
    adventureComplete: "You completed the adventure!",
    adventureProgress: "Keep exploring! You've completed {count} adventures.",
    
    // History figures
    tariqIbnZiyad: "Tariq ibn Ziyad",
    tariqDescription: "A brave general who led the Moors to new lands in 711 CE",
    
    // Instructions
    listenToStory: "Listen to the story",
    watchAndLearn: "Watch and learn",
    yourTurn: "Your turn!",
    
    // Level UI
    checkMyAnswer: "Check My Answer!",
    finish: "Finish!",
    amazingCorrect: "Amazing! You got it right!",
    oopsTryAgain: "Oops! Try again, you can do it!",
    wonderfulJob: "Wonderful job! You did it!",
    nextAdventure: "Next Adventure",
    animals: "Animals",
    sounds: "Sounds",
    levelNotFound: "Level not found",
    help: "Help",
    learnedAbout: "Amazing! You learned about",
    
    // Math Level Instructions
    mathL1Instruction: "How many apples do you see?",
    mathL2Instruction: "Tap all the blue circles!",
    mathL3Instruction: "What comes next in the pattern?",
    mathL4Instruction: "What number is missing?",
    mathL5Instruction: "How many dogs do you see?",
    mathL6Instruction: "Which cup is medium sized? Tap it!",
    mathL7Instruction: "Let's add up the pizza!",
    mathL8Instruction: "Tap stars in order: 4 stars, 3 stars, 2 stars",
    mathL9Instruction: "Sort by size (use logic): Tap from biggest to smallest!",
    mathL10Instruction: "Select any number of crates that add up to 1 whole.",
    
    // Sprout Hints
    hintCounting1: "Count each one slowly!",
    hintCounting2: "Touch them as you count!",
    hintCounting3: "Start from the left!",
    hintPatterns1: "Look for what repeats!",
    hintPatterns2: "What comes after?",
    hintPatterns3: "See the pattern - 3 things repeat!",
    hintSequences1: "What number is missing?",
    hintSequences2: "Skip count by 2!",
    hintSequences3: "2, 4, 6... what's next?",
    hintTapSelect1: "Find all the same ones!",
    hintTapSelect2: "Tap the matching items!",
    hintTapSelect3: "There are 3 to find!",
    hintTapOrder1: "Which is biggest?",
    hintTapOrder2: "Put them in order!",
    hintTapOrder3: "Start with the most stars!",
    hintSizeSelect1: "Look at the sizes!",
    hintSizeSelect2: "Find the medium one!",
    hintSizeSelect3: "It's not the biggest or smallest!",
    hintAddition1: "Count the first group!",
    hintAddition2: "Count the second group!",
    hintAddition3: "Add them together!",
    hintFractions1: "Make it equal to 1!",
    hintFractions2: "Four quarters make 1!",
    hintFractions3: "Or two halves make 1!",
    
    // Adventure Level Content
    advL1Title: "Sort the Shapes",
    advL1Instruction: "Help Princess Amara sort the shapes into their homes!",
    advL2Title: "Star Collector",
    advL2Instruction: "Tap all the stars to collect them!",
    advL3Title: "Number Journey",
    advL3Instruction: "Tap the numbers in order from 1 to 5!",
    advL4Title: "Animal Sounds",
    advL4Instruction: "Match each animal to its sound!",
    advL5Title: "Fruit Basket",
    advL5Instruction: "Put each fruit in the right colored basket!",
    
    // Adventure Drag/Match Labels
    round: "Round",
    square: "Square",
    pointy: "Pointy",
    circle: "Circle",
    triangle: "Triangle",
    red: "Red",
    yellow: "Yellow",
    purple: "Purple",
    apple: "Apple",
    banana: "Banana",
    grapes: "Grapes",
    woof: "Woof!",
    meow: "Meow!",
    moo: "Moo!",
    
    // History Level Content
    histL1Greeting: "Hello young explorer! I led a daring journey across the sea to Spain. Can you help me trace the steps of my adventure?",
    histL1Activity: "Show the numbered steps to reach Spain!",
    tariqJourneyTitle: "Tariq's Journey to Spain",
    tariqJourneyIntro: "Let's learn about Tariq ibn Ziyad! He was a brave leader who sailed across the sea to Spain. Listen to the song and tap along!",
    tariqJourneyDesc: "Over 1,300 years ago, Tariq ibn Ziyad led ships across the sea from Africa to Spain. The famous Rock of Gibraltar is named after him - \"Jabal Tariq\" means \"Mountain of Tariq\"!",
    startAdventure: "Start the Adventure!",
    tariqArtPrompt: "Great job with the song! Now let's draw the Mountain of Gibraltar!",
    tariqReflectionPrompt: "Beautiful artwork! Now let's think about how different people felt during this adventure.",
    
    // Tariq Reflection Overlay
    howDidTheyFeel: "How Did They Feel?",
    howDidTheyFeelDesc: "Choose a color and emoji for how each group might have felt during Tariq's journey.",
    pickFeelingColor: "Pick a feeling color:",
    pickFeelingEmoji: "Pick a feeling emoji:",
    whyPickFeelings: "Why did you pick these feelings? (optional)",
    needIdeas: "Need Ideas?",
    hideIdeas: "Hide Ideas",
    thinkAboutQuestions: "Think about these questions:",
    tellUsWhatYouThink: "Tell us what you think each group felt during the journey...",
    completeLevel: "Complete Level!",
    berbersName: "Berbers",
    berbersDesc: "The brave explorers from North Africa",
    visigothsName: "Visigoths",
    visigothsDesc: "The people already living in Spain",
    alliesName: "Allies",
    alliesDesc: "Friends who helped on the journey",
    happyGold: "Happy (Gold)",
    braveRed: "Brave (Red)",
    scaredPurple: "Scared (Purple)",
    curiousGreen: "Curious (Green)",
    proudBlue: "Proud (Blue)",
    worriedGray: "Worried (Gray)",
    
    histL2Greeting: "Welcome! I built grand palaces and gardens in Córdoba. Let's design something amazing together!",
    histL2Activity: "Build the courtyard! Tap in order: Crane, Palace, Trees, Fountain, Flowers!",
    histL3Greeting: "Thinking is my favorite thing! I studied science and philosophy. Can you find the ideas?",
    histL3Activity: "Tap the ideas: Love, Knowledge, Art! (Not tools)",
    histL4Greeting: "Engineers love patterns! I helped design spacecraft. Let's put these pieces in order for launch!",
    histL4Activity: "Arrange for launch: Rocket, Satellite, then Star!",
    histL5Greeting: "Waqaa! The Yup'ik language is beautiful. Let me teach you some words and phrases we use every day. These are the words my parents taught me, and I taught my children and grandchildren. Now I share them with you.",
    histL5Activity: "Drag each Yup'ik word to its English meaning!",
    histL6Greeting: "Meet the inventor who brought his own spin to a bright idea! I built a windmill from scrap to bring electricity to my village!",
    histL6Activity: "Build the windmill! Tap in order: Gears, Bolts, then Wind!",
    histL7Greeting: "I invented clever tools like the sanitary belt and tissue holder. Can you find the inventions used INSIDE the home?",
    histL7Activity: "Tap only the inventions used INSIDE the home!",
    histL8Greeting: "I created Hangul so everyone could read and write! Let's learn the sounds together!",
    histL8Activity: "Drag each letter to its sound!",
    histL9Greeting: "I flew across oceans! Help me trace my flight path around the world!",
    histL9Activity: "Trace the flight! Tap in order: Plane, Ocean, then World!",
    histL10Greeting: "We used math to send astronauts to space! Let's count down together!",
    histL10Activity: "Tap the countdown in order: 5, 4, 3, 2, 1, then Rocket!",
    
    // History Figure Names/Titles
    tariqTitle: "Great General & Explorer",
    abdAlRahmanName: "Abd al-Rahman I",
    abdAlRahmanTitle: "The Builder King",
    averroesName: "Averroes",
    averroesTitle: "The Great Philosopher",
    paulJohnName: "Paul Joseph John",
    paulJohnTitle: "Yup'ik Elder and Cultural Leader",
    maryGoldaName: "Mary Golda Ross",
    maryGoldaTitle: "First Native American Female Engineer",
    williamName: "William Kamkwamba",
    williamTitle: "The Boy Who Harnessed a Win",
    maryKennerName: "Mary Beatrice Davidson Kenner",
    maryKennerTitle: "Brilliant Inventor",
    kingSejongName: "King Sejong",
    kingSejongTitle: "The Great King of Korea",
    ameliaName: "Amelia Earhart",
    ameliaTitle: "Brave Pilot & Explorer",
    hiddenFiguresName: "Obvious Figures",
    hiddenFiguresTitle: "No Calculator Needed: Meet NASA's Human Computers",
    
    // Drag Match Labels
    sun: "Sun",
    moon: "Moon",
    star: "Star",
    welcomeToSpain: "Welcome to Spain",
    hello: "Hello!",
    thankYouVeryMuch: "Thank you very much!",
    howAreYou: "How are you?",
    yes: "Yes!",
    
    // Level 7 Invention Labels
    vacuum: "Vacuum",
    lawnMower: "Lawn Mower",
    toaster: "Toaster",
    sprinkler: "Sprinkler",
    washingMachine: "Washing Machine",
    electricCar: "Electric Car",
    
    // History Level Titles
    histL1LevelTitle: "Meet Tariq",
    histL1LevelDesc: "Help Tariq with his ships!",
    histL2LevelTitle: "Build with Abd al-Rahman",
    histL2LevelDesc: "Build a beautiful courtyard!",
    histL3LevelTitle: "Think with Averroes",
    histL3LevelDesc: "Ideas or tools?",
    histL4LevelTitle: "Space Engineer",
    histL4LevelDesc: "Engineers love patterns!",
    histL5LevelTitle: "Yup'ik Words",
    histL5LevelDesc: "Learn with Paul!",
    histL6LevelTitle: "Build a Windmill",
    histL6LevelDesc: "His own spin on a bright idea!",
    histL7LevelTitle: "Sort Inventions",
    histL7LevelDesc: "Home or outdoors?",
    histL8LevelTitle: "Learn Hangul",
    histL8LevelDesc: "Match sounds and shapes!",
    histL9LevelTitle: "Fly with Amelia",
    histL9LevelDesc: "Trace the flight path!",
    histL10LevelTitle: "Launch the Rocket",
    histL10LevelDesc: "Count to liftoff!",
    
    // Math Level Titles
    mathL1LevelTitle: "Counting Fruit",
    mathL1LevelDesc: "Count the yummy fruits!",
    mathL2LevelTitle: "Sorting Shapes",
    mathL2LevelDesc: "Put shapes where they belong!",
    mathL3LevelTitle: "Matching Patterns",
    mathL3LevelDesc: "Find the pattern!",
    mathL4LevelTitle: "Complete the Sequence",
    mathL4LevelDesc: "What comes next?",
    mathL5LevelTitle: "Counting Animals",
    mathL5LevelDesc: "Count the cute animals!",
    mathL6LevelTitle: "Find the Right Size",
    mathL6LevelDesc: "Which cup is medium?",
    mathL7LevelTitle: "Pizza A-more",
    mathL7LevelDesc: "Let's add up the pizza!",
    mathL8LevelTitle: "Match Numbers",
    mathL8LevelDesc: "Numbers and groups!",
    mathL9LevelTitle: "Sort by Size",
    mathL9LevelDesc: "Big, medium, small!",
    mathL10LevelTitle: "Math Challenge",
    mathL10LevelDesc: "Use all your skills!",
    
    // Badges
    badgeRhythmRookie: "Rhythm Rookie",
    badgeRhythmRookieDesc: "Completed your first rhythm activity!",
    badgeRhythmMaster: "Rhythm Master",
    badgeRhythmMasterDesc: "Achieved 80%+ accuracy in rhythm!",
    badgeSpeedRacer: "Speed Racer",
    badgeSpeedRacerDesc: "Played at fast tempo!",
    badgeArtExplorer: "Art Explorer",
    badgeArtExplorerDesc: "Used 3+ different art elements!",
    badgeCreativeGenius: "Creative Genius",
    badgeCreativeGeniusDesc: "Unlocked advanced art tools!",
    badgeDeepThinker: "Deep Thinker",
    badgeDeepThinkerDesc: "Wrote a thoughtful reflection!",
    badgeEmpathyStar: "Empathy Star",
    badgeEmpathyStarDesc: "Explored multiple perspectives!",
    badgeVoyager: "Voyager",
    badgeVoyagerDesc: "Reached proficient growth level!",
    badgeCaptain: "Captain",
    badgeCaptainDesc: "Achieved advanced growth level!",
    earnedBadges: "Earned Badges:",
    
    // Bonus Quest
    bonusQuest: "Bonus Quest",
    bonusQuestWelcome: "Let's go on a special adventure together! Help me collect books, stars, and hearts!",
    bonusQuestAmazing: "Amazing! You collected so many treasures!",
    bonusQuestGreat: "Great job helping me collect treasures!",
    bonusQuestGood: "Good effort! Want to try again?",
    bonusQuestNote: "Your best score will be saved to your progress folder!",
    bonusQuestGame: "Bonus Quest Game",
    playBonusQuest: "Play Bonus Quest",
    
    // Walkthrough UI
    walkthroughSkip: "Skip",
    walkthroughBack: "Back",
    walkthroughNext: "Next →",
    walkthroughLetsGo: "Let's Go! 🚀",
    
    // Counting walkthrough
    countingTitle1: "Let's Count Together!",
    countingDesc1: "We're going to count how many items we see.",
    countingMascot1: "Hi friend! Let's count together! 🌟",
    countingTitle2: "Look Carefully",
    countingDesc2: "First, look at all the items on the screen.",
    countingMascot2: "Take your time to see everything!",
    countingTitle3: "Point and Count",
    countingDesc3: "Touch each item as you count. One... two... three!",
    countingMascot3: "Touch each one as you count!",
    countingTitle4: "Find Your Answer",
    countingDesc4: "Now tap the number that matches how many you counted.",
    countingMascot4: "You've got this! Pick the right number! 🎉",
    
    // Sorting walkthrough
    sortingTitle1: "Sorting Fun!",
    sortingDesc1: "We're going to put things where they belong.",
    sortingMascot1: "Let's organize things together! 🌈",
    sortingTitle2: "Look at the Groups",
    sortingDesc2: "See the different places where things can go?",
    sortingMascot2: "Each group has a special place!",
    sortingTitle3: "Match and Move",
    sortingDesc3: "Drag each item to the group where it fits best.",
    sortingMascot3: "Think about which ones are alike!",
    sortingTitle4: "Great Job!",
    sortingDesc4: "Keep going until everything is sorted!",
    sortingMascot4: "You're a sorting superstar! ⭐",
    
    // Patterns walkthrough
    patternsTitle1: "Pattern Detective!",
    patternsDesc1: "Let's find what comes next in the pattern.",
    patternsMascot1: "Patterns are like puzzles! 🧩",
    patternsTitle2: "Look for Clues",
    patternsDesc2: "See how things repeat? That's a pattern!",
    patternsMascot2: "What do you notice repeating?",
    patternsTitle3: "Think Ahead",
    patternsDesc3: "What should come next to continue the pattern?",
    patternsMascot3: "Hmm... what comes next? 🤔",
    patternsTitle4: "Choose Wisely",
    patternsDesc4: "Pick the answer that keeps the pattern going!",
    patternsMascot4: "Trust your pattern powers! ✨",
    
    // Tap-select walkthrough
    tapSelectTitle1: "Find the Circles!",
    tapSelectDesc1: "Let's find all the blue circles together.",
    tapSelectMascot1: "Let's go shape hunting! 🔵",
    tapSelectTitle2: "Look Carefully",
    tapSelectDesc2: "There are different shapes here. Find the circles!",
    tapSelectMascot2: "Circles are round like me!",
    tapSelectTitle3: "Tap Each One",
    tapSelectDesc3: "When you find a blue circle, tap it!",
    tapSelectMascot3: "Tap all the matching ones!",
    tapSelectTitle4: "Great Job!",
    tapSelectDesc4: "You found them all!",
    tapSelectMascot4: "You're a shape finder superstar! ⭐",
    
    // Addition walkthrough
    additionTitle1: "Pizza Adding Time!",
    additionDesc1: "Let's count pizza slices and add them together.",
    additionMascot1: "Yum! Math with pizza is the best! 🍕",
    additionTitle2: "Count the First Group",
    additionDesc2: "How many pizza slices are in the first box?",
    additionMascot2: "Count the first group carefully!",
    additionTitle3: "Count the Second Group",
    additionDesc3: "Now count the pizza slices in the second box.",
    additionMascot3: "Now count the other group!",
    additionTitle4: "Add Them Up!",
    additionDesc4: "Put them together. How many in total?",
    additionMascot4: "Add both groups together! 🎉",
    
    // Size-select walkthrough
    sizeSelectTitle1: "Size Detective!",
    sizeSelectDesc1: "Let's find the right size cup.",
    sizeSelectMascot1: "Big, medium, or small? 🥤",
    sizeSelectTitle2: "Look at All the Cups",
    sizeSelectDesc2: "See the different sized cups?",
    sizeSelectMascot2: "Some are big, some are tiny!",
    sizeSelectTitle3: "Find the Medium One",
    sizeSelectDesc3: "Which cup is not too big and not too small?",
    sizeSelectMascot3: "Right in the middle! 🤔",
    sizeSelectTitle4: "Tap Your Answer!",
    sizeSelectDesc4: "Tap the medium-sized cup!",
    sizeSelectMascot4: "You're a size expert! ⭐",
    
    // Fractions walkthrough
    fractionsTitle1: "Fraction Fun!",
    fractionsDesc1: "Let's make pieces add up to one whole.",
    fractionsMascot1: "Fractions are pieces of a pie! 🥧",
    fractionsTitle2: "Look at the Pieces",
    fractionsDesc2: "Each piece shows part of a whole.",
    fractionsMascot2: "1/2 means one of two pieces!",
    fractionsTitle3: "Pick Pieces That Fit",
    fractionsDesc3: "Choose pieces that add up to exactly one whole.",
    fractionsMascot3: "Two halves make a whole! 🤔",
    fractionsTitle4: "Complete the Whole!",
    fractionsDesc4: "Select all the pieces you need!",
    fractionsMascot4: "You're a fraction master! 🎉",
    
    // Matching walkthrough
    matchingTitle1: "Matching Time!",
    matchingDesc1: "Let's find things that go together.",
    matchingMascot1: "Finding pairs is so fun! 💫",
    matchingTitle2: "Look for Pairs",
    matchingDesc2: "Some things belong together, like shoes!",
    matchingMascot2: "Which ones are best friends?",
    matchingTitle3: "Connect Them",
    matchingDesc3: "Draw a line or tap to connect matching items.",
    matchingMascot3: "Connect the ones that match!",
    matchingTitle4: "Perfect Match!",
    matchingDesc4: "Keep matching until you find all the pairs!",
    matchingMascot4: "You're a matching master! 🏆",
    
    // History walkthrough
    historyWalkTitle1: "Time Travel Adventure!",
    historyWalkDesc1: "Let's learn about amazing people from the past.",
    historyWalkMascot1: "History is full of heroes! 🌍",
    historyWalkTitle2: "Meet Someone Special",
    historyWalkDesc2: "This person did something incredible!",
    historyWalkMascot2: "Listen to their story...",
    historyWalkTitle3: "Help Them Out",
    historyWalkDesc3: "Can you help complete their task?",
    historyWalkMascot3: "Let's help together!",
    historyWalkTitle4: "History Hero!",
    historyWalkDesc4: "You learned something amazing today!",
    historyWalkMascot4: "You're a history hero! 📚✨",
    
    // Reflective Feedback
    feedbackAmazingJob: "Amazing Job! 🎉",
    feedbackGreatEffort: "Great Effort! 💪",
    feedbackKeepTrying: "Keep Trying! 🌟",
    feedbackSproutThinking: "Sprout is thinking...",
    feedbackHowYouSolvedIt: "How You Solved It",
    feedbackWhatWorkedWell: "What Worked Well",
    feedbackAnotherWay: "Another Way",
    feedbackTime: "Time",
    feedbackHints: "Hints",
    feedbackSteps: "Steps",
    feedbackTryAgain: "Try Again 🔄",
    feedbackNextLevel: "Next Level →",
    feedbackDone: "Done",
    feedbackSuccessStrategy: "You found your own special way to solve it!",
    feedbackSuccessWhatWorked: "Your patience and thinking helped you succeed!",
    feedbackSuccessAlternative: "Next time, you could also try starting from a different spot!",
    feedbackSuccessEncouraging: "Sprout is so proud of you! You're a wonderful problem solver! 🌱✨",
    feedbackPartialStrategy: "You tried really hard and got close!",
    feedbackPartialWhatWorked: "You never gave up - that's amazing!",
    feedbackPartialAlternative: "Taking a small break can help your brain think of new ideas!",
    feedbackPartialEncouraging: "Every try teaches you something new! Keep going! 🌟",
    feedbackRetryStrategy: "You're learning how this puzzle works!",
    feedbackRetryWhatWorked: "Trying is the first step to learning!",
    feedbackRetryAlternative: "Try looking at the puzzle from a different angle!",
    feedbackRetryEncouraging: "Sprout believes in you! Let's try again together! 🌱",
  },
  ko: {
    // Common UI
    restart: "다시 시작",
    level: "레벨",
    stars: "별",
    completed: "완료",
    back: "뒤로",
    chooseLevel: "레벨을 선택하세요",
    
    // Home page
    welcomeBack: "다시 오셨네요!",
    welcomeNew: "안녕! 나는 아마라 공주야! 나와 친구들과 함께 모험을 떠나자!",
    adventuresCompleted: "개의 모험을 완료했어요",
    letsKeepLearning: "계속 배워봐요!",
    pickAdventure: "나와 친구들과 함께 모험을 골라봐!",
    mathAdventure: "수학 모험",
    countSortSolve: "세고, 정리하고, 퍼즐을 풀어봐요!",
    historyAdventure: "역사 모험",
    meetHeroes: "과거의 놀라운 영웅들을 만나봐요!",
    adventureMode: "모험 모드",
    worldProgress: "세계 진행 상황",
    math: "수학",
    history: "역사",
    adventure: "모험",
    parentInsights: "부모님 인사이트",
    progressFolder: "진행 폴더",
    notStarted: "시작 안 함",
    noProgressYet: "아직 진행 없음",
    completeHistory: "여기서 작업을 보려면 역사 모험을 완료하세요!",
    rhythm: "리듬",
    art: "예술",
    reflection: "반성",
    myArtwork: "내 작품",
    howIFelt: "내 기분",
    sessions: "세션",
    bestRhythm: "최고 리듬",
    badges: "배지",
    bonusPoints: "보너스 점수",
    rhythmGame: "리듬 게임",
    levelProgress: "레벨 {current} / {total}",
    startAdventureInsight: "아이의 학습 진행 상황을 보려면 모험을 시작하세요!",
    allCompleteInsight: "대단해요! 25개 모험 완료, 100개 별 획득!",
    mathProgressInsight: "수학 진행 상황이 좋아요 ({count}레벨)! 역사 모험도 탐험해 보세요.",
    historyProgressInsight: "역사 진행 상황이 좋아요 ({count}레벨)! 수학 모험도 탐험해 보세요.",
    amazingProgressInsight: "대단해요! {count}개 모험 완료, {stars}개 별 획득!",
    excellentProgressInsight: "훌륭한 진행! {count}개 모험 완료. 계속 잘하고 있어요!",
    goodStartInsight: "좋은 시작! {count}개 모험 완료. 아이가 잘 배우고 있어요!",
    adventuresCompletedInsight: "지금까지 {count}개 모험 완료. 모든 걸음이 중요해요!",
    explorer: "탐험가",
    navigator: "항해사",
    voyager: "여행자",
    captain: "선장",
    copyright: "© 2025 에듀니플레이",
    pageTitle: "아마라 공주의 학습 모험",
    
    // Math World
    mathWorldWelcome: "수학 세계에 오신 것을 환영합니다! 함께 세고, 정리하고, 퍼즐을 풀어봐요!",
    mathWorldComplete: "놀라워요! 모든 수학 모험을 완료했어요!",
    mathWorldProgress: "잘했어요! {count}개의 수학 모험을 완료했어요. 계속 해봐요!",
    
    // History World
    historyWorldWelcome: "역사 세계에 오신 것을 환영합니다! 과거의 놀라운 영웅들을 만나봐요!",
    historyWorldComplete: "와! 모든 역사 영웅들을 만났어요!",
    historyWorldProgress: "환상적이에요! {count}개의 역사 모험을 완료했어요. 다음에 누구를 만날까요?",
    
    // Era Info
    moorsTitle: "무어인",
    moorsDescription: "뛰어난 학자와 건축가를 만나봐요!",
    innovatorsTitle: "아메리카 원주민과 아프리카 혁신가",
    innovatorsDescription: "놀라운 발명가와 과학자를 발견하세요!",
    pioneersTitle: "아시아 항해사와 여성 개척자",
    pioneersDescription: "용감한 탐험가와 수학자들과 함께 탐험하세요!",
    
    // Math Level titles
    counting: "세기",
    shapes: "도형",
    patterns: "패턴",
    sorting: "분류",
    comparing: "비교",
    
    // Game UI
    tapToContinue: "계속하려면 탭하세요",
    correct: "정답!",
    tryAgain: "다시 해봐요!",
    greatJob: "잘했어요!",
    levelComplete: "레벨 완료!",
    starsEarned: "획득한 별",
    nextLevel: "다음 레벨",
    backToWorld: "세계로 돌아가기",
    startGame: "게임 시작",
    playAgain: "다시 하기",
    letsGo: "시작하자!",
    
    // Adventure Mode
    adventureWelcome: "모험 모드에 오신 것을 환영합니다! 신나는 도전을 탐험하세요!",
    adventureComplete: "모험을 완료했어요!",
    adventureProgress: "계속 탐험하세요! {count}개의 모험을 완료했어요.",
    
    // History figures
    tariqIbnZiyad: "타리크 이븐 지야드",
    tariqDescription: "711년에 무어인을 이끌고 새로운 땅으로 간 용감한 장군",
    
    // Instructions
    listenToStory: "이야기를 들어보세요",
    watchAndLearn: "보고 배우세요",
    yourTurn: "네 차례야!",
    
    // Level UI
    checkMyAnswer: "정답 확인!",
    finish: "완료!",
    amazingCorrect: "대단해! 정답이야!",
    oopsTryAgain: "앗! 다시 해봐, 할 수 있어!",
    wonderfulJob: "정말 잘했어! 해냈어!",
    nextAdventure: "다음 모험",
    animals: "동물",
    sounds: "소리",
    levelNotFound: "레벨을 찾을 수 없어요",
    help: "도움말",
    learnedAbout: "대단해! 배운 사람:",
    
    // Math Level Instructions
    mathL1Instruction: "사과가 몇 개 보이나요?",
    mathL2Instruction: "파란색 원을 모두 탭하세요!",
    mathL3Instruction: "패턴에서 다음에 오는 것은 무엇인가요?",
    mathL4Instruction: "빠진 숫자는 무엇인가요?",
    mathL5Instruction: "강아지가 몇 마리 보이나요?",
    mathL6Instruction: "중간 크기의 컵은 어느 것인가요? 탭하세요!",
    mathL7Instruction: "피자를 더해봐요!",
    mathL8Instruction: "순서대로 별을 탭하세요: 별 4개, 별 3개, 별 2개",
    mathL9Instruction: "크기 순서대로 (논리 사용): 가장 큰 것부터 가장 작은 것까지 탭하세요!",
    mathL10Instruction: "합이 1이 되는 상자들을 선택하세요.",
    
    // Sprout Hints
    hintCounting1: "하나씩 천천히 세어봐요!",
    hintCounting2: "세면서 하나씩 터치해봐요!",
    hintCounting3: "왼쪽부터 시작해요!",
    hintPatterns1: "무엇이 반복되는지 찾아봐요!",
    hintPatterns2: "다음에 뭐가 올까요?",
    hintPatterns3: "패턴을 봐요 - 3개가 반복돼요!",
    hintSequences1: "빠진 숫자가 뭘까요?",
    hintSequences2: "2씩 건너뛰어 세어봐요!",
    hintSequences3: "2, 4, 6... 다음은?",
    hintTapSelect1: "같은 것들을 모두 찾아봐요!",
    hintTapSelect2: "맞는 것들을 탭해요!",
    hintTapSelect3: "3개를 찾아야 해요!",
    hintTapOrder1: "어떤 게 가장 클까요?",
    hintTapOrder2: "순서대로 놓아봐요!",
    hintTapOrder3: "별이 가장 많은 것부터 시작해요!",
    hintSizeSelect1: "크기를 잘 봐요!",
    hintSizeSelect2: "중간 크기를 찾아봐요!",
    hintSizeSelect3: "가장 크지도 작지도 않은 것이에요!",
    hintAddition1: "첫 번째 그룹을 세어봐요!",
    hintAddition2: "두 번째 그룹을 세어봐요!",
    hintAddition3: "함께 더해봐요!",
    hintFractions1: "1이 되게 만들어요!",
    hintFractions2: "4분의 1이 4개면 1이에요!",
    hintFractions3: "또는 반이 2개면 1이에요!",
    
    // Adventure Level Content
    advL1Title: "도형 정리하기",
    advL1Instruction: "아마라 공주가 도형을 집에 정리하는 것을 도와주세요!",
    advL2Title: "별 모으기",
    advL2Instruction: "별을 모두 탭해서 모으세요!",
    advL3Title: "숫자 여행",
    advL3Instruction: "1부터 5까지 순서대로 숫자를 탭하세요!",
    advL4Title: "동물 소리",
    advL4Instruction: "각 동물을 소리와 맞춰보세요!",
    advL5Title: "과일 바구니",
    advL5Instruction: "각 과일을 맞는 색깔 바구니에 넣으세요!",
    
    // Adventure Drag/Match Labels
    round: "둥근",
    square: "네모",
    pointy: "뾰족한",
    circle: "원",
    triangle: "삼각형",
    red: "빨강",
    yellow: "노랑",
    purple: "보라",
    apple: "사과",
    banana: "바나나",
    grapes: "포도",
    woof: "멍멍!",
    meow: "야옹!",
    moo: "음메!",
    
    // History Level Content
    histL1Greeting: "안녕, 젊은 탐험가! 나는 바다를 건너 스페인으로 대담한 여행을 했어. 내 모험의 발자취를 따라가 볼래?",
    histL1Activity: "스페인에 도달하는 단계를 순서대로 보여주세요!",
    tariqJourneyTitle: "타리크의 스페인 여행",
    tariqJourneyIntro: "타리크 이븐 지야드에 대해 배워봐요! 그는 바다를 건너 스페인으로 항해한 용감한 지도자였어요. 노래를 듣고 함께 박자를 맞춰봐요!",
    tariqJourneyDesc: "1,300년 전, 타리크 이븐 지야드는 아프리카에서 스페인으로 배를 이끌었어요. 유명한 지브롤터 바위는 그의 이름을 따서 지어졌어요 - \"자발 타리크\"는 \"타리크의 산\"이라는 뜻이에요!",
    startAdventure: "모험 시작!",
    tariqArtPrompt: "노래 잘 했어요! 이제 지브롤터 산을 그려봐요!",
    tariqReflectionPrompt: "아름다운 그림이에요! 이제 이 모험에서 사람들이 어떻게 느꼈는지 생각해봐요.",
    
    // Tariq Reflection Overlay
    howDidTheyFeel: "그들은 어떤 기분이었을까요?",
    howDidTheyFeelDesc: "타리크의 여정에서 각 그룹이 어떤 기분이었을지 색깔과 이모지를 선택해보세요.",
    pickFeelingColor: "감정 색깔을 골라보세요:",
    pickFeelingEmoji: "감정 이모지를 골라보세요:",
    whyPickFeelings: "왜 이런 감정을 골랐나요? (선택사항)",
    needIdeas: "아이디어가 필요해요?",
    hideIdeas: "아이디어 숨기기",
    thinkAboutQuestions: "이 질문들을 생각해보세요:",
    tellUsWhatYouThink: "여정 중 각 그룹이 어떤 기분이었을지 말해주세요...",
    completeLevel: "레벨 완료!",
    berbersName: "베르베르인",
    berbersDesc: "북아프리카에서 온 용감한 탐험가들",
    visigothsName: "서고트족",
    visigothsDesc: "이미 스페인에 살고 있던 사람들",
    alliesName: "동맹",
    alliesDesc: "여정을 도와준 친구들",
    happyGold: "행복해요 (금색)",
    braveRed: "용감해요 (빨간색)",
    scaredPurple: "무서워요 (보라색)",
    curiousGreen: "궁금해요 (초록색)",
    proudBlue: "자랑스러워요 (파란색)",
    worriedGray: "걱정돼요 (회색)",
    
    histL2Greeting: "환영해요! 나는 코르도바에 웅장한 궁전과 정원을 지었어요. 함께 멋진 것을 디자인해봐요!",
    histL2Activity: "정원을 만들어요! 순서대로 탭하세요: 크레인, 궁전, 나무, 분수, 꽃!",
    histL3Greeting: "생각하는 것이 내가 가장 좋아하는 일이에요! 나는 과학과 철학을 공부했어요. 아이디어를 찾을 수 있나요?",
    histL3Activity: "아이디어를 탭하세요: 사랑, 지식, 예술! (도구가 아닌)",
    histL4Greeting: "엔지니어는 패턴을 좋아해요! 나는 우주선 설계를 도왔어요. 발사를 위해 이 조각들을 순서대로 놓아봐요!",
    histL4Activity: "발사 준비: 로켓, 위성, 그리고 별 순서로!",
    histL5Greeting: "와카! 유픽 언어는 아름다워요. 매일 사용하는 단어와 문구를 가르쳐 드릴게요. 이것은 부모님이 저에게 가르쳐 주신 단어들이고, 저는 자녀들과 손자들에게 가르쳤어요. 이제 여러분과 나누고 싶어요.",
    histL5Activity: "각 유픽 단어를 영어 의미로 드래그하세요!",
    histL6Greeting: "밝은 아이디어를 가진 발명가를 만나보세요! 나는 마을에 전기를 공급하기 위해 폐품으로 풍차를 만들었어요!",
    histL6Activity: "풍차를 만들어요! 순서대로 탭하세요: 기어, 볼트, 바람!",
    histL7Greeting: "나는 위생 벨트와 휴지 홀더 같은 똑똑한 도구들을 발명했어요. 집 안에서 사용하는 발명품을 찾을 수 있나요?",
    histL7Activity: "집 안에서 사용하는 발명품만 탭하세요!",
    histL8Greeting: "나는 모두가 읽고 쓸 수 있도록 한글을 만들었어요! 함께 소리를 배워봐요!",
    histL8Activity: "각 글자를 소리로 드래그하세요!",
    histL9Greeting: "나는 바다를 건너 날았어요! 세계 일주 비행 경로를 따라가는 것을 도와주세요!",
    histL9Activity: "비행 경로를 따라가요! 순서대로 탭하세요: 비행기, 바다, 세계!",
    histL10Greeting: "우리는 수학을 사용하여 우주비행사를 우주로 보냈어요! 함께 카운트다운을 해봐요!",
    histL10Activity: "순서대로 카운트다운을 탭하세요: 5, 4, 3, 2, 1, 로켓!",
    
    // History Figure Names/Titles
    tariqTitle: "위대한 장군이자 탐험가",
    abdAlRahmanName: "압드 알 라흐만 1세",
    abdAlRahmanTitle: "건축가 왕",
    averroesName: "아베로에스",
    averroesTitle: "위대한 철학자",
    paulJohnName: "폴 조셉 존",
    paulJohnTitle: "유픽 장로 및 문화 지도자",
    maryGoldaName: "메리 골다 로스",
    maryGoldaTitle: "최초의 원주민 여성 엔지니어",
    williamName: "윌리엄 캄콤바",
    williamTitle: "승리를 거머쥔 소년",
    maryKennerName: "메리 비어트리스 데이비슨 케너",
    maryKennerTitle: "뛰어난 발명가",
    kingSejongName: "세종대왕",
    kingSejongTitle: "한국의 위대한 왕",
    ameliaName: "아멜리아 에어하트",
    ameliaTitle: "용감한 조종사이자 탐험가",
    hiddenFiguresName: "어브비어스 피겨스",
    hiddenFiguresTitle: "계산기 필요 없음: NASA의 인간 컴퓨터를 만나보세요",
    
    // Drag Match Labels
    sun: "태양",
    moon: "달",
    star: "별",
    welcomeToSpain: "스페인에 오신 것을 환영합니다",
    hello: "안녕하세요!",
    thankYouVeryMuch: "정말 감사합니다!",
    howAreYou: "어떻게 지내세요?",
    yes: "네!",
    
    // Level 7 Invention Labels
    vacuum: "진공청소기",
    lawnMower: "잔디 깎는 기계",
    toaster: "토스터",
    sprinkler: "스프링클러",
    washingMachine: "세탁기",
    electricCar: "전기차",
    
    // History Level Titles
    histL1LevelTitle: "타리크 만나기",
    histL1LevelDesc: "타리크의 배를 도와주세요!",
    histL2LevelTitle: "압드 알 라흐만과 건설하기",
    histL2LevelDesc: "아름다운 정원을 만들어요!",
    histL3LevelTitle: "아베로에스와 생각하기",
    histL3LevelDesc: "아이디어일까, 도구일까?",
    histL4LevelTitle: "우주 엔지니어",
    histL4LevelDesc: "엔지니어는 패턴을 좋아해요!",
    histL5LevelTitle: "유픽 단어",
    histL5LevelDesc: "폴과 함께 배워요!",
    histL6LevelTitle: "풍차 만들기",
    histL6LevelDesc: "밝은 아이디어를 가진 발명가!",
    histL7LevelTitle: "발명품 분류하기",
    histL7LevelDesc: "집 안일까, 밖일까?",
    histL8LevelTitle: "Learn Hangul",
    histL8LevelDesc: "Match sounds and shapes!",
    histL9LevelTitle: "아멜리아와 날기",
    histL9LevelDesc: "비행 경로를 따라가요!",
    histL10LevelTitle: "로켓 발사",
    histL10LevelDesc: "발사까지 카운트다운!",
    
    // Math Level Titles
    mathL1LevelTitle: "과일 세기",
    mathL1LevelDesc: "맛있는 과일을 세어봐요!",
    mathL2LevelTitle: "도형 분류하기",
    mathL2LevelDesc: "도형을 제자리에 놓아요!",
    mathL3LevelTitle: "패턴 맞추기",
    mathL3LevelDesc: "패턴을 찾아봐요!",
    mathL4LevelTitle: "순서 완성하기",
    mathL4LevelDesc: "다음에 무엇이 올까요?",
    mathL5LevelTitle: "동물 세기",
    mathL5LevelDesc: "귀여운 동물들을 세어봐요!",
    mathL6LevelTitle: "알맞은 크기 찾기",
    mathL6LevelDesc: "중간 크기 컵은 어느 것일까요?",
    mathL7LevelTitle: "피자 아모레",
    mathL7LevelDesc: "피자를 더해봐요!",
    mathL8LevelTitle: "숫자 맞추기",
    mathL8LevelDesc: "숫자와 그룹!",
    mathL9LevelTitle: "크기별 분류",
    mathL9LevelDesc: "크고, 중간, 작은!",
    mathL10LevelTitle: "수학 도전",
    mathL10LevelDesc: "모든 기술을 사용해요!",
    
    // Badges
    badgeRhythmRookie: "리듬 신입",
    badgeRhythmRookieDesc: "첫 번째 리듬 활동을 완료했어요!",
    badgeRhythmMaster: "리듬 마스터",
    badgeRhythmMasterDesc: "리듬에서 80% 이상 정확도 달성!",
    badgeSpeedRacer: "스피드 레이서",
    badgeSpeedRacerDesc: "빠른 템포로 연주했어요!",
    badgeArtExplorer: "예술 탐험가",
    badgeArtExplorerDesc: "3개 이상의 예술 요소를 사용했어요!",
    badgeCreativeGenius: "창의적 천재",
    badgeCreativeGeniusDesc: "고급 예술 도구를 잠금 해제했어요!",
    badgeDeepThinker: "깊은 사고가",
    badgeDeepThinkerDesc: "사려 깊은 반성을 작성했어요!",
    badgeEmpathyStar: "공감의 별",
    badgeEmpathyStarDesc: "여러 관점을 탐구했어요!",
    badgeVoyager: "여행자",
    badgeVoyagerDesc: "숙련 성장 수준에 도달했어요!",
    badgeCaptain: "선장",
    badgeCaptainDesc: "고급 성장 수준을 달성했어요!",
    earnedBadges: "획득한 배지:",
    
    // Bonus Quest
    bonusQuest: "보너스 퀘스트",
    bonusQuestWelcome: "특별한 모험을 함께 떠나요! 책, 별, 하트를 모으는 것을 도와주세요!",
    bonusQuestAmazing: "놀라워요! 정말 많은 보물을 모았어요!",
    bonusQuestGreat: "보물 모으기를 잘 도와줬어요!",
    bonusQuestGood: "잘했어요! 다시 해볼까요?",
    bonusQuestNote: "최고 점수가 진행 폴더에 저장됩니다!",
    bonusQuestGame: "보너스 퀘스트 게임",
    playBonusQuest: "보너스 퀘스트 플레이",
    
    // Walkthrough UI
    walkthroughSkip: "건너뛰기",
    walkthroughBack: "뒤로",
    walkthroughNext: "다음 →",
    walkthroughLetsGo: "시작하자! 🚀",
    
    // Counting walkthrough
    countingTitle1: "함께 세어보자!",
    countingDesc1: "물건이 몇 개인지 세어볼 거예요.",
    countingMascot1: "안녕 친구! 함께 세어보자! 🌟",
    countingTitle2: "잘 살펴보세요",
    countingDesc2: "화면에 있는 모든 물건을 살펴보세요.",
    countingMascot2: "천천히 살펴보세요!",
    countingTitle3: "가리키며 세기",
    countingDesc3: "세면서 각 물건을 터치해요. 하나... 둘... 셋!",
    countingMascot3: "세면서 각각 터치해봐!",
    countingTitle4: "정답 찾기",
    countingDesc4: "센 숫자와 같은 숫자를 탭해주세요.",
    countingMascot4: "할 수 있어! 맞는 숫자를 골라봐! 🎉",
    
    // Sorting walkthrough
    sortingTitle1: "분류하기 재미있어!",
    sortingDesc1: "물건들을 제자리에 놓을 거예요.",
    sortingMascot1: "함께 정리하자! 🌈",
    sortingTitle2: "그룹 살펴보기",
    sortingDesc2: "물건이 갈 수 있는 다른 장소들이 보이나요?",
    sortingMascot2: "각 그룹에는 특별한 자리가 있어!",
    sortingTitle3: "맞추고 옮기기",
    sortingDesc3: "각 물건을 가장 잘 맞는 그룹으로 끌어다 놓으세요.",
    sortingMascot3: "어떤 것들이 비슷한지 생각해봐!",
    sortingTitle4: "잘했어요!",
    sortingDesc4: "모든 것이 분류될 때까지 계속해봐요!",
    sortingMascot4: "넌 분류 슈퍼스타야! ⭐",
    
    // Patterns walkthrough
    patternsTitle1: "패턴 탐정!",
    patternsDesc1: "패턴에서 다음에 뭐가 올지 찾아보자.",
    patternsMascot1: "패턴은 퍼즐 같아! 🧩",
    patternsTitle2: "단서 찾기",
    patternsDesc2: "반복되는 것이 보이나요? 그게 패턴이에요!",
    patternsMascot2: "뭐가 반복되는지 알겠어?",
    patternsTitle3: "앞서 생각하기",
    patternsDesc3: "패턴을 이어가려면 뭐가 와야 할까요?",
    patternsMascot3: "음... 다음엔 뭐가 올까? 🤔",
    patternsTitle4: "현명하게 선택하기",
    patternsDesc4: "패턴을 이어가는 답을 골라보세요!",
    patternsMascot4: "네 패턴 능력을 믿어! ✨",
    
    // Tap-select walkthrough
    tapSelectTitle1: "원을 찾아라!",
    tapSelectDesc1: "함께 파란 원을 모두 찾아보자.",
    tapSelectMascot1: "모양 사냥을 떠나자! 🔵",
    tapSelectTitle2: "잘 살펴보세요",
    tapSelectDesc2: "여기에 다른 모양들이 있어요. 원을 찾아봐요!",
    tapSelectMascot2: "원은 나처럼 둥글어!",
    tapSelectTitle3: "각각 탭하기",
    tapSelectDesc3: "파란 원을 찾으면 탭해주세요!",
    tapSelectMascot3: "같은 것들을 모두 탭해!",
    tapSelectTitle4: "잘했어요!",
    tapSelectDesc4: "전부 찾았어요!",
    tapSelectMascot4: "넌 모양 찾기 슈퍼스타야! ⭐",
    
    // Addition walkthrough
    additionTitle1: "피자 더하기 시간!",
    additionDesc1: "피자 조각을 세고 더해보자.",
    additionMascot1: "야! 피자로 수학하는 게 최고야! 🍕",
    additionTitle2: "첫 번째 그룹 세기",
    additionDesc2: "첫 번째 상자에 피자 조각이 몇 개 있나요?",
    additionMascot2: "첫 번째 그룹을 잘 세어봐!",
    additionTitle3: "두 번째 그룹 세기",
    additionDesc3: "이제 두 번째 상자에 피자 조각을 세어보세요.",
    additionMascot3: "이제 다른 그룹을 세어봐!",
    additionTitle4: "더해봐!",
    additionDesc4: "합치면 총 몇 개일까요?",
    additionMascot4: "두 그룹을 더해봐! 🎉",
    
    // Size-select walkthrough
    sizeSelectTitle1: "크기 탐정!",
    sizeSelectDesc1: "맞는 크기의 컵을 찾아보자.",
    sizeSelectMascot1: "크거나, 중간이거나, 작거나? 🥤",
    sizeSelectTitle2: "모든 컵 살펴보기",
    sizeSelectDesc2: "다른 크기의 컵들이 보이나요?",
    sizeSelectMascot2: "어떤 것은 크고, 어떤 것은 작아!",
    sizeSelectTitle3: "중간 것 찾기",
    sizeSelectDesc3: "너무 크지도 작지도 않은 컵은 어떤 거예요?",
    sizeSelectMascot3: "딱 중간! 🤔",
    sizeSelectTitle4: "정답을 탭해봐!",
    sizeSelectDesc4: "중간 크기 컵을 탭해주세요!",
    sizeSelectMascot4: "넌 크기 전문가야! ⭐",
    
    // Fractions walkthrough
    fractionsTitle1: "분수 재미!",
    fractionsDesc1: "조각들을 합쳐서 하나를 만들어보자.",
    fractionsMascot1: "분수는 파이 조각이야! 🥧",
    fractionsTitle2: "조각 살펴보기",
    fractionsDesc2: "각 조각은 전체의 일부를 나타내요.",
    fractionsMascot2: "1/2은 두 조각 중 하나야!",
    fractionsTitle3: "맞는 조각 고르기",
    fractionsDesc3: "정확히 하나를 만드는 조각들을 선택하세요.",
    fractionsMascot3: "반쪽 둘이면 하나가 돼! 🤔",
    fractionsTitle4: "전체 완성하기!",
    fractionsDesc4: "필요한 조각들을 모두 선택해주세요!",
    fractionsMascot4: "넌 분수 마스터야! 🎉",
    
    // Matching walkthrough
    matchingTitle1: "짝짓기 시간!",
    matchingDesc1: "어울리는 것들을 찾아보자.",
    matchingMascot1: "짝 찾기 정말 재미있어! 💫",
    matchingTitle2: "짝 찾아보기",
    matchingDesc2: "어떤 것들은 함께 어울려요, 신발처럼!",
    matchingMascot2: "어떤 것들이 친한 친구일까?",
    matchingTitle3: "연결하기",
    matchingDesc3: "어울리는 것들을 선이나 탭으로 연결하세요.",
    matchingMascot3: "어울리는 것들을 연결해!",
    matchingTitle4: "완벽한 짝!",
    matchingDesc4: "모든 짝을 찾을 때까지 계속해봐요!",
    matchingMascot4: "넌 짝짓기 마스터야! 🏆",
    
    // History walkthrough
    historyWalkTitle1: "시간 여행 모험!",
    historyWalkDesc1: "과거의 놀라운 사람들에 대해 배워보자.",
    historyWalkMascot1: "역사에는 영웅이 가득해! 🌍",
    historyWalkTitle2: "특별한 사람 만나기",
    historyWalkDesc2: "이 사람은 대단한 일을 했어요!",
    historyWalkMascot2: "그들의 이야기를 들어봐...",
    historyWalkTitle3: "도와주기",
    historyWalkDesc3: "그들의 일을 완성하는 걸 도와줄 수 있나요?",
    historyWalkMascot3: "함께 도와주자!",
    historyWalkTitle4: "역사 영웅!",
    historyWalkDesc4: "오늘 놀라운 것을 배웠어요!",
    historyWalkMascot4: "넌 역사 영웅이야! 📚✨",
    
    // Reflective Feedback
    feedbackAmazingJob: "정말 잘했어요! 🎉",
    feedbackGreatEffort: "열심히 했어요! 💪",
    feedbackKeepTrying: "계속 해봐요! 🌟",
    feedbackSproutThinking: "새싹이가 생각 중이에요...",
    feedbackHowYouSolvedIt: "어떻게 풀었나요",
    feedbackWhatWorkedWell: "잘한 점",
    feedbackAnotherWay: "다른 방법",
    feedbackTime: "시간",
    feedbackHints: "힌트",
    feedbackSteps: "단계",
    feedbackTryAgain: "다시 해보기 🔄",
    feedbackNextLevel: "다음 레벨 →",
    feedbackDone: "완료",
    feedbackSuccessStrategy: "네가 직접 특별한 방법을 찾았어!",
    feedbackSuccessWhatWorked: "인내심과 생각하는 힘이 성공을 도왔어!",
    feedbackSuccessAlternative: "다음에는 다른 곳에서 시작해볼 수도 있어!",
    feedbackSuccessEncouraging: "새싹이가 정말 자랑스러워해! 넌 훌륭한 문제 해결사야! 🌱✨",
    feedbackPartialStrategy: "정말 열심히 했고 거의 다 왔어!",
    feedbackPartialWhatWorked: "포기하지 않았어 - 대단해!",
    feedbackPartialAlternative: "잠깐 쉬면 새로운 아이디어가 떠오를 수 있어!",
    feedbackPartialEncouraging: "매번 시도할 때마다 새로운 것을 배워! 계속해봐! 🌟",
    feedbackRetryStrategy: "이 퍼즐이 어떻게 작동하는지 배우고 있어!",
    feedbackRetryWhatWorked: "시도하는 것이 배움의 첫걸음이야!",
    feedbackRetryAlternative: "퍼즐을 다른 각도에서 봐봐!",
    feedbackRetryEncouraging: "새싹이가 널 믿어! 다시 같이 해보자! 🌱",
  },
};

export function getTranslations(lang: Language): Translations {
  return translations[lang];
}

export function formatWelcomeMessage(lang: Language, completedLevels: number): string {
  const t = translations[lang];
  if (completedLevels > 0) {
    if (lang === 'en') {
      return `${t.welcomeBack} ${completedLevels} ${t.adventuresCompleted}. ${t.letsKeepLearning}`;
    } else {
      return `${t.welcomeBack} ${completedLevels}${t.adventuresCompleted}. ${t.letsKeepLearning}`;
    }
  }
  return t.welcomeNew;
}

export function formatMathMessage(lang: Language, completedCount: number): string {
  const t = translations[lang];
  if (completedCount === 0) {
    return t.mathWorldWelcome;
  } else if (completedCount === 10) {
    return t.mathWorldComplete;
  }
  return t.mathWorldProgress.replace('{count}', String(completedCount));
}

export function formatHistoryMessage(lang: Language, completedCount: number): string {
  const t = translations[lang];
  if (completedCount === 0) {
    return t.historyWorldWelcome;
  } else if (completedCount === 10) {
    return t.historyWorldComplete;
  }
  return t.historyWorldProgress.replace('{count}', String(completedCount));
}

export function getTranslatedLevelTitle(lang: Language, levelType: 'math' | 'history', levelId: number): { title: string; description: string } {
  const t = translations[lang];
  const prefix = levelType === 'math' ? 'mathL' : 'histL';
  const titleKey = `${prefix}${levelId}LevelTitle` as keyof Translations;
  const descKey = `${prefix}${levelId}LevelDesc` as keyof Translations;
  return {
    title: t[titleKey] as string,
    description: t[descKey] as string,
  };
}

const BADGE_ID_TO_KEY: Record<string, keyof Translations> = {
  rhythm_rookie: 'badgeRhythmRookie',
  rhythm_master: 'badgeRhythmMaster',
  speed_racer: 'badgeSpeedRacer',
  art_explorer: 'badgeArtExplorer',
  creative_genius: 'badgeCreativeGenius',
  deep_thinker: 'badgeDeepThinker',
  empathy_star: 'badgeEmpathyStar',
  voyager: 'badgeVoyager',
  captain: 'badgeCaptain',
};

export function getTranslatedBadgeName(lang: Language, badgeId: string): string {
  const t = translations[lang];
  const key = BADGE_ID_TO_KEY[badgeId];
  if (key) {
    return t[key] as string;
  }
  return badgeId;
}
