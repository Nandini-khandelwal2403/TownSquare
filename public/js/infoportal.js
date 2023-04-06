async function getInfoDetails() {
    console.log('get info details');
}

async function sendInfoDetails() {
    console.log('send info details');
    const person_name = document.querySelector('.form-person-name').value;
    const occupation = document.querySelector('.form-occupation').value;
    const person_number = document.querySelector('.form-person-number').value;
    const person_address = document.querySelector('.form-person-address').value;
    const person_img = document.querySelector('.form-person-img').files[0];
    const person_fees = document.querySelector('.form-person-fees').value;
    console.log(person_name, occupation, person_number, person_address, person_img);
    $('#exampleModal').modal('hide');
    let downloadImageURL;
    if (imgflag) {
        downloadImageURL = "https://firebasestorage.googleapis.com/v0/b/townsquare-e2578.appspot.com/o/images%2F26d9360b-2ba6-4760-a24d-b11771040001?alt=media&token=5584d057-b1b5-4636-8438-0fbddf4c6af2";
    } else {
        downloadImageURL = await firebase.uploadImage(person_img);
    }
    firebase.sendInfo(person_name, occupation, person_number, person_address, downloadImageURL, person_fees);
}

function generateFakeData() {
    document.querySelector('.form-person-name').value = faker.name.fullName();
    document.querySelector('.form-occupation').value = faker.helpers.arrayElement(['Doctor', 'Nurse', 'Police', 'Fireman', 'Teacher', 'Engineer', 'Worker', 'other']);
    document.querySelector('.form-person-number').value = faker.phone.number('501-###-###');
    document.querySelector('.form-person-address').value = faker.address.streetAddress();
    // document.querySelector('.form-person-img').files = dataTransfer.files;
    document.querySelector('.form-person-fees').value = faker.random.numeric() * 100;
}

// setInterval(() => {
//     generateFakeData();
// }, 1000);

let imgflag = false;

document.querySelector('.form-person-img').addEventListener('change', (e) => {
    imgflag = false;
    console.log(e.target.files[0]);
});

async function getInfoDetails() {
    console.log('get info details');
    const infoDetails = await firebase.getInfo();
    console.log(infoDetails);

    infoDetails.forEach((info, index) => {
        console.log(info.id, index);

        const template = document.querySelector('template[data-template="info-template"]')
        let clone = template.content.cloneNode(true);
        clone.querySelector('.card').dataset.infoid = info.id;
        clone.querySelector('.card').dataset.occupation = info.occupation;
        clone.querySelector('.info-img').src = info.image;
        clone.querySelector('.card-title').innerHTML = info.person_name;
        clone.querySelector('.info-addr').innerHTML = info.person_address;
        clone.querySelector('.info-occ').innerHTML = info.occupation;
        clone.querySelector('.info-cost').innerHTML = info.person_fees;
        clone.querySelector('.call').addEventListener('click', () => {
            window.open(`tel:${info.person_number}`);
        });

        document.querySelector('.info-container').appendChild(clone);
    });
}

function filterOcc(occupation) {
    console.log(occupation);
    const infoCards = document.querySelectorAll('.card');
    infoCards.forEach((card) => {
        console.log(card.dataset.occupation);
        if (card.dataset.occupation === occupation) {
            card.classList.remove('d-none');
        } else {
            card.classList.add('d-none');
        }
    });
}

function filterShowAll() {
    // console.log(occupation);
    const infoCards = document.querySelectorAll('.card');
    infoCards.forEach((card) => {
        card.classList.remove('d-none');
    });
}