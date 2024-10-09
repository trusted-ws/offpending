document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        data['stored_at'] = formatDateToMySQLDate(new Date());
        
        // Check if browser is online.
        if (navigator.onLine) {
            sendData(data);
        } else {
            // Store locally
            localStorage.setItem('offlineFormData', JSON.stringify(data));
            alert('You are offline. Data saved locally.');
        }
    });

    // Check for online status
    window.addEventListener('online', function() {
        const offlineData = localStorage.getItem('offlineFormData');
        if (offlineData) {
            sendData(JSON.parse(offlineData));
            localStorage.removeItem('offlineFormData');
        }
    });

    function sendData(data) {
        fetch('save.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Data sent successfully!');
            } else {
                alert('Failed to send data.');
            }
            alert(result.message);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while sending data.');
            alert(error);
        });
    }

    function formatDateToMySQLDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
});

