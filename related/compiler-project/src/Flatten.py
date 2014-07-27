
# -------------------------------------------------------------------------------------------------
# 
# Authors: Salzmann & F.Chegini
# Date: 2012-12-06
#
# -------------------------------------------------------------------------------------------------

# -------------------------------------------------------------------------------------------------
# IMPORTS
# -------------------------------------------------------------------------------------------------

from compiler import parse, parseFile
from compiler.ast import *


import Logger as L
import PrettyPrinter as PP
from AstExt import *

# -------------------------------------------------------------------------------------------------
# CLASS FLATTEN
# -------------------------------------------------------------------------------------------------

class Flatten:

	# ---------------------------------------------------------------------------------------------

	#g -> variable generator, used for creating tempory variable names
	g = None

	#v -> verbose
	v = False

	#l -> logger for flatten dump info
	l = None

	# ---------------------------------------------------------------------------------------------

	def __init__(self,stmts,generator,verbose=False):

		self.s = stmts
		self.g = generator
		self.v = verbose

		self.l = L.Logger("flatten.log")		

	# ---------------------------------------------------------------------------------------------

	def log(self,line):

		self.l.write(line)

	# ---------------------------------------------------------------------------------------------

	# n -> node
	# s -> statements of current branch
	# d -> depth of current recurrsion
	def flatten(self,n,s=[],d=None):

		#---------------------------------------------------------------

		if isinstance(n, Module):

			st = self.flatten(n.node,s,d)
			m = Module(None,st)

			return m

		#---------------------------------------------------------------

		elif isinstance(n, Stmt):

			#Stmt(filter(lambda n: self.flatten(n, d) != None, n.nodes))

			s = []
			for nd in n.nodes:
				
				o = self.flatten(nd,s,d)
				if (not isinstance(o,Name)):
					s.append(o)

			return Stmt(s)

		#---------------------------------------------------------------

		elif isinstance(n, Assign):

			n.nodes[0] = self.flatten(n.nodes[0],s,d)
			n.expr = self.flatten(n.expr,s,d)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, UnarySub):

			e = self.flatten(n.expr,s,d)

			t = self.g.tvar()
			a = Assign([AssName(t,'OP_ASSIGN')], UnarySub(e) )
			s.append(a)

			return Name(t)

		#---------------------------------------------------------------

		elif isinstance(n, UnaryAdd):

			e = self.flatten(n.expr,s,d)

			return e

		#---------------------------------------------------------------

		elif isinstance(n, Invert):
			
			e = self.flatten(n.expr,s,d)

			t = self.g.tvar()
			a = Assign([AssName(t,'OP_ASSIGN')], Invert(e) )
			s.append(a)

			return Name(t)

		#---------------------------------------------------------------

		elif isinstance(n, Mul):

			l = self.flatten(n.left,s,d)
			r = self.flatten(n.right,s,d)

			t = self.g.tvar()
			a = Assign([AssName(t,'OP_ASSIGN')], Mul((l, r)) )
			s.append(a)

			return Name(t)

		#---------------------------------------------------------------

		elif isinstance(n, Div):

			l = self.flatten(n.left,s,d)
			r = self.flatten(n.right,s,d)

			t = self.g.tvar()
			a = Assign([AssName(t,'OP_ASSIGN')], Div((l, r)) )
			s.append(a)

			return Name(t)

		#---------------------------------------------------------------
		# addition => a_expr ::=  m_expr | a_expr "+" m_expr

		elif isinstance(n, Add):

			l = self.flatten(n.left,s,d)
			r = self.flatten(n.right,s,d)

			t = self.g.tvar()
			a = Assign([AssName(t,'OP_ASSIGN')], Add((l, r)) )
			s.append(a)

			return Name(t)

	    #---------------------------------------------------------------
		# subtraction => a_expr ::=  m_expr | a_expr "-" m_expr

		elif isinstance(n, Sub):

			l = self.flatten(n.left,s,d)
			r = self.flatten(n.right,s,d)

			t = self.g.tvar()
			a = Assign([AssName(t,'OP_ASSIGN')], Sub((l, r)) )
			s.append(a)

			return Name(t)

		#---------------------------------------------------------------

		elif isinstance(n, Or):

			l = self.flatten(n.nodes[0],s,d)
			r = self.flatten(n.nodes[1],s,d)

			t = self.g.tvar()
			a = Assign( [AssName(t,'OP_ASSIGN')], Or([l, r]) )
			s.append(a)

			for nd in n.nodes[2:]:
				c = self.flatten(nd,s,d)

				pt = Name(t)
				t = self.g.tvar()
				a = Assign( [AssName(t,'OP_ASSIGN')], Or([pt, c]) )
				s.append(a)

			return Name(t)

		#---------------------------------------------------------------

		elif isinstance(n, And):

			l = self.flatten(n.nodes[0],s,d)
			r = self.flatten(n.nodes[1],s,d)

			t = self.g.tvar()
			a = Assign( [AssName(t,'OP_ASSIGN')], And([l, r]) )
			s.append(a)

			for nd in n.nodes[2:]:
				c = self.flatten(nd,s,d)

				pt = Name(t)
				t = self.g.tvar()
				a = Assign( [AssName(t,'OP_ASSIGN')], And([pt, c]) )
				s.append(a)

			return Name(t)

		#---------------------------------------------------------------

		elif isinstance(n, Not):

			n.expr = self.flatten(n.expr,s,d)

			t = self.g.tvar()
			a = Assign([AssName(t,'OP_ASSIGN')], n )
			s.append(a)

			return Name(t)

		#---------------------------------------------------------------

		elif isinstance(n, Compare):
			
			e = self.flatten(n.expr,s,d)
			o = self.flatten(n.ops[0][1],s,d)
			
			t = self.g.tvar()
			c = Compare(e,[(n.ops[0][0],o)])
			a = Assign([AssName(t,'OP_ASSIGN')], c )
			s.append(a)

			return Name(t)

		#---------------------------------------------------------------
		# tests, else_, lineno = None
		# 	tests -> [ (conditions, statments), ... ]
		#	else_ -> [ statments ]  ]

		elif isinstance(n, If):

			t = self.g.tvar()
			lend = Label("END_IF_"+t)
			gend = Goto(lend.name)

			for (tst,st) in n.tests:
				t = self.g.tvar()
				lnext 	= Label("NEXT_IF_"+t)
				gnext	= Goto(lnext.name)

				cl = []
				c = self.flatten(tst,cl,d)
				sb = self.flatten(st,[],d)

				f = If( [(c,lnext)], None )

				s.append(cl)
				s.append(f)
				s.append(sb.nodes)
				s.append(gend)
				s.append(lnext)

			# else statements
			if (n.else_ is not None):
				sb = self.flatten(n.else_,[],d)

				s.append(sb.nodes)

			s.append(gend)
			return lend

		#---------------------------------------------------------------

		# i = 0
		# while i < 10:
		# 	i += 1

		# -->

		# i = 0
		# t = i < 10
		# while t:
		# 	i += 1

		# -->

		# i = 0
		# t = i < 10
		# while t:
		# 	i += 1
		# 	t = i < 10

		# -->
		
		# i = 0
		# goto bottom
		# top:
		# i = i + 1
		# bottom:
		# t = i < 10
		# if t: goto top

		# While (test, body, else_)

		elif isinstance(n, While):

			#PP.dump_ast(n)

			t = self.g.tvar()
			ltop = Label("TOP_WHILE_"+t)
			lbot = Label("BOT_WHILE_"+t)
			lend = Label("END_WHILE_"+t)

			gtop = Goto(ltop.name)
			gbot = Goto(lbot.name)
			gend = Goto(lend.name)

			cl = []
			c = self.flatten(n.test,cl,d)
			st = self.flatten(n.body,[],d)

			w = While( c, lend, None )

			s.append(gbot)
			s.append(ltop)
			s.append(w)
			s.append(st.nodes)
			s.append(lbot)
			s.append(cl)
			s.append(gtop)

			# if (n.else_ is not None):				
			# 	st = self.flatten(n.else_,[],d)
			# 	s.append(st)

			s.append(gend)
			return lend

		#---------------------------------------------------------------

		elif isinstance(n, Label):

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Goto):

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Break):

			return n

		#---------------------------------------------------------------
		# name, bases, doc, code, decorators = None

		elif isinstance(n, Class):

			return n

		#---------------------------------------------------------------
		# decorators, name, argnames, defaults, flags, doc, code

		elif isinstance(n, Function):

			n.code = self.flatten(n.code,s,d)

			for i in range(len(n.argnames)):
				# t = self.g.tvar()
				# s.append( Assign([AssName(t,'OP_ASSIGN')], n.argnames[i]) )
				# n.argnames[i] = Name(t)
				n.argnames[i] = self.flatten(n.argnames[i],s,d) 
			
			return n

		#---------------------------------------------------------------
		# node, args, star_args = None, dstar_args = None

		elif isinstance(n, CallFunc):
	
			n.node = self.flatten(n.node,s,d)

			for i in range(len(n.args)):
				n.args[i] = self.flatten(n.args[i],s,d)

			arg = []
			for i in range(len(n.args)):
				t = self.g.tvar()
				s.append( Assign([AssName(t,'OP_ASSIGN')], n.args[i]) )
				arg.append(Name(t))
				#n.args[i] = self.flatten(n.args[i],s,d)

			nn = CallFunc(n.node,arg,None,None)
			t = self.g.tvar()
			a = Assign([AssName(t,'OP_ASSIGN')], nn )
			s.append(a)

			return Name(t)

		#---------------------------------------------------------------

		elif isinstance(n, Getattr):

			return n

		#---------------------------------------------------------------
		# expr, attrname, flags

		elif isinstance(n, AssAttr):

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Return):
		
			n.value = self.flatten(n.value,s,d)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Const):

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Name):

			return n

		#---------------------------------------------------------------

		elif isinstance(n, String):

			return n

		#---------------------------------------------------------------

		elif isinstance(n, AssName):

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Printnl):

			n.nodes[0] = self.flatten(n.nodes[0],s,d)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Discard):


			e = self.flatten(n.expr,s,d)
			t = self.g.tvar()
			a = Assign([AssName(t,'OP_ASSIGN')], e )
			s.append(a)

			return Discard( Name(t) )

		#---------------------------------------------------------------

		elif isinstance(n, Pass):

			return n

		#---------------------------------------------------------------

		else:

			raise Exception('Error in self.flatten: unrecognized AST node')

# -------------------------------------------------------------------------------------------------
# END OF FILE
# -------------------------------------------------------------------------------------------------

