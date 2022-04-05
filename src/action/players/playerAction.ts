import { Game, WireObject } from "@gathertown/gather-game-client";

export const movePlayer = (game: Game, MAP_ID: string, xx: number, yy: number, userId: string) => {
  game.teleport(MAP_ID, xx, yy, userId);

  // #dir
  // Left = 0,
  // Right = 1,
  // Up = 2,
  // Down = 3,
  // Dance = 4
  // game.engine.sendAction({
  // 	$case: "move",
  // 	move: {
  // 		dir: 11,
  // 		stopped: false,
  // 		inputId: 0,
  // 		targetId: "u2yLFUeEbmd7kJlRpYv3k4e0C0n2"
  // 	}
  // });
}
