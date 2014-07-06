#ifndef RUNTIME_H
#define RUNTIME_H

#include "hashtable.h"
#include "hashtable_itr.h"
#include "hashtable_utility.h"

/* for old times sake */
void print_int_nl(int x);
int input();

/* Structure and type-tag definitions   */

#ifdef TAGGING

#define MASK 3    /* 11 */
#define SHIFT 2

#define INT_TAG 0     /* 00 */

#define BOOL_TAG 1   /* 01 */

/* The following is for a non-standard single-precision (21-bit fraction)
   floating point number */
#define FLOAT_TAG 2   /* 10 */

/*
  For larger objects, we have a pointer to the object, and the
  object starts with a tag that says what it is.
*/
#define BIG_TAG 3   /* 11 */
#endif

enum big_type_tag {
  LIST, DICT, FUN, CLASS, OBJECT, UBMETHOD, BMETHOD,
  INT, FLOAT, BOOL
};

struct pyobj_struct;

#ifdef TAGGING
typedef long int pyobj;
#else
typedef struct pyobj_struct *pyobj;
#endif

struct list_struct {
  pyobj* data;
  unsigned int len;
};
typedef struct list_struct list;

typedef struct hashtable* dict;

struct fun_struct {
  void* function_ptr;
  pyobj free_vars;
};
typedef struct fun_struct function;

struct class_struct {
  struct hashtable *attrs;
  int nparents;
  struct class_struct *parents;
};
typedef struct class_struct class;

struct object_struct {
  struct hashtable *attrs;
  class cl;
};
typedef struct object_struct object;

struct unbound_method_struct {
  function fun;
  class cl;
};
typedef struct unbound_method_struct unbound_method;

struct bound_method_struct {
  function fun;
  object receiver;
};
typedef struct bound_method_struct bound_method;

struct pyobj_struct {
  enum big_type_tag tag;
  union {
#ifndef TAGGING
    int i;
    float fl;
    int b; /* boolean */
#endif
    dict d;
    list l;
    function f;
    class cl;
    object obj;
    unbound_method ubm;
    bound_method bm;
  } u;
};
typedef struct pyobj_struct big_pyobj;

int tag(pyobj val);

int is_int(pyobj val);
int is_bool(pyobj val);
int is_big(pyobj val);
int is_function(pyobj val);
int is_object(pyobj val);
int is_class(pyobj val);
int is_unbound_method(pyobj val);
int is_bound_method(pyobj val);

/* Boxing/tagging operations */
pyobj inject_int(int i);
pyobj inject_bool(int b);
pyobj inject_float(float f);

#ifdef TAGGING
pyobj inject_big(big_pyobj* p);
#endif

/* Boxing/tagging operations. Just calls inject_T functions */
pyobj create_int(int i);
pyobj create_bool(int b);
pyobj create_float(float f);

/* Unboxing/untagging operations */
int project_int(pyobj val);
int project_bool(pyobj val);
float project_float(pyobj val);
big_pyobj* project_big(pyobj val);

/* Operations */

int is_true(pyobj v);
void print_any(pyobj p);
pyobj input_int();

pyobj create_list(pyobj length);
pyobj create_dict();
pyobj set_subscript(pyobj c, pyobj key, pyobj val);
pyobj get_subscript(pyobj c, pyobj key);

pyobj append(pyobj a, pyobj b);
int equal(pyobj a, pyobj b);
int not_equal(pyobj x, pyobj y);

pyobj create_closure(void* fun_ptr, pyobj free_vars);
void* get_fun_ptr(pyobj);
pyobj get_free_vars(pyobj);
pyobj set_free_vars(pyobj b, pyobj free_vars);

void *get_fun_ptr_from_attr(pyobj c, char* attr);

pyobj create_class(pyobj bases); /* bases should be a list of classes */
pyobj create_class_without_superclass(); /* calls create_class with an empty list */
pyobj create_class_with_superclass(pyobj base); /* calls create_class with a singleton list */
pyobj create_object(pyobj cl);
int inherits(pyobj c1, pyobj c2); /* Returns true if class c1 inherits from class c2 */
pyobj get_class(pyobj o); /* Get the class from an object or unbound method */
pyobj get_receiver(pyobj o); /* Get the receiver from inside a bound method */
pyobj get_function(pyobj o); /* Get the function from inside a method */
int has_attr(pyobj o, char* attr);
pyobj get_attr(pyobj c, char* attr);
pyobj set_attr(pyobj obj, char* attr, pyobj val);

pyobj error_pyobj(char* string);

#endif /* RUNTIME_H */
