#!/bin/bash

# Startup:
#	1) ZeroRPC server
#	2) Meteor server

cd backend
echo "Starting ZeroRPC Backend Server ..."
nohup python zrpc-opt-srv.py > zrpc.log 2>&1 &
echo $! > pid.log

cd ../src
echo "Starting Meteor Server ..."
nohup mrt > mrt.log 2>&1 &
echo $! > pid.log

`ps`