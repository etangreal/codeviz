
# -------------------------------------------------------------------------------------------------
# CREATING THE PROJECT LAYOUT
# -------------------------------------------------------------------------------------------------

	mkdir codeviz
	cd codeviz

	git init

	mkdir assets
	mkdir build
	mkdir docs
	mkdir related
	mkdir tmp

# -------------------------------------------------------------------------------------------------
# CREATING THE INITIAL PROJECT SRC
# -------------------------------------------------------------------------------------------------

	meteor create src
	cd src

	# create the initial folders
	mkdir client
	mkdir client/lib
	mkdir client/css
	mkdir client/views

	mkdir collections
	mkdir lib
	mkdir public
	mkdir server

	_________________________________________________________________________________________________
	# ADD METEOR/METEORITE PACKAGES

	#mrt remove autopublish
	#mrt remove insecure

	meteor add jquery
	mrt add stylus
	# mrt add jade

	mrt add iron-router

	mrt add famono
	npm install -g famono
	
	mrt add coffeescript
	#mrt add typescript-libs
	
	meteor add bootstrap
	meteor add less

	# mrt add bootstrap-3
	# mrt remove bootstrap-3
	# mrt add accounts-ui-bootstrap-3

	mrt add sharejs

	mrt add jquery-ui
	mrt add jquery-ui-bootstrap

	mrt add npm

	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	# METEOR-REFERENCES

	===============================================================================================
	# atmospherejs.com/package/famono
	# www.npmjs.org/package/famono
	# github.com/raix/Meteor-famono

	===============================================================================================
	# atmospherejs.com/package/bootstrap-3
	# atmospherejs.com/package/accounts-ui-bootstrap-3
	
	===============================================================================================
	# atmospherejs.com/package/sharejs
	# github.com/mizzao/meteor-sharejs

	===============================================================================================
	# atmospherejs.com/package/jquery-ui
	# github.com/TimHeckel/meteor-jquery-ui

	===============================================================================================
	# atmospherejs.com/package/jquery-ui-bootstrap
	# github.com/TimHeckel/meteor-jquery-ui-bootstrap

	===============================================================================================
	# DON'T ADD: typescript-compiler doesn't work ...
	# mrt add typescript-compiler

	===============================================================================================
	# ARTICLE: meteorhacks.com/complete-npm-integration-for-meteor.html
	# 	  URL: atmospherejs.com/package/npm
	#	  URL: github.com/arunoda/meteor-npm
	#
	# 	mrt add npm

	<ALTERNATIVE-INSTALL>

	# URL: www.npmjs.org/package/meteor-npm
	#
	# 	npm install -g meteor-npm
	# 	meteor-npm

	===============================================================================================
	# ARTICLE: Installing/Using Phantom.js with Meteor
	#	  URL: stackoverflow.com/questions/23812163/installing-using-phantom-js-with-meteor

	#	phantomjs (MOST POPULAR ON NPM)
	#	  URL: www.npmjs.org/package/phantomjs

		$ mrt add npm
		
		# in packages.json add:
		{
			"phantomjs": "1.9.7-15"
		}

		# to uses:
		var phantomjs = Meteor.require('phantomjs');

	<ALTERNATIVE>

	#	phantom (MOST STARS ON GITHUB)
	#		URL: www.npmjs.org/package/phantom

		$ mrt add npm
		
		# in packages.json add:
		{
			"phantom": "0.6.5"
		}

		# to uses:
		var phantom = Meteor.require('phantom');

	_________________________________________________________________________________________________
	# OTHER-INSTALLS

	sudo npm update npm -g

	pip install zerorpc
	npm install zerorpc

	# gevent:
		www.gevent.org

		# Tutorials:
			www.gevent.org/intro.html
			sdiehl.github.io/gevent-tutorial

		# Installation:
			pip install greenlet

	sudo brew update && brew install phantomjs

	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	# OTHER-INSTALLS-REFERENCES

	# zerorpc.dotcloud.com
	# www.npmjs.org/package/zerorpc

	# phantomjs.org/download.html

	_________________________________________________________________________________________________
	# MAC-INSTALLS

	sudo easy_install pip

	npm update npm -g

# -------------------------------------------------------------------------------------------------
# END
# -------------------------------------------------------------------------------------------------
