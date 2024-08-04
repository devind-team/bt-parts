# ----------- builder -----------
FROM node:latest AS builder

WORKDIR /build

RUN npm add -g pnpm
COPY ["package.json", "pnpm-lock.yaml", ".npmrc", "nx.json", "./"]
RUN echo "\nnode-linker=hoisted" >> .npmrc && pnpm install
COPY . .
RUN pnpm exec nx run client:build

# ----------- application -----------
FROM node:latest

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN npm i -g pm2

COPY --from=builder /build/apps/client/.output ./

CMD [ "pm2-runtime", "./server/index.mjs" ]
  