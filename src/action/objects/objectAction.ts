import { Game, WireObject } from "@gathertown/gather-game-client";

export const moveObject = (game: Game, MAP_ID: string, xx: number, yy: number) => {
  const wowzaId = "TV - QO5fvVLtM4HcK3P8Zkmh_d61cbdd1-02af-41b2-9c59-17fd7f3c647e";
  const flowerId = "PottedPlantPulmeria - aoRO76nJFb5MPXHqeN6aS_7cbb5c7e-e676-43f2-8e4d-bfedaa3177a3";
  const objectUpdates: { [key: number]: WireObject } = {};

  const keysList = [];
  for (const _key in game.partialMaps[MAP_ID]?.objects) {
    const key = parseInt(_key);
    keysList.push(key);
  }

  keysList.forEach((x, idx) => {
    const obj = game.partialMaps[MAP_ID]?.objects?.[x];
    if(obj?.["id"] === wowzaId){
      objectUpdates[x] = {
        // x: xx,
        // y: yy,
        propertiesJson: '{"video": "https://cocoluluk.com/testxr/myStream/playlist.m3u8"}',
        previewMessage: 'xxxx',
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
  });

  game.engine.sendAction({
    $case: "mapSetObjects",
    mapSetObjects: {
      mapId: MAP_ID,
      objects: objectUpdates
    }
  });
}
