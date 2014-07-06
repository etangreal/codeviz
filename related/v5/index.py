
import sys
sys.path.insert(0,"OPT")
import webapp2
import pg_logger
import json
import jinja2, os

# TODO: this croaks for some reason ...
TEST_STR = "import os\nos.chdir('/')"

JINJA_ENVIRONMENT = jinja2.Environment(loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

class IndexPage(webapp2.RequestHandler):
  def get(self):
    self.response.headers['Content-Type'] = 'text/html'
    template = JINJA_ENVIRONMENT.get_template('index.html')
    self.response.out.write(template.render())

class TestPage( webapp2.RequestHandler ):
  def get(self):
    self.response.headers['Content-Type'] = 'text/html'
    template = JINJA_ENVIRONMENT.get_template('test.html')
    self.response.out.write( template.render() )

class ExecScript(webapp2.RequestHandler):

  def json_finalizer(self, input_code, output_trace):
    ret = dict(code=input_code, trace=output_trace)
    json_output = json.dumps(ret, indent=None) # use indent=None for most compact repr
    self.response.out.write(json_output)

  def get(self):
    self.response.headers['Content-Type'] = 'application/json'
    self.response.headers['Cache-Control'] = 'no-cache'

    pg_logger.exec_script_str(self.request.get('user_script'),
                              self.request.get('raw_input_json'),
                              self.request.get('options_json'),
                              self.json_finalizer)

app = webapp2.WSGIApplication([
          ('/', IndexPage),
          ('/test', TestPage),
          ('/exec', ExecScript)]
          , debug=True)

