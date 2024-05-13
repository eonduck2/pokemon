require("dotenv").config();

const pokemon_API = process.env.pokemon_API;
const pokemon_type_API = process.env.pokemon_type_API;

const pokemon = fetch(pokemon_API)
  .then((res, rej) => {
    if (!res.ok) {
      throw new Error(`통신 실패`);
    } else {
      const pokeUrl = res.json();
      return pokeUrl;
    }
  })
  .then((data) => {
    return data.results.map((url) => {
      return url.url;
    });
  })
  .then((url) => {
    return url;
  });

pokemon.then((data) => {
  fetch(data[0])
    .then((res, rej) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((test) => {
      // console.log(test);
      console.log(test.sprites.other.showdown.front_default);
      return test.species;
    });
});

// const pokemon = fetch(pokemon_API)
//   .then((res, rej) => {
//     if (!res.ok) {
//       throw new Error(`통신 실패`);
//     } else {
//       return res.json();
//     }
//   })
//   .then((data) => {
//     const pokeUrl = data.results.map((element) => {
//       return element.url;
//     });
//     return pokeUrl;
//   })
//   .then((pokeUrls) => {
//     fetch
//   });
