
#-------------------------------------------------------------------

descs_typen = []
tests_typen = []
assrts_typen = []


#------------------------------------------------------------------

descs_typen.append("")

tests_typen.append('''

x = -1

''')

assrts_typen.append("")

#------------------------------------------------------------------

descs_typen.append("")

tests_typen.append('''
x= - 1
''')

assrts_typen.append("")


#------------------------------------------------------------------

descs_typen.append("")

tests_typen.append('''

x = 1 + 2 + 3
y = 4

if( x < 10 and y < 5 ):
	x = 5

''')

assrts_typen.append("")

#------------------------------------------------------------------

descs_typen.append("")

tests_typen.append('''

x = 10

if(x < 10):
	x = 1

''')

assrts_typen.append("")

#------------------------------------------------------------------

descs_typen.append("")

tests_typen.append('''

x = 10 and 11

''')

assrts_typen.append("")

#------------------------------------------------------------------

descs_typen.append("")

tests_typen.append('''

x = 10 - 11

''')

assrts_typen.append("")

#------------------------------------------------------------------

descs_typen.append("")

tests_typen.append('''

if( True and False ):
	print 1

''')

assrts_typen.append("")

#------------------------------------------------------------------

descs_typen.append("")

tests_typen.append('''

print 1 + 3 + ~5 and True or False

''')

assrts_typen.append("9")

#------------------------------------------------------------------

descs_typen.append("")

tests_typen.append('''

x = ~ 1
print x

''')

assrts_typen.append("-2")

#------------------------------------------------------------------

descs_typen.append("")

tests_typen.append('''

x = ~ 1 + 9
print x

''')

assrts_typen.append("7")

#------------------------------------------------------------------

descs_typen.append("")

tests_typen.append('''

x = + 3 + 6
print x

''')

assrts_typen.append("9")

#------------------------------------------------------------------

descs_typen.append("")

tests_typen.append('''

y = 3
x = + y + 6
print x

''')

assrts_typen.append("9")

#------------------------------------------------------------------





