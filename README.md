# Paddies Cafe Website

A modern, full-stack web application for Paddies Cafe built with Laravel, React, and Inertia.js. Features include menu management, online reservations, e-commerce functionality, and a comprehensive admin panel.

![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=flat&logo=laravel)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat&logo=tailwind-css)

## Features

- 🏠 **Public Website** - Modern, responsive landing page with cafe information
- 🍽️ **Menu Management** - Browse and manage cafe menu items with categories
- 📅 **Online Reservations** - Table booking system for customers
- 🛒 **E-commerce** - Online shop for cafe products
- 📍 **Location** - Interactive location and contact information
- 👨‍💼 **Admin Panel** - Comprehensive dashboard for managing:
  - Products & Menu
  - Reservations
  - Orders
  - Content Management
- ⭐ **Product Ratings** - Customer reviews and ratings system
- 📱 **Responsive Design** - Mobile-first approach with modern UI components
- 🔒 **Authentication** - Secure user authentication system
- 📄 **Legal Pages** - Privacy Policy and Terms & Conditions

## Tech Stack

### Backend
- **Laravel 12** - PHP framework
- **PHP 8.2+** - Server-side programming
- **Inertia.js** - Modern monolith architecture
- **SQLite** - Default database (configurable)
- **Queue System** - Background job processing
- **Ziggy** - Route helper for frontend

### Frontend
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Radix UI** - Accessible component primitives
- **Headless UI** - Unstyled UI components
- **Lucide React** - Icon library
- **Swiper** - Modern slider/carousel

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Pest** - Testing framework
- **Laravel Pint** - PHP code style fixer

## Prerequisites

Before you begin, ensure you have the following installed:

- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- SQLite (or MySQL/PostgreSQL if preferred)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tamzidan/paddies-cafe.git
   cd paddies-cafe
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Database setup**
   ```bash
   touch database/database.sqlite
   php artisan migrate
   php artisan db:seed  # Optional: seed sample data
   ```

6. **Create storage symlink**
   ```bash
   php artisan storage:link
   ```

## Running the Application

### Development Mode

**Option 1: All services at once (Recommended)**
```bash
composer dev
```
This will start:
- Laravel development server (port 8000)
- Queue worker
- Vite dev server

**Option 2: Individual services**

Terminal 1 - Laravel Server:
```bash
php artisan serve
```

Terminal 2 - Queue Worker:
```bash
php artisan queue:listen --tries=1
```

Terminal 3 - Vite Dev Server:
```bash
npm run dev
```

The application will be available at `http://localhost:8000`

### Production Build

```bash
npm run build
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### SSR Mode (Optional)

For server-side rendering:
```bash
composer dev:ssr
```

## Project Structure

```
paddies-cafe/
├── app/
│   ├── Http/Controllers/     # Application controllers
│   └── Models/               # Eloquent models
├── database/
│   ├── migrations/           # Database migrations
│   └── seeders/              # Database seeders
├── public/                   # Public assets
├── resources/
│   ├── js/
│   │   ├── Components/       # React components
│   │   ├── Layouts/          # Layout components
│   │   └── Pages/            # Inertia pages
│   │       ├── Admin/        # Admin panel pages
│   │       ├── auth/         # Authentication pages
│   │       └── settings/     # User settings
│   └── css/                  # Stylesheets
├── routes/
│   ├── web.php              # Web routes
│   ├── auth.php             # Authentication routes
│   └── settings.php         # Settings routes
└── tests/                   # Application tests
```

## Available Scripts

### NPM Scripts
```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run build:ssr    # Build with SSR support
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run types        # Type check with TypeScript
```

### Composer Scripts
```bash
composer dev         # Start all development services
composer dev:ssr     # Start with SSR support
composer test        # Run tests
```

### Artisan Commands
```bash
php artisan serve           # Start development server
php artisan migrate         # Run migrations
php artisan db:seed         # Seed database
php artisan queue:listen    # Start queue worker
php artisan pail            # View logs
```

## Configuration

### Database
The default configuration uses SQLite. To use MySQL or PostgreSQL, update your `.env` file:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=paddies_cafe
DB_USERNAME=root
DB_PASSWORD=
```

### Application Settings
Update these values in `.env`:
```env
APP_NAME="Paddies Cafe"
APP_URL=http://localhost:8000
APP_ENV=local
APP_DEBUG=true
```

## Testing

Run the test suite:
```bash
composer test
# or
php artisan test
```

## Code Quality

### Linting
```bash
npm run lint         # JavaScript/TypeScript
composer pint        # PHP
```

### Formatting
```bash
npm run format       # Format all files
npm run format:check # Check formatting
```

## Deployment

1. Set up your production environment
2. Update `.env` for production:
   ```env
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://your-domain.com
   ```
3. Install dependencies:
   ```bash
   composer install --optimize-autoloader --no-dev
   npm install
   ```
4. Build assets:
   ```bash
   npm run build
   ```
5. Optimize Laravel:
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```
6. Run migrations:
   ```bash
   php artisan migrate --force
   ```
7. Set up queue worker (use Supervisor or similar)
8. Configure your web server (Nginx/Apache)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Support

For issues and questions, please open an issue on [GitHub](https://github.com/tamzidan/paddies-cafe/issues).

## Author

**Tamzidan**
- GitHub: [@tamzidan](https://github.com/tamzidan)

---

Made with ❤️ for Paddies Cafe
