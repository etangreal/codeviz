
BB 	=  ['0','0','0','0','0','0','0','0',
		'0','0','0','0','0','0','0','0',
		'0','0','0','0','0','0','0','0',
		'0','0','0','0','0','0','0','0',
		'0','0','0','0','0','0','0','0',
		'0','0','0','0','0','0','0','0',
		'0','0','0','0','0','0','0','0',
		'0','0','0','0','0','0','0','0']

KMS = [ -17, -15, -10, -6, +6, +10, +15, +17 ]

# bitboard string
def bbToStr(bb):
	return "".join(bb)

# long binary to string
def binToStr(l):
	return '{0:064b}'.format(l)

# bitboard to long
def strToBin(bbStr):
	return long(bbStr, 2)

# bitboard
def bb(pos):
	B = BB[:]

	if not isinstance(pos,list):
		pos = [pos]

	for p in pos:
		B[p] = '1'

	return B

# bitboard as string
def bbAsStr(pos):
	return bbToStr( bb(pos) )

# bitboard moves
#	bs = bitString | bitArray
#	mv = move array
def bbm(bs, mv):

	i = bs.index('1')
	m = mv[:]

	def add(v):
		return v + i

	m = map(add,m)

	return bb(m)

# bitboard moves as string
def bbmAsStr(bb, moves):
	return bbToStr( bbm(bb, moves) )

# EXAMPLE: KNIGHT-MOVES

k 	= bbAsStr(35)
m 	= bbmAsStr(k,KMS)
wp 	= bbAsStr([35,45,52])

print k
print m

k 	= strToBin(k)
m 	= strToBin(m)
km 	= k | m

print binToStr(km)

wp  = strToBin(wp)
print binToStr(wp)

kms = km ^ wp

print binToStr(kms)