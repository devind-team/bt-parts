

.PHONY: migrate
migrate:
	pnpm exec nx run server:prisma-migrate --name=$(NAME)
	pnpm exec nx run server:prisma-push
	pnpm exec nx run server:lint --fix