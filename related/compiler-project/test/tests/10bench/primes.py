class List:
  def __init__(self, head, tail):
    self.head = head
    self.tail = tail

  def get(self, n):
    xs = self
    while n > 0:
      xs = xs.tail
      n = n - 1
    return xs.head

  def put(self, n, v):
    xs = self
    while n > 0:
      xs = xs.tail
      n = n - 1
    xs.head = v

  def flip(self, j, i, k):
    xs = self
    while xs != None:
      if i == 0:
        i = k
        j = j * k
        xs.head = False
      i = i - 1
      xs = xs.tail

  def length(self):
    xs = self
    n = 0
    while xs != None:
      xs = xs.tail
      n = n + 1
    return n

class Primes:
  def __init__(self):
    pass

  def makelist(self, n):
    xs = None
    while n > 0:
      xs = List(True, xs)
      n = n - 1
    return xs

  # print all primes <= n
  def sieve(self, n):
    a = self.makelist(n+1)
    i = 2
    while i <= n:
      if a.get(i):
        print i
        a.flip(i*i, i, i)
      i = i + 1

Primes().sieve(1000)
