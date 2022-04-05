import { API_KEY } from "./api-key";
import { Game, WireObject } from "@gathertown/gather-game-client";
global.WebSocket = require("isomorphic-ws");


const SPACE_ID = "eiaW8XJZRtDxsykx\\test";
const MAP_ID = "empty-room-medium-brick";

const game = new Game("eiaW8XJZRtDxsykx\\test", () => Promise.resolve({ apiKey: API_KEY }));
game.connect(); // replace with your spaceId of choice
game.subscribeToConnection((connected) => {
	console.log("connected? ===>>>>>", connected)
});
// http://gather-game-client-docs.s3-website-us-west-2.amazonaws.com/classes/Game.html
const testest = () => {
	game.subscribeToConnection(() => {
		let num = 1
		const tvId = "flHcNkwj02JRv2q2VC9St_a134a014-1ca6-4473-958c-f7bc8d217b41";
		const tvId2 = "Bulletin (Video) - VBxAOZjzkW1Nc9rIwcwp_e49c6198-cb75-4a05-9f7f-b9ef036002fc"
		const flowerId = "PottedPlantPulmeria - aoRO76nJFb5MPXHqeN6aS_7cbb5c7e-e676-43f2-8e4d-bfedaa3177a3";
		const holes = [];

		setInterval(() => {

			// console.log("==============================")
			// console.log(game.partialMaps[MAP_ID]?.objects)

			num = num > 17 ? 1 : num+1;
			const objectUpdates: { [key: number]: WireObject } = {};
			const keysList = [];
			for (const _key in game.partialMaps[MAP_ID]?.objects) {
				const key = parseInt(_key);
				keysList.push(key);
			}
			keysList.forEach((x, idx) => {
				const obj = game.partialMaps[MAP_ID]?.objects?.[x];
				// console.log(`obj => ${idx}`, obj)
				if(obj?.["id"] === tvId){
					objectUpdates[x] = {
						// x: num,
						// y: num,
						previewMessage: 'xxxx',
						_tags: []
					}
				}

        // http://cocoluluk.com:1935/testxr/myStream/manifest.mpd
        // http://cocoluluk.com:1935/testxr/myStream/playlist.m3u8
				if(obj?.["id"] === tvId2){
					objectUpdates[x] = {
						previewMessage: 'yyyyyyy',
            propertiesJson: '{"video": "http://cocoluluk.com:1935/testxr/myStream/playlist.m3u8"}',
						_tags: []
					}
				}
				if(obj?.["id"] === flowerId){
					objectUpdates[x] = {
						previewMessage: 'delete',
						propertiesJson: '',
						type: 5,
						_tags: []
					}
				}
			})

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
			

			// game.teleport(MAP_ID, num, num, "u2yLFUeEbmd7kJlRpYv3k4e0C0n2");

			// game.subscribeToEvent("playerMoves", (data, context) => {
			// 	console.log(context.player?.name, "moved!");
			// });

			game.engine.sendAction({
				$case: "mapSetObjects",
				mapSetObjects: {
					mapId: MAP_ID,
					objects: objectUpdates
				}
			});


      game.engine.sendAction({
        $case: "setManualVideoSrc",
        setManualVideoSrc: {
          manualVideoSrc: "http://cocoluluk.com:1935/testxr/myStream/manifest.mpd",
          // targetId: "u2yLFUeEbmd7kJlRpYv3k4e0C0n2"
        }
      });


			// ServerClientEvent
			// ClientServerAction
			// game.engine.sendAction({
			// 	$case: "setPointer",
			// 	setPointer: {
			// 		objectId: "u2yLFUeEbmd7kJlRpYv3k4e0C0n2",
			// 		x: num,
			// 		y: num,
			// 	}
			// });


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

    // [...Array(idxArr.length)].map((x, idx) => idx).forEach(x => {
    //   let videoObj = game.partialMaps[MAP_ID]?.objects?.[x]!
    //   if(videoObj?.["id"] === tvId){
    //     videoObj = {
    //       previewMessage: 'yyyyyyy',
    //       propertiesJson: '{"video": "http://cocoluluk.com:1935/testxr/myStream/playlist.m3u8"}',
    //       _tags: []
    //     }
    //   }
    // });
    



	});
}

const subscribe = () => {
	game.subscribeToEvent("playerInteracts", (data, context) => {
		console.log("==========subscribeToEvent============")
		console.log(data)
		let prev = game.getObject(data.playerInteracts.objId)?.obj?.previewMessage!;
    console.log(game.getObject(data.playerInteracts.objId))
		// game.setAffiliation("", context.playerId);

		game.setAffiliation(prev, context.playerId); //set pokemon

		
	});

	game.subscribeToEvent("playerMoves", (data, context) => {
		if(context.player?.affiliation != ''){
			// console.log(context.player?.name +"MOVE")
			moveObj(context); 
		}
	});

	game.subscribeToEvent("playerExits", (data, context) => {
		game.deleteObject(MAP_ID, context.playerId + "TV");
	});
}


const moveObj = (context: any) => {
	// console.log(context.player?.affiliation)
	if(context.player?.affiliation === ""){
		return;
	}
	if(context.player?.affiliation === "delete"){
		game.deleteObject(MAP_ID, context.playerId + "TV");
		return;
	}
	let objectId = context.playerId +"TV";
	let location = getNewTvLocation(context.player.x, context.player.y, context.player.direction);
	let state = 'normal';
	let imageLocation = eval("xxxx")[location[2]];
	if(game.getObject(objectId) != undefined){    //something something this gets mad at me if this is undefined and i try to move on
		if(game.getObject(objectId)?.obj?.customState == 'normal'){  
		  imageLocation = eval("xxxx")[location[2]+4];
		  state = 'walking'
		}
	}

	let obj = {
		id: objectId,
		normal: imageLocation,
		x: location![0],
		y: location![1],
		type: 0,
		width: 1,
		height: 1,
		customState: state
	}
	
	  //add object
	setTimeout(() => {
		game.setObject(MAP_ID, objectId, obj);
	},200);

  

}

const getNewTvLocation = (x: number, y: number, direction: number): number[] => {
	if(direction == 1 || direction == 2 ){         //down
		return [x, y-1, 3];
	}else if(direction == 3 || direction == 4 ){   //up
		return [x, y+1, 2];
	}else if(direction == 5 || direction == 6 ){   //left
		return [x+1, y, 0];
	}else if(direction == 7 || direction == 8 ){   //right
		return [x-1, y, 1];
	}else{
		return [x, y, 1];
	}
}

const videoObj = () => {

}

function compose<A, B, C>(f: (arg: A) => B, g: (arg: B) => C): (arg: A) => C {
  return (x) => g(f(x));
}

testest();
subscribe()



let pokeball =
  "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/jEDZjhqoI4iAKolF/tY3NKLnSH19EEstnaZ6Ix5";
let Charmander = [
  "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/jEDZjhqoI4iAKolF/Gs2JPhCJJXGzFEegABNp7g",
  "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/jEDZjhqoI4iAKolF/nYQ0cEdRlQdMs6fu7FXVZd",
  "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/jEDZjhqoI4iAKolF/Tp75dv75IIAWdanFsPfxWG",
  "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/jEDZjhqoI4iAKolF/Del3VK7aCJhOUXHacVVDJl",
  "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/jEDZjhqoI4iAKolF/SWCKU6WP9Eky7yoIeOGqtL",
  "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/jEDZjhqoI4iAKolF/O4Ulzd5by5VNdbbKDIrFBj",
  "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/jEDZjhqoI4iAKolF/1hHwGrACK86OwGZjcrSC2W",
  "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/jEDZjhqoI4iAKolF/Rwv9YE7UjV42VFHBnmEvee",
];
let Squirtle = [
  "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/UvXBVt6vw9JZoqDn/xx4nBSPOrygFupC430IGfz",
  "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/UvXBVt6vw9JZoqDn/KjJ2cG5Dh7PpWNlu3rD7Lp",
  "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/UvXBVt6vw9JZoqDn/s4HyLTU8JGESpfRhxunyFE",
  "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/UvXBVt6vw9JZoqDn/nCdmyDjwaPTzCBYoq8zEBm",
  "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/UvXBVt6vw9JZoqDn/DaTUV0NGxOf4YWYbKMcYB5",
  "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/UvXBVt6vw9JZoqDn/bnBagtD5yKyrQTnQWxXWrf",
  "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/UvXBVt6vw9JZoqDn/J1edvVDv9xnvEN7Jnwy9ii",
  "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/UvXBVt6vw9JZoqDn/oEW3B4ac77eaCCXNU3X2Wc",
];
let xxxx =
  //dont judge my bad pixel art plz
  [
    "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/UvXBVt6vw9JZoqDn/Y5vY4aK8pnt7BeDJtUPWf2",
    "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/UvXBVt6vw9JZoqDn/vfiSUqMKhQPqckKCAPiOmo",
    "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/UvXBVt6vw9JZoqDn/X1lhPryAcvwegkB5U6TVQ7",
    "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/UvXBVt6vw9JZoqDn/l8gT9dqbY6XyY0lL6NleOa",
    "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/UvXBVt6vw9JZoqDn/xVYesBO0LGlXo3XE4aJX3J",
    "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/UvXBVt6vw9JZoqDn/YQ7hfTqShZLV1TXC3vXGJ8",
    "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/UvXBVt6vw9JZoqDn/mQo4E5VgcSQb4cLfANFw8L",
    "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/UvXBVt6vw9JZoqDn/He157zYI2tOkS44q1cNrcQ",
  ];


  // https://gathertown.canny.io/ask-a-question/p/embed-ensemble-video



  const asd = (a: String, b?: String, c?: String) => {

  }