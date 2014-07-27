#39

	#Method invocations and mising argument
	##TypeError: move() takes exactly 3 arguments (2 given)
	


class Point(object):

	def __init__(self, x, y):
		self.x = x
		self.y = y

	def move(self, dx, dy):
		self.x = self.x + dx
		self.y = self.y + dy

p = Point(1, 4)

if p.x < p.y:
	p.move(2)

print p.x + p.y
