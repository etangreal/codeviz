
# -------------------------------------------------------------------------------------------------
# PREREQUISITES
# -------------------------------------------------------------------------------------------------

	VIRTUALBOX
	VAGRANT

# -------------------------------------------------------------------------------------------------
# CREATE PROJECT DIRECTORY
# -------------------------------------------------------------------------------------------------

mkdir codeviz
cd codeviz

# -------------------------------------------------------------------------------------------------
# VAGRANT
# -------------------------------------------------------------------------------------------------
# TUTORIAL:
#		URL: tonyhb.com/unsuck-your-vagrant-developing-in-one-vm-with-vagrant-and-docker
#
# RESOURCES:
#		URL: github.com/coreos/coreos-vagrant
#		CMD: wget raw.github.com/coreos/coreos-vagrant/master/Vagrantfile
#
# SUNDRY:
#		URL: 	github.com/phusion/open-vagrant-boxes
# -------------------------------------------------------------------------------------------------

vagrant box update
vagrant up

# -------------------------------------------------------------------------------------------------
# DOCKER
# -------------------------------------------------------------------------------------------------
# TUTORIAL
#		URL: mmckeen.net/blog/2013/12/14/docker-all-the-things-nginx-and-supervisor
# 
# RESOURCES:
# 	URL: 	github.com/phusion/passenger-docker
#		URL:	github.com/phusion/baseimage-docker
#
#		URL:	index.docker.io/u/phusion/baseimage
#		URL:	index.docker.io/u/phusion/passenger-full
#		URL:	index.docker.io/u/phusion/passenger-customizable
#
# DOCKER DATA VOLUMES
#		docs.docker.io.s3-website-us-west-2.amazonaws.com/reference/builder/#volume
# 	docs.docker.io.s3-website-us-west-2.amazonaws.com/use/working_with_volumes/#volume-def
# -------------------------------------------------------------------------------------------------

docker pull phusion/passenger-full:latest
docker pull phusion/baseimage:latest

docker run --rm -t -i -p 80:80 -v /home/core/share:/vagrant --name SERVER phusion/passenger-full bash -l

#docker run -t -i -v /home/core/share:/vagrant --name SERVER phusion/passenger-full bash -l

# -------------------------------------------------------------------------------------------------
# METEOR
#	URL:	docs.meteor.com
#
# METOERITE
#	URL: 	github.com/oortcloud/meteorite
# -------------------------------------------------------------------------------------------------

# Install Meteor
curl https://install.meteor.com | /bin/sh

# Install Meteorite
npm install -g meteorite

# -------------------------------------------------------------------------------------------------
# END
# -------------------------------------------------------------------------------------------------
