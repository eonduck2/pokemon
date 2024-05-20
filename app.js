// const http = require(`node:http`);

const more_button = document.querySelector(`.more-button`);

const callPokeAPI = async (offset, limit) => {
  // ! next를 클릭할 때마다 계속 fetch하는 식으로 설계
  const responseEn = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
  );
  if (!responseEn.ok) throw new Error(`포켓몬 통신 실패`);
  const dataEn = await responseEn.json();

  const pokeArr = [];

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
        const contents_body = document.querySelector(`.contents-body`);
        const div = document.createElement(`div`);

        div.innerHTML = `<div><img src="${data.sprites.other.showdown.front_default}" alt=""></div>
        <div><span></span></div>`;
        div.className = `poke-box`;

        contents_body.appendChild(div);

        fetch(pokeUrl.url)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`통신 실패`);
            } else {
              return res.json();
            }
          })
          .then((data) => {
            fetch(data.species.url)
              .then((res) => {
                if (!res.ok) {
                  throw new Error(`통신 실패`);
                } else {
                  return res.json();
                }
              })
              .then((data) => {
                let span = document.querySelectorAll(`span`);
                pokeArr.push(data.names[2].name);
                for (let i = 0; i < pokeArr.length; i++) {
                  span[i].textContent = pokeArr[i];
                  span[i].style.fontSize = `30px`;
                  span[i].style.color = `orange`;
                  span[i].style.fontFamily = `DungGeunMo`;
                }
              });

            // !front_default_obj 키를 포켓몬 이름으로 할 필요가 있음
            // createGif({ front_default_obj });
          });
      });

    // dataEn.results.forEach((pokeUrl) => {
    // fetch(pokeUrl.url)
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error(`통신 실패`);
    //     } else {
    //       return res.json();
    //     }
    //   })
    //   .then((data) => {
    //     fetch(data.species.url)
    //       .then((res) => {
    //         if (!res.ok) {
    //           throw new Error(`통신 실패`);
    //         } else {
    //           return res.json();
    //         }
    //       })
    //       .then((data) => {
    //         let span = document.querySelectorAll(`span`);
    //         pokeArr.push(data.names[2].name);
    //         console.log(pokeArr);
    //         for (let i = 0; i < pokeArr.length; i++) {
    //           span[i].textContent = pokeArr[i];
    //           span[i].style.fontSize = `20px`;
    //           span[i].style.color = `orange`;
    //         }
    //       });
    // !--
    // console.log(pokeArr);
    // let span = document.querySelectorAll(`span`);
    // const pokeArr = [];
    // pokeArr.push(data.names[2].name);
    // console.log(span[1].textContent);
    // // span[1].textContent = pokeArr[1];
    // // span[2].textContent = pokeArr[2];
    // // span[3].textContent = pokeArr[3];
    // // span[4].textContent = pokeArr[4];
    // for (let i = 0; i < 20; i++) {
    //   span[i].textContent = data.names[2].name;
    //   span[i].style.fontSize = `20px`;
    //   span[i].style.color = `orange`;
    // }
    // // console.log(data.names[2].name);
    // span.forEach((element) => {
    //   // console.log(element);
    //   element.style.fontFamily = `DungGeunMo`;
    // });
    // });
  });

  // fetch(data.species.url)
  //   .then((res) => {
  //     if (!res.ok) {
  //       throw new Error(`통신 실패`);
  //     } else {
  //       return res.json();
  //     }
  //   })
  //   .then((data) => {
  //     let span = document.querySelectorAll(`span`);
  //     const pokeArr = [];

  //     pokeArr.push(data.names[2].name);

  //     console.log(span[1].textContent);
  //     // span[1].textContent = pokeArr[1];
  //     // span[2].textContent = pokeArr[2];
  //     // span[3].textContent = pokeArr[3];
  //     // span[4].textContent = pokeArr[4];

  //     for (let i = 0; i < 20; i++) {
  //       span[i].textContent = data.names[2].name;
  //       span[i].style.fontSize = `20px`;
  //       span[i].style.color = `orange`;
  //     }
  //     // console.log(data.names[2].name);
  //     span.forEach((element) => {
  //       // console.log(element);
  //       element.style.fontFamily = `DungGeunMo`;
  //     });
  //   });
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

// http
//   .createServer((req, res) => {
//     logJSONData(res);
//     // res.writeHead(200, { "Content-type": `text/plain` });
//     // res.end(`테스트`);
//   })
//   .listen(8080, () => {
//     console.log(`the server is processing on http://localhost:8080`);
//   });

window.onload = () => {
  callPokeAPI();
};

more_button.onclick = () => {
  let offset = 20;
  let limit = 20;

  // offset + 20;
  // limit + 20;

  // offset++;
  // limit + 10;
  callPokeAPI(offset, limit);
};
