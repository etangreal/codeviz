class A(object):
    def __init__( self ):
        self.attr=776
    def func( self ):
        print self.attr

class B(object):
    def __init__( self ):
        self.attr=777
    def func( self ):
        print self.attr


class C(object):
    def __init__( self ):
        self.attr=778
    def func( self ):
        print self.attr


a=A()
a.func()
b=B()
b.func()
c=C()
c.func()
