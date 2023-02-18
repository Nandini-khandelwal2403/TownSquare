// code to send the item details to firestore database

async function itemDetail() {
    let item_name = document.querySelector('.form-item-name').value;
    let item_des = document.querySelector('.form-item-des').value;
    let item_exp = document.querySelector('.form-item-exp').value;
    let item_quan = document.querySelector('.form-item-quan').value;
    let item_img = document.querySelector('.form-item-img').files[0];
    console.log(item_name, item_des, item_exp, item_quan, item_img);
    const downloadImageURL = await firebase.uploadImage(item_img);
    firebase.sendItems(item_name, item_des, item_exp, item_quan, downloadImageURL);
}

async function getItemDetails() {
    const itemDetails = await firebase.getItems();
    console.log(itemDetails);

    itemDetails.forEach((item, index) => {
        console.log(item.id, index);
        const template = document.querySelector('template[data-template="item-template"]')
        let clone = template.content.cloneNode(true);
        clone.querySelector('.request').dataset.itemid = item.id;
        clone.querySelector('.item-img').src = item.image;
        clone.querySelector('.card-title').innerHTML = item.name;
        clone.querySelector('.item-quan').innerHTML = item.description;
        document.querySelector('.item-container').appendChild(clone);
    });

    const request_item = document.querySelectorAll('.request');
    request_item.forEach((item) => {
        item.addEventListener('click', (e) => {
            console.log(item.dataset.itemid);
            requestItem(item.dataset.itemid);
        });
    });

}

function requestItem(itemid) {
    firebase.addRequest(itemid);
}

window.onload = () => {
    getItemDetails();
}

function openModal() {
    document.querySelector('#exampleModal').style.display = 'block';
}

function closeModal() {
    document.querySelector('#exampleModal').style.display = 'none';
}

//form js code

$(function() {
    $('#datepicker').datepicker();
});