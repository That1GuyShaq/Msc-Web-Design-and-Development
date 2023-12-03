
var scrollButton = document.getElementById('back-to-top');
var copyright    = document.getElementById('copyright');

/*--------------------------------------------*/
/*------------------TRIGGERS------------------*/
/*-------Trigger all required function-------*/
window.addEventListener('DOMContentLoaded',function (params) {
    setActiveLink();
    setCurrentYear();
});
window.onscroll = function () {
	scrollFunction();
};



/*-------------------------------------------*/
/*-----------------FUNCTIONS-----------------*/
/*--------All functions for triggers--------*/

// Set nav link as active when page loads
function setActiveLink() {
    // Get the current URL
    var currentURL = window.location.href;

    // Select all the anchor elements in your navigation menu
    var links = document.querySelectorAll('ul.navbar-nav a');

    // Loop through the links and compare their href attribute with the current URL
    Array.from(links).forEach(function (link) {
        // Check if the link's href matches the current URL
        if (link.href === currentURL) {
            // If the link is inside a dropdown, mark the dropdown's parent as active
            var parentDropdown = link.closest('.dropdown');
            if (parentDropdown) {
                // Add classes to the link to mark it as active
                link.classList.add('active-dropdown');
                parentDropdown.querySelector('.nav-link').classList.add('active');
            } else {
                // Add classes to the link to mark it as active
                link.classList.add('active');
            }
        }
    });
}

// Show and hide scroll button
function scrollFunction() {
	if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
		scrollButton.style.display = 'block';
	} else {
		scrollButton.style.display = 'none';
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

function setCurrentYear() {
    let date = new Date();
    let year = date.getFullYear();
    copyright.querySelector('span').innerText = year;
}