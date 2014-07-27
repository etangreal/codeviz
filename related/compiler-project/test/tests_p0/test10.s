	.section	__TEXT,__text,regular,pure_instructions
	.globl		_main
	.align		4, 0x90
_main:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$24,%esp
	call	_start
	movl	%eax,-4(%ebp)
	movl	-4(%ebp),%eax
	movl	%eax,-12(%ebp)
	movl	$0, %eax
	leave
	ret

	.globl	_start
	.align	4,0x90
_start:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$24,%esp
	call	t4$pb
t4$pb:
	popl	%edi
	movl	$3, %eax
	movl	$6, %ecx
	movl	%eax, -8(%ebp)
	addl	%ecx,-8(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-12(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
	addl	$24, %esp
	popl	%ebp
	ret


