
# -------------------------------------------------------------------------------------------------
# PREREQUISITES
# -------------------------------------------------------------------------------------------------

	VirtualBox	( www.virtualbox.org )
	Vagrant 		( www.vagrantup.com )

# -------------------------------------------------------------------------------------------------
# VAGRANT
# -------------------------------------------------------------------------------------------------

	# goto the 'build' directory
	# i.e: <path-to-project>/codeviz/build

	cd build

	vagrant box update
	vagrant up
	vagrant ssh

	# your now inside the Virtual Machine
	# goto the 'share' directory
	# i.e: ~/share

	cd share

	# check that your in the project diretory i.e: the 'codviz' directory (this directory is shared)

	ls

# -------------------------------------------------------------------------------------------------
# DOCKER
# -------------------------------------------------------------------------------------------------

	# pull the phusion passenger-full docker image

	docker pull phusion/passenger-full:latest

	# start the docker container

	docker run --rm -ti -p 3000:3000 -v $(pwd):/vagrant phusion/passenger-full bash -l

# -------------------------------------------------------------------------------------------------
# METEOR
# -------------------------------------------------------------------------------------------------

# Install Meteor
curl https://install.meteor.com | /bin/sh

# Install Meteorite
npm install -g meteorite

# -------------------------------------------------------------------------------------------------
# RUN THE PROJECT
# -------------------------------------------------------------------------------------------------

# change to the 'src' directory
# i.e: <path-to-project>/codeviz/src

cd src

# check that the project works

mrt

# open the project on the host (in the browser)

http://localhost:3030

# create a re-runabble image ( by commiting the container)

docker ps
docker commit <container-id> codeviz

# next time we want to start our docker image

docker run --rm -ti -p 3000:3000 -v $(pwd):/vagrant codeviz bash -l

_______________________________________________________________________________________________________________________


_______________________________________________________________________________________________________________________

_______________________________________________________________________________________________________________________

_______________________________________________________________________________________________________________________

_______________________________________________________________________________________________________________________

_______________________________________________________________________________________________________________________


