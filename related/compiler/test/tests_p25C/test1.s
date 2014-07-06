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
	subl	$56,%esp
	call	t28$pb
t28$pb:
	popl	%eax
	movl	%eax, -4(%ebp)
	call	_setup_CPoint
	movl	%eax,-8(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-16(%ebp)
	movl	-24(%ebp),%eax
	movl	%eax,-20(%ebp)
	movl	-4(%ebp),%ecx
	leal	CPoint_getX.str-t28$pb(%ecx),%eax
	movl	%eax,-28(%ebp)
	movl	-20(%ebp),%eax
	movl	%eax, (%esp)
	movl	-28(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-20(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	-32(%ebp),%eax
	movl	%eax,-36(%ebp)
	movl	-36(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-40(%ebp)
	movl	-40(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
t29$pb:
	addl	$56, %esp
	popl	%ebp
	ret


	.globl	_CPoint___init__
	.align	4,0x90
_CPoint___init__:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$40,%esp
	call	t30$pb
t30$pb:
	popl	%eax
	movl	%eax, -4(%ebp)
	movl	8(%ebp),%ecx
	movl	%ecx,-8(%ebp)
	movl	$1,%eax
	movl	%eax,-12(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-16(%ebp)
	movl	-16(%ebp),%eax
	movl	%eax,-24(%ebp)
t31$pb:
	addl	$40, %esp
	popl	%ebp
	ret


	.globl	_CPoint_getX
	.align	4,0x90
_CPoint_getX:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$40,%esp
	call	t32$pb
t32$pb:
	popl	%eax
	movl	%eax, -4(%ebp)
	movl	8(%ebp),%ecx
	movl	%ecx,-8(%ebp)
	movl	$1,%eax
	movl	%eax,-12(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-16(%ebp)
	movl	-16(%ebp),%eax
	jmp	t33$pb
t33$pb:
	addl	$40, %esp
	popl	%ebp
	ret


	.globl	_setup_CPoint
	.align	4,0x90
_setup_CPoint:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$88,%esp
	call	t34$pb
t34$pb:
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
	movl	CPoint$non_lazy_ptr-t34$pb(%ecx),%edx
	movl	-36(%ebp),%eax
	movl	%eax,(%edx)
	movl	-4(%ebp),%ecx
	movl	CPoint$non_lazy_ptr-t34$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-40(%ebp)
	movl	-4(%ebp),%ecx
	leal	CPoint___init__.str-t34$pb(%ecx),%eax
	movl	%eax,-44(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CPoint___init__-t34$pb(%ecx),%eax
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
	movl	CPoint$non_lazy_ptr-t34$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-56(%ebp)
	movl	-4(%ebp),%ecx
	leal	CPoint_getX.str-t34$pb(%ecx),%eax
	movl	%eax,-60(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CPoint_getX-t34$pb(%ecx),%eax
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
t35$pb:
	addl	$88, %esp
	popl	%ebp
	ret

	.comm	CPoint,4,2
	.section  __TEXT,__cstring,cstring_literals
CPoint___init__.str:
	.asciz	"CPoint___init__"

CPoint_getX.str:
	.asciz	"CPoint_getX"


	.section  __IMPORT,__pointers,non_lazy_symbol_pointers
CPoint$non_lazy_ptr:
.indirect_symbol CPoint
	.long	0

.subsections_via_symbols

