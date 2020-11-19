FROM node:12-alpine AS builder

WORKDIR /app
COPY ./ /app
RUN npm ci
RUN npm run build

FROM alpine:3.12

WORKDIR /app
COPY ./ /app
COPY --from=builder /app/dist /app/dist
RUN apk add --no-cache --update nodejs npm
RUN npm ci --only=production
RUN addgroup -S node && adduser -S -g node node 

USER node 

CMD npm run start:prod