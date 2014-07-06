
# -------------------------------------------------------------------------------------------------
# 
# Authors: E.Salzmann & F.Chegini
# Date: 2012-12-06
#
# -------------------------------------------------------------------------------------------------

# -------------------------------------------------------------------------------------------------
# IMPORTS
# -------------------------------------------------------------------------------------------------

from compiler import parse, parseFile
from compiler.ast import *

import Logger as L

# -------------------------------------------------------------------------------------------------
# CLASS DECLASSIFY
# -------------------------------------------------------------------------------------------------

class Declassify:

	#f -> verbose
	v = False

	#log -> logger for declassify info
	l = None

	# ---------------------------------------------------------------------------------------------

	def __init__(self,filename="declassify.log",verbose=False):

		self.v = verbose
		self.l = L.Logger(filename)

	# ---------------------------------------------------------------------------------------------

	def log(self,line):
		self.l.write(line)

	# ---------------------------------------------------------------------------------------------

	def notate(self,n,d):

		if (not self.v): return

		t = ""
		for i in range(0,d): t = t + "\t"

		self.l.write("__________________________________________________________________________________________________________")
		self.l.write( t+str(n) )

	# ---------------------------------------------------------------------------------------------

	# n -> node
	# d -> depth (of current recurrsion)
	def declassify(self,n,d):

		self.notate(n,d)
		d += 1

		#---------------------------------------------------------------

		if isinstance(n, Module):

			return Module(None, self.declassify(n.node,d))

		#---------------------------------------------------------------

		elif isinstance(n, Stmt):

			return Stmt([self.declassify(nn,d) for nn in n])

		#---------------------------------------------------------------
		# nodes, expr

		elif isinstance(n, Assign):

			# v = self.declassify(n.nodes[0],d);
			# e = self.declassify(n.expr,d);

			return n

		#---------------------------------------------------------------

		elif isinstance(n, UnarySub):

			# l = self.declassify(n.expr,d)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, UnaryAdd):

			# l = self.declassify(n.expr,d)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Invert):
			
			# l = self.declassify(n.expr,d)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Mul):

			# l = self.declassify(n.left,d)
			# r = self.declassify(n.right,d)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Div):

			# l = self.declassify(n.left,d)
			# r = self.declassify(n.right,d)

			return n
		
		#---------------------------------------------------------------

		elif isinstance(n, Add):

			# l = self.declassify(n.left,d)
			# r = self.declassify(n.right,d)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Sub):

			# l = self.declassify(n.left,d)
			# r = self.declassify(n.right,d)

			return n

		#---------------------------------------------------------------	

		elif isinstance(n, Or):

			return n

		#---------------------------------------------------------------

		elif isinstance(n, And):
		
			return n

		#---------------------------------------------------------------

		elif isinstance(n, Not):

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Compare):

			# e = self.declassify(n.expr,d)
			# o = self.declassify(n.ops[0][1],d)
			
			return n

		#---------------------------------------------------------------

		elif isinstance(n, AssName):

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Name):

			return n
			
		#---------------------------------------------------------------

		elif isinstance(n, Const):

			return n

		#---------------------------------------------------------------

		elif isinstance(n, CallFunc):

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Printnl):

			# self.declassify(n.nodes[0],d)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, If):

			# for i in range(len(n.tests)):
			# 	for j in range(len(n.tests[i])):
			# 		t = self.declassify(n.tests[i][j],d)

			# if(n.else_ != None):
			# 	self.declassify(n.else_,d)

			return n


		#---------------------------------------------------------------

		elif isinstance(n, While):

			# for i in range(len(n.tests)):
			# 	for j in range(len(n.tests[i])):
			# 		t = self.declassify(n.tests[i][j],d)

			# if(n.else_ != None):
			# 	self.declassify(n.else_,d)

			return n

		#---------------------------------------------------------------
		# Class ( name, bases, doc, code, decorators = None )

		elif isinstance(n, Class):
			
			return n

		#---------------------------------------------------------------
		# Function( decorators, name, argnames, defaults, flags, doc, code )

		elif isinstance(n, Function):

			return n

		#---------------------------------------------------------------
		# Gettattr ( expr, attrname )

		elif isinstance(n, Getattr):
			
			return n

		#---------------------------------------------------------------
		# AssAttr( expr, attrname, flags )

		elif isinstance(n, AssAttr):

			return n

		#---------------------------------------------------------------
		# CallFunc( node, args, star_args = None, dstar_args = None )

		elif isinstance(n, CallFunc):
			
			return n

		#---------------------------------------------------------------
		# Return( value )

		elif isinstance(n, Return):

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Discard):

			#self.declassify(n.nodes[0],d)

			return 

		#---------------------------------------------------------------

		else: 
			print "Error: Declassify"
			quit()

# -------------------------------------------------------------------------------------------------
# END OF FILE
# -------------------------------------------------------------------------------------------------
