// Vidya — Demo & Fixture Data (Amazon Nova AI Hackathon 2026)

window.VidyaDemoData = (function () {

  const BOOK_SUGGESTIONS = {
    polity: {
      books: [
        { id: 'laxmikanth', name: 'Indian Polity', author: 'M. Laxmikanth', tag: 'popular', desc: 'The definitive UPSC reference — used by 95% of toppers' },
        { id: 'dd_basu', name: 'Introduction to the Constitution of India', author: 'D.D. Basu', tag: 'classic', desc: 'In-depth constitutional commentary for serious aspirants' },
        { id: 'pm_bakshi', name: 'The Constitution of India', author: 'P.M. Bakshi', tag: 'standard', desc: 'Bare-act companion with annotations' },
      ],
      courses: [
        { id: 'vision_polity', name: 'Indian Polity Comprehensive', provider: 'Vision IAS', tag: 'course', desc: 'Structured UPSC Polity video series with PYQ mapping' },
      ]
    },
    upsc: {
      books: [
        { id: 'laxmikanth', name: 'Indian Polity', author: 'M. Laxmikanth', tag: 'popular', desc: 'UPSC Polity Bible' },
        { id: 'spectrum', name: 'A Brief History of Modern India', author: 'Spectrum', tag: 'popular', desc: 'Most concise modern history for Prelims & Mains' },
        { id: 'ncert_old', name: 'NCERT Old Textbooks (6–12)', author: 'NCERT', tag: 'standard', desc: 'Foundation reading for all GS papers' },
        { id: 'bipin_chandra', name: 'India\'s Struggle for Independence', author: 'Bipan Chandra', tag: 'exam', desc: 'Deep dive into freedom movement for Mains' },
      ],
      courses: [
        { id: 'unacademy_upsc', name: 'UPSC CSE Comprehensive', provider: 'Unacademy', tag: 'course', desc: 'Full GS + CSAT coverage with daily MCQ practice' },
      ]
    },
    jee: {
      books: [
        { id: 'ncert_jee', name: 'NCERT Mathematics (11 & 12)', author: 'NCERT', tag: 'standard', desc: 'Non-negotiable foundation for every JEE aspirant' },
        { id: 'arihant', name: 'Skills in Mathematics Series', author: 'Arihant (Amit M. Agarwal)', tag: 'popular', desc: 'The go-to practice book for JEE Mains & Advanced' },
        { id: 'sl_loney', name: 'Trigonometry & Coordinate Geometry', author: 'S.L. Loney', tag: 'advanced', desc: 'Classic for Coordinate Geometry mastery' },
        { id: 'hall_knight', name: 'Higher Algebra', author: 'Hall & Knight', tag: 'advanced', desc: 'Algebra depth for JEE Advanced level' },
      ],
      courses: [
        { id: 'allen_jee', name: 'JEE Mathematics', provider: 'Allen Career Institute', tag: 'course', desc: 'Chapter-wise modules with 5000+ practice problems' },
        { id: 'physics_wallah', name: 'JEE Maths Alakh Pandey', provider: 'Physics Wallah', tag: 'course', desc: 'Free comprehensive JEE prep with concept videos' },
      ]
    },
    calculus: {
      books: [
        { id: 'ncert_12', name: 'NCERT Mathematics Part-1 (Class 12)', author: 'NCERT', tag: 'standard', desc: 'Chapters 5–6: Continuity, Differentiability, Applications of Derivatives' },
        { id: 'arihant_calc', name: 'Integral Calculus for JEE', author: 'Arihant', tag: 'popular', desc: '500+ solved problems from basics to advanced integration' },
        { id: 'thomas', name: 'Thomas\' Calculus', author: 'George B. Thomas', tag: 'advanced', desc: 'University-level comprehensive calculus reference' },
      ],
      courses: []
    },
    bioinformatics: {
      books: [
        { id: 'compeau', name: 'Bioinformatics Algorithms: An Active Learning Approach', author: 'Compeau & Pevzner', tag: 'popular', desc: 'The definitive textbook — used at UCSD, IITs, and IISc' },
        { id: 'durbin', name: 'Biological Sequence Analysis', author: 'Durbin, Eddy, Krogh & Mitchison', tag: 'advanced', desc: 'HMMs, probabilistic models — graduate-level reference' },
        { id: 'jones_pevzner', name: 'An Introduction to Bioinformatics Algorithms', author: 'Jones & Pevzner', tag: 'standard', desc: 'Algorithm-focused, rigorous mathematical treatment' },
      ],
      courses: [
        { id: 'nptel_bioinfo', name: 'Algorithmic Thinking in Bioinformatics', provider: 'IIT Madras (NPTEL)', tag: 'course', desc: 'Complete course: De Bruijn graphs, DP, pattern matching, phylogenetics' },
        { id: 'coursera_bioinfo', name: 'Bioinformatics Specialization', provider: 'UC San Diego (Coursera)', tag: 'course', desc: 'Compeau & Pevzner\'s 7-course series with interactive exercises' },
      ]
    },
    'machine learning': {
      books: [
        { id: 'bishop', name: 'Pattern Recognition and Machine Learning', author: 'Christopher Bishop', tag: 'advanced', desc: 'The Bayesian ML bible — graduate-level rigour' },
        { id: 'hastie', name: 'The Elements of Statistical Learning', author: 'Hastie, Tibshirani & Friedman', tag: 'advanced', desc: 'Free PDF — dense but comprehensive' },
        { id: 'goodfellow', name: 'Deep Learning', author: 'Goodfellow, Bengio & Courville', tag: 'popular', desc: 'The standard deep learning textbook (also free online)' },
        { id: 'hands_on_ml', name: 'Hands-On Machine Learning', author: 'Aurélien Géron', tag: 'exam', desc: 'Practical ML with scikit-learn & TensorFlow — best for practitioners' },
      ],
      courses: [
        { id: 'ng_coursera', name: 'Machine Learning Specialization', provider: 'Andrew Ng (Coursera)', tag: 'course', desc: '3-course series — the world\'s most popular ML course' },
        { id: 'fast_ai', name: 'Practical Deep Learning', provider: 'fast.ai', tag: 'course', desc: 'Top-down practical approach — code first, theory second' },
        { id: 'nptel_ml', name: 'Machine Learning for Engineering', provider: 'IIT Madras (NPTEL)', tag: 'course', desc: 'Rigorous theoretical ML with proofs and derivations' },
      ]
    },
    neet: {
      books: [
        { id: 'ncert_bio', name: 'NCERT Biology (11 & 12)', author: 'NCERT', tag: 'popular', desc: 'The only biology book you truly need for NEET' },
        { id: 'trueman_bio', name: 'Trueman\'s Objective Biology', author: 'Trueman', tag: 'exam', desc: '10,000+ MCQs for rapid NEET practice' },
        { id: 'dc_pandey', name: 'Objective Physics for NEET', author: 'D.C. Pandey', tag: 'popular', desc: 'Chapter-wise theory + solved examples for NEET Physics' },
      ],
      courses: []
    },
    default: {
      books: [
        { id: 'custom_book', name: 'Textbook / Reference Book', author: 'Standard Reference', tag: 'standard', desc: 'Use your prescribed textbook for chapter-accurate mapping' },
      ],
      courses: [
        { id: 'nptel_gen', name: 'NPTEL Course', provider: 'IIT/NPTEL', tag: 'course', desc: 'India\'s largest online course platform' },
        { id: 'coursera_gen', name: 'Online Course', provider: 'Coursera / edX / Udemy', tag: 'course', desc: 'Popular MOOC platforms for any subject' },
      ]
    }
  };

  function _getPolityDemo() {
    return {
      overview: `**Indian Polity** is the backbone of UPSC Civil Services — consistently delivering **15–20 questions** per year across Prelims and Mains. Amazon Nova has analysed 28 years of PYQs and found that questions on the Preamble, Fundamental Rights, Parliament, and Supreme Court account for nearly **60%** of all Polity questions. This map is structured to maximise your score with minimum revision time.`,
      chapters: [
        {
          name: 'Constitutional Framework',
          description: 'The foundational architecture — Preamble, Sources, and Salient Features.',
          topics: [
            { name: 'The Preamble', examFreq: '★★★ Very High', difficulty: '◇ Beginner', readTime: '⏱ 10 min' },
            { name: 'Historical Background of the Constitution', examFreq: '★★ Medium', difficulty: '◇ Beginner', readTime: '⏱ 8 min' },
            { name: 'Making of the Constitution', examFreq: '★★★ High', difficulty: '◇ Beginner', readTime: '⏱ 9 min' },
            { name: 'Salient Features of the Constitution', examFreq: '★★★ Very High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
            { name: 'Sources of the Constitution', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 10 min' },
            { name: 'Schedules of the Constitution', examFreq: '★★★ Very High', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' }
          ]
        },
        {
          name: 'Fundamental Rights & DPSP',
          description: 'Articles 12–35 — the most exam-intensive section of Indian Polity.',
          topics: [
            { name: 'Right to Equality (Art. 14–18)', examFreq: '★★★ Very High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
            { name: 'Right to Freedom (Art. 19–22)', examFreq: '★★★ Very High', difficulty: '◈ Intermediate', readTime: '⏱ 16 min' },
            { name: 'Right Against Exploitation (Art. 23–24)', examFreq: '★★ Medium', difficulty: '◇ Beginner', readTime: '⏱ 6 min' },
            { name: 'Right to Freedom of Religion (Art. 25–28)', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 10 min' },
            { name: 'Cultural & Educational Rights (Art. 29–30)', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 8 min' },
            { name: 'Right to Constitutional Remedies (Art. 32)', examFreq: '★★★ Very High', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' },
            { name: 'Directive Principles of State Policy', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
            { name: 'Fundamental Duties (Art. 51A)', examFreq: '★★ Medium', difficulty: '◇ Beginner', readTime: '⏱ 7 min' },
            { name: 'Relationship Between FR & DPSP', examFreq: '★★★ Very High', difficulty: '◆ Advanced', readTime: '⏱ 12 min' }
          ]
        },
        {
          name: 'Union Executive',
          description: 'President, Vice-President, Prime Minister, and Council of Ministers.',
          topics: [
            { name: 'The President — Election & Powers', examFreq: '★★★ Very High', difficulty: '◈ Intermediate', readTime: '⏱ 18 min' },
            { name: 'Vice-President & Council of Ministers', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' },
            { name: 'Prime Minister — Powers & Position', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
            { name: 'Cabinet Committees', examFreq: '★★ Medium', difficulty: '◈ Intermediate', readTime: '⏱ 8 min' }
          ]
        },
        {
          name: 'Parliament & Legislature',
          description: 'Composition, Powers, Functions, and Parliamentary Procedures.',
          topics: [
            { name: 'Parliament — Composition & Powers', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 18 min' },
            { name: 'Parliamentary Procedures & Motions', examFreq: '★★★ Very High', difficulty: '◆ Advanced', readTime: '⏱ 16 min' },
            { name: 'Legislative Process — How Bills Become Law', examFreq: '★★★ Very High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
            { name: 'Anti-Defection Law (10th Schedule)', examFreq: '★★★ Very High', difficulty: '◆ Advanced', readTime: '⏱ 10 min' },
            { name: 'Parliamentary Committees', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' }
          ]
        },
        {
          name: 'Judiciary',
          description: 'Supreme Court, High Courts, Subordinate Courts, and Judicial Review.',
          topics: [
            { name: 'Supreme Court — Powers & Jurisdiction', examFreq: '★★★ Very High', difficulty: '◈ Intermediate', readTime: '⏱ 16 min' },
            { name: 'High Courts — Structure & Powers', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
            { name: 'Judicial Review & Judicial Activism', examFreq: '★★★ Very High', difficulty: '◆ Advanced', readTime: '⏱ 13 min' },
            { name: 'Public Interest Litigation (PIL)', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 8 min' },
            { name: 'Judicial Appointments — Collegium System', examFreq: '★★★ Very High', difficulty: '◆ Advanced', readTime: '⏱ 10 min' }
          ]
        },
        {
          name: 'Federalism & Centre-State Relations',
          description: 'Distribution of powers, inter-state relations, and cooperative federalism.',
          topics: [
            { name: 'Federal Structure — Union, State & Concurrent Lists', examFreq: '★★★ Very High', difficulty: '◈ Intermediate', readTime: '⏱ 15 min' },
            { name: 'Inter-State Relations & Disputes', examFreq: '★★ Medium', difficulty: '◈ Intermediate', readTime: '⏱ 10 min' },
            { name: 'Finance Commission & Fiscal Federalism', examFreq: '★★★ High', difficulty: '◆ Advanced', readTime: '⏱ 14 min' },
            { name: 'Governor — Role & Controversies', examFreq: '★★★ Very High', difficulty: '◆ Advanced', readTime: '⏱ 12 min' }
          ]
        },
        {
          name: 'Local Self-Government',
          description: 'Panchayati Raj, Municipalities, and decentralized governance.',
          topics: [
            { name: 'Panchayati Raj — 73rd Amendment', examFreq: '★★★ Very High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
            { name: 'Municipalities — 74th Amendment', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' },
            { name: 'Cooperative Societies — 97th Amendment', examFreq: '★★ Medium', difficulty: '◇ Beginner', readTime: '⏱ 7 min' }
          ]
        },
        {
          name: 'Constitutional & Statutory Bodies',
          description: 'Election Commission, CAG, UPSC, Finance Commission, and more.',
          topics: [
            { name: 'Election Commission of India', examFreq: '★★★ Very High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
            { name: 'Comptroller & Auditor General (CAG)', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 10 min' },
            { name: 'UPSC & State PSCs', examFreq: '★★ Medium', difficulty: '◇ Beginner', readTime: '⏱ 8 min' },
            { name: 'National Human Rights Commission', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 9 min' },
            { name: 'Central Vigilance Commission & Lokpal', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 11 min' }
          ]
        },
        {
          name: 'Emergency Provisions',
          description: 'National, State, and Financial emergencies under the Constitution.',
          topics: [
            { name: 'National Emergency (Art. 352)', examFreq: '★★★ Very High', difficulty: '◆ Advanced', readTime: '⏱ 14 min' },
            { name: 'President\'s Rule (Art. 356)', examFreq: '★★★ Very High', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' },
            { name: 'Financial Emergency (Art. 360)', examFreq: '★★ Medium', difficulty: '◈ Intermediate', readTime: '⏱ 8 min' },
            { name: 'Impact on Fundamental Rights During Emergency', examFreq: '★★★ High', difficulty: '◆ Advanced', readTime: '⏱ 10 min' }
          ]
        },
        {
          name: 'Amendment & Special Provisions',
          description: 'Constitutional amendments, special provisions for states, and Schedules.',
          topics: [
            { name: 'Amendment Procedure (Art. 368)', examFreq: '★★★ Very High', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' },
            { name: 'Basic Structure Doctrine', examFreq: '★★★ Very High', difficulty: '◆ Advanced', readTime: '⏱ 14 min' },
            { name: 'Special Provisions for J&K, NE States', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 10 min' },
            { name: 'Landmark Amendments (1st, 42nd, 44th, 73rd, 74th)', examFreq: '★★★ Very High', difficulty: '◈ Intermediate', readTime: '⏱ 16 min' }
          ]
        }
      ],
      graph: {
        nodes: [
          { id: 'constitution', label: 'Constitution of India', type: 'core' },
          { id: 'preamble', label: 'Preamble', type: 'prereq' },
          { id: 'fr', label: 'Fundamental Rights', type: 'related' },
          { id: 'dpsp', label: 'DPSP', type: 'related' },
          { id: 'parliament', label: 'Parliament', type: 'related' },
          { id: 'judiciary', label: 'Judiciary', type: 'related' },
          { id: 'british', label: 'British Parliamentary Model', type: 'cross' },
          { id: 'philosophy', label: 'Political Philosophy', type: 'cross' },
          { id: 'history', label: 'Independence Movement', type: 'cross' }
        ],
        links: [
          { source: 'constitution', target: 'preamble' },
          { source: 'constitution', target: 'fr' },
          { source: 'constitution', target: 'dpsp' },
          { source: 'constitution', target: 'parliament' },
          { source: 'constitution', target: 'judiciary' },
          { source: 'preamble', target: 'philosophy' },
          { source: 'parliament', target: 'british' },
          { source: 'fr', target: 'history' }
        ]
      }
    };
  }

  function _getJEEMathsDemo() {
    return {
      overview: `**JEE Mathematics** is a precision sport — every mark counts, and deep conceptual clarity separates 99-percentilers from the rest. Amazon Nova's analysis of JEE 2015–2025 reveals that **Calculus (35%)**, **Algebra (30%)**, and **Coordinate Geometry (20%)** dominate. This roadmap prioritises high-yield topics with the clearest path from basics to exam-ready mastery.`,
      chapters: [
        {
          name: 'Sets, Relations & Functions',
          description: 'The language of mathematics — sets, mappings, and functional analysis.',
          topics: [
            { name: 'Sets & Venn Diagrams', examFreq: '★★ Medium', difficulty: '◇ Beginner', readTime: '⏱ 8 min' },
            { name: 'Relations & Equivalence Classes', examFreq: '★★ Medium', difficulty: '◈ Intermediate', readTime: '⏱ 10 min' },
            { name: 'Functions — Types & Graphs', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
            { name: 'Inverse & Composite Functions', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' }
          ]
        },
        {
          name: 'Algebra',
          description: 'Complex numbers, quadratics, matrices, PnC, and binomial theorem.',
          topics: [
            { name: 'Complex Numbers & Argand Plane', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 16 min' },
            { name: 'Quadratic Equations & Inequalities', examFreq: '★★★ Very High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
            { name: 'Matrices & Determinants', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
            { name: 'Permutations & Combinations', examFreq: '★★★ Very High', difficulty: '◈ Intermediate', readTime: '⏱ 16 min' },
            { name: 'Binomial Theorem', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' },
            { name: 'Sequences & Series (AP, GP, HP)', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
            { name: 'Mathematical Induction', examFreq: '★★ Medium', difficulty: '◇ Beginner', readTime: '⏱ 10 min' }
          ]
        },
        {
          name: 'Trigonometry',
          description: 'Identities, equations, inverse trig, and properties of triangles.',
          topics: [
            { name: 'Trigonometric Identities & Equations', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
            { name: 'Inverse Trigonometric Functions', examFreq: '★★★ Very High', difficulty: '◆ Advanced', readTime: '⏱ 16 min' },
            { name: 'Properties of Triangles', examFreq: '★★ Medium', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' },
            { name: 'Height & Distance Problems', examFreq: '★★ Medium', difficulty: '◇ Beginner', readTime: '⏱ 8 min' }
          ]
        },
        {
          name: 'Coordinate Geometry',
          description: 'Straight lines, circles, conics — the geometric powerhouse.',
          topics: [
            { name: 'Straight Lines & Pair of Lines', examFreq: '★★★ High', difficulty: '◇ Beginner', readTime: '⏱ 10 min' },
            { name: 'Circles — Equations & Properties', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' },
            { name: 'Parabola', examFreq: '★★★ Very High', difficulty: '◆ Advanced', readTime: '⏱ 16 min' },
            { name: 'Ellipse', examFreq: '★★★ Very High', difficulty: '◆ Advanced', readTime: '⏱ 16 min' },
            { name: 'Hyperbola', examFreq: '★★★ High', difficulty: '◆ Advanced', readTime: '⏱ 14 min' }
          ]
        },
        {
          name: 'Calculus — Limits & Continuity',
          description: 'The foundation of calculus — epsilon-delta, L\'Hopital, and continuity.',
          topics: [
            { name: 'Limits — Definition & Computation', examFreq: '★★★ Very High', difficulty: '◈ Intermediate', readTime: '⏱ 15 min' },
            { name: 'Continuity & Discontinuity', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' },
            { name: 'L\'Hopital\'s Rule & Indeterminate Forms', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 10 min' }
          ]
        },
        {
          name: 'Calculus — Differentiation',
          description: 'Derivatives, chain rule, implicit differentiation, and applications.',
          topics: [
            { name: 'Differentiation — First Principles & Rules', examFreq: '★★★ Very High', difficulty: '◈ Intermediate', readTime: '⏱ 18 min' },
            { name: 'Chain Rule, Product & Quotient Rules', examFreq: '★★★ Very High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
            { name: 'Implicit & Logarithmic Differentiation', examFreq: '★★★ High', difficulty: '◆ Advanced', readTime: '⏱ 12 min' },
            { name: 'Maxima, Minima & Monotonicity', examFreq: '★★★ Very High', difficulty: '◆ Advanced', readTime: '⏱ 18 min' },
            { name: 'Mean Value Theorems (Rolle, Lagrange)', examFreq: '★★★ High', difficulty: '◆ Advanced', readTime: '⏱ 14 min' }
          ]
        },
        {
          name: 'Calculus — Integration',
          description: 'Indefinite & definite integrals, area under curves.',
          topics: [
            { name: 'Indefinite Integration Techniques', examFreq: '★★★ Very High', difficulty: '◆ Advanced', readTime: '⏱ 22 min' },
            { name: 'Definite Integrals & Properties', examFreq: '★★★ Very High', difficulty: '◆ Advanced', readTime: '⏱ 18 min' },
            { name: 'Area Under Curves', examFreq: '★★★ Very High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
            { name: 'Differential Equations — ODE Types', examFreq: '★★★ High', difficulty: '◆ Advanced', readTime: '⏱ 20 min' }
          ]
        },
        {
          name: 'Vectors & 3D Geometry',
          description: 'Vector algebra, dot/cross products, lines & planes in 3D.',
          topics: [
            { name: 'Vector Algebra & Operations', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
            { name: 'Dot & Cross Product Applications', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' },
            { name: '3D Lines & Planes', examFreq: '★★★ Very High', difficulty: '◆ Advanced', readTime: '⏱ 16 min' },
            { name: 'Shortest Distance & Coplanarity', examFreq: '★★★ High', difficulty: '◆ Advanced', readTime: '⏱ 14 min' }
          ]
        },
        {
          name: 'Probability & Statistics',
          description: 'Conditional probability, Bayes\' theorem, distributions.',
          topics: [
            { name: 'Probability — Basics & Conditional', examFreq: '★★★ Very High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
            { name: 'Bayes\' Theorem & Applications', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' },
            { name: 'Random Variables & Distributions', examFreq: '★★★ High', difficulty: '◆ Advanced', readTime: '⏱ 16 min' },
            { name: 'Mean, Variance & Standard Deviation', examFreq: '★★ Medium', difficulty: '◈ Intermediate', readTime: '⏱ 10 min' }
          ]
        }
      ],
      graph: {
        nodes: [
          { id: 'jee', label: 'JEE Mathematics', type: 'core' },
          { id: 'calculus', label: 'Calculus', type: 'related' },
          { id: 'algebra', label: 'Algebra', type: 'related' },
          { id: 'geometry', label: 'Coordinate Geometry', type: 'related' },
          { id: 'limits', label: 'Limits', type: 'prereq' },
          { id: 'derivatives', label: 'Derivatives', type: 'prereq' },
          { id: 'physics', label: 'JEE Physics', type: 'cross' }
        ],
        links: [
          { source: 'jee', target: 'calculus' },
          { source: 'jee', target: 'algebra' },
          { source: 'jee', target: 'geometry' },
          { source: 'calculus', target: 'limits' },
          { source: 'calculus', target: 'derivatives' },
          { source: 'calculus', target: 'physics' }
        ]
      }
    };
  }

  function _getBioinformaticsDemo() {
    return {
      overview: `**Algorithms in Bioinformatics** sits at the intersection of computer science and molecular biology — a field where elegant algorithms meet the complexity of life itself. This subject covers sequence alignment, phylogenetics, graph algorithms for genomics, and machine learning applications in protein structure prediction. Amazon Nova has mapped 340+ research papers and textbook chapters to create this optimised learning path.`,
      chapters: [
        {
          name: 'Molecular Biology Primer',
          description: 'DNA, RNA, proteins — the biological context for computational problems.',
          topics: [
            { name: 'Central Dogma — DNA → RNA → Protein', examFreq: '★★★ Core', difficulty: '◇ Beginner', readTime: '⏱ 10 min' },
            { name: 'Gene Structure & Expression', examFreq: '★★ Medium', difficulty: '◇ Beginner', readTime: '⏱ 12 min' },
            { name: 'Biological Databases (GenBank, UniProt)', examFreq: '★★ Medium', difficulty: '◇ Beginner', readTime: '⏱ 8 min' }
          ]
        },
        {
          name: 'Sequence Analysis',
          description: 'String algorithms and dynamic programming for biological sequences.',
          topics: [
            { name: 'Pairwise Sequence Alignment', examFreq: '★★★ Core', difficulty: '◈ Intermediate', readTime: '⏱ 18 min' },
            { name: 'Smith-Waterman (Local Alignment)', examFreq: '★★★ Core', difficulty: '◆ Advanced', readTime: '⏱ 20 min' },
            { name: 'Needleman-Wunsch (Global Alignment)', examFreq: '★★★ Core', difficulty: '◆ Advanced', readTime: '⏱ 18 min' },
            { name: 'Scoring Matrices — BLOSUM & PAM', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
            { name: 'BLAST & Heuristic Alignment', examFreq: '★★★ Core', difficulty: '◆ Advanced', readTime: '⏱ 15 min' },
            { name: 'Multiple Sequence Alignment (MSA)', examFreq: '★★★ High', difficulty: '◆ Advanced', readTime: '⏱ 16 min' }
          ]
        },
        {
          name: 'Pattern Finding & Motifs',
          description: 'Finding regulatory motifs, k-mer analysis, and pattern discovery.',
          topics: [
            { name: 'Motif Finding — Brute Force & Branch and Bound', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
            { name: 'Expectation Maximization for Motifs', examFreq: '★★★ High', difficulty: '◆ Advanced', readTime: '⏱ 18 min' },
            { name: 'Gibbs Sampling', examFreq: '★★ Medium', difficulty: '◆ Advanced', readTime: '⏱ 16 min' },
            { name: 'Position Weight Matrices (PWMs)', examFreq: '★★★ Core', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' }
          ]
        },
        {
          name: 'Genome Assembly',
          description: 'De Bruijn graphs, overlap graphs, and assembly algorithms.',
          topics: [
            { name: 'Overlap Graphs & Hamiltonian Path', examFreq: '★★★ High', difficulty: '◆ Advanced', readTime: '⏱ 16 min' },
            { name: 'De Bruijn Graphs', examFreq: '★★★ Core', difficulty: '◆ Advanced', readTime: '⏱ 22 min' },
            { name: 'Eulerian Path Problem', examFreq: '★★★ Core', difficulty: '◆ Advanced', readTime: '⏱ 16 min' },
            { name: 'Read Mapping & Burrows-Wheeler Transform', examFreq: '★★★ High', difficulty: '◆◆ Expert', readTime: '⏱ 20 min' },
            { name: 'Error Correction in Sequencing', examFreq: '★★ Medium', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' }
          ]
        },
        {
          name: 'Phylogenetics',
          description: 'Tree construction algorithms for evolutionary analysis.',
          topics: [
            { name: 'Distance-Based Methods (UPGMA)', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
            { name: 'Neighbour-Joining Algorithm', examFreq: '★★★ Core', difficulty: '◆ Advanced', readTime: '⏱ 18 min' },
            { name: 'Maximum Parsimony', examFreq: '★★★ High', difficulty: '◆ Advanced', readTime: '⏱ 16 min' },
            { name: 'Maximum Likelihood Methods', examFreq: '★★ Medium', difficulty: '◆◆ Expert', readTime: '⏱ 25 min' },
            { name: 'Bayesian Phylogenetics (MCMC)', examFreq: '★★ Medium', difficulty: '◆◆ Expert', readTime: '⏱ 22 min' }
          ]
        },
        {
          name: 'Hidden Markov Models',
          description: 'HMMs for sequence labelling, gene prediction, and profile analysis.',
          topics: [
            { name: 'HMM Basics — States & Transitions', examFreq: '★★★ Core', difficulty: '◈ Intermediate', readTime: '⏱ 16 min' },
            { name: 'Viterbi Algorithm', examFreq: '★★★ Core', difficulty: '◆ Advanced', readTime: '⏱ 18 min' },
            { name: 'Forward-Backward & Baum-Welch', examFreq: '★★★ High', difficulty: '◆ Advanced', readTime: '⏱ 20 min' },
            { name: 'Profile HMMs for Protein Families', examFreq: '★★★ High', difficulty: '◆ Advanced', readTime: '⏱ 16 min' }
          ]
        },
        {
          name: 'Structural Bioinformatics',
          description: 'Protein structure prediction, folding, and AlphaFold.',
          topics: [
            { name: 'Protein Structure Levels (1°–4°)', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
            { name: 'Structure Comparison & RMSD', examFreq: '★★ Medium', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' },
            { name: 'AlphaFold & Deep Learning for Folding', examFreq: '★★★ Very High', difficulty: '◆◆ Expert', readTime: '⏱ 22 min' }
          ]
        },
        {
          name: 'Graph Algorithms in Genomics',
          description: 'Network analysis, clustering, and graph-based genomic analysis.',
          topics: [
            { name: 'Gene Regulatory Networks', examFreq: '★★★ High', difficulty: '◆ Advanced', readTime: '⏱ 16 min' },
            { name: 'Protein-Protein Interaction Networks', examFreq: '★★ Medium', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
            { name: 'Clustering Algorithms for Expression Data', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' }
          ]
        }
      ],
      graph: {
        nodes: [
          { id: 'bio', label: 'Bioinformatics Algorithms', type: 'core' },
          { id: 'dp', label: 'Dynamic Programming', type: 'prereq' },
          { id: 'graphs', label: 'Graph Theory', type: 'prereq' },
          { id: 'strings', label: 'String Algorithms', type: 'prereq' },
          { id: 'ml', label: 'Machine Learning', type: 'related' },
          { id: 'molbio', label: 'Molecular Biology', type: 'cross' }
        ],
        links: [
          { source: 'bio', target: 'dp' },
          { source: 'bio', target: 'graphs' },
          { source: 'bio', target: 'strings' },
          { source: 'bio', target: 'ml' },
          { source: 'bio', target: 'molbio' }
        ]
      }
    };
  }

  function _getMLDemo() {
    return {
      overview: `**Machine Learning Theory** bridges mathematical elegance and computational power. Understanding the *why* behind algorithms — not just the *how* — is what separates ML practitioners from ML engineers. Amazon Nova has synthesised insights from ICML, NeurIPS, and ICLR papers alongside classic textbooks (Bishop, Murphy, PRML) to build this structured learning path.`,
      chapters: [
        { name: 'Mathematical Foundations', description: 'Linear algebra, probability, and optimization — the three pillars.', topics: [
          { name: 'Linear Algebra for ML', examFreq: '★★★ Core', difficulty: '◈ Intermediate', readTime: '⏱ 18 min' },
          { name: 'Probability & Bayesian Thinking', examFreq: '★★★ Core', difficulty: '◈ Intermediate', readTime: '⏱ 20 min' },
          { name: 'Multivariate Calculus & Gradients', examFreq: '★★★ Core', difficulty: '◈ Intermediate', readTime: '⏱ 16 min' },
          { name: 'Optimization — Gradient Descent & Beyond', examFreq: '★★★ Core', difficulty: '◆ Advanced', readTime: '⏱ 22 min' },
          { name: 'Information Theory Basics', examFreq: '★★ Medium', difficulty: '◆ Advanced', readTime: '⏱ 14 min' }
        ] },
        { name: 'Supervised Learning — Regression', description: 'Linear models, regularization, and the bias-variance tradeoff.', topics: [
          { name: 'Linear Regression & Least Squares', examFreq: '★★★ Core', difficulty: '◇ Beginner', readTime: '⏱ 12 min' },
          { name: 'Polynomial & Multi-variable Regression', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
          { name: 'Ridge & Lasso Regularization', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 16 min' },
          { name: 'Bias-Variance Tradeoff', examFreq: '★★★ Core', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' }
        ] },
        { name: 'Supervised Learning — Classification', description: 'Logistic regression, SVMs, trees, and ensemble methods.', topics: [
          { name: 'Logistic Regression & Softmax', examFreq: '★★★ Core', difficulty: '◈ Intermediate', readTime: '⏱ 15 min' },
          { name: 'Support Vector Machines — Theory', examFreq: '★★★ High', difficulty: '◆ Advanced', readTime: '⏱ 20 min' },
          { name: 'Decision Trees & Random Forests', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 18 min' },
          { name: 'Gradient Boosting (XGBoost, LightGBM)', examFreq: '★★★ Very High', difficulty: '◈ Intermediate', readTime: '⏱ 16 min' },
          { name: 'Naive Bayes Classifier', examFreq: '★★ Medium', difficulty: '◇ Beginner', readTime: '⏱ 10 min' },
          { name: 'k-Nearest Neighbors (KNN)', examFreq: '★★ Medium', difficulty: '◇ Beginner', readTime: '⏱ 8 min' }
        ] },
        { name: 'Unsupervised Learning', description: 'Clustering, dimensionality reduction, and density estimation.', topics: [
          { name: 'K-Means & Hierarchical Clustering', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
          { name: 'DBSCAN & Density-Based Methods', examFreq: '★★ Medium', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' },
          { name: 'PCA — Principal Component Analysis', examFreq: '★★★ Core', difficulty: '◈ Intermediate', readTime: '⏱ 16 min' },
          { name: 't-SNE & UMAP Visualization', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' },
          { name: 'Gaussian Mixture Models & EM', examFreq: '★★★ High', difficulty: '◆ Advanced', readTime: '⏱ 18 min' }
        ] },
        { name: 'Neural Networks & Deep Learning', description: 'Backpropagation, CNNs, RNNs, and modern architectures.', topics: [
          { name: 'Perceptrons & Multi-Layer Networks', examFreq: '★★★ Core', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
          { name: 'Backpropagation & Computational Graphs', examFreq: '★★★ Core', difficulty: '◆ Advanced', readTime: '⏱ 20 min' },
          { name: 'Activation Functions & Initialization', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' },
          { name: 'Convolutional Neural Networks (CNNs)', examFreq: '★★★ Core', difficulty: '◆ Advanced', readTime: '⏱ 22 min' },
          { name: 'Recurrent Networks & LSTMs', examFreq: '★★★ High', difficulty: '◆ Advanced', readTime: '⏱ 20 min' },
          { name: 'Batch Normalization & Dropout', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 10 min' }
        ] },
        { name: 'Transformers & Attention', description: 'Self-attention, positional encoding, and the Transformer revolution.', topics: [
          { name: 'Self-Attention Mechanism', examFreq: '★★★ Very High', difficulty: '◆ Advanced', readTime: '⏱ 18 min' },
          { name: 'Transformer Architecture (Encoder-Decoder)', examFreq: '★★★ Very High', difficulty: '◆ Advanced', readTime: '⏱ 22 min' },
          { name: 'BERT, GPT & Foundation Models', examFreq: '★★★ Very High', difficulty: '◆◆ Expert', readTime: '⏱ 25 min' },
          { name: 'Vision Transformers (ViT)', examFreq: '★★★ High', difficulty: '◆ Advanced', readTime: '⏱ 16 min' }
        ] },
        { name: 'Generative Models', description: 'GANs, VAEs, diffusion models, and generative AI.', topics: [
          { name: 'Autoencoders & VAEs', examFreq: '★★★ High', difficulty: '◆ Advanced', readTime: '⏱ 18 min' },
          { name: 'Generative Adversarial Networks (GANs)', examFreq: '★★★ High', difficulty: '◆ Advanced', readTime: '⏱ 20 min' },
          { name: 'Diffusion Models & Score-Based Methods', examFreq: '★★★ Very High', difficulty: '◆◆ Expert', readTime: '⏱ 24 min' }
        ] },
        { name: 'ML Engineering & Deployment', description: 'Model evaluation, hyperparameter tuning, and production ML.', topics: [
          { name: 'Cross-Validation & Model Selection', examFreq: '★★★ Core', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' },
          { name: 'Hyperparameter Tuning Strategies', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
          { name: 'Feature Engineering & Selection', examFreq: '★★★ High', difficulty: '◈ Intermediate', readTime: '⏱ 16 min' },
          { name: 'ML Pipeline & MLOps Basics', examFreq: '★★ Medium', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' }
        ] },
        { name: 'Reinforcement Learning', description: 'MDPs, Q-learning, policy gradients, and deep RL.', topics: [
          { name: 'Markov Decision Processes (MDPs)', examFreq: '★★★ Core', difficulty: '◆ Advanced', readTime: '⏱ 18 min' },
          { name: 'Q-Learning & SARSA', examFreq: '★★★ High', difficulty: '◆ Advanced', readTime: '⏱ 20 min' },
          { name: 'Policy Gradient Methods', examFreq: '★★★ High', difficulty: '◆◆ Expert', readTime: '⏱ 22 min' },
          { name: 'Deep Q-Networks (DQN)', examFreq: '★★★ High', difficulty: '◆◆ Expert', readTime: '⏱ 20 min' }
        ] }
      ],
      graph: { nodes: [{ id: 'ml', label: 'Machine Learning', type: 'core' }, { id: 'math', label: 'Mathematics', type: 'prereq' }, { id: 'supervised', label: 'Supervised Learning', type: 'related' }, { id: 'unsupervised', label: 'Unsupervised Learning', type: 'related' }, { id: 'dl', label: 'Deep Learning', type: 'related' }, { id: 'transformers', label: 'Transformers', type: 'related' }, { id: 'rl', label: 'Reinforcement Learning', type: 'related' }, { id: 'stats', label: 'Statistics', type: 'prereq' }, { id: 'cv', label: 'Computer Vision', type: 'cross' }, { id: 'nlp', label: 'NLP', type: 'cross' }], links: [{ source: 'ml', target: 'math' }, { source: 'ml', target: 'supervised' }, { source: 'ml', target: 'unsupervised' }, { source: 'ml', target: 'dl' }, { source: 'dl', target: 'transformers' }, { source: 'ml', target: 'rl' }, { source: 'ml', target: 'stats' }, { source: 'dl', target: 'cv' }, { source: 'transformers', target: 'nlp' }] }
    };
  }

  function _getDefaultSubjectMap(subject) {
    return {
      overview: `**${subject}** is a rich, interconnected domain that rewards deep understanding over rote memorization. This subject map organizes the complete syllabus into all its chapters, each building conceptually on the last. Amazon Nova has analyzed thousands of past questions and expert explanations to curate this comprehensive learning path for you.`,
      chapters: [
        { name: 'Historical Background & Origins', description: 'Historical development, key milestones, and the intellectual context in which this subject emerged.', topics: [
          { name: 'Historical Development & Timeline', examFreq: '★★ Medium', difficulty: '◇ Beginner', readTime: '⏱ 7 min' },
          { name: 'Key Pioneers & Founding Contributions', examFreq: '★★ Medium', difficulty: '◇ Beginner', readTime: '⏱ 6 min' },
          { name: 'Evolution of Core Paradigms', examFreq: '★★★ High Yield', difficulty: '◈ Intermediate', readTime: '⏱ 10 min' }
        ]},
        { name: 'Foundational Principles & Definitions', description: 'The axiomatic base — core definitions, axioms, and the conceptual scaffolding everything else rests on.', topics: [
          { name: 'Core Definitions & Terminology', examFreq: '★★★ High Yield', difficulty: '◇ Beginner', readTime: '⏱ 8 min' },
          { name: 'Fundamental Laws & Postulates', examFreq: '★★★ High Yield', difficulty: '◇ Beginner', readTime: '⏱ 12 min' },
          { name: 'Theoretical Framework & Models', examFreq: '★★★ High Yield', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
          { name: 'Classification Systems & Taxonomy', examFreq: '★★ Medium', difficulty: '◈ Intermediate', readTime: '⏱ 9 min' }
        ]},
        { name: 'Primary Mechanisms & Core Processes', description: 'How the fundamental processes work — the engine room of the subject explored in full depth.', topics: [
          { name: 'Primary Process — Mechanism & Dynamics', examFreq: '★★★ High Yield', difficulty: '◈ Intermediate', readTime: '⏱ 13 min' },
          { name: 'Secondary Processes & Pathways', examFreq: '★★★ High Yield', difficulty: '◈ Intermediate', readTime: '⏱ 11 min' },
          { name: 'Regulation, Feedback & Control', examFreq: '★★ Medium', difficulty: '◈ Intermediate', readTime: '⏱ 10 min' },
          { name: 'Integration of Multiple Processes', examFreq: '★★★ High Yield', difficulty: '◆ Advanced', readTime: '⏱ 15 min' }
        ]},
        { name: 'Structural Analysis & Components', description: 'Decomposing the subject into its components, hierarchies, and structural relationships.', topics: [
          { name: 'Component Analysis & Sub-systems', examFreq: '★★★ High Yield', difficulty: '◈ Intermediate', readTime: '⏱ 13 min' },
          { name: 'Hierarchical Organization', examFreq: '★★ Medium', difficulty: '◈ Intermediate', readTime: '⏱ 10 min' },
          { name: 'Structural Properties & Invariants', examFreq: '★★★ High Yield', difficulty: '◆ Advanced', readTime: '⏱ 14 min' }
        ]},
        { name: 'Quantitative Methods & Mathematical Tools', description: 'The mathematical language of the subject — formulas, proofs, and quantitative reasoning.', topics: [
          { name: 'Key Formulas & Their Derivations', examFreq: '★★★ High Yield', difficulty: '◈ Intermediate', readTime: '⏱ 16 min' },
          { name: 'Problem-Solving Strategies & Techniques', examFreq: '★★★ High Yield', difficulty: '◆ Advanced', readTime: '⏱ 18 min' },
          { name: 'Numerical Methods & Approximations', examFreq: '★★★ High Yield', difficulty: '◆ Advanced', readTime: '⏱ 15 min' }
        ]},
        { name: 'Comparative Frameworks & Contrasting Models', description: 'Comparing competing approaches, schools of thought, and alternative frameworks side by side.', topics: [
          { name: 'Model A vs Model B — Systematic Comparison', examFreq: '★★★ High Yield', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' },
          { name: 'Strengths, Limitations & Assumptions', examFreq: '★★ Medium', difficulty: '◈ Intermediate', readTime: '⏱ 9 min' },
          { name: 'Synthesis & Unified View', examFreq: '★★★ High Yield', difficulty: '◆ Advanced', readTime: '⏱ 14 min' }
        ]},
        { name: 'Real-World Applications & Case Studies', description: 'Landmark cases, applied examples, and how concepts manifest in practice.', topics: [
          { name: 'Landmark Cases & Canonical Examples', examFreq: '★★★ High Yield', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
          { name: 'Applied Problem-Solving (Worked Examples)', examFreq: '★★★ High Yield', difficulty: '◆ Advanced', readTime: '⏱ 18 min' },
          { name: 'Contemporary & Industry Applications', examFreq: '★★★ High Yield', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' }
        ]},
        { name: 'Special Cases, Exceptions & Anomalies', description: 'The boundary conditions and anomalies that test deep understanding and commonly appear in exams.', topics: [
          { name: 'Known Exceptions to General Rules', examFreq: '★★★ High Yield', difficulty: '◆ Advanced', readTime: '⏱ 11 min' },
          { name: 'Edge Cases & Boundary Conditions', examFreq: '★★ Medium', difficulty: '◆ Advanced', readTime: '⏱ 13 min' },
          { name: 'Paradoxes & Counterintuitive Results', examFreq: '★★★ High Yield', difficulty: '◆ Advanced', readTime: '⏱ 12 min' }
        ]},
        { name: 'Advanced Theory & Deeper Formalism', description: 'The graduate-level machinery — for those who want mastery, not just exam-readiness.', topics: [
          { name: 'Formal Proofs & Rigorous Treatment', examFreq: '★ Low', difficulty: '◆◆ Expert', readTime: '⏱ 22 min' },
          { name: 'Advanced Theorems & Lemmas', examFreq: '★★ Medium', difficulty: '◆◆ Expert', readTime: '⏱ 20 min' },
          { name: 'Generalizations & Extensions', examFreq: '★ Low', difficulty: '◆◆ Expert', readTime: '⏱ 18 min' }
        ]},
        { name: 'Cross-Disciplinary Connections', description: 'How this subject connects to adjacent fields — essential for interdisciplinary exam questions.', topics: [
          { name: 'Connection to Related Field A', examFreq: '★★ Medium', difficulty: '◈ Intermediate', readTime: '⏱ 9 min' },
          { name: 'Connection to Related Field B', examFreq: '★★ Medium', difficulty: '◈ Intermediate', readTime: '⏱ 9 min' },
          { name: 'Interdisciplinary Problem-Solving', examFreq: '★★★ High Yield', difficulty: '◆ Advanced', readTime: '⏱ 15 min' }
        ]},
        { name: 'Current Research & Open Problems', description: 'State-of-the-art research, ongoing debates, and the open problems that define the frontier.', topics: [
          { name: 'Recent Breakthroughs & Developments', examFreq: '★★★ High Yield', difficulty: '◈ Intermediate', readTime: '⏱ 11 min' },
          { name: 'Open Problems & Active Debates', examFreq: '★★ Medium', difficulty: '◆ Advanced', readTime: '⏱ 13 min' },
          { name: 'Future Directions & Emerging Paradigms', examFreq: '★ Low', difficulty: '◆◆ Expert', readTime: '⏱ 10 min' }
        ]},
        { name: 'Exam Strategy & High-Yield Review', description: 'PYQ analysis, most-tested topics, common traps, and a structured revision roadmap.', topics: [
          { name: 'Most-Tested Topics — PYQ Analysis', examFreq: '★★★ High Yield', difficulty: '◇ Beginner', readTime: '⏱ 8 min' },
          { name: 'Common Exam Traps & How to Avoid Them', examFreq: '★★★ High Yield', difficulty: '◈ Intermediate', readTime: '⏱ 10 min' },
          { name: 'Quick Revision Checklist & Mind Map', examFreq: '★★★ High Yield', difficulty: '◇ Beginner', readTime: '⏱ 6 min' }
        ]}
      ],
      graph: {
        nodes: [
          { id: 'main', label: subject, type: 'core' },
          { id: 'foundations', label: 'Foundations', type: 'prereq' },
          { id: 'applications', label: 'Applications', type: 'related' },
          { id: 'history', label: 'Historical Context', type: 'prereq' },
          { id: 'theory', label: 'Theory', type: 'related' },
          { id: 'cross1', label: 'Economics', type: 'cross' },
          { id: 'cross2', label: 'Political Science', type: 'cross' }
        ],
        links: [
          { source: 'main', target: 'foundations' },
          { source: 'main', target: 'applications' },
          { source: 'main', target: 'theory' },
          { source: 'foundations', target: 'history' },
          { source: 'theory', target: 'cross1' },
          { source: 'applications', target: 'cross2' }
        ]
      }
    };
  }

  function getSubjectMap(subject) {
    if (subject.toLowerCase().includes('polity') || subject.toLowerCase().includes('upsc')) {
      return _getPolityDemo();
    }
    if (subject.toLowerCase().includes('jee') || subject.toLowerCase().includes('calculus') || subject.toLowerCase().includes('maths')) {
      return _getJEEMathsDemo();
    }
    if (subject.toLowerCase().includes('bioinformatics')) {
      return _getBioinformaticsDemo();
    }
    if (subject.toLowerCase().includes('machine learning') || subject.toLowerCase().includes('ml')) {
      return _getMLDemo();
    }
    return _getDefaultSubjectMap(subject);
  }

  function _getPreambleDemoContent() {
    return {
      content: `## The Preamble of the Indian Constitution

The Preamble is the **soul of the Indian Constitution** — a brief introductory statement that encapsulates its guiding philosophy, values, and aspirations. It was adopted on **26 November 1949** and serves as the key to understanding the Constitution's intent.

> *"WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens: JUSTICE, LIBERTY, EQUALITY and FRATERNITY..."*

---

### ✦ Breaking Down the Preamble — Word by Word

**SOVEREIGN**
India is completely independent — no external authority (foreign power or otherwise) can dictate its governance. *Key case:* **Berubari Union Case (1960)** established that the Preamble is **not enforceable** in court but is a legitimate aid to constitutional interpretation.

**SOCIALIST** *(Added by 42nd Amendment, 1976)*
India commits to ending exploitation and ensuring social and economic equality. This does **not** mean state socialism — India follows a **mixed economy model** (confirmed in *D.S. Nakara v. Union of India*, 1983).

**SECULAR** *(Added by 42nd Amendment, 1976)*
India has **no state religion**. The state treats all religions equally (*Sarva Dharma Sambhava* principle). Unlike the Western concept of strict separation, India practices **positive secularism** — the state can intervene in religious affairs to remove social evils.

**DEMOCRATIC**
Ultimate sovereignty rests with the people. India practices **representative democracy** through free and fair elections supervised by an independent Election Commission.

**REPUBLIC**
The head of state (President) is **elected**, not hereditary. This distinguishes India from constitutional monarchies like the UK.

---

### ✦ The Four Objectives

| Objective | What it means |
|-----------|--------------|
| **Justice** | Social, Economic, Political justice |
| **Liberty** | Of thought, expression, belief, faith, worship |
| **Equality** | Of status and opportunity |
| **Fraternity** | Dignity of individual + Unity & Integrity of nation |

---

### ✦ Is the Preamble Part of the Constitution?

This was a **landmark constitutional debate**:

- **Berubari Union Case (1960):** Preamble is *not* part of the Constitution
- **Kesavananda Bharati v. State of Kerala (1973):** Preamble *is* part of the Constitution and can be amended under Article 368 — **but the Basic Structure cannot be changed**

The **Basic Structure Doctrine** (Kesavananda Bharati) protects the core values of the Preamble from being altered even by constitutional amendment.

---

### ✦ Amendability of the Preamble

The Preamble has been amended **once** — by the **42nd Constitutional Amendment Act, 1976** which added three words:
- **Socialist**
- **Secular**
- **Integrity**

**UPSC Insight:** The 42nd Amendment (nicknamed the "Mini-Constitution") is one of the most significant constitutional changes in Indian history, passed during Emergency (1975–77).`,

      prerequisites: [
        { name: 'Constitutional Conventions', type: 'Prereq', description: 'Unwritten conventions governing parliamentary behaviour' },
        { name: 'Constituent Assembly Debates', type: 'Context', description: 'Historical background of constitution-making' },
        { name: 'Basic Structure Doctrine', type: 'Related', description: 'Kesavananda Bharati — cannot amend basic features' }
      ],

      related: [
        { name: 'Fundamental Rights (Art. 12–35)', subject: 'Indian Polity' },
        { name: 'Directive Principles of State Policy', subject: 'Indian Polity' },
        { name: 'Judicial Review', subject: 'Indian Polity' },
        { name: 'Emergency Provisions', subject: 'Indian Polity' }
      ],

      doubts: [
        { question: 'Is the Preamble justiciable in court?', answer: `**No, the Preamble is NOT directly justiciable** — you cannot go to court saying "my right from the Preamble is violated." However, it is a powerful **interpretive tool**.\n\n**The key cases:**\n- **Berubari (1960):** Called it a "key to the minds of the makers"\n- **Kesavananda Bharati (1973):** Made it a proper part of the Constitution\n- **S.R. Bommai (1994):** Used "secular" from the Preamble to dismiss state governments that undermined secularism\n\n**Bottom line:** Courts use it to *interpret* the Constitution but not to create new rights.` },
        { question: 'Why were Socialist & Secular added later?', answer: `**Both words were added by the 42nd Amendment (1976)** during the Emergency period under PM Indira Gandhi.\n\n**Why not included originally?**\n1. **Dr. Ambedkar's view:** The Constitution already had socialist elements in DPSP; making it explicit was unnecessary\n2. **Secularism:** India's treatment of religions was already based on equality — the word wasn't needed to make India secular\n3. **Political context:** The 42nd Amendment was controversial — many provisions were later reversed by the 44th Amendment (1978)\n\n**Key exam point:** Despite adding "Socialist," India follows a **mixed economy** — not pure state socialism.` },
        { question: 'What is the Basic Structure Doctrine?', answer: `The **Basic Structure Doctrine** (Kesavananda Bharati v. State of Kerala, 1973) holds that Parliament *can* amend the Constitution under Article 368, but **cannot alter its basic structure**.\n\n**Basic features include:**\n- Supremacy of the Constitution\n- Republican and democratic form of government\n- Secular character\n- Separation of powers\n- Federal character\n- Judicial review\n- Free and fair elections\n\n**Why it matters:** It acts as a **constitutional firewall** protecting the Constitution from being dismantled through amendments.` },
        { question: 'Difference between Justice in FR vs Preamble?', answer: `**Preamble mentions JUSTICE in three dimensions:**\n\n| Type | Means | Guaranteed by |\n|------|-------|---------------|\n| Social | No discrimination based on caste, religion, sex | Fundamental Rights (Art. 14–18) |\n| Economic | No exploitation, fair wages | DPSP (Art. 39, 41) |\n| Political | Universal adult franchise, equal political rights | Right to vote, Art. 326 |\n\n**Key distinction:** Social & Political Justice is in **Fundamental Rights** (justiciable); Economic Justice is mainly in **DPSP** (non-justiciable but directive).` },
        { question: 'How does India\'s secularism differ from the West?', answer: `**Western Secularism:** Strict wall of separation between state and religion. State stays completely out of religious affairs.\n\n**Indian Secularism:** "Positive Secularism" or *Sarva Dharma Sambhava* — equal respect for all religions. The state CAN:\n- Regulate religious institutions (Art. 25 subject to public order, health, morality)\n- Throw out social evils like untouchability (Art. 17)\n- Provide for Hindu Endowments\n- Give minority rights (Art. 29–30)\n\n**Key case:** *SR Bommai (1994)* — BJP governments in 4 states dismissed after Babri Masjid demolition on grounds of violating the secular character of the Constitution.` },
        { question: 'What does \'Republic\' mean in the context of India?', answer: `A **Republic** means the supreme power of the state is held by the **people** through their elected representatives, and the head of state is **elected** — not hereditary.\n\n**India is a Republic because:**\n- The **President** (head of state) is elected — not a hereditary monarch\n- No privileged classes — no hereditary titles (Art. 18 abolishes titles)\n- Universal adult franchise — every citizen 18+ can vote\n\n**Compare:** The UK is NOT a republic — it has a hereditary monarch (King Charles III). India chose to be a Republic unlike Canada or Australia which retained the British monarch as their head of state.` }
      ],

      questions: [
        {
          type: 'MCQ',
          question: 'Consider the following statements regarding the Preamble of the Indian Constitution:\n1. The Preamble can be amended under Article 368\n2. The words "Socialist" and "Secular" were part of the original Preamble\n3. The Preamble is not enforceable in any court of law\n\nWhich of the above statements is/are correct?',
          options: ['1 and 3 only', '2 and 3 only', '1 only', '1, 2, and 3'],
          correct: 0,
          explanation: `**Answer: 1 and 3 only**\n\n**Statement 1: CORRECT** — The Preamble can be amended. The 42nd Amendment (1976) amended it by adding Socialist, Secular, and Integrity. This was upheld because in *Kesavananda Bharati (1973)*, the SC held Preamble is part of the Constitution.\n\n**Statement 2: INCORRECT** — "Socialist" and "Secular" were NOT in the original Preamble of 1949. They were added by the **42nd Constitutional Amendment Act, 1976**.\n\n**Statement 3: CORRECT** — The Preamble cannot be enforced in court. No citizen can file a petition saying "my Preamble right is violated." It is only an interpretive aid (*Berubari Union Case, 1960*).`
        },
        {
          type: 'MCQ',
          question: 'Which constitutional case established that the Preamble is a part of the Indian Constitution and can be used for interpreting its provisions?',
          options: ['Berubari Union Case, 1960', 'Kesavananda Bharati v. State of Kerala, 1973', 'Minerva Mills v. Union of India, 1980', 'S.R. Bommai v. Union of India, 1994'],
          correct: 1,
          explanation: `**Answer: Kesavananda Bharati v. State of Kerala (1973)**\n\nIn this landmark 13-judge bench case, the Supreme Court **overruled** the Berubari Union Case (1960) and held that:\n1. The Preamble IS a part of the Constitution\n2. Parliament can amend the Preamble under Article 368\n3. BUT Parliament cannot alter the Basic Structure of the Constitution\n\nThis case also gave us the celebrated **Basic Structure Doctrine** — perhaps the most important constitutional law principle in India.`
        },
        {
          type: 'Short Answer',
          question: 'Explain the concept of "Positive Secularism" as practised in India. How does it differ from the Western model of secularism? (150 words)',
          options: null,
          correct: null,
          explanation: `**Model Answer:**\n\n**Indian/Positive Secularism** (*Sarva Dharma Sambhava*) treats all religions equally and allows state intervention to promote social welfare. Unlike Western secularism's strict wall of separation, India's state can:\n- Regulate religious affairs for public order (Art. 25)\n- Abolish untouchability (Art. 17)\n- Protect minority religious rights (Art. 29–30)\n- Provide reservations for religious minorities\n\n**Western Secularism** maintains absolute separation: France's *laicite* prohibits religious symbols in public schools; the US First Amendment bars state establishment of religion.\n\n**Key difference:** Western model = State stays OUT of religion. Indian model = State engages with religion to ensure equality and remove exploitation.\n\n*Cases:* SR Bommai (1994) used secularism to dismiss state governments; Minerva Mills (1980) protected it as part of Basic Structure.`
        }
      ],

      graph: {
        nodes: [
          { id: 'preamble', label: 'Preamble', type: 'core' },
          { id: 'fr', label: 'Fundamental Rights', type: 'related' },
          { id: 'dpsp', label: 'DPSP', type: 'related' },
          { id: 'kesavananda', label: 'Basic Structure', type: 'related' },
          { id: 'secular', label: 'Secularism', type: 'prereq' },
          { id: 'sovereignty', label: 'Sovereignty', type: 'prereq' },
          { id: '42nd', label: '42nd Amendment', type: 'prereq' },
          { id: 'philosophy', label: 'Political Philosophy', type: 'cross' },
          { id: 'intl', label: 'International Law', type: 'cross' }
        ],
        links: [
          { source: 'preamble', target: 'fr' },
          { source: 'preamble', target: 'dpsp' },
          { source: 'preamble', target: 'kesavananda' },
          { source: 'preamble', target: 'secular' },
          { source: 'preamble', target: 'sovereignty' },
          { source: 'preamble', target: '42nd' },
          { source: 'preamble', target: 'philosophy' },
          { source: 'sovereignty', target: 'intl' }
        ]
      }
    };
  }

  function _getDifferentiationDemoContent() {
    return {
      content: `## Differentiation & Its Applications

Differentiation is the mathematical process of finding the **rate of change** of a function with respect to a variable. It is one of the two fundamental operations of calculus (the other being integration).

### ✦ The Core Definition — From First Principles

The derivative of $f(x)$ at a point $x = a$ is defined as:

$$f'(a) = \\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}$$

**What each part means:**
- $h$ → the tiny change in $x$ (approaches zero but never becomes zero)
- $f(a+h) - f(a)$ → the corresponding change in $f$
- The limit → we look at what happens as the interval shrinks to a point

**Geometric interpretation:** $f'(a)$ is the **slope of the tangent line** to the curve $y = f(x)$ at the point $(a, f(a))$.

---

### ✦ Standard Derivatives You Must Know (JEE)

| Function | Derivative | Proof Method |
|----------|-----------|--------------|
| $x^n$ | $nx^{n-1}$ | First principles or power rule |
| $e^x$ | $e^x$ | Unique! Its own derivative |
| $\\ln x$ | $1/x$ | Inverse function rule |
| $\\sin x$ | $\\cos x$ | First principles with $\\lim_{\\theta \\to 0} \\frac{\\sin\\theta}{\\theta} = 1$ |
| $\\cos x$ | $-\\sin x$ | Chain rule from $\\sin x$ |

---

### ✦ Chain Rule — The Most Important Rule

If $y = f(g(x))$, then:

$$\\frac{dy}{dx} = f'(g(x)) \\cdot g'(x)$$

**Example:** Find $\\frac{d}{dx}[\\sin(x^2)]$
- Outer function: $\\sin(u)$, inner: $u = x^2$
- $= \\cos(x^2) \\cdot 2x = 2x\\cos(x^2)$

---

### ✦ Applications in JEE

**1. Maxima and Minima**
At a local maximum or minimum: $f'(x) = 0$ (critical point)
- $f''(x) < 0$ → local maximum
- $f''(x) > 0$ → local minimum

**2. Rate of Change Problems**
If a balloon's radius $r$ expands at $\\frac{dr}{dt} = 3$ cm/s, find rate of volume change:
$$\\frac{dV}{dt} = 4\\pi r^2 \\cdot \\frac{dr}{dt} = 12\\pi r^2 \\text{ cm}^3/\\text{s}$$`,

      prerequisites: [
        { name: 'Limits & Continuity', type: 'Prereq', description: 'Limits are the foundation of derivatives' },
        { name: 'Algebraic Functions', type: 'Prereq', description: 'Polynomials, rationals, surds' },
        { name: 'Trigonometric Functions', type: 'Prereq', description: 'Sin, cos, tan and their properties' }
      ],

      related: [
        { name: 'Integration', subject: 'Calculus' },
        { name: 'Applications of Derivatives', subject: 'Calculus' },
        { name: 'Differential Equations', subject: 'Calculus' }
      ],

      doubts: [
        { question: 'What does h→0 actually mean in the limit definition?', answer: `**$h \\to 0$ means $h$ gets arbitrarily close to zero — but NEVER equals zero.**\n\nIf $h = 0$, we'd be dividing by zero (undefined). The limit asks: *what value does the expression approach as $h$ gets closer and closer to zero?*\n\nThink of it like this: you zoom into the curve between $x = a$ and $x = a + h$. As $h$ shrinks, the secant line (connecting two nearby points) gets closer and closer to the tangent line (touching at exactly one point). The derivative IS that tangent line's slope.` },
        { question: 'Why is the derivative of $e^x$ equal to itself?', answer: `This is the most beautiful property of $e$! The number $e ≈ 2.71828...$ is specifically defined so that $e^x$ is its own derivative.\n\n**From first principles:**\n$$\\frac{d}{dx}[e^x] = \\lim_{h→0} \\frac{e^{x+h} - e^x}{h} = e^x \\cdot \\lim_{h→0} \\frac{e^h - 1}{h} = e^x \\cdot 1 = e^x$$\n\nThe key step is that $\\lim_{h→0} \\frac{e^h - 1}{h} = 1$ — and this is actually one of the *definitions* of $e$: the unique base for which this limit equals exactly 1.` },
        { question: 'When should I use chain rule vs product rule?', answer: `**Use CHAIN RULE** when you have a **function of a function** (composition):\n- $\\sin(x^2)$ → outer $\\sin$, inner $x^2$\n- $e^{3x+1}$ → outer $e^u$, inner $3x+1$\n- $(x^2 + 1)^{10}$ → outer $u^{10}$, inner $x^2+1$\n\n**Use PRODUCT RULE** when you have two functions **multiplied** together:\n- $x^2 \\cdot \\sin x$ → two separate functions multiplied\n- $e^x \\cdot \\ln x$\n\n**Sometimes both:** $x \\cdot \\sin(x^2)$ needs product rule first, then chain rule inside.\n\n**Memory trick:** Chain = composition (nested), Product = multiplication (side by side).` },
        { question: 'What is the physical meaning of the second derivative?', answer: `**First derivative $f\'(x)$:** Rate of change = velocity (if $f$ is position)\n\n**Second derivative $f\'\'(x)$:** Rate of change of rate of change = acceleration\n\n**In curve sketching:**\n- $f\'\'(x) > 0$ → curve is concave UP (like a bowl, holds water)\n- $f\'\'(x) < 0$ → curve is concave DOWN (like an inverted bowl)\n- $f\'\'(x) = 0$ → possible inflection point (concavity changes)\n\n**At critical points** (where $f\'(x) = 0$):\n- $f\'\'(x) > 0$ → local MINIMUM (curve bends upward)\n- $f\'\'(x) < 0$ → local MAXIMUM (curve bends downward)\n- $f\'\'(x) = 0$ → test fails, use first derivative test` }
      ],

      questions: [
        {
          type: 'MCQ',
          question: 'If $f(x) = \\sin^{-1}\\left(\\frac{2x}{1+x^2}\\right)$, then $f\'(x)$ equals:',
          options: ['$\\frac{2}{1+x^2}$', '$\\frac{-2}{1+x^2}$', '$\\frac{1}{1+x^2}$', '$\\frac{2}{\\sqrt{1-x^2}}$'],
          correct: 0,
          explanation: `Let $x = \\tan\\theta$, so $\\frac{2x}{1+x^2} = \\frac{2\\tan\\theta}{1+\\tan^2\\theta} = \\sin(2\\theta)$.\n\nThus $f(x) = \\sin^{-1}(\\sin 2\\theta) = 2\\theta = 2\\tan^{-1}x$\n\n$$f'(x) = 2 \\cdot \\frac{1}{1+x^2} = \\frac{2}{1+x^2}$$`
        },
        { type: 'Numerical', question: 'If $y = (x^2 + 1)^3 \\cdot e^x$, find the value of $y\'$ at $x = 0$.', options: null, correct: null, explanation: `Using product rule: $y' = 3(x^2+1)^2 \\cdot 2x \\cdot e^x + (x^2+1)^3 \\cdot e^x$\n\nAt $x = 0$: $y' = 0 + (0+1)^3 \\cdot e^0 = 1 \\cdot 1 = \\boxed{1}$` }
      ],

      graph: {
        nodes: [{ id: 'diff', label: 'Differentiation', type: 'core' }, { id: 'limits', label: 'Limits', type: 'prereq' }, { id: 'integ', label: 'Integration', type: 'related' }, { id: 'chain', label: 'Chain Rule', type: 'related' }, { id: 'apps', label: 'Applications', type: 'related' }, { id: 'physics', label: 'Physics — Mechanics', type: 'cross' }],
        links: [{ source: 'diff', target: 'limits' }, { source: 'diff', target: 'integ' }, { source: 'diff', target: 'chain' }, { source: 'diff', target: 'apps' }, { source: 'apps', target: 'physics' }]
      }
    };
  }

  function _getAlignmentDemoContent() {
    return {
      content: `## Sequence Alignment Algorithms

Sequence alignment is the process of arranging two or more biological sequences (DNA, RNA, or protein) to identify regions of similarity that may reflect functional, structural, or evolutionary relationships.

### ✦ The Alignment Problem

Given two sequences:
- $S_1 = s_1 s_2 \\ldots s_m$
- $S_2 = t_1 t_2 \\ldots t_n$

We insert gaps (−) to maximise a **similarity score** based on:
- **Match:** $+1$ or +2
- **Mismatch:** $-1$ penalty
- **Gap:** $-2$ penalty

### ✦ Needleman-Wunsch (Global Alignment)

For global alignment (entire sequences must align), the recurrence is:

$$F(i,j) = \\max \\begin{cases} F(i-1,j-1) + s(S_1[i], S_2[j]) \\\\ F(i-1,j) + d \\\\ F(i,j-1) + d \\end{cases}$$

Where $d$ is the gap penalty and $s(a,b)$ is the substitution score.

**Time complexity:** $O(mn)$ | **Space:** $O(mn)$

### ✦ Smith-Waterman (Local Alignment)

For finding the **best local similarity** (partial alignment):

$$H(i,j) = \\max \\begin{cases} 0 \\\\ H(i-1,j-1) + s(S_1[i], S_2[j]) \\\\ H(i-1,j) + d \\\\ H(i,j-1) + d \\end{cases}$$

The crucial difference: a **floor of 0** ensures we start fresh rather than carrying negative scores — finding the best local region.`,

      prerequisites: [
        { name: 'Dynamic Programming', type: 'Core Prereq', description: 'Memoization, tabulation, and recurrence relations' },
        { name: 'Scoring Matrices (BLOSUM, PAM)', type: 'Context', description: 'How substitution scores are derived' }
      ],
      related: [
        { name: 'BLAST Algorithm', subject: 'Bioinformatics' },
        { name: 'Multiple Sequence Alignment', subject: 'Bioinformatics' },
        { name: 'Hidden Markov Models', subject: 'Bioinformatics' }
      ],
      doubts: [
        { question: 'Why does Smith-Waterman use a floor of 0?', answer: `The **floor of 0** is what makes Smith-Waterman find LOCAL alignments rather than global ones.\n\nWhen the running score goes negative, it means we've gone through a region of poor similarity — it's better to start fresh from the next cell than carry this penalty forward.\n\nThe traceback starts from the **highest scoring cell** in the entire matrix (not just the bottom-right corner like Needleman-Wunsch) and goes backwards until it hits a cell with score 0.` },
        { question: 'What is the difference between global and local alignment?', answer: `**Global alignment (Needleman-Wunsch):**\n- Aligns the ENTIRE length of both sequences\n- Best when sequences are similar in length and evolutionarily related\n- Example: Comparing human and chimpanzee haemoglobin genes\n\n**Local alignment (Smith-Waterman):**\n- Finds the BEST MATCHING REGION within the sequences\n- Best when sequences contain conserved domains embedded in different contexts\n- Example: Finding a shared protein domain between two very different proteins\n\n**Rule of thumb:** Use global for closely related sequences; local for finding shared functional regions.` }
      ],
      questions: [
        { type: 'MCQ', question: 'In the Needleman-Wunsch algorithm with match score +1, mismatch −1, and gap penalty −2, what is the time complexity for aligning sequences of length m and n?', options: ['O(m + n)', 'O(mn)', 'O(m log n)', 'O(m² + n²)'], correct: 1, explanation: `**O(mn)** — The algorithm fills in an $(m+1) \\times (n+1)$ dynamic programming matrix. Each cell computation takes O(1) time (just comparing 3 values). So total = O(mn) time and O(mn) space. This can be reduced to O(min(m,n)) space using Hirschberg's algorithm.` }
      ],
      graph: { nodes: [{ id: 'align', label: 'Sequence Alignment', type: 'core' }, { id: 'dp', label: 'Dynamic Programming', type: 'prereq' }, { id: 'nw', label: 'Needleman-Wunsch', type: 'related' }, { id: 'sw', label: 'Smith-Waterman', type: 'related' }, { id: 'blast', label: 'BLAST', type: 'related' }], links: [{ source: 'align', target: 'dp' }, { source: 'align', target: 'nw' }, { source: 'align', target: 'sw' }, { source: 'sw', target: 'blast' }] }
    };
  }

  function _getGenericDemoContent(topicName, currentSubject) {
    return {
      content: `## ${topicName}\n\nAmazon Nova is generating a comprehensive explanation of **${topicName}** tailored to your learning profile and exam goals.\n\n### Key Concepts\n\nThis topic sits at the intersection of foundational theory and practical application. Understanding it deeply requires building from first principles, which is exactly what this guide does.\n\n### Why This Topic Matters\n\nExam analysis shows this topic appears in **multiple contexts** — both as a standalone question and as a prerequisite for more advanced topics. Mastering it now creates a compounding advantage.\n\n> Connect to the backend (Amazon Nova) for a fully personalised, streamed explanation with math rendering, diagrams, and exam-specific insights.`,
      prerequisites: [{ name: 'Foundational Concepts', type: 'Prereq', description: 'Core basics that underpin this topic' }],
      related: [{ name: 'Adjacent Topic A', subject: currentSubject || 'Subject' }, { name: 'Adjacent Topic B', subject: currentSubject || 'Subject' }],
      doubts: [
        { question: 'What is the core intuition behind this concept?', answer: `The core intuition is that **every complex idea can be broken into simpler components**. Start from what you already understand and build upward, one layer at a time. This is the Socratic method — and it works.` },
        { question: 'How does this connect to what I already know?', answer: `Almost every new concept is an extension or generalisation of something you already understand. Look for the pattern — "this is like X, but with Y added." Once you find that connection, the new concept becomes intuitive.` },
        { question: 'What are the most common exam mistakes on this topic?', answer: `The most common mistakes come from **surface-level understanding** — memorising formulas without understanding when and why to apply them. Go deeper: understand the conditions, the exceptions, and the edge cases. That's what separates 90th from 99th percentile.` }
      ],
      questions: [
        { type: 'MCQ', question: `Which of the following best describes the fundamental principle behind ${topicName}?`, options: ['It relies entirely on memorisation of formulas', 'It builds from first principles toward application', 'It is purely theoretical with no practical use', 'It only applies in controlled laboratory settings'], correct: 1, explanation: `**Deep conceptual understanding** is always the right approach. Memorisation without understanding fails under pressure — in exams and in practice. Building from first principles creates durable knowledge.` }
      ],
      graph: getFallbackGraph(topicName)
    };
  }

  function getTopicContent(topicName, currentSubject) {
    if (topicName.toLowerCase().includes('preamble')) {
      return _getPreambleDemoContent();
    }
    if (topicName.toLowerCase().includes('differentiat') || topicName.toLowerCase().includes('calculus')) {
      return _getDifferentiationDemoContent();
    }
    if (topicName.toLowerCase().includes('alignment') || topicName.toLowerCase().includes('needleman') || topicName.toLowerCase().includes('smith')) {
      return _getAlignmentDemoContent();
    }
    return _getGenericDemoContent(topicName, currentSubject);
  }

  function getDoubtAnswer(question) {
    return `## Answer\n\nGreat question! Let's break this down clearly.\n\n**The short answer:** This is a nuanced concept that becomes clear once you see it from the right angle.\n\n**The detailed explanation:**\n\nStart from what you know — then build toward the unknown. Every complex idea is an extension of something simpler.\n\n1. **First**, identify what you already understand\n2. **Then**, find the connection to the new concept\n3. **Finally**, test your understanding with an example\n\n> Connect to the Amazon Nova backend for a fully personalised answer tailored to your learning profile.\n\n**Key insight:** Questions like this reveal the exact conceptual gap that, once filled, unlocks a whole cluster of related understanding. Don't skip them!`;
  }

  function getTopicsForChapter(chapterName, index) {
    return [
      { name: `Introduction to ${chapterName}`, examFreq: '★★★ High Yield', difficulty: '◇ Beginner', readTime: '⏱ 8 min' },
      { name: `Core Concepts of ${chapterName}`, examFreq: '★★★ High Yield', difficulty: '◈ Intermediate', readTime: '⏱ 12 min' },
      { name: 'Key Definitions & Terminology', examFreq: '★★★ High Yield', difficulty: '◇ Beginner', readTime: '⏱ 6 min' },
      { name: 'Detailed Analysis & Framework', examFreq: '★★ Medium', difficulty: '◈ Intermediate', readTime: '⏱ 14 min' },
      { name: 'Important Case Studies & Examples', examFreq: '★★★ High Yield', difficulty: '◈ Intermediate', readTime: '⏱ 10 min' },
      { name: 'Exam-Critical Points & PYQ Patterns', examFreq: '★★★ High Yield', difficulty: '◆ Advanced', readTime: '⏱ 8 min' },
    ];
  }

  function getFallbackGraph(topicName) {
    return {
      nodes: [
        { id: 'center', label: topicName || 'Current Topic', type: 'core' },
        { id: 'p1', label: 'Prerequisite A', type: 'prereq' },
        { id: 'p2', label: 'Prerequisite B', type: 'prereq' },
        { id: 'r1', label: 'Related Concept', type: 'related' },
        { id: 'r2', label: 'Adjacent Topic', type: 'related' },
        { id: 'c1', label: 'Cross-Subject Link', type: 'cross' }
      ],
      links: [
        { source: 'center', target: 'p1' },
        { source: 'center', target: 'p2' },
        { source: 'center', target: 'r1' },
        { source: 'center', target: 'r2' },
        { source: 'center', target: 'c1' }
      ]
    };
  }

  return {
    BOOK_SUGGESTIONS: BOOK_SUGGESTIONS,
    getSubjectMap: getSubjectMap,
    getTopicContent: getTopicContent,
    getDoubtAnswer: getDoubtAnswer,
    getTopicsForChapter: getTopicsForChapter,
    getFallbackGraph: getFallbackGraph
  };

})();
