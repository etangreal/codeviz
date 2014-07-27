
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

import P25 as P
import PrettyPrinter as PP

from AstExt import *

# -------------------------------------------------------------------------------------------------
# GLOBALS
# -------------------------------------------------------------------------------------------------


# -------------------------------------------------------------------------------------------------
# CLASS UNPARSER
# -------------------------------------------------------------------------------------------------

class Unparser:

	#tbc -> tab count
	tbc = -1

	#v -> verbose
	v = False

	#g -> generator (for ne temporary variable)
	g = None

	#start_label -> current function's starting label
	start_label = ""

	#end_label -> current function's ending label
	end_label = ""

	# ---------------------------------------------------------------------------------------------

	#v -> verbose
	def __init__(self,generator, verbose=False):

		self.g = generator
		self.v = verbose

	# ---------------------------------------------------------------------------------------------

	# n -> node
	# v -> temp variable used by the current assign statment
	def unparse(self,n,v=None):

		#---------------------------------------------------------------

		if isinstance(n, Module):

			return self.unparse(n.node,v)

		#---------------------------------------------------------------

		elif isinstance(n, Stmt):

			self.tbc += +1

			s = []
			for nd in n:
				o = self.unparse(nd,v)
				o.tbc = self.tbc
				s.append(o)

			self.tbc += -1

			return P.Stmt(s)

		#---------------------------------------------------------------

		elif isinstance(n, Assign):

			v = self.unparse(n.nodes[0],v);
			O = self.unparse(n.expr,v);

			if isinstance(n.expr,Const) or isinstance(n.expr,Name) or isinstance(n.expr,String):
				return P.Assign( P.Name(v,self.start_label),O )

			return O

		#---------------------------------------------------------------
		
		elif isinstance(n, UnarySub):

			e = self.unparse(n.expr,v)

			return P.UnarySub( P.Name(v),e )

		#---------------------------------------------------------------

		elif isinstance(n, UnaryAdd):

			e = self.unparse(n.expr,v)

			return P.UnaryAdd( P.Name(v),e )

		#---------------------------------------------------------------

		elif isinstance(n, Invert):
			
			e = self.unparse(n.expr,v)

			return P.Invert( P.Name(v),e )

		#---------------------------------------------------------------

		elif isinstance(n, Mul):

			l = self.unparse(n.left,v)
			r = self.unparse(n.right,v)

			return P.Mul( P.Name(v),l,r )

		#---------------------------------------------------------------

		elif isinstance(n, Div):

			l = self.unparse(n.left,v)
			r = self.unparse(n.right,v)

			return P.Div( P.Name(v),l,r )
		
		#---------------------------------------------------------------

		elif isinstance(n, Add):

			l = self.unparse(n.left,v)
			r = self.unparse(n.right,v)
			
			return P.Add( P.Name(v),l,r)

		#---------------------------------------------------------------

		elif isinstance(n, Sub):

			l = self.unparse(n.left,v)
			r = self.unparse(n.right,v)

			return P.Sub( P.Name(v),l,r )

		#---------------------------------------------------------------

		elif isinstance(n, Or):

			n0 = self.unparse(n.nodes[0],v)
			n1 = self.unparse(n.nodes[1],v)

			return P.Or( P.Name(v),n0,n1 )

		#---------------------------------------------------------------

		elif isinstance(n, And):

			n0 = self.unparse(n.nodes[0],v)
			n1 = self.unparse(n.nodes[1],v)

			return P.And( P.Name(v),n0,n1 )

		#---------------------------------------------------------------

		elif isinstance(n, Printnl):
			
			p = self.unparse(n.nodes[0],v)

			return P.Printnl(p)

		#---------------------------------------------------------------
		# name, flags, lineno=None

		elif isinstance(n, AssName):

			return n.name

		#---------------------------------------------------------------

		elif isinstance(n, Name):

			return P.Name(n.name,self.start_label)
			# return str(n.name)

		#---------------------------------------------------------------

		elif isinstance(n, String):

			return P.String(n.value,self.start_label)
			# return str(n.value)

		#---------------------------------------------------------------

		elif isinstance(n, Const):

			return P.Const(n.value)
			# return str(n.value)

		#---------------------------------------------------------------

		elif isinstance(n, Not):

			nt = self.unparse(n.expr,v)

			# print nt
			# print v

			return P.Not( P.Name(v),nt )

		#---------------------------------------------------------------	

		elif isinstance(n, Compare):

			e1 	= self.unparse(n.expr,v)
			o 	= n.ops[0][0]
			e2 	= self.unparse(n.ops[0][1],v)

			return P.Compare( P.Name(v),e1,o,e2 )

		#---------------------------------------------------------------
		# If -> tests, else_, lineno = None
		#	If -> [ (conditions, statments), ... ], else_ )
		#	tests -> [ 'if'(c,st), 'elif'(c,st), 'elif'(c,st), ... ]

		elif isinstance(n, If):

			(c,l) = n.tests[0]

			c = self.unparse(c,v)
			l = self.unparse(l,v)

			return P.If(c,l)

		#---------------------------------------------------------------

		elif isinstance(n, While):

			c = n.test
			l = n.body

			c = self.unparse(c,v)
			l = self.unparse(l,v)

			return P.While(c,l,None)

		#---------------------------------------------------------------

		elif isinstance(n, Label):

			return P.Label(n.name)

		#---------------------------------------------------------------

		elif isinstance(n, Goto):

			return P.Goto(n.label)

		#---------------------------------------------------------------

		# elif isinstance(n, Break):

		# 	return n

		#---------------------------------------------------------------
		# CLASS
		#---------------------------------------------------------------
		# name, bases, doc, code, decorators = None, 

		# elif isinstance(n, Class):

		# 	return P.Ops

		#---------------------------------------------------------------
		# decorators, name, argnames, defaults, flags, doc, code
		
		elif isinstance(n, Function):

			start_label = self.g.tvar()
			end_label = self.g.tvar()
			self.start_label = start_label
			self.end_label = end_label

			stmts = self.unparse(n.code)
			n.name = self.unparse(n.name)

			for i in range(len(n.argnames)):
				n.argnames[i] = self.unparse(n.argnames[i])

			return P.Function(n.name,start_label,end_label,n.argnames,stmts)

		#---------------------------------------------------------------

		elif isinstance(n, Getattr):

			# n.expr = self.unparse(n.expr)
			# n.attrname = self.unparse(n.attrname)
			
			return P.OPs #P.Getattr(n.expr,n.attrname)

		#---------------------------------------------------------------

		elif isinstance(n, AssAttr):
			
			return P.Ops

		#---------------------------------------------------------------
		# value

		elif isinstance(n, Return):

			n.value = self.unparse(n.value)

			return P.Return(n.value,self.end_label)

		#---------------------------------------------------------------
		# node, args, star_args = None, dstar_args = None

		elif isinstance(n, CallFunc):

			func = self.unparse(n.node)

			args = []
			for a in n.args:
				args.append(self.unparse(a))

			return P.CallFunc( P.Name(v) ,func,args )

		#---------------------------------------------------------------

		elif isinstance(n, Discard):

			n.expr = self.unparse(n.expr,v)

			return P.Discard( n.expr )

	    #---------------------------------------------------------------

		else: 
			print "UP-ERROR: unknow node...."
			print n
			quit()

# -------------------------------------------------------------------------------------------------
# TEST FLATTENED CODE
# -------------------------------------------------------------------------------------------------

def unparse(ast, gen):

	return Unparser(gen).unparse(ast)

# -------------------------------------------------------------------------------------------------
# END OF FILE
# -------------------------------------------------------------------------------------------------

