# Travel Tracker

Travel Tracker is a web application that allows users to track the countries they have visited by highlighting them on a map interface. The application is built with Node.js, Express.js, EJS, CSS, Postgres, and JavaScript.

## Features

- User authentication and session management
- Interactive map interface to highlight visited countries
- Dynamic rendering of country data using EJS templates
- Database integration with Postgres to store user and country data

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: EJS, CSS, JavaScript
- **Database**: Postgres

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/NAMBIRAJA-M/travel-tracker.git
    cd travel-tracker
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up the database:**

    - Make sure you have Postgres installed and running.
    - Create a new database and user.
    - Update the `config.js` file with your database credentials.

  

4. **Run database migrations:**
    ```bash
    npx sequelize-cli db:migrate
    ```

5. **Start the application:**
    ```bash
    npm start
    ```

6. **Visit the application in your browser:**
    ```
    http://localhost:3000
    ```

## Usage

- **Register/Login:** Create an account or log in with existing credentials.
- **Track Visited Countries:** Use the interactive map to select and highlight countries you have visited.
- **View Dashboard:** See a list of your visited countries and other user stats.



