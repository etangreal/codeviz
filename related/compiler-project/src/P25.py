
# -------------------------------------------------------------------------------------------------
# 
# Authors: E.Salzmann & F.Chegini
# Date: 2012-12-06
#
# -------------------------------------------------------------------------------------------------

# -------------------------------------------------------------------------------------------------
# IMPORTS
# -------------------------------------------------------------------------------------------------

import re
import array, copy
from sets import Set

# -------------------------------------------------------------------------------------------------
# GLOBALS
# -------------------------------------------------------------------------------------------------

class Counter:

	c = 0

	def __init__(self,count):
		self.c = count

	def inc(self):
		self.c += 1

	def count(self):
		return self.c

_jc = Counter(0)

#--------------------------------------------------------------------------------------------------------------------
# ABSTRACT BASE CLASS: OPS
#--------------------------------------------------------------------------------------------------------------------

class Ops:

	debug = False
	tabs = "\t"
	var = ""

	base_addr = "base_addr"
	sp_base_addr = "<NO-BASE-ADDR-ALLOCATED>"

	#tbc -> tab count
	tbc = 0

	def tab(self,add=0):

		#----------------------------------------
		tbc = self.tbc
		#----------------------------------------

		tb = ""
		for i in range(0,tbc+add): 
			tb += "\t"

		return tb

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)

		pass

	def reserve_base_addr(self,stack):

		if len(stack) == 0: stack.append("base_addr")
		if stack[0] != "base_addr": stack.insert(0,"base_addr")

		return "-4(%ebp)"

	def reserve(self,stack,var):

		if (var is None) or (var is ""):
			print "ERROR: cant reserve empty variable on the stack."
			quit()

		if str(var).isdigit(): 
			print "ERROR: cant reserve digits as variable on the stack."
			quit()

		pos = -1
		for i in range(0,len(stack)):
			if (str(var) == str(stack[i])): 
				pos = (i+1) * -4
		
		if (pos == -1):
			stack.append(var)
			pos = len(stack) * -4 

		return str(pos) + "(%ebp)"

	#pseudo -> pseudo x86
	def pseudo(self):

		return "OPS.pseudo()"

	def x86(self):

		return "OPS.x86()"

	def __repr__(self):

		return "OPS.str()"

# -------------------------------------------------------------------------------------------------
# STATEMENTS
# -------------------------------------------------------------------------------------------------

class Stmt(Ops):

	def __init__(self,stmts=[]):

		self.stmts = stmts

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)

		for s in self.stmts:
			s.allocate(stack, class_dict)

	def pseudo(self):

		st = ""
		for s in self.stmts:
			st += s.pseudo()

		return st

	def x86(self):

		st = ""
		for s in self.stmts:
			st += s.x86()

		return st

	def __repr__(self):

		#----------------------------------------
		tb = self.tab()
		#----------------------------------------

		st = ""
		for s in self.stmts:
			st += tb + str(s) + "\n"

		if (self.debug): st = "STMT: " + st
		return st

# -------------------------------------------------------------------------------------------------
# PRINTLN
# -------------------------------------------------------------------------------------------------

class Printnl(Ops):

	def __init__(self,var):

		self.var = var

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)

		self.var.allocate(stack)

	def pseudo(self):

		#----------------------------------------
		var = self.var.pseudo()
		tabs = self.tabs
		#----------------------------------------

		stmts = \
			tabs + "movl\t" + var + ",%eax\n" + \
			tabs + "movl\t%eax,(%esp)\n"+ \
        	tabs + "call\t_print_int_nl\n"

		return stmts

	def x86(self):

		#----------------------------------------
		var = self.var.x86()
		tabs = self.tabs
		#----------------------------------------
		
		stmts = \
			tabs + "movl\t" + var + ",%eax\n" + \
			tabs + "movl\t%eax,(%esp)\n"+ \
        	tabs + "call\t_print_int_nl\n"

		return stmts

	def __repr__(self):
		
		stmts = "print " + str(self.var)

		if (self.debug): stmts = "PRINTLN: " + stmts
		return  stmts

# -------------------------------------------------------------------------------------------------
# DISCARD
# -------------------------------------------------------------------------------------------------

class Discard(Ops):

	obj = None

	def __init__(self, obj):
		
		self.obj = obj
		
	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)

		pass

	def pseudo(self):

		self.obj.pseudo()
		return ""

	def x86(self):

		# self.obj.x86()
		return ""

	def __repr__(self):

		#----------------------------------------
		obj = str(self.obj)
		#----------------------------------------

		stmts = obj + " {Discarding ...}"

		if (self.debug): stmts = "DISCARD: " + stmts
		return stmts

# -------------------------------------------------------------------------------------------------
# ASSIGN
# -------------------------------------------------------------------------------------------------

class Assign(Ops):

	class_dict = None

	def __init__(self,var,expr):

		self.var = var
		self.expr = expr

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)
		self.class_dict = class_dict

		self.var.allocate(stack,class_dict)
		self.expr.allocate(stack,class_dict)

	def pseudo(self):

		#----------------------------------------
		var  = self.var.pseudo()
		expr = self.expr.pseudo()
		tabs = self.tabs
		#----------------------------------------

		stmts = \
			self.tabs + "movl\t"+expr+",%eax\n"+\
			self.tabs + "movl\t%eax,"+var+"\n"

		return stmts

	def x86(self):

		ass = self.leal_x86()
		if len(ass): return ass

		cp_v = self.cpoint_var()
		if len(cp_v): return cp_v

		cp_e = self.cpoint_expr()
		if len(cp_e): return cp_e

		#----------------------------------------
		var  = self.var.x86()
		expr = self.expr.x86()
		bs = self.sp_base_addr
		tabs = self.tabs
		#----------------------------------------

		stmts = \
			tabs + "movl\t"+expr+",%eax\n"+\
			tabs + "movl\t%eax,"+var+"\n"

		return stmts

	def cpoint_var(self):

		#----------------------------------------

		vname = self.var.var
		if not self.class_dict.has_key(vname): return ""

		#----------------------------------------
		var  = self.var.x86()
		expr = self.expr.x86()
		gptr = self.var.sp_gptr
		bs = self.sp_base_addr
		tabs = self.tabs
		#----------------------------------------
	
		stmts = \
			tabs + "movl\t"+expr+",%eax\n" + \
			tabs + "movl\t%eax,"+var+"\n" + \
			tabs + "movl\t"+bs+",%ecx\n" + \
			tabs + "movl\t"+gptr+",%edx\n" + \
			tabs + "movl\t"+var+",%eax\n" + \
			tabs + "movl\t%eax,(%edx)\n"

		return stmts

	def cpoint_expr(self):


		#----------------------------------------

		ename = self.expr.var
		if not self.class_dict.has_key(ename): return ""

		#----------------------------------------
		var  = self.var.x86()
		expr = self.expr.x86()
		gptr = self.expr.sp_gptr
		bs = self.sp_base_addr
		tabs = self.tabs
		#----------------------------------------

		# stmts = \
		# 	tabs + "movl\t"+bs+",%ecx\n"+\
		# 	tabs + "movl\t"+expr+",%eax\n"+\
		# 	tabs + "movl\t%eax," + var+ "\n"

		# stmts = \
		# 	tabs + "movl\t"+bs+",%ecx\n" + \
		# 	tabs + "movl\t"+gptr+",%edx\n" + \
		# 	tabs + "movl\t(%edx),%eax" + \
		# 	tabs + "movl\t%eax,"+var+"\n"


		stmts = \
			tabs + "movl\t"+bs+",%ecx\n" + \
			tabs + "movl\t"+gptr+",%edx\n" + \
			tabs + "movl\t(%edx),%eax\n" + \
			tabs + "movl\t%eax,"+var+"\n"

		return stmts

	def leal_x86(self):

		if not isinstance(self.expr,String): return ""

		#----------------------------------------
		var  = self.var.x86()
		expr = self.expr.x86()
		bs = self.sp_base_addr
		tabs = self.tabs
		#----------------------------------------

		stmts = \
			tabs + "movl\t"+bs+",%ecx\n"+\
			tabs + "leal\t"+expr+",%eax\n"+\
			tabs + "movl\t%eax,"+var+"\n"

		return stmts

	def __repr__(self):

		stmts = str(self.var) + " = " + str(self.expr)

		if (self.debug): stmts = "ASSIGN: " + stmts
		return stmts

# -------------------------------------------------------------------------------------------------
# CALLFUNC
# -------------------------------------------------------------------------------------------------

class CallFunc(Ops):

	sp_fptr = None

	def __init__(self,var,name,args=[]):

		self.var = var
		self.name = name
		self.args = args
		self.sp_fptr = Name("fptr")

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)

		self.var.allocate(stack,class_dict)
		self.name.allocate(stack,class_dict)
		self.sp_fptr.allocate(stack,class_dict)

		for a in self.args:
			a.allocate(stack,class_dict)

	def pseudo(self):

		#----------------------------------------
		var = self.var.pseudo()
		name = self.name.pseudo()

		args = []
		for a in self.args: 
			args.append( a.pseudo() )

		tabs = self.tabs
		#----------------------------------------

		st = ""
		if len(args): st = \
			tabs + "movl\t" + args[0] + ",%eax" + "\n" + \
			tabs + "movl\t%eax,(%esp)\n"

		stmts = \
			st + \
			tabs + "call\t_" + name + "\n" + \
			tabs + "movl\t%eax," + var + "\n"

		return stmts

	def x86(self):

		fn = self.set_fun_x86()
		if len(fn): return fn

		fn = self.get_attr_x86()
		if len(fn): return fn

		fn = self.set_attr_x86()
		if len(fn): return fn

		fn = self.get_fun_ptr_from_attr_x86()
		if len(fn): return fn

		#----------------------------------------
		var = self.var.x86()
		name = self.name.x86()

		args = []
		for a in self.args:
			args.append( a.x86() )

		tabs = self.tabs
		#----------------------------------------

		st = ""
		if len(args): st = \
			tabs + "movl\t"+args[0]+",%eax" + "\n" + \
			tabs + "movl\t%eax,(%esp)\n"

		stmts = \
			st + \
			tabs + "call\t_"+ name +"\n" + \
			tabs + "movl\t%eax," + var + "\n"

		return stmts

	def set_fun_x86(self):
		
		if not (self.name.x86() == "set_fun"): return ""

		#----------------------------------------
		r = ["%ecx","%edx","%esi"]
		la = len(self.args)

		var = self.var.x86()
		name = self.name.x86()
		fptr = self.sp_fptr.x86()

		cpoint = self.args[0].x86()
		fn_str = self.args[1].x86()
		fn = self.args[2].x86()

		tabs = self.tabs
		#----------------------------------------

		stmts = \
			tabs + "movl\t%esp,%edx\n" + \
			tabs + "movl\t"+fn+",%eax\n" + \
			tabs + "movl\t%eax,8(%edx)\n" + \
			tabs + "movl\t"+fn_str+",%eax\n" + \
			tabs + "movl\t%eax,4(%edx)\n" + \
			tabs + "movl\t"+cpoint+",%eax\n" + \
			tabs + "movl\t%eax,(%edx)\n" + \
			tabs + "call\t_"+ name + "\n" + \
			tabs + "movl\t%eax," + var + "\n"

		return stmts

	def set_attr_x86(self):
		
		if not (self.name.x86() == "set_attr"): return ""

		#----------------------------------------
		r = ["%ecx","%edx","%esi"]
		la = len(self.args)

		var = self.var.x86()
		name = self.name.x86()
		fptr = self.sp_fptr.x86()

		cpoint = self.args[0].x86()
		attr = self.args[1].x86()
		value = self.args[2].x86()

		tabs = self.tabs
		#----------------------------------------

		stmts = \
			tabs + "movl\t"+cpoint+",%eax\n" + \
			tabs + "movl\t%eax,(%esp)\n" + \
			tabs + "movl\t"+attr+",%eax\n" + \
			tabs + "movl\t%eax,4(%esp)\n" + \
			tabs + "movl\t"+value+",%eax\n" + \
			tabs + "movl\t%eax,8(%esp)\n" + \
			tabs + "call\t_"+ name + "\n" + \
			tabs + "movl\t%eax," + var + "\n"

		return stmts

	def get_attr_x86(self):
		
		if not (self.name.x86() == "get_attr"): return ""

		#----------------------------------------
		r = ["%ecx","%edx"]
		la = len(self.args)

		var = self.var.x86()
		name = self.name.x86()
		

		cpoint = self.args[0].x86()
		attr = self.args[1].x86()
		# print "========================"
		# print 	str(cpoint) +"=" + str(self.args[0])
		# print   str(attr) + "=" + str(self.args[1])
		# print 	str(var) + "=" + str(self.var)
		# print 	str(name) + "=" + str(self.name)
		# print "========================"

		tabs = self.tabs
		#----------------------------------------
	
		stmts = \
			tabs + "movl\t"+cpoint+",%eax\n" + \
			tabs + "movl\t%eax,(%esp)\n" + \
			tabs + "movl\t"+attr+",%eax\n" + \
			tabs + "movl\t%eax,4(%esp)\n" + \
			tabs + "call\t_"+ name + "\n" + \
			tabs + "movl\t%eax," + var + "\n"

		return stmts

	def get_fun_ptr_from_attr_x86(self):

		if not (self.name.x86() == "get_fun_ptr_from_attr"): return ""

		#----------------------------------------
		r = ["%ecx","%edx","%esi"]
		la = len(self.args)

		var = self.var.x86()
		name = self.name.x86()
		fptr = self.sp_fptr.x86()

		args = []
		for a in self.args:
			args.append( a.x86() )

		tabs = self.tabs
		#----------------------------------------

		stmts = ""

		stmts = \
			tabs + "movl	"+args[0]+",%eax" 			+ "\n" + \
			tabs + "movl	%eax, (%esp)" 				+ "\n" + \
			tabs + "movl	"+args[1]+",%eax" 			+ "\n" + \
			tabs + "movl	%eax, 4(%esp)" 				+ "\n" + \
			tabs + "call	_get_fun_ptr_from_attr"		+ "\n" + \
			tabs + "movl	%eax, "+fptr				+ "\n"

		st_args = ""

		if la >= 4: 
			st_args += \
				tabs + "movl	"+args[3]+",%eax" 		+ "\n" + \
				tabs + "movl	%eax, (%esp)"			+ "\n" + \
				tabs + "call	_create_int"			+ "\n" + \
				tabs + "movl	%eax, 8(%esp)"			+ "\n"

		if la >= 3: 
			st_args += \
				tabs + "movl	"+args[2]+",%eax" 		+ "\n" + \
				tabs + "movl	%eax, (%esp)"			+ "\n" + \
				tabs + "call	_create_int"			+ "\n" + \
				tabs + "movl	%eax, 4(%esp)"			+ "\n" 

		st_args += \
			tabs + "movl	"+args[0]+",%eax" 			+ "\n" + \
			tabs + "movl	%eax, (%esp)"				+ "\n"

		stmts += st_args + \
			tabs + "movl	"+fptr+",%eax"				+ "\n" + \
			tabs + "call	*%eax"						+ "\n" + \
			tabs + "movl	%eax,"+var					+ "\n"

		return stmts

	def __repr__(self):

		#----------------------------------------
		var = str(self.var)
		name = str(self.name)
		args = self.args
		#----------------------------------------

		a = ""
		if len(args):
			a = str(args[0])
			for ar in args[1:]:
				a += ", " + str(ar)

		stmts = \
			var + " = " + \
			name +"("+a+")" 

		if (self.debug): stmts = "CALLFUNC: " + stmts
		return stmts

# -------------------------------------------------------------------------------------------------
# FUNCTION
# -------------------------------------------------------------------------------------------------

class Function(Ops):

	internal_stack = None

	sp_name = None
	nsp = 0
	stmts = None

	def __init__(self,name,start_label,end_label,args=[],stmts=None):

		self.internal_stack = []
		self.name = name
		self.sp_name = copy.copy(name)

		self.start_label = start_label
		self.end_label = end_label

		self.args = args
		self.stmts = stmts

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(self.internal_stack)

		self.name.allocate(
			self.internal_stack,
			class_dict)

		self.sp_name.allocate(
			self.internal_stack, 
			class_dict)

		for a in self.args:
			a.allocate(
				self.internal_stack,
				class_dict)

		self.stmts.allocate(
			self.internal_stack,
			class_dict)

	def header(self,isx86=True):

		#----------------------------------------
		if isx86:
			name = self.name.x86()
		else: 
			name = self.name.pseudo()

		tabs = self.tabs
		#----------------------------------------

		stmts = "\n"+tabs+".globl\t_"+self.name.pseudo()
		stmts += "\n"+tabs+".align\t4,0x90\n"
		stmts += "_"+self.name.pseudo()+":\n"

		return stmts

	def prologue(self):

		#----------------------------------------
		start_label = self.start_label

		self.nsp = len(self.internal_stack) * 4 + 8
		while( not (self.nsp-8) % 16 == 0 ):
			self.nsp += 4

		nsp = str(self.nsp)

		tabs = self.tabs
		#----------------------------------------

		stmt = \
			tabs + "pushl\t%ebp\n" + \
			tabs + "movl\t%esp,%ebp\n" + \
			tabs + "subl\t$"+nsp+",%esp\n" + \
			tabs + "call\t"+start_label+"$pb\n" + \
			start_label + "$pb:\n"

		return stmt

	def epilogue(self):

		#----------------------------------------
		end_label = self.end_label
		nsp = str(self.nsp)
		tabs = self.tabs
		#----------------------------------------

		stmt = \
			end_label + ":\n" + \
			tabs + "addl\t$"+nsp+", %esp\n" + \
			tabs + "popl\t%ebp\n" + \
			tabs + "ret\n\n"

		return stmt

	def arguments(self,isx86=True):

		#----------------------------------------
		r = ["%ecx","%edx","%esi"]
		la = len(self.args)
		tabs = self.tabs

		if isx86:
			bs = self.sp_base_addr

		else:
			bs = self.base_addr
		#----------------------------------------

		stmts = tabs + "popl\t%eax\n"
		stmts += tabs + "movl\t%eax, "+bs+"\n"

		for i in range(la):
			p = (la-i)*4+4
			stmts += tabs +"movl\t"+ str(p)+"(%ebp),"+str(r[i])+"\n"

		for i in range(la):
			p = (la-i)*4+4
			stmts += tabs +"movl\t"+str(r[i])+",-"+str(p)+"(%ebp)\n" 

		return stmts

	def statements(self,isx86=True):

		if isx86:
			return self.stmts.x86()

		return self.stmts.pseudo()

	def pseudo(self):

		stmts = self.header(False)
		stmts += self.prologue()
		stmts += self.arguments(False)
		stmts += self.statements(False)
		stmts += self.epilogue()

		return stmts

	def x86(self):

		stmts = self.header(True)
		stmts += self.prologue()
		stmts += self.arguments(True)
		stmts += self.statements(True)
		stmts += self.epilogue()

		return stmts

	def __repr__(self):

		#----------------------------------------
		name = str(self.name)
		args = self.args
		stmts = str(self.stmts)
		stack = str (self.internal_stack)

		a = ""
		if len(args):
			a = str(args[0])
			for ar in args[1:]:
				a += ", " + str(ar)
		#----------------------------------------

		st = \
			name+"("+a+")\n" + \
			stmts

		if (self.debug):
			st = "\n" + \
			"^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n" + \
			"F-STACK: " + stack + "\n" + \
			"^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n" + \
			"FUNCTION: " + st + \
			"^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n"

		return st

# -------------------------------------------------------------------------------------------------
# CLASS
# -------------------------------------------------------------------------------------------------

class Class(Ops):

	name = "<class-name>"
	attributes = None
	functions = None

	def __init__(self,name,attributes,functions):

		self.name = name
		self.attributes = attributes
		self.functions = functions

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)

		#----------------------------------------
		
		#----------------------------------------

		pass

	def pseudo(self):

		#----------------------------------------
		
		#----------------------------------------

		return ""

	def x86(self):

		#----------------------------------------
		
		#----------------------------------------

		return ""

	def __repr__(self):

		#----------------------------------------
		name = self.name
		attributes = self.attributes
		functions = self.functions
		#----------------------------------------

		stmts = "{name: " + str(name) + "\nfunctions: " + str(functions) + "\nattributes: " + str(attributes) + " }"

		if (self.debug): stmts = "CLASS: " + stmts
		return stmts

# -------------------------------------------------------------------------------------------------
# UNARYADD
# -------------------------------------------------------------------------------------------------

class UnaryAdd(Ops):

	sp_var  = ""
	sp_expr = ""

	def __init__(self,var,expr):

		self.var = var
		self.expr = expr

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)

		self.var.allocate(stack)
		self.expr.allocate(stack)

	def pseudo(self):

		#----------------------------------------
		var = self.var.pseudo()
		expr = self.expr.pseudo()
		tabs = self.tabs
		#----------------------------------------

		stmts = \
			tabs + "movl\t"+expr+","+var+"\n"

		return stmts

	def x86(self):

		#----------------------------------------
		var = self.var.x86()
		expr = self.expr.x86()
		tabs = self.tabs
		#----------------------------------------

		stmts = \
			tabs + "movl\t"+expr+", %eax\n" + \
			tabs + "movl\t%eax, "+var+"\n" 

		return stmts

	def __repr__(self):

		#----------------------------------------
		var = str(self.var)
		expr = str(self.expr)
		#----------------------------------------

		stmts =  var + " = " + expr

		if (self.debug): stmts = "UNARYADD: " + stmts
		return stmts

# -------------------------------------------------------------------------------------------------
# UNARYSUB
# -------------------------------------------------------------------------------------------------

class UnarySub(Ops):

	def __init__(self,var,expr):

		self.var = var
		self.expr = expr

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)

		self.var.allocate(stack)
		self.expr.allocate(stack)

	def pseudo(self):

		#----------------------------------------
		var = self.var.pseudo()
		expr = self.expr.pseudo()
		tabs = self.tabs
		#----------------------------------------

		stmts = \
			tabs + "movl\t"+expr+",%eax\n" + \
			tabs + "movl\t%eax,"+var+"\n" + \
			tabs + "negl\t"+var+"\n"

		return stmts

	def x86(self):

		#----------------------------------------
		var = self.var.x86()
		expr = self.expr.x86()
		tabs = self.tabs
		#----------------------------------------

		stmts = \
			tabs + "movl\t"+expr+",%eax\n" + \
			tabs + "movl\t%eax,"+var+"\n" + \
			tabs + "negl\t"+var+"\n"

		return stmts

	def __repr__(self):
		
		var = str(self.var)
		expr = str(self.expr)

		stmts = var + " = - " + expr

		if (self.debug): stmts = "UNARYSUB: " + stmts
		return stmts

# -------------------------------------------------------------------------------------------------
# INVERT
# -------------------------------------------------------------------------------------------------

class Invert(Ops):

	def __init__(self,var,expr):

		self.var = var
		self.expr = expr

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)

		self.var.allocate(stack)
		self.expr.allocate(stack)

	def pseudo(self):

		#----------------------------------------
		var = self.var.pseudo()
		expr = self.expr.pseudo()
		tabs = self.tabs
		#----------------------------------------

		stmts = \
			tabs + "movl\t"+expr+",%eax\n" + \
			tabs + "movl\t%eax,"+var+"\n" + \
			tabs + "addl\t$1,"+var+"\n" + \
			tabs + "negl\t"+var+"\n"

		return stmts

	def x86(self):

		#----------------------------------------
		var = self.var.x86()
		expr = self.expr.x86()
		tabs = self.tabs
		#----------------------------------------

		stmts = \
			tabs + "movl\t"+expr+",%eax\n" + \
			tabs + "movl\t%eax,"+var+"\n" + \
			tabs + "addl\t$1,"+var+"\n" + \
			tabs + "negl\t"+var+"\n"

		return stmts

	def __repr__(self):

		#----------------------------------------
		var = str(self.var)
		expr = str(int(self.expr)+1)
		#----------------------------------------

		stmts = var + " = - " + expr

		if (self.debug): stmts = "INVERT: " + stmts
		return stmts

# -------------------------------------------------------------------------------------------------
# MUL
# -------------------------------------------------------------------------------------------------

class Mul(Ops):

	def __init__(self,var,left,right):

		self.var = var
		self.left = left
		self.right = right

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)

		self.var.allocate(stack)
		self.left.allocate(stack)
		self.right.allocate(stack)

	def pseudo(self):

		#----------------------------------------
		var = self.var.pseudo()
		left = self.left.pseudo()
		right = self.right.pseudo()
		tabs = self.tabs
		#----------------------------------------

		stmts = \
			tabs + "movl\t"+right+","+var+"\n" + \
			tabs + "imull\t"+left+","+var+"\n"

		return stmts

	def x86(self):

		#----------------------------------------
		var = self.var.x86()
		left = self.left.x86()
		right = self.right.x86()
		tabs = self.tabs
		#----------------------------------------

		stmts = \
			tabs + "movl\t"+left+", %eax\n" + \
			tabs + "movl\t"+right+", %ecx\n" + \
			tabs + "imull\t%ecx,%eax\n"+\
			tabs + "movl\t%eax,"+var+"\n"

		return stmts

	def __repr__(self):

		#----------------------------------------
		var = str(self.var)
		left = str(self.left)
		right = str(self.right)
		#----------------------------------------

		stmts = var + " = " + left + " * " + right

		if (self.debug): stmts = "MUL: " + stmts
		return stmts

# -------------------------------------------------------------------------------------------------
# DIV
# -------------------------------------------------------------------------------------------------

class Div(Ops):

	def __init__(self,var,left,right):

		self.var = var
		self.left = left
		self.right = right

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)

		self.var.allocate(stack)
		self.left.allocate(stack)
		self.right.allocate(stack)

	def pseudo(self):

		#----------------------------------------
		var = self.var.pseudo()
		left = self.left.pseudo()
		right = self.right.pseudo()
		tabs = self.tabs
		#----------------------------------------

		# stmts = \
		# 	tabs + "movl\t"+left+", %eax\n" + \
		# 	tabs + "movl\t"+right+", %ecx\n" + \
		# 	tabs + "idivl\t%ecx\n"+\
		# 	tabs + "movl\t%eax,"+var+"\n"

		return ""

	def x86(self):

		#----------------------------------------
		var = self.var.x86()
		left = self.left.x86()
		right = self.right.x86()
		tabs = self.tabs
		#----------------------------------------

		# stmts = \
		# 	tabs + "movl\t"+left+", %eax\n" + \
		# 	tabs + "movl\t"+right+", %ecx\n" + \
		# 	tabs + "idivl\t%ecx\n"+\
		# 	tabs + "movl\t%eax,"+var+"\n"

		return ""

	def __repr__(self):

		#----------------------------------------
		var = str(self.var)
		left = str(self.left)
		right = str(self.right)
		#----------------------------------------

		#stmts = var + " = " + left + " / " + right
		stmts = ""

		if (self.debug): stmts = "DIV: " + stmts
		return stmts

# -------------------------------------------------------------------------------------------------
# ADD
# -------------------------------------------------------------------------------------------------

class Add(Ops):

	def __init__(self,var,left,right):

		self.var = var
		self.left = left
		self.right = right

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)

		self.var.allocate(stack)
		self.left.allocate(stack)
		self.right.allocate(stack)

	def pseudo(self):

		#----------------------------------------
		var = str(self.var)
		left = str(self.left)
		right = str(self.right)
		tabs = self.tabs
		#----------------------------------------

		stmts = \
			tabs + "movl\t"+left+","+var+"\n" + \
			tabs + "addl\t"+right+","+var+"\n"

		return stmts

	def x86(self):

		#----------------------------------------
		var = self.var.x86()
		left = self.left.x86()
		right = self.right.x86()
		tabs = self.tabs
		#----------------------------------------

		stmts = \
			tabs + "movl\t" + left + ", %eax\n" + \
			tabs + "movl\t" + right + ", %ecx\n" + \
			tabs + "movl\t%eax, " + var + "\n" + \
			tabs + "addl\t%ecx," + var + "\n" 

		return stmts

	def __repr__(self):

		var = str(self.var)
		left = str(self.left)
		right = str(self.right)

		stmts =  var + " = " + left + " + " + right

		if (self.debug): stmts = "ADD: " + stmts
		return stmts

# -------------------------------------------------------------------------------------------------
# SUB
# -------------------------------------------------------------------------------------------------

class Sub(Ops):

	def __init__(self,var,left,right):

		self.var = var
		self.left = left
		self.right = right

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)

		self.var.allocate(stack)
		self.left.allocate(stack)
		self.right.allocate(stack)

	def pseudo(self):

		#----------------------------------------
		var = self.var.pseudo()
		left = self.left.pseudo()
		right = self.right.pseudo()
		tabs = self.tabs
		#----------------------------------------

		stmts = \
			tabs + "movl\t"+left+", %eax\n" + \
			tabs + "movl\t%eax, "+var+"\n" + \
			tabs + "movl\t"+right+", %eax\n" + \
			tabs + "subl\t%eax,"+var+"\n"

		return stmts

	def x86(self):

		#----------------------------------------
		var = self.var.x86()
		left = self.left.x86()
		right = self.right.x86()
		tabs = self.tabs
		#----------------------------------------

		stmts = \
			tabs + "movl\t"+left+", %eax\n" + \
			tabs + "movl\t%eax, "+var+"\n" + \
			tabs + "movl\t"+right+", %eax\n" + \
			tabs + "subl\t%eax,"+var+"\n"  

		return stmts

	def __repr__(self):

		#----------------------------------------
		var = str(self.var)
		left = str(self.left)
		right = str(self.right)
		#----------------------------------------

		stmts = var + " = " + left + " - " + right

		if (self.debug): stmts = "SUB: " + stmts
		return stmts

# -------------------------------------------------------------------------------------------------
# AND
# -------------------------------------------------------------------------------------------------

class And(Ops):

	def __init__(self,var,left,right):

		self.var = var
		self.left = left
		self.right = right

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)

		self.var.allocate(stack)
		self.left.allocate(stack)
		self.right.allocate(stack)

	def pseudo(self):

		#----------------------------------------
		var = self.var.pseudo()
		left = self.left.pseudo()
		right = self.right.pseudo()
		tabs = self.tabs
		#----------------------------------------

		stmts = \
			tabs + "movl\t"+left+", %eax\n" + \
			tabs + "movl\t%eax, "+var+"\n" + \
			tabs + "movl\t"+right+", %eax\n" + \
			tabs + "andl\t%eax,"+var+"\n"

	def x86(self):

		#----------------------------------------
		var = self.var.x86()
		left = self.left.x86()
		right = self.right.x86()
		tabs = self.tabs
		#----------------------------------------

		stmts = \
			tabs + "movl\t"+left+", %eax\n" + \
			tabs + "movl\t%eax, "+var+"\n" + \
			tabs + "movl\t"+right+", %eax\n" + \
			tabs + "andl\t%eax,"+var+"\n"

		return stmts

	def __repr__(self):

		#----------------------------------------
		var = str(self.var)
		left = str(self.left)
		right = str(self.right)
		#----------------------------------------

		stmts = var + " = " + left + " and " + right

		if (self.debug): stmts = "AND: " + stmts
		return stmts

# -------------------------------------------------------------------------------------------------
# OR
# -------------------------------------------------------------------------------------------------

class Or(Ops):

	def __init__(self,var,left,right):

		self.var = var
		self.left = left
		self.right = right

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)

		self.var.allocate(stack)
		self.left.allocate(stack)
		self.right.allocate(stack)

	def pseudo(self):

		#----------------------------------------
		var = self.var.pseudo()
		left = self.left.pseudo()
		right = self.right.pseudo()
		tabs = self.tabs
		#----------------------------------------

		stmts = \
			tabs + "movl\t"+left+", %eax\n" + \
			tabs + "movl\t%eax, "+var+"\n" + \
			tabs + "movl\t"+right+", %eax\n" + \
			tabs + "andl\t%eax,"+var+"\n"

	def x86(self):

		#----------------------------------------
		var = self.var.x86()
		left = self.left.x86()
		right = self.right.x86()
		tabs = self.tabs
		#----------------------------------------

		stmts = \
			tabs + "movl\t"+left+", %eax\n" + \
			tabs + "movl\t%eax, "+var+"\n" + \
			tabs + "movl\t"+right+", %eax\n" + \
			tabs + "orl\t%eax,"+var+"\n"

		return stmts

	def __repr__(self):

		#----------------------------------------
		var = str(self.var)
		left = str(self.left)
		right = str(self.right)
		#----------------------------------------

		stmts = var + " = " + left + " or " + right

		if (self.debug): stmts = "OR: " + stmts
		return stmts

# -------------------------------------------------------------------------------------------------
# NOT
# -------------------------------------------------------------------------------------------------

class Not(Ops):

	def __init__(self,var,expr):

		self.var = var
		self.expr = expr

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)

		self.var.allocate(stack)
		self.expr.allocate(stack)

	def pseudo(self):

		#----------------------------------------
		var = self.var.pseudo()
		expr = self.expr.pseudo()
		#----------------------------------------

		stmts = \
			self.tabs + "movl\t"+expr+",%eax\n"+ \
			self.tabs + "negl\t%eax\n" + \
			self.tabs + "notl\t%eax\n" + \
			self.tabs + "movl\t%eax,"+var+"\n" 

		return stmts

	def x86(self):

		#----------------------------------------
		var = self.var.x86()
		expr = self.expr.x86()
		#----------------------------------------

		stmts = \
			self.tabs + "movl\t"+expr+",%eax\n"+ \
			self.tabs + "negl\t%eax\n" + \
			self.tabs + "notl\t%eax\n" + \
			self.tabs + "movl\t%eax,"+var+"\n" 

		return stmts

	def __repr__(self):

		#----------------------------------------
		var = str(self.var)
		expr = str(self.expr)
		#----------------------------------------

		stmts = var + " = not " + expr

		if (self.debug): stmts = "NOT: " + stmts
		return stmts

# -------------------------------------------------------------------------------------------------
# Compare
# -------------------------------------------------------------------------------------------------

class Compare(Ops):

	global _jc

	def __init__(self,var,condition1,operator,condition2):

		self.var = var
		self.cnd1 = condition1
		self.op = operator
		self.cnd2 = condition2

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)

		self.var.allocate(stack)
		self.cnd1.allocate(stack)
		self.cnd2.allocate(stack)

	def pseudo(self):

		#----------------------------------------
		var = self.var.pseudo()
		cnd1 = self.cnd1.pseudo()
		cnd2 = self.cnd2.pseudo()
		#----------------------------------------

		return self.compare(cnd1,cnd2,self.op,var)

	def x86(self):

		#----------------------------------------
		var = self.var.x86()
		cnd1 = self.cnd1.x86()
		cnd2 = self.cnd2.x86()
		#----------------------------------------

		return self.compare(cnd1,cnd2,self.op,var)

	def compare(self,c1,c2,o,v):
		
		#----------------------------------------
		_jc.inc()
		tabs = self.tabs
		#----------------------------------------

		stmts = ""

		jT = "LA"+str(_jc.count())
		jE = "LB"+str(_jc.count())

		stmts += tabs + "movl\t$0,"+v+"\n"			# default is return FALSE
		stmts += tabs + "movl\t"+c1+",%eax\n"
		stmts += tabs + "cmpl\t"+c2+",%eax\n"

		if( o == ">" ):
			stmts += tabs + "jg\t"+jT+"\n"

		elif( o == ">=" ):
			stmts += tabs + "jge\t"+jT+"\n"

		elif( o == "<" ):
			stmts += tabs + "jl\t"+jT+"\n"

		elif( o == "<=" ):
			stmts += tabs + "jle\t"+jT+"\n"

		elif ( o == "==" ):
			stmts += tabs + "je\t"+jT+"\n"

		elif ( o == "!=" ):
			stmts += tabs + "jne\t"+jT+"\n"

		else:
			print "COMPARE-ERROR: unknown operator."
			quit()

		stmts += tabs + "jmp\t"+jE+"\n"
		stmts += jT+":\n"
		stmts += tabs + "movl\t$1,"+v+"\n"
		stmts += jE+":\n"

		return stmts

	def __repr__(self):

		#----------------------------------------
		var = str(self.var)
		cnd1 = str(self.cnd1)
		op = str(self.op)
		cnd2 = str(self.cnd2)
		#----------------------------------------

		stmts = var + " = " + cnd1 + op + cnd2

		if (self.debug): stmts = "COMPARE: " + stmts
		return stmts

# -------------------------------------------------------------------------------------------------
# NAME
# -------------------------------------------------------------------------------------------------

class Name(Ops):

	sp_var = ""
	sp_gptr = "<NO-GPTR>"
	label = ""

	def __init__(self,var,label=""):

		self.var = var
		self.label = label

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)

		if class_dict.has_key(self.var): 
			self.sp_gptr = class_dict[self.var]
			self.sp_gptr += "-"+self.label+"$pb(%ecx)"

		self.sp_var = self.reserve(stack, self.var)

	def pseudo(self):

		return str(self.var)

	def x86(self):

		return str(self.sp_var)

	def __repr__(self):

		#----------------------------------------
		var = str(self.var)
		#----------------------------------------

		stmts = var

		if (self.debug): stmts = "NAME: " + stmts
		return stmts

# -------------------------------------------------------------------------------------------------
# STRING
# -------------------------------------------------------------------------------------------------

class String(Ops):

	sp_var = ""
	label = ""

	def __init__(self,var,label=""):

		self.var = var
		self.sp_var = var
		self.label = label

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)

		if class_dict.has_key(self.var): 
			self.sp_var = class_dict[self.var]
			self.sp_var += "-"+self.label+"$pb(%ecx)"

		elif class_dict.has_key(self.var[1:]): 
			self.sp_var = self.var
			self.sp_var += "-"+self.label+"$pb(%ecx)"

	def pseudo(self):

		return str(self.var)

	def x86(self):

		return str(self.sp_var)

	def __repr__(self):

		#----------------------------------------
		var = str(self.var)
		#----------------------------------------

		stmts = var

		if (self.debug): stmts = "STRING: " + stmts
		return stmts

# -------------------------------------------------------------------------------------------------
# CONST
# -------------------------------------------------------------------------------------------------

class Const(Ops):

	def __init__(self,var):

		self.var = var

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)

		pass

	def pseudo(self):

		return str(self.var)

	def x86(self):

		return "$"+str(self.var)

	def __repr__(self):

		#----------------------------------------
		var = str(self.var)
		#----------------------------------------

		stmts = var

		if (self.debug): stmts = "CONST: " + stmts
		return stmts

# -------------------------------------------------------------------------------------------------
# RETURN
# -------------------------------------------------------------------------------------------------

class Return(Ops):

	var = "<RETURN-VAR>"
	label = "<LABEL>"

	def __init__(self,var,label):

		self.var = var
		self.label = label

	def allocate(self,stack,class_dict={}):

		self.var.allocate(stack)

	def pseudo(self):

		#----------------------------------------
		var = str(self.var)
		label = str(self.label)
		tabs = self.tabs
		#----------------------------------------

		st = \
			tabs + "movl\t"+var+",%eax\n" + \
			tabs + "jmp\t"+label+"\n"

			# tabs + "pushl\t%eax\n" + \

		return st

	def x86(self):

		#----------------------------------------
		var = self.var.x86()
		label = str(self.label)
		tabs = self.tabs
		#----------------------------------------

		st = \
			tabs + "movl\t"+var+",%eax\n" + \
			tabs + "jmp\t"+label+"\n"

			# tabs + "pushl\t%eax\n" + \

		return st

	def __repr__(self):

		#----------------------------------------
		var = str(self.var)
		#----------------------------------------

		stmts = "return " + var

		if (self.debug): stmts = "RETURN: " + stmts
		return stmts

# -------------------------------------------------------------------------------------------------
# IF
# -------------------------------------------------------------------------------------------------

class If(Ops):

	c = None
	l = None

	def __init__(self, condition, label):

		self.c = condition
		self.l = label

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)

		self.c.allocate(stack)

	def pseudo(self):

		#----------------------------------------
		c = self.c.pseudo()
		l = self.l.goto()
		tabs = self.tabs
		#----------------------------------------

		st = tabs + "movl\t"+c+",%eax\n"
		st += tabs + "notl\t%eax\n"
		st += tabs + "cmpl\t $1,%eax\n"
		st += tabs + "je\t"+l+"\n"

		return st

	def x86(self):

		#----------------------------------------
		c = self.c.x86()
		l = self.l.goto()
		tabs = self.tabs
		#----------------------------------------

		st = tabs + "movl\t"+c+",%eax\n"
		# st += tabs + "notl\t%eax\n"
		# st += tabs + "movl\t%eax,(%esp)\n"
		# st += tabs + "call\t_print_int_nl\n"
		st += tabs + "cmpl\t $1,%eax\n"
		st += tabs + "jne\t"+l+"\n"

		return st

	def __repr__(self):

		#----------------------------------------
		c = str(self.c)
		l = self.l.goto()
		#----------------------------------------

		stmts = "if ( "+c+" ) goto " + l

		if (self.debug): stmts = "IF: " + stmts
		return stmts

# -------------------------------------------------------------------------------------------------
# WHILE
# -------------------------------------------------------------------------------------------------

class While(Ops):

	c = None
	l = None
	e = None

	def __init__(self,test,body,else_):

		self.c = test
		self.l  = body
		self.e = else_

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)

		self.c.allocate(stack)

	def pseudo(self):

		#----------------------------------------
		c = self.c.pseudo()
		l = self.l.goto()
		tabs = self.tabs
		#----------------------------------------

		st = tabs + "movl\t"+c+",%eax\n"
		st += tabs + "cmpl\t $0,%eax\n"
		st += tabs + "je\t"+l+"\n"

		return st

	def x86(self):

		#----------------------------------------
		c = self.c.x86()
		l = self.l.goto()
		tabs = self.tabs
		#----------------------------------------

		st = tabs + "movl\t"+c+",%eax\n"
		st += tabs + "cmpl\t $0,%eax\n"
		st += tabs + "je\t"+l+"\n"

		return st

	def __repr__(self):

		#----------------------------------------
		c = str(self.c)
		l = self.l.goto()
		#----------------------------------------

		stmts = "if ( " + c + " ) goto " + l

		if (self.debug): stmts = "WHILE: " + stmts
		return stmts
		
# -------------------------------------------------------------------------------------------------
# LABEL
# -------------------------------------------------------------------------------------------------

class Label(Ops):

	def __init__(self,name):

		self.name = name

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)

		pass

	def pseudo(self):

		return self.name + ":\n"

	def x86(self):

		return self.name + ":\n"

	def goto(self):

		return self.name

	def __repr__(self):

		stmts = str(self.name) + ":\n"

		if (self.debug): stmts = "LABEL: " + stmts
		return stmts

# -------------------------------------------------------------------------------------------------
# GOTO
# -------------------------------------------------------------------------------------------------

class Goto(Ops):

	def __init__(self,label):

		self.label = label

	def allocate(self,stack,class_dict={}):

		self.sp_base_addr = self.reserve_base_addr(stack)

		pass

	def pseudo(self):

		return self.tabs + "jmp\t" + self.label + "\n"

	def x86(self):

		return self.tabs + "jmp\t" + self.label + "\n"

	def __repr__(self):
		
		#----------------------------------------
		tabs = self.tab()
		#----------------------------------------

		stmts = tabs + "goto " + self.label + "\n"

		if (self.debug): stmts = "GOTO: " + stmts
		return stmts

# -------------------------------------------------------------------------------------------------
# END OF FILE
# -------------------------------------------------------------------------------------------------

