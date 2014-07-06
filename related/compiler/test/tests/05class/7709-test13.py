#test recursion general program
class Test:
    def __init__(self):
        pass
    def fact(self,n):
        if n == 1:
            return 1
        else:
            return n*self.fact(n-1)

t=Test()
print t.fact(5)
