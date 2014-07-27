#47

	#return f=statements:
	#TypeError: __init__() should return None, not 'bool'.
	


class Point(object):

	def __init__(self, x, y):
		self.x = x
		self.y = y
		return True

p = Point(1, 4)