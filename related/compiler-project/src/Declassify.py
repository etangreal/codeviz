
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

import P25 as P
import Logger as L
import PrettyPrinter as PP

# -------------------------------------------------------------------------------------------------
# CLASS DECLASSIFY
# -------------------------------------------------------------------------------------------------

class Declassify:

	#---------------------------------------------------------------

	#f -> verbose
	v = False

	#log -> logger for declassify info
	l = None

	#---------------------------------------------------------------

	#lstClass -> list of Classes (for x86 footer generation)
	lstClass = []

	#lstFunc -> list of Functions (for x86 footer generation)
	lstFunc = []

	#lstAttr -> list of Attributes (for x86 footer generation)
	lstAttr = []

	#---------------------------------------------------------------

	#cls_list -> class list (keep track of class been declared)
	cls_list = list()

	#obj -> objects (keep track of objects created)
	obj_list = list()

	#---------------------------------------------------------------

	#current -> current class
	current = None

	#classes -> list of classes
	classes = []

	#---------------------------------------------------------------

	#body_stmts -> body statements [ stored while processing -> isinstance(n, Stmt): ]
	body_stmts = None

	#func_stmts -> function statements [ stored while processing -> isinstance(n, Stmt): ]
	func_stmts = None

	# ---------------------------------------------------------------------------------------------

	def __init__(self,filename="declassify.log",verbose=False):

		self.v = verbose
		self.l = L.Logger(filename)

	# ---------------------------------------------------------------------------------------------

	# n -> node
	# v -> variable/expression assignment
	def declassify(self,n,s=[],v=None):

		#---------------------------------------------------------------

		if isinstance(n, Module):

			m = self.declassify(n.node,s,v)

			cf_main = Discard( CallFunc( String('start'),[] ))
			fn_main = Function( None, String('start'), [], [], 0, None, Stmt(self.body_stmts) )

			return Module(None, Stmt([cf_main,fn_main] + self.func_stmts) )

		#---------------------------------------------------------------

		elif isinstance(n, Stmt):

			s = []
			fs = [] #fs -> function statements
			for nd in n.nodes:

				if isinstance(nd,Class):
					o = self.declassify(nd,fs,v)
					s.insert(0,o)
					continue

				o = self.declassify(nd,s,v)
				if o is None: continue
				if not isinstance(o,Name): # discard Name
					s.append(o)

			self.body_stmts = s
			self.func_stmts = fs

			return Stmt(s + fs)

			#return Stmt([self.declassify(nn,s,v) for nn in n])

		#---------------------------------------------------------------

		elif isinstance(n, UnarySub):

			n.expr = self.declassify(n.expr,s,v)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, UnaryAdd):

			n.expr = self.declassify(n.expr,s,v)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Invert):
			
			n.expr = self.declassify(n.expr,s,v)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Mul):

			n.left = self.declassify(n.left,s,v)
			n.right = self.declassify(n.right,s,v)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Div):

			n.left = self.declassify(n.left,s,v)
			n.right = self.declassify(n.right,s,v)

			return n
		
		#---------------------------------------------------------------

		elif isinstance(n, Add):

			n.left = self.declassify(n.left,s,v)
			n.right = self.declassify(n.right,s,v)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Sub):

			n.left = self.declassify(n.left,s,v)
			n.right = self.declassify(n.right,s,v)

			return n

		#---------------------------------------------------------------	

		elif isinstance(n, Or):

			for i in range(len(n.nodes)):
				n.nodes[i] = self.declassify(n.nodes[i],s,v)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, And):

			for i in range(len(n.nodes)):
				n.nodes[i] = self.declassify(n.nodes[i],s,v)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Not):

			n.expr = self.declassify(n.expr,s,v)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Compare):
			
			n.expr = self.declassify(n.expr,s,v)
			a = self.declassify(n.ops[0][1],s,v)

			n.ops = [(n.ops[0][0], a)]

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Name):

			return n

		#---------------------------------------------------------------

		elif isinstance(n, String):

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Const):

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Printnl):

			n.nodes[0] = self.declassify(n.nodes[0],s,v)

			return n

		#---------------------------------------------------------------
		# nodes, expr

		elif isinstance(n, Assign):

			nd = self.declassify(n.nodes[0],s,v);
			e = self.declassify(n.expr,s,v);

			if e is None: return None

			n.nodes[0] = nd
			n.expr = e

			return n

		#---------------------------------------------------------------
		# name, flags

		elif isinstance(n, AssName):

			self.name = n.name

			return n

		#---------------------------------------------------------------

		elif isinstance(n, If):

			for i in range(len(n.tests)):

				a = self.declassify(n.tests[i][0],s,v)
				b = self.declassify(n.tests[i][1],s,v)

				n.tests[i]= (a,b)
			
			return n

		#---------------------------------------------------------------

		elif isinstance(n, While):

			n.test = self.declassify(n.test,s,v)
			n.body = self.declassify(n.body,[],v)

			return n

		#---------------------------------------------------------------
		# Class ( name, bases, doc, code, decorators = None )

		elif isinstance(n, Class):

			# -------------------------------------------------------	

			self.func = []

			#ADD CLASS
			self.addClass(n.name)
			self.lstClass.append(n.name)

			#cn -> class name
			cn = "C" + n.name
			n.name = cn

			self.current = P.Class(cn,[],[])
			self.classes.append( self.current )

			# -------------------------------------------------------
			# for each function in the class -> rename the function

			isInit = False
			for i in range(len(n.code.nodes)):

				if isinstance(n.code.nodes[i],Function):

					fn = self.declassify(n.code.nodes[i],s,n.name)

					#ADD FUNCTION
					if fn.name == "__init__": isInit = True
					fn.name = str(cn + "_" + fn.name)

					if fn.name not in self.current.functions:
						self.current.functions.append(fn.name)

					fn.name = String(fn.name)

					s.append( fn )

				else:
					print "\nDeclassify.py ERROR: Class contains code other than functions."
					print n.code.nodes[i]
					quit()

			if not isInit:
				nm = cn + "_" + "__init__"

				self.func.append( CallFunc( String('set_fun'),[Name(cn), String(nm), String("_"+nm)]) )
				fn = Function( None, String(nm), [Name('self')], [], 0, None, Stmt([Discard(Const('0'))]) )

				if nm not in self.current.functions:
					self.current.functions.append(nm)

				s.append( fn )

			# -------------------------------------------------------
			# create class

			bs = []

			#if len(n.bases) == 0:
				# bs = [n.bases[0]]

			a = CallFunc( String("create_int"), [Const("0")])
			b = CallFunc( String("create_list"), [a])

			cc = CallFunc( String('create_class'), [b])

			#asf -> assign function create class
			asf = Assign([AssName(n.name, 'OP_ASSIGN')], cc)

			# -------------------------------------------------------
			# setup class

			nm = str( "setup_" + n.name )

			fn = Function(None, String(nm), [], [], 0, None, Stmt([asf] + self.func))

			s.append(fn)

			# -------------------------------------------------------

			return Discard( CallFunc( String(nm), []) )

		#---------------------------------------------------------------
		# decorators, name, argnames, defaults, flags, doc, code

		elif isinstance(n, Function):

			sl = []
			cs = self.declassify(n.code,sl,v)
			n.code = Stmt(sl + cs.nodes)

			nm = v + "_" + n.name
			self.func.append( CallFunc( String('set_fun'),[Name(v), String(nm), String("_"+nm)]) )

			for i in range(len(n.argnames)):
				n.argnames[i] = Name(n.argnames[i])

			return n

		#---------------------------------------------------------------
		# node, args, star_args = None, dstar_args = None
		
		elif isinstance(n, CallFunc):

			if isinstance(n.node, Name):

				if self.isClass(n.node.name):

					nm = "C"+str(n.node.name)
					fn = CallFunc( String('create_object'), [Name(nm)] )
					self.addObject( self.name )

					n.args.insert( 0, String( nm + "_" + "__init__") )
					n.args.insert( 0, Name(self.name) )

					s.append( Assign([AssName(self.name, 'OP_ASSIGN')], fn) )
					s.append( Discard(CallFunc( String('get_fun_ptr_from_attr'), n.args )) )

					return None

			if isinstance(n.node, Getattr):

				if self.isObject(n.node.expr.name):

					nm = String(self.current.name + "_" + n.node.attrname)
					e = n.node.expr

					n.args.insert( 0, nm )
					n.args.insert( 0, e )
					fn = CallFunc( String('get_fun_ptr_from_attr'), n.args )

					return fn

			return n

		#---------------------------------------------------------------
		# Gettattr ( expr, attrname )

		elif isinstance(n, Getattr):

			n.attrname = String(self.current.name + "_" + n.attrname)

			return n

		#---------------------------------------------------------------
		# AssAttr( expr, attrname, flags )

		elif isinstance(n, AssAttr):

			#ADD CLASS ATTRIBUTES
			if n.attrname not in self.current.attributes:
				self.current.attributes.append( self.current.name + "_" + n.attrname )

			n.attrname = String(self.current.name + "_" + n.attrname)

			return n

		#---------------------------------------------------------------
		# Return( value )

		elif isinstance(n, Return):

			n.value = self.declassify(n.value,v)

			return n

		#---------------------------------------------------------------

		elif isinstance(n, Discard):

			n.expr = self.declassify(n.expr,v)

			return n

		#---------------------------------------------------------------

		else:
			print "Error: Declassify"
			quit()

	# ---------------------------------------------------------------------------------------------
	# HELPER FUNCTIONS 
	# ---------------------------------------------------------------------------------------------

	def log(self,line):

		self.l.write(line)

	# ---------------------------------------------------------------------------------------------

	def isClass(self,cls):

		return (cls in self.cls_list)

	# ---------------------------------------------------------------------------------------------

	def printClassList(self):

		for c in self.cls_list:
			print c

	# ---------------------------------------------------------------------------------------------

	def addClass(self,cls):

		if self.isClass(cls): return

		self.cls_list.append(cls)

	# ---------------------------------------------------------------------------------------------

	def isObject(self,obj):

		return (obj in self.obj_list)

	# ---------------------------------------------------------------------------------------------

	def printObjectList(self):

		for o in self.obj_list:
			print o

	# ---------------------------------------------------------------------------------------------

	def addObject(self,obj):

		if self.isObject(obj): return

		self.obj_list.append(obj)

# -------------------------------------------------------------------------------------------------
# END OF FILE
# -------------------------------------------------------------------------------------------------
