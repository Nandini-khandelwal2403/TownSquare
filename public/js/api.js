let obj = {name: "nandini", mobile: "123456789", email: "nandini@gmail.com", address: "jindal", userid: "iamGreat"}

axios({
    method: 'post',
    url: location.protocol + '//' + location.host + '/api/user/update',
    data: obj
}).then((res) => {
    console.log("request submitted");
})

axios({
    method: 'get',
    url: location.protocol + '//' + location.host + '/api/user/data/:userid',
})
