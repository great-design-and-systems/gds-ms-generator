FROM rickzx98/gds-ms:#IMAGE_SERVICE_TAG
MAINTAINER #MAINTAINER
RUN apt-get update
RUN git clone #REPO /host && \
    npm config set logfd /app/log
WORKDIR /host
RUN npm install
ENV DB_HOST #DOMAIN_DB
ENV SCHOOL_CONFIG_SERVICE_PORT #SCHOOL_CONFIG_SERVICE_PORT
CMD npm start
EXPOSE 3000
