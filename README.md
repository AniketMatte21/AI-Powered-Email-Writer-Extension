# AI-Powered Email Writer Extension

An AI-powered email writing application that generates email replies and integrates directly with Gmail through a Chrome Extension.

The project combines a Spring Boot backend, React web application, and Chrome Extension to provide AI-assisted email response generation.

The Chrome Extension integrates directly into Gmail and adds an `AI Reply` button to the email compose/reply interface. When clicked, it sends the email content to the local Spring Boot backend, generates an AI-powered response, and automatically inserts the generated reply into the Gmail compose box.

## Features

* AI-powered email reply generation
* Gmail Chrome Extension integration
* One-click AI reply generation
* Automatically detects Gmail compose/reply windows
* Extracts email content from Gmail
* Sends email content to the Spring Boot backend
* Automatically inserts the generated response into Gmail
* React-based web interface for email generation
* Spring Boot REST API backend
* Chrome Manifest V3 extension

## Project Structure

```text
AI-Powered-Email-Writer-Extension/
│
├── email-write-spring-boot/
│   └── Spring Boot Backend
│
├── email-writer-react/
│   └── React Web Application
│
├── email-writer-ext/
│   ├── manifest.json
│   ├── content.js
│   ├── content.css
│   └── icons/
│
└── first-chrome-ext/
    └── Chrome Extension Practice / Initial Extension
```

The repository contains separate backend, React frontend, and Chrome Extension components.

## Architecture

```text
                         User
                          |
                          v
                 +----------------+
                 |     Gmail      |
                 +-------+--------+
                         |
                         | AI Reply Button
                         v
                +-------------------+
                | Chrome Extension  |
                |   Manifest V3     |
                +---------+---------+
                          |
                          | HTTP POST
                          v
                +-------------------+
                |   Spring Boot     |
                |      Backend      |
                +---------+---------+
                          |
                          v
                    AI Generation
                          |
                          v
                Generated Email Reply
                          |
                          v
                +-------------------+
                | Gmail Compose Box |
                +-------------------+
```

## How the Chrome Extension Works

The extension runs as a content script on Gmail pages.

When Gmail creates or opens a compose/reply window, the extension detects the new compose interface and injects an `AI Reply` button into the Gmail toolbar.

The workflow is:

```text
Open Gmail
    |
    v
Open an Email
    |
    v
Click Reply
    |
    v
AI Reply Button Appears
    |
    v
Click "AI Reply"
    |
    v
Email Content Extracted
    |
    v
POST /api/email/generate
    |
    v
Spring Boot Backend
    |
    v
AI Generated Reply
    |
    v
Reply Inserted into Gmail
```

## Chrome Extension Setup

### Prerequisites

Before using the extension, make sure you have:

* Google Chrome
* Java
* Maven
* The Spring Boot backend running locally
* Access to Gmail
* Required AI API configuration for the backend

The extension is built using **Chrome Manifest V3** and has permissions for Gmail pages and the local backend.

---

## Step 1 — Clone the Repository

```bash
git clone https://github.com/AniketMatte21/AI-Powered-Email-Writer-Extension.git

cd AI-Powered-Email-Writer-Extension
```

---

## Step 2 — Start the Spring Boot Backend

Navigate to the backend project:

```bash
cd email-write-spring-boot
```

Configure the required AI/API settings in the Spring Boot application configuration.

Then start the backend:

```bash
mvn spring-boot:run
```

The Chrome Extension currently sends its requests to:

```text
http://localhost:8080/api/email/generate
```

This URL is directly configured in the extension's `content.js`.

**Important:** The backend must be running on port `8080` before you use the Chrome Extension.

---

# Step 3 — Install the Chrome Extension

The extension is provided as an unpacked Chrome Extension, so you can install it directly from the repository without publishing it to the Chrome Web Store.

### 3.1 Open Chrome Extensions

Open Google Chrome and enter:

```text
chrome://extensions/
```

### 3.2 Enable Developer Mode

In the top-right corner, enable:

**Developer mode**

### 3.3 Load the Extension

Click:

**Load unpacked**

A folder selection window will appear.

Navigate to the cloned repository and select:

```text
AI-Powered-Email-Writer-Extension/
└── email-writer-ext/
```

Select the **`email-writer-ext` folder itself**.

Make sure the selected folder contains:

```text
manifest.json
content.js
content.css
```

The extension's `manifest.json` identifies it as a Manifest V3 extension and configures Gmail as the target site.

### 3.4 Verify Installation

After loading the extension, Chrome should display:

**Email Writer Assistant**

The extension is configured to run on:

```text
https://mail.google.com/*
```

and communicates with the local backend at:

```text
http://localhost:8080/*
```

---

# Step 4 — Use the Extension in Gmail

This is the main usage workflow.

### 4.1 Open Gmail

Open:

```text
https://mail.google.com
```

Make sure you are logged into your Gmail account.

### 4.2 Open an Email

Open any email conversation that you want to reply to.

For example:

```text
Inbox
  ↓
Open Email
  ↓
Click Reply
```

### 4.3 Locate the AI Reply Button

Once the Gmail reply/compose window appears, the extension detects the compose window automatically.

An:

**AI Reply**

button will be added to the Gmail compose toolbar.

You do not need to manually open the extension popup.

### 4.4 Click AI Reply

Click:

**AI Reply**

The button temporarily changes to:

**Generating...**

while the request is being processed.

### 4.5 AI Generates the Response

The extension extracts the email content from the Gmail page and sends it to:

```text
POST http://localhost:8080/api/email/generate
```

with a request similar to:

```json
{
  "emailContent": "Original email content",
  "tone": "proffesional"
}
```

The current extension implementation uses a professional tone value.

### 4.6 Generated Reply Is Inserted Automatically

After receiving the response from the backend, the extension locates the Gmail compose textbox and inserts the generated response directly into it.

The complete experience is:

```text
Email
  ↓
Click Reply
  ↓
Click AI Reply
  ↓
AI generates response
  ↓
Response automatically appears in Gmail
  ↓
Review / Edit
  ↓
Send
```

## Example

Suppose you receive:

```text
Hi Aniket,

Could you please provide an update on the project?
```

Open the email and click **Reply**.

The extension adds:

```text
AI Reply
```

Click the button.

The generated response is automatically inserted into the Gmail reply box.

You can then:

1. Review the generated response
2. Make any required changes
3. Click **Send**

The extension does **not** automatically send the email. You remain in control of the final message.

---

# Web Application

In addition to the Chrome Extension, the repository contains a React frontend.

The React project is located at:

```text
email-writer-react/
```

The project uses:

* React
* React DOM
* Vite
* Material UI
* Emotion

These dependencies are defined in the project's `package.json`.

## Run the React Application

Navigate to:

```bash
cd email-writer-react
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

---

# Backend API

The Chrome Extension communicates with the Spring Boot backend through:

```text
POST /api/email/generate
```

The extension sends:

```json
{
  "emailContent": "Email content extracted from Gmail",
  "tone": "proffesional"
}
```

The backend processes the request and returns the generated email response as text.

The endpoint is directly referenced by the Chrome Extension implementation.

## API Flow

```text
Chrome Extension
       |
       | POST /api/email/generate
       v
Spring Boot Backend
       |
       v
AI Processing
       |
       v
Generated Response
       |
       v
Chrome Extension
       |
       v
Gmail Compose Box
```

# Chrome Extension Technical Details

The extension uses **Manifest V3**.

The manifest configures:

* `activeTab`
* `storage`
* Gmail host permissions
* Local backend access
* Gmail content scripts
* Web-accessible resources

The content script runs on Gmail pages and monitors DOM changes to detect newly opened compose/reply interfaces.

## Automatic Compose Detection

The extension uses a `MutationObserver` to monitor changes to the Gmail page.

When a compose/reply interface is detected, the extension automatically attempts to inject the AI Reply button.

This means the user does not need to refresh Gmail or manually activate the extension whenever a new reply window is opened.

# Technology Stack

## Backend

* Java
* Spring Boot
* Spring Web
* REST API
* Maven

## Frontend

* React 19
* Vite
* Material UI
* Emotion

## Chrome Extension

* JavaScript
* Chrome Extension Manifest V3
* Content Scripts
* Chrome Extension APIs
* Gmail DOM integration

## AI

* AI-powered email response generation
* Backend-based AI integration

# Project Structure

```text
AI-Powered-Email-Writer-Extension/
│
├── email-write-spring-boot/
│   └── Spring Boot Backend
│
├── email-writer-react/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── email-writer-ext/
│   ├── manifest.json
│   ├── content.js
│   ├── content.css
│   └── icons/
│
└── first-chrome-ext/
    └── Initial Chrome Extension
```

The repository currently contains the backend, React frontend, main Gmail extension, and an additional initial Chrome extension project.

# Troubleshooting

## AI Reply Button Does Not Appear

Check the following:

1. Make sure the extension is enabled in `chrome://extensions/`.
2. Make sure **Developer mode** is enabled.
3. Verify that you loaded:

```text
email-writer-ext/
```

4. Refresh Gmail.
5. Open an email.
6. Click **Reply**.
7. Check the browser console for extension errors.
8. Make sure the backend is running on port `8080`.

The extension only matches Gmail pages and injects the button when it detects a compose/reply interface.

## Backend Connection Error

If clicking **AI Reply** fails, verify that the Spring Boot backend is running at:

```text
http://localhost:8080
```

The extension currently sends requests to:

```text
http://localhost:8080/api/email/generate
```

## Gmail Page Was Already Open

If you installed or reloaded the extension while Gmail was already open, refresh the Gmail tab before testing the extension.

Then:

```text
Gmail
  ↓
Open Email
  ↓
Reply
  ↓
AI Reply
```

# Security

Do not commit:

* AI API keys
* Database credentials
* Authentication secrets
* Other sensitive configuration

For production deployment, replace the hard-coded local backend URL with a secure deployed API endpoint and configure appropriate HTTPS and CORS policies.

# Future Improvements

Potential improvements include:

* Multiple tone options
* Custom prompts
* Email summarization
* New-email generation
* Improved Gmail DOM compatibility
* Loading indicators
* Better error messages
* Chrome Web Store deployment
* Production backend deployment
* Support for additional email platforms

# Author

**Aniket Matte**

Computer Engineering
Sinhgad Institute of Technology and Science, Pune

GitHub:
https://github.com/AniketMatte21

# License

This project is currently intended for educational and portfolio purposes.
