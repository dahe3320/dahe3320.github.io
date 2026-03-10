import { useEffect, useCallback, useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';

// Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA',
];

const EasterEggs = () => {
  const [konamiActive, setKonamiActive] = useState(false);
  const [devConsole, setDevConsole] = useState(false);
  const [devInput, setDevInput] = useState('');
  const [devOutput, setDevOutput] = useState([
    { type: 'system', text: 'Daniel Hed Portfolio — Interactive Console' },
    { type: 'system', text: 'Ask me anything about Daniel, his work, or skills.' },
    { type: 'system', text: 'Type "help" for a list of topics.' },
  ]);
  const konamiProgress = { current: 0 };
  const outputRef = useRef(null);

  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [devOutput]);

  const triggerKonami = useCallback(() => {
    setKonamiActive(true);
    const emojis = ['🚀', '⚡', '💻', '🎮', '🎨', '✨', '🔥', '💎'];
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.cssText = `
          position: fixed;
          top: -50px;
          left: ${Math.random() * 100}vw;
          font-size: ${20 + Math.random() * 30}px;
          z-index: 100001;
          pointer-events: none;
          animation: eggFall ${2 + Math.random() * 3}s linear forwards;
        `;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 5000);
      }, i * 80);
    }
    setTimeout(() => setKonamiActive(false), 5000);
  }, []);

  // FAQ pattern matching system - detects keywords and provides relevant responses
  // Uses scoring: phrases > multiple keywords > single keywords
  // excludeKeywords prevents false matches
  const faqPatterns = [
    // ===== HIGH PRIORITY PHRASES (check first) =====
    
    // Portfolio creation - specific question
    {
      phrases: ['create this portfolio', 'build this portfolio', 'made this portfolio', 'create this site', 'build this site', 'how was this made', 'how did you make this', 'how did you build', 'how did you create', 'tech behind', 'built with'],
      keywords: ['portfolio', 'create', 'build', 'made', 'website', 'site'],
      minMatches: 2,
      responses: [
        'This portfolio is built with React and Vite. The styling uses Material-UI, animations are handled by Framer Motion, and there are some custom 3D elements scattered throughout.',
        'The tech stack includes React, Vite, Material-UI, and Framer Motion. The goal was to create something interactive that showcases both design and development skills.',
      ],
    },
    // Contact/Get in touch
    {
      phrases: ['get in touch', 'reach out', 'contact you', 'reach you', 'talk to you', 'connect with you', 'work with you', 'hire you', 'about a project', 'discuss a project'],
      keywords: ['contact', 'touch', 'reach', 'hire', 'project', 'work together', 'collaborate'],
      responses: [
        'Get in touch by clicking one of the contact links in the hero, the social speed dial to the left, or the links in the footer.',
        'Feel free to reach out via LinkedIn or GitHub. Links are in the hero, social speed dial, and footer. Always open to discussing new projects or opportunities.',
      ],
    },
    // Education/Study
    {
      phrases: ['what did you study', 'where did you study', 'your education', 'did you go to school', 'go to university', 'your degree', 'how did you learn', 'learn to code', 'learn programming'],
      keywords: ['study', 'education', 'university', 'school', 'degree', 'learn', 'course', 'training'],
      responses: [
        'I studied at the faculty of Media Technology and Data Science. Most practical knowledge comes from my employment, building real projects and continuous learning.',
        'Formal education provided the foundations, but a significant portion of my skills developed through hands-on project work and independent study.',
        'University study, documentation study, work-related experience, and practical experience.',
      ],
    },
    // Best skills
    {
      phrases: ['best skill', 'strongest skill', 'main skill', 'top skill', 'what are you good at', 'what are you best at', 'specialize in', 'specialty'],
      keywords: ['best', 'strongest', 'main', 'top', 'specialize', 'specialty', 'good at', 'excel'],
      excludeKeywords: ['project'],
      responses: [
        'Strongest areas are frontend development, PHP backend functionality, and creating enhanced user interfaces. Also experienced with 3D web development using Three.js (and R3F).',
        'Main strengths lie in React development and comprehensive PHP backend functionalities/system (Wordpress plugins or custom solutions). Comfortable across the full stack.',
      ],
    },
    // Favorite language/tech
    {
      phrases: ['favourite language', 'favorite language', 'favourite programming', 'favorite programming', 'preferred language', 'language do you like', 'language do you prefer', 'favourite tech', 'favorite tech'],
      keywords: ['favourite', 'favorite', 'prefer', 'language'],
      excludeKeywords: ['hobby', 'free time', 'personal'],
      responses: [
        'TypeScript is the primary choice for web development due to the type safety and tooling support. PHP/Laravel works well for scripting and backend tasks.',
        'Prefer TypeScript for most web projects. PHP/Laravel for backend tasks. The React ecosystem with TypeScript is the most productive environment for frontend work.',
      ],
    },
    // Personal life / hobbies
    {
      phrases: ['personal life', 'free time', 'spare time', 'outside of work', 'when not coding', 'hobbies', 'do for fun', 'like to do', 'interests outside'],
      keywords: ['personal', 'hobby', 'hobbies', 'free time', 'fun', 'interests', 'outside'],
      responses: [
        'Outside of work: I have a strong interest in gaming, reading, and follow football (watching and keeping up with the sport in general). Other than that, I really enjoy working on side projects that blur the line between hobby and development, exploring new technologies and sometimes 3D art in Blender!',
        'Interests include gaming, training and exercise, and building side projects. Currently exploring various backend/server technologies with GraphQL and Convex. Also has a great interest in movies and TV series!',
        'Gaming, creative projects, exercising, and football. Most hobbies tend to overlap with development interests in some way. I also have a big interest in films and series',
      ],
    },
    // What is R3F
    {
      phrases: ['what is r3f', 'what is react three fiber', 'r3f library', 'react three fiber', 'explain r3f'],
      keywords: ['r3f', 'react three fiber', 'three fiber'],
      responses: [
        'React Three Fiber. It is a React renderer for Three.js that lets you build 3D scenes using React components. Instead of writing imperative Three.js code, you can use declarative JSX to create meshes, lights, cameras, and animations.',
        'React Three Fiber is a library that brings Three.js to React. It allows you to build 3D graphics and WebGL content using familiar React patterns like components, hooks, and state management. Makes 3D development more intuitive for React developers.',
      ],
    },
    // Football - teams and players
    {
      phrases: ['favorite team', 'favourite team', 'favorite football', 'favourite football', 'football team', 'soccer team', 'which team', 'support which', 'favorite player', 'favourite player', 'best player'],
      keywords: ['team', 'football', 'soccer', 'player', 'allsvenskan', 'premier league', 'aik', 'liverpool'],
      excludeKeywords: ['game', 'video'],
      responses: [
        'I support AIK in Sweden. When I was younger I liked Liverpool, but nowadays I mostly watch other european leagues for the general interest in the sport rather than supporting a specific team.',
        'AIK is my team. I also watch other leagues in Europe aswell, but dont have any favourite team.',
        'Football-wise: AIK. Had a soft spot for Liverpool growing up, but these days I watch Premier League more as a neutral to enjoy the league.',
      ],
    },
    // Reading / Books
    {
      phrases: ['favorite book', 'favourite book', 'what do you read', 'reading habits', 'favorite genre', 'favourite genre', 'book recommendations', 'like to read'],
      keywords: ['book', 'books', 'read', 'reading', 'novel', 'novels', 'author', 'literature'],
      responses: [
        'Mostly fantasy: the A Song of Ice and Fire saga (Game of Thrones), Lord of the Rings, and the Rebel Moon series. Also enjoy Swedish crime novels and historical fiction, especially anything related to war history.',
        'Big fan of fantasy literature. ASOIAF and LOTR are favorites. Beyond fantasy, I read Swedish crime fiction and history-based novels.',
        'Reading preferences: fantasy (Game of Thrones books, Tolkien, Rebel Moon), Swedish crime novels (deckare, Johan Falk etc.), and historical novels covering events like wars and significant periods in history.',
      ],
    },
    // Favorite games
    {
      phrases: ['favorite game', 'favourite game', 'favorite video game', 'favourite video game', 'what games', 'play games', 'gaming preferences', 'best games'],
      keywords: ['game', 'games', 'gaming', 'video game', 'play', 'wow', 'skyrim', 'warcraft'],
      excludeKeywords: ['football', 'soccer', 'team'],
      responses: [
        'All-time favorite is World of Warcraft, though I no longer play it. Enjoyed it much more in the earlier expansions. Red Dead Redemption 2 is another big one. Also play Football Manager regularly, been playing that series for years. Skyrim and some of the Assassins Creed games are favorites too.',
        'World of Warcraft was my game for years, especially the earlier expansions. Stopped playing but it remains the all-time favorite. Currently enjoy Red Dead Redemption 2, Football Manager (a long-time staple), Skyrim, and some AC titles.',
        'WoW holds a special place, though the older expansions were better. Nowadays: Red Dead Redemption 2, Football Manager daily(!), Skyrim when the mood strikes, and a few Assassins Creed games.',
      ],
    },
    // Favorite movies and series
    {
      phrases: ['favorite movie', 'favourite movie', 'favorite film', 'favourite film', 'favorite series', 'favourite series', 'favorite show', 'favourite show', 'best movie', 'best series', 'movie recommendations', 'what to watch'],
      keywords: ['movie', 'movies', 'film', 'films', 'series', 'show', 'shows', 'tv', 'watch', 'cinema'],
      responses: [
        'Favorite genres: thrillers, detective/mystery, historical (especially war-related true stories), and sci-fi/fantasy.\n   Top 3 films: Inglourious Basterds, Arrival, Lord of the Rings: Return of the King.\n   Top 3 series: Breaking Bad, Game of Thrones, True Detective Season 1.',
        'Into thrillers, mystery, historical dramas based on real events, and sci-fi/fantasy. All-time favorite films are Inglourious Basterds, Arrival, and Return of the King. For series: Breaking Bad, Game of Thrones, and True Detective S1.',
        'Prefer thrillers, detective stories, history-based content, and sci-fi/fantasy. If I had to pick favorites: Inglourious Basterds, Arrival, LOTR Return of the King for films. Breaking Bad, Game of Thrones, True Detective Season 1 for series.',
      ],
    },
    // Personal strengths / traits
    {
      phrases: ['personal strength', 'your strengths', 'describe yourself', 'work style', 'how would you describe', 'what are your traits', 'personality at work', 'working style', 'team player', 'soft skills'],
      keywords: ['strength', 'strengths', 'trait', 'traits', 'personality', 'describe', 'character', 'soft skill'],
      excludeKeywords: ['skill', 'tech', 'programming', 'best skill'],
      responses: [
        'Versatile across different areas and adapt to various tasks. Value helping colleagues and am equally open to receiving help and learning from others. When problem-solving, I focus on finding the best possible solution rather than just the quickest one.',
        'Some key traits: adaptable to different roles and challenges, collaborative (both giving and receiving support), and thorough in ensuring solutions are properly thought through before implementation.',
        'Tend to be versatile and flexible in different situations. Enjoy helping others with their tasks and am open to input from teammates as a way to learn and improve. Approach problems methodically to ensure the solution is solid.',
      ],
    },
    // Why development / motivation
    {
      phrases: ['why programming', 'why development', 'why coding', 'why did you become', 'how did you start', 'what got you into', 'what made you', 'passion for'],
      keywords: ['why', 'motivation', 'become', 'start', 'passion'],
      excludeKeywords: ['create', 'build', 'portfolio', 'project'],
      responses: [
        'My first interest in the subject came from one of my first jobs after high school, where we worked with interactive whiteboards that were used in classrooms. It involved programming apps and games that would be used for educational purposes, and it sparked my curiosity in technology and building them. The ability to create something functional from code was the main draw.',
        'Got into programming through my first job after high school, where I worked with interactive whiteboards for schools. The problem-solving aspect and seeing ideas become functional products kept the interest going.',
      ],
    },
    // Career goals / motivations in life
    {
      phrases: ['career goal', 'future plans', 'where do you see yourself', 'long term', 'aspirations', 'what drives you', 'motivates you', 'goals in life'],
      keywords: ['goal', 'future', 'aspiration', 'motivation', 'drive', 'ambition', 'plan'],
      excludeKeywords: ['project', 'portfolio'],
      responses: [
        'Career focus is on continuing to build complex, user-focused applications and systems. Interested in roles that combine technical challenges with creative problem-solving.',
        'Looking to work on projects that involves smart technical solutions and boundaries. Growth in both technical depth and structures.',
        'Motivated by creating products that people actually use and enjoy, and has an genuine needs for users. Long-term interest in technical architecture and building scalable systems together with other people.',
      ],
    },
    
    // ===== GENERAL PATTERNS =====
    
    // Greetings (be careful not to match other "how" questions)
    {
      phrases: ['hello', 'hi there', 'hey there', 'good morning', 'good evening', 'good afternoon'],
      keywords: ['hello', 'hi', 'hey', 'greetings', 'howdy', 'hola', 'yo'],
      excludeKeywords: ['how', 'what', 'why', 'where', 'create', 'build', 'skill', 'project', 'work', 'study', 'contact'],
      exactMatch: true,
      responses: [
        'Hello. Feel free to ask anything about me, my work, or skills.',
        'Hi there. What would you like to know?',
        'Hey. Ask about skills, projects, experience, or anything else.',
      ],
    },
    // How are you (specific greeting)
    {
      phrases: ['how are you', 'how\'s it going', 'what\'s up', 'whats up', 'how do you do', 'how you doing'],
      keywords: ['how are', 'what\'s up', 'sup'],
      responses: [
        'Running smoothly. How can I help?',
        'All good here. What would you like to know?',
        'Doing well. What can I help you with?',
      ],
    },
    // Who/About questions
    {
      phrases: ['who is daniel', 'who are you', 'tell me about yourself', 'tell me about daniel', 'about yourself', 'introduce yourself', 'who made this'],
      keywords: ['who', 'about', 'introduce', 'yourself'],
      excludeKeywords: ['how', 'contact', 'hire'],
      responses: [
        'I am a full-stack developer based in Stockholm. Focus areas include web development, interactive UIs, and PHP backend functionality.',
        'Swedish developer specializing in building web applications. Works primarily with React and modern JavaScript/TypeScript ecosystems - in combination with backend technologies such as PHP and Node.',
      ],
    },
    // Location
    {
      phrases: ['where are you from', 'where do you live', 'where are you based', 'which country', 'where are you located'],
      keywords: ['where', 'location', 'live', 'from', 'country', 'city', 'based', 'sweden'],
      excludeKeywords: ['study', 'work', 'learn'],
      responses: [
        'Based in Sweden, works in Stockholm. Open for side projects and collaborations remotely.',
        'Located in Sweden. Available for remote projects collaboration.',
        'Sweden. Open to both local and remote projects.',
      ],
    },
    // Skills/Technologies (general)
    {
      phrases: ['what skills', 'your skills', 'what technologies', 'tech stack', 'what can you do', 'what do you know', 'programming languages', 'tools do you use'],
      keywords: ['skill', 'skills', 'tech', 'stack', 'technologies', 'language', 'framework', 'tool', 'know', 'use'],
      excludeKeywords: ['best', 'favourite', 'favorite', 'strongest'],
      responses: [
        'Core stack: React, TypeScript, Node.js, PHP, MySQL, Docker.\n   Also worked with: Next.js, Vue, PostgreSQL, Electron.',
        'Frontend: React, TypeScript, Styling (Tailwind, CSS/SASS, Material-UI or Tamagui)\n   Backend: Node.js, PHP/Laravel, MySQL\n',
        'Full-stack capabilities. Primary focus on React and TypeScript. Backend experience with Node.js and PHP/Laravel. Deployment through Docker, Vercel and Render.',
      ],
    },
    // React specific
    {
      phrases: ['about react', 'use react', 'react experience', 'react developer'],
      keywords: ['react'],
      excludeKeywords: ['what', 'skill', 'stack', 'all'],
      responses: [
        'React is the primary frontend framework. This portfolio uses React with Vite. Experienced with hooks, context, custom hooks, Zustand, and performance optimization. I also really enjoy R3F library :)',
        'Extensive React experience. Comfortable with the modern React ecosystem including hooks, state management solutions, and performance optimization techniques. Also a big fan of R3F!',
      ],
    },
    // Experience/Work
    {
      phrases: ['work experience', 'professional experience', 'job experience', 'where have you worked', 'your experience', 'career history'],
      keywords: ['experience', 'work', 'job', 'career', 'professional', 'employ', 'company', 'worked'],
      excludeKeywords: ['skill', 'language', 'react', 'portfolio', 'create', 'touch', 'contact'],
      responses: [
        'Experience spans various projects including React applications, enterprise software (self-made Wordpress plugin and custom solutions), and creative web experiences. See the Projects section for specific examples.',
        'Professional background in full-stack development, PHP/Wordpress Plugin development, and 3D web experiences. Project details available in the portfolio below.',
      ],
    },
    // Projects
    {
      phrases: ['your projects', 'show me projects', 'what projects', 'project examples', 'see your work', 'portfolio projects'],
      keywords: ['project', 'projects', 'built', 'examples'],
      excludeKeywords: ['touch', 'contact', 'hire', 'portfolio create', 'how'],
      responses: [
        'Featured projects include 3D product configurators, app development, game development, and various web applications. Details available in the Projects section below.',
        'Portfolio includes interactive 3D experiences, full-stack applications, and creative web projects. See the projects section to explore individual project details.',
      ],
    },
    // Availability/Hiring
    {
      phrases: ['are you available', 'available for hire', 'looking for work', 'open to opportunities', 'freelance work', 'job opportunities'],
      keywords: ['available', 'freelance', 'opportunity', 'open to', 'looking'],
      responses: [
        'Currently full-time employeed, but I am always open to discuss opportunities including full-time positions, and open for freelance work, and collaboration projects.',
        'Currently full-time employeed, but always interested in discussing potential projects or roles.',
        'Currently full-time employeed, but always interested to discuss possibilities! Feel free to reach out to discuss potential collaboration.',
      ],
    },
    // Thanks
    {
      phrases: ['thank you', 'thanks', 'appreciate it', 'that helps', 'helpful'],
      keywords: ['thank', 'thanks', 'appreciate', 'grateful', 'helpful'],
      responses: [
        'You\'re welcome. Let me know if you have other questions.',
        'Happy to help. Anything else you\'d like to know?',
        'No problem. Feel free to ask more.',
      ],
    },
    // Age/Personal
    {
      phrases: ['how old', 'your age', 'when were you born'],
      keywords: ['age', 'old', 'born', 'birthday'],
      responses: [
        'Prefer to keep that private. Happy to discuss professional experience and skills though.',
        'Not something I share publicly. Feel free to ask about work experience instead.',
      ],
    },
    // Compliments
    {
      phrases: ['great portfolio', 'nice portfolio', 'love this', 'looks great', 'well done', 'impressive', 'amazing work'],
      keywords: ['great', 'nice', 'love', 'awesome', 'amazing', 'impressive', 'cool', 'beautiful'],
      excludeKeywords: ['what', 'how', 'why', 'skill'],
      responses: [
        'Thanks, appreciate the feedback.',
        'Thank you. Glad you like it.',
        'Appreciate that. It was a fun project to build.',
      ],
    },
    // Goodbye
    {
      phrases: ['goodbye', 'bye', 'see you', 'gotta go', 'talk later'],
      keywords: ['bye', 'goodbye', 'later', 'cya', 'see ya'],
      responses: [
        'Goodbye. Thanks for stopping by.',
        'See you. Feel free to check out the projects below.',
        'Bye. Thanks for visiting.',
      ],
    },
  ];

  const getRandomResponse = (responses) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const findFaqResponse = (input) => {
    const lower = input.toLowerCase().trim();
    const words = lower.split(/\s+/);
    
    let bestMatch = null;
    let bestScore = 0;

    for (const pattern of faqPatterns) {
      let score = 0;
      
      // Check for phrase matches (highest priority)
      if (pattern.phrases) {
        for (const phrase of pattern.phrases) {
          if (lower.includes(phrase.toLowerCase())) {
            score += 100 + phrase.length; // Longer phrases = higher score
          }
        }
      }
      
      // Check for exclude keywords (skip this pattern if excluded word is found)
      if (pattern.excludeKeywords) {
        const hasExcluded = pattern.excludeKeywords.some(ex => lower.includes(ex.toLowerCase()));
        if (hasExcluded && score < 100) {
          // Only skip if we didn't match a phrase
          continue;
        }
      }
      
      // Check for exact match patterns (for greetings etc.)
      if (pattern.exactMatch && score === 0) {
        const isExactMatch = pattern.keywords.some(kw => 
          lower === kw.toLowerCase() || 
          words.length <= 2 && words.some(w => w === kw.toLowerCase())
        );
        if (!isExactMatch) continue;
        score += 50;
      }
      
      // Count keyword matches
      if (pattern.keywords && score < 100) {
        let keywordMatches = 0;
        for (const keyword of pattern.keywords) {
          if (lower.includes(keyword.toLowerCase())) {
            keywordMatches++;
            score += 10;
          }
        }
        
        // Check minimum matches requirement
        if (pattern.minMatches && keywordMatches < pattern.minMatches) {
          continue;
        }
      }
      
      // Update best match if this score is higher
      if (score > bestScore) {
        bestScore = score;
        bestMatch = pattern;
      }
    }
    
    if (bestMatch && bestScore > 0) {
      return getRandomResponse(bestMatch.responses);
    }
    
    return null;
  };

  const handleDevCommand = (cmd) => {
    const lower = cmd.trim().toLowerCase();
    const newOutput = [...devOutput, { type: 'input', text: `> ${cmd}` }];

    // Built-in commands take priority
    const commands = {
      help: 'Available topics: about, skills, projects, contact, experience, education, goals\n   Or ask naturally: "What technologies do you use?", "How can I contact you?"',
      about: 'Daniel Hed — Full-stack Developer based in Sweden. Focused on building performant web experiences.',
      skills: 'React, TypeScript, Node.js, Three.js, Laravel, PostgreSQL, Docker and more.',
      projects: 'See the Projects section below for detailed examples including 3D configurators, web apps, and creative experiments.',
      contact: 'LinkedIn and GitHub links available in the footer.',
      clear: '__CLEAR__',
      exit: '__EXIT__',
      close: '__EXIT__',
      matrix: 'Wake up, Neo... The Matrix has you.',
      coffee: 'Brewing... ERROR 418: I\'m a teapot',
      sudo: 'Nice try. No root access here.',
      ls: 'index.html  package.json  README.md  src/  public/  node_modules/',
      pwd: '/home/daniel/portfolio',
      whoami: 'guest@danielhed-portfolio',
      date: `${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
      time: `${new Date().toLocaleTimeString()}`,
    };

    let response = commands[lower];

    // If not a built-in command, try FAQ pattern matching
    if (!response) {
      response = findFaqResponse(cmd);
    }

    // If still no response, provide a helpful fallback
    if (!response) {
      const fallbacks = [
        `Not sure how to answer "${cmd}". Try "help" or ask about skills, projects, or experience.`,
        `Didn't catch that. Try asking about skills, projects, or contact information.`,
        `Not sure about that one. Type "help" for available topics.`,
      ];
      response = getRandomResponse(fallbacks);
    }

    if (response === '__CLEAR__') {
      setDevOutput([{ type: 'system', text: 'Console cleared.' }]);
    } else if (response === '__EXIT__') {
      setDevConsole(false);
    } else {
      newOutput.push({ type: 'output', text: response });
      setDevOutput(newOutput);
    }
    setDevInput('');
  };

  // Open console function for external trigger
  const openConsole = useCallback(() => {
    setDevConsole(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      // Konami code detection
      if (e.code === KONAMI[konamiProgress.current]) {
        konamiProgress.current++;
        if (konamiProgress.current === KONAMI.length) {
          konamiProgress.current = 0;
          triggerKonami();
        }
      } else {
        konamiProgress.current = 0;
      }

      // Press "?" or "/" to open console (when not in an input)
      if ((e.key === '?' || e.key === '/') && !devConsole) {
        const target = e.target;
        const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
        if (!isInput) {
          e.preventDefault();
          setDevConsole(true);
        }
      }

      // ESC to close
      if (e.key === 'Escape' && devConsole) {
        setDevConsole(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [triggerKonami, devConsole]);

  return (
    <>
      {/* Konami animation keyframes */}
      <style>{`
        @keyframes eggFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>

      {/* Konami celebration banner */}
      {konamiActive && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 100002,
            padding: '20px 40px',
            bgcolor: 'rgba(5, 22, 26, 0.95)',
            border: '2px solid #0f969c',
            borderRadius: '12px',
            backdropFilter: 'blur(12px)',
            animation: 'fadeInUp 0.5s ease',
            '@keyframes fadeInUp': {
              '0%': { opacity: 0, transform: 'translate(-50%, -40%)' },
              '100%': { opacity: 1, transform: 'translate(-50%, -50%)' },
            },
          }}
        >
          <Typography
            sx={{
              fontSize: '1.5rem',
              fontFamily: '"Orbitron", sans-serif !important',
              fontWeight: '700 !important',
              color: '#0f969c',
              textAlign: 'center',
            }}
          >
            🎮 KONAMI CODE ACTIVATED! 🎮
          </Typography>
          <Typography sx={{ color: '#6da5c0', textAlign: 'center', mt: 1, fontSize: '0.9rem' }}>
            You know the drill
          </Typography>
        </Box>
      )}

      {/* Ask Questions Floating Button */}
      {!devConsole && (
        <Box
          onClick={openConsole}
          sx={{
            position: 'fixed',
            bottom: 24,
            left: 24,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 2.5,
            py: 1.5,
            bgcolor: 'rgba(5, 22, 26, 0.95)',
            border: '1px solid #0f969c',
            borderRadius: '30px',
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: 'rgba(15, 150, 156, 0.15)',
              borderColor: '#6da5c0',
              transform: 'translateY(-2px)',
            },
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: '#0f969c',
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0.5 },
              },
            }}
          />
          <Typography
            sx={{
              color: '#f0f0f0',
              fontSize: '0.85rem',
              fontFamily: '"Kode Mono", monospace',
              fontWeight: 500,
            }}
          >
            Ask me anything
          </Typography>
          <Typography
            sx={{
              color: '#6da5c0',
              fontSize: '0.7rem',
              fontFamily: '"Kode Mono", monospace',
              px: 0.8,
              py: 0.2,
              bgcolor: 'rgba(15, 150, 156, 0.1)',
              borderRadius: '4px',
            }}
          >
            ?
          </Typography>
        </Box>
      )}

      {/* Dev Console */}
      {devConsole && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40vh',
            bgcolor: 'rgba(5, 22, 26, 0.97)',
            borderTop: '2px solid #0f969c',
            zIndex: 100000,
            display: 'flex',
            flexDirection: 'column',
            fontFamily: '"Kode Mono", monospace',
            backdropFilter: 'blur(12px)',
            animation: 'slideUp 0.3s ease',
            '@keyframes slideUp': {
              '0%': { transform: 'translateY(100%)' },
              '100%': { transform: 'translateY(0)' },
            },
          }}
        >
          {/* Console header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1, borderBottom: '1px solid rgba(15, 150, 156, 0.2)' }}>
            <Typography sx={{ color: '#0f969c', fontSize: '0.8rem', fontFamily: '"Orbitron", sans-serif !important' }}>
              ~/ask-me-anything
            </Typography>
            <Box
              onClick={() => setDevConsole(false)}
              sx={{
                px: 1.5,
                py: 0.3,
                fontSize: '0.7rem',
                color: '#ff5f57',
                border: '1px solid #ff5f57',
                borderRadius: '4px',
                cursor: 'pointer',
                '&:hover': { bgcolor: 'rgba(255, 95, 87, 0.15)' },
              }}
            >
              ESC
            </Box>
          </Box>

          {/* Output */}
          <Box ref={outputRef} sx={{ flex: 1, overflow: 'auto', px: 2, py: 1 }}>
            {devOutput.map((line, i) => (
              <Typography
                key={i}
                sx={{
                  fontSize: '0.8rem',
                  color: line.type === 'input' ? '#0f969c' : line.type === 'system' ? '#6da5c0' : '#f0f0f0',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {line.text}
              </Typography>
            ))}
          </Box>

          {/* Input */}
          <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1, borderTop: '1px solid rgba(15, 150, 156, 0.2)' }}>
            <Typography sx={{ color: '#0f969c', mr: 1, fontSize: '0.85rem' }}>›</Typography>
            <input
              autoFocus
              value={devInput}
              onChange={(e) => setDevInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && devInput.trim()) handleDevCommand(devInput);
                if (e.key === 'Escape') setDevConsole(false);
              }}
              placeholder="Type your question..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#f0f0f0',
                fontFamily: '"Kode Mono", monospace',
                fontSize: '0.85rem',
                caretColor: '#0f969c',
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default EasterEggs;