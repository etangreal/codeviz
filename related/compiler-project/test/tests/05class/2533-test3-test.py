#!/usr/bin/env python2.7

class Point(object):
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def move(self, dx, dy):
        self.x = self.x + dx
        self.y = self.y + dy
z = input()
p = Point(1, 1)
if(p.x == z):
    print(1)
else:
    print(0)



