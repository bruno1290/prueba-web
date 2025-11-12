/*
  # Create products table for Dropped Apple store

  1. New Tables
    - `products`
      - `id` (uuid, primary key) - Unique product identifier
      - `name` (text) - Product name (e.g., "iPhone 14 Pro", "MacBook Air M2")
      - `category` (text) - Main category: "iphone" or "macbook"
      - `subcategory` (text) - iPhone model: "11", "12", "13", "14", "15", "16" or null for MacBooks
      - `price` (numeric) - Product price in CLP
      - `description` (text) - Product description
      - `storage` (text) - Storage capacity (e.g., "128GB", "256GB")
      - `color` (text) - Device color
      - `condition` (text) - Product condition (e.g., "Nuevo", "Como nuevo", "Excelente")
      - `image_url` (text) - Product image URL
      - `available` (boolean) - Availability status
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access (anyone can view products)
    - Add policy for authenticated admin insert/update/delete
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('iphone', 'macbook')),
  subcategory text CHECK (subcategory IN ('11', '12', '13', '14', '15', '16') OR subcategory IS NULL),
  price numeric NOT NULL CHECK (price > 0),
  description text DEFAULT '',
  storage text DEFAULT '',
  color text DEFAULT '',
  condition text DEFAULT 'Como nuevo',
  image_url text DEFAULT '',
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_subcategory ON products(subcategory);
CREATE INDEX IF NOT EXISTS idx_products_available ON products(available);