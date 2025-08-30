import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sale } from '../../types';

interface RecentSalesChartProps {
  sales: Sale[];
}

export function RecentSalesChart({ sales }: RecentSalesChartProps) {
  const chartData = sales.map((sale, index) => ({
    name: `Vente ${index + 1}`,
    montant: sale.total,
<<<<<<< HEAD
    produit: sale.productName
=======
    produit: sale.productName,
    client: sale.client_name,
    date: new Date(sale.date).toLocaleDateString(),
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
  }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value, name, props) => [
<<<<<<< HEAD
              `€${value}`, 
              'Montant',
              props.payload.produit
=======
              `€${value}`,
              'Montant',
              props.payload.produit,
              `Client: ${props.payload.client}`,
              `Date: ${props.payload.date}`,
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
            ]}
          />
          <Bar dataKey="montant" fill="#3B82F6" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}