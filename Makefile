install: 
		npm ci

gendiff:
		node bin/gendiff.js

publish:
		npm publish --dry-run

test:
		npm run test

test-coverage:
		npm test -- --coverage --coverageProvider=v8

lint:
		npx eslint .		