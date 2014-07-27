	.section	__TEXT,__text,regular,pure_instructions
	.globl		_main
	.align		4, 0x90
_main:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$24,%esp
	call	_start
	movl	%eax,-8(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-16(%ebp)
	movl	$0, %eax
	leave
	ret

	.globl	_start
	.align	4,0x90
_start:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$264,%esp
	call	t141$pb
t141$pb:
	popl	%eax
	movl	%eax, -4(%ebp)
	call	_setup_CRectangle
	movl	%eax,-8(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-16(%ebp)
	movl	-4(%ebp),%ecx
	movl	CRectangle$non_lazy_ptr-t141$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-20(%ebp)
	movl	-20(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_object
	movl	%eax,-28(%ebp)
	movl	-28(%ebp),%eax
	movl	%eax,-32(%ebp)
	movl	-32(%ebp),%eax
	movl	%eax,-36(%ebp)
	movl	-4(%ebp),%ecx
	leal	CRectangle___init__.str-t141$pb(%ecx),%eax
	movl	%eax,-40(%ebp)
	movl	$1,%eax
	movl	%eax,-44(%ebp)
	movl	$1,%eax
	movl	%eax,-48(%ebp)
	movl	-36(%ebp),%eax
	movl	%eax, (%esp)
	movl	-40(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-48(%ebp),%eax
	movl	%eax, (%esp)
	call	_create_int
	movl	%eax, 8(%esp)
	movl	-44(%ebp),%eax
	movl	%eax, (%esp)
	call	_create_int
	movl	%eax, 4(%esp)
	movl	-36(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-52(%ebp)
	movl	-52(%ebp),%eax
	movl	%eax,-56(%ebp)
	movl	-32(%ebp),%eax
	movl	%eax,-60(%ebp)
	movl	-4(%ebp),%ecx
	leal	CRectangle_area.str-t141$pb(%ecx),%eax
	movl	%eax,-64(%ebp)
	movl	-60(%ebp),%eax
	movl	%eax, (%esp)
	movl	-64(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-60(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-68(%ebp)
	movl	-68(%ebp),%eax
	movl	%eax,-72(%ebp)
	movl	-72(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-76(%ebp)
	movl	-76(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
	movl	-4(%ebp),%ecx
	movl	CRectangle$non_lazy_ptr-t141$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-80(%ebp)
	movl	-80(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_object
	movl	%eax,-84(%ebp)
	movl	-84(%ebp),%eax
	movl	%eax,-88(%ebp)
	movl	-88(%ebp),%eax
	movl	%eax,-92(%ebp)
	movl	-4(%ebp),%ecx
	leal	CRectangle___init__.str-t141$pb(%ecx),%eax
	movl	%eax,-96(%ebp)
	movl	$2,%eax
	movl	%eax,-100(%ebp)
	movl	$2,%eax
	movl	%eax,-104(%ebp)
	movl	-92(%ebp),%eax
	movl	%eax, (%esp)
	movl	-96(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-104(%ebp),%eax
	movl	%eax, (%esp)
	call	_create_int
	movl	%eax, 8(%esp)
	movl	-100(%ebp),%eax
	movl	%eax, (%esp)
	call	_create_int
	movl	%eax, 4(%esp)
	movl	-92(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-108(%ebp)
	movl	-108(%ebp),%eax
	movl	%eax,-112(%ebp)
	movl	$2,%eax
	movl	%eax,-116(%ebp)
	movl	-116(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-120(%ebp)
	movl	-120(%ebp),%eax
	movl	%eax,-124(%ebp)
	movl	-124(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-128(%ebp)
	movl	-88(%ebp),%eax
	movl	%eax,-132(%ebp)
	movl	-4(%ebp),%ecx
	leal	CRectangle_h.str-t141$pb(%ecx),%eax
	movl	%eax,-136(%ebp)
	movl	-132(%ebp),%eax
	movl	%eax,(%esp)
	movl	-136(%ebp),%eax
	movl	%eax,4(%esp)
	call	_get_attr
	movl	%eax,-140(%ebp)
	movl	-140(%ebp),%eax
	movl	%eax,-144(%ebp)
	movl	-144(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-148(%ebp)
	movl	-128(%ebp), %eax
	movl	-148(%ebp), %ecx
	imull	%ecx,%eax
	movl	%eax,-152(%ebp)
	movl	-152(%ebp),%eax
	movl	%eax,-156(%ebp)
	movl	-156(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-160(%ebp)
	movl	-160(%ebp),%eax
	movl	%eax,-164(%ebp)
	movl	-88(%ebp),%eax
	movl	%eax,-168(%ebp)
	movl	-4(%ebp),%ecx
	leal	CRectangle_h.str-t141$pb(%ecx),%eax
	movl	%eax,-172(%ebp)
	movl	-168(%ebp),%eax
	movl	%eax,(%esp)
	movl	-172(%ebp),%eax
	movl	%eax,4(%esp)
	call	_get_attr
	movl	%eax,-176(%ebp)
	movl	-176(%ebp),%eax
	movl	%eax,-180(%ebp)
	movl	-180(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-184(%ebp)
	movl	-164(%ebp),%eax
	movl	%eax,-188(%ebp)
	movl	-188(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-192(%ebp)
	movl	$0,-196(%ebp)
	movl	-184(%ebp),%eax
	cmpl	-192(%ebp),%eax
	jle	LA1
	jmp	LB1
LA1:
	movl	$1,-196(%ebp)
LB1:
	movl	-196(%ebp),%eax
	movl	%eax,-200(%ebp)
	movl	-200(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_bool
	movl	%eax,-204(%ebp)
	movl	-204(%ebp),%eax
	movl	%eax,-208(%ebp)
	movl	-208(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-212(%ebp)
	movl	-212(%ebp),%eax
	cmpl	 $1,%eax
	jne	NEXT_IF_t39
	movl	-88(%ebp),%eax
	movl	%eax,-216(%ebp)
	movl	-4(%ebp),%ecx
	leal	CRectangle_increase.str-t141$pb(%ecx),%eax
	movl	%eax,-220(%ebp)
	movl	$1,%eax
	movl	%eax,-224(%ebp)
	movl	$1,%eax
	movl	%eax,-228(%ebp)
	movl	-216(%ebp),%eax
	movl	%eax, (%esp)
	movl	-220(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-228(%ebp),%eax
	movl	%eax, (%esp)
	call	_create_int
	movl	%eax, 8(%esp)
	movl	-224(%ebp),%eax
	movl	%eax, (%esp)
	call	_create_int
	movl	%eax, 4(%esp)
	movl	-216(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-232(%ebp)
	movl	-232(%ebp),%eax
	movl	%eax,-236(%ebp)
	jmp	END_IF_t38
NEXT_IF_t39:
	jmp	END_IF_t38
END_IF_t38:
	movl	-88(%ebp),%eax
	movl	%eax,-240(%ebp)
	movl	-4(%ebp),%ecx
	leal	CRectangle_area.str-t141$pb(%ecx),%eax
	movl	%eax,-244(%ebp)
	movl	-240(%ebp),%eax
	movl	%eax, (%esp)
	movl	-244(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-240(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-248(%ebp)
	movl	-248(%ebp),%eax
	movl	%eax,-252(%ebp)
	movl	-252(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-256(%ebp)
	movl	-256(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
t142:
	addl	$264, %esp
	popl	%ebp
	ret


	.globl	_CRectangle___init__
	.align	4,0x90
_CRectangle___init__:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$72,%esp
	call	t143$pb
t143$pb:
	popl	%eax
	movl	%eax, -4(%ebp)
	movl	16(%ebp),%ecx
	movl	12(%ebp),%edx
	movl	8(%ebp),%esi
	movl	%ecx,-16(%ebp)
	movl	%edx,-12(%ebp)
	movl	%esi,-8(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-20(%ebp)
	movl	-4(%ebp),%ecx
	leal	CRectangle_h.str-t143$pb(%ecx),%eax
	movl	%eax,-24(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,-28(%ebp)
	movl	-20(%ebp),%eax
	movl	%eax,(%esp)
	movl	-24(%ebp),%eax
	movl	%eax,4(%esp)
	movl	-28(%ebp),%eax
	movl	%eax,8(%esp)
	call	_set_attr
	movl	%eax,-32(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-40(%ebp)
	movl	-4(%ebp),%ecx
	leal	CRectangle_w.str-t143$pb(%ecx),%eax
	movl	%eax,-44(%ebp)
	movl	-16(%ebp),%eax
	movl	%eax,-48(%ebp)
	movl	-40(%ebp),%eax
	movl	%eax,(%esp)
	movl	-44(%ebp),%eax
	movl	%eax,4(%esp)
	movl	-48(%ebp),%eax
	movl	%eax,8(%esp)
	call	_set_attr
	movl	%eax,-52(%ebp)
t144:
	addl	$72, %esp
	popl	%ebp
	ret


	.globl	_CRectangle_area
	.align	4,0x90
_CRectangle_area:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$88,%esp
	call	t145$pb
t145$pb:
	popl	%eax
	movl	%eax, -4(%ebp)
	movl	8(%ebp),%ecx
	movl	%ecx,-8(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-12(%ebp)
	movl	-4(%ebp),%ecx
	leal	CRectangle_h.str-t145$pb(%ecx),%eax
	movl	%eax,-16(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,(%esp)
	movl	-16(%ebp),%eax
	movl	%eax,4(%esp)
	call	_get_attr
	movl	%eax,-20(%ebp)
	movl	-20(%ebp),%eax
	movl	%eax,-28(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-32(%ebp)
	movl	-4(%ebp),%ecx
	leal	CRectangle_w.str-t145$pb(%ecx),%eax
	movl	%eax,-36(%ebp)
	movl	-32(%ebp),%eax
	movl	%eax,(%esp)
	movl	-36(%ebp),%eax
	movl	%eax,4(%esp)
	call	_get_attr
	movl	%eax,-40(%ebp)
	movl	-40(%ebp),%eax
	movl	%eax,-44(%ebp)
	movl	-28(%ebp),%eax
	movl	%eax,-48(%ebp)
	movl	-48(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-52(%ebp)
	movl	-44(%ebp),%eax
	movl	%eax,-56(%ebp)
	movl	-56(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-60(%ebp)
	movl	-52(%ebp), %eax
	movl	-60(%ebp), %ecx
	imull	%ecx,%eax
	movl	%eax,-64(%ebp)
	movl	-64(%ebp),%eax
	movl	%eax,-68(%ebp)
	movl	-68(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-72(%ebp)
	movl	-72(%ebp),%eax
	movl	%eax,-76(%ebp)
	movl	-76(%ebp),%eax
	jmp	t146
t146:
	addl	$88, %esp
	popl	%ebp
	ret


	.globl	_CRectangle_toSquare
	.align	4,0x90
_CRectangle_toSquare:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$56,%esp
	call	t147$pb
t147$pb:
	popl	%eax
	movl	%eax, -4(%ebp)
	movl	8(%ebp),%ecx
	movl	%ecx,-8(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-12(%ebp)
	movl	-4(%ebp),%ecx
	leal	CRectangle_h.str-t147$pb(%ecx),%eax
	movl	%eax,-16(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,(%esp)
	movl	-16(%ebp),%eax
	movl	%eax,4(%esp)
	call	_get_attr
	movl	%eax,-20(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-28(%ebp)
	movl	-4(%ebp),%ecx
	leal	CRectangle_w.str-t147$pb(%ecx),%eax
	movl	%eax,-32(%ebp)
	movl	-20(%ebp),%eax
	movl	%eax,-36(%ebp)
	movl	-28(%ebp),%eax
	movl	%eax,(%esp)
	movl	-32(%ebp),%eax
	movl	%eax,4(%esp)
	movl	-36(%ebp),%eax
	movl	%eax,8(%esp)
	call	_set_attr
	movl	%eax,-40(%ebp)
t148:
	addl	$56, %esp
	popl	%ebp
	ret


	.globl	_CRectangle_increase
	.align	4,0x90
_CRectangle_increase:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$152,%esp
	call	t149$pb
t149$pb:
	popl	%eax
	movl	%eax, -4(%ebp)
	movl	16(%ebp),%ecx
	movl	12(%ebp),%edx
	movl	8(%ebp),%esi
	movl	%ecx,-16(%ebp)
	movl	%edx,-12(%ebp)
	movl	%esi,-8(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-20(%ebp)
	movl	-4(%ebp),%ecx
	leal	CRectangle_h.str-t149$pb(%ecx),%eax
	movl	%eax,-24(%ebp)
	movl	-20(%ebp),%eax
	movl	%eax,(%esp)
	movl	-24(%ebp),%eax
	movl	%eax,4(%esp)
	call	_get_attr
	movl	%eax,-28(%ebp)
	movl	-28(%ebp),%eax
	movl	%eax,-36(%ebp)
	movl	-36(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-40(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,-44(%ebp)
	movl	-44(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-48(%ebp)
	movl	-40(%ebp), %eax
	movl	-48(%ebp), %ecx
	movl	%eax, -52(%ebp)
	addl	%ecx,-52(%ebp)
	movl	-52(%ebp),%eax
	movl	%eax,-56(%ebp)
	movl	-56(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-60(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-64(%ebp)
	movl	-4(%ebp),%ecx
	leal	CRectangle_h.str-t149$pb(%ecx),%eax
	movl	%eax,-68(%ebp)
	movl	-60(%ebp),%eax
	movl	%eax,-72(%ebp)
	movl	-64(%ebp),%eax
	movl	%eax,(%esp)
	movl	-68(%ebp),%eax
	movl	%eax,4(%esp)
	movl	-72(%ebp),%eax
	movl	%eax,8(%esp)
	call	_set_attr
	movl	%eax,-76(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-80(%ebp)
	movl	-4(%ebp),%ecx
	leal	CRectangle_w.str-t149$pb(%ecx),%eax
	movl	%eax,-84(%ebp)
	movl	-80(%ebp),%eax
	movl	%eax,(%esp)
	movl	-84(%ebp),%eax
	movl	%eax,4(%esp)
	call	_get_attr
	movl	%eax,-88(%ebp)
	movl	-88(%ebp),%eax
	movl	%eax,-92(%ebp)
	movl	-92(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-96(%ebp)
	movl	-16(%ebp),%eax
	movl	%eax,-100(%ebp)
	movl	-100(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-104(%ebp)
	movl	-96(%ebp), %eax
	movl	-104(%ebp), %ecx
	movl	%eax, -108(%ebp)
	addl	%ecx,-108(%ebp)
	movl	-108(%ebp),%eax
	movl	%eax,-112(%ebp)
	movl	-112(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-116(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-120(%ebp)
	movl	-4(%ebp),%ecx
	leal	CRectangle_w.str-t149$pb(%ecx),%eax
	movl	%eax,-124(%ebp)
	movl	-116(%ebp),%eax
	movl	%eax,-128(%ebp)
	movl	-120(%ebp),%eax
	movl	%eax,(%esp)
	movl	-124(%ebp),%eax
	movl	%eax,4(%esp)
	movl	-128(%ebp),%eax
	movl	%eax,8(%esp)
	call	_set_attr
	movl	%eax,-132(%ebp)
t150:
	addl	$152, %esp
	popl	%ebp
	ret


	.globl	_setup_CRectangle
	.align	4,0x90
_setup_CRectangle:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$120,%esp
	call	t151$pb
t151$pb:
	popl	%eax
	movl	%eax, -4(%ebp)
	movl	$0,%eax
	movl	%eax,-8(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-12(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,-20(%ebp)
	movl	-20(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_list
	movl	%eax,-24(%ebp)
	movl	-24(%ebp),%eax
	movl	%eax,-28(%ebp)
	movl	-28(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_class
	movl	%eax,-32(%ebp)
	movl	-32(%ebp),%eax
	movl	%eax,-36(%ebp)
	movl	-4(%ebp),%ecx
	movl	CRectangle$non_lazy_ptr-t151$pb(%ecx),%edx
	movl	-36(%ebp),%eax
	movl	%eax,(%edx)
	movl	-4(%ebp),%ecx
	movl	CRectangle$non_lazy_ptr-t151$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-40(%ebp)
	movl	-4(%ebp),%ecx
	leal	CRectangle___init__.str-t151$pb(%ecx),%eax
	movl	%eax,-44(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CRectangle___init__-t151$pb(%ecx),%eax
	movl	%eax,-48(%ebp)
	movl	%esp,%edx
	movl	-48(%ebp),%eax
	movl	%eax,8(%edx)
	movl	-44(%ebp),%eax
	movl	%eax,4(%edx)
	movl	-40(%ebp),%eax
	movl	%eax,(%edx)
	call	_set_fun
	movl	%eax,-52(%ebp)
	movl	-4(%ebp),%ecx
	movl	CRectangle$non_lazy_ptr-t151$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-56(%ebp)
	movl	-4(%ebp),%ecx
	leal	CRectangle_area.str-t151$pb(%ecx),%eax
	movl	%eax,-60(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CRectangle_area-t151$pb(%ecx),%eax
	movl	%eax,-64(%ebp)
	movl	%esp,%edx
	movl	-64(%ebp),%eax
	movl	%eax,8(%edx)
	movl	-60(%ebp),%eax
	movl	%eax,4(%edx)
	movl	-56(%ebp),%eax
	movl	%eax,(%edx)
	call	_set_fun
	movl	%eax,-68(%ebp)
	movl	-4(%ebp),%ecx
	movl	CRectangle$non_lazy_ptr-t151$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-72(%ebp)
	movl	-4(%ebp),%ecx
	leal	CRectangle_toSquare.str-t151$pb(%ecx),%eax
	movl	%eax,-76(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CRectangle_toSquare-t151$pb(%ecx),%eax
	movl	%eax,-80(%ebp)
	movl	%esp,%edx
	movl	-80(%ebp),%eax
	movl	%eax,8(%edx)
	movl	-76(%ebp),%eax
	movl	%eax,4(%edx)
	movl	-72(%ebp),%eax
	movl	%eax,(%edx)
	call	_set_fun
	movl	%eax,-84(%ebp)
	movl	-4(%ebp),%ecx
	movl	CRectangle$non_lazy_ptr-t151$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-88(%ebp)
	movl	-4(%ebp),%ecx
	leal	CRectangle_increase.str-t151$pb(%ecx),%eax
	movl	%eax,-92(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CRectangle_increase-t151$pb(%ecx),%eax
	movl	%eax,-96(%ebp)
	movl	%esp,%edx
	movl	-96(%ebp),%eax
	movl	%eax,8(%edx)
	movl	-92(%ebp),%eax
	movl	%eax,4(%edx)
	movl	-88(%ebp),%eax
	movl	%eax,(%edx)
	call	_set_fun
	movl	%eax,-100(%ebp)
t152:
	addl	$120, %esp
	popl	%ebp
	ret

	.comm	CRectangle,4,2
	.section  __TEXT,__cstring,cstring_literals
CRectangle___init__.str:
	.asciz	"CRectangle___init__"

CRectangle_area.str:
	.asciz	"CRectangle_area"

CRectangle_toSquare.str:
	.asciz	"CRectangle_toSquare"

CRectangle_increase.str:
	.asciz	"CRectangle_increase"

CRectangle_h.str:
	.asciz	"CRectangle_h"

CRectangle_w.str:
	.asciz	"CRectangle_w"


	.section  __IMPORT,__pointers,non_lazy_symbol_pointers
CRectangle$non_lazy_ptr:
.indirect_symbol CRectangle
	.long	0

.subsections_via_symbols

