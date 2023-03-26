function foodDetails() {
    let orgName = document.getElementById("orgName").value;
    let quantity = document.getElementById("quantity").value;
    let time = document.getElementById("time").value;
    let address = document.getElementById("address").value;
    let type = document.getElementById("switch3").checked;
    if (type) type = "veg";
    else type = "non-veg";
    console.log(orgName, quantity, time, address, type);
    firebase.sendFoodInfo(orgName, quantity, time, address, type);
}

async function getFoodDetails() {
    const foodDetails = await firebase.getFoodInfo();
    console.log(foodDetails);

    foodDetails.forEach((food, index) => {
        console.log(food.id, index);

        const template = document.querySelector('template[data-template="food-template"]')
        let clone = template.content.cloneNode(true);
        clone.querySelector('.card').dataset.foodid = food.id;
        clone.querySelector('.card-title').innerHTML = food.orgName;
        clone.querySelector('.food-quantity').innerHTML = food.quantity;
        clone.querySelector('.food-time').innerHTML = food.time;
        clone.querySelector('.food-address').innerHTML = food.address;
        // clone.querySelector('.food-type').innerHTML = food.type;

        document.querySelector('.food-container').appendChild(clone);
        console.log("#2409");
    });
}