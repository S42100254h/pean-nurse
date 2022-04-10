FROM node:14.16.0 as build
WORKDIR /home/node/app
COPY . /home/node/app
# install sharp below command to use it on linux
RUN npm install --arch=x64 --platform=linux sharp
RUN npm install
RUN npm run build

# multi-stage builds
FROM nginx:1.21.6
RUN rm -f /etc/nginx/conf.d/*
COPY --from=build /home/node/app /var/www
COPY ./nginx.conf /etc/nginx/conf.d/
CMD /usr/sbin/nginx -g "daemon off;" -c /etc/nginx/nginx.conf
