function openNav() {
    document.getElementById("sidebar").style.width = "100vw";
    document.getElementById("sidebar").style.display = "block";
    document.getElementById("main").style.marginLeft = "100vw";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("sidebar").style.display = "none";
    document.getElementById("main").style.marginLeft = "0";
}

// function setProfile() {
//     document.querySelector('.profile-pic').src = user.photoURL;
//     document.querySelector('.profile-name').innerHTML = userDetails.name;
// }
