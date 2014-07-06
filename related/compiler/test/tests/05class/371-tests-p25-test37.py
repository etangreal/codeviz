#37

#	Methods and local variable
#	ERROR: dx and dy are not in this scope



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
		self.x = tempx 
		self.y = tempy 

p = Point(1, 4) 

if p.x < p.y:
	p.reset() 

print p.x + p.y