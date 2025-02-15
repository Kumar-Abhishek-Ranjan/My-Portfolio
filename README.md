git clone https://github.com/Kumar-Abhishek-Ranjan/My-Portfolio.git
cd My-Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
SESSION_SECRET=your_session_secret
SENDGRID_API_KEY=your_sendgrid_api_key  # Optional, for email functionality
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### Default Admin Credentials

```
Username: admin
Password: admin
```

## Usage Examples

### Public Portfolio

1. **Navigation**:
   - Use the navbar to smoothly scroll to different sections
   - Toggle between light and dark themes using the theme button
   - On mobile, use the hamburger menu for navigation

2. **Viewing Skills**:
   - Scroll to the Skills section to see progress bars
   - Hover over skills to see detailed proficiency levels
   - Skills are categorized for easy reference

3. **Contact Process**:
   - Navigate to the Contact section
   - Click "Verify to View Contact Info"
   - Enter verification code: "karanjan123570"
   - Once verified, contact information becomes visible
   - Use the contact form to send messages

### Admin Dashboard

1. **Login**:
   - Navigate to `/admin/login`
   - Enter admin credentials
   - You'll be redirected to the dashboard

2. **Managing Achievements**:
   - Click "Add Achievement" button
   - Fill in title, description, and date
   - Click Create Achievement
   - Use the delete button to remove entries

3. **Managing Skills**:
   - Switch to Skills tab
   - Click "Add Skill" button
   - Enter name, category, and proficiency level (0-100)
   - Skills appear instantly on the public portfolio

## Troubleshooting

1. **Login Issues**:
   - Ensure you're using the correct admin credentials
   - Check if the SESSION_SECRET is properly set
   - Clear browser cookies if session persists

2. **Contact Form**:
   - Verify SENDGRID_API_KEY if email sending fails
   - Check console for validation errors
   - Ensure all required fields are filled

3. **Loading Data**:
   - If content doesn't load, check network requests
   - Verify that the server is running
   - Try refreshing the page

## How It Works

### 1. Public Portfolio

#### Navigation & Theme
- Responsive navbar with smooth section scrolling
- Dynamic theme toggle (light/dark) with system preference detection
- Mobile-friendly hamburger menu

#### Interactive Sections
- **Hero Section**: Animated introduction with sci-fi background effects
- **About Section**: Personal information and background
- **Projects Section**: Showcase of achievements and projects
- **Skills Section**: Visual representation of technical skills with progress bars
- **Contact Section**: Two-step verified contact system

#### Animations & UI
- Scroll-triggered animations using Framer Motion
- Interactive sci-fi background with particle effects
- Responsive grid layouts
- Loading states and transitions

### 2. Admin Dashboard

#### Authentication System
- Secure session-based authentication
- Protected routes with automatic redirects
- Password hashing with crypto module
- Session management with express-session

#### Content Management
1. **Achievements Management**:
   - Create, view, and delete achievements
   - Fields: title, description, date, and order
   - Real-time updates to public display
   - Proper validation and error handling

2. **Skills Management**:
   - Add and remove technical skills
   - Set proficiency levels (0-100%)
   - Categorize skills
   - Automatic sorting by order

#### Real-time Updates
- TanStack Query for efficient cache management
- Optimistic updates for better UX
- Automatic query invalidation
- Loading states during data fetching

### 3. Contact System

#### Two-Step Verification
1. **Access Control**:
   - Contact information hidden by default
   - Verification required to view details
   - Secure verification code system

2. **Contact Form**:
   - Form validation with proper error messages
   - Email sending via SendGrid
   - Success/error notifications
   - Rate limiting and spam protection

## Technology Stack

### Frontend
- **React + TypeScript**: Type-safe component development
- **TanStack Query**: Efficient data fetching and caching
- **Framer Motion**: Smooth animations and transitions
- **Tailwind CSS**: Responsive and customizable styling
- **shadcn/ui**: Accessible and themeable components
- **Lucide Icons**: Beautiful and consistent iconography

### Backend
- **Express.js**: Fast and minimalist web framework
- **Passport.js**: Flexible authentication middleware
- **SendGrid**: Professional email service integration
- **Zod**: Runtime type validation
- **Drizzle ORM**: Type-safe database operations

## Security Features

- **Session Management**: Secure cookie-based sessions
- **Password Hashing**: Cryptographic password protection
- **CSRF Protection**: Cross-site request forgery prevention
- **Rate Limiting**: API endpoint protection
- **Input Validation**: Strict data validation with Zod
- **Protected Routes**: Role-based access control

## Performance Optimizations

- **Code Splitting**: Lazy loading of admin routes
- **Asset Optimization**: SVG icons and optimized images
- **Cache Management**: Efficient data caching with TanStack Query
- **Debounced Inputs**: Optimized form submissions
- **Preloaded Data**: Initial state hydration

## Deployment

### Prerequisites

1. Node.js v18+ and npm
2. Environment variables configured
3. SendGrid API key (optional, for email functionality)

### Deployment Options

1. **Vercel**:
   - Connect your GitHub repository
   - Configure environment variables
   - Deploy from the Vercel dashboard

2. **Netlify**:
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Configure environment variables

3. **Manual Deployment**:
   ```bash
   npm run build
   npm start
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   └── pages/        # Page components
├── server/                # Backend Express application
│   ├── routes.ts         # API routes
│   ├── auth.ts           # Authentication logic
│   ├── email.ts          # Email service
│   └── storage.ts         # Data storage implementation
└── shared/               # Shared types and schemas
    └── schema.ts         # Database schemas and types