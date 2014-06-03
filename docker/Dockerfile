FROM phusion/passenger-full:latest
MAINTAINER Ernst <ErnstSalzmann@gmail.com>

# Set correct environment variables.
ENV HOME /root

# Use baseimage-docker's init process.
CMD ["/sbin/my_init"]

# expose port 80 and 433
EXPOSE 80 443

# ADD config/webapp.conf /etc/nginx/sites-enabled/webapp.conf
# RUN mkdir /home/app/webapp
# RUN ...commands to place your web app in /home/app/webapp...

# RUN rm -f /etc/service/nginx/down

# ADD config/secret_key.conf /etc/nginx/main.d/secret_key.conf
# ADD config/gzip_max.conf /etc/nginx/conf.d/gzip_max.conf

# ENTRYPOINT --rm -t -i phusion/passenger-full bash -l