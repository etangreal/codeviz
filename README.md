CodeViz - Code Visualizer (based off of OnlinePythonTutor - www.pythontutor.com)
======= 

Abstract: 
  In this thesis we look at the visualization of data structures derived from a program’s exe- cution context at each execution step, by which we aim to demonstrate that this approach is effective in facilitating the understanding and debugging of code. The first step being to pro- vide a default generated visualization of the underlying data structure, which can be viewed as a sequence of snapshots alongside the code. We then look at the customization of this visualization to facilitate a more concise understanding of the underlying conceptual-model with the idea of reducing the gulf of evaluation when looking at new or forgotten code. This customized view can then also provide a mechanism for aiding in debugging, thereby reduc- ing the gulf of execution. We demonstrate the usefulness of our approach through a case study.

Masters Thesis (PDF): https://github.com/etangreal/codeviz/raw/master/docs/Masters%20Thesis%2C%20Ernst%20Salzmann%20Sept%202014.pdf

Masters Thesis Defence (Youtube): http://www.youtube.com/watch?v=ABkGWu-QD7E

Masters Thesis Presentation (PDF): https://github.com/etangreal/codeviz/raw/master/docs/Master%20Thesis%20Presentation%2C%20Ernst%20Salzmann%20Sept%202014.pdf

INSTALLATION:


# INSTALL HOMEBREW

	ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# INSTALL VAGRANT & VIRTUALBOX

	brew tap caskroom/homebrew-cask
	brew install brew-cask
	brew cask install virtualbox
	brew cask install vagrant

# CLONE THE CODEVIZ REPOSITORY

	git clone https://github.com/etangreal/codeviz.git

# BUILD

	cd codeviz\build

	vagrant up
	vagrant ssh

	cd share/build

	# 1) pull docker image
	docker pull etangreal/codeviz

	# OR

	# 2) build image from scratch
		docker build -t etangreal/codeviz .	

	docker run --rm -ti -p 3000:3000 -v $(pwd)/..:/vagrant etangreal/codeviz

	________________________________________________________________________________________________
	# SSHing INTO THE CONTAINER

	# change directory to the CodeViz build folder:

		cd codeviz\build

	# connect to the VM (i.e CoreOS):

		vagrant ssh

	# change directory to the project build folder inside of CoreOS:

		cd share\build

	# Find out the ID of the container that you just ran:

		docker ps

	# Once you have the ID, look for its IP address with:

		docker inspect <ID> | grep IPAddress

	# Now SSH into the container:

		ssh -i insecure_key root@<IPAddress>

	# start meteor

		cd /vagrant/src
		mrt

	# Open another console and repeat: SSHing INTO THE CONTAINER
	# now start the backend

		cd /vagrant/backend
		python zrpc-opt-srv.py

# DEV

	# Open the browser with the following url:

		http://localhost:3030

	# Open the Code in your favorite IDE/Editor - e.g:

		subl codeviz/src

# END

