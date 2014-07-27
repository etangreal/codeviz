class Rectangle(object):
    def __init__(self,height,width):
        self.h=height
        self.w=width
    def area(self):
        h=self.h
        w=self.w
        a = h*w
        return a
    def toSquare(self):
        self.w=self.h
    def increase(self,dh,dw):
        self.h=self.h+dh
        self.w=self.w+dw

r = Rectangle(1,1)
print r.area()
r2 = Rectangle(2,2)
twice = 2 * r2.h
while r2.h <= twice:
    r2.increase(1,1)
print r2.area()
