# portfolio-website-v2-node-api/Dockerfile

# base image
FROM node:18

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json ./
RUN npm install --silent
RUN npm install -g typescript

# add app
COPY . .

# Remove .env if copied
RUN if [ -f .env ]; then rm .env; fi

# start app
CMD ["npm", "run", "start"]
