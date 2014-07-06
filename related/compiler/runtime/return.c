

// ------------------------------------------------------------------------------------------------

#include <stdlib.h>
#include <assert.h>
#include "runtime.h"

// ------------------------------------------------------------------------------------------------

/*
	class Point:

		x_ = 1

		def __init__ (self, x, y):
			self.x_ = x
			self.y_ = y

		def move(self,dx,dy):
			self.x_ = self.x_ + dx
			self.y_ = self.y_ + dy

		def getX(self):
			return self.x_

	p = Point(2,4)

	x = p.getX()

	if( p.x_ < p.y_ ):
		p.move(10,10)

	print p.x_ + p.y_
*/

// ------------------------------------------------------------------------------------------------

/* forward */

static void setup_classes();
pyobj CPoint___init___(pyobj self, pyobj x);

pyobj CPoint_getX_(pyobj self);

/* classes */
pyobj CPoint;

int main() {

	setup_classes();

	// p = CPoint()
	pyobj p = create_object(CPoint);



	// ----------------------------------------------

	// p.__init__(2)
	{
		pyobj (*f)(pyobj, pyobj) = (pyobj (*)(pyobj, pyobj)) get_fun_ptr_from_attr(p, "__init__");
		f(p, create_int(2));
	}


	// ----------------------------------------------

	pyobj x_;
	// x_ = p.getX()
	{
		pyobj meth = get_attr(p, "getX");
		pyobj fun = get_function(meth);
		void *fp = get_fun_ptr(fun);
		pyobj (*f)(pyobj) = (pyobj (*)(pyobj)) fp; // cast to a function pointer type
		x_ = f(get_receiver(meth));

		//print: 3
		print_any(x_);
	}

	// ----------------------------------------------

	return 0;
}

// ------------------------------------------------------------------------------------------------

static void setup_classes() {

	pyobj zero = create_int(0);
	pyobj one = create_int(1);

	pyobj list0 = create_list(zero);
	
	CPoint = create_class(list0);

	//create function: __init__
	pyobj CPoint___init___closure = create_closure(CPoint___init___, list0);
	set_attr(CPoint, "__init__", CPoint___init___closure);

	//create function: getX
	pyobj CPoint_getX_closure = create_closure(CPoint_getX_, list0);
	set_attr(CPoint, "getX", CPoint_getX_closure);
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

	set_attr(self, "x_", x);

}

// ------------------------------------------------------------------------------------------------



// ------------------------------------------------------------------------------------------------

/*
 * class Point:
 *
 *		def getX(self):
 *			return self.x_
 *
 */

pyobj CPoint_getX_(pyobj self) {

	pyobj x;
	x = create_int(200);
	return x;
}

// ------------------------------------------------------------------------------------------------

