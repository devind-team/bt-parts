FROM node:22.3.0 as builder
WORKDIR /build

RUN apt-get update -y && apt-get upgrade -y && npm i -g npm pnpm --upgrade
COPY . .
RUN ls -la
RUN pnpm install && \
  pnpm exec nx run server:prisma-generate && \
  pnpm exec nx server:build

FROM node:22.3.0

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

# RUN addgroup --system server && adduser --system --no-create-home --disabled-login --disabled-password server server

COPY --from=builder /build/dist/server ./app
RUN chown -R server:server .

CMD [ "node", "main.js" ]
