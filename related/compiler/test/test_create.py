import sys, os, subprocess
import unittest, test_cases_p0, test_cases_p25

#--------------------------------------------------------------------------------------------------

def displayFile(path):

    f = open(path,"r+")

    while (True):
        line = f.readline()
        if not line: break
        print line
    
    f.close()

#--------------------------------------------------------------------------------------------------

def compileFile(source,target):

	ins = "python compile.py "+source+" > "+target+".s"
	#print "\n" + ins + "\n"
	os.system( ins )
	
	RUNTIME = "../runtime/hashtable.o ../runtime/hashtable_itr.o ../runtime/hashtable_utility.o ../runtime/runtime.o"
	ins = "gcc -m32 "+target+".s "+RUNTIME+" -o "+target
	#print "\n" + ins + "\n"
	os.system( ins )
	
	#gcc -m32 ./tests/test1.s runtime.c -o ./tests/test1

#--------------------------------------------------------------------------------------------------

def executePython(source,target):

	os.system( "python "+source+" > "+target )

#--------------------------------------------------------------------------------------------------

def executeFile(source,target):

	os.system( source + " > " + target )

#--------------------------------------------------------------------------------------------------

def writePyFile(source,target):

	f = open(target,"w+")
	f.write(source.strip())			#t = t.strip(' \t\n\r')
	f.close()

#--------------------------------------------------------------------------------------------------

def displayFile(target):

	os.system( "cat "+target )

#--------------------------------------------------------------------------------------------------

def GenerateTestCase(desc, test, assrt, path=""):

	if (path == ""):
		path = "./tests/test"

	test = desc + "\n" + test
	writePyFile (test, path+".py")

	#print "--------------------------------------------------------------------------------------------------"
	#displayFile(path+".py")
	
	executePython (path+".py", path+".py.out")

	writePyFile (assrt, path+".assrt.out")

	compileFile (path+".py",path)
	
	executeFile (path, path+".out")

#------------------------------------------------------------------

def GenerateTestCases(descs, tests, assrts, path=""):

	os.system('clear')
	print "Generating tests"
	print ""

	if (path == ""):
		path = "./tests/"

	for i in range(len(tests)):
		print "\nTEST: " + str(i)

		# if (i == 3):
		# 	break

		GenerateTestCase(descs[i],tests[i],assrts[i],path+"test"+str(i))

#--------------------------------------------------------------------------------------------------

if ( len(sys.argv) >= 2 ): 

	if ( sys.argv[1] == "-create-tests-p0" ):
		descs = test_cases_p0.descs_p0
		tests = test_cases_p0.tests_p0
		assrts = test_cases_p0.assrts_p0

		GenerateTestCases(descs,tests,assrts,"./tests_p0/")

	elif ( sys.argv[1] == "-create-tests-p25" ):
		descs = test_cases_p25.descs_p25
		tests = test_cases_p25.tests_p25
		assrts = test_cases_p25.assrts_p25

		GenerateTestCases(descs,tests,assrts)

	# else:
	# 	os.system('clear')

	# 	print "MESSAGE FROM: test_create.py"
	# 	print "\nInvalid parameter: " + sys.argv[1] + "\n"

	# 	print "\nPlease specify:\n"
	# 	print "\t'-create-tests-p0'\t\t#generates all p0 test cases"
	# 	print "\t'-create-tests-p25'\t\t#generates all p2.5 test cases"

	# 	print ""

# -------------------------------------------------------------------------------------------------
# END OF FILE
# -------------------------------------------------------------------------------------------------

