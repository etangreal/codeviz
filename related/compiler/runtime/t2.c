

// ------------------------------------------------------------------------------------------------

#include <stdlib.h>
#include <assert.h>
#include "runtime.h"

// ------------------------------------------------------------------------------------------------

/*
	class Point:

		def __init__ (self, x):
			self.x_ = x
	


	p = Point(2)
*/

// ------------------------------------------------------------------------------------------------

/* forward */

static void setup_CPoint();
pyobj CPoint___init___(pyobj self, pyobj x);


/* classes */
pyobj CPoint;

int main() {

	setup_CPoint();

	// p = CPoint()
	pyobj p1 = create_object(CPoint);
	pyobj p2 = create_object(CPoint);

	// p.__init__(2)
	{
		pyobj (*f)(pyobj, pyobj) = (pyobj (*)(pyobj, pyobj)) get_fun_ptr_from_attr(p1, "__init__");
		f(p1, create_int(100));
	}

	// p.__init__(200)
	{
		pyobj (*f)(pyobj, pyobj) = (pyobj (*)(pyobj, pyobj)) get_fun_ptr_from_attr(p2, "__init__");
		f(p2, create_int(200));
	}

	// print: 2
	print_any( get_attr(p1, "x_") );
	print_any( get_attr(p2, "x_") );



	return 0;
}

// ------------------------------------------------------------------------------------------------

static void setup_CPoint() {

	pyobj zero = create_int(0);


	pyobj list0 = create_list(zero);

	CPoint = create_class(list0);

	// //create function: __init__
	// pyobj CPoint___init___closure = create_closure(CPoint___init___, list0);
	// set_attr(CPoint, "__init__", CPoint___init___closure);
	set_fun(CPoint, "__init__", CPoint___init___);

}

// ------------------------------------------------------------------------------------------------

/*
 * class Point:
 *
 * 		def __init__(self, x): 
 * 			self.x_ = x
 *	
 *			return None
 */

pyobj CPoint___init___(pyobj self, pyobj x) {

	set_attr(self, "x_", x);

}

// ------------------------------------------------------------------------------------------------


