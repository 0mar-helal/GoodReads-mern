# GoodReads MERN Stack

Welcome to GoodReads, a full-stack application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This application allows users to manage and share their favorite books and reading lists.

## Features

- User registration and authentication: Users can create an account, log in, and securely authenticate their credentials.
- Book management: Users can add books to their personal library, including details such as title, author, genre, and description.
- Reading lists: Users can create and manage custom reading lists, categorizing books based on their preferences.
- Book search: Users can search for books by title, author, or genre, helping them discover new reads.
- Responsive design: The application is designed to be mobile-friendly, ensuring a seamless experience across different devices.

## Installation

To run the GoodReads application locally, follow these steps:

1. Clone the repository:

   ````bash
   git clone https://github.com/0mar-helal/GoodReads-mern.git
   ```

   ````

2. Navigate to the project directory:

   ````bash
   cd GoodReads-mern
   ```

   ````

3. Install the dependencies for both the client and server applications:

   ````bash
   cd client
   npm install
   cd ../server
   npm install
   ```

   ````

4. Set up the environment variables:

   - Rename the `.env.example` file to `.env` in both the `client` and `server` directories.
   - Update the necessary variables in the `.env` files, such as the MongoDB connection URL and any other required configurations.

5. Start the development server:

   `````bash
   cd client
   npm run dev
   ```

   Open another terminal:

   ````bash
   cd server
   npm start
   ```

   The application should now be running locally on your machine.
   `````

## Contributing

Contributions to GoodReads are welcome! If you find any bugs or have suggestions for new features, please open an issue on the GitHub repository. If you would like to contribute code, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/bugfix: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request on the GitHub repository.

Thank you for your interest in GoodReads! Happy reading!
