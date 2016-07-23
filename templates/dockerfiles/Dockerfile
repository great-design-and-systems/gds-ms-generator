FROM rickzx98/gds-ms:0.1
MAINTAINER #MAINTAINER
RUN apt-get update
RUN git clone #REPO /host
WORKDIR /host
ENV DB_HOST #DOMAIN_DB
CMD npm install && npm start
EXPOSE 3000
