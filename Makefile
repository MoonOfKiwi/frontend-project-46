install: 
		npm ci

gendiff:
		node bin/gendiff.js

publish:
		npm publish --dry-run

test:
		NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
		npm test -- --coverage --coverageProvider=v8

lint:
		npx eslint .		