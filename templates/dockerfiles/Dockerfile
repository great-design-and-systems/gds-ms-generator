FROM rickzx98/gds-ms:#IMAGE_SERVICE_TAG
MAINTAINER #MAINTAINER
RUN apt-get update
RUN git clone #REPO /host
WORKDIR /host
ENV DB_HOST #DOMAIN_DB
CMD npm install && npm start
EXPOSE 3000
