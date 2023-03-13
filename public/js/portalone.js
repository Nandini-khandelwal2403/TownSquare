// code to send the item details to firestore database

async function itemDetail() {

    let item_name = document.querySelector('.form-item-name').value;
    let item_des = document.querySelector('.form-item-des').value;
    let item_exp = document.querySelector('.form-item-exp').value;
    let item_quan = document.querySelector('.form-item-quan').value;
    let item_img = document.querySelector('.form-item-img').files[0];
    console.log(item_name, item_des, item_exp, item_quan, item_img);
    $('#exampleModal').modal('hide');
    let downloadImageURL;
    if (imgflag) {
        downloadImageURL = "https://firebasestorage.googleapis.com/v0/b/townsquare-e2578.appspot.com/o/images%2F0aaebdcb-57c9-452a-9c75-dd77b5c46f21?alt=media&token=307e9bfe-ee41-4ecb-be84-1235fb5a11a8";
    } else {
        downloadImageURL = await firebase.uploadImage(item_img);
    }
    // const downloadImageURL = await firebase.uploadImage(item_img);
    firebase.sendItems(item_name, item_des, item_exp, item_quan, downloadImageURL);
}

let imgflag = true;

document.querySelector('.form-item-img').addEventListener('change', (e) => {
    imgflag = false;
    console.log(e.target.files[0]);
});

function generateFakeData() {
    document.querySelector('.form-item-name').value = faker.commerce.productName();
    document.querySelector('.form-item-des').value = faker.commerce.productDescription();
    document.querySelector('.form-item-exp').value = formatDate(faker.date.future());
    document.querySelector('.form-item-quan').value = faker.random.numeric() * 100;

    
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('/');
}

async function getItemDetails() {
    console.log('get item details');
    const itemDetails = await firebase.getItems();
    console.log(itemDetails);

    itemDetails.forEach((item, index) => {
        console.log(item.id, index);
        if (item.request_uid && item.request_uid != userDetails.uid && item.uid != userDetails.uid) {
            return;
        }

        const template = document.querySelector('template[data-template="item-template"]')
        let clone = template.content.cloneNode(true);
        if (item.uid == userDetails.uid) {
            if (item.request_uid) {
                clone.querySelector('.req_item_text').innerHTML = 'Requested';
                clone.querySelector('.request').classList.remove('btn-outline-primary');
                clone.querySelector('.request').classList.add('btn-success');
                clone.querySelector('.request').disabled = true;
            } else {
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

        if (item.request_uid == userDetails.uid) {
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
            // update the modal with item details
            document.querySelector('.modal-item-img').src = itemObj.image;
            document.querySelector('.modal-item-name').innerHTML = itemObj.name;
            document.querySelector('.modal-item-quan').innerHTML = itemObj.quantity;
            document.querySelector('.modal-item-des').innerHTML = itemObj.description;
            document.querySelector('.modal-item-exp').innerHTML = itemObj.expiry;
            document.querySelector('.add-name').innerHTML = itemObj.username;
            document.querySelector('.add-mobile').innerHTML = itemObj.number;
            // document.querySelector('.add-email').innerHTML = itemObj.email;
            document.querySelector('.add-address').innerHTML = itemObj.address;
            if(itemObj.request_user_name){
                document.querySelector('.req-name').innerHTML = itemObj.request_user_name;
                document.querySelector('.req-mobile').innerHTML = itemObj.request_user_number;
                // document.querySelector('req-email').innerHTML = itemObj.request_user_email;
                document.querySelector('.req-address').innerHTML = itemObj.request_user_address;
            }
            // show itemModal
            openModal('itemModal');
        });
    });

}

function requestItem(itemid) {
    firebase.addRequest(itemid);
}

function openModal(modalclass) {
    console.log(document.querySelector(`#${modalclass}`));
    $(`#${modalclass}`).modal('show');
}

function closeModal(modalclass) {
    $(`#${modalclass}`).modal('hide');
}

$(function() {
    $('#datepicker').datepicker();
});