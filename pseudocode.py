def play():
  while canContinue():
    if (existsPiece()):
      if (canPieceMoveDown()):
        moveDown()
      else:
        convertPieceToBlocks()
    else:
      insertPiece()
      displayNextPiece()
    deleteFilledRows()
  initKeyButtons()

def initKeyButtons():
  if (rightKeyPressed):
    if (canMoveRight) moveRight()
  if (leftKeyPressed):
    if (canMoveLeft) moveLeft()
  if (bottomKeyPressed) increaseDownSpeed()
  

def play():
  