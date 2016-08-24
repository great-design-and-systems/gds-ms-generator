FROM rickzx98/gds-ms:#IMAGE_SERVICE_TAG
MAINTAINER #MAINTAINER
RUN git config --global http.proxy proxy.assumption.edu.ph:3128 && \
    git config --global https.proxy proxy.assumption.edu.ph.3128 && \
    npm config set proxy "http://proxy.assumption.edu.ph:3128" && \
    npm config set https-proxy "http://proxy.assumption.edu.ph:3128"
RUN git clone #REPO /host && \
    npm config set logfd /app/log
WORKDIR /host
RUN npm install
ENV PORT 3000
ENV APP_LOG /app/log
ENV DB_HOST #DOMAIN_DB
ENV DB #DOMAIN_DB
ENV DB_TEST #DOMAIN_DB_TEST
ENV DB_PORT 27017
ENV DB_PORT_TEST 27017
ENV DB_HOST_TEST #DOMAIN_DB
ENV SCHOOL_CONFIG_SERVICE_PORT #SCHOOL_CONFIG_SERVICE_PORT
CMD npm run container
EXPOSE 3000 
