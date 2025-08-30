export interface Product {
  id: string;
  code: string;
  name: string;
  description?: string;
  category: string;
  brand?: string;
  purchase_price_ht: number;
  sale_price_ht: number;
  vat_rate: number;
  sale_price_ttc: number;
  stock: number;
  weight?: number;
  unit?: string;
  observations?: string;
  alert_quantity?: number;
  created_at: Date;
  updated_at: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  created_at: Date;
}

export interface Client {
  id: string;
  code: string;
  name: string;
  address: string;
  postal_code: string;
  city: string;
  country: string;
  contact?: string;
  phone?: string;
  mobile?: string;
  fax?: string;
  email?: string;
  website?: string;
  rib?: string;
  balance: number;
  initial_balance: number;
  vat_intra?: string;
  siret?: string;
  ape?: string;
  rcs?: string;
  created_at: Date;
  total_purchases: number;
}

export interface InvoiceItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price_ht: number;
  vat_rate: number;
  price_ttc: number;
  total_ht: number;
  total_ttc: number;
}

export interface Invoice {
  id: string;
  client_id: string;
  client_name: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  created_at: Date;
  due_date: Date;
}

export interface Sale {
  id: string;
  product_id: string;
  product_name: string;
  client_id: string;
  client_name: string;
  quantity: number;
  price: number;
  total: number;
  date: Date;
}

export interface StockAlert {
  id: string;
  product_id: string;
  product_name: string;
  current_stock: number;
  min_stock: number;
  severity: 'low' | 'critical';
}

export interface CompanySettings {
  id: string;
  company_name: string;
  address: string;
  postal_code: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website?: string;
  siret: string;
  ape_code: string;
  vat_number: string;
<<<<<<< HEAD
  iban?: string; // Added IBAN
=======
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
  logo_url?: string;
  primary_color: string;
  secondary_color: string;
  created_at: Date;
  updated_at: Date;
}

export interface Order {
  id: string;
  client_vat_number: string;
  client_name?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'prepared' | 'completed';
  created_at: Date;
  prepared_at?: Date;
}

export interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  product_code: string;
  quantity: number;
  price_ht: number;
  vat_rate: number;
  total_ht: number;
  total_ttc: number;
}