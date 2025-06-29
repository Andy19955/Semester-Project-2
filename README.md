# The Auction Hub (Semester-Project-2)

## Description

This is my project for the Semester Project 2.

- Live website: [https://theauctionhub.netlify.app/](https://theauctionhub.netlify.app/)

## Features

This project offers the following features:

- Responsive design using Tailwind CSS.

## Built With

- HTML
- CSS
- Tailwind CSS
- JavaScript
- ESLint
- Prettier
- Husky
- lint-staged
- Github Projects

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your local machine:

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

3. Install the dependencies:

```bash
npm install
```

This will install Tailwind CSS, ESLint, Prettier, Husky, lint-staged, and other required dependencies listed in `package.json`.

### Setting up Tailwind CSS

Tailwind CSS is already configured in this project. Here's how it's set up:

1. **Tailwind CSS is installed** as a dev dependency in `package.json`
2. **Configuration file** (`tailwind.config.js`) is set up to scan all HTML and JS files for classes
3. **Input CSS file** (`css/input.css`) contains the Tailwind directives:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
4. **Build process** compiles the input CSS into the final stylesheet

### Code Quality with ESLint

ESLint is configured in this project to maintain code quality and consistency:

#### ESLint Configuration

1. **ESLint is installed** as a dev dependency in `package.json`
2. **Configuration file** (`eslint.config.mjs`) uses the modern flat config format
3. **Global variables** are configured for browser environment and testing
4. **Recommended rules** from `@eslint/js` are applied

#### Available ESLint Commands

**Check for linting errors:**

```bash
npx eslint .
```

**Check specific files:**

```bash
npx eslint src/js/script.js
npx eslint "**/*.js"
```

**Auto-fix fixable issues:**

```bash
npx eslint . --fix
```

#### ESLint Configuration Details

The project uses ESLint v9 with flat config (`eslint.config.mjs`) that includes:

- **Browser globals** - `window`, `document`, etc.
- **Testing globals** - `describe`, `test`, `it`, `expect`
- **Node.js globals** - `require`, `module`, `process`
- **Recommended rules** - Standard JavaScript best practices

#### IDE Integration

For the best development experience:

1. Install the ESLint extension in your code editor
2. Enable auto-fix on save for automatic code formatting
3. Configure your editor to show linting errors inline

### Code Formatting with Prettier

Prettier is configured in this project to maintain consistent code formatting:

#### Prettier Configuration

1. **Prettier is installed** as a dev dependency in `package.json`
2. **Configuration file** (`.prettierrc`) defines formatting rules
3. **Consistent formatting** across all contributors
4. **Integration with ESLint** for complete code quality

#### Available Prettier Commands

**Check formatting:**

```bash
npx prettier --check .
```

**Format all files:**

```bash
npx prettier --write .
```

**Format specific files:**

```bash
npx prettier --write "**/*.{js,html,css,md}"
npx prettier --write index.html
```

#### Prettier Configuration Details

The project uses the following formatting rules (`.prettierrc`):

- **Semicolons**: Always add semicolons at the end of statements
- **Quotes**: Use double quotes for strings
- **Consistent spacing**: Automatic indentation and spacing
- **Line endings**: Consistent across different operating systems

#### IDE Integration

For the best formatting experience:

1. Install the Prettier extension in your code editor
2. Enable "Format on Save" for automatic formatting
3. Configure your editor to use the project's `.prettierrc` settings

### Git Hooks with Husky & lint-staged

This project uses Husky and lint-staged to automatically run code quality checks before commits:

#### What happens on commit:

**Automatic pre-commit checks:**

1. **JavaScript files** (`.js`):
   - Prettier formats the code automatically
   - ESLint checks and fixes code quality issues
2. **HTML files** (`.html`):
   - Prettier formats the code automatically
3. **Commit proceeds** only if all checks pass successfully

#### Configuration Details

The project is configured with:

- **Husky**: Manages Git hooks for automated workflows
- **lint-staged**: Runs tools only on staged files (faster execution)
- **Pre-commit hook**: Automatically triggered before each commit

#### lint-staged Configuration

From `package.json`:

```json
"lint-staged": {
  "*.js": [
    "prettier --write",
    "eslint --fix"
  ],
  "*.html": [
    "prettier --write"
  ]
}
```

#### Manual Commands

You can run the same checks manually:

```bash
# Run lint-staged manually
npx lint-staged

# Check what would run without executing
npx lint-staged --dry-run
```

#### Bypass Hooks (Emergency Only)

If you need to bypass the pre-commit checks:

```bash
# Skip pre-commit hooks (use with caution)
git commit --no-verify -m "Emergency commit"
```

#### Benefits

- **Automatic quality control** - No manual steps to forget
- **Consistent formatting** - All committed code follows the same style
- **Faster execution** - Only checks files you've changed
- **Team consistency** - Everyone follows the same standards

### Running the Project

#### Development Mode

To run the project in development mode with Tailwind CSS watching for changes:

```bash
npm run dev
```

This command will:

- Watch for changes in your HTML/JS files
- Automatically rebuild the CSS when Tailwind classes are added/removed
- Output the compiled CSS to `css/style.css`

#### Production Build

To build the project for production with minified CSS:

```bash
npm run build
```

#### Viewing the Project

1. After running the development command, open `index.html` in your browser
2. Or use a local development server like Live Server (VS Code extension)

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**

   ```bash
   # Click the "Fork" button on the GitHub repository page
   ```

2. **Clone your Fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/Semester-Project-2.git
   cd Semester-Project-2
   ```

3. **Create a Feature Branch**

   ```bash
   git checkout -b feature/AmazingFeature
   ```

4. **Install Dependencies**

   ```bash
   npm install
   ```

5. **Start Development Mode**

   ```bash
   npm run dev
   ```

6. **Make Your Changes**
   - Follow the existing code style and structure
   - Make your code changes
   - Test your changes thoroughly
   - Ensure Tailwind CSS classes are working properly

7. **Commit Your Changes** (Automatic Quality Checks)

   ```bash
   git add .
   git commit -m "Add some AmazingFeature"
   ```

   **Note**: Husky will automatically run before your commit:
   - Prettier will format your code
   - ESLint will check and fix issues
   - Commit will proceed only if all checks pass

8. **Manual Quality Checks** (Optional)
   If you want to run checks manually before committing:

   ```bash
   npx eslint .
   npx eslint . --fix  # Auto-fix fixable issues
   npx prettier --check .  # Check formatting
   npx prettier --write .  # Fix formatting
   npx lint-staged  # Run the same checks as pre-commit hook
   ```

9. **Push to Your Branch**

   ```bash
   git push origin feature/AmazingFeature
   ```

10. **Open a Pull Request**
    - Go to the original repository on GitHub
    - Click "New Pull Request"
    - Provide a clear description of your changes

### Guidelines

- **Code Style**: Follow the existing code formatting and structure
- **Automatic Checks**: Pre-commit hooks will automatically run ESLint and Prettier
- **Manual Checks**: You can run `npx lint-staged` to test the pre-commit checks manually
- **Commit Messages**: Use clear and descriptive commit messages
- **Testing**: Test your changes across different screen sizes (responsive design)
- **CSS**: Use Tailwind CSS classes instead of custom CSS when possible
- **Documentation**: Update documentation if you add new features

### Issues

Feel free to open an issue if you find bugs or have feature suggestions. Please provide:

- Clear description of the issue or feature
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots if applicable

## Contact

[LinkedIn (https://www.linkedin.com/in/andreas-thune/)](https://www.linkedin.com/in/andreas-thune/)
