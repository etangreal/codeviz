class List:
  def __init__(self, head, tail):
    self.head = head
    self.tail = tail

  def filter(self, lt, n):
    if (lt and self.head < n) or (not lt and self.head >= n):
      if self.tail != None:
        return List(self.head, self.tail.filter(lt, n))
      else:
        return List(self.head, None)
    elif self.tail != None:
      return self.tail.filter(lt, n)
    else:
      return None

  def append(self, xs):
    if self.tail != None:
      return List(self.head, self.tail.append(xs))
    else:
      return List(self.head, xs)

  def sort(self):
    if self.tail != None:
      lt = self.tail.filter(True, self.head)
      if lt != None:
        lt = lt.sort()
      ge = self.tail.filter(False, self.head)
      if ge != None:
        ge = ge.sort()
      ge = List(self.head, ge)
      if lt != None:
        return lt.append(ge)
      else:
        return ge
    else:
      return List(self.head, None)

ys = List(0, List(2, List(1, List(3, None))))
xs = ys.sort()
while xs != None:
  print xs.head
  xs = xs.tail
