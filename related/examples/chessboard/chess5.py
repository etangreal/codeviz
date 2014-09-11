


knight   	 	= long('0000000000000000000000000000000000010000000000000000000000000000', 2)
moves  		 	= long('0000000000000000001010000100010000000000010001000010100000000000', 2)
knightPlusMoves = knight | moves

whitePieces  	= long('0000000000000000000000000000000000010000000001000010000000000000', 2)
knightCanMove 	= knightPlusMoves ^ whitePieces

bitboard = []
bitboard.append( knight )
bitboard.append( moves ) 
bitboard.append( knightPlusMoves )
bitboard.append( whitePieces )
bitboard.append( knightCanMove )

print '{0:064b}'.format( knightCanMove )