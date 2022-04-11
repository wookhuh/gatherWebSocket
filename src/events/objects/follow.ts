import { Game, WireObject } from "@gathertown/gather-game-client";

export const moveObj = (game: Game, MAP_ID: string, context: any) => {

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
let xxxx = [
  //dont judge my bad pixel art plz
	"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/UvXBVt6vw9JZoqDn/Y5vY4aK8pnt7BeDJtUPWf2",
	"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/UvXBVt6vw9JZoqDn/vfiSUqMKhQPqckKCAPiOmo",
	"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/UvXBVt6vw9JZoqDn/X1lhPryAcvwegkB5U6TVQ7",
	"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/UvXBVt6vw9JZoqDn/l8gT9dqbY6XyY0lL6NleOa",
	"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/UvXBVt6vw9JZoqDn/xVYesBO0LGlXo3XE4aJX3J",
	"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/UvXBVt6vw9JZoqDn/YQ7hfTqShZLV1TXC3vXGJ8",
	"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/UvXBVt6vw9JZoqDn/mQo4E5VgcSQb4cLfANFw8L",
	"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/UvXBVt6vw9JZoqDn/He157zYI2tOkS44q1cNrcQ",
];