include .env
ifneq ("$(wildcard .env.local)","")
	include .env.local
endif

PACKAGE_MANAGER ?= pnpm
X_MANAGER ?= pnpx
NEXT_PORT ?= 3000

.DEFAULT_GOAL := dev


## —— React Makefile ———————————————————————————————————
help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9_-]+:.*?## .*$$)|(^## )' Makefile | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

## —— Npm server ———————————————————————————————————
sync: clean
	$(MAKE) docker-destroy
	$(MAKE) install
	$(MAKE) docker-up
	sleep 2
	$(MAKE) prisma-migrate
	$(MAKE) prisma-seed
	$(MAKE) dev

clean:
	@rm -rf node_modules .next yarn.lock bun.lockb pnpm-lock.yaml package-lock.json

install: ## Install dependencies
	@test -f .env.local || cp .env .env.local
	$(PACKAGE_MANAGER) install

dev: ## Run the development server
	$(PACKAGE_MANAGER) dev -p $(NEXT_PORT)

build: install ## Build the application
	$(PACKAGE_MANAGER) run build

## —— Prisma ———————————————————————————————————
prisma: ## Generate prisma client
	$(X_MANAGER) prisma generate

prisma-seed: ## Seed prisma database
	$(PACKAGE_MANAGER) run prisma:seed

prisma-migrate: ## Migrate prisma
	$(X_MANAGER) prisma migrate dev --preview-feature

prisma-studio: ## Open prisma studio
	$(X_MANAGER) prisma studio

prisma-reset: ## Reset prisma
	$(X_MANAGER) prisma migrate reset
	$(X_MANAGER) prisma migrate dev

## —— Linters ———————————————————————————————————
lint: ## Run all linters
	$(X_MANAGER) biome check --write
	$(X_MANAGER) prisma validate
	$(PACKAGE_MANAGER) prisma format

check: lint build ## Run all linters and tests

## —— Git ———————————————————————————————————
git-clean-branches: ## Clean merged branches
	@git remote prune origin
	(git branch --merged | egrep -v "(^\*|main|master|dev)" | xargs git branch -d) || true

git-rebase-main:
	git pull origin main --rebase

git-pull-porcelain: ## Update code with rebase
	@if [ "$(shell git status --porcelain | wc -l)" -gt 0 ]; then git stash && git pull --rebase && git stash pop; else git pull --rebase; fi

# —— Auto message intelligent ——
# Si branch follow pattern issue-<ID>-<slug>, produit:
# "chore: issue <ID> <slug avec espaces> (fixes #<ID>)"
# Sinon: "chore: update"
# —— Auto message intelligent ——
# Si branch follow pattern issue-<ID>-<slug>, produit:
# "chore: issue <ID> <slug avec espaces> (fixes #<ID>)"
# Sinon: "chore: update"
msg ?= $(shell \
	BRANCH=$$(git branch --show-current); \
	if echo $$BRANCH | grep -Eiq '^issue-[0-9]+'; then \
		ID=$$(echo $$BRANCH | sed -E 's/^issue-([0-9]+)-.*/\1/'); \
		SLUG=$$(echo $$BRANCH | sed -E 's/^issue-[0-9]+-(.*)/\1/; s/-/ /g'); \
		echo "chore: issue $$ID $$SLUG (fixes \#$$ID)"; \
	else \
		echo "chore: update"; \
	fi \
)


auto-commit: ## Auto commit
	@if [ "$(shell git status --porcelain | wc -l)" -gt 0 ]; then git add .; git commit -m "$(msg)" || true; fi

push: check auto-commit ## add, commit and push modifications vers le dépôt git
	@BRANCH=$$(git branch --show-current); \
	if git rev-parse --abbrev-ref --symbolic-full-name @{u} >/dev/null 2>&1; then \
		echo "🔄 Upstream déjà configuré → pull --rebase + push"; \
		git pull --rebase; \
		git push; \
	else \
		echo "⚠️  Pas d’upstream → on pousse sur origin/$$BRANCH et on configure l’upstream"; \
		git push -u origin $$BRANCH; \
	fi

## —— Docker ———————————————————————————————————
docker-up: ## Start docker
	@docker compose up -d --wait

docker-destroy: ## Destroy docker
	@docker compose down --remove-orphans --volumes --rmi all

docker-down: ## Stop docker
	@docker compose down --remove-orphans

docker-db:
	@docker compose exec -ti database psql app password

docker-logs:
	@docker compose logs -f $(c)

docker-ps:
	@docker compose ps -a

