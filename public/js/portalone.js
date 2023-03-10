// code to send the item details to firestore database

async function itemDetail() {
    let item_name = document.querySelector('.form-item-name').value;
    let item_des = document.querySelector('.form-item-des').value;
    let item_exp = document.querySelector('.form-item-exp').value;
    let item_quan = document.querySelector('.form-item-quan').value;
    let item_img = document.querySelector('.form-item-img').files[0];
    console.log(item_name, item_des, item_exp, item_quan, item_img);
    $('#exampleModal').modal('hide');
    const downloadImageURL = await firebase.uploadImage(item_img);
    firebase.sendItems(item_name, item_des, item_exp, item_quan, downloadImageURL);
}

async function getItemDetails() {
    const itemDetails = await firebase.getItems();
    console.log(itemDetails);

    itemDetails.forEach((item, index) => {
        console.log(item.id, index);
        if(item.request_uid && item.request_uid != userDetails.uid && item.uid != userDetails.uid){
            return;
        }
        
        const template = document.querySelector('template[data-template="item-template"]')
        let clone = template.content.cloneNode(true);
        if(item.uid == userDetails.uid) {
            if(item.request_uid) {
                clone.querySelector('.req_item_text').innerHTML = 'Requested';
                clone.querySelector('.request').classList.remove('btn-outline-primary');
                clone.querySelector('.request').classList.add('btn-success');
                clone.querySelector('.request').disabled = true;
            }else{
                clone.querySelector('.req_item_text').innerHTML = 'Not Requested';
                clone.querySelector('.request').classList.remove('btn-outline-primary');
                clone.querySelector('.request').classList.add('btn-outline-success');
                clone.querySelector('.request').disabled = true;
            }
        }

        clone.querySelector('.request').dataset.itemid = item.id;
        clone.querySelector('.card').dataset.itemid = item.id;
        clone.querySelector('.item-img').src = item.image;
        clone.querySelector('.card-title').innerHTML = item.name;
        clone.querySelector('.item-addr').innerHTML = item.address;
        clone.querySelector('.item-cost').innerHTML = item.expiry;
        clone.querySelector('.item-quan').innerHTML = item.quantity;
        
        if(item.request_uid == userDetails.uid) {
            clone.querySelector('.request').classList.remove('btn-outline-primary');
            clone.querySelector('.request').classList.add('btn-primary');
            clone.querySelector('.request').disabled = true;
            clone.querySelector('.req_item_text').innerHTML = 'Requested';
        }

        document.querySelector('.item-container').appendChild(clone);
    });

    const request_item = document.querySelectorAll('.request');
    request_item.forEach((item) => {
        item.addEventListener('click', (e) => {
            console.log(item.dataset.itemid);
            requestItem(item.dataset.itemid);
            // remove btn-outline-primary class from the button and add btn-primary class
            item.classList.remove('btn-outline-primary');
            item.classList.add('btn-primary');
        });
    });

    const item_card = document.querySelectorAll('.card');
    item_card.forEach((item) => {
        item.addEventListener('click', (e) => {
            // search item details in itemDetails array
            const itemObj = itemDetails.find((itemDetail) => {
                return itemDetail.id == item.dataset.itemid;
            });
            console.log(itemObj);
        });
    });

}

function requestItem(itemid) {
    firebase.addRequest(itemid);
}

// window.onload = () => {
//     getItemDetails();
// }

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