#-------------------------------------------------------------------

descs_p25=[]
tests_p25=[]
assrts_p25=[]

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

if( x == 10 ):
    while( True ):
        print 1

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append('''
    ERROR: x == 0 is a bad statement
''')

tests_p25.append('''

x == 0

while( x == 10 ):
    if( x == 10 ):
        x = 1

print x

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append('''
    ERROR: x == 0 is an illegal statement
''')

tests_p25.append('''

while( x == 10 ):
    if( x == 10 ):
        x == 0

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

while( True and x ):
    print 1
    x = 10 + 1 - 11

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

while( c < 9 ):
    c = c + 10

print c

''')

assrts_p25.append("1000")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

b = 0
k = 0
l = 0
z = 0

if ( z == True and k == False ):
    y = 1 + 18
    l = 71 - 7

elif ( False and a == u ):
    z = 9 * 1 + 90 - 4

else:
    b = 1 + 8 + 0
    l = 8 - 1

print b
print k
print l
print z

''')

assrts_p25.append("0\n0\n0\n0")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

print True and True and 1 / 5 and 1 * 8 and 1 + 7 - 65 * 4 + 12 / 8
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

x = 0
y = 0
z = 0
b = 0

if( x == True ):
    y = 0

elif( False ):
    z = 9

else:
    b = 0

print x
print y
print z
print b

''')

assrts_p25.append("0\n0\n9\n0")


