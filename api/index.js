import { createClient } from '@supabase/supabase-js';
import {sha512} from "js-sha512";
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
let SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;

app.post('/pay', async (req, res) => {

  const body = req.body;
  const orderId = body["order_id"];
  const grossAmount = body["gross_amount"];
  let trxSignature = sha512(orderId + grossAmount + SERVER_KEY);

  // if (body["signature_key"] === trxSignature) {
    const { data, error } = await supabase.rpc('create_payment', {p_notif_body: JSON.stringify(body)});
    console.log(data);
    console.log(error);
  // }

  res.status(200).send(data);
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
