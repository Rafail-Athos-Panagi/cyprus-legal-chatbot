# AI-Powered Legal Chatbot for Cyprus

A full-stack AI-powered legal assistant designed to help users interact with legal information in Cyprus through a modern web interface. The project combines a secure authentication backend, a polished Next.js frontend, and an AI model service for document-aware conversational responses.

This project was developed in collaboration with the legal company Leginet, which also provided the data used to support the chatbot’s knowledge and functionality.

## Overview

The AI-Powered Legal Chatbot for Cyprus is a multi-service application that enables users to:

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
- Docker Desktop (used to run the MySQL database — see below)
- An **OpenAI API key** (required by both the backend and the model service)

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd cyprus-legal-chatbot
```

### 2. Start the database with Docker

The backend uses a MySQL database. The easiest way to run it locally is with Docker. Make sure **Docker Desktop is running**, then start a MySQL container:

```bash
docker run --name legal-chatbot-mysql \
  -e MYSQL_ROOT_PASSWORD=rootpass \
  -e MYSQL_DATABASE=NestJS_JWT \
  -e MYSQL_USER=NestJS_JWT \
  -e MYSQL_PASSWORD=NestJS_JWT \
  -p 3306:3306 \
  -d mysql:8
```

The container data persists between restarts. To stop and start it again later:

```bash
docker stop legal-chatbot-mysql
docker start legal-chatbot-mysql
```

### 3. Set up the backend

```bash
cd legal-chatbot-backend
npm install
```

Configure your environment variables in a `.env` file. At minimum, set values for:

```env
DATABASE_URL="mysql://NestJS_JWT:NestJS_JWT@localhost:3306/NestJS_JWT"
AT_SECRET="your-access-token-secret"
RT_SECRET="your-refresh-token-secret"

# Email delivery (activation / password reset)
EMAIL_HOST="your-smtp-host"
EMAIL_USERNAME="your-smtp-username"
EMAIL_PASSWORD="your-smtp-password"

# Required: your own OpenAI API key
OPENAI_API_KEY="sk-your-openai-api-key"
```

> **Note:** You must supply your own OpenAI API key. Get one from
> https://platform.openai.com/api-keys. Never commit real keys to the repository.

Generate the Prisma client and apply the migrations:

```bash
npx prisma generate
npx prisma migrate deploy
```

Start the backend:

```bash
npm run start:dev
```

The backend runs on `http://localhost:3333`.

### 4. Set up the frontend

```bash
cd ../legal-chatbot-frontend
npm install
```

Configure the frontend `.env` file:

```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
OPENAI_API_KEY="sk-your-openai-api-key"
```

Then start it:

```bash
npm run dev
```

The frontend runs on `http://localhost:3000`.

### 5. Set up the AI model service

```bash
cd ../legal-chatbot-model
pip install -r requirements.txt
```

The model service also needs your OpenAI API key. Set it as an environment variable (or in the service's `.env`, depending on your setup):

```bash
# Windows (PowerShell)
$env:OPENAI_API_KEY="sk-your-openai-api-key"

# macOS / Linux
export OPENAI_API_KEY="sk-your-openai-api-key"
```

Then start the service:

```bash
python main.py
```

The model service runs on `http://localhost:3334`.

## Environment Notes

The backend relies on environment variables for:

- database connection
- JWT configuration
- email delivery settings
- an OpenAI API key (`OPENAI_API_KEY`)

The frontend and the model service also require their own `OPENAI_API_KEY`.

You must provide your own OpenAI API key — obtain one from
https://platform.openai.com/api-keys. If you deploy or run the project locally,
ensure these values are configured securely and never commit real keys or
passwords to the repository.

## Development Workflow

- Work on the frontend in the Next.js app
- Expose backend endpoints from the NestJS service
- Connect the model service for AI responses and retrieval tasks
- Keep authentication and user data handling consistent across services

## Contact

For questions or collaboration, please reach out through the repository issues or the project maintainer.
