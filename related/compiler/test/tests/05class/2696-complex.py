class Complex(object):
	def __init__(self, re, im):
		self.re = re
		self.im = im
	def sum (self, c):
		self.re = self.re + c.re
		self.im = self.im + c.im
	def sub (self, c):
		self.re = self.re - c.re
		self.im = self.im - c.im

r = input()
i = input()
n1 = Complex(r,i)
r = input()
i = input()
n2 = Complex(r,i)
n1.sum(n2)
print n1.re
print n1.im
n2.sub(n1)
print n2.re
print n2.im