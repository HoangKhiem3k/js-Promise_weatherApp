const main = () => {
  const address  = document.getElementById("txtAddress").value;
  superagent
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDBunJ4GXNEC3KJlpoGJO-iB--CjPv4o-s&address=${address}`
    )
    .end((err, res) => {
      console.log(res)

      const { lat, lng } = res.body.results[0].geometry.location;
      //dùng superagent call api của darksky, lấy thời tiết của địa chỉ người dùng nhập
      superagent
        .get(
          `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/7bbecca28cbc31d7c6739e70baa64e46/${lat},${lng}`
        )
        .end((err, res) => {
          if (err) {
            console.log(err)
            return;
          }
          const { summary, temperature } = res.body.currently;
          document.getElementById("summaryText").innerHTML = summary
          document.getElementById("temperatureText").innerHTML = temperature
        });
    });
};
