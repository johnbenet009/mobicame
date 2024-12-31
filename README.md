# Video Streaming App

This project is a video streaming application that uses WebRTC for real-time communication and Electron for creating a desktop application. The server is built with Express and Socket.IO.

## Features

- Real-time video streaming using WebRTC
- Desktop application using Electron
- Mobile and server pages for streaming and control
- CORS enabled for cross-origin requests

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Steps

1. Clone the repository:

   ```sh
   git clone https://github.com/johnbenet009/mobicame.git
   cd mobicame
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Build the project:

   ```sh
   npm run build
   ```

4. Start the server:

   ```sh
   npm run dev
   ```

5. Start the Electron app:

   ```sh
   npm start
   ```

## Usage

### Accessing the Application

- **Mobile Page:** Open a browser on your mobile device and navigate to `http://<server-ip>:5000/mobile`.
- **Server Page:** Open a browser on your desktop and navigate to `http://localhost:5000/server`.

### Configuration

- The server listens on port `5000` by default. You can change this in the `server.js` file.
- The Vite configuration is set to use a relative base path. You can modify this in the `vite.config.ts` file.

## Troubleshooting

### Common Issues

- **Cannot read properties of undefined (reading 'enumerateDevices'):** Ensure that you are accessing the application over HTTP and that camera permissions are granted.
- **Server not starting:** Check the console for error messages and ensure that all dependencies are installed correctly.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
