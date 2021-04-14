install: install-deps

develop:
	npm run-script start

build:
	npm run-script build

install-deps:
	npm install --unsafe-perm

lint:
	npm run lint

publish:
	npm publish