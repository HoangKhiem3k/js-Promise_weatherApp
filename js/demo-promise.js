const sum = 10;

const promiseA = new Promise((resolve, reject) => {
  //thực thi tác vụ bất đồng bộ
  setTimeout(() => {
    if (sum < 10) {
      reject("promise fail");
    }
    resolve("promise success");
  }, 2000);
});

promiseA
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
