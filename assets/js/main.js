
var scrollButton = document.getElementById('back-to-top');
var copyright    = document.getElementById('copyright');
/*--------------------------------------------*/
/*------------------TRIGGERS------------------*/
/*-------Trigger all required function-------*/
window.addEventListener('DOMContentLoaded',function (params) {
    setActiveLink();
    setCurrentYear();
    incrementCounter();
    setText('university', 'Super Big University');
    setText('department', 'Interdisciplinary Department');

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

//Set the name of the name <span> tag with the desired text
function setText(name, text) {
    document.getElementsByName(name).forEach(element => {
        element.innerText = text;
    });
}

//Run numbers from 0 to n
function incrementCounter() {
    var counterElements = document.getElementsByClassName('counter');
    var isMaxReached = true; // Initialize as true assuming max is reached for all elements
    
    Array.from(counterElements).forEach(element => {
        let maxValue = parseInt(element.getAttribute('data-max'));
        let currentValue = parseInt(element.textContent);
        
        if (currentValue < maxValue) {
            if (maxValue > 1000) {
                currentValue += 100; // Increment by 100 if max is greater than 1000
            }else {
                currentValue++; // Increment by 1 if max is less than or equal to 15
            }
            
            if (currentValue <= maxValue) {
                isMaxReached = false; // Set to false if any element hasn't reached max
            } else {
                currentValue = maxValue; // Set to max value if it exceeds
            }
        }

        element.textContent = currentValue;
    });

    // Stop the interval if all elements have reached their maximum value
    if (isMaxReached) {
        clearInterval(intervalID);
    }
}

// Call the incrementCounter function at intervals (e.g., every 75 milliseconds)
var intervalID = setInterval(incrementCounter, 75); // Store the interval ID

