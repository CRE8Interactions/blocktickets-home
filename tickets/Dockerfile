FROM node:14

# set working directory

WORKDIR /usr/src/app/tickets

COPY package*.json ./

RUN npm install

RUN npm run build

# add app
COPY . .

EXPOSE 1337

CMD ["npm", "run", "develop"]