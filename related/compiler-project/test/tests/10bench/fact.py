class Fact:
  def __init__(self):
    pass

  def fact(self, n):
    if n == 0:
      return 1
    return self.fact(n-1) * n;

print Fact().fact(10)
