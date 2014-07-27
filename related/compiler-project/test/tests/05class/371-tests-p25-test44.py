#44
#return statements | Test succeeds


class Point(object):

	def __init__(self, x, y):
		self.x = x
		self.y = y

	def move(self, dx, dy):
		self.x = self.x + dx
		self.y = self.y + dy

	def value_x(self):
		return self.x

	def value_y(self):
		return self.y

p = Point(1, 4) 
print p.value_x()