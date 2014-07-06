class Node:
	def __init__(self,value, child):
		self.value = value
		self.child = child
		
	def getValue(self):
		n = self
		return n.value
		
	def getChild(self):
		n = self
		return self.child
		
	def changeChild(self,newChild):
		n= self
		n.child = newChild

        def printPathFrom(self):
                n = self
                while n != None:
                        print n.getValue()
                        n=n.getChild()
                                

node5 = Node(5,None)		
node4 = Node(4,node5)
node3 = Node(3,None)
node2 = Node(2,node3)	
node1 = Node(1,node2)

node3.changeChild(node4)

node1.printPathFrom()
node4.printPathFrom()
	
		
		
