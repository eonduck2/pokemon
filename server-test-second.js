const http = require(`node:http`);

const testFunc = async () => {
  const offset = `offset=0`;
  const limit = `limit=20`;
  const responseSpecies = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/1/?${offset}&${limit}`
  ).then((res) => {
    if (!res.ok) {
      throw new Error(`통신 실패`);
    } else {
      return res.json();
    }
  });

  console.log(responseSpecies.names);
};

testFunc();

// http
//   .createServer((req, res) => {
//     logJSONData(res);
//     // res.writeHead(200, { "Content-type": `text/plain` });
//     // res.end(`테스트`);
//   })
//   .listen(8080, () => {
//     console.log(`the server is processing on http://localhost:8080`);
//   });
