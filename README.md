# AURA

AURA is a web application that allows users to connect and share with people. It is built using React js and provides a rich user experience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and profile management.
- Create, delete, and edit posts.
- Rich text post creation with TinyMCE integration.
- View posts from other users.
- Backend as a Service (BaaS) using Appwrite.

## Tech Stack

- **Frontend:** HTML, Tailwind CSS, JavaScript, ReactJS, Redux
- **Backend:** Appwrite
- **Rich Text Editor:** TinyMCE

## Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Appwrite](https://appwrite.io/)

### Steps

1. **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/social-connect.git
    cd social-connect
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up Appwrite:**
    - Follow the [Appwrite documentation](https://appwrite.io/docs) to set up your backend.
    - Update the Appwrite endpoint and project ID in your project configuration.

4. **Start the development server:**
    ```sh
    npm start
    ```

## Usage

Once the development server is running, you can access the application at `http://localhost:3000`.

- **Creating a Post:**
  - Navigate to the post creation page.
  - Enter your content using the rich text editor.
  - Save the post.

- **Editing/Deleting a Post:**
  - Navigate to the post you want to edit or delete.
  - Use the provided options to make changes or remove the post.

- **Viewing Posts:**
  - Browse the feed to see posts from other users.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

