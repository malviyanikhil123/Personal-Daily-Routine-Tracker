// Application State
let appState = {
    devopsRoadmap: [],
    cppDsaRoadmap: [],
    weeklyTasks: {},
    dailyLogs: {},
    currentWeek: getCurrentWeek(),
    currentTab: 'devops-roadmap'
};

// DevOps Roadmap Data (based on your markdown file)
const devopsRoadmapData = [
    {
        id: 1,
        title: "Foundation Layer",
        description: "Master the fundamental skills every DevOps engineer needs",
        skills: ["Linux", "Networking", "Git"],
        details: {
            "Linux": "Every DevOps engineer works on Linux servers daily. Learn commands, file systems, users, processes.",
            "Networking": "Understand how services communicate. Learn IP, DNS, ports, HTTP/HTTPS, firewalls.",
            "Git": "Manage code & configurations for automation pipelines. Master commits, branches, merges, pull requests."
        },
        status: "not-started"
    },
    {
        id: 2,
        title: "Automation & Scripting",
        description: "Automate repetitive tasks and integrate with APIs",
        skills: ["Bash Scripting", "Python"],
        details: {
            "Bash Scripting": "Automate repetitive Linux tasks. Write scripts for backups, deployments, monitoring.",
            "Python": "For advanced automation and API integration. Automate CI/CD tasks, interact with cloud APIs."
        },
        status: "not-started"
    },
    {
        id: 3,
        title: "Cloud Skills",
        description: "Deploy and manage applications in the cloud",
        skills: ["AWS", "Azure", "GCP"],
        details: {
            "AWS": "Almost all companies deploy to cloud. Master EC2, S3, IAM, RDS, VPC, CloudWatch."
        },
        status: "not-started"
    },
    {
        id: 4,
        title: "Containerization",
        description: "Run and manage applications in isolated environments",
        skills: ["Docker", "Kubernetes"],
        details: {
            "Docker": "Run apps in isolated environments. Build, run, and manage containers.",
            "Kubernetes": "Manage containers at scale. Deploy and scale apps in production."
        },
        status: "not-started"
    },
    {
        id: 5,
        title: "CI/CD",
        description: "Automate build, test, and deployment processes",
        skills: ["Jenkins"],
        details: {
            "Jenkins": "Automate build → test → deploy. Create pipelines for continuous delivery."
        },
        status: "not-started"
    },
    {
        id: 6,
        title: "Web & Load Balancing",
        description: "Serve applications and balance traffic efficiently",
        skills: ["Nginx"],
        details: {
            "Nginx": "Serve apps, reverse proxy, load balance traffic."
        },
        status: "not-started"
    },
    {
        id: 7,
        title: "Infrastructure as Code",
        description: "Automate infrastructure and server configuration",
        skills: ["Terraform", "Ansible"],
        details: {
            "Terraform": "Automate cloud resource creation.",
            "Ansible": "Automate server configuration."
        },
        status: "not-started"
    },
    {
        id: 8,
        title: "Monitoring & Security",
        description: "Keep systems monitored, secure, and observable",
        skills: ["Prometheus", "Grafana", "DevSecOps"],
        details: {
            "Prometheus": "Collect system metrics.",
            "Grafana": "Visualize monitoring data.",
            "DevSecOps": "Keep systems safe with security best practices."
        },
        status: "not-started"
    }
];

// C++ & DSA Roadmap Data (exact sequence from your markdown file)
const cppDsaRoadmapData = [
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
        description: "Implement essential mathematical algorithms",
        skills: ["Mathematical Algorithms"],
        details: {
            "Mathematical Algorithms": "📌 Learn: Euclid's GCD Algorithm, Sieve of Eratosthenes, Modular Arithmetic | 🔧 Practice: Prime factorization, modular exponentiation | ⚡ Example: Compute (a^b) mod m efficiently."
        },
        status: "not-started"
    },
    {
        id: 8,
        title: "🔑 Step 8 — Hashing",
        description: "Master hash tables and collision handling",
        skills: ["Hashing"],
        details: {
            "Hashing": "📌 Learn: Hash maps, frequency counting, collision handling | 🔧 Practice: Implement Two Sum, 3Sum, 4Sum, Subarray Sum = K | ⚡ Example: Detect duplicates using hashing in O(n)."
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
        description: "Master object-oriented programming concepts",
        skills: ["OOPs"],
        details: {
            "OOPs": "📌 Learn: Classes, Objects, Inheritance, Polymorphism, Encapsulation, Abstraction | 🔧 Practice: Design small projects (Bank System, Student Management) | ⚡ Example: Implement polymorphism with virtual functions."
        },
        status: "not-started"
    },
    {
        id: 11,
        title: "🔗 Step 11 — Linked Lists",
        description: "Implement and manipulate dynamic data structures",
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
        description: "Master LIFO and FIFO data structures",
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
        description: "Solve optimization problems using greedy approach",
        skills: ["Greedy Strategy"],
        details: {
            "Greedy Strategy": "📌 Learn: Gas Station Problem, Interval Scheduling basics | 🔧 Practice: Implement greedy choice step by step | ⚡ Example: Solve Gas Station problem with linear traversal."
        },
        status: "not-started"
    },
    {
        id: 14,
        title: "🌳 Step 14 — Trees & BST",
        description: "Implement hierarchical data structures",
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
        description: "Master graph algorithms and applications",
        skills: ["Graph Fundamentals"],
        details: {
            "Graph Fundamentals": "📌 Learn: Graph Representation (Adjacency List, Matrix), BFS, DFS, Cycle Detection (DFS & BFS), Connected Components | 🔧 Practice: Implement BFS/DFS from scratch | ⚡ Example: Solve Number of Islands problem using BFS."
        },
        status: "not-started"
    }
];

// Weekly Schedule Data (based on your daily routine)
const weeklyScheduleData = {
    "Monday": [
        { time: "07:00-08:00", task: "DSA practice", type: "learning" },
        { time: "09:00-19:30", task: "Job", type: "work" },
        { time: "20:00-21:30", task: "Side project", type: "project" },
        { time: "21:30-22:00", task: "DSA revision or 1 extra problem", type: "learning" },
        { time: "22:00-22:30", task: "Plan next day + English reading", type: "planning" }
    ],
    "Tuesday": [
        { time: "07:00-08:00", task: "DSA practice", type: "learning" },
        { time: "09:00-19:30", task: "Job", type: "work" },
        { time: "20:00-21:30", task: "Side project", type: "project" },
        { time: "21:30-22:00", task: "DSA revision or 1 extra problem", type: "learning" },
        { time: "22:00-22:30", task: "Plan next day + English reading", type: "planning" }
    ],
    "Wednesday": [
        { time: "07:00-08:00", task: "DSA practice", type: "learning" },
        { time: "09:00-19:30", task: "Job", type: "work" },
        { time: "20:00-21:30", task: "Side project", type: "project" },
        { time: "21:30-22:00", task: "DSA revision or 1 extra problem", type: "learning" },
        { time: "22:00-22:30", task: "Plan next day + English reading", type: "planning" }
    ],
    "Thursday": [
        { time: "07:00-08:00", task: "DSA practice", type: "learning" },
        { time: "09:00-19:30", task: "Job", type: "work" },
        { time: "20:00-21:30", task: "Side project", type: "project" },
        { time: "21:30-22:00", task: "DSA revision or 1 extra problem", type: "learning" },
        { time: "22:00-22:30", task: "Plan next day + English reading", type: "planning" }
    ],
    "Friday": [
        { time: "07:00-08:00", task: "DSA practice", type: "learning" },
        { time: "09:00-19:30", task: "Job", type: "work" },
        { time: "20:00-21:30", task: "Side project", type: "project" },
        { time: "21:30-22:00", task: "DSA revision or 1 extra problem", type: "learning" },
        { time: "22:00-22:30", task: "Plan next day + English reading", type: "planning" }
    ],
    "Saturday": [
        { time: "07:00-09:00", task: "DevOps learning", type: "learning" },
        { time: "09:00-10:30", task: "Side project feature building", type: "project" },
        { time: "10:30-11:30", task: "English practice", type: "learning" },
        { time: "11:30-12:00", task: "DSA quick practice", type: "learning" },
        { time: "13:00-16:00", task: "DevOps labs", type: "learning" },
        { time: "16:00-17:00", task: "Chill / walk / reset", type: "break" },
        { time: "17:00-20:00", task: "Side project integrations", type: "project" },
        { time: "21:00-22:00", task: "DevOps revision", type: "learning" }
    ],
    "Sunday": [
        { time: "07:00-09:00", task: "DevOps practice", type: "learning" },
        { time: "09:00-10:30", task: "Side project testing and polish", type: "project" },
        { time: "10:30-11:30", task: "English practice", type: "learning" },
        { time: "11:30-12:00", task: "DSA quick practice", type: "learning" },
        { time: "13:00-16:00", task: "DevOps labs", type: "learning" },
        { time: "16:00-17:00", task: "Chill / walk / reset", type: "break" },
        { time: "17:00-20:00", task: "Side project demo prep", type: "project" },
        { time: "21:00-22:00", task: "DevOps revision", type: "learning" }
    ]
};

// Utility Functions
function getCurrentWeek() {
    const now = new Date();
    // Get current day of week (0 = Sunday, 1 = Monday, etc.)
    const dayOfWeek = now.getDay();
    // Calculate days to subtract to get to Monday
    // If today is Sunday (0), we want Monday of this week (tomorrow), so subtract -1 (add 1)
    // If today is Monday (1), we want today, so subtract 0
    // If today is Tuesday (2), we want yesterday, so subtract 1
    const daysToMonday = dayOfWeek === 0 ? -1 : dayOfWeek - 1;
    
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - daysToMonday);
    startOfWeek.setHours(0, 0, 0, 0); // Set to start of day
    
    // Use local date formatting to avoid timezone issues
    const year = startOfWeek.getFullYear();
    const month = String(startOfWeek.getMonth() + 1).padStart(2, '0');
    const day = String(startOfWeek.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => container.removeChild(toast), 300);
    }, 3000);
}

// Local Storage Functions
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key, defaultValue = null) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

// Check and Update Week Function
function checkAndUpdateWeek() {
    const currentCalculatedWeek = getCurrentWeek();
    const lastSavedWeek = loadFromLocalStorage('lastWeek', null);
    
    // If we're in a new week, update the current week and reset weekly tasks
    if (lastSavedWeek !== currentCalculatedWeek) {
        appState.currentWeek = currentCalculatedWeek;
        saveToLocalStorage('lastWeek', currentCalculatedWeek);
        
        // If this is a new week (not first time), show notification
        if (lastSavedWeek !== null) {
            showToast(`🗓️ New week started! Week of ${formatWeekRange(currentCalculatedWeek)}`, 'info');
        }
    } else {
        appState.currentWeek = currentCalculatedWeek;
    }
}

// Helper function to format week range
function formatWeekRange(weekStartDate) {
    const weekStart = new Date(weekStartDate);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;
}

// Check and update roadmap data if structure has changed
function checkAndUpdateRoadmapData() {
    const ROADMAP_VERSION = "2.0"; // Update this when roadmap structure changes
    const savedVersion = loadFromLocalStorage('roadmapVersion', '1.0');
    
    if (savedVersion !== ROADMAP_VERSION) {
        // Clear old roadmap data to force refresh with new structure
        localStorage.removeItem('cppDsaRoadmap');
        localStorage.removeItem('devopsRoadmap');
        saveToLocalStorage('roadmapVersion', ROADMAP_VERSION);
        showToast('📚 Roadmap updated with new structure!', 'info');
    }
}

// Initialize Application
function initializeApp() {
    // Check if we need to update to a new week
    checkAndUpdateWeek();
    
    // Check for roadmap updates and clear old data if needed
    checkAndUpdateRoadmapData();
    
    // Load saved data
    appState.devopsRoadmap = loadFromLocalStorage('devopsRoadmap', devopsRoadmapData);
    appState.cppDsaRoadmap = loadFromLocalStorage('cppDsaRoadmap', cppDsaRoadmapData);
    appState.weeklyTasks = loadFromLocalStorage('weeklyTasks', {});
    appState.dailyLogs = loadFromLocalStorage('dailyLogs', {});
    
    // Initialize weekly tasks if not exists for current week
    if (!appState.weeklyTasks[appState.currentWeek]) {
        initializeWeeklyTasks();
    }
    
    // Check for expired tasks on app load
    markExpiredTasks();
    
    // Reset any incorrectly marked expired tasks for current day
    resetIncorrectlyExpiredTasks();
    
    // Setup event listeners
    setupTabNavigation();
    setupWeeklyTasksEvents();
    setupRoadmapEvents();
    setupLogsEvents();
    
    // Render all sections
    renderDevopsRoadmap();
    renderCppDsaRoadmap();
    renderWeeklyTasks();
    renderDailyLogs();
    
    // Update current week display
    updateCurrentWeekDisplay();
    
    // Set up automatic week checking (check every hour)
    setInterval(checkAndUpdateWeek, 60 * 60 * 1000);
    
    // Set up automatic expired task checking (check every 30 minutes)
    setInterval(markExpiredTasks, 30 * 60 * 1000);
}

// Tab Navigation
function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            appState.currentTab = targetTab;
            
            // Refresh content if needed
            if (targetTab === 'logs') {
                renderDailyLogs();
            }
        });
    });
}

// DevOps Roadmap Functions
function renderDevopsRoadmap() {
    const container = document.getElementById('devopsRoadmapContainer');
    container.innerHTML = '';
    
    appState.devopsRoadmap.forEach(step => {
        const stepElement = createRoadmapStepElement(step, 'devops');
        container.appendChild(stepElement);
    });
    
    updateRoadmapProgress('devops');
}

// C++ & DSA Roadmap Functions
function renderCppDsaRoadmap() {
    const container = document.getElementById('cppRoadmapContainer');
    container.innerHTML = '';
    
    appState.cppDsaRoadmap.forEach(step => {
        const stepElement = createRoadmapStepElement(step, 'cpp');
        container.appendChild(stepElement);
    });
    
    updateRoadmapProgress('cpp');
}

function createRoadmapStepElement(step, roadmapType) {
    const stepDiv = document.createElement('div');
    stepDiv.className = 'roadmap-step';
    stepDiv.innerHTML = `
        <div class="step-header">
            <h3 class="step-title">${step.title}</h3>
            <span class="step-status ${step.status}">${step.status.replace('-', ' ')}</span>
        </div>
        <p class="step-description">${step.description}</p>
        <div class="step-skills">
            ${step.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
        <div class="step-actions">
            <button class="btn-primary" onclick="updateStepStatus(${step.id}, 'in-progress', '${roadmapType}')">
                Start Learning
            </button>
            <button class="btn-secondary" onclick="showStepDetails(${step.id}, '${roadmapType}')">
                View Details
            </button>
            ${step.status !== 'not-started' ? `
                <button class="btn-primary" onclick="updateStepStatus(${step.id}, 'completed', '${roadmapType}')">
                    Mark Complete
                </button>
            ` : ''}
        </div>
    `;
    return stepDiv;
}

// Force refresh roadmap data (useful for development/testing)
function forceRefreshRoadmaps() {
    localStorage.removeItem('cppDsaRoadmap');
    localStorage.removeItem('devopsRoadmap');
    localStorage.removeItem('roadmapVersion');
    
    // Reload with fresh data
    appState.devopsRoadmap = devopsRoadmapData.map(step => ({ ...step }));
    appState.cppDsaRoadmap = cppDsaRoadmapData.map(step => ({ ...step }));
    
    // Save fresh data
    saveToLocalStorage('devopsRoadmap', appState.devopsRoadmap);
    saveToLocalStorage('cppDsaRoadmap', appState.cppDsaRoadmap);
    saveToLocalStorage('roadmapVersion', '2.0');
    
    // Re-render
    renderDevopsRoadmap();
    renderCppDsaRoadmap();
    
    showToast('🔄 Roadmaps refreshed with latest data!', 'success');
}

function updateStepStatus(stepId, newStatus, roadmapType = 'devops') {
    const roadmap = roadmapType === 'devops' ? appState.devopsRoadmap : appState.cppDsaRoadmap;
    const step = roadmap.find(s => s.id === stepId);
    if (step) {
        step.status = newStatus;
        const storageKey = roadmapType === 'devops' ? 'devopsRoadmap' : 'cppDsaRoadmap';
        saveToLocalStorage(storageKey, roadmap);
        
        if (roadmapType === 'devops') {
            renderDevopsRoadmap();
        } else {
            renderCppDsaRoadmap();
        }
        
        showToast(`${step.title} marked as ${newStatus.replace('-', ' ')}!`);
    }
}

function showStepDetails(stepId, roadmapType = 'devops') {
    const roadmap = roadmapType === 'devops' ? appState.devopsRoadmap : appState.cppDsaRoadmap;
    const step = roadmap.find(s => s.id === stepId);
    if (step) {
        const modal = document.getElementById('taskModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        const saveBtn = document.getElementById('modalSaveBtn');
        
        // Initialize skillsChecked if not exists
        if (!step.skillsChecked) {
            step.skillsChecked = {};
            Object.keys(step.details).forEach(skill => {
                step.skillsChecked[skill] = false;
            });
        }
        
        modalTitle.textContent = step.title;
        modalBody.innerHTML = `
            <div class="step-details">
                <p><strong>Description:</strong> ${step.description}</p>
                <p><strong>Current Status:</strong> 
                    <span class="status-badge ${step.status}">${step.status.replace('-', ' ')}</span>
                </p>
                <h4>Skills to Learn:</h4>
                <div class="skills-checklist">
                    ${Object.entries(step.details).map(([skill, desc]) => `
                        <div class="skill-item">
                            <label class="skill-checkbox-label">
                                <input type="checkbox" 
                                       class="skill-checkbox" 
                                       data-skill="${skill}"
                                       ${step.skillsChecked[skill] ? 'checked' : ''}>
                                <span class="skill-title">${skill}</span>
                            </label>
                            <p class="skill-description">${desc}</p>
                        </div>
                    `).join('')}
                </div>
                <div class="progress-summary">
                    <span id="skillProgress">${Object.values(step.skillsChecked).filter(checked => checked).length} of ${Object.keys(step.details).length} skills completed</span>
                </div>
            </div>
        `;
        
        // Store step info for reference
        modal.dataset.stepId = stepId;
        modal.dataset.roadmapType = roadmapType;
        
        // Update save button text based on completion
        updateSaveButtonState(step, saveBtn);
        
        // Setup checkbox event listeners
        setupSkillCheckboxes(step, roadmapType);
        
        modal.style.display = 'block';
    }
}

function updateSaveButtonState(step, saveBtn) {
    const totalSkills = Object.keys(step.details).length;
    const completedSkills = Object.values(step.skillsChecked).filter(checked => checked).length;
    
    if (completedSkills === totalSkills && step.status !== 'completed') {
        saveBtn.textContent = 'Mark as Complete';
        saveBtn.className = 'btn-primary';
        saveBtn.disabled = false;
    } else if (completedSkills > 0 && step.status === 'not-started') {
        saveBtn.textContent = 'Mark as In Progress';
        saveBtn.className = 'btn-primary';
        saveBtn.disabled = false;
    } else if (step.status === 'completed') {
        saveBtn.textContent = 'Completed ✓';
        saveBtn.className = 'btn-secondary';
        saveBtn.disabled = true;
    } else {
        saveBtn.textContent = 'Save Progress';
        saveBtn.className = 'btn-secondary';
        saveBtn.disabled = false;
    }
}

function setupSkillCheckboxes(step, roadmapType) {
    const checkboxes = document.querySelectorAll('.skill-checkbox');
    const progressElement = document.getElementById('skillProgress');
    const saveBtn = document.getElementById('modalSaveBtn');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const skill = e.target.dataset.skill;
            step.skillsChecked[skill] = e.target.checked;
            
            // Update progress display
            const completedSkills = Object.values(step.skillsChecked).filter(checked => checked).length;
            const totalSkills = Object.keys(step.details).length;
            progressElement.textContent = `${completedSkills} of ${totalSkills} skills completed`;
            
            // Update save button state
            updateSaveButtonState(step, saveBtn);
            
            // Auto-save progress
            const roadmap = roadmapType === 'devops' ? appState.devopsRoadmap : appState.cppDsaRoadmap;
            const storageKey = roadmapType === 'devops' ? 'devopsRoadmap' : 'cppDsaRoadmap';
            saveToLocalStorage(storageKey, roadmap);
            
            // Show feedback
            if (e.target.checked) {
                showToast(`✓ ${skill} marked as learned!`, 'success');
            }
            
            // Auto-complete step when all skills are checked
            if (completedSkills === totalSkills && step.status !== 'completed') {
                // Automatically mark step as completed
                step.status = 'completed';
                
                // Update save button to show completed state
                saveBtn.textContent = 'Completed ✓';
                saveBtn.className = 'btn-secondary';
                saveBtn.disabled = true;
                
                // Save the updated status
                saveToLocalStorage(storageKey, roadmap);
                
                // Show celebration message
                showToast('🎉 Step automatically completed! Excellent work!', 'success');
                
                // Refresh the roadmap display to show updated status
                setTimeout(() => {
                    if (roadmapType === 'devops') {
                        renderDevopsRoadmap();
                    } else {
                        renderCppDsaRoadmap();
                    }
                }, 1000); // Small delay to let user see the completion
            } else if (completedSkills > 0 && step.status === 'not-started') {
                // Mark as in-progress if first skill is checked
                step.status = 'in-progress';
                saveToLocalStorage(storageKey, roadmap);
                showToast('📚 Step started! Keep learning!', 'success');
            }
        });
    });
}

function updateRoadmapProgress(roadmapType = 'devops') {
    const roadmap = roadmapType === 'devops' ? appState.devopsRoadmap : appState.cppDsaRoadmap;
    const completed = roadmap.filter(s => s.status === 'completed').length;
    const total = roadmap.length;
    const percentage = Math.round((completed / total) * 100);
    
    const progressElementId = roadmapType === 'devops' ? 'devopsRoadmapProgress' : 'cppRoadmapProgress';
    const textElementId = roadmapType === 'devops' ? 'devopsRoadmapProgressText' : 'cppRoadmapProgressText';
    
    document.getElementById(progressElementId).style.width = `${percentage}%`;
    document.getElementById(textElementId).textContent = `${percentage}% Complete`;
}

// Weekly Tasks Functions
function initializeWeeklyTasks() {
    const weekTasks = {};
    Object.entries(weeklyScheduleData).forEach(([day, tasks]) => {
        weekTasks[day] = tasks.map(task => ({
            ...task,
            completed: false,
            isExpired: false,
            id: `${day}-${Date.now()}-${Math.random()}`
        }));
    });
    
    appState.weeklyTasks[appState.currentWeek] = weekTasks;
    saveToLocalStorage('weeklyTasks', appState.weeklyTasks);
}

// Check if a task is expired (past its day and not completed)
function isTaskExpired(day, task, currentWeek) {
    if (task.completed || task.isExpired) return task.isExpired;
    
    const now = new Date();
    // Fix timezone issue: append time to ensure local date parsing
    const taskDate = new Date(currentWeek + 'T00:00:00');
    
    // Get the day index (Monday = 0, Sunday = 6)
    const dayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(day);
    taskDate.setDate(taskDate.getDate() + dayIndex);
    
    // Set task deadline to end of that day (23:59:59)
    const taskDeadline = new Date(taskDate);
    taskDeadline.setHours(23, 59, 59, 999);
    
    // Task is expired if current time is past the deadline
    return now > taskDeadline;
}

// Check if a task is pending (current day but not yet expired)
function isTaskPending(day, task, currentWeek) {
    if (task.completed || task.isExpired) return false;
    
    const now = new Date();
    // Fix timezone issue: append time to ensure local date parsing
    const taskDate = new Date(currentWeek + 'T00:00:00');
    
    // Get the day index (Monday = 0, Sunday = 6)
    const dayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(day);
    taskDate.setDate(taskDate.getDate() + dayIndex);
    
    // Check if it's the same day
    const isToday = now.toDateString() === taskDate.toDateString();
    
    return isToday && !task.completed;
}

// Mark expired tasks and log them as undone
function markExpiredTasks() {
    const currentWeekTasks = appState.weeklyTasks[appState.currentWeek];
    if (!currentWeekTasks) return;
    
    let hasExpiredTasks = false;
    
    Object.entries(currentWeekTasks).forEach(([day, tasks]) => {
        tasks.forEach(task => {
            if (!task.completed && !task.isExpired && isTaskExpired(day, task, appState.currentWeek)) {
                task.isExpired = true;
                hasExpiredTasks = true;
                
                // Log as undone task
                logUndoneTask(task, day);
            }
        });
    });
    
    if (hasExpiredTasks) {
        saveToLocalStorage('weeklyTasks', appState.weeklyTasks);
        renderWeeklyTasks();
    }
}

function resetIncorrectlyExpiredTasks() {
    const currentWeekTasks = appState.weeklyTasks[appState.currentWeek];
    if (!currentWeekTasks) return;
    
    let hasChanges = false;
    
    Object.entries(currentWeekTasks).forEach(([day, tasks]) => {
        tasks.forEach(task => {
            if (task.isExpired && !isTaskExpired(day, task, appState.currentWeek)) {
                // Task was incorrectly marked as expired, reset it
                task.isExpired = false;
                hasChanges = true;
            }
        });
    });
    
    if (hasChanges) {
        saveToLocalStorage('weeklyTasks', appState.weeklyTasks);
        renderWeeklyTasks();
    }
}

function renderWeeklyTasks() {
    const container = document.getElementById('weeklyGrid');
    container.innerHTML = '';
    
    // Check for expired tasks before rendering
    markExpiredTasks();
    
    const currentWeekTasks = appState.weeklyTasks[appState.currentWeek] || {};
    
    Object.entries(currentWeekTasks).forEach(([day, tasks]) => {
        const dayCard = createDayCard(day, tasks);
        container.appendChild(dayCard);
    });
}

function createDayCard(day, tasks) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day-card';
    
    const completed = tasks.filter(task => task.completed).length;
    const expired = tasks.filter(task => task.isExpired || isTaskExpired(day, task, appState.currentWeek)).length;
    const pending = tasks.filter(task => isTaskPending(day, task, appState.currentWeek)).length;
    const total = tasks.length;
    const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Create status summary
    let statusText = `${completed}/${total} (${progressPercentage}%)`;
    if (pending > 0) statusText += ` | ${pending} pending`;
    if (expired > 0) statusText += ` | ${expired} expired`;
    
    dayDiv.innerHTML = `
        <div class="day-header">
            <h3 class="day-name">${day}</h3>
            <span class="day-progress">${statusText}</span>
        </div>
        <div class="task-list">
            ${tasks.map(task => {
                const isExpired = task.isExpired || isTaskExpired(day, task, appState.currentWeek);
                const isPending = isTaskPending(day, task, appState.currentWeek);
                let taskClass = '';
                let taskStatus = '';
                
                if (task.completed) {
                    taskClass = 'completed';
                } else if (isExpired) {
                    taskClass = 'expired';
                    taskStatus = ' (Expired)';
                } else if (isPending) {
                    taskClass = 'pending';
                    taskStatus = ' (Pending)';
                }
                
                return `
                <div class="task-item ${taskClass}">
                    <input type="checkbox" class="task-checkbox" 
                           ${task.completed ? 'checked' : ''} 
                           ${isExpired && !task.completed ? 'disabled' : ''}
                           onchange="toggleTask('${task.id}')">
                    <span class="task-text">${task.task}${taskStatus}</span>
                    <span class="task-time">${task.time}</span>
                </div>
            `;
            }).join('')}
        </div>
    `;
    
    return dayDiv;
}

function toggleTask(taskId) {
    let found = false;
    const currentWeekTasks = appState.weeklyTasks[appState.currentWeek];
    
    Object.entries(currentWeekTasks).forEach(([day, dayTasks]) => {
        const task = dayTasks.find(t => t.id === taskId);
        if (task) {
            // Check if task is expired and not completed
            const expired = task.isExpired || isTaskExpired(day, task, appState.currentWeek);
            
            if (expired && !task.completed) {
                showToast('❌ Cannot check expired task!', 'error');
                return;
            }
            
            task.completed = !task.completed;
            found = true;
            
            // Log the task completion
            logTaskCompletion(task);
        }
    });
    
    if (found) {
        saveToLocalStorage('weeklyTasks', appState.weeklyTasks);
        renderWeeklyTasks();
        showToast('Task updated!');
    }
}

function logTaskCompletion(task) {
    const today = new Date().toISOString().split('T')[0];
    
    if (!appState.dailyLogs[today]) {
        appState.dailyLogs[today] = [];
    }
    
    // Remove previous log for this task if exists
    appState.dailyLogs[today] = appState.dailyLogs[today].filter(log => log.taskId !== task.id);
    
    // Add new log if task is completed
    if (task.completed) {
        appState.dailyLogs[today].push({
            taskId: task.id,
            task: task.task,
            time: task.time,
            type: task.type,
            status: 'completed',
            completedAt: new Date().toISOString()
        });
    }
    
    saveToLocalStorage('dailyLogs', appState.dailyLogs);
}

function logUndoneTask(task, day) {
    const today = new Date().toISOString().split('T')[0];
    
    if (!appState.dailyLogs[today]) {
        appState.dailyLogs[today] = [];
    }
    
    // Check if already logged as undone
    const existingLog = appState.dailyLogs[today].find(log => 
        log.taskId === task.id && log.status === 'undone'
    );
    
    if (!existingLog) {
        appState.dailyLogs[today].push({
            taskId: task.id,
            task: task.task,
            time: task.time,
            type: task.type,
            day: day,
            status: 'undone',
            expiredAt: new Date().toISOString()
        });
        
        saveToLocalStorage('dailyLogs', appState.dailyLogs);
        showToast(`❌ Task "${task.task}" marked as undone (expired)`, 'warning');
    }
}

function setupWeeklyTasksEvents() {
    document.getElementById('resetWeekBtn').addEventListener('click', resetWeek);
}

function resetWeek() {
    if (confirm('Are you sure you want to reset this week? This will clear all task completions.')) {
        initializeWeeklyTasks();
        renderWeeklyTasks();
        showToast('Week reset successfully!', 'warning');
    }
}

function updateCurrentWeekDisplay() {
    const weekDisplay = formatWeekRange(appState.currentWeek);
    document.getElementById('currentWeek').textContent = `Week of ${weekDisplay}`;
}

// Daily Logs Functions
function renderDailyLogs() {
    renderDailySummary();
    renderWeeklyStats();
    renderIncompleteTasks();
    populateLogWeekSelect();
}

function renderDailySummary() {
    const container = document.getElementById('dailySummary');
    container.innerHTML = '<h3>Daily Completion Summary</h3>';
    
    const summaryGrid = document.createElement('div');
    summaryGrid.className = 'summary-grid';
    
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date().getDay() || 7; // Convert Sunday (0) to 7
    
    days.forEach((day, index) => {
        const date = new Date(appState.currentWeek);
        date.setDate(date.getDate() + index);
        const dateStr = date.toISOString().split('T')[0];
        
        const dayLogs = appState.dailyLogs[dateStr] || [];
        const currentWeekTasks = appState.weeklyTasks[appState.currentWeek];
        const dayName = Object.keys(currentWeekTasks || {})[index];
        const totalTasks = currentWeekTasks && currentWeekTasks[dayName] ? currentWeekTasks[dayName].length : 0;
        
        const completionRate = totalTasks > 0 ? Math.round((dayLogs.length / totalTasks) * 100) : 0;
        
        const dayDiv = document.createElement('div');
        dayDiv.className = `day-summary ${index + 1 === today ? 'today' : ''} ${completionRate === 100 ? 'completed' : ''}`;
        dayDiv.innerHTML = `
            <div class="day-label">${day}</div>
            <div class="completion-rate">${completionRate}%</div>
        `;
        
        summaryGrid.appendChild(dayDiv);
    });
    
    container.appendChild(summaryGrid);
}

function renderWeeklyStats() {
    const container = document.getElementById('weeklyStats');
    container.innerHTML = '<h3>Weekly Statistics</h3>';
    
    const statsGrid = document.createElement('div');
    statsGrid.className = 'stats-grid';
    
    // Calculate stats
    const currentWeekTasks = appState.weeklyTasks[appState.currentWeek] || {};
    let totalTasks = 0;
    let completedTasks = 0;
    let expiredTasks = 0;
    let pendingTasks = 0;
    
    Object.entries(currentWeekTasks).forEach(([day, dayTasks]) => {
        totalTasks += dayTasks.length;
        dayTasks.forEach(task => {
            if (task.completed) {
                completedTasks++;
            } else if (task.isExpired || isTaskExpired(day, task, appState.currentWeek)) {
                expiredTasks++;
            } else if (isTaskPending(day, task, appState.currentWeek)) {
                pendingTasks++;
            }
        });
    });
    
    const weeklyCompletionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    // Count task types and undone tasks from logs
    const taskTypes = { learning: 0, project: 0, work: 0, planning: 0, break: 0 };
    let undoneTasksCount = 0;
    
    Object.values(currentWeekTasks).forEach(dayTasks => {
        dayTasks.forEach(task => {
            if (task.completed && taskTypes.hasOwnProperty(task.type)) {
                taskTypes[task.type]++;
            }
        });
    });
    
    // Count undone tasks from logs
    Object.values(appState.dailyLogs).forEach(dayLogs => {
        undoneTasksCount += dayLogs.filter(log => log.status === 'undone').length;
    });
    
    const stats = [
        { label: 'Weekly Completion', value: `${weeklyCompletionRate}%` },
        { label: 'Tasks Completed', value: completedTasks },
        { label: 'Pending Tasks', value: pendingTasks },
        { label: 'Expired Tasks', value: expiredTasks },
        { label: 'Learning Tasks', value: taskTypes.learning },
        { label: 'Project Tasks', value: taskTypes.project }
    ];
    
    stats.forEach(stat => {
        const statCard = document.createElement('div');
        let cardClass = 'stat-card';
        if (stat.label === 'Expired Tasks' && stat.value > 0) {
            cardClass += ' warning';
        } else if (stat.label === 'Pending Tasks' && stat.value > 0) {
            cardClass += ' pending';
        }
        statCard.className = cardClass;
        statCard.innerHTML = `
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
        `;
        statsGrid.appendChild(statCard);
    });
    
    container.appendChild(statsGrid);
}

function renderIncompleteTasks() {
    const container = document.getElementById('incompleteTasks');
    container.innerHTML = '<h3>Expired Tasks by Day</h3>';
    
    const currentWeekTasks = appState.weeklyTasks[appState.currentWeek] || {};
    const incompleteTasksGrid = document.createElement('div');
    incompleteTasksGrid.className = 'incomplete-tasks-grid';
    
    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let hasExpiredTasks = false;
    
    dayOrder.forEach(day => {
        const dayTasks = currentWeekTasks[day] || [];
        // Only show expired tasks (not pending/current day tasks)
        const expiredTasks = dayTasks.filter(task => 
            !task.completed && (task.isExpired || isTaskExpired(day, task, appState.currentWeek))
        );
        
        if (expiredTasks.length > 0) {
            hasExpiredTasks = true;
            
            const daySection = document.createElement('div');
            daySection.className = 'incomplete-day-section';
            
            const dayHeader = document.createElement('div');
            dayHeader.className = 'incomplete-day-header';
            dayHeader.textContent = `${day} (${expiredTasks.length} tasks expired)`;
            daySection.appendChild(dayHeader);
            
            const tasksList = document.createElement('div');
            tasksList.className = 'incomplete-tasks-list';
            
            expiredTasks.forEach(task => {
                const taskItem = document.createElement('div');
                taskItem.className = 'incomplete-task-item expired';
                
                const taskContent = document.createElement('div');
                taskContent.className = 'incomplete-task-content';
                taskContent.innerHTML = `
                    <div class="task-name">${task.name}</div>
                    <div class="task-details">
                        <span class="task-time">${task.time}</span>
                        <span class="task-status">Expired</span>
                    </div>
                `;
                
                taskItem.appendChild(taskContent);
                tasksList.appendChild(taskItem);
            });
            
            daySection.appendChild(tasksList);
            incompleteTasksGrid.appendChild(daySection);
        }
    });
    
    if (!hasExpiredTasks) {
        const noTasksMsg = document.createElement('div');
        noTasksMsg.className = 'no-incomplete-tasks';
        noTasksMsg.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>No expired tasks! You're staying on track! �</p>
        `;
        incompleteTasksGrid.appendChild(noTasksMsg);
    }
    
    container.appendChild(incompleteTasksGrid);
}

function populateLogWeekSelect() {
    const select = document.getElementById('logWeekSelect');
    select.innerHTML = '<option value="current">Current Week</option>';
    
    // Add previous weeks that have data
    const weeks = new Set();
    Object.keys(appState.weeklyTasks).forEach(week => weeks.add(week));
    Object.keys(appState.dailyLogs).forEach(date => {
        const weekStart = new Date(date);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
        weeks.add(weekStart.toISOString().split('T')[0]);
    });
    
    Array.from(weeks)
        .filter(week => week !== appState.currentWeek)
        .sort()
        .reverse()
        .slice(0, 4) // Show last 4 weeks
        .forEach(week => {
            const option = document.createElement('option');
            option.value = week;
            option.textContent = `Week of ${formatDate(week)}`;
            select.appendChild(option);
        });
}

function setupLogsEvents() {
    document.getElementById('exportLogsBtn').addEventListener('click', exportLogs);
    document.getElementById('logWeekSelect').addEventListener('change', handleWeekChange);
}

function handleWeekChange(event) {
    const selectedWeek = event.target.value;
    if (selectedWeek !== 'current') {
        appState.currentWeek = selectedWeek;
        renderWeeklyTasks();
        renderDailyLogs();
        updateCurrentWeekDisplay();
    } else {
        appState.currentWeek = getCurrentWeek();
        renderWeeklyTasks();
        renderDailyLogs();
        updateCurrentWeekDisplay();
    }
}

function exportLogs() {
    const data = {
        weeklyTasks: appState.weeklyTasks,
        dailyLogs: appState.dailyLogs,
        devopsRoadmap: appState.devopsRoadmap,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `task-logs-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('Logs exported successfully!');
}

// Setup Roadmap Events
function setupRoadmapEvents() {
    // Modal close events
    const modal = document.getElementById('taskModal');
    const closeBtn = modal.querySelector('.close');
    const cancelBtn = document.getElementById('modalCancelBtn');
    const saveBtn = document.getElementById('modalSaveBtn');
    
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    cancelBtn.addEventListener('click', () => modal.style.display = 'none');
    
    // Save button functionality
    saveBtn.addEventListener('click', () => {
        const stepId = parseInt(modal.dataset.stepId);
        const roadmapType = modal.dataset.roadmapType;
        
        if (!stepId || !roadmapType) return;
        
        const roadmap = roadmapType === 'devops' ? appState.devopsRoadmap : appState.cppDsaRoadmap;
        const step = roadmap.find(s => s.id === stepId);
        
        if (step) {
            const totalSkills = Object.keys(step.details).length;
            const completedSkills = Object.values(step.skillsChecked || {}).filter(checked => checked).length;
            
            if (completedSkills === totalSkills && step.status !== 'completed') {
                // Mark as completed
                step.status = 'completed';
                showToast('🎉 Step completed! Excellent work!', 'success');
            } else if (completedSkills > 0 && step.status === 'not-started') {
                // Mark as in progress
                step.status = 'in-progress';
                showToast('📚 Step started! Keep learning!', 'success');
            } else if (step.status !== 'completed') {
                showToast('💾 Progress saved!', 'success');
            }
            
            // Save to localStorage
            const storageKey = roadmapType === 'devops' ? 'devopsRoadmap' : 'cppDsaRoadmap';
            saveToLocalStorage(storageKey, roadmap);
            
            // Refresh the roadmap display
            if (roadmapType === 'devops') {
                renderDevOpsRoadmap();
            } else {
                renderCppDsaRoadmap();
            }
        }
        
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Setup Logs Events
function setupLogsEvents() {
    document.getElementById('exportLogsBtn').addEventListener('click', exportLogs);
    document.getElementById('logWeekSelect').addEventListener('change', handleWeekChange);
}

// Auto-save functionality
setInterval(() => {
    saveToLocalStorage('devopsRoadmap', appState.devopsRoadmap);
    saveToLocalStorage('weeklyTasks', appState.weeklyTasks);
    saveToLocalStorage('dailyLogs', appState.dailyLogs);
}, 30000); // Auto-save every 30 seconds

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Make forceRefreshRoadmaps available globally for debugging
window.forceRefreshRoadmaps = forceRefreshRoadmaps;