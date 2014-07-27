#45
#return statements | Test fails

class Point(object):

	def __init__(self, x, y):
		self.x = x
		self.y = y

	def move(self, dx, dy):
		self.x = self.x + dx
		self.y = self.y + dy

	def value(self):
		if self.x < self.y: 
			return self.x
		else:
			return self.y

p = Point(1, 4) 
print p.value()