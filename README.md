## Getting started

This server provides a simple number classifying functionality over a REST API. Clients can connect to the server and send commands to classify and retrieve numbers.

### Prerequisites

Ensure you have the following installed on your system:
- Node.js
- npm
- Docker

### Building the Server:
Run the following command:

```
npm install
```

### Running the project
This project uses Redis. You can set up the host creating a copy of `.env.template`. But a dockerized version is providede for you.

Just run the following command:
```
npm start
```

You should see the following success message:

```
Server listening on port 3001
```

### Endpoints
For simplicity and comfort, a Postman collection was exported into the repository in `Trafilea.postman_collection.json`.