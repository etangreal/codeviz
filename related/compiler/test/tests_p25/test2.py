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