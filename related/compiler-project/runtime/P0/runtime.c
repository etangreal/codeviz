#include <stdio.h>

void print_int(int x)
{
    printf("%d", x);
}

void print_int_nl(int x)
{
    printf("%d\n", x);
}

int input()
{
    int x;
   
    scanf("%d", &x);
    return x;
}
