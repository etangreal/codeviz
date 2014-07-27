#40

	#Method invocations and mising argumnet
	#TypeError: move() takes exactly 2 arguments (3 given)
	

class Point(object):

	def __init__(self, x, y):
		self.x = x
		self.y = y

	def move(dx, dy):
		self.x = self.x + dx
		self.y = self.y + dy

p = Point(1, 4) 

if p.x < p.y:
	p.move(2,4)

print p.x + p.y
