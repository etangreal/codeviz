class RBNode:
  # True is black, False is red
  def __init__(self, black, left, value, right):
    self.black = black
    self.left = left
    self.value = value
    self.right = right

  def contains(self, x):
    if self.left != None and x < self.value:
      return self.left.contains(x)
    if self.right != None and x > self.value:
      return self.right.contains(x)
    return x == self.value

  def is_black(self):
    return self.black

  def is_red(self):
    return not self.black

  def insert(self, x):
    return self._ins(x)._make_black()

  def _make_black(self):
    return RBNode(True, self.left, self.value, self.right)

  def _leaf(self, x):
    return RBNode(True, None, x, None)

  def _ins(self, x):
    if x == self.value:
      return self
    if x < self.value:
      if self.left != None:
        return RBNode(self.black, self.left._ins(x), self.value, self.right)._balance()
      else:
        return RBNode(self.black, self._leaf(x), self.value, self.right)._balance()
    else:
      if self.right != None:
        return RBNode(self.black, self.left, self.value, self.right._ins(x))._balance()
      else:
        return RBNode(self.black, self.left, self.value, self._leaf(x))._balance()

  def _balance(self):
    if self.is_black():
      match = False

      if self.left != None and self.left.left != None and \
          self.left.is_red() and self.left.left.is_red():
        a = self.left.left.left
        x = self.left.left.value
        b = self.left.left.right
        y = self.left.value
        c = self.left.right
        z = self.value
        d = self.right
        match = True

      if self.left != None and self.left.right != None and \
          self.left.is_red() and self.left.right.is_red():
        a = self.left.left
        x = self.left.right.value
        b = self.left.right.left
        y = self.left.value
        c = self.left.right.right
        z = self.value
        d = self.right
        match = True
      
      if self.right != None and self.right.left != None and \
          self.right.is_red() and self.right.left.is_red():
        a = self.left
        x = self.value
        b = self.right.left.left
        y = self.right.left.value
        c = self.right.left.right
        z = self.right.value
        d = self.right.right
        match = True

      if self.right != None and self.right.right != None and \
          self.right.is_red() and self.right.right.is_red():
        a = self.left
        x = self.value
        b = self.right.left
        y = self.right.value
        c = self.right.right.left
        z = self.right.right.value
        d = self.right.right.right
        match = True
      
      if match:
        return RBNode(False, RBNode(True, a, x, b), y, RBNode(True, c, z, d))

    return self

class RBTree:
  def __init__(self):
    self.root = None

  def insert(self, x):
    if self.root == None:
      self.root = RBNode(True, None, x, None)
    else:
      self.root = self.root.insert(x)

  def contains(self, x):
    if self.root == None:
      return False
    else:
      return self.root.contains(x)

class Primes:
  def __init__(self):
    pass

  # print all primes <= n
  def sieve(self, n):
    composites = RBTree()
    i = 2
    while i <= n:
      if not composites.contains(i):
        print i
        self.flip(composites, i, n)
      i = i + 1

  def flip(self, composites, p, n):
    k = p
    while k <= n:
      k = k + p
      composites.insert(k)

Primes().sieve(1000)
