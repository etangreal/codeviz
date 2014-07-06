#46

	#return statements :It is illegal for a return statement to appear outside a method.
	#SyntaxError: 'return' outside function


class Point(object):
	def __init__(self, x, y):
		self.x = x
		self.y = y
	
	return True


p = Point(1, 4)