CodeViz - Code Visualizer
=========================

Abstract:

  In this thesis we look at the visualization of data structures derived from a program’s execution context at each execution step, by which we aim to demonstrate that this approach is effective in facilitating the understanding and debugging of code. The first step being to provide a default generated visualization of the underlying data structure, which can be viewed as a sequence of snapshots alongside the code. We then look at the customization of this visualization to facilitate a more concise understanding of the underlying conceptual-model with the idea of reducing the gulf of evaluation when looking at new or forgotten code. This customized view can then also provide a mechanism for aiding in debugging, thereby reducing the gulf of execution. We demonstrate the usefulness of our approach through a case study.

Masters Thesis (PDF): https://github.com/etangreal/codeviz/raw/master/docs/Masters%20Thesis%2C%20Ernst%20Salzmann%20Sept%202014.pdf

Masters Thesis Defence (Youtube): http://www.youtube.com/watch?v=ABkGWu-QD7E

Masters Thesis Presentation (PDF): https://github.com/etangreal/codeviz/raw/master/docs/Master%20Thesis%20Presentation%2C%20Ernst%20Salzmann%20Sept%202014.pdf

# INSTALLATION:

	MacOS: These install instructions where designed & tested for the use with MacOS.
	
	Windows: On Windows one would download and install Virtualbox & Vagrant.

	Linux: Recommended that you still use VirtualBox & Vagrant, for consistancy, however its not required. 
	You could instead install docker on your Linux system and execute the container directly.

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

	cd codeviz/build

	vagrant up
	vagrant ssh

	cd share/build

	# 1) Pull docker image:

		docker pull etangreal/codeviz

	# <OR>

	# 2) Build image from scratch:

		docker build -t etangreal/codeviz .	

	# Start the Linux Container (from the "share/build" folder):

	docker run --rm -ti -p 3000:3000 -v $(pwd)/..:/vagrant etangreal/codeviz

# RUN

	# *** SSH-ing INTO THE CONTAINER ***

	# Open a console

	# Change directory to the CodeViz build folder:

		cd codeviz/build

	# Connect to the VM (i.e CoreOS):

		vagrant ssh

	# Change directory to the project build folder (inside of CoreOS):

		cd share/build

	# Find out the ID of the container that you just ran:

		docker ps

	# Once you have the ID, look for its IP address with:

		docker inspect <ID> | grep IPAddress

	# Now SSH into the container:

		ssh -i insecure_key root@<IPAddress>

		# NOTE: if you have an issue that the key is "not secure enough" do the following and retry:
		# 	chmod 600 insecure_key

	# REPEAT-ONCE-MORE: *** SSH-ing INTO THE CONTAINER ***

	# In the 1st console) start the meteor server:

		cd /vagrant/src
		mrt

	# In the 2nd console) start the backend:

		cd /vagrant/backend
		python zrpc-opt-srv.py

# DEVELOPMENT

	# Open the browser with the following url:

		http://localhost:3030

	# Open the Code in your favorite IDE/Editor - e.g:

		subl codeviz/src

# END

