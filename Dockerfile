FROM node:lts as builder

# Create app directory
RUN mkdir -p /usr/src/app/.nuxt
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
# BUILD STAGE
FROM BASE AS BUILD
# Install all dependencies
RUN npm i
# Set environment variables
ENV NODE_ENV production
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000
# Bundle app source
COPY . /usr/src/app
# Build command
RUN npm run build
# PRODUCTION STAGE
FROM BASE AS PROD
COPY --from=BUILD /usr/src/app/.nuxt/ /usr/src/app/.nuxt/
# Set environment variables again to ensure
ENV NODE_ENV production
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000
# Bundle app source
COPY . /usr/src/app
# Installing needed packages only and clearing cache
RUN npm install --only=production && \
    npm cache clean --force
EXPOSE 3000
CMD [ "npm", "start" ]

CMD ["npm", "run", "start"]
