import type { RoadmapStep, WeeklyScheduleData, WeeklyTask } from '../types';

// DevOps Roadmap Data (based on your markdown file)
export const devopsRoadmapData: RoadmapStep[] = [
  {
    id: 1,
    title: "🏗️ Step 1 — Foundation Layer",
    description: "Master the fundamental skills every DevOps engineer needs",
    skills: ["🐧 Linux", "🌐 Networking", "📚 Git"],
    details: {
      "🐧 Linux": "Every DevOps engineer works on Linux servers daily. Learn commands, file systems, users, processes.",
      "🌐 Networking": "Understand how services communicate. Learn IP, DNS, ports, HTTP/HTTPS, firewalls.",
      "📚 Git": "Manage code & configurations for automation pipelines. Master commits, branches, merges, pull requests."
    },
    status: "not-started"
  },
  {
    id: 2,
    title: "🤖 Step 2 — Automation & Scripting",
    description: "Automate repetitive tasks and integrate with APIs",
    skills: ["💻 Bash Scripting", "🐍 Python"],
    details: {
      "💻 Bash Scripting": "Automate repetitive Linux tasks. Write scripts for backups, deployments, monitoring.",
      "🐍 Python": "For advanced automation and API integration. Automate CI/CD tasks, interact with cloud APIs."
    },
    status: "not-started"
  },
  {
    id: 3,
    title: "☁️ Step 3 — Cloud Skills",
    description: "Deploy and manage applications in the cloud",
    skills: ["🟠 AWS", "🔵 Azure", "🟡 GCP"],
    details: {
      "🟠 AWS": "Almost all companies deploy to cloud. Master EC2, S3, IAM, RDS, VPC, CloudWatch."
    },
    status: "not-started"
  },
  {
    id: 4,
    title: "📦 Step 4 — Containerization",
    description: "Run and manage applications in isolated environments",
    skills: ["🐳 Docker", "⛵ Kubernetes"],
    details: {
      "🐳 Docker": "Run apps in isolated environments. Build, run, and manage containers.",
      "⛵ Kubernetes": "Manage containers at scale. Deploy and scale apps in production."
    },
    status: "not-started"
  },
  {
    id: 5,
    title: "🔄 Step 5 — CI/CD",
    description: "Automate build, test, and deployment processes",
    skills: ["🏗️ Jenkins"],
    details: {
      "🏗️ Jenkins": "Automate build → test → deploy. Create pipelines for continuous delivery."
    },
    status: "not-started"
  },
  {
    id: 6,
    title: "⚖️ Step 6 — Web & Load Balancing",
    description: "Serve applications and balance traffic efficiently",
    skills: ["🌐 Nginx"],
    details: {
      "🌐 Nginx": "Serve apps, reverse proxy, load balance traffic."
    },
    status: "not-started"
  },
  {
    id: 7,
    title: "🏛️ Step 7 — Infrastructure as Code",
    description: "Automate infrastructure and server configuration",
    skills: ["🌍 Terraform", "⚙️ Ansible"],
    details: {
      "🌍 Terraform": "Automate cloud resource creation.",
      "⚙️ Ansible": "Automate server configuration."
    },
    status: "not-started"
  },
  {
    id: 8,
    title: "📊 Step 8 — Monitoring & Security",
    description: "Keep systems monitored, secure, and observable",
    skills: ["📈 Prometheus", "📊 Grafana", "🔒 DevSecOps"],
    details: {
      "📈 Prometheus": "Collect system metrics.",
      "📊 Grafana": "Visualize monitoring data.",
      "🔒 DevSecOps": "Keep systems safe with security best practices."
    },
    status: "not-started"
  },
  {
    id: 9,
    title: "🚀 Step 9 — Advanced DevOps & Production",
    description: "Master advanced concepts for production-ready systems",
    skills: ["🔧 Service Mesh", "📋 Logging & Observability", "⚡ Performance Optimization", "🔄 GitOps"],
    details: {
      "🔧 Service Mesh": "Learn Istio/Linkerd for microservices communication, traffic management, and security policies.",
      "📋 Logging & Observability": "Implement centralized logging with ELK Stack (Elasticsearch, Logstash, Kibana) and distributed tracing.",
      "⚡ Performance Optimization": "Optimize application performance, resource utilization, and cost management in cloud environments.",
      "🔄 GitOps": "Implement GitOps workflows with ArgoCD/Flux for automated deployments and infrastructure management."
    },
    status: "not-started"
  }
];

// C++ & DSA Roadmap Data (exact sequence from your markdown file)
export const cppDsaRoadmapData: RoadmapStep[] = [
  {
    id: 1,
    title: "🛠 Step 1 — Fundamentals",
    description: "Master the core foundations of C++ programming",
    skills: ["Introduction 📝", "Core Concepts 🔑"],
    details: {
      "Introduction 📝": "📌 Learn: Flowcharts, Pseudocode, Compiler Installation (Windows & Mac) | 🔧 Practice: Write pseudocode for simple tasks (sum of numbers, factorial) | ⚡ Example: Convert a flowchart to working C++ code.",
      "Core Concepts 🔑": "📌 Learn: Variables, Data Types, Operators, Conditionals, Loops, Functions, Patterns | 🔧 Practice: Solve 50+ basic problems (prime numbers, factorial, Fibonacci) | ⚡ Example: Print Pascal's Triangle or number patterns."
    },
    status: "not-started"
  },
  {
    id: 2,
    title: "📜 Step 2 — Number System, Bitwise & Complexity",
    description: "Understand binary operations and algorithm analysis",
    skills: ["Binary & Bitwise ⚡", "Algorithm Analysis ⏱"],
    details: {
      "Binary & Bitwise ⚡": "📌 Learn: Binary Number System, Bitwise Operators, Data Type Modifiers | 🔧 Practice: Count set bits, check power of 2, swap numbers using XOR | ⚡ Example: Solve 'Single Number' problem using XOR.",
      "Algorithm Analysis ⏱": "📌 Learn: Time Complexity (Big-O, Big-Theta), Space Complexity | 🔧 Practice: Compare brute force vs optimized (e.g., O(n²) vs O(n) solutions) | ⚡ Example: Analyze Kadane's Algorithm vs naive subarray sum."
    },
    status: "not-started"
  },
  {
    id: 3,
    title: "📦 Step 3 — Arrays & Vectors",
    description: "Master array manipulation and vector operations",
    skills: ["1D Arrays ➡️", "2D Arrays 🔲", "Vectors 🚀"],
    details: {
      "1D Arrays ➡️": "📌 Learn: Basics, Kadane's Algorithm, Moore's Voting, Stock Buy/Sell, DNF Sort | 🔧 Practice: Implement 20+ array problems from LeetCode | ⚡ Example: Solve 'Maximum Subarray Sum' with Kadane's Algorithm.",
      "2D Arrays 🔲": "📌 Learn: Matrix Basics, Searching, Spiral Traversal | 🔧 Practice: Solve matrix-based problems (rotate matrix, transpose) | ⚡ Example: Implement Spiral Order Traversal.",
      "Vectors 🚀": "📌 Learn: STL vector, push_back, pop_back, iterators | 🔧 Practice: Use vectors in coding challenges | ⚡ Example: Store dynamic input and sort using STL."
    },
    status: "not-started"
  },
  {
    id: 4,
    title: "🎯 Step 4 — Pointers",
    description: "Understand memory management and pointer operations",
    skills: ["Pointer Basics"],
    details: {
      "Pointer Basics": "📌 Learn: Pointer basics, pointer arithmetic, function pointers | 🔧 Practice: Write programs using arrays with pointers, pointer to pointer | ⚡ Example: Implement dynamic memory allocation with new/delete."
    },
    status: "not-started"
  },
  {
    id: 5,
    title: "🔍 Step 5 — Searching & Sorting",
    description: "Implement efficient searching and sorting algorithms",
    skills: ["Searching 🔎", "Sorting 🌀"],
    details: {
      "Searching 🔎": "📌 Learn: Binary Search, Rotated Array Search, Peak Element, Book Allocation, Aggressive Cows | 🔧 Practice: Apply binary search on answer technique | ⚡ Example: Solve Painter's Partition with binary search.",
      "Sorting 🌀": "📌 Learn: Bubble, Selection, Insertion, Merge, Quick Sort | 🔧 Practice: Sort arrays with different algorithms & count inversions | ⚡ Example: Compare time taken by O(n²) vs O(n log n) sorting."
    },
    status: "not-started"
  },
  {
    id: 6,
    title: "🧵 Step 6 — Strings & STL",
    description: "Master string manipulation and Standard Template Library",
    skills: ["C++ STL ⚙️", "Strings 🔤"],
    details: {
      "C++ STL ⚙️": "📌 Learn: Vectors, Maps, Sets, Queues, Stacks | 🔧 Practice: Re-implement problems using STL | ⚡ Example: Use unordered_map to solve Two Sum in O(n).",
      "Strings 🔤": "📌 Learn: Character arrays, string functions, palindrome check, substring removal, permutations, compression | 🔧 Practice: Solve 20+ string problems (LeetCode/Easy-Medium) | ⚡ Example: Reverse words in a string without using built-in functions."
    },
    status: "not-started"
  },
  {
    id: 7,
    title: "➗ Step 7 — Mathematical Algorithms",
    description: "Master mathematical concepts for competitive programming",
    skills: ["Mathematical Algorithms"],
    details: {
      "Mathematical Algorithms": "📌 Learn: Euclid's GCD Algorithm, Sieve of Eratosthenes, Modular Arithmetic | 🔧 Practice: Prime factorization, modular exponentiation | ⚡ Example: Compute (a^b) mod m efficiently."
    },
    status: "not-started"
  },
  {
    id: 8,
    title: "🔑 Step 8 — Hashing",
    description: "Implement efficient data retrieval using hash tables",
    skills: ["Hashing Fundamentals"],
    details: {
      "Hashing Fundamentals": "📌 Learn: Hash maps, frequency counting, collision handling | 🔧 Practice: Implement Two Sum, 3Sum, 4Sum, Subarray Sum = K | ⚡ Example: Detect duplicates using hashing in O(n)."
    },
    status: "not-started"
  },
  {
    id: 9,
    title: "♻ Step 9 — Recursion & Backtracking",
    description: "Solve complex problems using recursive approaches",
    skills: ["Recursion 🔄", "Backtracking 🧩"],
    details: {
      "Recursion 🔄": "📌 Learn: Basics, Fibonacci, Binary Search recursion, check sorted array | 🔧 Practice: Write recursive functions for common problems | ⚡ Example: Solve Tower of Hanoi recursively.",
      "Backtracking 🧩": "📌 Learn: Subsets, Permutations, N-Queens, Sudoku, Rat in Maze, Combination Sum | 🔧 Practice: Print all possible solutions for a given state space | ⚡ Example: Implement N-Queens for n=4 and visualize board."
    },
    status: "not-started"
  },
  {
    id: 10,
    title: "🏗 Step 10 — Object-Oriented Programming (OOPs)",
    description: "Apply OOP concepts to build robust applications",
    skills: ["OOP Fundamentals"],
    details: {
      "OOP Fundamentals": "📌 Learn: Classes, Objects, Inheritance, Polymorphism, Encapsulation, Abstraction | 🔧 Practice: Design small projects (Bank System, Student Management) | ⚡ Example: Implement polymorphism with virtual functions."
    },
    status: "not-started"
  },
  {
    id: 11,
    title: "🔗 Step 11 — Linked Lists",
    description: "Master dynamic data structures and pointer manipulation",
    skills: ["Singly 🔗", "Doubly ⬅️➡️", "Circular 🔄"],
    details: {
      "Singly 🔗": "📌 Learn: Basics, Reverse, Middle, Detect Cycle, Merge Sorted, Random Pointer, Reverse K-Group | 🔧 Practice: Implement linked list operations without STL | ⚡ Example: Floyd's Cycle Detection algorithm.",
      "Doubly ⬅️➡️": "📌 Learn: Basics, Flatten a Doubly Linked List | 🔧 Practice: Insert/Delete from both ends.",
      "Circular 🔄": "📌 Learn: Basics of Circular Linked List | 🔧 Practice: Josephus Problem."
    },
    status: "not-started"
  },
  {
    id: 12,
    title: "🥞 Step 12 — Stacks & Queues",
    description: "Implement LIFO and FIFO data structures",
    skills: ["Stacks 📚", "Queues 🎢"],
    details: {
      "Stacks 📚": "📌 Learn: Valid Parentheses, Next Greater, Stock Span, Histogram, Rainwater, Min Stack, LRU Cache | 🔧 Practice: Implement stack using arrays & linked lists | ⚡ Example: Solve trapping rainwater using stack.",
      "Queues 🎢": "📌 Learn: Normal Queue, Circular Queue, Queue with Stacks, Sliding Window Maximum | 🔧 Practice: Implement custom queue | ⚡ Example: Sliding Window Maximum in O(n)."
    },
    status: "not-started"
  },
  {
    id: 13,
    title: "🌀 Step 13 — Greedy Algorithms",
    description: "Solve optimization problems with greedy approaches",
    skills: ["Greedy Fundamentals"],
    details: {
      "Greedy Fundamentals": "📌 Learn: Gas Station Problem, Interval Scheduling basics | 🔧 Practice: Implement greedy choice step by step | ⚡ Example: Solve Gas Station problem with linear traversal."
    },
    status: "not-started"
  },
  {
    id: 14,
    title: "🌳 Step 14 — Trees & BST",
    description: "Master hierarchical data structures and tree algorithms",
    skills: ["Binary Trees 🌲", "BST 🌿"],
    details: {
      "Binary Trees 🌲": "📌 Learn: Traversals, Height, Diameter, Top View, Sum Tree, LCA, Preorder+Inorder Build, Flatten Tree | 🔧 Practice: Implement DFS and BFS traversals recursively & iteratively | ⚡ Example: Check if one tree is subtree of another.",
      "BST 🌿": "📌 Learn: Validate BST, Sorted Array to BST, Kth Smallest, BST Iterator, LCA, Merge BSTs | 🔧 Practice: Implement BST insertion, deletion, traversal | ⚡ Example: Find Inorder Predecessor & Successor."
    },
    status: "not-started"
  },
  {
    id: 15,
    title: "🌐 Step 15 — Graphs",
    description: "Solve complex network and connectivity problems",
    skills: ["Graph Fundamentals"],
    details: {
      "Graph Fundamentals": "📌 Learn: Graph Representation (Adjacency List, Matrix), BFS, DFS, Cycle Detection (DFS & BFS), Connected Components | 🔧 Practice: Implement BFS/DFS from scratch | ⚡ Example: Solve Number of Islands problem using BFS."
    },
    status: "not-started"
  }
];

// Weekly Schedule Data (based on your daily routine markdown)
export const weeklyScheduleData: WeeklyScheduleData = {
  "Monday": [
    { time: "07:00-08:00", task: "DSA Practice", type: "learning" },
    { time: "20:00-21:30", task: "Side Project Development", type: "project" },
    { time: "21:30-22:00", task: "DSA Revision / 1 extra problem", type: "learning" },
    { time: "22:00-22:30", task: "Wind down: plan next day, light English reading", type: "planning" }
  ],
  "Tuesday": [
    { time: "07:00-08:00", task: "DSA Practice", type: "learning" },
    { time: "20:00-21:30", task: "Side Project Development", type: "project" },
    { time: "21:30-22:00", task: "DSA Revision / 1 extra problem", type: "learning" },
    { time: "22:00-22:30", task: "Wind down: plan next day, light English reading", type: "planning" }
  ],
  "Wednesday": [
    { time: "07:00-08:00", task: "DSA Practice", type: "learning" },
    { time: "20:00-21:30", task: "Side Project Development", type: "project" },
    { time: "21:30-22:00", task: "DSA Revision / 1 extra problem", type: "learning" },
    { time: "22:00-22:30", task: "Wind down: plan next day, light English reading", type: "planning" }
  ],
  "Thursday": [
    { time: "07:00-08:00", task: "DSA Practice", type: "learning" },
    { time: "20:00-21:30", task: "Side Project Development", type: "project" },
    { time: "21:30-22:00", task: "DSA Revision / 1 extra problem", type: "learning" },
    { time: "22:00-22:30", task: "Wind down: plan next day, light English reading", type: "planning" }
  ],
  "Friday": [
    { time: "07:00-08:00", task: "DSA Practice", type: "learning" },
    { time: "20:00-21:30", task: "Side Project Development", type: "project" },
    { time: "21:30-22:00", task: "DSA Revision / 1 extra problem", type: "learning" },
    { time: "22:00-22:30", task: "Wind down: plan next day, light English reading", type: "planning" }
  ],
  "Saturday": [
    { time: "07:00-09:00", task: "DevOps Learning", type: "learning" },
    { time: "09:00-10:30", task: "Side Project", type: "project" },
    { time: "10:30-11:30", task: "English Practice", type: "learning" },
    { time: "11:30-12:00", task: "DSA Quick Practice (1–2 problems)", type: "learning" },
    { time: "12:00-13:00", task: "Lunch + Break", type: "break" },
    { time: "13:00-16:00", task: "DevOps Hands-on Labs", type: "learning" },
    { time: "17:00-20:00", task: "Side Project", type: "project" },
    { time: "21:00-22:00", task: "DevOps Revision / Notes", type: "learning" }
  ],
  "Sunday": [
    { time: "07:00-09:00", task: "DevOps Practice", type: "learning" },
    { time: "09:00-10:30", task: "Side Project", type: "project" },
    { time: "10:30-11:30", task: "English Practice", type: "learning" },
    { time: "11:30-12:00", task: "DSA Quick Practice (1–2 problems)", type: "learning" },
    { time: "13:00-16:00", task: "DevOps End-to-End Project", type: "learning" },
    { time: "17:00-20:00", task: "Side Project", type: "project" },
    { time: "21:00-22:00", task: "Weekly Review + Plan Ahead", type: "planning" }
  ]
};

export const initializeWeeklyTasks = (): { [day: string]: WeeklyTask[] } => {
  const weekTasks: { [day: string]: WeeklyTask[] } = {};
  
  Object.entries(weeklyScheduleData).forEach(([day, tasks]) => {
    weekTasks[day] = tasks.map(task => ({
      ...task,
      completed: false,
      isExpired: false,
      id: `${day}-${Date.now()}-${Math.random()}`
    }));
  });
  
  return weekTasks;
};