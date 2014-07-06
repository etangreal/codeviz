
# AUTHORS: Ernst Salzmann & Fatem Chegini

Functional correctness of language features:
	1- Booleans, conditionals, and loops.
	2- Class definitions, constructors, and object allocation.
	3- Field accesses and assignments.
	3- Method calls and return.
	4- P0 language features

	We support all the features of p2.5 version.
	We doesn't support inheritance.
	hint:  python compile.py 0 -t -p25C



# GOTO SOURCE DIRECTORY
cd src

# EXAMPLE USAGE

python compile.py 30 -c -p0
python compile.py 30 -p -p0
python compile.py 30 -x86 -p0
python compile.py 30 -t -p0

python compile.py 30 -c -p25

python compile.py 30 -c -p25C
# ...

# GENERATE ALL TEST
python compile.py 0 -gat -p0

# COMPARE ALL GENERATED TESTS
python compile.py 0 -cmp -p0

# SUPPLIED TESTS
cd test/tests
./runtest.sh

#SUNDRY
python compile.py ../tests/test0.py > t.s
gcc -m32 t.s runtime.c -o t

gcc -m32 test0.s ../../runtime/hashtable.o ../../runtime/hashtable_itr.o ../../runtime/hashtable_utility.o ../../runtime/runtime.o -o t

./t