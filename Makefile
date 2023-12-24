start-backend:
	npm run start

start-frontend:
	make -C frontend start

start:
	make start-backend & make start-frontend

build:
	npm run build --if-present

install:
	npm ci

lint:
	make -C frontend lint
