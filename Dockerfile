FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]