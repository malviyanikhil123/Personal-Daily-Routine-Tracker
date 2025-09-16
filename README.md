# 🚀 Personal Learning & Daily Routine Tracker

A comprehensive React + TypeScript application designed to help you track your learning progress and manage daily routines effectively. This project provides structured roadmaps for DevOps and C++ & DSA learning, along with automated weekly task management and progress analytics.

## 📋 Project Overview

This application is built to solve the common problem of tracking learning progress across multiple domains while maintaining consistent daily routines. It features:

- **Structured Learning Paths**: Follow comprehensive roadmaps for DevOps and C++ & DSA
- **Automatic Weekly Reset**: Tasks automatically reset every Monday for consistent routine
- **Progress Persistence**: Your progress is saved locally and survives browser sessions
- **Visual Analytics**: Track completion rates and identify learning patterns

Perfect for developers, students, and professionals who want to maintain structured learning habits alongside their daily routines.

## 🚀 Features

### 📚 Learning Roadmaps
- **DevOps Roadmap**: Complete learning path from foundations to advanced DevOps concepts
- **C++ & DSA Roadmap**: Comprehensive C++ and Data Structures & Algorithms curriculum
- Interactive progress tracking with skill-based checkboxes
- Automatic step completion when all skills are mastered

### 📅 Weekly Task Management
- Pre-configured daily schedules for weekdays and weekends
- **Automatic Weekly Reset**: Tasks reset every Monday at midnight
- Task completion tracking with visual progress indicators
- Expired task detection and highlighting
- Weekly progress overview with completion statistics

### 📊 Daily Logs & Analytics
- Comprehensive completion statistics
- Weekly performance metrics
- Incomplete task analysis
- Export functionality for progress reports

### 💻 Technical Features
- **React 18** with TypeScript for type-safe development
- **Vite** for fast development and building
- **pnpm** for efficient package management
- **Context API** for global state management
- **Custom Hooks** for reusable logic
- **Local Storage** for data persistence
- **Responsive Design** with mobile-first approach
- **Modular CSS** with component-based styling

## 🛠 Project Structure

```
src/
├── assets/          # Images, fonts, icons, etc.
├── components/      # Reusable UI components
├── pages/           # Main screens or views
├── hooks/           # Custom React hooks
├── context/         # React Context providers
├── types/           # Global TypeScript interfaces
├── utils/           # Helper functions and data
├── services/        # API calls and local storage handlers
└── styles/          # Global styles and CSS modules
```

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/malviyanikhil123/Learning-Daily-Routine-Tracker.git
   cd Learning-Daily-Routine-Tracker
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

```bash
# Development
pnpm dev            # Start development server
pnpm build          # Build for production
pnpm preview        # Preview production build
pnpm lint           # Run ESLint

# Alternative with npm
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

## 🎯 Usage Guide

### DevOps & C++ Roadmaps
1. Navigate to the respective roadmap tab
2. Click "Start Learning" to begin a step
3. Click "View Details" to see skills breakdown
4. Check off individual skills as you complete them
5. Steps automatically complete when all skills are mastered

### Weekly Tasks
1. Go to "Weekly Tasks" tab
2. View your pre-configured daily schedule
3. Check off tasks as you complete them
4. Monitor daily and weekly progress

### Daily Logs
1. Access "Daily Logs" to view analytics
2. See completion rates for each day
3. Review weekly statistics
4. Check incomplete tasks by day

## ⚙️ Customization Guide

### 🗓️ Customizing Weekly Tasks

To modify the weekly schedule to fit your routine:

1. **Navigate to the data file:**
   ```
   src/utils/data.ts
   ```

2. **Find the `weeklyScheduleData` object** (around line 170)

3. **Modify tasks for each day:**
   ```typescript
   export const weeklyScheduleData: WeeklyScheduleData = {
     "Monday": [
       { time: "07:00-08:00", task: "Your Custom Task", type: "learning" },
       { time: "20:00-21:30", task: "Another Task", type: "project" },
       // Add more tasks...
     ],
     // Modify other days...
   };
   ```

4. **Task types available:**
   - `"learning"` - Educational activities
   - `"project"` - Development work
   - `"planning"` - Organization tasks
   - `"break"` - Rest periods

### 🛣️ Customizing Learning Roadmaps

#### For DevOps Roadmap:
1. **Edit the roadmap data:**
   ```
   src/utils/data.ts (lines 4-85)
   ```

2. **Modify the `devopsRoadmapData` array:**
   ```typescript
   export const devopsRoadmapData: RoadmapStep[] = [
     {
       id: 1,
       title: "Your Custom Step",
       description: "Your description",
       skills: ["Skill 1", "Skill 2"],
       details: {
         "Skill 1": "Detailed explanation...",
         "Skill 2": "Another explanation..."
       },
       status: "not-started"
     },
     // Add more steps...
   ];
   ```

#### For C++ & DSA Roadmap:
1. **Edit the roadmap data:**
   ```
   src/utils/data.ts (lines 87-160)
   ```

2. **Modify the `cppDsaRoadmapData` array** following the same structure

#### 🔄 Replacing with Your Own Learning Paths

**Don't want to learn DevOps or C++ & DSA?** No problem! You can easily replace these with any learning path:

**Popular alternatives you can implement:**
- **Web Development**: HTML, CSS, JavaScript, React, Node.js
- **Python & Machine Learning**: Python basics, Data Science, ML, AI
- **Mobile Development**: React Native, Flutter, iOS, Android
- **Backend Development**: APIs, Databases, System Design
- **Cybersecurity**: Network Security, Ethical Hacking, Penetration Testing
- **Cloud Computing**: AWS, Azure, GCP certifications
- **Data Engineering**: SQL, Big Data, Data Pipelines

**To replace a roadmap:**

1. **Choose your domain** (e.g., Web Development)

2. **Replace DevOps roadmap data** in `src/utils/data.ts`:
   ```typescript
   export const devopsRoadmapData: RoadmapStep[] = [
     {
       id: 1,
       title: "🌐 HTML & CSS Fundamentals",
       description: "Master the building blocks of web development",
       skills: ["HTML5 Basics", "CSS3 & Flexbox", "Responsive Design"],
       details: {
         "HTML5 Basics": "Learn semantic HTML, forms, accessibility, and best practices",
         "CSS3 & Flexbox": "Master modern CSS, layouts, animations, and flexbox",
         "Responsive Design": "Create mobile-first, responsive web applications"
       },
       status: "not-started"
     },
     {
       id: 2,
       title: "⚡ JavaScript Fundamentals",
       description: "Learn modern JavaScript and ES6+ features",
       skills: ["ES6+ Features", "DOM Manipulation", "Async Programming"],
       details: {
         "ES6+ Features": "Arrow functions, destructuring, modules, classes",
         "DOM Manipulation": "Event handling, dynamic content, form validation",
         "Async Programming": "Promises, async/await, fetch API, error handling"
       },
       status: "not-started"
     }
     // Add more steps for your learning path...
   ];
   ```

3. **Update tab labels** in `src/App.tsx`:
   ```typescript
   const tabs = [
     { id: 'devops', label: 'Web Development' }, // Changed from 'DevOps Roadmap'
     { id: 'cpp', label: 'Python & ML' },        // Changed from 'C++ & DSA'
     { id: 'weekly', label: 'Weekly Tasks' },
     { id: 'logs', label: 'Daily Logs' }
   ];
   ```

4. **Update page titles** in respective page components:
   - `src/pages/DevOpsRoadmapPage.tsx` - Change title to "Web Development Roadmap"
   - `src/pages/CppRoadmapPage.tsx` - Change title to "Python & ML Roadmap"

### 📝 Adding New Roadmaps

1. **Create new roadmap data** in `src/utils/data.ts`
2. **Add the roadmap to the app** in `src/App.tsx`:
   ```typescript
   // Add new tab
   const tabs = [
     { id: 'devops', label: 'DevOps Roadmap' },
     { id: 'cpp', label: 'C++ & DSA' },
     { id: 'your-new-roadmap', label: 'Your Roadmap' }, // Add this
     { id: 'weekly', label: 'Weekly Tasks' },
     { id: 'logs', label: 'Daily Logs' }
   ];
   ```

3. **Create a new page component** in `src/pages/`
4. **Add the page to the router** in `src/App.tsx`

### 🎨 Customizing Themes

1. **Modify colors** in `src/styles/base.css`:
   ```css
   :root {
     --primary-gradient: your-gradient-here;
     --background-color: your-color-here;
     /* Modify other CSS variables */
   }
   ```

2. **Update component styles** in respective CSS files in `src/styles/`

### 💾 Data Persistence

- All progress is saved to `localStorage` automatically
- Data persists across browser sessions
- Weekly tasks reset every Monday at midnight
- Roadmap progress is maintained indefinitely

### 🔄 Reset Data

To reset all progress:
1. Open browser developer tools (F12)
2. Go to Application/Storage tab
3. Clear localStorage for the domain
4. Refresh the page

## 🏗 Architecture

### State Management
- **Context API**: Global application state
- **Custom Hooks**: Encapsulated logic for specific features
- **Local Storage**: Persistent data across sessions

### Component Structure
- **Atomic Design**: Small, reusable components
- **Page Components**: Higher-level views that combine components
- **Smart/Dumb**: Separation of logic and presentation

### Type Safety
- **Strict TypeScript**: All components and functions are fully typed
- **Interface Definitions**: Clear contracts for data structures
- **Type Guards**: Runtime type checking where needed

## 🎨 Styling

### CSS Architecture
- **Modular CSS**: Each feature has its own stylesheet
- **BEM Methodology**: Consistent naming conventions
- **Responsive Design**: Mobile-first approach

### Design System
- **Color Palette**: Gradient-based theme with consistent colors
- **Typography**: Inter font family for readability
- **Spacing**: Consistent margin and padding scale
- **Components**: Reusable UI elements with variants

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with React 18 + TypeScript for type safety
- Powered by Vite for fast development
- Styled with modern CSS and responsive design
- Inspired by the need for structured learning and routine management

---

**Built with ❤️ by [Nikhil Malviya](https://github.com/malviyanikhil123)**

*Perfect for developers, students, and anyone who wants to maintain structured learning habits!*