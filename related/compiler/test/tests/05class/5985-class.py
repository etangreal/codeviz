## Josafat Piraquive
## Simon Maurer
##
## class testcases
##

class A:
    def __init__( self ):
        print 0
        self.a = 1
        self.b = 2
clsa = A()
print clsa.a
print clsa.b

class B:
    def __init__( self ):
        print 0
        self.a = 3
        self.b = 4

clsb = B()
print clsb.a
print clsb.b

class C:
    def __init__( self ):
        print 0
        self.a = 5
        self.b = 6

    def print_attr( self ):
        print self.a
        print self.b

    def print_attr_plus( self, c ):
        print self.a
        print self.b
        print c

clsc = C()
clsc.print_attr()
clsc.print_attr_plus(7)

class D:
    def __init__( self, c, d ):
        print 0
        self.a = 8
        self.b = 9
        self.c = c
        self.d = d

    def print_attr_plus( self, a, c ):
        print self.a
        print self.b
        print self.c
        print self.d
        print a
        print c
        return -1

clsd = D(10, 11)
ret = clsd.print_attr_plus( 12, 13 )
print ret
