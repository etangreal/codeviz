class A( object ):
    def __init__(self):
        pass
    def func( self, var ):
        self.var = var
        return self.var

a=True
if a: print a

a=A()
print a.func("abc")

a=777
print a

a=None
if not a: print "ok"
