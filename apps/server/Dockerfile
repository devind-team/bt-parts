# ----------- builder -----------
FROM node:latest AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /build

RUN corepack enable
COPY ["package.json", "pnpm-lock.yaml", ".npmrc", "nx.json", "./"]
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .

RUN pnpm exec nx run server:prisma-generate && \
  pnpm exec nx run server:build

# ----------- application -----------
FROM node:latest

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN npm i -g pm2 pnpm

COPY package.json package.json

COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/apps/server/prisma ./prisma
COPY --from=builder /build/dist/apps/server ./dist

COPY apps/server/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]
EXPOSE 3000
CMD [ "pm2-runtime", "./dist/main.js" ]
