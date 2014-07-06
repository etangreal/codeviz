

// ------------------------------------------------------------------------------------------------

#include <stdlib.h>
#include <assert.h>
#include "runtime.h"

// ------------------------------------------------------------------------------------------------

/*
	class Point:

		def __init__ (self, x):
			self.x_ = x
	



*/

// ------------------------------------------------------------------------------------------------

/* forward */
pyobj CPoint___init___(pyobj self, pyobj x);

/* classes */
pyobj CPoint;

int main() {

	pyobj zero = create_int(0);
	pyobj one = create_int(1);
	pyobj list0 = create_list(zero);

	CPoint = create_class(list0);
	set_fun(CPoint,"__init__", CPoint___init___);


	
	  // c.f = 1
 	//set_attr(CPoint, "x_", one);
	//set_fun(CPoint,"move", CPoint_move);

	pyobj p = create_object(CPoint);

	// // p.__init__(2)
	{
		pyobj (*f)(pyobj, pyobj ) = (pyobj (*)(pyobj, pyobj)) get_fun_ptr_from_attr(p, "__init__");
		f(p, create_int(2));
	}

	print_any( create_int(100));

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

pyobj CPoint___init___(pyobj self, pyobj x) {

	set_attr(self, "x", x);
	
}
// pyobj CPoint_move(pyobj self) {

// 	pyobj x =  create_int(0);
	
// }

// ------------------------------------------------------------------------------------------------
