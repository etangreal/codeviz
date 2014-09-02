#!/bin/bash

# Shutdown:
#	1) ZeroRPC server
#	2) Meteor server

cd backend
echo "Shutdown ZeroRPC Backend Server ..."
kill -9 `cat pid.log`
#echo '' > zrpc.log
echo '' > pid.log

cd ../src
echo "Shutdown Meteor Server ..."
kill -9 `cat pid.log`
echo '' > pid.log

ps