n1 = 0
n2 = 1
m = input()
print n1
print n2
for x in range(0, m):
	n3 = n1 + n2
	print n3
	n1 = n2
	n2 = n3
