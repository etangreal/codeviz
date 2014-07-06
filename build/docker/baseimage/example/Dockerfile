
# -------------------------------------------------------------------------------------------------
# BUILD FROM IMAGE: phusion/baseimage
#
#	 DOCUMENTATION:
# 					 URL: github.com/phusion/baseimage-docker
#		VERSION-INFO: github.com/phusion/baseimage-docker/blob/master/Changelog.md
# -------------------------------------------------------------------------------------------------

FROM phusion/baseimage:latest
MAINTAINER Ernst <ErnstSalzmann@gmail.com>

# -------------------------------------------------------------------------------------------------
# Set correct environment variables.
# -------------------------------------------------------------------------------------------------

ENV HOME /root

# -------------------------------------------------------------------------------------------------
# Regenerate SSH host keys. baseimage-docker does not contain any, so you
# have to do that yourself. You may also comment out this instruction; the
# init system will auto-generate one during boot.
# -------------------------------------------------------------------------------------------------

RUN /etc/my_init.d/00_regen_ssh_host_keys.sh

# -------------------------------------------------------------------------------------------------
# Use baseimage-docker's init process.
# -------------------------------------------------------------------------------------------------

CMD ["/sbin/my_init"]

# -------------------------------------------------------------------------------------------------
# expose port 80 and 433
# -------------------------------------------------------------------------------------------------

EXPOSE 80 443

# -------------------------------------------------------------------------------------------------
# Define working directory.
# -------------------------------------------------------------------------------------------------

WORKDIR /root

# -------------------------------------------------------------------------------------------------
# Define mountable directories.
# -------------------------------------------------------------------------------------------------

# VOLUME ["/data"]

# -------------------------------------------------------------------------------------------------
# Adding your web app to the image
#		URL: github.com/phusion/passenger-docker#adding_web_app
# -------------------------------------------------------------------------------------------------

# ADD config/webapp.conf /etc/nginx/sites-enabled/webapp.conf
# RUN mkdir /home/app/webapp
# ADD <src> /home/app/webapp

# -------------------------------------------------------------------------------------------------
# Nginx and Passenger are disabled by default. 
# 	Enable them using:
# -------------------------------------------------------------------------------------------------

# RUN rm -f /etc/service/nginx/down

# -------------------------------------------------------------------------------------------------
# Configuring Nginx
# 	URL: github.com/phusion/passenger-docker#configuring_nginx
# -------------------------------------------------------------------------------------------------

# ADD config/secret_key.conf /etc/nginx/main.d/secret_key.conf
# ADD config/gzip_max.conf /etc/nginx/conf.d/gzip_max.conf

# -------------------------------------------------------------------------------------------------
# Setting environment variables in Nginx
#		URL: github.com/phusion/passenger-docker#nginx_env_vars
# -------------------------------------------------------------------------------------------------

# ADD config/<FILENAME>-env.conf /etc/nginx/main.d/<FILENAME>-env.conf

# -------------------------------------------------------------------------------------------------
# Running scripts during container startup
# 	URL: github.com/phusion/passenger-docker#running_startup_scripts
# -------------------------------------------------------------------------------------------------

# RUN mkdir -p /etc/my_init.d
# ADD logtime.sh /etc/my_init.d/logtime.sh

# -------------------------------------------------------------------------------------------------
# Using your own key, Install an SSH of your choice.
#		URL: github.com/phusion/passenger-docker#using_your_own_key
# -------------------------------------------------------------------------------------------------

# ADD <YOUR_KEY> /tmp/<YOUR_KEY>
# RUN cat /tmp/<YOUR_KEY> >> /root/.ssh/authorized_keys && rm -f /tmp/<YOUR_KEY>

# -------------------------------------------------------------------------------------------------
# Clean up APT when done.
# -------------------------------------------------------------------------------------------------

# RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# -------------------------------------------------------------------------------------------------
# Finally, define an Entry Point
# -------------------------------------------------------------------------------------------------

# ENTRYPOINT --rm -t -i phusion/baseimage bash -l

# -------------------------------------------------------------------------------------------------
# END
# -------------------------------------------------------------------------------------------------
