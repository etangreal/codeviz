
# -------------------------------------------------------------------------------------------------
# 
# Authors: E.Salzmann & F.Chegini
# Date: 2012-12-06
#
# -------------------------------------------------------------------------------------------------

# -------------------------------------------------------------------------------------------------
# IMPORTS
# -------------------------------------------------------------------------------------------------

import sys, os
import copy

from compiler import parse, parseFile
from compiler.ast import *

import Declassify as D
import Explicate as E
import Heapify as H
import Flatten as F
import Unparser as UP

import Generator as G
import StackControl as SC 
import PrettyPrinter as PP
import Logger as L

sys.path.insert(0,"../test")
import test_create
import test_cases_typen
import test_cases_p0, test_cases_p0_Input, test_cases_p0_Fail
import test_cases_p25, test_cases_p25_while, test_cases_p25_class

# -------------------------------------------------------------------------------------------------
# GLOBALS
# -------------------------------------------------------------------------------------------------

# -------------------------------------------------------------------------------------------------
# FUNCTIONS
# -------------------------------------------------------------------------------------------------

def displayFile(path):

    f = open(path,"r+")

    while (True):
        line = f.readline()
        if not line: break
        print line
    
    f.close()

# -------------------------------------------------------------------------------------------------

def readFile(path):

    f = open(path,"r+")

    out = ""
    while (True):
        line = f.readline()
        l = line #.strip(' \t\n\r')
        if (l): out += l
        if not line: break

    f.close()

    return out

# -------------------------------------------------------------------------------------------------

def doTest(desc,test,assrt,path):

    test_create.GenerateTestCase(desc,test,assrt,path)

    print "\npython source:"
    test_create.displayFile(path+".py")

    print "\n\nexecuted python source:"
    test_create.displayFile(path+".py.out")

    print "\ncompiled file's output:"
    test_create.displayFile(path+".out")

    print "\nassert value:"
    test_create.displayFile(path+".assrt.out")

    print "\n"

# -------------------------------------------------------------------------------------------------

def compareTests(tests,path):

    for i in range(len(tests)):
        out = readFile(path+"test"+str(i)+".out")
        assrt = readFile(path+"test"+str(i)+".assrt.out")
        py = readFile(path+"test"+str(i)+".py.out")

        if (py == out): # == assrt
            pass
            #print "pass"
        else:
            print "----------------------------------"
            print "Test: " + str(i) + "     FAIL"
            print tests[i]
            print "python:"
            print py
            print "x86:"
            print out
            print "assert:"
            print assrt

        # if (i == 2): break

# -------------------------------------------------------------------------------------------------
# START
# -------------------------------------------------------------------------------------------------
# os.system('clear')      # <==================== NOTE TO SELF: DO NOT put this in if your redirecting to file
# print "Assignment 03 ... "
# print " "
# -------------------------------------------------------------------------------------------------
# INPUT/MENU
# -------------------------------------------------------------------------------------------------

if ( len(sys.argv) >= 2 ):  

    # ---------------------------------------------------------------------------------------------

    path = ""
    itest = -1
    path = sys.argv[1]
    option = ""
    version = ""
    is_parsed = False

    #check if the "path" -> "file" is a number, in which case it might actually be a tests[itest]
    if ( path.isdigit() ):
        itest = int(path)
 
    # check if option was supplied
    if ( len(sys.argv) >= 3 ):
        option = sys.argv[2]

    # check if version was supplied
    if ( len(sys.argv) >= 4 ):
        version = sys.argv[3]

    # ---------------------------------------------------------------------------------------------

    if ( os.path.isfile(path) ):
        #displayFile(path)  # <=== DONT ENABLE THIS, THE SECOND TIME IT CALLS ITSELF IT OUPUTS !!!
        ast = parseFile(path)
        is_parsed = True

    elif ( itest >= 0 ):

        if ( (option == "-p0" or version == "-p0") and itest < len(test_cases_p0.tests_p0) ):

            descs = test_cases_p0.descs_p0
            tests = test_cases_p0.tests_p0
            assrts = test_cases_p0.assrts_p0
            path = "../test/tests_p0/"

        elif ( (option == "-E" or version == "-E") and itest < len(test_cases_typen.tests_typen) ):

            descs = test_cases_typen.descs_typen
            tests = test_cases_typen.tests_typen
            assrts = test_cases_typen.assrts_typen
            path = "../test/tests_typen/"

        elif ( (option == "-p0In" or version == "-p0In") and itest < len(test_cases_p0_Input.tests_p0) ):

            descs = test_cases_p0_Input.descs_p0
            tests = test_cases_p0_Input.tests_p0
            assrts = test_cases_p0_Input.assrts_p0
            path = "../test/tests_p0In/"

        elif ( (option == "-p25" or version == "-p25") and itest < len(test_cases_p25.tests_p25) ):

            descs = test_cases_p25.descs_p25
            tests = test_cases_p25.tests_p25
            assrts = test_cases_p25.assrts_p25
            path = "../test/tests_p25/"

        elif ( (option == "-p25W" or version == "-p25W") and itest < len(test_cases_p25_while.tests) ):

            descs = test_cases_p25_while.descs
            tests = test_cases_p25_while.tests
            assrts = test_cases_p25_while.assrts
            path = "../test/tests_p25W/"

        elif ( (option == "-p25C" or version == "-p25C") and itest < len(test_cases_p25_class.tests_p25) ):

            descs = test_cases_p25_class.descs_p25
            tests = test_cases_p25_class.tests_p25
            assrts = test_cases_p25_class.assrts_p25
            path = "../test/tests_p25C/"

        else:
            print "ERROR: test nr. " + str(itest) + " does not exist for: " + version
            quit()

        ast = parse(tests[itest])

        is_parsed = True

    else:
        print "#invalid filename/test case ... "

    # ---------------------------------------------------------------------------------------------

    if (is_parsed):

        # transform ast into ast with create_int, create_bool, project_int, project_bool, etc.
        # and C() -> t = create_object(C); [[ t.__init__() ]]; t
        # and x.m(e) -> CallFunc(get_fun_ptr_from_method(x, 'm'), [x, e])
        # and x.f -> get_attr(x, 'f')
        # and x.f = e -> set_attr(x, 'f', e)
        # and class C: ...  -> (in main) C = create_class(create_list(0))
        # and class D(C): ... -> (in main) supers = create_list(1); supers[0] = C; D = create_class(supers)
        #
        # ultimately: x86 should have one function for each method plus one more for 'main', which includes
        # create_class.
        #
        # also... function arguments need to be treated differently from other locals when generating stack slots
        #
        # HINT: look at test4.s (gcc -m32 -S test4.c)
        # L_f: .string "f"  # in rodata section, use as L_f
        # .comm C,4,4       # to declare a symbol of size 4, alignment 4 (for the pointer to the result of create_class)

        # -------------------------------------------
        # GENERATOR

        g = G.Generator(0,[])
        g.find_excluded_variables( ast )

        # -------------------------------------------
        # AST

        # print tests[itest]
        d_stmts = copy.deepcopy( ast )
        # PP.dump_ast(ast)

        # -------------------------------------------
        # DECLASSIFY

        d = D.Declassify()
        d_stmts = d.declassify( copy.deepcopy(ast) )
        # PP.dump_ast(d_stmts)
        # quit()

        # -------------------------------------------
        # EXPLICATE

        e_stmts = d_stmts
        e = E.Explicate()
        e_stmts = e.explicate( copy.deepcopy(d_stmts) )
        PP.dump_ast(e_stmts)
        quit()

        # -------------------------------------------
        # HEAPIFY

        h = H.Heapify()
        h_stmts = h.heapify( copy.deepcopy(e_stmts) )
        # PP.dump_ast(h_stmts)
        # quit()

        # -------------------------------------------
        # FLATTEN

        f = F.Flatten([], g, False)
        f_stmts = f.flatten( copy.deepcopy(h_stmts) )
        #PP.dump_ast(f_stmts)
        # quit()

        # -------------------------------------------
        # UNPARSE

        up_stmts = UP.unparse( copy.deepcopy(f_stmts), g ) 
        # print up_stmts

        # -------------------------------------------
        # STACK-CONTROL

        sc = SC.StackControl( up_stmts.stmts, d.classes )
        sc.allocate()

        # print sc.stack
        # for o in sc.stmts:
        #     print o

        # -------------------------------------------

        if ( option == "-all" ):
            print ""
            print sc
            print "--------------------------------------------------------------------------------"
            print sc.pseudo()
            print "--------------------------------------------------------------------------------"
            print sc.x86()
            print ""

        #E -> Explicate
        elif ( option == "-E" ):

            print "************************************************************************************"

            print tests[itest]

            print " ** ast ** "
            PP.dump_ast(ast)
            print ""

            #print " ** Explicated stmts ** "
            PP.dump_ast(e_stmts)

            #print " ** Flattened stmts ** "
            PP.dump_ast(f_stmts)

            # print e_stmts
            # print f_stmts

            print "============"
            print e_stmts
            print f_stmts

        #c -> code
        elif ( option == "-c" ):
            # print ""
            # print f_stmts
            print ""
            print tests[itest]
            print ""
            print sc

        #ps -> pseudo
        elif ( option == "-p" ):
            print sc.pseudo()

        #t -> test
        elif ( option == "-t" ):
            doTest(descs[itest],tests[itest],assrts[itest],path+"test"+str(itest))

        #gat -> generate all tests
        elif ( option == "-gat" ):
            test_create.GenerateTestCases(descs,tests,assrts,path)

        #ct -> compare tests
        elif ( option == "-cmp"):
            compareTests(tests,path)

        else:
            print sc.x86()

# -------------------------------------------------------------------------------------------------
# END OF FILE
# -------------------------------------------------------------------------------------------------
