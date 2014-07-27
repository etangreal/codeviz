

class Point(object):
    
    x = 2

    def __init__(self, x):
    	print "__init__"
        self.x_ = x
        self.y_ = self.x_

    y = 1

    if (x > y):
    	print "x > y"
        x = y

    def test(self):
    	print "test"

p = Point(3)
p.test()

	# class Point:

	# 	x_ = 1

	# 	def __init__ (self, x, y):
	# 		self.x_ = x
	# 		self.y_ = y

	# 	def move(self,dx,dy):
	# 		self.x_ = self.x_ + dx
	# 		self.y_ = self.y_ + dy

	# 	def getX(self):
	# 		return self.x_

	# p = Point(2,4)

	# x = p.getX()

	# if( p.x_ < p.y_ ):
	# 	p.move(2,1)

	# print p.x_ + p.y_