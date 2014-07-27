	.section	__TEXT,__text,regular,pure_instructions
	.globl		_main
	.align		4, 0x90
_main:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$120,%esp
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
	call	_create_int
	movl	%eax,-20(%ebp)
	movl	-20(%ebp),%eax
	movl	%eax,-24(%ebp)
	jmp	BOT_WHILE_t5
TOP_WHILE_t5:
	movl	-28(%ebp),%eax
	cmpl	 $0,%eax
	je	END_WHILE_t5
	movl	$2,%eax
	movl	%eax,-32(%ebp)
	movl	-32(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-36(%ebp)
	movl	-36(%ebp),%eax
	movl	%eax,-12(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,-40(%ebp)
	movl	-40(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-44(%ebp)
	movl	-44(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
BOT_WHILE_t5:
	movl	$1,%eax
	movl	%eax,-48(%ebp)
	movl	-48(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_bool
	movl	%eax,-52(%ebp)
	movl	-52(%ebp),%eax
	movl	%eax,-56(%ebp)
	movl	-56(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_bool
	movl	%eax,-60(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,-64(%ebp)
	movl	-64(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-68(%ebp)
	movl	-24(%ebp),%eax
	movl	%eax,-72(%ebp)
	movl	-72(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-76(%ebp)
	movl	$0,-80(%ebp)
	movl	-68(%ebp),%eax
	cmpl	-76(%ebp),%eax
	je	LA1
	jmp	LB1
LA1:
	movl	$1,-80(%ebp)
LB1:
	movl	-80(%ebp),%eax
	movl	%eax,-84(%ebp)
	movl	-84(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_bool
	movl	%eax,-88(%ebp)
	movl	-88(%ebp),%eax
	movl	%eax,-92(%ebp)
	movl	-92(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_bool
	movl	%eax,-96(%ebp)
	movl	-60(%ebp), %eax
	movl	%eax, -100(%ebp)
	movl	-96(%ebp), %eax
	andl	%eax,-100(%ebp)
	movl	-100(%ebp),%eax
	movl	%eax,-104(%ebp)
	movl	-104(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_bool
	movl	%eax,-108(%ebp)
	movl	-108(%ebp),%eax
	movl	%eax,-112(%ebp)
	movl	-112(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-28(%ebp)
	jmp	TOP_WHILE_t5
	jmp	END_WHILE_t5
END_WHILE_t5:
	movl	$0, %eax
	leave
	ret

