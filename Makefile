.PHONY: migrate
migrate:
	pnpm exec nx run server:prisma-migrate --name=$(NAME)
	pnpm exec nx run server:prisma-push
	pnpm exec nx run server:lint --fix

.PHONY: build-client
build-client:
	docker build -f apps/client/Dockerfile . -t client:latest

.PHONY: build-server
build-server:
	docker build -f apps/server/Dockerfile . -t server:latest

.PHONY: build
build: build-client build-server


.PHONY: update-avatar
update-avatar:
	curl localhost:4200/api/graphql \
	-F operations='{ "query": "mutation ($file: Upload!) { uploadAvatar(file: $file) }", "variables": { "file": null } }' \
	-F map='{ "0": ["variables.file"] }' \
	-F 0=@Аватар.jpeg