## Josafat Piraquive
## Simon Maurer
##
## branch testcases
##

a = input()
b = input()
c = input()
x = input()
y = input()

## row 1 in out
if x == x:
	print True 
else: 
	print False

## row 2 in out
if x != x:
	print True 
else: 
	print False

## row 3 in out
if x == x:
	print a
elif x < y: 
	print b
else:
    print c

## row 4 in out
if x != x:
	print a
elif x < y: 
	print b
else:
    print c

## row 5 in out
if x != x:
	print a
elif x > y: 
	print b
else:
    print c

## row 6 in out
print True if y != y else False

if x == x:
    print True
