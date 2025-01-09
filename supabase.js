import { createClient } from '@supabase/supabase-js';

// Reemplaza con la URL y la clave de tu proyecto Supabase
const supabaseUrl = 'https://luxhpbqgvoyhjczxnruy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1eGhwYnFndm95aGpjenhucnV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyODc0MTYsImV4cCI6MjA1MTg2MzQxNn0.sJRV2cxXQxK-aRZEL4fDslM-Du09V1S9BfsCXd9sxMU';
export const supabase = createClient(supabaseUrl, supabaseKey);