# Polymorphism method overriding
class XX(object):
    def __init__(self,x):
        self.x=x
    def add(self,x,y):
        return x+y

class YY(XX):
    def __init__(self,x,y):
        self.x=x
        self.y=y
    def add(self,x,y,z):
        return x+y+z
    def getX(self):
        return self.x
    def getY(self):
        return self.y

a=YY(10,13)
print a.getX()
print a.getY()
print a.add(10,10,10)
