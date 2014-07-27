class Test:
	def __init__(self, value):
		self.value = value
	def changeValue(self, newValue):
		self.value = newValue
		
		
newTest = Test(2)

newTest.changeValue(input())
	
