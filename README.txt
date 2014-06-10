
_______________________________________________________________________________________________________________________

# PREREQUISITES
_______________________________________________________________________________________________________________________

install: VIRTUALBOX
install: VAGRANT

_______________________________________________________________________________________________________________________

# CREATE PROJECT DIRECTORY
_______________________________________________________________________________________________________________________

mkdir codeviz
cd codeviz

_______________________________________________________________________________________________________________________

# VAGRANT

# TUTORIAL:
#	URL: tonyhb.com/unsuck-your-vagrant-developing-in-one-vm-with-vagrant-and-docker

# RESOURCES:
#	URL: github.com/coreos/coreos-vagrant
#	CMD: wget raw.github.com/coreos/coreos-vagrant/master/Vagrantfile
#
# SUNDRY:
#	URL: 	github.com/phusion/open-vagrant-boxes
_______________________________________________________________________________________________________________________

vagrant up

_______________________________________________________________________________________________________________________
# DOCKER
#
# TUTORIAL
#	URL: mmckeen.net/blog/2013/12/14/docker-all-the-things-nginx-and-supervisor
# 
# RESOURCES:
# 	URL: 	github.com/phusion/passenger-docker
#	URL:	github.com/phusion/baseimage-docker
#
#	URL:	index.docker.io/u/phusion/baseimage
#	URL:	index.docker.io/u/phusion/passenger-full
#	URL:	index.docker.io/u/phusion/passenger-customizable

# DOCKER DATA VOLUMES
#	docs.docker.io.s3-website-us-west-2.amazonaws.com/reference/builder/#volume
# 	docs.docker.io.s3-website-us-west-2.amazonaws.com/use/working_with_volumes/#volume-def
_______________________________________________________________________________________________________________________


docker run --rm -t -i -p 80:80 -v /home/core/share:/vagrant --name SERVER phusion/passenger-full bash -l

#docker run -t -i -v /home/core/share:/vagrant --name SERVER phusion/passenger-full bash -l

_______________________________________________________________________________________________________________________

# METEOR
#	URL:	docs.meteor.com
#
# METOERITE
#	URL: 	github.com/oortcloud/meteorite
_______________________________________________________________________________________________________________________

# Install Meteor
curl https://install.meteor.com | /bin/sh

# Install Meteorite
npm install -g meteorite

_______________________________________________________________________________________________________________________

# CREATE THE PROJECT 
_______________________________________________________________________________________________________________________

# add famono ( atmospherejs.com/package/famono )
mrt add famono
mrt add iron-router

bootstrap?



mkdir client
mkdir client/lib
mkdir client/css
mkdir client/views

mkdir server
mkdir collections
mkdir public
mkdir both


atmospherejs.com/package/bootstrap-3



