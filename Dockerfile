############################################################
# Dockerfile to run yaas
# Based on baseos
############################################################

FROM r1cebank/baseos:latest

# File Author / Maintainer
MAINTAINER Siyuan Gao <siyuangao@gmail.com>

# Bundle app source
COPY . /src

# Environment variables
ENV PORT 3939

# Install app dependencies
RUN cd /src; npm install

ENV NODE_ENV production
WORKDIR /src

CMD gulp && pm2 start lib/index.js --no-daemon
