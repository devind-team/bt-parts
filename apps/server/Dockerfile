FROM node:latest as builder

WORKDIR /build

RUN apt-get update -y && apt-get upgrade -y && npm add -g pnpm
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY nx.json ./
RUN pnpm i --ignore-scripts
COPY . .
RUN pnpm exec nx run server:prisma-generate && pnpm exec nx run server:build

FROM node:latest

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN apt-get update -y && apt-get upgrade -y
COPY ["package.json", "pnpm-lock.yaml", "nx.json", "./"]
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/dist/apps/server ./

CMD [ "node", "main.js" ]
