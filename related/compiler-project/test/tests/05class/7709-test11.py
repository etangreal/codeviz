# class definition and checking same name parameters handling
class Test:
    def __init__(self,x,y):
        self.x = x
        self.y = y
    def add(self):
        return self.x+self.y
    def addExt(self,x,y):
        return x+y
a=Test(10,4000)
print a.add()
x=input()
y=input()
print a.addExt(x,y)
