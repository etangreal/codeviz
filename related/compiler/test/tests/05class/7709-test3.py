# Testing class, constructor, methods, True, False, ef, elif, else, while, and, ==, >
# Testing more than one function.
# just large condition for testing purpose "logically it has no meaning"

class Test3:
    def __init__(self,maxCount):
        self.maxCount = maxCount
    def testCounter(self):
        i=0
        self.addFive=0
        flag = True
        while flag:
            i=i+1            
            if (i>self.maxCount and self.addFive ==(i-1)*5) or not(i<=self.maxCount or self.addFive !=(i-1)*5):
                i=0
                flag = False
            elif i<self.maxCount:
                self.addFive=self.addFive+5
            else:
                self.addFive=self.addFive+5
                print i
        return self.addFive
    def testAdd(self,x,y):
        return x+y
t = Test3(20)
print t.testCounter()
print t.testAdd(5,6)
