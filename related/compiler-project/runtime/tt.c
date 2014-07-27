

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
pyobj CPoint___init___(pyobj self, pyobj x, pyobj y);
pyobj CPoint_move_(pyobj self, pyobj dx, pyobj dy);
pyobj CPoint_getX_(pyobj self);

/* classes */
pyobj CPoint;

int main() {

	setup_classes();

	// p = CPoint()
	pyobj p = create_object(CPoint);

	// p.x_ = 1
	// p.y_ = 1
	set_attr(p, "x_", create_int(1));
	set_attr(p, "y_", create_int(1));

	// print: 1
	// print: 1
	print_any(get_attr(p, "x_"));
	print_any(get_attr(p, "y_"));

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

	// ----------------------------------------------

	// p.move(1,1)
	{
		pyobj (*f)(pyobj, pyobj, pyobj) = (pyobj (*)(pyobj, pyobj, pyobj)) get_fun_ptr_from_attr(p, "move");
		f(p, create_int(1), create_int(1));

		// Rewrite method invocations to calls to:
		// get_attr, get_function, get_fun_ptr, 
		// and then finally the actual call.

		// pyobj meth = get_attr(p, "move");
		// pyobj fun = get_function(meth);
		// void* fp = get_fun_ptr(fun);
		// fp(p,create_int(1), create_int(1));
	}

	// print: 3
	// print: 5
	print_any(get_attr(p, "x_"));
	print_any(get_attr(p, "y_"));

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

	// if( p.x_ < p.y_ ):
	//		p.move(10,10)

	if( project_int(get_attr(p, "x_")) < project_int(get_attr(p, "y_"))) {

		pyobj (*f)(pyobj, pyobj, pyobj) = (pyobj (*)(pyobj, pyobj, pyobj)) get_fun_ptr_from_attr(p, "move");
		f(p, create_int(10), create_int(10));
	}

	// print: 5
	// print: 6
	print_any( get_attr(p, "x_") );
	print_any( get_attr(p, "y_") );

	// ----------------------------------------------

	return 0;
}

// ------------------------------------------------------------------------------------------------

static void setup_classes() {

	pyobj zero = create_int(0);
	pyobj one = create_int(1);

	pyobj list0 = create_list(zero);
	pyobj list1 = create_list(one);

	CPoint = create_class(list0);

	//create function: __init__
	pyobj CPoint___init___closure = create_closure(CPoint___init___, list0);
	set_attr(CPoint, "__init__", CPoint___init___closure);

	//create function: move
	pyobj CPoint_move_closure = create_closure(CPoint_move_, list0);
	set_attr(CPoint, "move", CPoint_move_closure);

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

pyobj CPoint___init___(pyobj self, pyobj x, pyobj y) {

	set_attr(self, "x_", x);
	set_attr(self, "y_", y);

	return NULL;
}

// ------------------------------------------------------------------------------------------------

/*
 * class Point:
 *
 *		def move(self,dx,dy):
 *			self.x_ = self.x_ + dx
 *			self.y_ = self.y_ + dy
 *			return None
 */

pyobj CPoint_move_(pyobj self, pyobj dx, pyobj dy) {

	pyobj x_ = get_attr(self, "x_");

  	int ix_ = project_int(x_);
  	int idx = project_int(dx);

  	pyobj nx = create_int(ix_ + idx);
	set_attr(self, "x_", nx);

	pyobj y_ = get_attr(self, "y_");

  	int iy_ = project_int(y_);
  	int idy = project_int(dy);

  	pyobj ny = create_int(iy_ + idy);
	set_attr(self, "y_", ny);

	return NULL;
}

// ------------------------------------------------------------------------------------------------

/*
 * class Point:
 *
 *		def getX(self):
 *			return self.x_
 *
 */

pyobj CPoint_getX_(pyobj self) {

	pyobj x_ = get_attr(self, "x_");

	return x_;
}

// ------------------------------------------------------------------------------------------------

