/**
 * Returns a random number between min (inclusive) and max (exclusive)
 * This number will be used to select the page for the API search term,
 * this will give new photos every time the page reloads
 */
function getNumberBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var API_KEY     = 'bpkCXOD2iPqs6yR1xYExJ7jiHAQigHBBFD3QVRr0WfUyux8qYbT3C6m3'; // Pexels API key
var searchTerms = ['Graduation','Campus','Students', 'Happy', 'Class of 2023']; // Search terms
var searchTerm  = 'University ' + searchTerms[getNumberBetween(1, 4)];
var pageNumber  = getNumberBetween(1, 9);
var url         = `https://api.pexels.com/v1/search?query=${searchTerm}&page=${pageNumber}&per_page=9`; // Pexels API endpoint

// API request
axios.get(url, {
    headers: {
        Authorization: API_KEY
    }
})
.then(response => {
    // Handle the response data here
    var photos = response.data.photos;
    
    // Iterate through the fetched photos and display them
    photos.forEach(photo => {
        
        let alternativeText = photo.alt+`<br> Credited to: <a href="`+photo.url+`" target="_blank">Photo</a> was taken by <a href="`+photo.photographer_url+`" target="_blank">`+photo.photographer+`</a> on Pexels.`;
        // Create Div element
        var image = document.createElement('div');
        image.classList.add('col-auto'); // Add class to auto fit columns in row

        // Create a trigger for a modal that will open the image when clicked
        var trigger = document.createElement('a');

        //Set Modal Trigger attributes
        trigger.href="javascript:Void(0);";
        trigger.setAttribute('data-bs-alt',alternativeText);
        trigger.setAttribute('data-bs-toggle','modal');
        trigger.setAttribute('data-bs-footer',photo.url);
        trigger.setAttribute('data-bs-img',photo.src.large);
        trigger.setAttribute('data-bs-target','#viewPhotoModal');

        var img = document.createElement('img');
        img.src = photo.src.medium;
        img.alt = alternativeText;
        img.classList.add('img-thumbnail');

        trigger.appendChild(img);
        image.appendChild(trigger);
        graduationGallery.appendChild(image);
    });
}).catch(error => {
    console.error('Error fetching data:', error);
});

var modal = document.getElementById('viewPhotoModal')
if (modal) {
    modal.addEventListener('show.bs.modal', event => {
        // Button that triggered the modal
        var button  = event.relatedTarget;

        var alt     = button.getAttribute('data-bs-alt');
        var source  = button.getAttribute('data-bs-img');

        var body    = modal.querySelector('.modal-body');
        var caption = modal.querySelector('.text-muted');

        var img     = document.createElement('img');

        img.classList.add('img-fluid');

        img.alt     = alt;
        img.src     = source;
        caption.innerHTML = alt;

        body.appendChild(img);
    })

    modal.addEventListener('hidden.bs.modal', event => {
        modal.querySelector('.img-fluid').remove();
    })
}