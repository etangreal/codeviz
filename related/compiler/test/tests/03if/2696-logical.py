x = input()
y = input()
if (x != 0 and x != 1):
	x = input()
if (y != 0 and y != 1):
	y = input()
if x == 1:
	x = True
else:
	x = False
if y == 1:
	y = True
else:
	y = False
print x and y
print x or y
print not x
print not y
