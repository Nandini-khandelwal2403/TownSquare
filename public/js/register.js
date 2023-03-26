function register() {
    let name = document.querySelector('.name').value;
    let number = document.querySelector('.number').value;
    let address = document.querySelector('.address').value;
    let genderOp = document.getElementsByName('inlineRadioOptions');
    let genderValue;
    for (i = 0; i < genderOp.length; i++) {
        if (genderOp[i].checked) {
            genderValue = genderOp[i].value;
        }
    }
    let pincode = document.querySelector('.pincode').value;
    console.log(name, number, address, genderValue, pincode)
    firebase.send(name, number, address, genderValue, pincode);
}

async function getFoodDetails() {
    const foodDetails = await firebase.getFoodDetails();
    console.log(foodDetails);
}