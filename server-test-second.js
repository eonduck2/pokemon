// const http = require(`node:http`);

const testFunc = async () => {
  const offset = `offset=0`;
  const limit = `limit=10`;
  // const responseSpecies = await fetch(
  //   `https://pokeapi.co/api/v2/pokemon-species/1/?${offset}&${limit}`
  // ).then((res) => {
  //   if (!res.ok) {
  //     throw new Error(`통신 실패`);
  //   } else {
  //     return res.json();
  //   }
  // });
  // console.log(responseSpecies.names);

  // ! next를 클릭할 때마다 계속 fetch하는 식으로 설계
  const responseEn = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?${limit}&${offset}`
  );
  if (!responseEn.ok) throw new Error(`개별 포켓몬 통신이 실패했습니다.`);
  const dataEn = await responseEn.json();

  // const responseKo = await fetch(dataEn.species.url);
  // if (!responseKo.ok) throw new Error(`한국어용 포켓몬 통신이 실패했습니다.`);
  // const dataLanguage = await responseKo.json();
  // const dataKo = dataKoFn(dataLanguage);

  dataEn.results.forEach((pokeUrl) => {
    fetch(pokeUrl.url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`통신 실패`);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        const root = document.getElementById(`root`);
        const div = document.createElement(`div`);
        console.log(data.sprites.other.showdown.front_default);
        div.innerHTML = `<img src="${data.sprites.other.showdown.front_default}" alt="">`;
        root.appendChild(div);
        // !front_default_obj 키를 포켓몬 이름으로 할 필요가 있음
        // const front_default_obj = data.sprites.other.showdown.front_default;
        // createGif({ front_default_obj });
      });
  });
};

// const createGif = async (pokeObj) => {
//   const pokeArr = Object.values(pokeObj);
//   console.log(pokeArr);
// };
// function dataKoFn(data) {
//   let name = "";
//   data.names.forEach((item) => {
//     if (item.language.name === "ko") name = item.name;
//   });

//   let genera = "";
//   data.genera.forEach((item) => {
//     if (item.language.name === "ko") genera = item.genus;
//   });

//   let flavor = "";
//   data["flavor_text_entries"].forEach((item) => {
//     if (item.language.name === "ko") flavor = item["flavor_text"];
//   });

//   return { name, genera, flavor };
// }

// export default fetchData;

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
