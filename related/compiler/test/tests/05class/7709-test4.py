# distinguish between different parameters
class Test4:
    def __init__(self):
        self.param=10
    def testPrintLoc(self):
        param=5
        return param
    def testPrintGlob(self):
        return self.param
t = Test4()
print t.testPrintLoc()
print t.testPrintGlob()
