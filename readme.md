# Portfolio Website Backend

This is the backend server for a portfolio website application with support for an admin dashboard and a blog page. The backend is built using Node.js, Express.js, PostgreSQL, AWS SDK, and Nodemailer for email functionality and written in Typescript. The application can be run locally and deployed to a hosting service.

## Getting Started

To get started with this project, follow these steps:

## 1. Clone the repository:

git clone https://github.com/Shagasresthaa/portfolio-website-v2-node-api.git  
(or)  
git clone git@github.com:Shagasresthaa/portfolio-website-v2-node-api.git  

cd portfolio-website-v2-node-api

## 2. Install dependencies:

npm install

## 3. Set up the configuration:

Create a `.env` file in the root of the project folder.
Set the required environment variables in the `.env` file, for database connection details, mail service credentials, AWS credentials, etc.

## 4. Run the application locally:

npm run build  
npm run start-ts  

This will build the TypeScript code into JavaScript and then start the backend server.  

## Usage

- The API endpoints can be accessed via `http://localhost:3000/api/` or the appropriate endpoint URL of application.
- The admin dashboard api endpoints can be accessed via `http://localhost:3000/api/admin`

## License

This project is licensed under the [MIT License](LICENSE).

