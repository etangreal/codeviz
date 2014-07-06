class Operation:
    def __init__(self, x, y):
        self.x=x
        self.y=y
class Calculator(Operation):
    def addM(self):
        return self.x+self.y
    def subM(self):
        return self.x-self.y
    def mulM(self):
        return self.x*self.y
    def add(self,x,y):
        return x+y
    def sub(self,x,y):
        return x-y
    def mul(self,x,y):
        return x*y

cal=Calculator(10,6)
print cal.addM()
print cal.mulM()
print cal.subM()
print cal.add(10,43)
print cal.mul(1,5)
print cal.sub(5,4)
