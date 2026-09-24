# Fire Kirin - Vite + Tailwind CSS Project

A modern web application built with Vite, Tailwind CSS, and vanilla JavaScript, converted from a WordPress static site.

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

The development server will start at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Header.js
│   │   └── Footer.js
│   ├── pages/         # Page components
│   │   ├── HomePage.js
│   │   ├── AboutPage.js
│   │   ├── GameListPage.js
│   │   ├── FishGamesPage.js
│   │   ├── SlotsPage.js
│   │   ├── BlogPage.js
│   │   ├── ContactPage.js
│   │   └── GameDetailPage.js
│   ├── data/          # JSON data files
│   │   └── site.json
│   ├── utils/         # Utility functions
│   │   └── router.js
│   ├── main.css       # Tailwind CSS imports
│   ├── main.js        # Application entry point
│   ├── App.js         # Main app component
│   └── index.html      # HTML template
├── public/            # Static assets
│   └── firekirin.com/
│       └── wp-content/ # Images and media
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Features

- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Vanilla JavaScript** - No framework dependencies
- **Client-side Routing** - Simple SPA routing
- **JSON Data** - Content stored in JSON format
- **Responsive Design** - Mobile-first approach

## 🛠️ Technologies

- Vite 5.0
- Tailwind CSS 3.4
- PostCSS
- Autoprefixer

## 📝 Notes

- Images are served from `public/firekirin.com/wp-content/`
- All content is stored in JSON format in `src/data/`
- Routing is handled client-side with vanilla JavaScript
- The app uses Tailwind's dark theme with custom primary colors

## 🎯 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
- Primary: `#28FF3E` (green)
- Dark: `#000000` (black)

### Content
Update `src/data/site.json` to modify site content and navigation.

### Styling
Custom styles can be added to `src/main.css` using Tailwind's `@layer` directive.


