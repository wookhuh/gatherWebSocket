import { Game, WireObject } from "@gathertown/gather-game-client";
import { moveObj } from "../objects/follow"
export const subscribe = (game: Game, MAP_ID: string) => {
  
	game.subscribeToEvent("playerInteracts", (data, context) => {
		let prev = game.getObject(data.playerInteracts.objId)?.obj?.previewMessage!;
		game.setAffiliation(prev, context.playerId); //set pokemon
	});

	game.subscribeToEvent("playerMoves", (data, context) => {
		if(context.player?.affiliation != ''){
			moveObj(game, MAP_ID, context);
		}
	});

	game.subscribeToEvent("playerExits", (data, context) => {
		game.deleteObject(MAP_ID, context.playerId + "TV");
	});
}