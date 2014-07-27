#43

	#Fields has not been initialized
	#AttributeError: 'Point' object has no attribute 'x'
	

class Point(object):

	def __init__(self, x, y):		
		self.y = y

	def move(self, dx, dy):
		self.x = self.x + dx
		self.y = self.y + dy

p = Point(1, 4) 

if p.x < p.y:
	p.move(2, 1)

print p.x + p.y