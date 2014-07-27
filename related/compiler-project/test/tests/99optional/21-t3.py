a = [1, 2, 3, 4, 5]
print a
b = [ 6, 7, 8, 9, 10]
print b
c = a + b
print c
d = True

x = 0
while d:
    if x == len(c)-1:
        d = False
    print c[x]
    x += 1

y = input()
print c[y:]
print c[-y]
