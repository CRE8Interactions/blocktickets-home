FROM node:14

# set working directory

WORKDIR /usr/src/app/tickets

COPY package*.json ./

RUN npm install

# add app
COPY . .

EXPOSE 1337

CMD ["npm", "run", "develop"]