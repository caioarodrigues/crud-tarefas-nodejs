FROM node:23.8.0 AS builder

WORKDIR /app

COPY package*.json ./                                      

RUN npm install -g npm@10.9.2
RUN npm install 
RUN npm install -g typescript tsx

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
