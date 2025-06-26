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

This will install Tailwind CSS and other required dependencies listed in `package.json`.

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
   - Test your changes thoroughly
   - Ensure Tailwind CSS classes are working properly

7. **Commit Your Changes**

   ```bash
   git add .
   git commit -m "Add some AmazingFeature"
   ```

8. **Push to Your Branch**

   ```bash
   git push origin feature/AmazingFeature
   ```

9. **Open a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Provide a clear description of your changes

### Guidelines

- **Code Style**: Follow the existing code formatting and structure
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
