import { API_KEY } from "./api-key";
import { Game, WireObject } from "@gathertown/gather-game-client";
import { moveObject } from "./src/action/objects/objectAction"
import { movePlayer } from "./src/action/players/playerAction"
import { subscribe } from "./src/events/subscribeToEvent/subscribe"
global.WebSocket = require("isomorphic-ws");
 

const SPACE_ID = "eiaW8XJZRtDxsykx\\test";
const MAP_ID = "empty-room-medium-brick";

const game = new Game(SPACE_ID, () => Promise.resolve({ apiKey: API_KEY }));
game.connect(); // replace with your spaceId of choice
// http://gather-game-client-docs.s3-website-us-west-2.amazonaws.com/classes/Game.html

const gatherTownWebSocket = () => {
	game.subscribeToConnection((connected) => {
		console.log("connected? => ", connected)

		let num = 1
		const tvId = "flHcNkwj02JRv2q2VC9St_a134a014-1ca6-4473-958c-f7bc8d217b41";
		const tvId2 = "Bulletin (Video) - VBxAOZjzkW1Nc9rIwcwp_e49c6198-cb75-4a05-9f7f-b9ef036002fc"
		const flowerId = "PottedPlantPulmeria - aoRO76nJFb5MPXHqeN6aS_7cbb5c7e-e676-43f2-8e4d-bfedaa3177a3";
    const docentId = "u2yLFUeEbmd7kJlRpYv3k4e0C0n2";
		
		const holes = [];

		setInterval(() => {

			num = num > 17 ? 1 : num+1;
			// const objectUpdates: { [key: number]: WireObject } = {};
      moveObject(game, MAP_ID, num, num);
      movePlayer(game, MAP_ID, num, num, docentId);

		}, 1000);

		const player = game.players;
		Object.keys(player).forEach(x => {
			player[x].affiliation = "";
		});


    //video 
    let idxArr: number[] = [];
    for (const _key in game.partialMaps[MAP_ID]?.objects) {
      idxArr.push(parseInt(_key));
    }
	});
}

gatherTownWebSocket();
subscribe(game, MAP_ID);