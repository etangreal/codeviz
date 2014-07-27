#testing polymorphism variable overloading
class Point(object):
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def move(self, dx, dy):
        self.x = self.x + dx
        self.y = self.y + dy
if input():
    p = Point(3, 10)
    print p.x
    print p.y
else:
    p = 3
    print p
