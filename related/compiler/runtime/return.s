	.section	__TEXT,__text,regular,pure_instructions
	.globl	_main
	.align	4, 0x90
_main:
	pushl	%ebp
	movl	%esp, %ebp
	subl	$56, %esp
	call	L1$pb
L1$pb:
	popl	%eax
	movl	%eax, -40(%ebp)
	call	_setup_classes
	movl	-40(%ebp), %eax
	movl	L_CPoint$non_lazy_ptr-L1$pb(%eax), %ecx
	movl	(%ecx), %ecx
	movl	%ecx, (%esp)
	call	_create_object
	movl	%eax, -12(%ebp)
	movl	-12(%ebp), %eax
	movl	-40(%ebp), %ecx
	leal	L_.str-L1$pb(%ecx), %edx
	movl	%eax, (%esp)
	movl	%edx, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -20(%ebp)
	movl	$2, (%esp)
	call	_create_int
	movl	-20(%ebp), %ecx
	movl	-12(%ebp), %edx
	movl	%edx, (%esp)
	movl	%eax, 4(%esp)
	call	*%ecx
	movl	-12(%ebp), %eax
	movl	-40(%ebp), %ecx
	leal	L_.str1-L1$pb(%ecx), %ecx
	movl	%eax, (%esp)
	movl	%ecx, 4(%esp)
	call	_get_attr
	movl	%eax, -24(%ebp)
	movl	-24(%ebp), %eax
	movl	%eax, (%esp)
	call	_get_function
	movl	%eax, -28(%ebp)
	movl	-28(%ebp), %eax
	movl	%eax, (%esp)
	call	_get_fun_ptr
	movl	%eax, -32(%ebp)
	movl	-32(%ebp), %eax
	movl	%eax, -36(%ebp)
	movl	-24(%ebp), %eax
	movl	%eax, (%esp)
	call	_get_receiver
	movl	-36(%ebp), %ecx
	movl	%eax, (%esp)
	call	*%ecx
	movl	%eax, -16(%ebp)
	movl	-16(%ebp), %eax
	movl	%eax, (%esp)
	call	_print_any
	movl	$0, -8(%ebp)
	movl	-8(%ebp), %eax
	movl	%eax, -4(%ebp)
	movl	-4(%ebp), %eax
	addl	$56, %esp
	popl	%ebp
	ret

	.align	4, 0x90
_setup_classes:
	pushl	%ebp
	movl	%esp, %ebp
	pushl	%edi
	pushl	%esi
	subl	$48, %esp
	call	L2$pb
L2$pb:
	popl	%eax
	movl	$0, (%esp)
	movl	%eax, -32(%ebp)
	call	_create_int
	movl	%eax, -12(%ebp)
	movl	$1, (%esp)
	call	_create_int
	movl	%eax, -16(%ebp)
	movl	-12(%ebp), %eax
	movl	%eax, (%esp)
	call	_create_list
	movl	%eax, -20(%ebp)
	movl	-20(%ebp), %eax
	movl	%eax, (%esp)
	call	_create_class
	movl	-32(%ebp), %ecx
	movl	L_CPoint$non_lazy_ptr-L2$pb(%ecx), %edx
	movl	%eax, (%edx)
	movl	-20(%ebp), %eax
	leal	_CPoint___init___-L2$pb(%ecx), %esi
	movl	%esi, (%esp)
	movl	%eax, 4(%esp)
	movl	%edx, -36(%ebp)
	call	_create_closure
	movl	%eax, -24(%ebp)
	movl	-36(%ebp), %eax
	movl	(%eax), %ecx
	movl	-24(%ebp), %edx
	movl	-32(%ebp), %esi
	leal	L_.str-L2$pb(%esi), %edi
	movl	%ecx, (%esp)
	movl	%edi, 4(%esp)
	movl	%edx, 8(%esp)
	call	_set_attr
	movl	-20(%ebp), %eax
	leal	_CPoint_getX_-L2$pb(%esi), %ecx
	movl	%ecx, (%esp)
	movl	%eax, 4(%esp)
	call	_create_closure
	movl	%eax, -28(%ebp)
	movl	-36(%ebp), %eax
	movl	(%eax), %eax
	movl	-28(%ebp), %ecx
	leal	L_.str1-L2$pb(%esi), %edx
	movl	%eax, (%esp)
	movl	%edx, 4(%esp)
	movl	%ecx, 8(%esp)
	call	_set_attr
	addl	$48, %esp
	popl	%esi
	popl	%edi
	popl	%ebp
	ret

	.globl	_CPoint___init___
	.align	4, 0x90
_CPoint___init___:
	pushl	%ebp
	movl	%esp, %ebp
	subl	$24, %esp
	call	L3$pb
L3$pb:
	popl	%eax
	movl	12(%ebp), %ecx
	movl	8(%ebp), %edx
	movl	%edx, -4(%ebp)
	movl	%ecx, -8(%ebp)
	movl	-4(%ebp), %ecx
	movl	-8(%ebp), %edx
	leal	L_.str2-L3$pb(%eax), %eax
	movl	%ecx, (%esp)
	movl	%eax, 4(%esp)
	movl	%edx, 8(%esp)
	call	_set_attr
	movl	-12(%ebp), %eax
	addl	$24, %esp
	popl	%ebp
	ret

	.globl	_CPoint_getX_
	.align	4, 0x90
_CPoint_getX_:
	pushl	%ebp
	movl	%esp, %ebp
	subl	$24, %esp
	movl	8(%ebp), %eax
	movl	%eax, -4(%ebp)
	movl	$200, (%esp)
	call	_create_int
	movl	%eax, -16(%ebp)
	movl	-16(%ebp), %eax
	movl	%eax, -12(%ebp)
	movl	-12(%ebp), %eax
	movl	%eax, -8(%ebp)
	movl	-8(%ebp), %eax
	addl	$24, %esp
	popl	%ebp
	ret

	.comm	_CPoint,4,2
	.section	__TEXT,__cstring,cstring_literals
L_.str:
	.asciz	 "__init__"

L_.str1:
	.asciz	 "getX"

L_.str2:
	.asciz	 "x_"


	.section	__IMPORT,__pointers,non_lazy_symbol_pointers
L_CPoint$non_lazy_ptr:
.indirect_symbol _CPoint
	.long	0

.subsections_via_symbols
