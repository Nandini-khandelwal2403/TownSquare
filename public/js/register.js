// let obj = {name: "nandini", mobile: "123456789", email: "nandini@gmail.com", address: "jindal", userid: "iamGreat"}

// const { sendEmailVerification } = require("firebase/auth");

// axios({
//     method: 'post',
//     url: location.protocol + '//' + location.host + '/api/user/update',
//     data: obj
// }).then((res) => {
//     console.log("request submitted");
// })

// axios({
//     method: 'get',
//     url: location.protocol + '//' + location.host + '/api/user/data/:userid',
// })

function register() {
    let name = document.querySelector('.name').value;
    let number = document.querySelector('.number').value;
    let address = document.querySelector('.address').value;
    let genderOp = document.getElementsByName('inlineRadioOptions');  
    let genderValue;
    for(i = 0; i < genderOp.length; i++) {
        if(genderOp[i].checked){
            genderValue = genderOp[i].value;
        }
    }
    let pincode = document.querySelector('.pincode').value;
    console.log(name, number, address, genderValue, pincode)
    firebase.send(name, number, address, genderValue, pincode);
}