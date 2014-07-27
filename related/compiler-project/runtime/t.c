

// ------------------------------------------------------------------------------------------------

#include <stdlib.h>
#include <assert.h>
#include "runtime.h"

// ------------------------------------------------------------------------------------------------

/*
	class Point:

		def __init__ (self, x, y):
			self.x_ = x
			self.y_ = y

	p = Point(2,4)

*/

// ------------------------------------------------------------------------------------------------

/* forward */
pyobj CPoint___init___(pyobj self, pyobj x, pyobj y);

/* classes */
pyobj CPoint;

int main() {

	pyobj zero = create_int(0);
	pyobj list0 = create_list(zero);

	CPoint = create_class(list0);

	//create function: __init__
	pyobj CPoint___init___closure = create_closure(CPoint___init___, list0);
	set_attr(CPoint, "__init__", CPoint___init___closure);

	// p = CPoint()
	pyobj p = create_object(CPoint);

	// ----------------------------------------------

	// p.__init__(2,4)
	{
		pyobj (*f)(pyobj, pyobj, pyobj) = (pyobj (*)(pyobj, pyobj, pyobj)) get_fun_ptr_from_attr(p, "__init__");
		f(p, create_int(2), create_int(4));
	}

	// print: 2
	// print: 4
	print_any( get_attr(p, "x_") );
	print_any( get_attr(p, "y_") );

	return 0;
}

// ------------------------------------------------------------------------------------------------

/*
 * class Point:
 *
 * 		def __init__(self, x, y): 
 * 			self.x_ = x
 *			self.y_ = y
 *			return None
 */

pyobj CPoint___init___(pyobj self, pyobj x, pyobj y) {

	set_attr(self, "x_", x);
	set_attr(self, "y_", y);

	return NULL;
}

// ------------------------------------------------------------------------------------------------
