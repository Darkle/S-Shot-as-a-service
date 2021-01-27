FROM mcr.microsoft.com/playwright:focal
# Start the app
WORKDIR /usr/src/app
COPY package*.json ./
ENV NODE_ENV=production
RUN npm install --production
COPY . .
CMD [ "npm", "start" ]
