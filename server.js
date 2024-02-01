
// import express from 'express';
// import fetch from 'node-fetch';

// const app = express();

// // Use the PORT provided by Heroku or default to 3000 if running locally
// const port = process.env.PORT || 3000;

// app.use(express.json());
// app.use(express.static('public')); // Serve static files from 'public' directory

// app.post('/getBatteryVoltage', async (req, res) => {
//     const serialNumber = req.body.serialNumber;
//     try {
//         const response = await fetch(`http://164.92.185.10/api/battery_voltage/${serialNumber}/`, {
//             method: 'GET',
//             headers: {
//                 'Authorization': 'Token 8e3120cd6f63acb25abef3a4ab421626adbd95e6'
//             }
//         });
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         res.send(data);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).send('Error fetching data');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });


// import express from 'express';
// import fetch from 'node-fetch';

// const app = express();


// const port = process.env.PORT || 3000;

// app.use(express.json());
// app.use(express.static('public')); 

// app.post('/getEnergyConsumed', async (req, res) => {
//     const Registration = req.body.registration
//     try {
//         const response = await fetch(`http://164.92.185.10/api/ev_consumption/${Registration}/`, {
//             method: 'GET',
//             headers: {
//                 'Authorization': 'Token 8e3120cd6f63acb25abef3a4ab421626adbd95e6'
//             }
//         });
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         res.send(data);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).send('Error fetching data');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' directory

app.post('/getEnergyConsumed', async (req, res) => {
    const Registration = encodeURIComponent(req.body.registration);

    try {
        const response = await fetch(`http://164.92.185.10/api/ev_consumption/${Registration}/`, {
            method: 'GET',
            headers: {
                'Authorization': 'Token 8e3120cd6f63acb25abef3a4ab421626adbd95e6'
            }
        });

        if (!response.ok) {
            const responseBody = await response.text();
            console.error(`API response not ok. Status: ${response.status}, Body: ${responseBody}`);
            return res.status(response.status).send(`Error fetching data: ${responseBody}`);
        }

        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(`Server error: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
