	.section	__TEXT,__text,regular,pure_instructions
	.globl		_main
	.align		4, 0x90
_main:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$40,%esp
	jmp	BOT_WHILE_t1
TOP_WHILE_t1:
	movl	-4(%ebp),%eax
	cmpl	 $0,%eax
	je	END_WHILE_t1
	movl	$4,%eax
	movl	%eax,-8(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-12(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,-16(%ebp)
	movl	-16(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-20(%ebp)
	movl	-20(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
BOT_WHILE_t1:
	movl	$0,%eax
	movl	%eax,-24(%ebp)
	movl	-24(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_bool
	movl	%eax,-28(%ebp)
	movl	-28(%ebp),%eax
	movl	%eax,-32(%ebp)
	movl	-32(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-4(%ebp)
	jmp	TOP_WHILE_t1
	jmp	END_WHILE_t1
END_WHILE_t1:
	movl	$0, %eax
	leave
	ret

