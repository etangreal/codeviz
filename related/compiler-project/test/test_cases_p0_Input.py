#-------------------------------------------------------------------

descs_p0=[]
tests_p0=[]
assrts_p0=[]

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = input()
print x

''')

assrts_p0.append("1")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = input()

''')

assrts_p0.append("1")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = input() + 1

''')

assrts_p0.append("2")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = input() - 1

''')

assrts_p0.append("0")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = - input()
print x + input()

''')

assrts_p0.append("1\n1")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

print 1
x = input()
print x

''')

assrts_p0.append("1\n1")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = - input()
x = x + input()
print x

''')

assrts_p0.append("0")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

print 1
print input()

''')

assrts_p0.append("1\n1")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

print 1
print -input()

''')

assrts_p0.append("1\n-1")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

print 1
x = - input()
print x

''')

assrts_p0.append("1\n-1")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

print 1
x = - input() + 15
print x

''')

assrts_p0.append("1\n14")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

print 1
print 4 - input()

''')

assrts_p0.append("1\n3")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

t1 = 3
print t1
print 1
t2 = input()
x = t1 + t2
print x

''')

assrts_p0.append("3\n1\n1\n4")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

a = 1 + 1
b = a + 2
c = a + b
d = a + b + c
x = 3 + 2 * 5
print 1
a = input()
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
b = input()
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

assrts_p0.append("10\n1\n3\n3\n9\n6\n3\n3")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

t1 = 3
print 1
t2 = input()
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
d = input()
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
t1 = input()
print t1

''')

assrts_p0.append("1\n1")

#------------------------------------------------------------------






