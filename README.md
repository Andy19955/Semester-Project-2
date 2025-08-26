# The Auction Hub (Semester-Project-2)

## Description

A modern online auction platform where users can discover rare treasures, place bids, and manage auction listings. Built as a comprehensive web application with responsive design and user authentication.

- Live website: [https://theauctionhub.netlify.app/](https://theauctionhub.netlify.app/)

## Features

- **User Authentication** - Login, register, and profile management
- **Auction Listings** - Browse and search auction items
- **Bidding System** - Real-time bidding with bid validation
- **Listing Management** - Create, edit, and manage your auction listings
- **Responsive Design** - Mobile-first design using Tailwind CSS
- **Profile Customization** - Avatar and bio management

## Built With

- **Frontend**: HTML, CSS (Tailwind CSS), JavaScript (ES6 modules)
- **Development Tools**: ESLint, Prettier, Husky, lint-staged
- **Hosting**: Netlify
- **Version Control**: Git, GitHub

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installing

1. Clone the repo:

```bash
git clone https://github.com/Andy19955/Semester-Project-2.git
```

2. Navigate to the project directory:

```bash
cd Semester-Project-2
```

3. Install dependencies:

```bash
npm install
```

### Running the Project

**Development mode (with Tailwind CSS watching):**

```bash
npm run dev
```

**Production build:**

```bash
npm run build
```

**View the project:**
Open `index.html` in your browser or use a local development server.

### Code Quality

This project uses automated code quality tools:

- **ESLint** - JavaScript linting and code quality
- **Prettier** - Code formatting
- **Husky** - Git hooks for automated checks before commits

## Testing

### Unit tests

Vitest is used for unit testing. Run tests with:

```bash
npm run test:unit
```

### End-to-end (E2E) tests

Playwright is used for E2E testing to simulate real user interactions. The tests covers:

- User authentication (login/registration)
- Auction listing creation and management
- Bidding functionality
- Profile management
- Search functionality

**First-time setup:**

1. Install Playwright browsers:

```bash
npx playwright install
```

2. Set up environment variables (see Environment Variables section below)

**Running E2E tests:**

```bash
npm run test:e2e                    # Run all E2E tests
npx playwright show-report          # View test results in browser
```

## Environment Variables

**Required for E2E Tests**: Be sure to have a `.env` file with the required environment variables. These credentials are used to test authentication functionality.

Example `.env` file:

```bash
TEST_USER_NAME=your_test_user_name_here
TEST_USER_EMAIL=your_test_user_email_here
TEST_USER_PASSWORD=your_test_user_password_here
TEST_USER_WRONG_EMAIL=your_test_user_wrong_email_here
TEST_USER_WRONG_PASSWORD=your_test_user_wrong_password_here
```

The .env file is ignored in version control. Use .env.example as reference.

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Install dependencies (`npm install`)
4. Make your changes
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

**Note**: Pre-commit hooks will automatically run ESLint and Prettier before each commit.

## Contact

[LinkedIn](https://www.linkedin.com/in/andreas-thune/)
