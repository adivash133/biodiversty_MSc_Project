const axios = require("axios");
const fs = require("fs");

const image = fs.readFileSync("YOUR_IMAGE.jpg", {
    encoding: "base64"
});

axios({
    method: "POST",
    url: "https://detect.roboflow.com/bird-v2/2",
    params: {
        api_key: "rf_Bv2fE9kQfcN3T7Iw5Gp3i3KY6Vf1"
    },
    data: image,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
.then(function(response) {
    console.log(response.data);
})
.catch(function(error) {
    console.log(error.message);
});


