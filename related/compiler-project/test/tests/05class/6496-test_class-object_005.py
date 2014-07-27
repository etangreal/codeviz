class A(object):
    def __init__( self ):
        self.attr=776
    def func( self ):
        self.attr = self.attr + 1
        print self.attr

class B(object):
    def __init__( self ):
        self.a=A()
    def func( self ):
        self.a.func()

b=B()
b.func()
