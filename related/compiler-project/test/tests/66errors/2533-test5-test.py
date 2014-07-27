#!/usr/bin/env python2.7

class Point(object):
    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(1, 1)
z = 5 + p
print(z)

