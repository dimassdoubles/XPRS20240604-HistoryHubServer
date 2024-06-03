require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk parsing JSON
app.use(bodyParser.json());

// Endpoint untuk menangani notifikasi Midtrans
app.post('/update-payment-status', (req, res) => {
  // Akses data notifikasi dari body request
  const notification = req.body;

  console.log('Received Midtrans Notification:', notification);

  // Verifikasi notifikasi (opsional, tergantung kebutuhan)
  // ...

  // Lakukan tindakan yang diperlukan berdasarkan notifikasi
  // ...

  // Kirim respon 200 OK ke Midtrans
  res.status(200).send('OK');
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
