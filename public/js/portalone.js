// code to send the item details to firestore database

async function itemDetail() {
    let item_name = document.querySelector('.item-name').value;
    let item_des = document.querySelector('.item-des').value;
    let item_exp = document.querySelector('.item-exp').value;
    let item_quan = document.querySelector('.item-quan').value;
    let item_img = document.querySelector('.item-img').files[0];
    console.log(item_name, item_des, item_exp, item_quan, item_img);
    const downloadImageURL = await firebase.uploadImage(item_img);
    firebase.sendItems(item_name, item_des, item_exp, item_quan, downloadImageURL);
}

async function getItemDetails() {
    const itemDetails = await firebase.getItems();
    console.log(itemDetails);

    itemDetails.forEach((item, index) => {
        console.log(item, index);

        const template = document.querySelector('template[data-template="item-template"]')
        let clone = template.content.cloneNode(true);
        clone.querySelector('.item-img').src = item.image;
        clone.querySelector('.card-title').innerHTML = item.name;
        clone.querySelector('.item-quan').innerHTML = item.description;

        document.querySelector('.item-container').appendChild(clone);
    });


}

window.onload = () => {
    getItemDetails();


}

//form js code

$(function() {
    $('#datepicker').datepicker();
});