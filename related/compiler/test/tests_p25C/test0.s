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
	subl	$776,%esp
	call	t442$pb
t442$pb:
	popl	%eax
	movl	%eax, -4(%ebp)
	call	_setup_CclassK
	movl	%eax,-8(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-16(%ebp)
	call	_setup_CclassJ
	movl	%eax,-20(%ebp)
	movl	-20(%ebp),%eax
	movl	%eax,-24(%ebp)
	call	_setup_CclassI
	movl	%eax,-28(%ebp)
	movl	-28(%ebp),%eax
	movl	%eax,-32(%ebp)
	call	_setup_CclassH
	movl	%eax,-36(%ebp)
	movl	-36(%ebp),%eax
	movl	%eax,-40(%ebp)
	call	_setup_CclassG
	movl	%eax,-44(%ebp)
	movl	-44(%ebp),%eax
	movl	%eax,-48(%ebp)
	call	_setup_CclassF
	movl	%eax,-52(%ebp)
	movl	-52(%ebp),%eax
	movl	%eax,-56(%ebp)
	call	_setup_CclassE
	movl	%eax,-60(%ebp)
	movl	-60(%ebp),%eax
	movl	%eax,-64(%ebp)
	call	_setup_CclassD
	movl	%eax,-68(%ebp)
	movl	-68(%ebp),%eax
	movl	%eax,-72(%ebp)
	call	_setup_CclassC
	movl	%eax,-76(%ebp)
	movl	-76(%ebp),%eax
	movl	%eax,-80(%ebp)
	call	_setup_CclassB
	movl	%eax,-84(%ebp)
	movl	-84(%ebp),%eax
	movl	%eax,-88(%ebp)
	call	_setup_CclassA
	movl	%eax,-92(%ebp)
	movl	-92(%ebp),%eax
	movl	%eax,-96(%ebp)
	movl	-4(%ebp),%ecx
	movl	CclassA$non_lazy_ptr-t442$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-100(%ebp)
	movl	-100(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_object
	movl	%eax,-108(%ebp)
	movl	-108(%ebp),%eax
	movl	%eax,-112(%ebp)
	movl	-112(%ebp),%eax
	movl	%eax,-116(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassA___init__.str-t442$pb(%ecx),%eax
	movl	%eax,-120(%ebp)
	movl	-116(%ebp),%eax
	movl	%eax, (%esp)
	movl	-120(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-116(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-124(%ebp)
	movl	-124(%ebp),%eax
	movl	%eax,-128(%ebp)
	movl	-112(%ebp),%eax
	movl	%eax,-132(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassA_aa.str-t442$pb(%ecx),%eax
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
	movl	-148(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
	movl	-112(%ebp),%eax
	movl	%eax,-152(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassA_ab.str-t442$pb(%ecx),%eax
	movl	%eax,-156(%ebp)
	movl	-152(%ebp),%eax
	movl	%eax,(%esp)
	movl	-156(%ebp),%eax
	movl	%eax,4(%esp)
	call	_get_attr
	movl	%eax,-160(%ebp)
	movl	-160(%ebp),%eax
	movl	%eax,-164(%ebp)
	movl	-164(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-168(%ebp)
	movl	-168(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
	movl	-4(%ebp),%ecx
	movl	CclassB$non_lazy_ptr-t442$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-172(%ebp)
	movl	-172(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_object
	movl	%eax,-180(%ebp)
	movl	-180(%ebp),%eax
	movl	%eax,-184(%ebp)
	movl	-184(%ebp),%eax
	movl	%eax,-188(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassB___init__.str-t442$pb(%ecx),%eax
	movl	%eax,-192(%ebp)
	movl	-188(%ebp),%eax
	movl	%eax, (%esp)
	movl	-192(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-188(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-196(%ebp)
	movl	-196(%ebp),%eax
	movl	%eax,-200(%ebp)
	movl	-4(%ebp),%ecx
	movl	CclassC$non_lazy_ptr-t442$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-204(%ebp)
	movl	-204(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_object
	movl	%eax,-212(%ebp)
	movl	-212(%ebp),%eax
	movl	%eax,-216(%ebp)
	movl	-216(%ebp),%eax
	movl	%eax,-220(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassC___init__.str-t442$pb(%ecx),%eax
	movl	%eax,-224(%ebp)
	movl	-220(%ebp),%eax
	movl	%eax, (%esp)
	movl	-224(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-220(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-228(%ebp)
	movl	-228(%ebp),%eax
	movl	%eax,-232(%ebp)
	movl	-216(%ebp),%eax
	movl	%eax,-236(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassC_func1.str-t442$pb(%ecx),%eax
	movl	%eax,-240(%ebp)
	movl	-236(%ebp),%eax
	movl	%eax, (%esp)
	movl	-240(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-236(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-244(%ebp)
	movl	-244(%ebp),%eax
	movl	%eax,-248(%ebp)
	movl	-4(%ebp),%ecx
	movl	CclassD$non_lazy_ptr-t442$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-252(%ebp)
	movl	-252(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_object
	movl	%eax,-260(%ebp)
	movl	-260(%ebp),%eax
	movl	%eax,-264(%ebp)
	movl	-264(%ebp),%eax
	movl	%eax,-268(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassD___init__.str-t442$pb(%ecx),%eax
	movl	%eax,-272(%ebp)
	movl	-268(%ebp),%eax
	movl	%eax, (%esp)
	movl	-272(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-268(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-276(%ebp)
	movl	-276(%ebp),%eax
	movl	%eax,-280(%ebp)
	movl	-264(%ebp),%eax
	movl	%eax,-284(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassD_func1.str-t442$pb(%ecx),%eax
	movl	%eax,-288(%ebp)
	movl	-284(%ebp),%eax
	movl	%eax, (%esp)
	movl	-288(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-284(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-292(%ebp)
	movl	-292(%ebp),%eax
	movl	%eax,-296(%ebp)
	movl	-4(%ebp),%ecx
	movl	CclassE$non_lazy_ptr-t442$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-300(%ebp)
	movl	-300(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_object
	movl	%eax,-308(%ebp)
	movl	-308(%ebp),%eax
	movl	%eax,-312(%ebp)
	movl	-312(%ebp),%eax
	movl	%eax,-316(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassE___init__.str-t442$pb(%ecx),%eax
	movl	%eax,-320(%ebp)
	movl	-316(%ebp),%eax
	movl	%eax, (%esp)
	movl	-320(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-316(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-324(%ebp)
	movl	-324(%ebp),%eax
	movl	%eax,-328(%ebp)
	movl	-312(%ebp),%eax
	movl	%eax,-332(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassE_func1.str-t442$pb(%ecx),%eax
	movl	%eax,-336(%ebp)
	movl	-332(%ebp),%eax
	movl	%eax, (%esp)
	movl	-336(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-332(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-340(%ebp)
	movl	-340(%ebp),%eax
	movl	%eax,-344(%ebp)
	movl	-4(%ebp),%ecx
	movl	CclassF$non_lazy_ptr-t442$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-348(%ebp)
	movl	-348(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_object
	movl	%eax,-356(%ebp)
	movl	-356(%ebp),%eax
	movl	%eax,-360(%ebp)
	movl	-360(%ebp),%eax
	movl	%eax,-364(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassF___init__.str-t442$pb(%ecx),%eax
	movl	%eax,-368(%ebp)
	movl	-364(%ebp),%eax
	movl	%eax, (%esp)
	movl	-368(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-364(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-372(%ebp)
	movl	-372(%ebp),%eax
	movl	%eax,-376(%ebp)
	movl	-360(%ebp),%eax
	movl	%eax,-380(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassF_func1.str-t442$pb(%ecx),%eax
	movl	%eax,-384(%ebp)
	movl	-380(%ebp),%eax
	movl	%eax, (%esp)
	movl	-384(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-380(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-388(%ebp)
	movl	-388(%ebp),%eax
	movl	%eax,-392(%ebp)
	movl	-360(%ebp),%eax
	movl	%eax,-396(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassF_func2.str-t442$pb(%ecx),%eax
	movl	%eax,-400(%ebp)
	movl	-396(%ebp),%eax
	movl	%eax, (%esp)
	movl	-400(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-396(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-404(%ebp)
	movl	-404(%ebp),%eax
	movl	%eax,-408(%ebp)
	movl	-4(%ebp),%ecx
	movl	CclassG$non_lazy_ptr-t442$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-412(%ebp)
	movl	-412(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_object
	movl	%eax,-420(%ebp)
	movl	-420(%ebp),%eax
	movl	%eax,-424(%ebp)
	movl	-424(%ebp),%eax
	movl	%eax,-428(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassG___init__.str-t442$pb(%ecx),%eax
	movl	%eax,-432(%ebp)
	movl	$5,%eax
	movl	%eax,-436(%ebp)
	movl	-428(%ebp),%eax
	movl	%eax, (%esp)
	movl	-432(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-436(%ebp),%eax
	movl	%eax, (%esp)
	call	_create_int
	movl	%eax, 4(%esp)
	movl	-428(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-440(%ebp)
	movl	-440(%ebp),%eax
	movl	%eax,-444(%ebp)
	movl	-424(%ebp),%eax
	movl	%eax,-448(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassG_func1.str-t442$pb(%ecx),%eax
	movl	%eax,-452(%ebp)
	movl	-448(%ebp),%eax
	movl	%eax, (%esp)
	movl	-452(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-448(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-456(%ebp)
	movl	-456(%ebp),%eax
	movl	%eax,-460(%ebp)
	movl	-4(%ebp),%ecx
	movl	CclassH$non_lazy_ptr-t442$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-464(%ebp)
	movl	-464(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_object
	movl	%eax,-472(%ebp)
	movl	-472(%ebp),%eax
	movl	%eax,-476(%ebp)
	movl	-476(%ebp),%eax
	movl	%eax,-480(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassH___init__.str-t442$pb(%ecx),%eax
	movl	%eax,-484(%ebp)
	movl	$1,%eax
	movl	%eax,-488(%ebp)
	movl	$2,%eax
	movl	%eax,-492(%ebp)
	movl	-480(%ebp),%eax
	movl	%eax, (%esp)
	movl	-484(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-492(%ebp),%eax
	movl	%eax, (%esp)
	call	_create_int
	movl	%eax, 8(%esp)
	movl	-488(%ebp),%eax
	movl	%eax, (%esp)
	call	_create_int
	movl	%eax, 4(%esp)
	movl	-480(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-496(%ebp)
	movl	-496(%ebp),%eax
	movl	%eax,-500(%ebp)
	movl	-476(%ebp),%eax
	movl	%eax,-504(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassH_func1.str-t442$pb(%ecx),%eax
	movl	%eax,-508(%ebp)
	movl	-504(%ebp),%eax
	movl	%eax, (%esp)
	movl	-508(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-504(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-512(%ebp)
	movl	-512(%ebp),%eax
	movl	%eax,-516(%ebp)
	movl	-4(%ebp),%ecx
	movl	CclassI$non_lazy_ptr-t442$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-520(%ebp)
	movl	-520(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_object
	movl	%eax,-528(%ebp)
	movl	-528(%ebp),%eax
	movl	%eax,-532(%ebp)
	movl	-532(%ebp),%eax
	movl	%eax,-536(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassI___init__.str-t442$pb(%ecx),%eax
	movl	%eax,-540(%ebp)
	movl	-536(%ebp),%eax
	movl	%eax, (%esp)
	movl	-540(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-536(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-544(%ebp)
	movl	-544(%ebp),%eax
	movl	%eax,-548(%ebp)
	movl	-4(%ebp),%ecx
	movl	CclassI$non_lazy_ptr-t442$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-552(%ebp)
	movl	-552(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_object
	movl	%eax,-556(%ebp)
	movl	-556(%ebp),%eax
	movl	%eax,-560(%ebp)
	movl	-560(%ebp),%eax
	movl	%eax,-564(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassI___init__.str-t442$pb(%ecx),%eax
	movl	%eax,-568(%ebp)
	movl	-564(%ebp),%eax
	movl	%eax, (%esp)
	movl	-568(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-564(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-572(%ebp)
	movl	-572(%ebp),%eax
	movl	%eax,-576(%ebp)
	movl	-532(%ebp),%eax
	movl	%eax,-580(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassI_ia.str-t442$pb(%ecx),%eax
	movl	%eax,-584(%ebp)
	movl	-580(%ebp),%eax
	movl	%eax,(%esp)
	movl	-584(%ebp),%eax
	movl	%eax,4(%esp)
	call	_get_attr
	movl	%eax,-588(%ebp)
	movl	-588(%ebp),%eax
	movl	%eax,-592(%ebp)
	movl	-592(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-596(%ebp)
	movl	-596(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
	movl	-560(%ebp),%eax
	movl	%eax,-600(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassI_ib.str-t442$pb(%ecx),%eax
	movl	%eax,-604(%ebp)
	movl	-600(%ebp),%eax
	movl	%eax,(%esp)
	movl	-604(%ebp),%eax
	movl	%eax,4(%esp)
	call	_get_attr
	movl	%eax,-608(%ebp)
	movl	-608(%ebp),%eax
	movl	%eax,-612(%ebp)
	movl	-612(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-616(%ebp)
	movl	-616(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
	movl	-4(%ebp),%ecx
	movl	CclassJ$non_lazy_ptr-t442$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-620(%ebp)
	movl	-620(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_object
	movl	%eax,-628(%ebp)
	movl	-628(%ebp),%eax
	movl	%eax,-632(%ebp)
	movl	-632(%ebp),%eax
	movl	%eax,-636(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassJ___init__.str-t442$pb(%ecx),%eax
	movl	%eax,-640(%ebp)
	movl	$1,%eax
	movl	%eax,-644(%ebp)
	movl	-636(%ebp),%eax
	movl	%eax, (%esp)
	movl	-640(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-644(%ebp),%eax
	movl	%eax, (%esp)
	call	_create_int
	movl	%eax, 4(%esp)
	movl	-636(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-648(%ebp)
	movl	-648(%ebp),%eax
	movl	%eax,-652(%ebp)
	movl	-4(%ebp),%ecx
	movl	CclassJ$non_lazy_ptr-t442$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-656(%ebp)
	movl	-656(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_object
	movl	%eax,-660(%ebp)
	movl	-660(%ebp),%eax
	movl	%eax,-664(%ebp)
	movl	-664(%ebp),%eax
	movl	%eax,-668(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassJ___init__.str-t442$pb(%ecx),%eax
	movl	%eax,-672(%ebp)
	movl	$2,%eax
	movl	%eax,-676(%ebp)
	movl	-668(%ebp),%eax
	movl	%eax, (%esp)
	movl	-672(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-676(%ebp),%eax
	movl	%eax, (%esp)
	call	_create_int
	movl	%eax, 4(%esp)
	movl	-668(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-680(%ebp)
	movl	-680(%ebp),%eax
	movl	%eax,-684(%ebp)
	movl	-632(%ebp),%eax
	movl	%eax,-688(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassJ_func1.str-t442$pb(%ecx),%eax
	movl	%eax,-692(%ebp)
	movl	-688(%ebp),%eax
	movl	%eax, (%esp)
	movl	-692(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-688(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-696(%ebp)
	movl	-696(%ebp),%eax
	movl	%eax,-700(%ebp)
	movl	-664(%ebp),%eax
	movl	%eax,-704(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassJ_func1.str-t442$pb(%ecx),%eax
	movl	%eax,-708(%ebp)
	movl	-704(%ebp),%eax
	movl	%eax, (%esp)
	movl	-708(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-704(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-712(%ebp)
	movl	-712(%ebp),%eax
	movl	%eax,-716(%ebp)
	movl	-4(%ebp),%ecx
	movl	CclassK$non_lazy_ptr-t442$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-720(%ebp)
	movl	-720(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_object
	movl	%eax,-728(%ebp)
	movl	-728(%ebp),%eax
	movl	%eax,-732(%ebp)
	movl	-732(%ebp),%eax
	movl	%eax,-736(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassK___init__.str-t442$pb(%ecx),%eax
	movl	%eax,-740(%ebp)
	movl	-736(%ebp),%eax
	movl	%eax, (%esp)
	movl	-740(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-736(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-744(%ebp)
	movl	-744(%ebp),%eax
	movl	%eax,-748(%ebp)
	movl	-732(%ebp),%eax
	movl	%eax,-752(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassK_func1.str-t442$pb(%ecx),%eax
	movl	%eax,-756(%ebp)
	movl	-752(%ebp),%eax
	movl	%eax, (%esp)
	movl	-756(%ebp),%eax
	movl	%eax, 4(%esp)
	call	_get_fun_ptr_from_attr
	movl	%eax, -12(%ebp)
	movl	-752(%ebp),%eax
	movl	%eax, (%esp)
	movl	-12(%ebp),%eax
	call	*%eax
	movl	%eax,-760(%ebp)
	movl	-760(%ebp),%eax
	movl	%eax,-764(%ebp)
	movl	-764(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-768(%ebp)
	movl	-768(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
t443:
	addl	$776, %esp
	popl	%ebp
	ret


	.globl	_CclassA___init__
	.align	4,0x90
_CclassA___init__:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$72,%esp
	call	t444$pb
t444$pb:
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
	movl	-8(%ebp),%eax
	movl	%eax,-24(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassA_aa.str-t444$pb(%ecx),%eax
	movl	%eax,-28(%ebp)
	movl	-16(%ebp),%eax
	movl	%eax,-32(%ebp)
	movl	-24(%ebp),%eax
	movl	%eax,(%esp)
	movl	-28(%ebp),%eax
	movl	%eax,4(%esp)
	movl	-32(%ebp),%eax
	movl	%eax,8(%esp)
	call	_set_attr
	movl	%eax,-36(%ebp)
	movl	$0,%eax
	movl	%eax,-40(%ebp)
	movl	-40(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-44(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-48(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassA_ab.str-t444$pb(%ecx),%eax
	movl	%eax,-52(%ebp)
	movl	-44(%ebp),%eax
	movl	%eax,-56(%ebp)
	movl	-48(%ebp),%eax
	movl	%eax,(%esp)
	movl	-52(%ebp),%eax
	movl	%eax,4(%esp)
	movl	-56(%ebp),%eax
	movl	%eax,8(%esp)
	call	_set_attr
	movl	%eax,-60(%ebp)
t445:
	addl	$72, %esp
	popl	%ebp
	ret


	.globl	_setup_CclassA
	.align	4,0x90
_setup_CclassA:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$72,%esp
	call	t446$pb
t446$pb:
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
	movl	CclassA$non_lazy_ptr-t446$pb(%ecx),%edx
	movl	-36(%ebp),%eax
	movl	%eax,(%edx)
	movl	-4(%ebp),%ecx
	movl	CclassA$non_lazy_ptr-t446$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-40(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassA___init__.str-t446$pb(%ecx),%eax
	movl	%eax,-44(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CclassA___init__-t446$pb(%ecx),%eax
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
t447:
	addl	$72, %esp
	popl	%ebp
	ret


	.globl	_CclassB___init__
	.align	4,0x90
_CclassB___init__:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$40,%esp
	call	t448$pb
t448$pb:
	popl	%eax
	movl	%eax, -4(%ebp)
	movl	8(%ebp),%ecx
	movl	%ecx,-8(%ebp)
	movl	$999,%eax
	movl	%eax,-12(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-16(%ebp)
	movl	-16(%ebp),%eax
	movl	%eax,-24(%ebp)
	movl	-24(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-28(%ebp)
	movl	-28(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
t449:
	addl	$40, %esp
	popl	%ebp
	ret


	.globl	_setup_CclassB
	.align	4,0x90
_setup_CclassB:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$72,%esp
	call	t450$pb
t450$pb:
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
	movl	CclassB$non_lazy_ptr-t450$pb(%ecx),%edx
	movl	-36(%ebp),%eax
	movl	%eax,(%edx)
	movl	-4(%ebp),%ecx
	movl	CclassB$non_lazy_ptr-t450$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-40(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassB___init__.str-t450$pb(%ecx),%eax
	movl	%eax,-44(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CclassB___init__-t450$pb(%ecx),%eax
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
t451:
	addl	$72, %esp
	popl	%ebp
	ret


	.globl	_CclassC___init__
	.align	4,0x90
_CclassC___init__:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$56,%esp
	call	t452$pb
t452$pb:
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
	movl	-8(%ebp),%eax
	movl	%eax,-24(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassC_ca.str-t452$pb(%ecx),%eax
	movl	%eax,-28(%ebp)
	movl	-16(%ebp),%eax
	movl	%eax,-32(%ebp)
	movl	-24(%ebp),%eax
	movl	%eax,(%esp)
	movl	-28(%ebp),%eax
	movl	%eax,4(%esp)
	movl	-32(%ebp),%eax
	movl	%eax,8(%esp)
	call	_set_attr
	movl	%eax,-36(%ebp)
t453:
	addl	$56, %esp
	popl	%ebp
	ret


	.globl	_CclassC_func1
	.align	4,0x90
_CclassC_func1:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$40,%esp
	call	t454$pb
t454$pb:
	popl	%eax
	movl	%eax, -4(%ebp)
	movl	8(%ebp),%ecx
	movl	%ecx,-8(%ebp)
	movl	$888,%eax
	movl	%eax,-12(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-16(%ebp)
	movl	-16(%ebp),%eax
	movl	%eax,-24(%ebp)
	movl	-24(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-28(%ebp)
	movl	-28(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
t455:
	addl	$40, %esp
	popl	%ebp
	ret


	.globl	_setup_CclassC
	.align	4,0x90
_setup_CclassC:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$88,%esp
	call	t456$pb
t456$pb:
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
	movl	CclassC$non_lazy_ptr-t456$pb(%ecx),%edx
	movl	-36(%ebp),%eax
	movl	%eax,(%edx)
	movl	-4(%ebp),%ecx
	movl	CclassC$non_lazy_ptr-t456$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-40(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassC___init__.str-t456$pb(%ecx),%eax
	movl	%eax,-44(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CclassC___init__-t456$pb(%ecx),%eax
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
	movl	CclassC$non_lazy_ptr-t456$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-56(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassC_func1.str-t456$pb(%ecx),%eax
	movl	%eax,-60(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CclassC_func1-t456$pb(%ecx),%eax
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
t457:
	addl	$88, %esp
	popl	%ebp
	ret


	.globl	_CclassD___init__
	.align	4,0x90
_CclassD___init__:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$56,%esp
	call	t458$pb
t458$pb:
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
	movl	-8(%ebp),%eax
	movl	%eax,-24(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassD_da.str-t458$pb(%ecx),%eax
	movl	%eax,-28(%ebp)
	movl	-16(%ebp),%eax
	movl	%eax,-32(%ebp)
	movl	-24(%ebp),%eax
	movl	%eax,(%esp)
	movl	-28(%ebp),%eax
	movl	%eax,4(%esp)
	movl	-32(%ebp),%eax
	movl	%eax,8(%esp)
	call	_set_attr
	movl	%eax,-36(%ebp)
t459:
	addl	$56, %esp
	popl	%ebp
	ret


	.globl	_CclassD_func1
	.align	4,0x90
_CclassD_func1:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$40,%esp
	call	t460$pb
t460$pb:
	popl	%eax
	movl	%eax, -4(%ebp)
	movl	8(%ebp),%ecx
	movl	%ecx,-8(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-12(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassD_da.str-t460$pb(%ecx),%eax
	movl	%eax,-16(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,(%esp)
	movl	-16(%ebp),%eax
	movl	%eax,4(%esp)
	call	_get_attr
	movl	%eax,-20(%ebp)
	movl	-20(%ebp),%eax
	movl	%eax,-28(%ebp)
	movl	-28(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-32(%ebp)
	movl	-32(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
t461:
	addl	$40, %esp
	popl	%ebp
	ret


	.globl	_setup_CclassD
	.align	4,0x90
_setup_CclassD:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$88,%esp
	call	t462$pb
t462$pb:
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
	movl	CclassD$non_lazy_ptr-t462$pb(%ecx),%edx
	movl	-36(%ebp),%eax
	movl	%eax,(%edx)
	movl	-4(%ebp),%ecx
	movl	CclassD$non_lazy_ptr-t462$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-40(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassD___init__.str-t462$pb(%ecx),%eax
	movl	%eax,-44(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CclassD___init__-t462$pb(%ecx),%eax
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
	movl	CclassD$non_lazy_ptr-t462$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-56(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassD_func1.str-t462$pb(%ecx),%eax
	movl	%eax,-60(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CclassD_func1-t462$pb(%ecx),%eax
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
t463:
	addl	$88, %esp
	popl	%ebp
	ret


	.globl	_CclassE___init__
	.align	4,0x90
_CclassE___init__:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$56,%esp
	call	t464$pb
t464$pb:
	popl	%eax
	movl	%eax, -4(%ebp)
	movl	8(%ebp),%ecx
	movl	%ecx,-8(%ebp)
	movl	$2,%eax
	movl	%eax,-12(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-16(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-24(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassE_da.str-t464$pb(%ecx),%eax
	movl	%eax,-28(%ebp)
	movl	-16(%ebp),%eax
	movl	%eax,-32(%ebp)
	movl	-24(%ebp),%eax
	movl	%eax,(%esp)
	movl	-28(%ebp),%eax
	movl	%eax,4(%esp)
	movl	-32(%ebp),%eax
	movl	%eax,8(%esp)
	call	_set_attr
	movl	%eax,-36(%ebp)
t465:
	addl	$56, %esp
	popl	%ebp
	ret


	.globl	_CclassE_func1
	.align	4,0x90
_CclassE_func1:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$40,%esp
	call	t466$pb
t466$pb:
	popl	%eax
	movl	%eax, -4(%ebp)
	movl	8(%ebp),%ecx
	movl	%ecx,-8(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-12(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassE_da.str-t466$pb(%ecx),%eax
	movl	%eax,-16(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,(%esp)
	movl	-16(%ebp),%eax
	movl	%eax,4(%esp)
	call	_get_attr
	movl	%eax,-20(%ebp)
	movl	-20(%ebp),%eax
	movl	%eax,-28(%ebp)
	movl	-28(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-32(%ebp)
	movl	-32(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
t467:
	addl	$40, %esp
	popl	%ebp
	ret


	.globl	_setup_CclassE
	.align	4,0x90
_setup_CclassE:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$88,%esp
	call	t468$pb
t468$pb:
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
	movl	CclassE$non_lazy_ptr-t468$pb(%ecx),%edx
	movl	-36(%ebp),%eax
	movl	%eax,(%edx)
	movl	-4(%ebp),%ecx
	movl	CclassE$non_lazy_ptr-t468$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-40(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassE___init__.str-t468$pb(%ecx),%eax
	movl	%eax,-44(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CclassE___init__-t468$pb(%ecx),%eax
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
	movl	CclassE$non_lazy_ptr-t468$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-56(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassE_func1.str-t468$pb(%ecx),%eax
	movl	%eax,-60(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CclassE_func1-t468$pb(%ecx),%eax
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
t469:
	addl	$88, %esp
	popl	%ebp
	ret


	.globl	_CclassF___init__
	.align	4,0x90
_CclassF___init__:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$72,%esp
	call	t470$pb
t470$pb:
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
	movl	-8(%ebp),%eax
	movl	%eax,-24(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassF_fa.str-t470$pb(%ecx),%eax
	movl	%eax,-28(%ebp)
	movl	-16(%ebp),%eax
	movl	%eax,-32(%ebp)
	movl	-24(%ebp),%eax
	movl	%eax,(%esp)
	movl	-28(%ebp),%eax
	movl	%eax,4(%esp)
	movl	-32(%ebp),%eax
	movl	%eax,8(%esp)
	call	_set_attr
	movl	%eax,-36(%ebp)
	movl	$2,%eax
	movl	%eax,-40(%ebp)
	movl	-40(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-44(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-48(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassF_fb.str-t470$pb(%ecx),%eax
	movl	%eax,-52(%ebp)
	movl	-44(%ebp),%eax
	movl	%eax,-56(%ebp)
	movl	-48(%ebp),%eax
	movl	%eax,(%esp)
	movl	-52(%ebp),%eax
	movl	%eax,4(%esp)
	movl	-56(%ebp),%eax
	movl	%eax,8(%esp)
	call	_set_attr
	movl	%eax,-60(%ebp)
t471:
	addl	$72, %esp
	popl	%ebp
	ret


	.globl	_CclassF_func1
	.align	4,0x90
_CclassF_func1:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$40,%esp
	call	t472$pb
t472$pb:
	popl	%eax
	movl	%eax, -4(%ebp)
	movl	8(%ebp),%ecx
	movl	%ecx,-8(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-12(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassF_fa.str-t472$pb(%ecx),%eax
	movl	%eax,-16(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,(%esp)
	movl	-16(%ebp),%eax
	movl	%eax,4(%esp)
	call	_get_attr
	movl	%eax,-20(%ebp)
	movl	-20(%ebp),%eax
	movl	%eax,-28(%ebp)
	movl	-28(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-32(%ebp)
	movl	-32(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
t473:
	addl	$40, %esp
	popl	%ebp
	ret


	.globl	_CclassF_func2
	.align	4,0x90
_CclassF_func2:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$40,%esp
	call	t474$pb
t474$pb:
	popl	%eax
	movl	%eax, -4(%ebp)
	movl	8(%ebp),%ecx
	movl	%ecx,-8(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-12(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassF_fb.str-t474$pb(%ecx),%eax
	movl	%eax,-16(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,(%esp)
	movl	-16(%ebp),%eax
	movl	%eax,4(%esp)
	call	_get_attr
	movl	%eax,-20(%ebp)
	movl	-20(%ebp),%eax
	movl	%eax,-28(%ebp)
	movl	-28(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-32(%ebp)
	movl	-32(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
t475:
	addl	$40, %esp
	popl	%ebp
	ret


	.globl	_setup_CclassF
	.align	4,0x90
_setup_CclassF:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$104,%esp
	call	t476$pb
t476$pb:
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
	movl	CclassF$non_lazy_ptr-t476$pb(%ecx),%edx
	movl	-36(%ebp),%eax
	movl	%eax,(%edx)
	movl	-4(%ebp),%ecx
	movl	CclassF$non_lazy_ptr-t476$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-40(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassF___init__.str-t476$pb(%ecx),%eax
	movl	%eax,-44(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CclassF___init__-t476$pb(%ecx),%eax
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
	movl	CclassF$non_lazy_ptr-t476$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-56(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassF_func1.str-t476$pb(%ecx),%eax
	movl	%eax,-60(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CclassF_func1-t476$pb(%ecx),%eax
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
	movl	CclassF$non_lazy_ptr-t476$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-72(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassF_func2.str-t476$pb(%ecx),%eax
	movl	%eax,-76(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CclassF_func2-t476$pb(%ecx),%eax
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
t477:
	addl	$104, %esp
	popl	%ebp
	ret


	.globl	_CclassG___init__
	.align	4,0x90
_CclassG___init__:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$40,%esp
	call	t478$pb
t478$pb:
	popl	%eax
	movl	%eax, -4(%ebp)
	movl	12(%ebp),%ecx
	movl	8(%ebp),%edx
	movl	%ecx,-12(%ebp)
	movl	%edx,-8(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-16(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassG_ga.str-t478$pb(%ecx),%eax
	movl	%eax,-20(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,-24(%ebp)
	movl	-16(%ebp),%eax
	movl	%eax,(%esp)
	movl	-20(%ebp),%eax
	movl	%eax,4(%esp)
	movl	-24(%ebp),%eax
	movl	%eax,8(%esp)
	call	_set_attr
	movl	%eax,-28(%ebp)
t479:
	addl	$40, %esp
	popl	%ebp
	ret


	.globl	_CclassG_func1
	.align	4,0x90
_CclassG_func1:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$40,%esp
	call	t480$pb
t480$pb:
	popl	%eax
	movl	%eax, -4(%ebp)
	movl	8(%ebp),%ecx
	movl	%ecx,-8(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-12(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassG_ga.str-t480$pb(%ecx),%eax
	movl	%eax,-16(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,(%esp)
	movl	-16(%ebp),%eax
	movl	%eax,4(%esp)
	call	_get_attr
	movl	%eax,-20(%ebp)
	movl	-20(%ebp),%eax
	movl	%eax,-28(%ebp)
	movl	-28(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-32(%ebp)
	movl	-32(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
t481:
	addl	$40, %esp
	popl	%ebp
	ret


	.globl	_setup_CclassG
	.align	4,0x90
_setup_CclassG:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$88,%esp
	call	t482$pb
t482$pb:
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
	movl	CclassG$non_lazy_ptr-t482$pb(%ecx),%edx
	movl	-36(%ebp),%eax
	movl	%eax,(%edx)
	movl	-4(%ebp),%ecx
	movl	CclassG$non_lazy_ptr-t482$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-40(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassG___init__.str-t482$pb(%ecx),%eax
	movl	%eax,-44(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CclassG___init__-t482$pb(%ecx),%eax
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
	movl	CclassG$non_lazy_ptr-t482$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-56(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassG_func1.str-t482$pb(%ecx),%eax
	movl	%eax,-60(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CclassG_func1-t482$pb(%ecx),%eax
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
t483:
	addl	$88, %esp
	popl	%ebp
	ret


	.globl	_CclassH___init__
	.align	4,0x90
_CclassH___init__:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$72,%esp
	call	t484$pb
t484$pb:
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
	leal	CclassH_ha.str-t484$pb(%ecx),%eax
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
	leal	CclassH_hb.str-t484$pb(%ecx),%eax
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
t485:
	addl	$72, %esp
	popl	%ebp
	ret


	.globl	_CclassH_func1
	.align	4,0x90
_CclassH_func1:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$72,%esp
	call	t486$pb
t486$pb:
	popl	%eax
	movl	%eax, -4(%ebp)
	movl	8(%ebp),%ecx
	movl	%ecx,-8(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-12(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassH_ha.str-t486$pb(%ecx),%eax
	movl	%eax,-16(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,(%esp)
	movl	-16(%ebp),%eax
	movl	%eax,4(%esp)
	call	_get_attr
	movl	%eax,-20(%ebp)
	movl	-20(%ebp),%eax
	movl	%eax,-28(%ebp)
	movl	-28(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-32(%ebp)
	movl	-32(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
	movl	-8(%ebp),%eax
	movl	%eax,-36(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassH_hb.str-t486$pb(%ecx),%eax
	movl	%eax,-40(%ebp)
	movl	-36(%ebp),%eax
	movl	%eax,(%esp)
	movl	-40(%ebp),%eax
	movl	%eax,4(%esp)
	call	_get_attr
	movl	%eax,-44(%ebp)
	movl	-44(%ebp),%eax
	movl	%eax,-48(%ebp)
	movl	-48(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-52(%ebp)
	movl	-52(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
t487:
	addl	$72, %esp
	popl	%ebp
	ret


	.globl	_setup_CclassH
	.align	4,0x90
_setup_CclassH:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$88,%esp
	call	t488$pb
t488$pb:
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
	movl	CclassH$non_lazy_ptr-t488$pb(%ecx),%edx
	movl	-36(%ebp),%eax
	movl	%eax,(%edx)
	movl	-4(%ebp),%ecx
	movl	CclassH$non_lazy_ptr-t488$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-40(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassH___init__.str-t488$pb(%ecx),%eax
	movl	%eax,-44(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CclassH___init__-t488$pb(%ecx),%eax
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
	movl	CclassH$non_lazy_ptr-t488$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-56(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassH_func1.str-t488$pb(%ecx),%eax
	movl	%eax,-60(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CclassH_func1-t488$pb(%ecx),%eax
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
t489:
	addl	$88, %esp
	popl	%ebp
	ret


	.globl	_CclassI___init__
	.align	4,0x90
_CclassI___init__:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$72,%esp
	call	t490$pb
t490$pb:
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
	movl	-8(%ebp),%eax
	movl	%eax,-24(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassI_ia.str-t490$pb(%ecx),%eax
	movl	%eax,-28(%ebp)
	movl	-16(%ebp),%eax
	movl	%eax,-32(%ebp)
	movl	-24(%ebp),%eax
	movl	%eax,(%esp)
	movl	-28(%ebp),%eax
	movl	%eax,4(%esp)
	movl	-32(%ebp),%eax
	movl	%eax,8(%esp)
	call	_set_attr
	movl	%eax,-36(%ebp)
	movl	$2,%eax
	movl	%eax,-40(%ebp)
	movl	-40(%ebp),%eax
	movl	%eax,(%esp)
	call	_create_int
	movl	%eax,-44(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-48(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassI_ib.str-t490$pb(%ecx),%eax
	movl	%eax,-52(%ebp)
	movl	-44(%ebp),%eax
	movl	%eax,-56(%ebp)
	movl	-48(%ebp),%eax
	movl	%eax,(%esp)
	movl	-52(%ebp),%eax
	movl	%eax,4(%esp)
	movl	-56(%ebp),%eax
	movl	%eax,8(%esp)
	call	_set_attr
	movl	%eax,-60(%ebp)
t491:
	addl	$72, %esp
	popl	%ebp
	ret


	.globl	_setup_CclassI
	.align	4,0x90
_setup_CclassI:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$72,%esp
	call	t492$pb
t492$pb:
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
	movl	CclassI$non_lazy_ptr-t492$pb(%ecx),%edx
	movl	-36(%ebp),%eax
	movl	%eax,(%edx)
	movl	-4(%ebp),%ecx
	movl	CclassI$non_lazy_ptr-t492$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-40(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassI___init__.str-t492$pb(%ecx),%eax
	movl	%eax,-44(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CclassI___init__-t492$pb(%ecx),%eax
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
t493:
	addl	$72, %esp
	popl	%ebp
	ret


	.globl	_CclassJ___init__
	.align	4,0x90
_CclassJ___init__:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$40,%esp
	call	t494$pb
t494$pb:
	popl	%eax
	movl	%eax, -4(%ebp)
	movl	12(%ebp),%ecx
	movl	8(%ebp),%edx
	movl	%ecx,-12(%ebp)
	movl	%edx,-8(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-16(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassJ_ja.str-t494$pb(%ecx),%eax
	movl	%eax,-20(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,-24(%ebp)
	movl	-16(%ebp),%eax
	movl	%eax,(%esp)
	movl	-20(%ebp),%eax
	movl	%eax,4(%esp)
	movl	-24(%ebp),%eax
	movl	%eax,8(%esp)
	call	_set_attr
	movl	%eax,-28(%ebp)
t495:
	addl	$40, %esp
	popl	%ebp
	ret


	.globl	_CclassJ_func1
	.align	4,0x90
_CclassJ_func1:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$40,%esp
	call	t496$pb
t496$pb:
	popl	%eax
	movl	%eax, -4(%ebp)
	movl	8(%ebp),%ecx
	movl	%ecx,-8(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-12(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassJ_ja.str-t496$pb(%ecx),%eax
	movl	%eax,-16(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,(%esp)
	movl	-16(%ebp),%eax
	movl	%eax,4(%esp)
	call	_get_attr
	movl	%eax,-20(%ebp)
	movl	-20(%ebp),%eax
	movl	%eax,-28(%ebp)
	movl	-28(%ebp),%eax
	movl	%eax,(%esp)
	call	_project_int
	movl	%eax,-32(%ebp)
	movl	-32(%ebp),%eax
	movl	%eax,(%esp)
	call	_print_int_nl
t497:
	addl	$40, %esp
	popl	%ebp
	ret


	.globl	_setup_CclassJ
	.align	4,0x90
_setup_CclassJ:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$88,%esp
	call	t498$pb
t498$pb:
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
	movl	CclassJ$non_lazy_ptr-t498$pb(%ecx),%edx
	movl	-36(%ebp),%eax
	movl	%eax,(%edx)
	movl	-4(%ebp),%ecx
	movl	CclassJ$non_lazy_ptr-t498$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-40(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassJ___init__.str-t498$pb(%ecx),%eax
	movl	%eax,-44(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CclassJ___init__-t498$pb(%ecx),%eax
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
	movl	CclassJ$non_lazy_ptr-t498$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-56(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassJ_func1.str-t498$pb(%ecx),%eax
	movl	%eax,-60(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CclassJ_func1-t498$pb(%ecx),%eax
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
t499:
	addl	$88, %esp
	popl	%ebp
	ret


	.globl	_CclassK___init__
	.align	4,0x90
_CclassK___init__:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$56,%esp
	call	t500$pb
t500$pb:
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
	movl	-8(%ebp),%eax
	movl	%eax,-24(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassK_ka.str-t500$pb(%ecx),%eax
	movl	%eax,-28(%ebp)
	movl	-16(%ebp),%eax
	movl	%eax,-32(%ebp)
	movl	-24(%ebp),%eax
	movl	%eax,(%esp)
	movl	-28(%ebp),%eax
	movl	%eax,4(%esp)
	movl	-32(%ebp),%eax
	movl	%eax,8(%esp)
	call	_set_attr
	movl	%eax,-36(%ebp)
t501:
	addl	$56, %esp
	popl	%ebp
	ret


	.globl	_CclassK_func1
	.align	4,0x90
_CclassK_func1:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$40,%esp
	call	t502$pb
t502$pb:
	popl	%eax
	movl	%eax, -4(%ebp)
	movl	8(%ebp),%ecx
	movl	%ecx,-8(%ebp)
	movl	-8(%ebp),%eax
	movl	%eax,-12(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassK_ka.str-t502$pb(%ecx),%eax
	movl	%eax,-16(%ebp)
	movl	-12(%ebp),%eax
	movl	%eax,(%esp)
	movl	-16(%ebp),%eax
	movl	%eax,4(%esp)
	call	_get_attr
	movl	%eax,-20(%ebp)
	movl	-20(%ebp),%eax
	jmp	t503
t503:
	addl	$40, %esp
	popl	%ebp
	ret


	.globl	_setup_CclassK
	.align	4,0x90
_setup_CclassK:
	pushl	%ebp
	movl	%esp,%ebp
	subl	$88,%esp
	call	t504$pb
t504$pb:
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
	movl	CclassK$non_lazy_ptr-t504$pb(%ecx),%edx
	movl	-36(%ebp),%eax
	movl	%eax,(%edx)
	movl	-4(%ebp),%ecx
	movl	CclassK$non_lazy_ptr-t504$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-40(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassK___init__.str-t504$pb(%ecx),%eax
	movl	%eax,-44(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CclassK___init__-t504$pb(%ecx),%eax
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
	movl	CclassK$non_lazy_ptr-t504$pb(%ecx),%edx
	movl	(%edx),%eax
	movl	%eax,-56(%ebp)
	movl	-4(%ebp),%ecx
	leal	CclassK_func1.str-t504$pb(%ecx),%eax
	movl	%eax,-60(%ebp)
	movl	-4(%ebp),%ecx
	leal	_CclassK_func1-t504$pb(%ecx),%eax
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
t505:
	addl	$88, %esp
	popl	%ebp
	ret

	.comm	CclassA,4,2
	.section  __TEXT,__cstring,cstring_literals
CclassA___init__.str:
	.asciz	"CclassA___init__"

CclassA_aa.str:
	.asciz	"CclassA_aa"

CclassA_ab.str:
	.asciz	"CclassA_ab"

	.comm	CclassB,4,2
	.section  __TEXT,__cstring,cstring_literals
CclassB___init__.str:
	.asciz	"CclassB___init__"

	.comm	CclassC,4,2
	.section  __TEXT,__cstring,cstring_literals
CclassC___init__.str:
	.asciz	"CclassC___init__"

CclassC_func1.str:
	.asciz	"CclassC_func1"

CclassC_ca.str:
	.asciz	"CclassC_ca"

	.comm	CclassD,4,2
	.section  __TEXT,__cstring,cstring_literals
CclassD___init__.str:
	.asciz	"CclassD___init__"

CclassD_func1.str:
	.asciz	"CclassD_func1"

CclassD_da.str:
	.asciz	"CclassD_da"

	.comm	CclassE,4,2
	.section  __TEXT,__cstring,cstring_literals
CclassE___init__.str:
	.asciz	"CclassE___init__"

CclassE_func1.str:
	.asciz	"CclassE_func1"

CclassE_da.str:
	.asciz	"CclassE_da"

	.comm	CclassF,4,2
	.section  __TEXT,__cstring,cstring_literals
CclassF___init__.str:
	.asciz	"CclassF___init__"

CclassF_func1.str:
	.asciz	"CclassF_func1"

CclassF_func2.str:
	.asciz	"CclassF_func2"

CclassF_fa.str:
	.asciz	"CclassF_fa"

CclassF_fb.str:
	.asciz	"CclassF_fb"

	.comm	CclassG,4,2
	.section  __TEXT,__cstring,cstring_literals
CclassG___init__.str:
	.asciz	"CclassG___init__"

CclassG_func1.str:
	.asciz	"CclassG_func1"

CclassG_ga.str:
	.asciz	"CclassG_ga"

	.comm	CclassH,4,2
	.section  __TEXT,__cstring,cstring_literals
CclassH___init__.str:
	.asciz	"CclassH___init__"

CclassH_func1.str:
	.asciz	"CclassH_func1"

CclassH_ha.str:
	.asciz	"CclassH_ha"

CclassH_hb.str:
	.asciz	"CclassH_hb"

	.comm	CclassI,4,2
	.section  __TEXT,__cstring,cstring_literals
CclassI___init__.str:
	.asciz	"CclassI___init__"

CclassI_ia.str:
	.asciz	"CclassI_ia"

CclassI_ib.str:
	.asciz	"CclassI_ib"

	.comm	CclassJ,4,2
	.section  __TEXT,__cstring,cstring_literals
CclassJ___init__.str:
	.asciz	"CclassJ___init__"

CclassJ_func1.str:
	.asciz	"CclassJ_func1"

CclassJ_ja.str:
	.asciz	"CclassJ_ja"

	.comm	CclassK,4,2
	.section  __TEXT,__cstring,cstring_literals
CclassK___init__.str:
	.asciz	"CclassK___init__"

CclassK_func1.str:
	.asciz	"CclassK_func1"

CclassK_ka.str:
	.asciz	"CclassK_ka"


	.section  __IMPORT,__pointers,non_lazy_symbol_pointers
CclassA$non_lazy_ptr:
.indirect_symbol CclassA
	.long	0

CclassB$non_lazy_ptr:
.indirect_symbol CclassB
	.long	0

CclassC$non_lazy_ptr:
.indirect_symbol CclassC
	.long	0

CclassD$non_lazy_ptr:
.indirect_symbol CclassD
	.long	0

CclassE$non_lazy_ptr:
.indirect_symbol CclassE
	.long	0

CclassF$non_lazy_ptr:
.indirect_symbol CclassF
	.long	0

CclassG$non_lazy_ptr:
.indirect_symbol CclassG
	.long	0

CclassH$non_lazy_ptr:
.indirect_symbol CclassH
	.long	0

CclassI$non_lazy_ptr:
.indirect_symbol CclassI
	.long	0

CclassJ$non_lazy_ptr:
.indirect_symbol CclassJ
	.long	0

CclassK$non_lazy_ptr:
.indirect_symbol CclassK
	.long	0

.subsections_via_symbols

