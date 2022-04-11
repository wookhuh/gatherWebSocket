# XR-Friends (v0.1)

[게더타운 웹소켓 api 문서 확인](https://gathertown.notion.site/Gather-Websocket-API-bf2d5d4526db412590c3579c36141063)!

## setup

prereq: have NodeJS and npm installed

run `npm install`

put your API key in a file named `api-key.ts` like so:

```js
export const API_KEY = "your-api-key-here";
```

replace the `SPACE_ID` and `MAP_ID` in `index.ts` with your own

first time: comment in `cleanSlate()` at the bottom of `index.ts` to do the initial map setup, but after that just run `runForest()`

## running

`npm run start`


## References

* [Gather WebSocket API Documentation](https://gathertown.notion.site/Gather-Websocket-API-bf2d5d4526db412590c3579c36141063)
* [Gather HTTP API Documentation](https://www.notion.so/Gather-HTTP-API-3bbf6c59325f40aca7ef5ce14c677444)
* [The Forest API Interaction Example](https://github.com/gathertown/the-forest)
* [Gather Forum](https://forum.gather.town/c/developers/api-questions/9)