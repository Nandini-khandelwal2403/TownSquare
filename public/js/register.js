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
    let firstName = document.querySelector('.first-name').value;
    let lastName = document.querySelector('.last-name').value;
    // let mobile = document.getElementById('mobile').value;
    // let email = document.getElementById('email').value;
    let address = document.querySelector('.address').value;
    let genderOp = document.getElementsByName('inlineRadioOptions');  
    let genderValue;
    for(i = 0; i < genderOp.length; i++) {
        if(genderOp[i].checked){
            genderValue = genderOp[i].value;
        }
    }
    let pincode = document.querySelector('.pincode').value;
    // let password = document.getElementById('password').value;
    console.log(firstName, lastName, address, genderValue, pincode)
    // send(firstName, lastName, address, genderValue, pincode);
}