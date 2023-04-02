async function itemDetail() {

    let item_name = document.querySelector('.form-item-name').value;
    let item_des = document.querySelector('.form-item-des').value;
    let item_cost = document.querySelector('.form-item-cost').value;
    let item_quan = document.querySelector('.form-item-quan').value;
    let item_img = document.querySelector('.form-item-img').files[0];
    let downloadImageURL = await firebase.uploadImage(item_img);
    console.log(item_name, item_des, item_cost, item_quan, downloadImageURL);
    $('#exampleModal').modal('hide');

    firebase.sendMarketItem(item_name, item_des, item_quan, item_cost, downloadImageURL);
}

async function getMarketDetails() {
    const marketItems = await firebase.getMarketItems();
    console.log(marketItems);
    marketItems.forEach((item, index) => {
        console.log(item.id, index);

        const template = document.querySelector('template[data-template="item-template"]')
        let clone = template.content.cloneNode(true);
        clone.querySelector('.card').dataset.itemid = item.id;
        clone.querySelector('.item-name').innerHTML = item.itemName;
        clone.querySelector('.item-cost').innerHTML = "Rs. " + item.itemPrice;
        clone.querySelector('.request').dataset.itemid = item.id;

        document.querySelector('.item-container').appendChild(clone);
    });

    const request_item = document.querySelectorAll('.request');
    request_item.forEach((item) => {
        console.log(item.dataset.itemid);
        item.addEventListener('click', (e) => {
            console.log(item.dataset.itemid);
            requestItem(item.dataset.itemid);
            // remove btn-outline-primary class from the button and add btn-primary class
            // item.classList.remove('btn-outline-primary');
            // item.classList.add('btn-primary');
        });
    });

    const item_card = document.querySelectorAll('.card');
    item_card.forEach((item) => {
        item.addEventListener('click', (e) => {
            // search item details in itemDetails array
            const itemObj = marketItems.find((itemDetail) => {
                return itemDetail.id == item.dataset.itemid;
            });
            console.log(itemObj);
            // update the modal with item details
            // document.querySelector('.modal-item-img').src = itemObj.image;
            document.querySelector('.modal-item-name').innerHTML = itemObj.itemName;
            document.querySelector('.modal-item-cost').innerHTML = itemObj.itemPrice;
            document.querySelector('.modal-item-quan').innerHTML = itemObj.itemQuantity;
            document.querySelector('.modal-item-des').innerHTML = itemObj.itemDescription;
            document.querySelector('.add-name').innerHTML = itemObj.sellername;
            document.querySelector('.add-mobile').innerHTML = itemObj.sellernumber;
            document.querySelector('.add-address').innerHTML = itemObj.selleraddress;
            // if (itemObj.request_user_name) {
            //     document.querySelector('.requested-by').innerHTML = 'Requested by:';
            //     document.querySelector('.req-name').innerHTML = itemObj.request_user_name;
            //     document.querySelector('.req-mobile').innerHTML = itemObj.request_user_number;
            //     document.querySelector('.req-address').innerHTML = itemObj.request_user_address;
            // } else {
            //     document.querySelector('.requested-by').innerHTML = '';
            //     document.querySelector('.req-name').innerHTML = '';
            //     document.querySelector('.req-mobile').innerHTML = '';
            //     // document.querySelector('req-email').innerHTML = '';
            //     document.querySelector('.req-address').innerHTML = '';
            // }
            // show itemModal
            openModal('itemModal');
        });
    });
}

function openModal(modalclass) {
    console.log(document.querySelector(`#${modalclass}`));
    $(`#${modalclass}`).modal('show');
}

// request item
function requestItem(itemid) {
    console.log(itemid);
    firebase.requestMarketItem(itemid);
    $(`#itemModal`).modal('hide');
}