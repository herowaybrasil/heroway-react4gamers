import { EDirections } from '../../settings/constants';

export interface IPosition {
  x: number;
  y: number;
}

export type IEnemies = 'MiniDemon' | 'Demon';
export type ICharacters = 'Hero' | IEnemies;

export enum ECanvas {
  MOVIMENT = 0, // Espaços Disponíveis para movimento
  WALL = 1, // Parede
  DOOR = 2, // Porta
  TRAP = 3, // Armadilha
  MINI_DEMON = 4, // MiniDemon
  DEMON = 5, // Demon
  DEMON_OFFSET = 6, // Demon Offset
  CHEST = 7, // Baú
  HERO = 8, // Hero
}
const {
  MOVIMENT: MV,
  WALL: WL,
  DOOR: DR,
  TRAP: TR,
  MINI_DEMON: MD,
  DEMON: DE,
  DEMON_OFFSET: DO,
  CHEST: CH,
  HERO: HE,
} = ECanvas;

export type ICanvas = ECanvas[][];
export const canvas: ICanvas = [
  [WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, DR, DR, WL, WL, WL, WL, WL],
  [WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, DR, DR, WL, WL, WL, WL, WL],
  [WL, MV, MV, WL, MV, MV, MV, MV, WL, MV, MV, MV, MV, MV, MV, MV, WL, MV, MV, WL],
  [WL, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MD, MV, MV, MV, MV, MV, MV, MV, WL],
  [WL, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, WL],
  [WL, MV, MV, CH, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, WL],
  [WL, MV, MV, MV, MV, MV, MV, MV, MV, MV, TR, MV, MV, MV, MV, MV, MV, MV, MV, WL],
  [WL, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, WL],
  [WL, MV, MV, MV, MV, MV, MV, MV, TR, MV, DE, DO, MV, MV, MV, MV, MV, MV, MV, WL],
  [WL, MV, MV, MV, MV, MV, MV, MV, MV, MV, DO, DO, MV, MV, MV, MV, MV, MV, MV, WL],
  [WL, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, WL],
  [WL, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, WL],
  [WL, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, TR, MV, MV, WL],
  [WL, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, WL],
  [WL, MV, MV, MV, MV, MV, MV, TR, MV, MV, MV, MV, MV, MV, MV, MV, MV, CH, MV, WL],
  [WL, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, TR, MV, MV, MV, MV, MV, WL],
  [WL, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MD, MV, WL],
  [WL, HE, WL, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, MV, WL],
  [WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL],
  [WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL],
];

(window as any).canvas = canvas;

export function getNewPosition(direction: EDirections, position: IPosition): IPosition {
  switch (direction) {
    case EDirections.UP:
      return handleNewPosition(position, { x: position.x, y: position.y - 1 });

    case EDirections.RIGHT:
      return handleNewPosition(position, { x: position.x + 1, y: position.y });

    case EDirections.DOWN:
      return handleNewPosition(position, { x: position.x, y: position.y + 1 });

    case EDirections.LEFT:
      return handleNewPosition(position, { x: position.x - 1, y: position.y });

    default:
      return position;
  }
}

function handleNewPosition(currentPosition: IPosition, newPosition: IPosition) {
  const nextMoveIsAllowed = checkNextMoveIsValid(newPosition);

  if (nextMoveIsAllowed) {
    updateCanvas(currentPosition, newPosition);
    return newPosition;
  }

  return currentPosition;
}

function checkNextMoveIsValid(canvasPosition: IPosition) {
  return canvas[canvasPosition.y][canvasPosition.x] === 0;
}

function updateCanvas(currentPosition: IPosition, newPosition: IPosition) {
  const value = canvas[currentPosition.y][currentPosition.x];

  canvas[currentPosition.y][currentPosition.x] = 0;
  canvas[newPosition.y][newPosition.x] = value;
}
