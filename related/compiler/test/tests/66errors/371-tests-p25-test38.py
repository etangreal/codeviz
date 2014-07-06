#38

	#Method invocations and undefind method
	#NameError: name 'move' is not defined
	


class Point(object):

	def __init__(self, x, y):
		self.x = x
		self.y = y

	def move(self, dx, dy):
		self.x = self.x + dx
		self.y = self.y + dy

p = Point(1, 4) 

if p.x < p.y:
	move(2, 1) 

print p.x + p.y