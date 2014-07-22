
# -------------------------------------------------------------------------------------------------
# IMPORTS
# -------------------------------------------------------------------------------------------------

# general
import sys
import os

#insert OPT into the path
sys.path.insert(0,"OPT")

#python tutor dependancies
import pg_logger
import json

# -------------------------------------------------------------------------------------------------
# RPC-OBJECT
# -------------------------------------------------------------------------------------------------

class PythonTutorBackend(object):

  user_script = 'print "hello world!"'
  raw_input_json = ''
  options_json = '{"py_crazy_mode":false,"cumulative_mode":false,"heap_primitives":false,"show_only_outputs":false,"origin":"index.js"}'
  json_output = ''

  # -----------------------------------------------------------------------------------------------

  def test(self):
    print 'test'

  # -----------------------------------------------------------------------------------------------

  def json_finalizer(self, input_code, output_trace):

    ret = dict(code=input_code, trace=output_trace)
    self.json_output = json.dumps(ret, indent=None) # use indent=None for most compact repr

  # -----------------------------------------------------------------------------------------------

  def execute_code(self, user_script, raw_input_json, options_json):

    print 'execting code ...'
    print '--------------------------------------------------------------------------------'
    print 'user_script: ', user_script
    print 'raw_input_json: ', raw_input_json
    print 'options_json: ', options_json
    print '--------------------------------------------------------------------------------'

    pg_logger.exec_script_str(
      user_script,
      raw_input_json,
      options_json,
      self.json_finalizer)

    print 'json_output: ', self.json_output
    print '--------------------------------------------------------------------------------'

# -------------------------------------------------------------------------------------------------
# SERVER
# -------------------------------------------------------------------------------------------------

optb = PythonTutorBackend()

optb.execute_code(
  optb.user_script,
  optb.raw_input_json,
  optb.options_json)

# -------------------------------------------------------------------------------------------------
# END
# -------------------------------------------------------------------------------------------------
