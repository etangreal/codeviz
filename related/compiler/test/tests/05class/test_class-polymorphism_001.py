class A( object ):
    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z
    def func( self ):
        return a.x + a.y + a.z

if True:
    a = A(7, 70, 700)
else:
    a = "abc"
print a.func()


if False:
    a = A(7, 70, 700)
else:
    a = "abc"

print a
