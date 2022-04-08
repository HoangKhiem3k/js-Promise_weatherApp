const main = () => {
  const address = document.getElementById("txtAddress").value;
  getGeoCode(address)
    .then((res) => {
      console.log(res);
      return getWeather(res.lat, res.lng);
      // dung return de lam .then phia duoi 
    })
    .then((weatherRes) => {
    // then nay cua getWeather
      console.log(weatherRes);
    })
    .catch((err) => {
      console.log(err);
    });

  //promise chain
};

const getGeoCode = (address) => {
  return new Promise((resolve, reject) => {
    //dùng superagent call api của google, lấy tọa độ của địa chỉ người dùng nhập
    superagent
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDBunJ4GXNEC3KJlpoGJO-iB--CjPv4o-s&address=${address}`
      )
      .end((err, res) => {
        if (err) {
          reject(err);
        }

        const { lat, lng } = res.body.results[0].geometry.location;
        const data = { lat, lng };
        resolve(data);
      });
  });
};

const getWeather = (lat, lng) => {
  return new Promise((resolve, reject) => {
    //dùng superagent call api của darksky, lấy thời tiết của địa chỉ người dùng nhập
    superagent
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/7bbecca28cbc31d7c6739e70baa64e46/${lat},${lng}`
      )
      .end((err, res) => {
        if (err) {
          reject(err);
        }
        const { summary, temperature } = res.body.currently;
        const data = { summary, temperature };
        resolve(data);
      });
  });
};

//promise => pending, resolve, reject
