CREATE TABLE patients (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text,
  phone text,
  order_id text UNIQUE,
  status text DEFAULT 'Processing',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);