# class definition and checking same name parameters handling
# method invocation inside and outside the class
class Test:
    def __init__(self,x,y):
        self.x = x
        self.y = y
    def add(self):
        return self.x+self.y
    def addExt(self,x,y):
        return x+y
    def addAll(self,x,y):
        z= self.addExt(10,14)
        return z+x+y
a=Test(10,4000)
print a.add()
x=input()
y=input()
print a.addAll(x,y)
