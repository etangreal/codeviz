class Key(object):
	def __init__(self,key):
		self.key = key
		self.cript = key + 5
	def set(self, key):
		self.key = key
		self.cript = key + 5
	def allow(self, key):
		if self.cript == key:
			return True
		else:
			return False
k = input()
key = Key(k)
t = input()
while not key.allow(t):
	print 0
	t = input()
print 1