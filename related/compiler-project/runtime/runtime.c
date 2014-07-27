#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <ctype.h>
#include <string.h>

#include "runtime.h"

int min(int x, int y) { return y < x ? y : x; }

/* Some forward declarations */
static int equal_pyobj(pyobj a, pyobj b);
static void print_float(double in);
static void print_list(pyobj pyobj_list);
static void print_dict(pyobj dict);
static list list_add(list x, list y);

#ifdef TAGGING
int tag(pyobj val) {
  return val & MASK;
}
#endif

int big_tag(pyobj val) {
#ifdef TAGGING
  switch (tag(val)) {
    case INT_TAG: return INT;
    case FLOAT_TAG: return FLOAT;
    case BOOL_TAG: return BOOL;
    default: return project_big(val)->tag;
  }
#else
  return project_big(val)->tag;
#endif
}

int is_int(pyobj val) {
#ifdef TAGGING
  return (val & MASK) == INT_TAG;
#else
  return project_big(val)->tag == INT;
#endif
}

int is_bool(pyobj val) {
#ifdef TAGGING
  return (val & MASK) == BOOL_TAG;
#else
  return project_big(val)->tag == BOOL;
#endif
}

int is_float(pyobj val) {
#ifdef TAGGING
  return (val & MASK) == FLOAT_TAG;
#else
  return project_big(val)->tag == FLOAT;
#endif
}

int is_big(pyobj val) {
#ifdef TAGGING
  return (val & MASK) == BIG_TAG;
#else
  return 1;
#endif
}

int is_function(pyobj val) {
  int ret;
  if (is_big(val)) {
    ret = project_big(val)->tag == FUN;
    return ret;
  } else
    return 0;
}
int is_object(pyobj val) {
  return is_big(val) && (project_big(val)->tag == OBJECT);
}
int is_class(pyobj val) {
  return is_big(val) && (project_big(val)->tag == CLASS);
}
int is_unbound_method(pyobj val) {
  return is_big(val) && (project_big(val)->tag == UBMETHOD);
}
int is_bound_method(pyobj val) {
  return is_big(val) && (project_big(val)->tag == BMETHOD);
}

/*
 * Delegate to inject_* functions.
 */
pyobj create_int(int i) {
  return inject_int(i);
}
pyobj create_bool(int b) {
  return inject_bool(b);
}
pyobj create_float(float f) {
  return inject_float(f);
}

#ifdef TAGGING

/*
 * Injecting into pyobj. Tag primitive values.
 */
pyobj inject_int(int i) {
  return (i << SHIFT) | INT_TAG;
}
pyobj inject_bool(int b) {
  return (b << SHIFT) | BOOL_TAG;
}
pyobj inject_float(float f) {
  /* use a union to avoid bits changing when casting */
  union { float f; int i; } x;
  x.f = f;
  int i = x.i;
  /* Could accomplish this with a special mask */
  return ((i >> SHIFT) << SHIFT) | FLOAT_TAG;
}
pyobj inject_big(big_pyobj* p) {
  assert((((long)p) & MASK) == 0); 
  return ((long)p) | BIG_TAG;
}

#else

/*
 * Creating boxed primitives as a pyobj.
 */
pyobj inject_int(int i) {
  big_pyobj* ret = (big_pyobj*)malloc(sizeof(big_pyobj));
  ret->tag = INT;
  ret->u.i = i;
  return ret;
}
pyobj inject_bool(int b) {
  big_pyobj* ret = (big_pyobj*)malloc(sizeof(big_pyobj));
  ret->tag = BOOL;
  ret->u.b = b;
  return ret;
}
pyobj inject_float(float f) {
  big_pyobj* ret = (big_pyobj*)malloc(sizeof(big_pyobj));
  ret->tag = FLOAT;
  ret->u.fl = f;
  return ret;
}

#endif

/*
 * Projecting from pyobj. Returns an untagged/unboxed value.
 */
int project_int(pyobj val) {
  if (is_bool(val))
    return project_bool(val) ? 1 : 0;
  if (is_float(val))
    return (int) project_float(val);
#ifdef TAGGING
  assert((val & MASK) == INT_TAG);
  return val >> SHIFT;
#else
  big_pyobj* p = project_big(val);
  assert(p->tag == INT);
  return p->u.i;
#endif
}
int project_bool(pyobj val) {
  if (is_int(val))
    return project_int(val) != 0;
  if (is_float(val))
    return project_float(val) != 0.f;
#ifdef TAGGING
  assert((val & MASK) == BOOL_TAG);
  return val >> SHIFT;
#else
  big_pyobj* p = project_big(val);
  assert(p->tag == BOOL);
  return p->u.b;
#endif
}
float project_float(pyobj val) {
  if (is_int(val))
    return (float) project_int(val);
  if (is_bool(val))
    return project_bool(val) ? 1.f : 0.f;
#ifdef TAGGING
  assert((val & MASK) == FLOAT_TAG);
  return (val >> SHIFT) << SHIFT;
#else
  big_pyobj* p = project_big(val);
  assert(p->tag == FLOAT);
  return p->u.fl;
#endif
}
big_pyobj* project_big(pyobj val) {
#ifdef TAGGING
  assert((val & MASK) == BIG_TAG);
  return (big_pyobj*)(val & ~MASK);
#else
  return (big_pyobj*)val;
#endif
}

function project_function(pyobj val) {
  big_pyobj* p = project_big(val);
  assert(p->tag == FUN);
  return p->u.f;
}
class project_class(pyobj val) {
  big_pyobj* p = project_big(val);
  assert(p->tag == CLASS);
  return p->u.cl;
}
object project_object(pyobj val) {
  big_pyobj* p = project_big(val);
  assert(p->tag == OBJECT);
  return p->u.obj;
}
bound_method project_bound_method(pyobj val) {
  big_pyobj* p = project_big(val);
  assert(p->tag == BMETHOD);
  return p->u.bm;
}
unbound_method project_unbound_method(pyobj val) {
  big_pyobj* p = project_big(val);
  assert(p->tag == UBMETHOD);
  return p->u.ubm;
}


/* Not used? */
static int is_zero(pyobj val) {
#ifdef TAGGING
  return (val >> SHIFT) == 0;
#else
  if (val == 0)
    return 1;
  switch (big_tag(val)) {
    case INT: return project_int(val) == 0;
    case BOOL: return project_bool(val) == 0;
    case FLOAT: return project_float(val) == 0;
    default: return 1;
  }
#endif
}

static void print_object(pyobj o) {
  printf("<object>");
}
static void print_int(int x) {
  printf("%d", x);
}
void print_int_nl(int x) {
  printf("%d\n", x);
}
static void print_bool(int b) {
  if (b)
    printf ("True");
  else
    printf ("False");
}

static void print_pyobj(pyobj x) {
  switch (big_tag(x)) {
  case INT:
    print_int(project_int(x));
    break;
  case BOOL:
    print_bool(project_bool(x));
    break;
  case FLOAT:
    print_float(project_float(x));
    break;
  case DICT:
    print_dict(x);
    break;
  case LIST:
    print_list(x);
    break;
  case OBJECT:
    print_object(x);
    break;
  default:
    assert(0);
  }
}

int input() {
  int i;
  scanf("%d", &i);
  return i;
}

pyobj input_int() {
  int i;
  scanf("%d", &i);
#ifdef TAGGING
  return inject_int(i);
#else
  return create_int(i);
#endif
}

/*
  Lists (needed for hashtables)
*/

static big_pyobj* list_to_big(list l) {
  big_pyobj* v = (big_pyobj*)malloc(sizeof(big_pyobj));
  v->tag = LIST;
  v->u.l = l;
  return v;
}

pyobj create_list(pyobj length) {
  list l;
  l.len = project_int(length); /* this should be checked */
  l.data = (pyobj*)malloc(sizeof(pyobj) * l.len);
  big_pyobj *big = list_to_big(l);
#ifdef TAGGING
  return inject_big(big);
#else
  return big;
#endif
}


static char is_in_list(list ls, pyobj b)
{
    int i;
    for(i = 0; i < ls.len; i++)
      if (ls.data[i] == b)
	return 1;
    return 0;
}

static int list_equal(list x, list y)
{
  char eq = 1;
  int i;
  for (i = 0; i != min(x.len, y.len); ++i)
    eq = eq && equal_pyobj(x.data[i], y.data[i]);
  if (x.len == y.len)
    return eq;
  else
    return 0;
}


/*
  Hashtable support
*/

static char inside;
static list printing_list;

static void print_dict(pyobj dict)
{
    big_pyobj* d;
    char inside_reset = 0;
    if(!inside) {
        inside = 1;
        inside_reset = 1;
        printing_list.len = 0;
	printing_list.data = 0;
    }
    d = project_big(dict);

    if(is_in_list(printing_list, dict)) {
        printf("{...}");
        return;
    }
    printf("{");
    int i = 0;
    int max = hashtable_count(d->u.d);

    struct hashtable_itr *itr = hashtable_iterator(d->u.d);
    if (max) {
        do {
            pyobj k = *(pyobj *)hashtable_iterator_key(itr);
            pyobj v = *(pyobj *)hashtable_iterator_value(itr);
            print_pyobj(k);
            printf(": ");
            if (is_in_list(printing_list, v)
		|| equal_pyobj(v,dict)) {
	      printf("{...}");
            }
            else {
                /* tally this dictionary in our list of printing dicts */
	      list a;
	      a.len = 1;
	      a.data = (pyobj*)malloc(sizeof(pyobj) * a.len);
	      a.data[0] = dict;
	      /* Yuk, concatenating (adding) lists is slow! */
	      printing_list = list_add(printing_list, a);
	      print_pyobj(v);
            }
            if(i != max - 1)
                printf(", ");
            i++;
        } while (hashtable_iterator_advance(itr));
    }
    printf("}");

    if(inside_reset) {
        inside = 0;
        printing_list.len = 0;
	printing_list.data = 0;
    }
}


/* This hash function was chosen more or less at random -Jeremy */
static int hash32shift(int key)
{
  key = ~key + (key << 15); /* key = (key << 15) - key - 1; */
  key = key ^ (key >> 12);
  key = key + (key << 2);
  key = key ^ (key >> 4);
  key = key * 2057; /* key = (key + (key << 3)) + (key << 11); */
  key = key ^ (key >> 16);
  return key;
}


static unsigned int hash_any(void* o)
{
  pyobj obj = *(pyobj*)o;
  switch (big_tag(obj)) {
  case INT:
    return hash32shift(project_int(obj));
  case FLOAT:
    return hash32shift(project_float(obj));
  case BOOL:
    return hash32shift(project_bool(obj));
  case LIST: {
    big_pyobj* b = project_big(obj);
    int i;
    unsigned long h = 0; 
    for (i = 0; i != b->u.l.len; ++i)
      h = 5*h + hash_any(&b->u.l.data[i]);
    return h;
  }
  case DICT: {
    big_pyobj* b = project_big(obj);
    struct hashtable_itr* i;
    unsigned long h = 0; 
    if (hashtable_count(b->u.d) == 0)
      return h;
    i = hashtable_iterator(b->u.d); 
    do {
      h = 5*h + hash_any(hashtable_iterator_value(i));
    } while (hashtable_iterator_advance(i));
    return h;
  }
  default: {
    printf("unrecognized tag in hash_any\n");
    *(int*)0 = 42;
    break;
  }
  }
}


static struct hashtable *current_cmp_a;
static struct hashtable *current_cmp_b;

static char dict_equal(struct hashtable* x, struct hashtable* y)
{
    if(hashtable_count(x) != hashtable_count(y))
        return 0;

    if(current_cmp_a)
    {
        if(current_cmp_a == x)
        {
            return current_cmp_a == y;
        }
        else if(current_cmp_a == y)
        {
            return current_cmp_a == x;
        }
    }


    if(current_cmp_b)
    {
        if(current_cmp_b == y)
        {
            return current_cmp_b == x;
        }
        else if(current_cmp_b == x)
        {
            return current_cmp_b == y;
        }
    }

    char will_reset = 0;
    char same = 1;
    if(!current_cmp_a)
    {
        current_cmp_a = x;
        current_cmp_b = y;
        will_reset = 1;
    }

    int max = hashtable_count(x);

    struct hashtable_itr *itr_a = hashtable_iterator(x);
    struct hashtable_itr *itr_b = hashtable_iterator(y);
    if (max)
    {
        do {
            pyobj k_a = *(pyobj *)hashtable_iterator_key(itr_a);
            pyobj v_a = *(pyobj *)hashtable_iterator_value(itr_a);
            pyobj k_b = *(pyobj *)hashtable_iterator_key(itr_b);
            pyobj v_b = *(pyobj *)hashtable_iterator_value(itr_b);

            if(!equal_pyobj(k_a,k_b) || !equal_pyobj(v_a,v_b))
                same = 0;

        } while (hashtable_iterator_advance(itr_a) && hashtable_iterator_advance(itr_b));
    }

    if(will_reset)
    {
        current_cmp_a = NULL;
        current_cmp_b = NULL;
    }

    return same;
}

static int equal_pyobj(pyobj a, pyobj b)
{
  switch (big_tag(a)) {
  case INT: {
    switch (big_tag(b)) {
    case INT:
      return project_int(a) == project_int(b);
    case BOOL:
      return project_int(a) == project_bool(b);
    case FLOAT:
      return project_int(a) == project_float(b);
    default:
      return 0;
    }
    break;
  }
  case FLOAT: {
    switch (big_tag(b)) {
    case INT:
      return project_float(a) == project_int(b);
    case BOOL:
      return project_float(a) == project_bool(b);
    case FLOAT:
      return project_float(a) == project_float(b);
    default:
      return 0;
    }
    break;
  }
  case BOOL: {
    switch (big_tag(b)) {
    case INT:
      return project_bool(a) == project_int(b);
    case BOOL:
      return project_bool(a) == project_bool(b);
    case FLOAT:
      return project_bool(a) == project_float(b);
    default:
      return 0;
    }
    break;
  }
  default: {
#ifdef TAGGING
    if (tag(b) != BIG_TAG)
      return 0;
#endif
    big_pyobj* x = project_big(a);
    big_pyobj* y = project_big(b);
    if (x->tag != y->tag)
      return 0;
    switch (x->tag) {
    case LIST:
      return list_equal(x->u.l, y->u.l);
    case DICT:
      return dict_equal(x->u.d, y->u.d);
    case CLASS:
    case FUN:
    case OBJECT:
      return x == y;
    default:
      return 0;
    }
    break;
  }
  }
  return 0;
}


static int equal_any(void* a, void* b)
{
  return equal_pyobj(*(pyobj*)a, *(pyobj*)b);
}

pyobj create_dict()
{
  big_pyobj* v = (big_pyobj*)malloc(sizeof(big_pyobj));
  v->tag = DICT;
  v->u.d = create_hashtable(4, hash_any, equal_any);
#ifdef TAGGING
  return inject_big(v);
#else
  return v;
#endif
}

static pyobj* dict_subscript(dict d, pyobj key)
{
  void* p = hashtable_search(d, &key);
  if (p)
    return (pyobj*)p;
  else {
    pyobj* k = (pyobj*) malloc(sizeof(pyobj));
    *k = key;
    pyobj* v = (pyobj*) malloc(sizeof(pyobj));
#ifdef TAGGING
    *v = inject_int(444);
#else
    *v = create_int(444);
#endif
    hashtable_insert(d, k, v);
    return v;
  }
}

static pyobj* list_subscript(list ls, pyobj n)
{
  switch (big_tag(n)) {
  case INT: {
    int i = project_int(n);
    if (0 <= i && i < ls.len)
      return &(ls.data[i]);
    else if (0 <= ls.len + i && ls.len + i < ls.len)
      return &(ls.data[ls.len + i]);
    else {
      printf("ERROR: list_nth index larger than list");
      exit(1);
    }
  }
  case BOOL: {
    int b = project_bool(n);
    if (b < ls.len)
      return &(ls.data[b]);
    else {
      printf("ERROR: list_nth index larger than list");
      exit(1);
    }
  }
  default:
    printf("ERROR: list_nth expected integer index");
    exit(1);
  }
}


static char printed_0;
static char printed_0_neg;
static void print_float(double in)
{
    char outstr[128];

    snprintf(outstr, 128, "%.12g", in);

    char *p = outstr;

    if(in == 0.0)
    {
        if(printed_0 == 0)
        {
            printed_0 = 1;
            printed_0_neg = *p == '-'; /*see if we incremented for negative*/
        }
        else
        {
            printf(printed_0_neg ? "-0.0" : "0.0");
            return;
        }
    }

    if(*p == '-')
        p++;


    while(*p && isdigit(*p))
        p++;

    printf( ( (*p)  ? "%s" : "%s.0" ), outstr);
}

static pyobj *current_list;
static void print_list(pyobj ls)
{
  big_pyobj* pyobj_list = project_big(ls);
  if(current_list && current_list == pyobj_list->u.l.data) {
    printf("[...]");
    return;
  }

  int will_reset = 0;
  if(!current_list) {
    current_list = pyobj_list->u.l.data;
    will_reset = 1;
  }
  
  list l = pyobj_list->u.l;
  printf("[");
  int i;
  for(i = 0; i < l.len; i++) {
    if (big_tag(l.data[i]) == LIST
	&& project_big((l.data[i]))->u.l.data == l.data)
      printf("[...]");
    else
      print_pyobj(l.data[i]);
    if(i != l.len - 1)
      printf(", ");
  }
  printf("]");
  
  if(will_reset)
    current_list = NULL;
}

static list list_add(list a, list b)
{
  list c;
  c.len = a.len + b.len;
  c.data = (pyobj*)malloc(sizeof(pyobj) * c.len);
  int i;
  for (i = 0; i != a.len; ++i)
    c.data[i] = a.data[i];
  for (i = 0; i != b.len; ++i)
    c.data[a.len + i] = b.data[i];
  return c;
}

pyobj append(pyobj a, pyobj b) {
  switch (big_tag(a)) {
  case LIST:
    switch (big_tag(b)) {
    case LIST: {
      big_pyobj* v = list_to_big(list_add(project_big(a)->u.l, project_big(b)->u.l));
#ifdef TAGGING
      return inject_big(v);
#else
      return v;
#endif
    }
    default:
      printf("error in add, expected a list\n");      
      exit(-1);
    }
  default:
    printf("error in add, expected a list\n");      
    exit(-1);
  }
}

int equal(pyobj a, pyobj b) {
  return equal_pyobj(a, b);
}

int not_equal(pyobj x, pyobj y) { return !equal(x, y); }

static pyobj subscript_assign(big_pyobj* c, pyobj key, pyobj val)
{
  switch (c->tag) {
  case LIST:
    return *list_subscript(c->u.l, key) = val;
  case DICT:
    return *dict_subscript(c->u.d, key) = val;
  default:
    printf("error in set subscript, not a list or dictionary\n");
    assert(0);
  }
}

pyobj set_subscript(pyobj c, pyobj key, pyobj val)
{
  switch (big_tag(c)) {
  case LIST:
  case DICT: {
    big_pyobj* b = project_big(c);
    return subscript_assign(b, key, val);
  }
  default:
    printf("error in set subscript, not a list or dictionary\n");
    assert(0);
  }
  assert(0);
}

static pyobj subscript(big_pyobj* c, pyobj key)
{
  switch (c->tag) {
  case LIST:
    return *list_subscript(c->u.l, key);
  case DICT:
    return *dict_subscript(c->u.d, key);
  default:
    printf("error in set subscript, not a list or dictionary\n");
    assert(0);
  }
}

pyobj get_subscript(pyobj c, pyobj key)
{
  switch (big_tag(c)) {
  case LIST:
  case DICT: {
    big_pyobj* b = project_big(c);
    return subscript(b, key);
  }
  default:
    printf("error in get_subscript, not a list or dictionary\n");
    assert(0);
  }
}

void print_any(pyobj p) {
  print_pyobj(p);
  printf("\n");
}

int is_true(pyobj v)
{
  switch (big_tag(v)) {
  case INT:
    return project_int(v) != 0;
  case FLOAT:
    return project_float(v) != 0;
  case BOOL:
    return project_bool(v) != 0;
  case LIST: {
    big_pyobj* b = project_big(v);
    return b->u.l.len != 0;
  }
  case DICT: {
    big_pyobj* b = project_big(v);
    return hashtable_count(b->u.d) > 0;
  }
  case FUN:
    return 1;
  case CLASS:
    return 1;
  case OBJECT:
    return 1;
  default:
    printf("error, unhandled case in is_true\n");
    assert(0);
  } 
  assert(0);
}

/* Support for Functions */

static big_pyobj* closure_to_big(function f) {
  big_pyobj* v = (big_pyobj*)malloc(sizeof(big_pyobj));
  v->tag = FUN;
  v->u.f = f;
  return v;
}

pyobj create_closure(void* fun_ptr, pyobj free_vars) {
  function f;
  f.function_ptr = fun_ptr;
  f.free_vars = free_vars;
  big_pyobj* v = closure_to_big(f);
#ifdef TAGGING
  return inject_big(v);
#else
  return v;
#endif
}



void* get_fun_ptr(pyobj p) {
  big_pyobj* b = project_big(p);
  assert(b->tag == FUN);
  return b->u.f.function_ptr;
}

pyobj get_free_vars(pyobj p) {
  big_pyobj* b = project_big(p);
  assert(b->tag == FUN);
  return b->u.f.free_vars;
}

pyobj set_free_vars(pyobj p, pyobj free_vars) {
  big_pyobj* b = project_big(p);
  assert(b->tag == FUN);
  b->u.f.free_vars = free_vars;
  return p;
}

/* Support for Objects and Classes */

static unsigned int attrname_hash(void *ptr)
{
  unsigned char *str = (unsigned char *)ptr;
  unsigned long hash = 5381;
  int c;
  while(c=*str++)
    hash = ((hash << 5) + hash) ^ c;
  return hash;
}

static int attrname_equal(void *a, void *b)
{
  return !strcmp( (char*)a, (char*)b );
}

pyobj create_class(pyobj bases)
{
  big_pyobj* ret = (big_pyobj*)malloc(sizeof(big_pyobj));
  ret->tag = CLASS;
  ret->u.cl.attrs = create_hashtable(2, attrname_hash, attrname_equal);

  big_pyobj* basesp = project_big(bases);
  switch (basesp->tag) {
  case LIST: {
      int i;
      ret->u.cl.nparents = basesp->u.l.len;
      ret->u.cl.parents = (class*)malloc(sizeof(class) * ret->u.cl.nparents);
      for (i = 0; i != ret->u.cl.nparents; ++i) {
	  pyobj* parent = &basesp->u.l.data[i];
	  if (big_tag(*parent) == CLASS)
	      ret->u.cl.parents[i] = project_big(*parent)->u.cl;
          else
              exit(-1);
      }
      break;
  }
  default:
    exit(-1);
  }
#ifdef TAGGING
  return inject_big(ret);
#else
  return ret;
#endif
}

pyobj create_class_without_superclass()
{
  pyobj zero = inject_int(0);
  pyobj list0 = create_list(zero);
  return create_class(list0);
}

pyobj create_class_with_superclass(pyobj base)
{
  pyobj one = inject_int(1);
  pyobj list1 = create_list(one);
  set_subscript(list1, one, base); // list1[0] = base
  return create_class(list1);
}

/* we leave calling the __init__ function for a separate step. */
pyobj create_object(pyobj cl) {
  big_pyobj* ret = (big_pyobj*)malloc(sizeof(big_pyobj));
  ret->tag = OBJECT;
  big_pyobj* clp = project_big(cl);
  if (clp->tag == CLASS)
    ret->u.obj.cl = clp->u.cl;
  else {
    printf("in make object, expected a class\n");
    exit(-1);
  }
  ret->u.obj.attrs = create_hashtable(2, attrname_hash, attrname_equal);
#ifdef TAGGING
  return inject_big(ret);
#else
  return ret;
#endif
}

static pyobj* attrsearch_rec(class cl, char* attr) {
    pyobj* ptr;
    int i;
    ptr = hashtable_search(cl.attrs, attr);

    if(ptr == NULL) {
        for(i=0; i != cl.nparents; ++i) {
            ptr = attrsearch_rec(cl.parents[i], attr);
            if (ptr != NULL)
                return ptr;
        }
        return NULL;
    } else
        return ptr;
}

static pyobj* attrsearch(class cl, char* attr) {
    pyobj* ret = attrsearch_rec(cl, attr);
    if (ret == NULL) {
        printf("attribute %s not found\n", attr);
        exit(-1);
    }
    return ret;
}

static big_pyobj* create_bound_method(object receiver, function f) {
  big_pyobj* ret = (big_pyobj*)malloc(sizeof(big_pyobj));
  ret->tag = BMETHOD;
  ret->u.bm.fun = f;
  ret->u.bm.receiver = receiver;
  return ret;
}

static big_pyobj* create_unbound_method(class cl, function f) {
  big_pyobj* ret = (big_pyobj*)malloc(sizeof(big_pyobj));
  ret->tag = UBMETHOD;
  ret->u.ubm.fun = f;
  ret->u.ubm.cl = cl;
  return ret;
}

int has_attr(pyobj o, char* attr)
{
  switch (big_tag(o)) {
  case CLASS: {
    big_pyobj* b = project_big(o);
    pyobj* attribute = attrsearch_rec(b->u.cl, attr);
    return attribute != NULL;
  }
  case OBJECT: {
    big_pyobj* b = project_big(o);
    pyobj* attribute = hashtable_search(b->u.obj.attrs, attr);
    if (attribute == NULL) {
      attribute = attrsearch_rec(b->u.cl, attr);
      return attribute != NULL;
    } else {
      return 1;
    }
  }
  default:
    return 0;
  }
}

static int inherits_rec(class c1, class c2) {
  int ret = 0;
  if (c1.attrs == c2.attrs) {
    ret = 1;
  } else {
    int i;
    for(i=0; i != c1.nparents; ++i) {
      ret = inherits_rec(c1.parents[i], c2);
      if (ret)
        break;
        }
  } 
  return ret;
}

int inherits(pyobj c1, pyobj c2) {
  return inherits_rec(project_class(c1), project_class(c2));
}

pyobj get_class(pyobj o)
{
  big_pyobj* ret = (big_pyobj*)malloc(sizeof(big_pyobj));
  ret->tag = CLASS;

  big_pyobj* b = project_big(o);
  switch (b->tag) {
  case OBJECT:
    ret->u.cl = b->u.obj.cl;
    break;
  case UBMETHOD:
    ret->u.cl = b->u.ubm.cl;
    break;
  default:
    printf("get_class expected object or unbound method\n");
    exit(-1);
  }
#ifdef TAGGING
  return inject_big(ret);
#else
  return ret;
#endif
}

pyobj get_receiver(pyobj o)
{
  big_pyobj* ret = (big_pyobj*)malloc(sizeof(big_pyobj));
  ret->tag = OBJECT;
  big_pyobj* b = project_big(o);
  switch (b->tag) {
  case BMETHOD:
    ret->u.obj = b->u.bm.receiver;
    break;
  default:
    printf("get_receiver expected bound method\n");
    exit(-1);
  }
#ifdef TAGGING
  return inject_big(ret);
#else
  return ret;
#endif
}

pyobj get_function(pyobj o)
{
  big_pyobj* ret = (big_pyobj*)malloc(sizeof(big_pyobj));
  ret->tag = FUN;
  big_pyobj* b = project_big(o);
  switch (b->tag) {
  case BMETHOD:
    ret->u.f = b->u.bm.fun;
    break;
  case UBMETHOD:
    ret->u.f = b->u.ubm.fun;
    break;
  default:
    printf("get_function expected a method\n");
    exit(-1);
  }
#ifdef TAGGING
  return inject_big(ret);
#else
  return ret;
#endif
}

void *get_fun_ptr_from_attr(pyobj c, char* attr)
{
  pyobj meth = get_attr(c, attr);
  pyobj fun = get_function(meth);
  return get_fun_ptr(fun);
}

pyobj get_attr(pyobj c, char* attr)
{
  big_pyobj* b = project_big(c);
  switch (b->tag) {
  case CLASS: {
    pyobj* attribute = attrsearch(b->u.cl, attr);
    if (is_function(*attribute)) {
      big_pyobj* m = create_unbound_method(b->u.cl, project_function(*attribute));
#ifdef TAGGING
      return inject_big(m);
#else
      return m;
#endif
    } else {
      return *attribute;
    }
  }
  case OBJECT: {
    pyobj* attribute = hashtable_search(b->u.obj.attrs, attr);
    if (attribute == NULL) {
        attribute = attrsearch(b->u.obj.cl, attr);
        if (is_function(*attribute)) {
          big_pyobj* m = create_bound_method(b->u.obj, project_function(*attribute));
#ifdef TAGGING
          return inject_big(m);
#else
          return m;
#endif
        } else {
          return *attribute;
        }
    } else {
      return *attribute;
    }
  }  
  default:
    printf("error in get attribute, not a class or object\n");
    exit(-1);
  }
}

pyobj set_fun(pyobj obj, char* attr, void *fp)
{
    pyobj zero = inject_int(0);
    pyobj list0 = create_list(zero);
    pyobj closure = create_closure(fp, list0);
    set_attr(obj, attr, closure);
}

pyobj set_attr(pyobj obj, char* attr, pyobj val)
{
    char* k;
    pyobj* v;
    k = (char *)malloc(strlen(attr)+1);
    v = (pyobj *)malloc(sizeof(pyobj));
    strcpy(k, attr);
    *v = val;
    
    struct hashtable* attrs;
    
    big_pyobj* b = project_big(obj);
    switch (b->tag) {
    case CLASS:
      attrs = b->u.cl.attrs;
      break;
    case OBJECT:
      attrs = b->u.obj.attrs;
      break;
    default:
      printf("error, expected object or class in set attribute\n");
      exit(-1);
    }

    if(!hashtable_change(attrs, k, v))
        if(!hashtable_insert(attrs, k, v)) {
           printf("out of memory");
           exit(-1);
        }
    return val;
}

pyobj error_pyobj(char* string) {
  printf("%s", string);
  exit(-1);
}
