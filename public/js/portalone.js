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
