document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar   = new FullCalendar.Calendar(calendarEl, {
        initialView:      updateVarBasedOnViewport(),
        slotDuration:     '02:00', // 2 hours
        headerToolbar:    { center: 'addEventButton' },
        customButtons:    {
          addEventButton: {
            text: 'Request Solo Tour',
            click: function() {
                var name     = prompt('Enter your name');
                var dayStr   = prompt('Enter a day 01 - 31 format');
                var monthStr = prompt('Enter a month 01 - 12 format');
                var yearStr  = prompt('Enter a year  2023 - 2024 format');
                var timeStr  = prompt('Enter a time in 08 - 14 format');

                var date     = new Date(yearStr + '-' + monthStr +'-' + dayStr + 'T' + timeStr + ':00');

                var event    = {
                    title:  name + ' Solo Tour Request',
                    start:  date,
                    allDay: false,
                    color: 'purple'
                };
                if (!isNaN(date.valueOf())) { // valid?
                    calendar.addEvent(event);
                    saveEvent(event);
                    alert('Great. see you soon...');
                } else {
                    alert('Hum, probably next time...?');
                }
            }
          }
        },
        events: [
                    {
                        title: 'Campus Group Tour',
                        start: '2023-12-19 09:00:00',
                        end:   '2023-12-19 11:00:00',
                        color: 'green'
                    },{
                        title: 'Campus Group Tour',
                        start: '2023-12-27 09:00:00',
                        end:   '2023-12-27 11:00:00',
                        color: 'green'
                    },
                    returnEvent()
                ],
    });
    
    calendar.render();
  });

function saveEvent(newData) {
    // Remove existing data from localStorage using the key
    localStorage.removeItem('event');
    // Set the new data in localStorage
    localStorage.setItem('event', JSON.stringify(newData));
}

function returnEvent() {
    // Retrieve data from localStorage
    let storedData = localStorage.getItem('event');

    // Check if data exists in localStorage
    if (storedData) {
    // Convert the retrieved string back to an object (assuming it's JSON)
    let parsedData = JSON.parse(storedData);

    // Use the retrieved data as needed
    return parsedData; // Or perform operations with parsedData
    } else {
    console.log('No data found in localStorage for the specified key.');
    }
}

function updateVarBasedOnViewport() {
    let viewportWidth = window.innerWidth;
    let view;
    // Change the variable based on viewport width
    if (viewportWidth < 500) {
    view = 'listWeek';
    } else {
    view = 'dayGridMonth';
    }
    
    // Use the updated variable as needed
    return view;
}