#36

#	Methods and local variable
#	NameError: global name 'dx' is not defined



class Point(object):

	def __init__(self, x, y):
		self.x = x
		self.y = y

	def move(self, dx, dy):
		self.x = self.x + dx
		self.y = self.y + dy

	def reset(self):
		tempx = 0
		tempy = 1
		self.x = tempx + dx
		self.y = tempy + dy

p = Point(1, 4)

if p.x < p.y:
	p.reset() 

print p.x + p.y