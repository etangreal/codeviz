import compiler
import sys

def dump_ast(t):
  def s(t, indent):
    if isinstance(t, compiler.ast.Node):
      sys.stdout.write('\n')
      sys.stdout.write(' ' * indent)
      name = t.__class__.__name__
      sys.stdout.write(name)
      sys.stdout.write('(')
      sep = ''
      for ch in t.getChildren():
        sys.stdout.write(sep)
        sep = ', '
        s(ch, indent+1)
      sys.stdout.write(')')
    else:
      sys.stdout.write(repr(t))
  s(t, 0)
  sys.stdout.write('\n')
