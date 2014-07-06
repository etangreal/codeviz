
#1 check initial variables of classe
class classA():
	def __init__(self):
		self.aa = 1
		self.ab = 0
A=classA()
print A.aa
print A.ab

#2 check if the init of a new class
class classB():
	def __init__(self):
		print "New class"
B = classB()

#3 check call function in a class
class classC():
	def __init__(self):
		self.ca = 1
	def func1(self):
		print "call func1"
C = classC()
C.func1()

#4 check if a function can read a self.var from the same class 
class classD():
	def __init__(self):
		self.da = 1
	def func1(self):
		print self.da
D = classD()
D.func1()

#5 check if it reads "da" from classE and not from classD
class classE():
	def __init__(self):
		self.da = 2
	def func1(self):
		print self.da
E = classE()
E.func1()

#6 check if it reads the good function
class classF():
	def __init__(self):
		self.fa = 1
		self.fb = 2
	def func1(self):
		print self.fa
	def func2(self):
		print self.fb
F = classF()
F.func1()
F.func2()

#7 check if it reads "da" from classE and not from classD
class classG():
	def __init__(self,in1):
		self.ga = in1
	def func1(self):
		print self.ga
G = classG(5)
G.func1()

#8 check if it reads "da" from classE and not from classD
class classH():
	def __init__(self,in1,in2):
		self.ha = in1
		self.hb = in2
	def func1(self):
		print self.ha
		print self.hb
H = classH(1,2)
H.func1()

#9
class classI():
	def __init__(self):
		self.ia = 1
		self.ib = 2
I1 = classI()
I2 = classI()
print I1.ia
print I2.ib 

#10
class classJ():
	def __init__(self,in1):
		self.ja = in1
	def func1(self):
		print self.ja
J1 = classJ(1)
J2 = classJ(2)
J1.func1()
J2.func1() 

class classK():
	def __init__(self):
		self.ka = 1
	def func1(self):
		return self.ka
K = classK()
print K.func1()









