	.section	__TEXT,__text,regular,pure_instructions
	.globl		_main
	.align		4, 0x90
_main:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$552,%esp
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
	movl	$5,%eax
	movl	%eax,-52(%ebp)
	movl	-52(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-56(%ebp)
	movl	-56(%ebp),%eax
	movl	%eax,-60(%ebp)
	movl	-60(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-64(%ebp)
	movl	$2,%eax
	movl	%eax,-68(%ebp)
	movl	-68(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-72(%ebp)
	movl	-72(%ebp),%eax
	movl	%eax,-76(%ebp)
	movl	-76(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-80(%ebp)
	movl	-64(%ebp), %eax
	movl	-80(%ebp), %ecx
	imull	%ecx,%eax
	movl	%eax,-84(%ebp)
	movl	-84(%ebp),%eax
	movl	%eax,-88(%ebp)
	movl	-88(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-92(%ebp)
	movl	-92(%ebp),%eax
	movl	%eax,-96(%ebp)
	movl	-96(%ebp),%eax
	movl	%eax,-100(%ebp)
	movl	-100(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-104(%ebp)
	movl	-104(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
	movl	$1,%eax
	movl	%eax,-108(%ebp)
	movl	-108(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-112(%ebp)
	movl	-112(%ebp),%eax
	movl	%eax,-116(%ebp)
	movl	-116(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-120(%ebp)
	movl	-120(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
	call	_input
	movl	%eax,-124(%ebp)
	movl	-124(%ebp),%eax
	movl	%eax,-128(%ebp)
	movl	-128(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-132(%ebp)
	movl	-132(%ebp),%eax
	movl	%eax,-96(%ebp)
	movl	-48(%ebp),%eax
	movl	%eax,-136(%ebp)
	movl	-136(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-140(%ebp)
	movl	-96(%ebp),%eax
	movl	%eax,-144(%ebp)
	movl	-144(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-148(%ebp)
	movl	-140(%ebp), %eax
	movl	-148(%ebp), %ecx
	movl	%eax, -152(%ebp)
	addl	%ecx,-152(%ebp)
	movl	-152(%ebp),%eax
	movl	%eax,-156(%ebp)
	movl	-156(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-160(%ebp)
	movl	-160(%ebp),%eax
	movl	%eax,-164(%ebp)
	movl	-164(%ebp),%eax
	movl	%eax,-168(%ebp)
	movl	-168(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-172(%ebp)
	movl	-172(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
	movl	-96(%ebp),%eax
	movl	%eax,-176(%ebp)
	movl	-176(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-180(%ebp)
	movl	-48(%ebp),%eax
	movl	%eax,-184(%ebp)
	movl	-184(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-188(%ebp)
	movl	-180(%ebp), %eax
	movl	-188(%ebp), %ecx
	movl	%eax, -192(%ebp)
	addl	%ecx,-192(%ebp)
	movl	-192(%ebp),%eax
	movl	%eax,-196(%ebp)
	movl	-196(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-200(%ebp)
	movl	-200(%ebp),%eax
	movl	%eax,-204(%ebp)
	movl	-204(%ebp),%eax
	movl	%eax,-208(%ebp)
	movl	-208(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-212(%ebp)
	movl	-212(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
	movl	-48(%ebp),%eax
	movl	%eax,-216(%ebp)
	movl	-216(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-220(%ebp)
	movl	-96(%ebp),%eax
	movl	%eax,-224(%ebp)
	movl	-224(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-228(%ebp)
	movl	-220(%ebp), %eax
	movl	-228(%ebp), %ecx
	movl	%eax, -232(%ebp)
	addl	%ecx,-232(%ebp)
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
	movl	-164(%ebp),%eax
	movl	%eax,-252(%ebp)
	movl	-252(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-256(%ebp)
	movl	-248(%ebp), %eax
	movl	-256(%ebp), %ecx
	movl	%eax, -260(%ebp)
	addl	%ecx,-260(%ebp)
	movl	-260(%ebp),%eax
	movl	%eax,-264(%ebp)
	movl	-264(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-268(%ebp)
	movl	-268(%ebp),%eax
	movl	%eax,-272(%ebp)
	movl	-272(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-276(%ebp)
	movl	-204(%ebp),%eax
	movl	%eax,-280(%ebp)
	movl	-280(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-284(%ebp)
	movl	-276(%ebp), %eax
	movl	-284(%ebp), %ecx
	movl	%eax, -288(%ebp)
	addl	%ecx,-288(%ebp)
	movl	-288(%ebp),%eax
	movl	%eax,-292(%ebp)
	movl	-292(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-296(%ebp)
	movl	-296(%ebp),%eax
	movl	%eax,-300(%ebp)
	movl	-300(%ebp),%eax
	movl	%eax,-304(%ebp)
	movl	-304(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-308(%ebp)
	movl	-308(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
	movl	-48(%ebp),%eax
	movl	%eax,-312(%ebp)
	movl	-312(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-316(%ebp)
	movl	-96(%ebp),%eax
	movl	%eax,-320(%ebp)
	movl	-320(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-324(%ebp)
	movl	-316(%ebp), %eax
	movl	-324(%ebp), %ecx
	movl	%eax, -328(%ebp)
	addl	%ecx,-328(%ebp)
	movl	-328(%ebp),%eax
	movl	%eax,-332(%ebp)
	movl	-332(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-336(%ebp)
	movl	-336(%ebp),%eax
	movl	%eax,-340(%ebp)
	movl	-340(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-344(%ebp)
	movl	-164(%ebp),%eax
	movl	%eax,-348(%ebp)
	movl	-348(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-352(%ebp)
	movl	-344(%ebp), %eax
	movl	-352(%ebp), %ecx
	movl	%eax, -356(%ebp)
	addl	%ecx,-356(%ebp)
	movl	-356(%ebp),%eax
	movl	%eax,-360(%ebp)
	movl	-360(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-364(%ebp)
	movl	-364(%ebp),%eax
	movl	%eax,-368(%ebp)
	movl	-368(%ebp),%eax
	movl	%eax,-372(%ebp)
	movl	-372(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-376(%ebp)
	movl	-376(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
	movl	-96(%ebp),%eax
	movl	%eax,-380(%ebp)
	movl	-380(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-384(%ebp)
	movl	-48(%ebp),%eax
	movl	%eax,-388(%ebp)
	movl	-388(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-392(%ebp)
	movl	-384(%ebp), %eax
	movl	-392(%ebp), %ecx
	movl	%eax, -396(%ebp)
	addl	%ecx,-396(%ebp)
	movl	-396(%ebp),%eax
	movl	%eax,-400(%ebp)
	movl	-400(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-404(%ebp)
	movl	-404(%ebp),%eax
	movl	%eax,-204(%ebp)
	movl	-204(%ebp),%eax
	movl	%eax,-408(%ebp)
	movl	-408(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-412(%ebp)
	movl	-412(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
	movl	-48(%ebp),%eax
	movl	%eax,-416(%ebp)
	movl	-416(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-420(%ebp)
	movl	-96(%ebp),%eax
	movl	%eax,-424(%ebp)
	movl	-424(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-428(%ebp)
	movl	-420(%ebp), %eax
	movl	-428(%ebp), %ecx
	movl	%eax, -432(%ebp)
	addl	%ecx,-432(%ebp)
	movl	-432(%ebp),%eax
	movl	%eax,-436(%ebp)
	movl	-436(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-440(%ebp)
	movl	-440(%ebp),%eax
	movl	%eax,-444(%ebp)
	movl	-444(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-448(%ebp)
	movl	-164(%ebp),%eax
	movl	%eax,-452(%ebp)
	movl	-452(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-456(%ebp)
	movl	-448(%ebp), %eax
	movl	-456(%ebp), %ecx
	movl	%eax, -460(%ebp)
	addl	%ecx,-460(%ebp)
	movl	-460(%ebp),%eax
	movl	%eax,-464(%ebp)
	movl	-464(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-468(%ebp)
	movl	-468(%ebp),%eax
	movl	%eax,-472(%ebp)
	movl	-472(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-476(%ebp)
	movl	-204(%ebp),%eax
	movl	%eax,-480(%ebp)
	movl	-480(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-484(%ebp)
	movl	-476(%ebp), %eax
	movl	%eax, -488(%ebp)
	movl	-484(%ebp), %eax
	subl	%eax,-488(%ebp)
	movl	-488(%ebp),%eax
	movl	%eax,-492(%ebp)
	movl	-492(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-496(%ebp)
	movl	-496(%ebp),%eax
	movl	%eax,-500(%ebp)
	movl	-500(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-504(%ebp)
	movl	-300(%ebp),%eax
	movl	%eax,-508(%ebp)
	movl	-508(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-512(%ebp)
	movl	-504(%ebp), %eax
	movl	-512(%ebp), %ecx
	movl	%eax, -516(%ebp)
	addl	%ecx,-516(%ebp)
	movl	-516(%ebp),%eax
	movl	%eax,-520(%ebp)
	movl	-520(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-524(%ebp)
	movl	-524(%ebp),%eax
	movl	%eax,-300(%ebp)
	movl	-300(%ebp),%eax
	movl	%eax,-528(%ebp)
	movl	-528(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-532(%ebp)
	movl	-532(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
	movl	$0, %eax
	leave
	ret

