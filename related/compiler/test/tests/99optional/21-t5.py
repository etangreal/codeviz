class Number:
    def __init__(self, n):
        self.n = n

    def printValue(self):
        print self.n


def printAllMembers(d):
    i = 0
    while i < 10:
        d[i].printValue()
        i = i+1


dict = {}
u = 0
size = 10
while u < size:
    dict[u] = Number(u)
    u = u + 1

printAllMembers(dict)
