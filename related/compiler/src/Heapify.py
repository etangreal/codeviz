
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

from AstExt import *

import Logger as L
import PrettyPrinter as PP

# -------------------------------------------------------------------------------------------------
# CLASS heapify
# -------------------------------------------------------------------------------------------------

class Heapify:

	#f -> verbose
	v = False

	#log -> logger for heapify info
	l = None

	#sfl -> setup function list
	sfl = []

	#cl -> class list
	cl = list()

	# ---------------------------------------------------------------------------------------------

	def __init__(self,filename="heapify.log",verbose=False):

		self.v = verbose
		self.l = L.Logger(filename)

	# ---------------------------------------------------------------------------------------------

	def log(self,line):
		self.l.write(line)

	# ---------------------------------------------------------------------------------------------

	def isClass(self,cls):
		return cls in self.cl

	# ---------------------------------------------------------------------------------------------

	def addClass(self,cls):

		if self.isClass(cls): return

		self.cl.append(self.cl)

	# ---------------------------------------------------------------------------------------------

	# n -> node
	# v -> variable/expression assignment
	def heapify(self,n,s=[],v=None):

		#---------------------------------------------------------------

		if isinstance(n, Module):

			return Module(None, self.heapify(n.node,s,v))

		#---------------------------------------------------------------

		elif isinstance(n, Stmt):

			return Stmt([self.heapify(nn,s,v) for nn in n])

		#---------------------------------------------------------------

		elif isinstance(n, UnarySub):

			n.expr = self.heapify(n.expr,s,v)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, UnaryAdd):

			n.expr = self.heapify(n.expr,s,v)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, String):

			return n
			
		#---------------------------------------------------------------

		elif isinstance(n, Invert):
			
			n.expr = self.heapify(n.expr,s,v)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Mul):

			n.left = self.heapify(n.left,s,v)
			n.right = self.heapify(n.right,s,v)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Div):

			n.left = self.heapify(n.left,s,v)
			n.right = self.heapify(n.right,s,v)

			return n
		
		#---------------------------------------------------------------

		elif isinstance(n, Add):

			n.left = self.heapify(n.left,s,v)
			n.right = self.heapify(n.right,s,v)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Sub):

			n.left = self.heapify(n.left,s,v)
			n.right = self.heapify(n.right,s,v)

			return n

		#---------------------------------------------------------------	

		elif isinstance(n, Or):

			for i in range(len(n.nodes)):
				n.nodes[i] = self.heapify(n.nodes[i],s,v)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, And):

			for i in range(len(n.nodes)):
				n.nodes[i] = self.heapify(n.nodes[i],s,v)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Not):

			n.expr = self.heapify(n.expr,s,v)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Compare):

			n.expr = self.heapify(n.expr,s,v)
			a  = self.heapify(n.ops[0][1],s,v)
	
			n.ops = [(n.ops[0][0],a)]

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Name):

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Const):

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Printnl):

			n.nodes[0] = self.heapify(n.nodes[0],v)

			return n

		#---------------------------------------------------------------
		# nodes, expr

		elif isinstance(n, Assign):

			e = self.heapify(n.expr,s,v);
			a = self.heapify(n.nodes[0],s,e);
			n.expr = e
			n.nodes[0] = a

			if isinstance(a,CallFunc): n = a

			return n

		#---------------------------------------------------------------
		# name, flags

		elif isinstance(n, AssName):

			return n

		#---------------------------------------------------------------

		elif isinstance(n, If):

			for i in range(len(n.tests)):

				a = self.heapify(n.tests[i][0],s,v)
				b = self.heapify(n.tests[i][1],s,v)
				n.tests[i] = (a,b)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, While):

			n.test = self.heapify(n.test,s,v)
			n.body = self.heapify(n.body,[],v)

			return n

		#---------------------------------------------------------------
		# Class ( name, bases, doc, code, decorators = None )

		elif isinstance(n, Class):
			
			print "heapify.py ERROR: should not be necessary to visit a Class node at this stage."
			quit()

			return n

		#---------------------------------------------------------------
		# Function( decorators, name, argnames, defaults, flags, doc, code )

		elif isinstance(n, Function):

			sl = []
			c = self.heapify(n.code,sl,v)
			n.code = Stmt(sl + c.nodes)

			return n

		#---------------------------------------------------------------
		# node, args, star_args = None, dstar_args = None
		
		elif isinstance(n, CallFunc):


			n.node = self.heapify(n.node,v)
			sl = []
			for i in range(len(n.args)):
				
				n.args[i] = self.heapify(n.args[i],sl,v)

			return n

		#---------------------------------------------------------------
		# Gettattr ( expr, attrname )

		elif isinstance(n, Getattr):
		
			return CallFunc(String("get_attr"), [n.expr, n.attrname])

		#---------------------------------------------------------------
		# AssAttr( expr, attrname, flags )

		elif isinstance(n, AssAttr):
		
			return CallFunc(String("set_attr"), [n.expr, n.attrname, v])

		#---------------------------------------------------------------
		# Return( value )

		elif isinstance(n, Return):

			n.value = self.heapify(n.value,v)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Discard):
			
			n.expr = self.heapify(n.expr,v)
			
			return n

		#---------------------------------------------------------------

		else:
			print "Error: heapify"
			quit()

# -------------------------------------------------------------------------------------------------
# END OF FILE
# -------------------------------------------------------------------------------------------------
