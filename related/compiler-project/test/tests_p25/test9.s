	.section	__TEXT,__text,regular,pure_instructions
	.globl		_main
	.align		4, 0x90
_main:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$104,%esp
	movl	$1,%eax
	movl	%eax,-4(%ebp)
	movl	-4(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-8(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-12(%ebp)
	movl	$1,%eax
	movl	%eax,-16(%ebp)
	movl	-16(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_bool
	movl	%eax,-20(%ebp)
	movl	-20(%ebp),%eax
	movl	%eax,-24(%ebp)
	movl	-24(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-28(%ebp)
	movl	-28(%ebp),%eax
	cmpl	 $1,%eax
	jne	NEXT_IF_t4
	movl	$2,%eax
	movl	%eax,-32(%ebp)
	movl	-32(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-36(%ebp)
	movl	-36(%ebp),%eax
	movl	%eax,-40(%ebp)
	movl	$0,%eax
	movl	%eax,-44(%ebp)
	movl	-44(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_bool
	movl	%eax,-48(%ebp)
	movl	-48(%ebp),%eax
	movl	%eax,-52(%ebp)
	movl	-52(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-56(%ebp)
	movl	-56(%ebp),%eax
	cmpl	 $1,%eax
	jne	NEXT_IF_t12
	movl	$4,%eax
	movl	%eax,-60(%ebp)
	movl	-60(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-64(%ebp)
	movl	-64(%ebp),%eax
	movl	%eax,-68(%ebp)
	jmp	END_IF_t11
NEXT_IF_t12:
	jmp	END_IF_t11
END_IF_t11:
	movl	$3,%eax
	movl	%eax,-72(%ebp)
	movl	-72(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-76(%ebp)
	movl	-76(%ebp),%eax
	movl	%eax,-80(%ebp)
	jmp	END_IF_t3
NEXT_IF_t4:
	jmp	END_IF_t3
END_IF_t3:
	movl	$5,%eax
	movl	%eax,-84(%ebp)
	movl	-84(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-88(%ebp)
	movl	-88(%ebp),%eax
	movl	%eax,-92(%ebp)
	movl	$0, %eax
	leave
	ret

