import {KingBlue, KingRed} from '../resources/icons';

import {Piece, PieceIdentity, PiecePosition} from './piece';

export class King extends Piece {
  get nextPositions(): PiecePosition[] {
    let {x, y} = this.position;
    let faction = this.faction;
    let {pieceGrid, getPiece} = this.context;

    let yCenter = faction === 'red' ? 8 : 1;

    let positions = [
      {x, y: y + 1},
      {x, y: y - 1},
      {x: x + 1, y},
      {x: x - 1, y},
    ].filter(
      position =>
        position.x >= 3 &&
        position.x <= 5 &&
        position.y >= yCenter - 1 &&
        position.y <= yCenter + 1,
    );

    let direction = faction === 'red' ? -1 : 1;
    let offset = 1;

    while (!pieceGrid[y + offset * direction]?.[x]) {
      let index = y + offset * direction;

      if (index >= pieceGrid.length || index <= 0) {
        break;
      }

      offset++;
    }

    if (pieceGrid[y + offset * direction]?.[x]) {
      let otherKing = getPiece(pieceGrid[y + offset * direction][x]!);

      if (otherKing.identity.type === 'king') {
        positions.push({...otherKing.position});
      }
    }

    return positions;
  }

  identity: PieceIdentity = {
    type: 'king',
    name: '大帅',
    red: {
      displayName: '帥',
      Icon: KingRed,
      initializePosition() {
        return {
          x: 4,
          y: 9,
        };
      },
    },
    blue: {
      displayName: '将',
      Icon: KingBlue,
      initializePosition() {
        return {
          x: 4,
          y: 0,
        };
      },
    },
    description: '国宝级的人物, 起着稳定军心的大用, 每顿只吃进口竹子',
  };
}
