class A(object):
    def __init__( self ):
        self.attr=776
    def func( self ):
        self.attr = self.attr + 1
        print self.attr

a=A()
a.func()
