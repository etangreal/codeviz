	.section	__TEXT,__text,regular,pure_instructions
	.globl		_main
	.align		4, 0x90
_main:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$376,%esp
	movl	$1,%eax
	movl	%eax,-4(%ebp)
	movl	-4(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-8(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-12(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-16(%ebp)
	movl	$1,%eax
	movl	%eax,-20(%ebp)
	movl	-20(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-24(%ebp)
	movl	-24(%ebp),%eax
	movl	%eax,-28(%ebp)
	movl	-28(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-32(%ebp)
	movl	-16(%ebp), %eax
	movl	-32(%ebp), %ecx
	movl	%eax, -36(%ebp)
	addl	%ecx,-36(%ebp)
	movl	-36(%ebp),%eax
	movl	%eax,-40(%ebp)
	movl	-40(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-44(%ebp)
	movl	-44(%ebp),%eax
	movl	%eax,-48(%ebp)
	movl	-48(%ebp),%eax
	movl	%eax,-52(%ebp)
	movl	-52(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-56(%ebp)
	movl	$2,%eax
	movl	%eax,-60(%ebp)
	movl	-60(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-64(%ebp)
	movl	-64(%ebp),%eax
	movl	%eax,-68(%ebp)
	movl	-68(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-72(%ebp)
	movl	-56(%ebp), %eax
	movl	-72(%ebp), %ecx
	movl	%eax, -76(%ebp)
	addl	%ecx,-76(%ebp)
	movl	-76(%ebp),%eax
	movl	%eax,-80(%ebp)
	movl	-80(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-84(%ebp)
	movl	-84(%ebp),%eax
	movl	%eax,-88(%ebp)
	movl	-48(%ebp),%eax
	movl	%eax,-92(%ebp)
	movl	-92(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-96(%ebp)
	movl	-88(%ebp),%eax
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
	movl	-116(%ebp),%eax
	movl	%eax,-120(%ebp)
	movl	-48(%ebp),%eax
	movl	%eax,-124(%ebp)
	movl	-124(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-128(%ebp)
	movl	-88(%ebp),%eax
	movl	%eax,-132(%ebp)
	movl	-132(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-136(%ebp)
	movl	-128(%ebp), %eax
	movl	-136(%ebp), %ecx
	movl	%eax, -140(%ebp)
	addl	%ecx,-140(%ebp)
	movl	-140(%ebp),%eax
	movl	%eax,-144(%ebp)
	movl	-144(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-148(%ebp)
	movl	-148(%ebp),%eax
	movl	%eax,-152(%ebp)
	movl	-152(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-156(%ebp)
	movl	-120(%ebp),%eax
	movl	%eax,-160(%ebp)
	movl	-160(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-164(%ebp)
	movl	-156(%ebp), %eax
	movl	-164(%ebp), %ecx
	movl	%eax, -168(%ebp)
	addl	%ecx,-168(%ebp)
	movl	-168(%ebp),%eax
	movl	%eax,-172(%ebp)
	movl	-172(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-176(%ebp)
	movl	-176(%ebp),%eax
	movl	%eax,-180(%ebp)
	movl	$3,%eax
	movl	%eax,-184(%ebp)
	movl	-184(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-188(%ebp)
	movl	-188(%ebp),%eax
	movl	%eax,-192(%ebp)
	movl	-192(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-196(%ebp)
	movl	$2,%eax
	movl	%eax,-200(%ebp)
	movl	-200(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-204(%ebp)
	movl	-204(%ebp),%eax
	movl	%eax,-208(%ebp)
	movl	-208(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-212(%ebp)
	movl	$5,%eax
	movl	%eax,-216(%ebp)
	movl	-216(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-220(%ebp)
	movl	-220(%ebp),%eax
	movl	%eax,-224(%ebp)
	movl	-224(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-228(%ebp)
	movl	-212(%ebp), %eax
	movl	-228(%ebp), %ecx
	imull	%ecx,%eax
	movl	%eax,-232(%ebp)
	movl	-232(%ebp),%eax
	movl	%eax,-236(%ebp)
	movl	-236(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-240(%ebp)
	movl	-240(%ebp),%eax
	movl	%eax,-244(%ebp)
	movl	-244(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-248(%ebp)
	movl	-196(%ebp), %eax
	movl	-248(%ebp), %ecx
	movl	%eax, -252(%ebp)
	addl	%ecx,-252(%ebp)
	movl	-252(%ebp),%eax
	movl	%eax,-256(%ebp)
	movl	-256(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-260(%ebp)
	movl	-260(%ebp),%eax
	movl	%eax,-264(%ebp)
	movl	$1,%eax
	movl	%eax,-268(%ebp)
	movl	-268(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-272(%ebp)
	movl	-272(%ebp),%eax
	movl	%eax,-276(%ebp)
	movl	-276(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-280(%ebp)
	movl	-280(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
	call	_input
	movl	%eax,-284(%ebp)
	movl	-284(%ebp),%eax
	movl	%eax,-288(%ebp)
	movl	-288(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-292(%ebp)
	movl	-292(%ebp),%eax
	movl	%eax,-48(%ebp)
	movl	-264(%ebp),%eax
	movl	%eax,-296(%ebp)
	movl	-296(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-300(%ebp)
	movl	-180(%ebp),%eax
	movl	%eax,-304(%ebp)
	movl	-304(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-308(%ebp)
	movl	-300(%ebp), %eax
	movl	-308(%ebp), %ecx
	movl	%eax, -312(%ebp)
	addl	%ecx,-312(%ebp)
	movl	-312(%ebp),%eax
	movl	%eax,-316(%ebp)
	movl	-316(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-320(%ebp)
	movl	-320(%ebp),%eax
	movl	%eax,-324(%ebp)
	movl	-324(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-328(%ebp)
	movl	-48(%ebp),%eax
	movl	%eax,-332(%ebp)
	movl	-332(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-336(%ebp)
	movl	-328(%ebp), %eax
	movl	-336(%ebp), %ecx
	movl	%eax, -340(%ebp)
	addl	%ecx,-340(%ebp)
	movl	-340(%ebp),%eax
	movl	%eax,-344(%ebp)
	movl	-344(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-348(%ebp)
	movl	-348(%ebp),%eax
	movl	%eax,-352(%ebp)
	movl	-352(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-356(%ebp)
	movl	-356(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
	movl	$0, %eax
	leave
	ret

