
#-------------------------------------------------------------------

descs = []
tests = []
assrts = []

#------------------------------------------------------------------

descs.append("")

tests.append('''

x = 10
while(x and True):
	x = x - 1
	print x

''')

assrts.append("9\n8\n7\n6\n5\n4\n3\n2\n1\n0")

#------------------------------------------------------------------

descs.append("")

tests.append('''

x = True
y = True

while(x and y):
	print 100
	x = False


	if ( True ):
		print 33

		if ( True ):
			print 22
			x  = True
			while(x and y):
				print 1
				x = 0
				y = 0

		elif(True):
			print 1000

		else:
			print 1

''')

assrts.append("1")

#------------------------------------------------------------------

descs.append("")

tests.append('''

x = True
y = True

while(x and y):
	print 100
	x = False

''')

assrts.append("1")

#------------------------------------------------------------------

descs.append("")

tests.append('''

if ( True ):
	print 1

	if ( False ):
		print 2

		x = 1
		while x < 3:
			print 100
			x = x + 1

			while False:
				print 200

				while True:
					print 1000

					if True:
						print 300

					elif False:
						print 20

					elif True:
						print 33
						print 30

					else:
						print 400

	elif False:
		print 1

	elif True:
		print 12
		print 120

elif( False ):
	if ( False ):
		print 2

		y = 5
		while y > 3:
			print 100
			y = y - 1
else:
	print 1

''')

assrts.append("1\n100\n120")

#------------------------------------------------------------------

descs.append("")

tests.append('''

x = 1

while( False ):
	print 1
	x = 2

print 1000

''')

assrts.append("1000")

#------------------------------------------------------------------

descs.append("")

tests.append('''

x = 100

while( x ):
	x = 10
	print 100
	x = 0

print 1

''')

assrts.append("100\n1")

#------------------------------------------------------------------

descs.append("")

tests.append('''

c = 0

while( not True ):
	c = 1 + 10

print c

''')

assrts.append("0")

#------------------------------------------------------------------

descs.append("")

tests.append('''

x = 1

while( x < 2 ):
	if( True ):
		print 1
		x = x + 1

''')

assrts.append("")

#------------------------------------------------------------------

descs.append("")

tests.append('''

a = 1
l = 1

while( True and a == l ):
	a = 2
	print a

''')

assrts.append("2")

#------------------------------------------------------------------

descs.append("")

tests.append('''

x = 0

while( True and x < 15 ):
	print 1
	x = 10 + x

''')

assrts.append("1\n1\n")

#------------------------------------------------------------------

descs.append("")

tests.append('''

while( True and False ):
	print 2
	x = 10 + 1 - 11
	print x

print 1

''')

assrts.append("1")

#------------------------------------------------------------------

descs.append("")

tests.append('''

c = 18

while( True and False or c == 18 ):
	print 1
	x = 10 + 1 - 11
	c = 10

''')

assrts.append("1")


#------------------------------------------------------------------

descs.append("")

tests.append('''

x = 10

while( x == 10 ):
	if( x == 10 ):
		x = 0

''')

assrts.append("1")

#------------------------------------------------------------------

descs.append("")

tests.append('''

while( not True ):
	if( not y == 10 ):
		x = 6 * 12
		y = 3 - 5

''')

assrts.append("1")

#------------------------------------------------------------------

descs.append("")

tests.append('''

x = 1
y = 0

while( x == 10 and not y and True == False or x < 4 ):
	if( y == 10 and False ):
		x = 6 * 12
		y = 3 - 5
	x = x + 1

''')

assrts.append("1")

#------------------------------------------------------------------

descs.append("#while statements | Test succeeds ")

tests.append('''

x = 1

while( x ):
	print 4
	x = 0

''')

assrts.append("4")

#------------------------------------------------------------------

descs.append("#while statements | Test fails ")

tests.append('''

while( False ):
	print 4

''')

assrts.append("0")

#------------------------------------------------------------------
