
import re

class Generator:

	counter = 0
	excluded = []

	#------------------------------------------------------------------

	def __init__(self,counter,excluded):

		self.counter = counter
		self.excluded = excluded

	#------------------------------------------------------------------

	def find_excluded_variables(self,input):

	    input = str(input)

	    expr = ur'(Name\(\'.*?\')+'
	    mtch = re.findall( expr, input )
	    self.excluded = [ x[6:-1] for x in mtch ]

	    return self.excluded

	#------------------------------------------------------------------

	def tvar(self):

	    isFound = True
	    while isFound:
	        isFound = False

	        self.counter += 1
	        var = "t" + str(self.counter)

	        for x in self.excluded:
	            if( var == x ):
	                isFound = True

	    return var

	#------------------------------------------------------------------


