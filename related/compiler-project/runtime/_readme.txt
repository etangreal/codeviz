ssh atelier.inf.usi.ch -l salzmane

scp /path/to/local/file username@hostname:/path/to/remote/file
scp /Users/ernst/Dropbox/code/compilers/compiler/* salzmane@atelier.inf.usi.ch:~/compiler
scp -r /Users/ernst/Dropbox/code/compilers/compiler/* salzmane@atelier.inf.usi.ch:~/compiler

gcc -m32 -S test1.c -o test1.s
gcc -m32 test1.s runtime.c -o test1
