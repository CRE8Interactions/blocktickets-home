FROM node:16

# set working directory

WORKDIR /usr/src/app/contract_issuer

COPY package*.json ./

RUN npm install -g truffle

# add app
COPY . .

EXPOSE 9545

CMD ["truffle", "develop"]