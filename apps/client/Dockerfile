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

RUN pnpm exec nx run client:build

# ----------- application -----------
FROM node:latest

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN npm i -g pm2

COPY --from=builder /build/apps/client ./

CMD [ "pm2-runtime", ".output/server/index.mjs" ]
  