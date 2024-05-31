# Zoomers

This README provides a comprehensive guide on setting up, configuring, and using the App. Follow the instructions below to get started.

## Table of Contents

- [Introduction](#introduction)
- [Live link](#live)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contact](#contact)

## Introduction

Zoomers is a platform that allows users to connect, share shthoughts. Currently, users can only create profiles, post updates, like posts and follow others.

## Live

Zoomers is a platform that allows users to connect, share shthoughts. Currently, users can only create profiles, post updates, like posts and follow others.

## Features

- User Authentication (Sign Up, Login, Password Reset)
- Profile Management
- Post Creation and Management
- Like and Comment on Posts
- Follow and Unfollow Users
- Real-time Notifications
- Search Functionality
- Responsive Design

## Requirements

Before installing Zoomers, ensure you have the following prerequisites:

- Node.js (v12.x or later)
- npm (v6.x or later)
- MongoDB (v4.x or later)

## Installation

Follow these steps to set up the Social Media App:

1. **Clone the Repository**

    ```sh
    git clone https://github.com/Chloe7243/zoomers.git
    cd zoomers
    ```

2. **Install Dependencies**

    ```sh
    npm install
    ```

3. **Set Up Environment Variables**

    Create a `.env` file in the root directory and add the necessary environment variables. Refer to the [Configuration](#configuration) section for details.

4. **Start the Development Server**

    ```sh
    npm start
    ```

    The app will be available at `http://localhost:5173`.

## Configuration

The app requires certain environment variables to function correctly. Create a `.env` file in the root directory and add the following:

```sh
# Server configuration
PORT=5000

# Database configuration
Locally: MONGO_URI=mongodb://localhost:27017/social-media-app
Atlas: MONGO_URI=mongodb+srv://<your_username>:<password>@<rest_of_link>

# JWT Secret for authentication
JWT_SECRET=your_jwt_secret

# Cloudinary configuration for image uploads (optional)
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
```

## Usage

### Running in Development Mode

```sh
npm run dev
```

### Building for Production

```sh
npm run build
```

### Running Tests

```sh
npm test
```

## Contact

For questions or feedback, please reach out to the project maintainer:

- Name: Oluoha Stephanie
- Email: Stephaniechloe21@gmail.com
- GitHub: [Chloe7243](https://github.com/chloe7243)

Thank you for using Zoomers! We hope you enjoy connecting with friends and the community.
