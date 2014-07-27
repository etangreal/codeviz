# -------------------------------------------------------------------------------------------------
# 
# Authors: E.Salzmann & F.Chegini
# Date: 2012-12-06
#
# -------------------------------------------------------------------------------------------------

# -------------------------------------------------------------------------------------------------
# IMPORTS
# -------------------------------------------------------------------------------------------------

from P25 import *

# -------------------------------------------------------------------------------------------------
# GLOBALS
# -------------------------------------------------------------------------------------------------

# -------------------------------------------------------------------------------------------------
# CLASS STACKCONTROL
# -------------------------------------------------------------------------------------------------

class StackControl:

	tabs  = "\t"

	stmts = None		#list of statments (derived after parsing, flattening & unparsing the ast)
	stack = None		#list of virtual variables allocated to the stack
	classes = None 		#list of classes
	class_dict = None 	#dictionary 

	def __init__(self,stmts=[],classes=[],verbose=False):

		self.stmts = stmts
		self.verbose = verbose
		self.classes = classes

		self.class_dict = {}
		for cls in self.classes:
			self.cls_declr(cls.name, cls.functions, cls.attributes, self.class_dict)

		if (self.verbose):
			print "DICT:" + str(self.class_dict)

	def allocate(self):

		self.stack = []
		for stmt in self.stmts:
			stmt.allocate(self.stack,self.class_dict)

		if (self.verbose): 
			print "STACK:" + str(self.stack)

	def header(self):

		stmt = \
			self.tabs + ".section\t__TEXT,__text,regular,pure_instructions\n" + \
			self.tabs + ".globl\t\t_main\n" + \
			self.tabs + ".align\t\t4, 0x90\n" + \
			"_main:\n"

		return stmt

	def prologue(self):

		nsp = len(self.stack) * 4 + 8

		while( not (nsp-8) % 16 == 0 ):
			nsp += 4

		stmt =\
			self.tabs + "pushl\t%ebp\n" + \
			self.tabs + "movl\t%esp,%ebp\n" + \
			self.tabs + "subl\t$"+str(nsp)+",%esp\n"

		return stmt

	def epilogue(self):

		stmt = \
			self.tabs + "movl\t$0, %eax\n" + \
			self.tabs + "leave\n" + \
			self.tabs + "ret\n"

		return stmt

	def footer(self):

		#----------------------------------------
		tabs = self.tabs
		st = ""
		#----------------------------------------
		
		for cls in self.classes:
			st += self.cls_declr(cls.name, cls.functions, cls.attributes)

		st += "\n"+tabs + ".section  __IMPORT,__pointers,non_lazy_symbol_pointers\n"

		for cls in self.classes:
			st += self.cls_pointer(cls.name)
		st += ".subsections_via_symbols\n"

		return st

	# cls_declr -> class declaration
	def cls_declr(self,classname,functions=[],attributes=[],class_dict={}):

		#----------------------------------------
		tabs = self.tabs
		cn = classname
		d = class_dict
		#----------------------------------------

		st = ""
		st = tabs + ".comm\t" + cn + ",4,2\n"
		st += tabs + ".section  __TEXT,__cstring,cstring_literals\n"

		k = cn
		v = cn+"$non_lazy_ptr"
		if not d.has_key(k): d[k] = v

		for fn in functions:

			k = fn
			v = fn+".str"
			if not d.has_key(k): d[k] = v

			st += v + ":\n"
			st += tabs + ".asciz\t\""+fn+"\"\n\n"

		for att in attributes:

			k = att
			v = att+".str"
			if not d.has_key(k): 
				d[k] = v
				st += v + ":\n"
				st += tabs + ".asciz\t\""+att+"\"\n\n"

		return st

	# cls_pointer -> class pointer
	def cls_pointer(self,classname):

		#----------------------------------------
		tabs = self.tabs
		st = ""
		#----------------------------------------

		st += classname+"$non_lazy_ptr:\n"
		st += ".indirect_symbol "+classname+"\n"
		st += tabs + ".long\t0\n\n"
		

		return st

	def code(self):

		c = ""

		for stmt in self.stmts:
			c += str(stmt) + "\n"

		return c

	def pseudo(self):

		ls = ""
		for s in self.stmts:
			ls += s.pseudo()

		return ls

	def x86(self):

		s = ""
		s += self.header()
		s += self.prologue()

		for stmt in self.stmts:
			
			#BAD CODE! depend on the fact that there is some function called "start" :(
			if isinstance(stmt,Function) and stmt.name.pseudo() == "start":
				s += self.epilogue()

			s += stmt.x86()

		if(self.classes):
			s += self.footer()

		return s

	def __repr__(self):

		return self.code()

# -------------------------------------------------------------------------------------------------
# END OF FILE
# -------------------------------------------------------------------------------------------------
