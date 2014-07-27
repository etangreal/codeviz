#include <stdlib.h>
#include <assert.h>
#include "runtime.h"

/* methods */
pyobj C_m(pyobj self);
pyobj D_m(pyobj self);
pyobj D_n(pyobj self, pyobj x);

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
  set_attr(d, "f", one);

  pyobj i, j, k, h;

  // i = c.m()
  {
    pyobj meth = get_attr(c, "m");
    pyobj fun = get_function(meth);
    void *fp = get_fun_ptr(fun);
    pyobj (*f)(pyobj) = (pyobj (*)(pyobj)) fp; // cast to a function pointer type
    i = f(get_receiver(meth));
  }

  // j = d.m()
  {
    pyobj meth = get_attr(d, "m");
    pyobj fun = get_function(meth);
    void *fp = get_fun_ptr(fun);
    pyobj (*f)(pyobj) = (pyobj (*)(pyobj)) fp; // cast to a function pointer type
    j = f(get_receiver(meth));
  }

  // d.n(3)
  {
    pyobj (*f)(pyobj, pyobj) = (pyobj (*)(pyobj, pyobj)) get_fun_ptr_from_attr(d, "n");
    f(d, three);
  }

  // k = d.m()
  {
    pyobj meth = get_attr(d, "m");
    pyobj fun = get_function(meth);
    void *fp = get_fun_ptr(fun);
    pyobj (*f)(pyobj) = (pyobj (*)(pyobj)) fp; // cast to a function pointer type
    k = f(get_receiver(meth));
  }

  // h = i + j + k
  {
#ifdef TAGGING
    // optimized, but assumes i and j are integers
    // h = i + j + k

    // unoptimized, but checks that i and j are integers
    h = inject_int(project_int(i) + project_int(j) + project_int(k));
#else
    h = create_int(project_int(i) + project_int(j) + project_int(k));
#endif
  }

  // print i, j, k
  print_any(i);
  print_any(j);
  print_any(k);
  print_any(h);
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
  //   def m(self):
  //     return self.f
  C = create_class(list0);

  // Add method m to the class.
  set_attr(C, "m", create_closure(C_m, list0));

  // class D(C):
  //   def m(self):
  //     return self.f + 1
  set_subscript(list1, zero, C); // list1[0] = C
  D = create_class(list1);

  pyobj D_m_closure = create_closure(D_m, list0);
  set_attr(D, "m", create_closure(D_m, list0));

  pyobj D_n_closure = create_closure(D_n, list0);
  set_attr(D, "n", create_closure(D_n, list0));
}

/*
 * def m(self): return self.f
 */
pyobj C_m(pyobj self) {
  return get_attr(self, "f");
}

/*
 * def m(self): return self.f + 1
 */
pyobj D_m(pyobj self) {
  pyobj f = get_attr(self, "f");
  int i = project_int(f);
#ifdef TAGGING
  return inject_int(i+1);
#else
  return create_int(i+1);
#endif
}

/*
 * def n(self, x): self.f = x; return None
 */
pyobj D_n(pyobj self, pyobj x) {
  set_attr(self, "f", x);
#ifdef TAGGING
  return inject_big(0); /* None */
#else
  return NULL;
#endif
}
