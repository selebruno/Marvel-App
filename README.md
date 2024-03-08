# Marvel App

## Overview

Marvel App is a web application built with React and Vite, allowing users to explore Marvel characters, view details, and manage their favorite characters.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Build and Deployment](#build-and-deployment)
- [Linting](#linting)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)

## Getting Started

Before running the application, ensure you have Node.js and npm installed on your machine.

```bash
# Clone the repository
git clone https://github.com/selebruno/Marvel-app.git

# Change to the project directory
cd Marvel-app

# Install dependencies
npm install
```

## Project Structure

The project follows a modular structure for better organization:

- `src`: Source code directory
  - `assets`: Contains static assets such as images and SVGs
  - `components`: Reusable React components
  - `constants`: Application constants and configuration
  - `contexts`: React context providers
  - `layout`: Layout components for structuring the app's UI
  - `pages`: Individual pages or views of the application
  - `router`: Application routing setup
  - `services`: Services for handling data fetching and business logic
  - `types`: TypeScript type definitions

## Running the Application

To run the application in development mode:

```bash
npm run dev
```

This will start the development server, and you can access the application at [http://localhost:5173](http://localhost:5173).

## Build and Deployment

To build the application for production:

```bash
npm run build
```

This command generates an optimized production build in the `dist` directory.

## Linting

Linting is set up using ESLint and Prettier. To lint the code:

```bash
npm run lint
```

## Environment Variables

The application uses the `dotenv` package to manage environment variables. Create a `.env` file at the root of the project with the following variables:

```env
VITE_MARVEL_PUBLIC_KEY=your_marvel_public_key
VITE_MARVEL_PRIVATE_KEY=your_marvel_private_key
```

A Marvel api key can be requested in the following link: [https://developer.marvel.com/account](https://developer.marvel.com/account).

Replace `your_marvel_public_key` and `your_marvel_private_key` with your Marvel API keys.

## Technologies Used

- React
- Vite
- Styled Components
- React Router
- React Query
- Axios
- TypeScript
- ESLint
- Prettier

Feel free to explore and enhance the application as needed! If you have any questions or issues, please refer to the documentation of the respective libraries or contact the project maintainers.
