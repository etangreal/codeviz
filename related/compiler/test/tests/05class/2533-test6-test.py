#!/usr/bin/env python2.7

class Point3d(object):
    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z

    def getX(self):
        return(self.x)

class Point2d(Point3d):
    def __init__(self, x, y):
        super(Point2d, self).__init__(x, y, None)

    def getFirstCoordinate(self):
        return Point3d.getX(self)

p = Point2d(1, 1)
z = p.getFirstCoordinate()
p = z
print(p)

