import { createClient } from '@supabase/supabase-js';
import {sha512} from "js-sha512";
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const PORT = process.env.PORT || 3000;
let SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;

export default async function handler(req, res) {
  const { body } = req;

  const orderId = body["order_id"];
  const grossAmount = body["gross_amount"];
  let trxSignature = sha512(orderId + grossAmount + SERVER_KEY);

  if (body["signature_key"] === trxSignature) {
    console.log('create payment');
    
    const { data, error } = await supabase.rpc('create_payment',
    {
      p_payment_id: body.transaction_id,
      p_order_id: body.order_id,
      p_payment_type: body.p_payment_type,
      p_transaction_code: body.transaction_code,
      p_notif_body: JSON.stringify(body)
    });
  
    console.log(data);
    console.log(error);
  } else {
    console.log('signature key tidak sesuai');
  }

  return res.send(`Data: ${data}, Error: ${error}`);
}
