# ----------- builder -----------
FROM node:latest as builder

WORKDIR /build

RUN npm add -g pnpm
COPY ["package.json", "pnpm-lock.yaml", "nx.json", "./"]
RUN pnpm i --ignore-scripts
COPY . .
RUN pnpm exec nx run server:prisma-generate && \
  pnpm exec nx run server:build

# ----------- application -----------
FROM node:latest

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN npm i -g pm2 pnpm

COPY ["package.json", "pnpm-lock.yaml", "nx.json", "./"]
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/apps/server/prisma ./prisma
COPY --from=builder /build/dist/apps/server ./

CMD [ "pm2-runtime", "main.js" ]
