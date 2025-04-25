# Beirut Falafel Admin App

This is a mobile admin app built using Expo (React Native) to manage the menu, orders, reports, and enquiries for Beirut Falafel.

## Features
- Secure login and password reset
- Add, edit, and delete menu items
- Manage customer orders
- Generate reports
- Handle customer enquiries

## Tech Stack
- Expo (React Native)
- Express.js (shared backend)
- PostgreSQL (or your database)

## Setup
```bash
npm install
npx expo start

To run the Expo app with your local backend, follow these steps:

1. Open a terminal.
2. Run `ipconfig` (on Windows) or `ifconfig` (on Mac/Linux).
3. Find your **IPv4 address** (e.g., `192.168.1.124`).
4. In your code, update the backend URL:

inside folder  api/communication.ts add this with your **IPv4 address**
Backend is hosted in Goolge Cloud, So you can connect to backend either by this way
const apiUrl = "https://beruitfalafelbackend.ts.r.appspot.com/";

or If you want to connect Loccaly in You device use this way
const apiUrl = "http://<Your.IP.Address>:8080/"; but for this make sure  Your backeend server is running in express js, other wise you wont be able to navigate throught he app

// Note: Both your computer and the device running the Expo app must be on the same Wi-Fi network.
