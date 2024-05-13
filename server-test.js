const { on } = require("node:events");
const http = require(`node:http`);
const { type } = require("node:os");
const { json } = require("stream/consumers");

async function logJSONData(res) {
  const offset = `offset=0`;
  const limit = `limit=20`;
  const response = await fetch(
    // `https://pokeapi.co/api/v2/pokemon?${offset}&${limit}`
    `https://pokeapi.co/api/v2/pokemon-species?${offset}&${limit}`
  );
  const responseSpecies = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/1/?${offset}&${limit}`
  );

  console.log(responseSpecies);

  const jsonData = await response.json().then((fulfilled, rejected) => {
    const pokemonArrayUrl = [];

    if (rejected !== undefined) {
      return rejected;
    } else {
      fulfilled.results.forEach((pokeObj) => {
        pokemonArrayUrl.push(pokeObj.url);
      });
    }

    const data = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="root">
      <h1>${pokemonArrayUrl}</h1>
    </div>
  </body>
</html>
    `;
    res.writeHead(200, { "Content-type": `text/html` });
    res.end(data);
  });
}

http
  .createServer((req, res) => {
    logJSONData(res);
    // res.writeHead(200, { "Content-type": `text/plain` });
    // res.end(`테스트`);
  })
  .listen(8080, () => {
    console.log(`the server is processing on http://localhost:8080`);
  });
