require('dotenv').config({path: 'path/to/.env'}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Environment variables loaded successfully.');
        // Now you can make the API call here
    }
});

