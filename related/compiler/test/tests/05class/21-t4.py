class Rectangle(object):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width*self.height

class Circle(object):
    def __init__(self, ray):
        self.ray = ray

    def area(self):
        return (2*self.ray)*3.14


r = Rectangle(5, 7)
c = Circle(5)

print r.area()
print c.area()
