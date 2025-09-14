# Personal DevOps & Daily Routine Tracker

A comprehensive web application for tracking learning progress, daily tasks, and personal development goals.

## Features

### 🎯 Roadmap Tracking
- **DevOps Roadmap**: 8-step learning path with interactive progress tracking
- **C++ & DSA Roadmap**: 15-step programming learning journey with emojis
- Interactive skill checkboxes with auto-completion
- Detailed view modals for each roadmap step

### 📅 Weekly Task Management
- **Monday-Sunday Schedule**: Organized weekly task planning
- **Daily Task Tracking**: Time-based task management with deadlines
- **Task States**: Pending, Completed, and Expired task statuses
- **Smart Expiration**: Daily-based task expiration system

### 📊 Progress Analytics
- **Daily Completion Summary**: Visual progress indicators for each day
- **Weekly Statistics**: Comprehensive stats with completion rates
- **Task Type Analysis**: Breakdown by learning, project, work tasks
- **Expired Tasks Tracking**: Accountability for missed tasks

### 📝 Daily Logs
- **Completion History**: Detailed logs of completed tasks
- **Expired Tasks by Day**: Shows missed tasks organized by day
- **Weekly Archives**: Historical data with week selection
- **Progress Visualization**: Color-coded completion status

## Project Structure

```
Personal-To-do/
├── index.html              # Main HTML file
├── README.md              # Project documentation
├── css/
│   └── styles.css         # Main stylesheet
├── js/
│   └── script.js          # Application logic
├── assets/
│   └── icons/
│       └── favicon.svg    # Website favicon
└── docs/
    ├── devops-roadmap.md     # DevOps learning roadmap
    ├── C++&DSA-roadmap.md    # C++ & DSA learning roadmap
    └── daily-routine.md      # Daily routine guidelines
```

## Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: Browser localStorage with version control
- **Icons**: Font Awesome 6.0
- **Design**: CSS Grid, Flexbox, Gradient backgrounds
- **Features**: Modal dialogs, Responsive design, Local data persistence

## Getting Started

1. Clone or download the project files
2. Open `index.html` in a web browser
3. Start adding tasks and tracking your progress!

## Features Overview

### Task Management
- Add daily tasks with time slots
- Mark tasks as completed with visual feedback
- Automatic task expiration based on daily deadlines
- Task history and completion tracking

### Roadmap Progress
- Interactive learning roadmaps for DevOps and C++/DSA
- Skill-based checkboxes with auto-completion
- Progress persistence across browser sessions
- Detailed descriptions for each learning step

### Analytics & Insights
- Real-time completion statistics
- Weekly progress summaries
- Expired task accountability
- Visual progress indicators

## Data Persistence

The application uses browser localStorage to save:
- Weekly task data
- Roadmap progress
- Daily completion logs
- User preferences

Data is automatically saved and restored between sessions.

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Modern browsers with ES6+ support

## Development

The project uses vanilla JavaScript without external frameworks, making it lightweight and easy to modify. All code is well-documented and organized into logical modules.

---

Created for personal productivity and learning progress tracking.