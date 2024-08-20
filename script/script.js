document.querySelector('.msg').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Prepare form data for submission
    const formData = new FormData(this);

    // Show loading or processing state
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Send the form data using fetch
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        // Handle success or error response
        if (data.success) {
            alert('Message sent successfully!');
        } else {
            alert('Oops! Something went wrong.');
        }

        // Reset the form and submit button
        this.reset();
        submitButton.textContent = 'Send';
        submitButton.disabled = false;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');

        // Reset the submit button
        submitButton.textContent = 'Send';
        submitButton.disabled = false;
    });
});

// desktop mode notifier 

function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

function checkDesktopMode() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Example condition: screen width is more than 768px (tablet or desktop view)
    return screenWidth > 768;
}

function showDesktopNotification() {
    const notification = document.getElementById('desktop-mode-notification');
    
    if (isMobileDevice() && !checkDesktopMode()) {
        notification.style.display = 'block';
    }
}

window.onload = showDesktopNotification;
window.onresize = showDesktopNotification;

