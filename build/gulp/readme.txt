
_______________________________________________________________________________
PROJECT SETUP

	mkdir gulp
	cd gulp

	npm init

	<note>
		Use `npm install <pkg> --save` afterwards to install a package and
		save it as a dependency in the package.json file.

	npm install -g gulp --save-dev
	npm install gulp-tsc --save-dev
	npm install gulp-tslint --save-dev
	npm install gulp-filter --save-dev

	touch gulpfile.js
	subl gulpfile.js

_______________________________________________________________________________

DOCUMENTATION
_______________________________________________________________________________
GULP:

	npm install -g gulp

	gulpjs.com
	github.com/gulpjs/gulp

_______________________________________________________________________________
DOCS:

	Getting-Started
		github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started

	Recipes and Articles section
		github.com/gulpjs/gulp/blob/master/docs/README.md#articles-and-recipes

	API
		github.com/gulpjs/gulp/blob/master/docs/API.md

_______________________________________________________________________________
TUTORIALS:
	
		httptagtree.tv/gulp

_______________________________________________________________________________
GULP-PLUGINS

	gulpjs.com/plugins

_______________________________________________________________________________
gulp-tsc (used)

	npm install gulp-tsc --save-dev

	www.npmjs.org/package/gulp-tsc
	github.com/kotas/gulp-tsc

	Temporary directory and file by gulp-tsc
		github.com/kotas/gulp-tsc/#temporary-directory-and-file-by-gulp-tsc

	SourceMap Options
		github.com/kotas/gulp-tsc/#optionssourcemap

_______________________________________________________________________________
tslint (used)

	npm install gulp-tslint --save-dev
		
	www.npmjs.org/package/gulp-tslint
	github.com/panuhorsmalahti/gulp-tslint

_______________________________________________________________________________
gulpt-filter (used)

	npm install gulp-filter --save-dev

	www.npmjs.org/package/gulp-filter
	github.com/sindresorhus/gulp-filter

_______________________________________________________________________________
gulp-typescript (unused)

	npm install gulp-typescript --save-dev
		
	github.com/sindresorhus/gulp-typescript
	www.npmjs.org/package/gulp-typescript

_______________________________________________________________________________
gulp-type (unused)

	npm install gulp-type --save-dev
	
	www.npmjs.org/package/gulp-type
	github.com/ivogabe/gulp-type

_______________________________________________________________________________
