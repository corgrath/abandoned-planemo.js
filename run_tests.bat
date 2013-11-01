./node_modules/.bin/jscoverage src/ src-instrumented/
./node_modules/.bin/mocha -R html-cov --recursive tests/ > coverage.html
./node_modules/.bin/mocha -R list --recursive tests/
