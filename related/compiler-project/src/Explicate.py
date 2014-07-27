
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

# -------------------------------------------------------------------------------------------------
# CLASS EXPLICATE
# -------------------------------------------------------------------------------------------------

class Explicate:

	#v -> verbose
	v = False

	#l -> logger for explicate notate info
	l = None

	# ---------------------------------------------------------------------------------------------

	def __init__(self,verbose=False):

		self.v = verbose

		self.l = L.Logger("Explicate.log")		

	# ---------------------------------------------------------------------------------------------

	def log(self,line):

		self.l.write(line)

	# ---------------------------------------------------------------------------------------------

	# n -> node
	# s -> statements of current branch
	# d -> depth of current recurrsion
	def explicate(self,n):

		#---------------------------------------------------------------

		if isinstance(n, Module):

			st = self.explicate(n.node)
			m = Module(None,st)

			return m

		#---------------------------------------------------------------

		elif isinstance(n, Stmt):

			return Stmt([self.explicate(n) for n in n.nodes])

		#---------------------------------------------------------------

		elif isinstance(n, Assign):
			
			n.expr = self.explicate(n.expr)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, UnarySub):

			n.expr = self.explicate(n.expr)
			return CallFunc( String("create_int"),[UnarySub(CallFunc(String("project_int"), [n.expr]))])

		#---------------------------------------------------------------

		elif isinstance(n, UnaryAdd):

			n.expr = self.explicate(n.expr)
			return CallFunc( String("create_int"),[UnaryAdd(CallFunc(String("project_int"), [n.expr]))])

		#---------------------------------------------------------------

		elif isinstance(n, Invert):

			n.expr = self.explicate(n.expr)
			return CallFunc( String("create_int"),[Invert(CallFunc(String("project_int"), [n.expr]))])

		#---------------------------------------------------------------

		elif isinstance(n, Mul):

			n.left = self.explicate(n.left)
			n.right = self.explicate(n.right)

			f = CallFunc( String("create_int"),[ Mul((
					CallFunc(String("project_int"), [n.left]), 
					CallFunc(String("project_int"), [n.right]) ))
				])

			return f

		#---------------------------------------------------------------

		elif isinstance(n, Div):

			n.left = self.explicate(n.left)
			n.right = self.explicate(n.right)

			f = CallFunc( String("create_int"),[ Div((
					CallFunc(String("project_int"), [n.left]), 
					CallFunc(String("project_int"), [n.right]) ))
				])

			return f

		#---------------------------------------------------------------

		elif isinstance(n, Add):

			n.left = self.explicate(n.left)
			n.right = self.explicate(n.right)

			f = CallFunc( String("create_int"),[ Add((
					CallFunc(String("project_int"), [n.left]), 
					CallFunc(String("project_int"), [n.right]) ))
				])

			return f

	    #---------------------------------------------------------------

		elif isinstance(n, Sub):

			n.left = self.explicate(n.left)
			n.right = self.explicate(n.right)

			f = CallFunc( String("create_int"),[ Sub((
					CallFunc(String("project_int"), [n.left]), 
					CallFunc(String("project_int"), [n.right]) ))
				])

			return f

		#---------------------------------------------------------------

		elif isinstance(n, Or):

			for i in range(len(n.nodes)):
				n.nodes[i] = CallFunc(String("project_bool"), [self.explicate(n.nodes[i])])

			return CallFunc( String("create_bool"),[Or(n.nodes)])

		#---------------------------------------------------------------

		elif isinstance(n, And):

			for i in range(len(n.nodes)):
				n.nodes[i] = CallFunc(String("project_bool"), [self.explicate(n.nodes[i])])

			return CallFunc( String("create_bool"),[And(n.nodes)])

		#---------------------------------------------------------------

		elif isinstance(n, Not):

			return CallFunc( String("create_bool"), [Not( CallFunc( String("project_bool"), [self.explicate(n.expr)] ) )] )

		#---------------------------------------------------------------

		elif isinstance(n, Compare):

			e1 = self.explicate(n.expr)
			co = n.ops[0][0]
			e2 = self.explicate(n.ops[0][1])

			return CallFunc( String("create_bool"),[Compare( 
					CallFunc( String("project_int"), [e1]),
					[(co, CallFunc( String("project_int"), [e2]))])
				])

		#---------------------------------------------------------------

		elif isinstance(n, If):

			for i in range(len(n.tests)):
				c = self.explicate(n.tests[i][0])
				c = CallFunc( String("project_int"), [c] )
				st = self.explicate(n.tests[i][1])

				n.tests[i]=(c,st)
				
			if (not n.else_ == None):
				st = self.explicate(n.else_)
				n.else_ = st

			return n

		#---------------------------------------------------------------

		elif isinstance(n, While):

			c = self.explicate(n.test)
			n.test =  CallFunc( String("project_int"), [c] )
			n.body = self.explicate(n.body)

			if (not n.else_ == None):
				n.else_ = self.explicate(n.else_)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Break):

			return n

		#---------------------------------------------------------------
		# Class ( name, bases, doc, code, decorators = None )

		elif isinstance(n, Class):

			return n

		#---------------------------------------------------------------
		# Function ( decorators, name, argnames, defaults, flags, doc, code )

		elif isinstance(n, Function):
			n.code = self.explicate(n.code)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Getattr):

			return n

		#---------------------------------------------------------------
		# AssAttr( expr, attrname, flags )

		elif isinstance(n, AssAttr):

			n.attrname = self.explicate(n.attrname)
			return n

		#---------------------------------------------------------------

		elif isinstance(n, Const):

			if str(n.value).isdigit():
				return CallFunc( String("create_int"), [n])

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Name):

			if (n.name == "False"):
				return CallFunc( String("create_bool"), [Const(0)])

			elif (n.name == "True"):
				return CallFunc( String("create_bool"), [Const(1)])

			# elif (n.name == "create_bool" or "create_int" or "project_int" or "project_bool"): 
			# 	return n

			# elif (n.name == "input"):
			# 	return n

			return n #CallFunc(String("create_int"), [n.name])

		#---------------------------------------------------------------
		
		elif isinstance(n, String):

			return n

		#---------------------------------------------------------------

		elif isinstance(n, AssName):

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Printnl):

			if not len(n.nodes): 
				print "T.py:Printnl:ERROR: No argument given."

			return Printnl( [CallFunc(String("project_int"), [self.explicate(n.nodes[0])])], None )

		#---------------------------------------------------------------

		elif isinstance(n, CallFunc):

			nm = self.explicate(n.node)	

			if (nm.name == "input"):
				return CallFunc( String("create_int"), [CallFunc(String('input'), [], None, None)] )
			
			# for i in range(len(n.args)):
			# 	n.args[i] = self.explicate(n.args[i])

			return n

		#---------------------------------------------------------------
		# Return( value )

		elif isinstance(n, Return):

			n.value = self.explicate(n.value)

			return n

		#---------------------------------------------------------------
		# expr, lineno=None

		elif isinstance(n, Discard):
			
			n.expr = self.explicate(n.expr)

			return n			

		#---------------------------------------------------------------

		else:
			raise Exception('Error in self.explicate: unrecognized AST node')

# -------------------------------------------------------------------------------------------------
# END OF FILE
# -------------------------------------------------------------------------------------------------

