# ----------- builder -----------
FROM node:latest AS builder

WORKDIR /build

RUN npm install -g pnpm
COPY ["package.json", "pnpm-lock.yaml", ".npmrc", "nx.json", "./"]
RUN echo "\nnode-linker=hoisted" >> .npmrc && pnpm install
COPY . .
RUN pnpm exec nx run server:prisma-generate && \
  pnpm exec nx run server:build

# ----------- application -----------
FROM node:latest

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN npm i -g pm2 pnpm

COPY ["package.json", "pnpm-lock.yaml", "./"]
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/apps/server/prisma ./prisma
COPY --from=builder /build/dist/apps/server ./dist

COPY apps/server/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]

CMD [ "pm2-runtime", "./dist/main.js" ]
