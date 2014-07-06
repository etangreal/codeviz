#34
#Methods | Test succeeds


class Point(object):

	def __init__(self, x, y):
		self.x = x
		self.y = y

	def move(self, dx, dy):
		self.x = self.x + dx
		self.y = self.y + dy

p = Point(1, 4)

while p.x < p.y:
	p.move(2, 1)

print p.x + p.y