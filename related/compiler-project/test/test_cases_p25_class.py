#-------------------------------------------------------------------

descs_p25=[]
tests_p25=[]
assrts_p25=[]

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class classA():

    def __init__(self):
        self.a = 1
     

A = classA()
x = A.a + 4

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

#1 check initial variables of classe
class classA():
    def __init__(self):
        self.aa = 1
        self.ab = 0
A=classA()
print A.aa
print A.ab

#2 check if the init of a new class
class classB():
    def __init__(self):
        print 999
B = classB()

#3 check call function in a class
class classC():
    def __init__(self):
        self.ca = 1
    def func1(self):
        print 888
C = classC()
C.func1()

#4 check if a function can read a self.var from the same class 
class classD():
    def __init__(self):
        self.da = 1
    def func1(self):
        print self.da
D = classD()
D.func1()

#5 check if it reads "da" from classE and not from classD
class classE():
    def __init__(self):
        self.da = 2
    def func1(self):
        print self.da
E = classE()
E.func1()

#6 check if it reads the good function
class classF():
    def __init__(self):
        self.fa = 1
        self.fb = 2
    def func1(self):
        print self.fa
    def func2(self):
        print self.fb
F = classF()
F.func1()
F.func2()

#7 check if it reads "da" from classE and not from classD
class classG():
    def __init__(self,in1):
        self.ga = in1
    def func1(self):
        print self.ga
G = classG(5)
G.func1()

#8 check if it reads "da" from classE and not from classD
class classH():
    def __init__(self,in1,in2):
        self.ha = in1
        self.hb = in2
    def func1(self):
        print self.ha
        print self.hb
H = classH(1,2)
H.func1()

#9
class classI():
    def __init__(self):
        self.ia = 1
        self.ib = 2
I1 = classI()
I2 = classI()
print I1.ia
print I2.ib 

#10
class classJ():
    def __init__(self,in1):
        self.ja = in1
    def func1(self):
        print self.ja
J1 = classJ(1)
J2 = classJ(2)
J1.func1()
J2.func1() 

class classK():
    def __init__(self):
        self.ka = 1
    def func1(self):
        return self.ka
K = classK()
print K.func1()


''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class classA():
    def __init__(self):
        self.aa = 1
        self.ab = 0
A=classA()
print A.aa
print A.ab

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class classB():
    def __init__(self):
        print 999
B = classB()

''')

assrts_p25.append("1")



#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class classC():
    def __init__(self):
        self.ca = 1
    def func1(self):
        print 888
C = classC()
C.func1()

''')

assrts_p25.append("1")



#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class classF():
    def __init__(self):
        self.fa = 1
        self.fb = 2
    def func1(self):
        print self.fa
    def func2(self):
        print self.fb
F = classF()
F.func1()
F.func2()

''')

assrts_p25.append("1")



#------------------------------------------------------------------


descs_p25.append("")

tests_p25.append('''

class classE():
    def __init__(self):
        self.da = 2
    def func1(self):
        print self.da
E = classE()
E.func1()


''')

assrts_p25.append("1")



#------------------------------------------------------------------


descs_p25.append("")

tests_p25.append('''

class classJ():
    def __init__(self,in1):
        self.ja = in1
    def func1(self):
        print self.ja
J1 = classJ(1)
J2 = classJ(2)
J1.func1()
J2.func1() 
''')

assrts_p25.append("1")



#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class classD():
    def __init__(self):
        self.da = 1
    def func1(self):
        print self.da
D = classD()
D.func1()

''')

assrts_p25.append("1")



#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class classD():
    def __init__(self):
        self.da = 1
    def func1(self):
        print self.da
D = classD()
D.func1()

''')

assrts_p25.append("1")



#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class classD():
    def __init__(self):
        self.da = 1
    def func1(self):
        print self.da
D = classD()
D.func1()

''')

assrts_p25.append("1")



#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''


#1 check initial variables of classe
class classA():
    def __init__(self):
        self.aa = 1
        self.ab = 0
A=classA()
print A.aa
print A.ab

#2 check if the init of a new class
class classB():
    def __init__(self):
        print 999
B = classB()

#3 check call function in a class
class classC():
    def __init__(self):
        self.ca = 1
    def func1(self):
        print 888
C = classC()
C.func1()

#4 check if a function can read a self.var from the same class 
class classD():
    def __init__(self):
        self.da = 1
    def func1(self):
        print self.da
D = classD()
D.func1()

#5 check if it reads "da" from classE and not from classD
class classE():
    def __init__(self):
        self.da = 2
    def func1(self):
        print self.da
E = classE()
E.func1()

#6 check if it reads the good function
class classF():
    def __init__(self):
        self.fa = 1
        self.fb = 2
    def func1(self):
        print self.fa
    def func2(self):
        print self.fb
F = classF()
F.func1()
F.func2()

#7 check if it reads "da" from classE and not from classD
class classG():
    def __init__(self,in1):
        self.ga = in1
    def func1(self):
        print self.ga
G = classG(5)
G.func1()

#8 check if it reads "da" from classE and not from classD
class classH():
    def __init__(self,in1,in2):
        self.ha = in1
        self.hb = in2
    def func1(self):
        print self.ha
        print self.hb
H = classH(1,2)
H.func1()

#9
class classI():
    def __init__(self):
        self.ia = 1
        self.ib = 2
I1 = classI()
I2 = classI()
print I1.ia
print I2.ib 

#10
class classJ():
    def __init__(self,in1):
        self.ja = in1
    def func1(self):
        print self.ja
J1 = classJ(1)
J2 = classJ(2)
J1.func1()
J2.func1() 

class classK():
    def __init__(self):
        self.ka = 1
    def func1(self):
        return self.ka
K = classK()
print K.func1()


''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):
    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(1, 1)
z = 5 + p.x
print(z)
''')

assrts_p25.append("1")


#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):

    def getX(self):
        return 1 

p = Point()
print 1

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):

    def __init__(self):
        x = 1

    def getX(self):
        return 1 

p = Point()
print p.getX()

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Rectangle(object):

    def __init__(self,height,width):
        self.h=height
        self.w=width

    def area(self):
        h=self.h
        w=self.w
        a = h*w
        return a
      
    def toSquare(self):
        self.w=self.h

    def increase(self,dh,dw):
        self.h=self.h+dh
        self.w=self.w+dw

r = Rectangle(1,1)
print r.area()

r2 = Rectangle(2,2)
twice = 2 * r2.h

if r2.h <= twice:
    r2.increase(1,1)

print r2.area()

''')

assrts_p25.append("1")

#------------------------------------------------------------------

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):

    def __init__(self,x):
        self.x_ = x

    def getX(self):
        return 1 


p = Point(1)
print p.getX()

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):

    def __init__(self,x):
        self.x_ = x

    def getX(self):
        return 1 


p = Point(1)
print p.x_

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):

    def __init__(self):
        x = 1

    def getX(self):
        return 1 


p = Point()
print p.getX()

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Rectangle(object):
    def __init__(self,height,width):
        self.h=height
        self.w=width
    def area(self):
        h=self.h
        w=self.w
        a = h*w
      
    def toSquare(self):
        self.w=self.h
    def increase(self,dh,dw):
        self.h=self.h+dh
        self.w=self.w+dw

r = Rectangle(1,1)

r2 = Rectangle(2,2)
twice = 2 * r2.h
while r2.h <= twice:
    r2.increase(1,1)


''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''


class Point:
    
    def __init__(self, x, y):
        self.x_ = x
        self.y_ = y

    def move(self,dx,dy):
        self.x_ = self.x_ + dx
        self.y_ = self.y_ + dy

p = Point(1,4)
p.move(2,3)
print p.x_
print p.y_
if p.x_ > p.y_:
    print 100
else:
    print 1

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''


class Point(object):
    
    def __init__(self, x, y):
        self.x_ = x
        self.y_ = y

    def move(self,dx,dy):
        self.x_ = self.x_ + dx
        self.y_ = self.y_ + dy

p = Point(1,4)
p.move(2,3)
print p.x_
print p.y_
if p.x_ > p.y_:
    print 100
else:
    print 1

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''


class Point(object):
    
    def __init__(self, x, y):
        self.x_ = x
        self.y_ = y

    def move(self,dx,dy):
        self.x_ = self.x_ + dx
        self.y_ = self.y_ + dy

p = Point(1,4)
p.move(2,3)
if p.x_ > p.y_:
    print 100

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):

    def __init__(self, x):
        self.x = x

    def move(self,dx):
        self.x = self.x + dx 
 
p = Point(1)
print p.x

p.move(2)
print p.x

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):

    def __init__(self, x):
        self.x_ = x
       
p = Point(1)
print p.x_

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''


class Point(object):
    
    def __init__(self, x, y):
        self.x_ = x
        self.y_ = y

    def move(self,dx,dy):
        self.x_ = self.x_ + dx
        self.y_ = self.y_ + dy

p = Point(1,4)
p.move(2,3)



''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):
    
    def __init__(self, x, y):
        self.x_ = x
        self.y_ = y
       
    

p = Point(1,2)
print p.x_
print p.y_



''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):
    
    def __init__(self, x):
        self.x_ = x


p = Point(1)
print p.x_

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):
    
    def __init__(self, x, y):
        self.x_ = x
        self.y_ = y

    def move(self,dx,dy):
        self.x_ = self.x_ + dx
        self.y_ = self.y_ + dy

p = Point(1,4)
p.move(2,3)

''')

assrts_p25.append("1")

#------------------------------------------------------------------
descs_p25.append("")

tests_p25.append('''

class Point(object):
    
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def move(self,dx,dy):
        self.x = self.x + dx
        self.y = self.y + dy

p = Point(1,4)

while p.x < p.y:
    p.move(2,1)

print p.x + p.y




''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''
class Point(object):
    
    def __init__(self, x):

        self.x_ = x
        self.y_ = self.x_
p = Point(1,4)

while p.x < p.y:
    p.move(2,1)

print p.x + p.y
''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):
    
    x_ = 1

    def __init__(self, x):

        self.x_ = x
        self.y_ = self.x_

    y_ = 1

    if (x_ > y_):
        x_ = y_

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

x = 1
y = x + 1

class A(object):
    
    x = 1

    def __init__(self, x):

        self.x_ = x
        self.y_ = self.x_

class B(object):
    
    x = 1

    def __init__(self, x):

        self.x_ = x
        self.y_ = self.x_

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):
    
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def move(self,dx,dy):
        self.x = self.x + dx
        self.y = self.y + dy

p = Point(1,4)

while p.x < p.y:
    p.move(2,1)

print p.x + p.y

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):
    pass

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point:
    pass

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):
    x = 10 + 11
    
    def __init__(self):
        pass

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):
    x = 10
    
    def __init__(self):
        pass

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):
    
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def move(self,dx,dy):
        self.x = self.x + dx
        self.y = self.y + dy

p = Point(1,4)

while p.x < p.y:
    p.move(2,1)

print p.x + p.y

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point:
    
    def __init__(self):
        pass

''')

assrts_p25.append("1")


#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):
    x = 10 - 10 - 5
    y = 3 + 15 -7

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):

    def __init__(self, x, y):
        self.x = x
        self.y = y

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):

    s = 1
    def __init__(self, x , y, z=0):
        self.x = x + 10
        self.y = y - 100

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):

    s = 1 + 10 - 11

    def __init__(self, x, y):
        self.x = x + 10
        self.y = y + 6

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def move(self,dx,dy):
        self.x = self.x + dx
        self.y = self.y + dy

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def move(self,dx):
        return 10 + 11

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):

    def move(self,dx):
        return dx

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):

    def move(self,dx):
        return dx + 1

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):

    def move(self):
        return 1

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):

    def move(self):
        print 1

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):

    def __init__(self, x, y):
        self.x = x + 100
        self.y = y - 10

p = Point(0,0)

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):

    def __init__(self, x, y):
        self.x = x + 100
        self.y = y - 10

p = Point(x,*y)

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):

    def move(self,dx):
        return dx

p = Point()

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

class Point(object):

    def move(self,dx):
        return dx

p = Point()
p.move(1)

''')

assrts_p25.append("1")

#------------------------------------------------------------------


descs_p25.append("")

tests_p25.append('''

class Point(object):

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def move(self,dx,dy):
        self.x = self.x + dx
        self.y = self.y + dy

p = Point(1,4)

while p.x < p.y:
    p.move(2,1)

print p.x + p.y

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("#class definitions | Test succeeds ")

tests_p25.append('''

class Point(object):

    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(1, 4) 
print p.x + p.y

''')

assrts_p25.append("5")

#------------------------------------------------------------------

descs_p25.append("#class definitions | Test fails ")

tests_p25.append('''

class Point(object):

    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(1, 4)
print p.x + p.y

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("#Methods | Test succeeds")

tests_p25.append('''

class Point(object):

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def move(self, dx, dy):
        self.x = self.x + dx
        self.y = self.y + dy

p = Point(1, 4)

while p.x < p.y:
    p.move(2, 1)

print p.x + p.y

''')

assrts_p25.append("14")

#------------------------------------------------------------------

descs_p25.append("#Methods | Test fails")

tests_p25.append('''

class Point(object):

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def move(self, dx, dy):
        self.x = self.x + dx
        self.y = self.y + dy

p = Point(1, 4)

while p.x < p.y:
    p.move(2, 1)

print p.x + p.y

''')

assrts_p25.append("4")

#------------------------------------------------------------------

descs_p25.append('''
#   Methods and local variable
#   NameError: global name 'dx' is not defined
''')

tests_p25.append('''

class Point(object):

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def move(self, dx, dy):
        self.x = self.x + dx
        self.y = self.y + dy

    def reset(self):
        tempx = 0
        tempy = 1
        self.x = tempx + dx
        self.y = tempy + dy

p = Point(1, 4)

if p.x < p.y:
    p.reset() 

print p.x + p.y

''')

assrts_p25.append("")

#------------------------------------------------------------------

descs_p25.append('''
#   Methods and local variable
#   ERROR: dx and dy are not in this scope
'''
)

tests_p25.append('''

class Point(object):

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def move(self, dx, dy):
        self.x = self.x + dx
        self.y = self.y + dy

    def reset(self):
        tempx = 0
        tempy = 1
        self.x = tempx 
        self.y = tempy 

p = Point(1, 4) 

if p.x < p.y:
    p.reset() 

print p.x + p.y

''')

assrts_p25.append("")

#------------------------------------------------------------------

descs_p25.append('''
    # Method invocations and undefind method
    # NameError: name 'move' is not defined
''')

tests_p25.append('''

class Point(object):

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def move(self, dx, dy):
        self.x = self.x + dx
        self.y = self.y + dy

p = Point(1, 4) 

if p.x < p.y:
    move(2, 1) 

print p.x + p.y

''')

assrts_p25.append("")

#------------------------------------------------------------------

descs_p25.append('''
    # Method invocations and mising argument
    # TypeError: move() takes exactly 3 arguments (2 given)
''')

tests_p25.append('''

class Point(object):

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def move(self, dx, dy):
        self.x = self.x + dx
        self.y = self.y + dy

p = Point(1, 4)

if p.x < p.y:
    p.move(2) 

print p.x + p.y

''')

assrts_p25.append("ERROR: move has 2 arguments")

#------------------------------------------------------------------

descs_p25.append('''
    # Method invocations and mising argumnet
    # TypeError: move() takes exactly 2 arguments (3 given)
''')

tests_p25.append('''

class Point(object):

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def move(dx, dy):
        self.x = self.x + dx
        self.y = self.y + dy

p = Point(1, 4) 

if p.x < p.y:
    p.move(2,4)

print p.x + p.y

''')

assrts_p25.append("")

#------------------------------------------------------------------

descs_p25.append('''
    # Constructors and missing the self argument
    # TypeError: __init__() takes exactly 2 arguments (3 given))
''')

tests_p25.append('''

class Point(object):

    def __init__(dx,dy):
        self.x = x
        self.y = y

    def move(self, dx, dy):
        self.x = self.x + dx
        self.y = self.y + dy

p = Point(1, 4)

if p.x < p.y:
    p.move(2, 1)

print p.x + p.y

''')

assrts_p25.append("")

#------------------------------------------------------------------

descs_p25.append("#Object allocation and mising object")

tests_p25.append('''

class Point():

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def move(self, dx, dy):
        self.x = self.x + dx
        self.y = self.y + dy

p = Point(1, 4)

if p.x < p.y:
    p.move(2, 1)

print p.x + p.y

''')

assrts_p25.append("")

#------------------------------------------------------------------

descs_p25.append('''
    # Fields has not been initialized
    # AttributeError: 'Point' object has no attribute 'x'
''')

tests_p25.append('''

class Point(object):

    def __init__(self, x, y):       
        self.y = y

    def move(self, dx, dy):
        self.x = self.x + dx
        self.y = self.y + dy

p = Point(1, 4) 

if p.x < p.y:
    p.move(2, 1)

print p.x + p.y

''')

assrts_p25.append("")

#------------------------------------------------------------------

descs_p25.append("#return statements | Test succeeds")

tests_p25.append('''

class Point(object):

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def move(self, dx, dy):
        self.x = self.x + dx
        self.y = self.y + dy

    def value_x(self):
        return self.x

    def value_y(self):
        return self.y

p = Point(1, 4)
print p.value_x()

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("#return statements | Test fails")

tests_p25.append('''

class Point(object):

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def move(self, dx, dy):
        self.x = self.x + dx
        self.y = self.y + dy

    def value(self):
        if self.x < self.y: 
            return self.x

        else:
            return self.y

p = Point(1, 4) 
print p.value()

''')

assrts_p25.append("4")

#------------------------------------------------------------------

descs_p25.append('''
    # return statements :It is illegal for a return statement to appear outside a method.
    # SyntaxError: 'return' outside function
''')

tests_p25.append('''

class Point(object):

    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    return True

p = Point(1, 4)

''')

assrts_p25.append("")

#------------------------------------------------------------------

descs_p25.append('''
    # return f=statements:
    # TypeError: __init__() should return None, not 'bool'.
''')

tests_p25.append('''

class Point(object):

    def __init__(self, x, y):
        self.x = x
        self.y = y
        return True

p = Point(1, 4)

''')

assrts_p25.append("")

#------------------------------------------------------------------

descs_p25.append("#Polymorphism | Test succeeds")

tests_p25.append('''

class Point(object):

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def m(self):
        return self.x

p = Point(2, 4)
print p.m()

p = 1
print p

''')

assrts_p25.append("2\n1")

#------------------------------------------------------------------

descs_p25.append("#Polymorphism | Test fails")

tests_p25.append('''

class Point(object):

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def m(self):
        return self.x

p = Point(2, 4)
print p.m()

p = 1
print p

''')

assrts_p25.append("1\n1")

#------------------------------------------------------------------

descs_p25.append("#Polymorphism | Test fails")

tests_p25.append('''

class Rectangle(object):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width*self.height

class Circle(object):
    def __init__(self, ray):
        self.ray = ray

    def area(self):
        return (2*self.ray)*3.14


r = Rectangle(5, 7)
c = Circle(5)

print r.area()
print c.area()


''')

assrts_p25.append("1\n1")

#------------------------------------------------------------------


descs_p25.append("#Polymorphism | Test fails")

tests_p25.append('''



''')

assrts_p25.append("1\n1")

#------------------------------------------------------------------


descs_p25.append("#Polymorphism | Test fails")

tests_p25.append('''




''')

assrts_p25.append("1\n1")

#------------------------------------------------------------------


descs_p25.append("#Polymorphism | Test fails")

tests_p25.append('''

class Node:
    def __init__(self,value, child):
        self.value = value
        self.child = child
        
    def getValue(self):
        n = self
        return n.value
        
    def getChild(self):
        n = self
        return self.child
        
    def changeChild(self,newChild):
        n= self
        n.child = newChild

        def printPathFrom(self):
                n = self
                while n != None:
                        print n.getValue()
                        n=n.getChild()
                                

node5 = Node(5,None)        
node4 = Node(4,node5)
node3 = Node(3,None)
node2 = Node(2,node3)   
node1 = Node(1,node2)

node3.changeChild(node4)

node1.printPathFrom()
node4.printPathFrom()
    
        
        



''')

assrts_p25.append("1\n1")

#------------------------------------------------------------------


descs_p25.append("#Polymorphism | Test fails")

tests_p25.append('''
class Test:
    def __init__(self, value):
        self.value = value
    def changeValue(self, newValue):
        self.value = newValue
        
        
newTest = Test(2)

newTest.changeValue(input())
    




''')

assrts_p25.append("1\n1")

#------------------------------------------------------------------


descs_p25.append("#Polymorphism | Test fails")

tests_p25.append('''

class Rectangle(object):
    def __init__(self,height,width):
        self.h=height
        self.w=width
    def area(self):
        h=self.h
        w=self.w
        a = h*w
        return a
    def toSquare(self):
        self.w=self.h
    def increase(self,dh,dw):
        self.h=self.h+dh
        self.w=self.w+dw

r = Rectangle(1,1)
print r.area()
r2 = Rectangle(2,2)
twice = 2 * r2.h
while r2.h <= twice:
    r2.increase(1,1)
print r2.area()



''')

assrts_p25.append("1\n1")

#------------------------------------------------------------------


descs_p25.append("#Polymorphism | Test fails")

tests_p25.append('''

class Point(object):

    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(1, 4) 
print p.x + p.y
''')

assrts_p25.append("1\n1")

#------------------------------------------------------------------


descs_p25.append("#Polymorphism | Test fails")

tests_p25.append('''

class Point(object):

    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(1, 4) 
print p.x + p.y


''')

assrts_p25.append("1\n1")

#------------------------------------------------------------------


descs_p25.append("#Polymorphism | Test fails")

tests_p25.append('''

#34
#Methods | Test succeeds


class Point(object):

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def move(self, dx, dy):
        self.x = self.x + dx
        self.y = self.y + dy

p = Point(1, 4)

while p.x < p.y:
    p.move(2, 1)

print p.x + p.y

''')

assrts_p25.append("1\n1")

#------------------------------------------------------------------


descs_p25.append("#Polymorphism | Test fails")

tests_p25.append('''




''')

assrts_p25.append("1\n1")

#------------------------------------------------------------------


descs_p25.append("#Polymorphism | Test fails")

tests_p25.append('''




''')

assrts_p25.append("1\n1")

#------------------------------------------------------------------


descs_p25.append("#Polymorphism | Test fails")

tests_p25.append('''



''')

assrts_p25.append("1\n1")

#------------------------------------------------------------------





