install: 
		npm ci

gendiff:
		node bin/gendiff.js

publish:
		npm publish --dry-run

test:
		npx -n --experimental-vm-modules jest

test-coverage:
		npm test -- --coverage --coverageProvider=v8

lint:
		npx eslint .		