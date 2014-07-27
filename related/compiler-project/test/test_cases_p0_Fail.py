#-------------------------------------------------------------------

descs_p0=[]
tests_p0=[]
assrts_p0=[]

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = "1"
print x

''')

assrts_p0.append("1")

#------------------------------------------------------------------

descs_p0.append("ERROR: 'f' is an unknown variable.")

tests_p0.append('''

x = 1 + f
print x

''')

assrts_p0.append("")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = "1 + x"
print x

''')

assrts_p0.append("")

#------------------------------------------------------------------


descs_p0.append("")

tests_p0.append('''

x = "1" 
x = x + 10
print x

''')

assrts_p0.append("")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''
y = 1
x = "1 + x + y"
print x

''')

assrts_p0.append("")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = "1 + f"
print x

''')

assrts_p0.append("")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

f = 3
x = 1 + f
print x

''')

assrts_p0.append("4")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

n0 = 0
n1 = 1
n0 - n1
r0 = n1 - n1
-n1
print r0
print -n1
n1 * 2
n2=2
print n1 * n2
n2/n1
n4 = 4
print 4/n2
print n4/n2
# n1/0
~3
n00=~2+3
bn0 = n00 == n0
print bn0
nn5=~n4
print ~nn5

''')

assrts_p0.append("0-122214")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = 5 + 1 / 6
print x

''')

assrts_p0.append("5")

#------------------------------------------------------------------

descs_p0.append("")

tests_p0.append('''

x = 4 / 3
print x

''')

assrts_p0.append("1")

#------------------------------------------------------------------