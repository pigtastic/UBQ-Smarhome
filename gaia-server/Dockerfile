FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app

#Set env
#ENV NODE_ENV=prod

# Install app dependencies
COPY package*.json ./

RUN npm ci
#--only=production when dev dependencies are solved

# Bundle app source
COPY . .

EXPOSE 4000
ENTRYPOINT [ "npm", "run", "prodServer" ]
