FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install
COPY . .
RUN ng build
FROM nginx:alpine
COPY --from=build /app/dist/angular-ui /usr/share/nginx/html
EXPOSE 80
