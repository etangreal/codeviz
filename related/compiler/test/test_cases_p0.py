
#-------------------------------------------------------------------

descs_p0=[]
tests_p0=[]
assrts_p0=[]

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

print 1

''')

assrts_p0.append("1")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

n0 = 0
n1 = 1
n0 - n1
-n1

''')

assrts_p0.append("")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

n0 = 0
n1 = 1

r0 = n1 - n1

print r0
print -n1

n2=2

''')

assrts_p0.append("0-1")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

n0 = 0
n00=~2+3
bn0 = n00 == n0
print bn0

''')

assrts_p0.append("1")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

n0 = 0
n1 = 1

r0 = n1 - n1
-n1
print r0
print -n1
n1 * 2
n2=2
print n1 * n2
n4 = 4
~3
n00=~2+3
bn0 = n00 == n0
print bn0
nn5=~n4
print ~nn5

''')


assrts_p0.append("0-1214")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = 10
print x

''')

assrts_p0.append("10")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

print 1

''')

assrts_p0.append("1")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''
print 1 + 3 + 5
''')

assrts_p0.append("9")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''
x = ~ 1
print x
''')

assrts_p0.append("-2")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''
x = ~ 1 + 9
print x
''')

assrts_p0.append("7")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''
x = + 3 + 6
print x
''')

assrts_p0.append("9")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''
y = 3
x = + y + 6
print x
''')

assrts_p0.append("9")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''
x = -1
print x
''')

assrts_p0.append("-1")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''
x = -1 + 3
print x
''')

assrts_p0.append("2")

#------------------------------------------------------------------
descs_p0.append("")

tests_p0.append('''
print 1 + 1
''')

assrts_p0.append("2")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''
print 1 - 2 + 3
''')

assrts_p0.append("2")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''
x = 1 + 2
print x
''')

assrts_p0.append("3")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''
x = 1 + 2 + 3
print x
''')

assrts_p0.append("6")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''
x = 1 + 2 + 3 + 4
print x
''')

assrts_p0.append("10")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''
x = 1 - 2
print x
''')

assrts_p0.append("-1")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''
x = 1 + 2 - 3
print x
''')

assrts_p0.append("0")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = 1 - 2 + 3 - 8
print x

''')

assrts_p0.append("-6")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = 1 * 6
print x

''')

assrts_p0.append("6")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = 1 * 6 + 5
print x

''')

assrts_p0.append("11")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = 5 + 1 * 6
print x

''')

assrts_p0.append("11")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = 10 + 7
print x

''')

assrts_p0.append("17")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = 10 - 7
print x

''')

assrts_p0.append("3")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = -10 + 3
print x

''')

assrts_p0.append("-7")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

print 1

x = - 1
print x

''')

assrts_p0.append("1\n-1")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

print 1
x = -1 + 15
print x

''')

assrts_p0.append("1\n14")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

print 1
print 4 - 1

''')

assrts_p0.append("1\n3")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = 1 * 6 - 5 + ~60
print x

''')

assrts_p0.append("-60")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = - 99
y = 55
print x + y

''')

assrts_p0.append("-44")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = 10 -7 * 2
print x

''')

assrts_p0.append("-4")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = ~10
print x

''')

assrts_p0.append("-11")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = +10
print x

''')

assrts_p0.append("10")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = -7
print x

''')

assrts_p0.append("-7")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = 2 + 5
print x

''')

assrts_p0.append("7")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = 2 - 5
print x

''')

assrts_p0.append("-3")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = 2 * 3
print x

''')

assrts_p0.append("6")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

t1 = 3
print t1
print 1
t2 = 1
x = t1 + t2
print x

''')

assrts_p0.append("3\n1\n4")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

a = 1
b = 2
c = 3
e = 4
f = 5
g = 6
x = a + b
print x
q = x + c
print q
a = e + f + q
print a

''')

assrts_p0.append("3\n6\n15")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

a = 1 + 1
b = a + 2
c = a + b
d = a + b + c
print d

''')

assrts_p0.append("12")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

a = 1 + 1
b = a * 2
c = a + b
d = a - b + c
print d

''')

assrts_p0.append("4")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

a = 1 + 1
b = a + 2
c = a + b
d = a + b + c
x = 3 + 2 * 5
print 1
a = 1
print x + d + a

''')

assrts_p0.append("1\n26")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

a = 1 + 1
b = 5 * 2
print b
print 1
b = 1
c = a + b
print c
d = b + a
print d
L = a + b + c + d
print L
s = a + b + c
print s
d = b + a
print d
L = a + b + c - d + L
print L

''')

assrts_p0.append("10\n1\n3\n3\n9\n6\n3\n1\n2")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

t1 = 3
print 1
t2 = 1
x = t2 + t1
print x

''')

assrts_p0.append("1\n4")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

a = 3
b = 4
c = 5
print 1
d = 1
print a
print b
print c
print d

''')

assrts_p0.append("1\n3\n4\n5\n1")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

print 1
t1 = 1
print t1

''')

assrts_p0.append("1\n1")

#------------------------------------------------------------------




