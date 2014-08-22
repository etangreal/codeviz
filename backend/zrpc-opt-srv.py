
# ----------------------------------------------------------------------------------------------------------------------
# ZERO-RPC
#
#  ARTICLE: Communicating between node.js and Python
#      URL:  ianhinsdale.com/code/2013/12/08/communicating-between-nodejs-and-python
#      URL: zerorpc.dotcloud.com
#
#  ARTICLE: Complete NPM integration for Meteor  
#      URL:  meteorhacks.com/complete-npm-integration-for-meteor.html
#
#  <ALTERNATIVE>
#    TITLE: Child Process
#      URL:  nodejs.org/api/child_process.html
# ----------------------------------------------------------------------------------------------------------------------

# ----------------------------------------------------------------------------------------------------------------------
# IMPORTS
# ----------------------------------------------------------------------------------------------------------------------

# general
import sys
from multiprocessing import Process, Pipe

#insert OPT directory into the path
sys.path.insert(0,"OPT")

#python tutor dependancies
import pg_logger
import json

#RPC Server
import zerorpc
# import gevent

#turn on zerorpc logging
import logging
logging.basicConfig()

# ----------------------------------------------------------------------------------------------------------------------
# CLASS PIPE-TO-STDOUT
# ----------------------------------------------------------------------------------------------------------------------

class WrapperPipeToStdout(object):

    def __init__(self, pipe):
        self.pipe = pipe

    def write(self, string):
        self.pipe.send(string)

    def flush(self):
        return None

# ----------------------------------------------------------------------------------------------------------------------
# FUNCTIONS
# ----------------------------------------------------------------------------------------------------------------------

def exec_script_str(user_script, raw_input_json, options_json, pipe):
    sys.stdout = WrapperPipeToStdout(pipe)
    pg_logger.exec_script_str(user_script, raw_input_json, options_json, json_finalizer)

# ----------------------------------------------------------------------------------------------------------------------

def json_finalizer(input_code, output_trace):

  ret = dict(code=input_code, trace=output_trace)
  ret = json.dumps(ret, indent=None) # use indent=None for most compact repr
  sys.stdout.write(ret)

# ----------------------------------------------------------------------------------------------------------------------
# RPC-SERVICE
# ----------------------------------------------------------------------------------------------------------------------

class OptService(object):

  #@zerorpc.stream
  def execute_code(self, user_script, raw_input_json, options_json):

    pipeParent, pipeChild = Pipe()
    args = ( user_script, raw_input_json, options_json, pipeChild )

    process = Process(target = exec_script_str, args = args)
    process.start()
    ret = pipeParent.recv()
    process.join()

    return ret

# ----------------------------------------------------------------------------------------------------------------------
# SERVER
# ----------------------------------------------------------------------------------------------------------------------

srv = zerorpc.Server( OptService() )
srv.bind("tcp://0.0.0.0:4242")
srv.run()

# ----------------------------------------------------------------------------------------------------------------------
# END
# ----------------------------------------------------------------------------------------------------------------------
