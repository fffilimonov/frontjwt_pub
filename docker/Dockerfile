FROM ubuntu:16.04
MAINTAINER fffilimonov <fffilimonov@yandex.ru>

ENV DEBIAN_FRONTEND noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN true
ENV TZ "US/Pacific"
ENV LANGUAGE en_US.UTF-8
ENV LANG en_US.UTF-8

USER root

RUN  echo "deb http://archive.ubuntu.com/ubuntu xenial main universe\n" > /etc/apt/sources.list \
  && echo "deb http://archive.ubuntu.com/ubuntu xenial-updates main universe\n" >> /etc/apt/sources.list \
  && echo "deb http://security.ubuntu.com/ubuntu xenial-security main universe\n" >> /etc/apt/sources.list

#locale
RUN locale-gen en_US.UTF-8 \
  && dpkg-reconfigure --frontend noninteractive locales \
  && apt-get update -qqy \
  && apt-get -qqy --no-install-recommends install \
    language-pack-en \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/*

#Timezone
RUN echo "${TZ}" > /etc/timezone \
  && dpkg-reconfigure --frontend noninteractive tzdata

#Nginx
RUN apt-get update -qqy \
  && apt-get -qqy --no-install-recommends install \
    nginx \
    letsencrypt \
    ca-certificates

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

#Npm
RUN apt-get update -qqy \
  && apt-get -qqy install \
    nodejs \
    npm \
    git \
    ssh \
    vim

RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN mkdir -p /root/.ssh
COPY id_rsa /root/.ssh

ARG CACHE_DATE=not_a_date

RUN ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
RUN chmod 400 ~/.ssh/id_rsa
RUN git clone git@github.com:fffilimonov/frontjwt.git
WORKDIR 'frontjwt'
RUN npm install
RUN NODE_ENV=production ./node_modules/webpack/bin/webpack.js -p
RUN rm -rf /var/www/html/*
RUN cp -r /frontjwt/static/* /var/www/html/

RUN mkdir /etc/letsencrypt
COPY letsencrypt/ /etc/letsencrypt/
COPY dhparam.pem /frontjwt/dhparam.pem

RUN rm /etc/nginx/sites-available/default
COPY default /etc/nginx/sites-available/default

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
