FROM node:12-alpine AS builder

WORKDIR /app
COPY ./ /app
RUN npm ci
RUN npm run build

FROM alpine

WORKDIR /app
COPY ./ /app
COPY --from=builder /app/dist /app/dist
RUN apk add --update nodejs npm
RUN npm ci --only=production

CMD npm run start:prod