#-------------------------------------------------------------------

descs_p25=[]
tests_p25=[]
assrts_p25=[]

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

a=input()

if a or 0:
    if a or 0:
        if a and 0:
            print (0)
        else:
            print (1)
    else:
        print(0)
else:
    print(0)

if a and 0:
    print(0)
elif a or 0:
    print (1)
else:
    print(0)
''')

assrts_p25.append("1")

#------------------------------------------------------------------

descs_p25.append("")

tests_p25.append('''

x = - input()
print x + input()

''')

assrts_p25.append("1")

#------------------------------------------------------------------






