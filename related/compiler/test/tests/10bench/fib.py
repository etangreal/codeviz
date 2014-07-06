class Fib:
  def __init__(self):
    pass

  def fib(self, n):
    if n <= 2:
      return 1
    return self.fib(n-1) + self.fib(n-2)

print Fib().fib(10)
