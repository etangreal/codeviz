
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

	# build the docker container

		docker build -t etangreal/codeviz .
		docker run --rm -ti -p 3000:3000 -v $(pwd):/vagrant etangreal/codeviz bash -l

# -------------------------------------------------------------------------------------------------
# RUN THE PROJECT
# -------------------------------------------------------------------------------------------------

	# run the startup script

		./startup.sh

	# open the project on the HOST(MAC-OSX) (in the browser)

		http://localhost:3030

# -------------------------------------------------------------------------------------------------
# DOCKER
# -------------------------------------------------------------------------------------------------

	# create a re-runabble image (by commiting the container)

		docker ps
		docker commit <container-id> etangreal/codeviz

	# next time we want to start our docker image

		docker run --rm -ti -p 3000:3000 -v $(pwd):/vagrant etangreal/codeviz bash -l

# -------------------------------------------------------------------------------------------------
# END
# -------------------------------------------------------------------------------------------------
