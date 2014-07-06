#include <stdlib.h>
#include <assert.h>
#include "runtime.h"

/* classes */
pyobj C, D;

static void setup_classes();

int main()
{
  setup_classes();

  // c = C()
  pyobj c = create_object(C);

  // d = D()
  pyobj d = create_object(D);

  // TODO: call the __init__ method if it exists

#ifdef TAGGING
  pyobj one = inject_int(1);
  pyobj three = inject_int(3);
#else
  pyobj one = create_int(1);
  pyobj three = create_int(3);
#endif

  // c.f = 1
  set_attr(c, "f", one);

  // d.f = 1
  set_attr(d, "f", three);

  print_any(inject_bool(equal(one, one)));
  print_any(inject_bool(equal(c, c)));
  print_any(inject_bool(equal(get_attr(c, "f"), get_attr(c, "f"))));
  print_any(inject_bool(equal(inject_bool(0), inject_bool(0))));
  print_any(inject_bool(equal(inject_bool(1), inject_bool(1))));

  print_any(one);
  print_any(three);
  print_any(inject_bool(equal(one, three)));
  print_any(c);
  print_any(d);
  print_any(inject_bool(equal(c, d)));
  print_any(inject_bool(0));
  print_any(inject_bool(1));
  print_any(inject_bool(equal(inject_bool(0), inject_bool(1))));

  print_any(get_attr(c, "f"));
  print_any(get_attr(d, "f"));
  print_any(inject_bool(equal(get_attr(c, "f"), get_attr(d, "f"))));
}

/* code to create classes C and D */
static void setup_classes()
{
#ifdef TAGGING
  pyobj zero = inject_int(0);
  pyobj one = inject_int(1);
#else
  pyobj zero = create_int(0);
  pyobj one = create_int(1);
#endif
  pyobj list0 = create_list(zero);
  pyobj list1 = create_list(one);

  // class C:
  //   pass
  C = create_class(list0);

  // class D(C):
  //   pass
  set_subscript(list1, zero, C); // list1[0] = C
  D = create_class(list1);
}
