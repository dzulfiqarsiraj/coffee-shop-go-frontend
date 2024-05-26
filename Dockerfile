FROM node:22-alpine3.19
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5174
CMD [ "npm", "run", "preview" ]
