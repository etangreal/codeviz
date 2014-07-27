#49
#Polymorphism | Test fails

class Point(object):

	def __init__(self, x, y):
		self.x = x
		self.y = y

	def m(self):
		return self.x

p = Point(2, 4)
print p.m()

p = 1
print p