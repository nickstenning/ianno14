bundle.js: main.js
	browserify main.js -o $@

clean:
	rm bundle.js

.PHONY: clean
