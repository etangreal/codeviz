#-------------------------------------------------------------------

descs_p25=[]
tests_p25=[]
assrts_p25=[]

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

if ( 1 ):
	print 1

	if ( 1 ):
		print 2

		if ( 1 ):
			print 3

''')

assrts_p25.append("1\n2\n3")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

x = not False
print x

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

if ( False ):
	print 33

	if ( True ):
		print 22

	elif(True):
		print 1000

	else:
		print 1

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = 1
b = 2
c = 3
d = 4
e = 5

if ( True and True or False ):
	b = 2

	if ( False ):
		d = 4

	elif( True ):
		d = 44

	else:
		d = 444

	c = 3

elif ( False ):
	b = 22

else:
	b = 222

e = 5

print a
print b
print c
print d
print e

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = 1
b = 2
c = 3
d = 4
e = 5

if ( True ):
	b = 2

	if ( False ):
		d = 4

	elif( True ):
		d = 44

	else:
		d = 444

	c = 3

elif ( False ):
	b = 22

else:
	b = 222

e = 5

print a
print b
print c
print d
print e

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = 1

if ( True ):
	a = 12

print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = 1

if ( True ):
	b = 1

c = 1

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = 1

if ( 1 < 2 ):
	b = 1

c = 1

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = 1

if ( True ):
	b = 2

	if ( False ):
		d = 4
	elif( True ):
		d = 44
	else:
		d = 444

	c = 3

elif ( False ):
	b = 22

else:
	b = 222

e = 5

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = 1

if ( True ):
	b = 2

	if ( False ):
		d = 4

	c = 3

else:
	b = 22

e = 5

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = 1

if ( True ):
	b = 2

	if ( False ):
		d = 4

	c = 3

e = 5

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = 10

if ( 1 < 2 ):
	b = 20

	if ( 3 < 4 ):
		d = 40

	e = 50

c = 30

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = 10

if ( 1 < 2 ):
	b = 20

	if ( 3 < 4 ):
		d = 40

c = 30

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = 10

if ( 1 < 2 ):
	b = 20

if ( 3 < 4 ):
	d = 40

c = 30

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = 1
if ( 1 < 2 ):
	if ( 3 < 4 ):
		if ( 5 < 6 ):
			print 1


''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

if ( 1 > 2 ):
	print 1

else:
	print 2

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

if ( 1 <= 2 ):
	print 1

else:
	print 2

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

if ( 1 >= 2 ):
	print 1

else:
	print 2

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

if ( 1 == 2 ):
	print 1

else:
	print 2

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

if ( 1 != 2 ):
	print 1

else:
	print 2

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True + False
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True + False + True
print a

''')

assrts_p25.append("2")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True or False
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True or True
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True or True or True
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True or True or True or True
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = False or True
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = False or True or True
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True or False or True
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True or True or False
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True or False or False
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = False or False or False
print a

''')

assrts_p25.append("0")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True and True
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True and True and True
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True and True and True and True
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = False and True
print a

''')

assrts_p25.append("0")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True and False
print a

''')

assrts_p25.append("0")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = False and True and True
print a

''')

assrts_p25.append("0")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True and False and True
print a

''')

assrts_p25.append("0")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True and True and False
print a

''')

assrts_p25.append("0")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True and False and False
print a

''')

assrts_p25.append("0")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = False and False and False
print a

''')

assrts_p25.append("0")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = 1 and True
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = 1 and 3
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True and 1 + 4 + 8
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True and 1 + 4 - 8
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True and 1 - 4 - 8
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = 1 and 1 - 4
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = 1 and 1 - 4 + 7
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True or False and True
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True and False or True
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True and False and True
print a

''')

assrts_p25.append("0")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True and False and 1 + 3
print a

''')

assrts_p25.append("0")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True or False or True
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True and True and 1 * 5
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = True and True and 1 / 5 and 1 * 8
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = not True
print a

''')

assrts_p25.append("0")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = not False and True
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a = 1 < 6
print a

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

x = 1 + 7 < 6 + 6
print x

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

x = 1 + 7 != 6 - 6 + 70
print x

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

x = 1 + 7 != 6 - 6 + 70 * 5 / 3
print x

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

y = 0
if( True ):
	y = 1 + 6

print y

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

y = 0
if( True and True ):
	y = 1 + 6

print y

''')

assrts_p25.append("7")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

y = 0
if( True and False ):
	y = 1 + 6

print y

''')

assrts_p25.append("0")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

y = 0
x = 0

if( True ):
	y = 0 + 1

elif( True ):
	x = 10

else:
	x = 0 + 2

print y
print x

''')

assrts_p25.append("1\n10")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

x = 0
y = 0

if( True ):
	x = 1

	if ( False ):
		y = 1
	else:
		y = 2

elif( False ):
	x = 2

else:
	x =  3

print x
print y

''')

assrts_p25.append("1\n2")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

if ( 1 ):
	print 1

	if ( 2 ):
		print 2

		if ( 3 ):
			print 3

''')

assrts_p25.append("1\n2\n3")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

if ( 1 ):
	print 1
	print 11

	if ( 2 ):
		print 2
		print 22

		if ( 3 ):
			print 3
			print 33

''')

assrts_p25.append("1\n11\n2\n22\n3\n33")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

if ( True ):
	print 1
	print 30

	if ( False ):
		print 2
		print 40

''')

assrts_p25.append("")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

z = 1
k = 1
a = 1
u = 1

if ( z == True and k == False ):
	y = 1 + 18
	l = 71 - 7

	if ( True ):
		print 1

elif ( False and a == u ):
	z = 9 * 1 + 90 - 4

else:
	b = 1 + 8 + 0
	l = 8 - 1

print z

''')

assrts_p25.append("")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

if(2 == 1 and True !=False and 3 == 1):
	print 100
else:
	print 1


''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

if( not False):
	print 100


''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

if( True and False ):
	print 1
elif(True):
	print 100
else:
	print 1000

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

if( False ):
	print 1

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

if( not False ):
	print 1

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

if( True ):
	print 1
	print 11

elif( False ):
	print 100
	print 200

else:
	print 10
	print 22

''')

assrts_p25.append("1\n11")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

if( False ):
	print 1
	print 11

elif( True ):
	print 100
	print 200

else:
	print 10
	print 22

''')

assrts_p25.append("100\n200")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

if( True and True and False ):
	print 1
	print 11

elif( False or True and True or False ):
	print 100
	print 200

else:
	print 10
	print 22

''')

assrts_p25.append("1\n11")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

if( True and True and False ):
	print 1
	print 11

elif( False or True and True or False ):
	print 100
	print 200

else:
	print 10
	print 22

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

1 != 6

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("##The boolean literals True | Test succeeds")

tests_p25.append('''print True''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("##The boolean literals True | Test fails ")

tests_p25.append('''print False''')

assrts_p25.append("0")

#------------------------------------------------------------------

descs_p25.append("#The boolean literals false | Test succeeds ")

tests_p25.append('''print False''')

assrts_p25.append("False")

#------------------------------------------------------------------

descs_p25.append("#The boolean literals false | Test fails")

tests_p25.append('''print False''')

assrts_p25.append("True")

#------------------------------------------------------------------

descs_p25.append("#The comparison operators == | Test succeeds")

tests_p25.append('''

x = (2==2)
print x

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("#The comparison operators == | Test fails")

tests_p25.append('''

print (2==2)

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("#The comparison operators != | Test succeeds")

tests_p25.append('''

print (2 != 3)

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("#The comparison operators != | Test fails")

tests_p25.append('''

print (2 != 3)

''')

assrts_p25.append("False")

#------------------------------------------------------------------

descs_p25.append("#The comparison operators < | Test succeeds")

tests_p25.append('''

2 < 3

''')

assrts_p25.append("True")

#------------------------------------------------------------------

descs_p25.append("#The comparison operators < | Test fails")

tests_p25.append('''

2 < 3

''')

assrts_p25.append("False")

#------------------------------------------------------------------

descs_p25.append("#The comparison operators > | Test succeeds")

tests_p25.append('''

5 > 3

''')

assrts_p25.append("True")

#------------------------------------------------------------------

descs_p25.append("#The comparison operators > | Test fails")

tests_p25.append('''

5 > 3

''')

assrts_p25.append("False")

#------------------------------------------------------------------

descs_p25.append("#The comparison operators <= | Test succeeds")

tests_p25.append('''

4 <= 6

''')

assrts_p25.append("True")

#------------------------------------------------------------------

descs_p25.append("#The comparison operators <= | Test fails")

tests_p25.append('''

4 <= 6

''')

assrts_p25.append("False")

#------------------------------------------------------------------

descs_p25.append("#The comparison operators >= | Test succeeds")

tests_p25.append('''

3 >= 7

''')

assrts_p25.append("false")

#------------------------------------------------------------------

descs_p25.append("#The comparison operators >= | Test fails")

tests_p25.append('''

3 >= 7

''')

assrts_p25.append("True")

#------------------------------------------------------------------

descs_p25.append("#The logical operators 'and' | Test succeeds")

tests_p25.append('''

True and True == True

''')

assrts_p25.append("True")

#------------------------------------------------------------------

descs_p25.append("#The logical operators 'and' | Test fails")

tests_p25.append('''

True and True == True

''')

assrts_p25.append("False")

#------------------------------------------------------------------

descs_p25.append("#The logical operators 'or' | Test succeeds")

tests_p25.append('''

True or False == True

''')

assrts_p25.append("True")

#------------------------------------------------------------------

descs_p25.append("#The logical operators 'or' | Test fails")

tests_p25.append('''

True or False == True

''')

assrts_p25.append("False")

#------------------------------------------------------------------

descs_p25.append("#The logical operators 'not'  | Test succeeds")

tests_p25.append('''

not False == True

''')

assrts_p25.append("True")

#------------------------------------------------------------------

descs_p25.append("#The logical operators 'not'  | Test fails")

tests_p25.append('''

not False == True

''')

assrts_p25.append("False")

#------------------------------------------------------------------

descs_p25.append("#if statements| Test succeeds")

tests_p25.append('''

if (True):
	print 1

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("#if statements| Test fails")

tests_p25.append('''

if (True):
	print 1

''')

assrts_p25.append("2")

#------------------------------------------------------------------

descs_p25.append("#if statements, including elif | Test succeeds")

tests_p25.append('''

if (True):
	print 1

elif (False):
	print 2

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("#if statements, including elif | Test fails ")

tests_p25.append('''

if (True):
	print 1

elif (False):
	print 2

''')

assrts_p25.append("2")

#------------------------------------------------------------------

descs_p25.append("#if statements, else clauses  | Test succeeds")

tests_p25.append('''

if (False):
	print 1

else:
	print 2

''')

assrts_p25.append("2")

#------------------------------------------------------------------

descs_p25.append("#if statements, else clauses  | Test fails")

tests_p25.append('''

if (False):
	print 1

else:
	print 2

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("#if statements, including elif and else clauses | Test succeeds")

tests_p25.append('''

if (False):
	print 1

elif(True):
	print 2

else:
	print 3

''')

assrts_p25.append("2")

#------------------------------------------------------------------

descs_p25.append("#if statements, including elif and else clauses | Test fails")

tests_p25.append('''

if (False):
	print 1

elif(True):
	print 2

else:
	print 3

''')

assrts_p25.append("3")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

x = True

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

x = 6
x < 3

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

if(True):
	print 1

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

if( True ):
	print 1

else:
	print 2

''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

if( True ):
	print 1

elif( False ):
	print 20

''')

assrts_p25.append("1")

#------------------------------------------------------------------
