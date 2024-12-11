FROM caddy:2.8.4-alpine AS base

COPY ./dist /var/www/fe
COPY ./infras/Caddyfile /etc/caddy/Caddyfile

WORKDIR /app

RUN "chown -R caddy:caddy /var/www/fe"
