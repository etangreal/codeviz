
# -------------------------------------------------------------------------------------------------
# CREATING THE PROJECT LAYOUT
# -------------------------------------------------------------------------------------------------

	mkdir codeviz
	cd codeviz

	git init

	mkdir assets
	mkdir backend
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

	meteor list --using

	#mrt remove autopublish
	#mrt remove insecure

	meteor add jquery
	mrt add stylus
	# mrt add jade

	mrt add iron-router

	mrt add famono
	npm install -g famono

	mrt add coffeescript

	meteor add bootstrap
	meteor add less

	# mrt add bootstrap-3
	# mrt remove bootstrap-3
	# mrt add accounts-ui-bootstrap-3

	mrt add sharejs

	mrt add jquery-ui
	mrt add jquery-ui-bootstrap

	mrt add npm

	npm install -g famono

	meteor add underscore
	mrt add backbone

	# after adding: src/packages/joint -> github.com/kidovate/meteor-joint
	echo joint >> .meteor/packages

# -------------------------------------------------------------------------------------------------
# END
# -------------------------------------------------------------------------------------------------
