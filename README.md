# Ngrok Tunnel Manager

A simple Node.js application to manage ngrok tunnels with support for custom domains, basic authentication, and OAuth. This tool helps you expose your local development server to the internet securely. This works for both **frontend applications** (e.g., static files served by a development server) and **backend applications** (e.g., a Node.js/Express server, a Django app, or any API running locally). Excellent for testing and sharing web apps.

## Prerequisites

Before using this project, you need to:

1. Sign up for an ngrok account at [ngrok](https://ngrok.com/)
2. Get your authtoken from the ngrok dashboard:
   - Log in to your ngrok account
   - Go to "Your Authtoken" section in the dashboard
   - Copy your authtoken (it looks like: `2oYwCZSnJolh4qOL5XoWbzLjjRr_...`)
3. Ensure that you have Node.js installed on your machine.

## Installation

1. Clone this repository

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root:

```bash
cp .env.example .env
```

## Configuration

Configure your tunnel by editing the `.env` file:

```env
# Required Configuration
NGROK_PORT=9000                    # Your local port to expose
NGROK_TOKEN=your_ngrok_token       # Your ngrok authtoken

# Optional Configuration
NGROK_DOMAIN=subdomain.ngrok-free.app    # Custom domain - you can have one free static domain per user or upgrade to paid to use a domain of your choice https://dashboard.ngrok.com/domains
NGROK_BASIC_AUTH=username:password       # Basic HTTP authentication
NGROK_OAUTH_PROVIDER=google             # OAuth provider
NGROK_OAUTH_EMAILS=user1@gmail.com,user2@gmail.com  # Allowed OAuth emails
```

## Usage

1. Start your local server (make sure it's running on the port specified in `NGROK_PORT`)

2. Start the tunnel:

```bash
npm run ngrok
```

3. The tunnel URL will be displayed in the console:

```
=== Ngrok Tunnel Established ===
Local Port: 9000
Public URL: https://your-domain.ngrok-free.app
```

4. To stop the tunnel, press `Ctrl+C` or `control + C`

## Features

- 🔒 Secure HTTPS endpoints
- 🔑 Basic authentication support
- 🌐 Custom domain support
- 🔐 OAuth authentication

You can extend the functionality of this app by adding additional configuration options, which are available in the documentation here: [ngrok JavaScript API](https://ngrok.github.io/ngrok-javascript/).
