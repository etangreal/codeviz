
# –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
# BUILD FROM IMAGE: phusion/passenger-full
#
#	DOCUMENTATION:
# 				 URL: github.com/phusion/passenger-docker
#		VERSION-INFO: github.com/phusion/passenger-docker/blob/master/Changelog.md
#
#   RESOURCES:
#		URL: www.projectatomic.io/docs/docker-image-author-guidance
#		URL: www.digitalocean.com/community/tutorials/docker-explained-using-dockerfiles-to-automate-building-of-images
#		URL: intercityup.com/blog/deploy-rails-app-including-database-configuration-env-vars-assets-using-docker
#		URL: blog.gemnasium.com/post/66356385701/your-dockerfile-for-rails
#
# –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

FROM phusion/passenger-full:latest
MAINTAINER Ernst Salzmann <ErnstSalzmann@gmail.com>

# -------------------------------------------------------------------------------------------------
# Set environment variables.
# -------------------------------------------------------------------------------------------------

# USER app

# ENV HOME /tmp

# WORKDIR /home/app

# RUN echo prefix = /home/app/.node >> /home/app/.npmrc
# RUN echo "export PATH=$HOME/.node/bin:$PATH" >> .bashrc

# RUN export PATH=$HOME/.node/bin:$PATH

# -------------------------------------------------------------------------------------------------
# ENABLE-INSECURE-KEY
# -------------------------------------------------------------------------------------------------

RUN /usr/sbin/enable_insecure_key

# -------------------------------------------------------------------------------------------------
# LINUX
# -------------------------------------------------------------------------------------------------

# update
RUN apt-get -y update

# python
RUN apt-get install -y python-dev

# install ZeroMQ Dependancies
RUN apt-get install -y libzmq3-dev

# -------------------------------------------------------------------------------------------------
# PYTHON: EASY_INSTALL & PIP
# -------------------------------------------------------------------------------------------------

# install easy_install
RUN curl https://bootstrap.pypa.io/ez_setup.py -o - | python

# install pip
RUN easy_install pip

# -------------------------------------------------------------------------------------------------
# HACK 
# -------------------------------------------------------------------------------------------------

# so that npm will run under USER "nobody" which is what npm sees - even though the user is actually "root"
RUN npm config set unsafe-perm true

# -------------------------------------------------------------------------------------------------
# ZERORPC 
# -------------------------------------------------------------------------------------------------

# install Python-ZeroRPC
RUN pip install zerorpc

# install NodeJS-ZeroRPC
RUN npm install -g zerorpc

#RUN mkdir /.log.io && chmod 777 /.log.io && npm install -g log.io

# -------------------------------------------------------------------------------------------------
# METEOR
# -------------------------------------------------------------------------------------------------

# Install Meteor
RUN curl https://install.meteor.com | /bin/sh

# Install Meteorite
RUN npm install -g meteorite

# -------------------------------------------------------------------------------------------------
# CLEANUP
# -------------------------------------------------------------------------------------------------

RUN apt-get clean

# -------------------------------------------------------------------------------------------------
# expose port 80 and 433
# -------------------------------------------------------------------------------------------------

EXPOSE 80 443 3000 3001 8080

# -------------------------------------------------------------------------------------------------
# commands to execute after "spawning" a container
# -------------------------------------------------------------------------------------------------

# Run baseimage-docker's init process (when running the image for the first time).
CMD ["/sbin/my_init"]

# -------------------------------------------------------------------------------------------------
# ENTRYPOINT
# -------------------------------------------------------------------------------------------------

# ENTRYPOINT ["cd /vagrant"]

# –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
# END
# –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
