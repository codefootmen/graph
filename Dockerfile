FROM node:8
COPY . .
RUN npm i
RUN npm run build --production
RUN npm install -g serve
CMD serve -l 3000 -s build 


EXPOSE 3000

