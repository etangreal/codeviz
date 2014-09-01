
# -------------------------------------------------------------------------------------------------
# PREREQUISITES
# -------------------------------------------------------------------------------------------------

	VirtualBox		( www.virtualbox.org )
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

	# check that you're in the project diretory i.e: the 'codviz' directory (this directory is shared)

		ls

# -------------------------------------------------------------------------------------------------
# DOCKER
# -------------------------------------------------------------------------------------------------

	# pull the phusion passenger-full docker image

		docker pull phusion/passenger-full:latest

	# start the docker container

		docker run -ti -p 3000:3000 -v $(pwd):/vagrant phusion/passenger-full bash -l
		docker run --rm -ti -p 3000:3000 -v $(pwd):/vagrant phusion/passenger-full bash -l

# -------------------------------------------------------------------------------------------------
# LINUX
# -------------------------------------------------------------------------------------------------

	Update:

		sudo apt-get -y update

	Python:
		
		sudo apt-get install -y python-dev

	Env:

		export USER=root

# -------------------------------------------------------------------------------------------------
# PYTHON: EASY_INSTALL & PIP
# -------------------------------------------------------------------------------------------------

	install easy_install:

		curl https://bootstrap.pypa.io/ez_setup.py -o - | python

	install pip:

		sudo easy_install pip

# -------------------------------------------------------------------------------------------------
# NODE
# -------------------------------------------------------------------------------------------------

	export HOME=/tmp

# -------------------------------------------------------------------------------------------------
# ZERORPC
# -------------------------------------------------------------------------------------------------

	ZeroMQ:

		apt-get install -y libzmq3-dev

	Python-ZeroRPC

		pip install zerorpc

	NodeJS-ZeroRPC

		npm install -g zerorpc

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

	# open the project on the HOST(MAC-OSX) (in the browser)

		http://localhost:3030

	# create a re-runabble image (by commiting the container)

		docker ps
		docker commit <container-id> codeviz

	# next time we want to start our docker image

		docker run --rm -ti -p 3000:3000 -v $(pwd):/vagrant codeviz bash -l

# -------------------------------------------------------------------------------------------------
# LINUX: SHELL-SCRIPT
# -------------------------------------------------------------------------------------------------

	Question: How to get the process id to kill a nohup process
		stackoverflow.com/questions/17385794/how-to-get-the-process-id-to-kill-a-nohup-process

	command:

		nohup mrt > meteor.log 2>&1&
		echo $! > save_pid.txt
		kill -9 `cat save_id.txt`

	<or>
		nohup mrt
		ps -ef | grep nohup
		kill -9 <pid>

# -------------------------------------------------------------------------------------------------
# END
# -------------------------------------------------------------------------------------------------
