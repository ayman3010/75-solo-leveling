
# 75 SoloLeveling

A gamified habit tracker inspired by Solo Leveling, where you complete daily quests across 75 levels to level up your real-life skills. Built with React, TypeScript, Express, and PostgreSQL.

![Solo Leveling Theme](https://img.shields.io/badge/Theme-Solo%20Leveling-8B5CF6)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![React](https://img.shields.io/badge/React-18.3-61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791)

## 🎮 Features

### Core Functionality
- **Username Authentication**: Simple username-only login system (no password required)
- **Cross-Device Synchronization**: Progress automatically syncs across all your devices via PostgreSQL database
- **Data Isolation**: Each user has completely separate progress tracking
- **Mobile-Optimized**: Fully responsive design for iPhone, Android, and all screen sizes
- **Single Level View**: Shows only the current level with navigation controls

### Quest System
- **7 Daily Quests** (fully customizable):
  - Elite Training Session
  - Shadow Realm Workout
  - Hunter's Nutrition
  - Mana Recovery (Water)
  - System Archives Study
  - Recovery Meditation
  - Power Level Documentation

### Progress Tracking
- **Countdown Timer**: Live timer showing time until midnight reset (only when quests incomplete)
- **Automatic Reset**: System resets to Level 1 if any level is incomplete at midnight
- **Progress Bar**: Visual XP bar showing total completion (X/525 quests) with glowing effects
- **Level Navigation**: Move between levels to review or plan ahead
- **Visual Completion**: Completed levels show purple glowing border effect
- **Quest Logs**: Add personal notes and thoughts for each level

### Customization
- **Customizable Quest Labels**: Edit all 7 quest names in Settings to match your personal goals
- **Persistent Settings**: All customizations saved to database and synced across devices

## 🎨 Design

### Theme
Solo Leveling inspired dark gaming aesthetic with glowing effects and modern UI components.

### Color Palette
- **Primary**: Purple `#8B5CF6` - Main accent color with glow effects
- **Secondary**: Blue `#3B82F6` - Secondary accents
- **Dark Backgrounds**: `#0F0F1A`, `#1A1A2E` - Gaming-inspired dark theme
- **Glowing Effects**: Applied to completed levels and progress indicators

### Typography
- **Headers**: Rajdhani (gaming feel)
- **Body**: Inter (clean readability)

### Visual Effects
- Purple glowing borders on completed levels
- Animated progress bar with gradient effects
- Hex pattern backgrounds
- Smooth transitions and hover states

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI framework
- **TypeScript 5.6** - Type safety
- **Wouter** - Lightweight routing
- **TanStack Query (React Query)** - Server state management and caching
- **Shadcn UI** - Component library with custom theming
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Animations

### Backend
- **Express.js** - RESTful API server
- **PostgreSQL** - Database (Neon-backed)
- **Drizzle ORM** - Type-safe database operations
- **Express Session** - Session management

### Build Tools
- **Vite 5** - Fast build tool and dev server
- **esbuild** - Production bundling
- **tsx** - TypeScript execution

## 📦 Installation

### Prerequisites
- Node.js 20+ (included in Replit environment)
- PostgreSQL 16 (included in Replit environment)

### Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd 75-sololeveling
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file or use Replit Secrets:
```env
DATABASE_URL=your_postgresql_connection_string
PORT=5000
```

4. **Push database schema**
```bash
npm run db:push
```

5. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5000`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This will:
1. Build the frontend with Vite
2. Bundle the backend with esbuild
3. Output to `dist/` directory

### Start Production Server
```bash
npm start
```

### Replit Deployment
The project is configured for Replit Autoscale deployments:
- Build command: `npm run build`
- Run command: `npm run start`
- Port: 5000 (automatically mapped to 80/443)

## 📁 Project Structure

```
75-sololeveling/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ui/        # Shadcn UI components
│   │   │   ├── DayCard.tsx
│   │   │   ├── HabitCheckbox.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── ResetCountdown.tsx
│   │   │   ├── ResetDialog.tsx
│   │   │   ├── SettingsDialog.tsx
│   │   │   └── LoginScreen.tsx
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
│   └── index.html
├── server/                # Backend Express application
│   ├── db.ts             # Database connection
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data access layer
│   └── vite.ts           # Vite dev server setup
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schema (Drizzle)
├── .replit               # Replit configuration
├── drizzle.config.ts     # Drizzle ORM configuration
├── package.json          # Dependencies and scripts
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Login with username
- `POST /api/auth/logout` - Logout current user
- `GET /api/auth/check` - Check authentication status

### User Settings
- `GET /api/user/:username/settings` - Get user settings
- `PUT /api/user/:username/settings` - Update user settings

### Progress Tracking
- `GET /api/user/:username/progress` - Get all level progress
- `PUT /api/user/:username/progress/:day` - Update specific level progress

## 🎯 Usage

### First Time Setup
1. Enter a username on the login screen (no password needed)
2. Customize your 7 quest labels in Settings (optional)
3. Start completing quests on Level 1

### Daily Routine
1. Complete all 7 quests before midnight
2. Track progress with the XP bar and countdown timer
3. Add notes in the Quest Log for reflection
4. System automatically advances to next level when complete

### Navigation
- Use **Previous/Next** buttons to view other levels
- Current actual progress is locked to prevent manipulation
- Completed levels show purple glowing borders

### Reset System
- Automatic reset to Level 1 if current level incomplete at midnight
- Manual reset option available in UI (with confirmation)
- All quest completions and logs preserved in database

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Push database schema changes

### Code Style
- TypeScript strict mode enabled
- ESM modules throughout
- Component-based architecture
- Type-safe database queries with Drizzle

## 🔒 Security & Privacy

- No password storage (username-only authentication)
- User data completely isolated by username
- Session-based authentication with express-session
- Environment variables for sensitive configuration
- SQL injection protection via Drizzle ORM

## 🐛 Troubleshooting

### Database Connection Issues
Ensure `DATABASE_URL` is properly set in environment variables.

### Port Already in Use
The app uses port 5000 by default. Change via `PORT` environment variable if needed.

### Build Errors
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📝 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Inspired by [Solo Leveling](https://en.wikipedia.org/wiki/Solo_Leveling) manhwa/anime
- Built with [Shadcn UI](https://ui.shadcn.com/)
- Hosted on [Replit](https://replit.com/)

## 📧 Support

For issues or questions, please open an issue on GitHub or contact the maintainer.

---

**Ready to level up your life? Start your journey today!** 🚀
