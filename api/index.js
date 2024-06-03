import { createClient } from '@supabase/supabase-js';
import {sha512} from "js-sha512";
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const PORT = process.env.PORT || 3000;
let SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;

export default async function handler(req, res) {
  const { body } = req;
  return res.send(`Hello ${body.transaction_time}, you just parsed the request body!`);
}
