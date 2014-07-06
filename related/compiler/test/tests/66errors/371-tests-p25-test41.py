#41

	#Constructors and missing the self argument
	#TypeError: __init__() takes exactly 2 arguments (3 given))
	


class Point(object):

	def __init__(dx,dy):
		self.x = x
		self.y = y

	def move(self, dx, dy):
		self.x = self.x + dx
		self.y = self.y + dy

p = Point(1, 4)

if p.x < p.y:
	p.move(2, 1)

print p.x + p.y
