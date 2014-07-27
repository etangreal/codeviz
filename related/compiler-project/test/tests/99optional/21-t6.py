

def compareList(l , p):
    i = 0
    while i < 10:
        if not l[i] == p[i]:
            return False
        i = i + 1

    return True

list1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
list2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]


print not compareList(list1, list2)
