# Cyprus Legal Chatbot

A full-stack AI-powered legal assistant designed to help users interact with legal information in Cyprus through a modern web interface. The project combines a secure authentication backend, a polished Next.js frontend, and an AI model service for document-aware conversational responses.

## Overview

Cyprus Legal Chatbot is a multi-service application that enables users to:

- create accounts and sign in securely
- activate accounts and reset passwords
- chat with a legal-focused AI assistant
- view and manage chat history
- work with uploaded legal documents and related content

The repository is organized into three main parts:

- Backend: NestJS API with authentication, Prisma, and MySQL
- Frontend: Next.js application for the user experience
- Model Service: Python/FastAPI service powering the AI responses

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- NextAuth-style authentication flow

### Backend
- NestJS
- TypeScript
- Prisma ORM
- MySQL
- JWT-based authentication
- Email-based activation and password reset flows

### AI/Model Service
- Python
- FastAPI
- document-aware retrieval and response logic

## Project Structure

```text
cyprus-legal-chatbot/
├── legal-chatbot-backend/
│   ├── src/
│   ├── prisma/
│   └── package.json
├── legal-chatbot-frontend/
│   ├── src/
│   └── package.json
└── legal-chatbot-model/
    ├── api/
    ├── Data/
    └── requirements.txt
```

## Features

- User registration and secure login
- Account activation and password recovery
- Protected API endpoints with JWT authentication
- Chat history persistence per user
- AI-powered legal Q&A experience
- Support for document-based information retrieval

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js and npm
- Python 3.10+
- MySQL database

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd cyprus-legal-chatbot
```

### 2. Set up the backend

```bash
cd legal-chatbot-backend
npm install
```

Create a database and configure your environment variables in a `.env` file. At minimum, set values for:

```env
DATABASE_URL="mysql://user:password@localhost:3306/legal_chatbot"
```

Then run Prisma migrations:

```bash
npx prisma migrate dev
```

Start the backend:

```bash
npm run start:dev
```

### 3. Set up the frontend

```bash
cd ../legal-chatbot-frontend
npm install
npm run dev
```

The frontend will typically run on:

```text
http://localhost:3000
```

### 4. Set up the AI model service

```bash
cd ../legal-chatbot-model
pip install -r requirements.txt
python main.py
```

The model service is expected to run on the port configured in the application flow.

## Environment Notes

The backend relies on environment variables for:

- database connection
- JWT configuration
- email delivery settings

If you deploy or run the project locally, ensure these values are configured securely before starting the services.

## Development Workflow

- Work on the frontend in the Next.js app
- Expose backend endpoints from the NestJS service
- Connect the model service for AI responses and retrieval tasks
- Keep authentication and user data handling consistent across services

## Contributing

Contributions are welcome. If you would like to improve the project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is currently unlicensed. If you plan to publish it publicly, consider adding an appropriate license file such as MIT or Apache 2.0.

## Contact

For questions or collaboration, please reach out through the repository issues or the project maintainer.
