import React from 'react';
import { X, Download, Printer } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import jsPDF from 'jspdf';

interface InvoicePDFProps {
  invoice: any;
  onClose: () => void;
}

export function InvoicePDF({ invoice, onClose }: InvoicePDFProps) {
  const { state } = useApp();
  const settings = state.settings;

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Configuration des couleurs (utilise les couleurs des paramètres ou par défaut)
    const primaryColor = settings?.primary_color ? 
      hexToRgb(settings.primary_color) : [59, 130, 246]; // Bleu par défaut
    const darkColor = [52, 73, 94]; // Gris foncé
    
    // En-tête avec informations entreprise
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, 'F');
    
    // Logo/Nom entreprise
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(settings?.company_name || 'STOCKMANAGER PRO', 20, 22);
    
    // Informations entreprise
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(settings?.address || '123 Rue du Commerce', 20, 30);
    doc.text(`${settings?.postal_code || '75001'} ${settings?.city || 'Paris'}, ${settings?.country || 'France'}`, 20, 35);
    
    // Contact
    doc.text(`Tél: ${settings?.phone || '+33 1 23 45 67 89'}`, 120, 30);
    doc.text(`Email: ${settings?.email || 'contact@stockmanager.fr'}`, 120, 35);
    
    // Reset couleur texte
    doc.setTextColor(...darkColor);
    
    // Titre FACTURE
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('FACTURE', 20, 55);
    
    // Numéro et dates
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`N° ${invoice.id}`, 150, 55);
    doc.text(`Date: ${new Date(invoice.created_at).toLocaleDateString('fr-FR')}`, 150, 62);
    doc.text(`Échéance: ${new Date(invoice.due_date).toLocaleDateString('fr-FR')}`, 150, 69);
    
    // Informations client
    doc.setFillColor(245, 245, 245);
    doc.rect(20, 75, 85, 35, 'F');
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('FACTURÉ À:', 25, 83);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const client = state.clients.find(c => c.id === invoice.client_id);
    let clientYPos = 90;
    if (client) {
      doc.text(client.name, 25, clientYPos);
      clientYPos += 4;
      if (client.address) {
        doc.text(client.address, 25, clientYPos);
        clientYPos += 4;
      }
      if (client.postal_code && client.city) {
        doc.text(`${client.postal_code} ${client.city}`, 25, clientYPos);
        clientYPos += 4;
      }
      if (client.country) {
        doc.text(client.country, 25, clientYPos);
        clientYPos += 4;
      }
      if (client.email) {
        doc.text(client.email, 25, clientYPos);
        clientYPos += 4;
      }
      if (client.phone) {
        doc.text(client.phone, 25, clientYPos);
      }
    }
    
    // Informations de paiement
    doc.setFillColor(245, 245, 245);
    doc.rect(110, 75, 80, 35, 'F');
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('INFORMATIONS:', 115, 83);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    let infoYPos = 90;
    doc.text('Mode de paiement: Virement', 115, infoYPos);
    infoYPos += 4;
    doc.text('Délai: 30 jours', 115, infoYPos);
    infoYPos += 4;
    if (settings?.vat_number) {
      doc.text(`N° TVA: ${settings.vat_number}`, 115, infoYPos);
      infoYPos += 4;
    }
    if (settings?.siret) {
      doc.text(`SIRET: ${settings.siret}`, 115, infoYPos);
    }
    
    // Tableau des articles
    let yPos = 120;
    
    // En-tête du tableau
    doc.setFillColor(...primaryColor);
    doc.rect(20, yPos, 170, 10, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('DÉSIGNATION', 25, yPos + 7);
    doc.text('QTÉ', 120, yPos + 7);
    doc.text('PRIX UNIT. HT', 135, yPos + 7);
    doc.text('TVA', 160, yPos + 7);
    doc.text('TOTAL HT', 175, yPos + 7);
    
    yPos += 10;
    doc.setTextColor(...darkColor);
    
    // Articles
    invoice.items.forEach((item: any, index: number) => {
      if (index % 2 === 0) {
        doc.setFillColor(250, 250, 250);
        doc.rect(20, yPos, 170, 8, 'F');
      }
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      
      // Gérer les noms de produits longs
      const maxWidth = 90;
      const productName = item.product_name;
      if (doc.getTextWidth(productName) > maxWidth) {
        const words = productName.split(' ');
        let line = '';
        let lineHeight = 0;
        
        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + ' ';
          if (doc.getTextWidth(testLine) > maxWidth && line !== '') {
            doc.text(line.trim(), 25, yPos + 5 + lineHeight);
            line = words[i] + ' ';
            lineHeight += 4;
          } else {
            line = testLine;
          }
        }
        doc.text(line.trim(), 25, yPos + 5 + lineHeight);
        
        // Ajuster la hauteur de ligne si nécessaire
        if (lineHeight > 0) {
          yPos += lineHeight;
        }
      } else {
        doc.text(productName, 25, yPos + 5);
      }
      
      doc.text(item.quantity.toString(), 125, yPos + 5);
      doc.text(`${item.price_ht.toFixed(2)} €`, 140, yPos + 5);
      doc.text(`${item.vat_rate}%`, 165, yPos + 5);
      doc.text(`${item.total_ht.toFixed(2)} €`, 180, yPos + 5);
      
      yPos += 8;
    });
    
    // Ligne de séparation
    yPos += 5;
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(20, yPos, 190, yPos);
    
    // Calcul des totaux par taux de TVA
    const vatDetails = invoice.items.reduce((acc: any, item: any) => {
      const rate = item.vat_rate;
      if (!acc[rate]) {
        acc[rate] = { subtotal: 0, vatAmount: 0 };
      }
      acc[rate].subtotal += item.total_ht;
      acc[rate].vatAmount += (item.total_ht * rate) / 100;
      return acc;
    }, {});
    
    // Totaux - Séparés par taux de TVA
    yPos += 10;
    const totalsX = 130;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Sous-total HT:', totalsX, yPos);
    doc.text(`${invoice.subtotal.toFixed(2)} €`, 175, yPos);
    
    yPos += 7;
    
    // Affichage séparé des TVA par taux
    Object.entries(vatDetails).forEach(([rate, details]: [string, any]) => {
      doc.text(`TVA ${rate}%:`, totalsX, yPos);
      doc.text(`${details.vatAmount.toFixed(2)} €`, 175, yPos);
      yPos += 6;
    });
    
    // Total TVA
    doc.text('Total TVA:', totalsX, yPos);
    doc.text(`${invoice.tax.toFixed(2)} €`, 175, yPos);
    yPos += 8;
    
    // Ligne de séparation pour le total final
    doc.setDrawColor(...primaryColor);
    doc.line(totalsX, yPos - 2, 190, yPos - 2);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('TOTAL TTC:', totalsX, yPos + 3);
    doc.text(`${invoice.total.toFixed(2)} €`, 175, yPos + 3);
    
    // Pied de page - Position plus basse
    const footerY = Math.max(yPos + 20, 270);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Conditions de paiement: Paiement à 30 jours. Pénalités de retard: 3 fois le taux légal.', 20, footerY);
    if (settings?.vat_number) {
      doc.text(`N° TVA: ${settings.vat_number}`, 20, footerY + 4);
    }
    if (settings?.ape_code) {
      doc.text(`Code APE: ${settings.ape_code}`, 20, footerY + 8);
    }
    
    doc.save(`facture-${invoice.id}.pdf`);
  };

  // Fonction utilitaire pour convertir hex en RGB
  const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [59, 130, 246];
  };

  const client = state.clients.find(c => c.id === invoice.client_id);

  // Calcul des totaux par taux de TVA pour l'aperçu
  const vatDetails = invoice.items.reduce((acc: any, item: any) => {
    const rate = item.vat_rate;
    if (!acc[rate]) {
      acc[rate] = { subtotal: 0, vatAmount: 0 };
    }
    acc[rate].subtotal += item.total_ht;
    acc[rate].vatAmount += (item.total_ht * rate) / 100;
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Aperçu de la Facture {invoice.id}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
            >
              <Printer size={16} />
              <span>Imprimer</span>
            </button>
            <button
              onClick={generatePDF}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Download size={16} />
              <span>Télécharger PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="max-w-3xl mx-auto bg-white">
            {/* En-tête moderne - Plus compact */}
            <div 
              className="text-white p-4 rounded-t-lg"
              style={{ backgroundColor: settings?.primary_color || '#3B82F6' }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-xl font-bold">{settings?.company_name || 'STOCKMANAGER PRO'}</h1>
                  <p className="text-blue-100 mt-1 text-sm">Gestion de Stock Professionnelle</p>
                  <div className="mt-2 text-xs">
                    <p>{settings?.address || '123 Rue du Commerce'}</p>
                    <p>{settings?.postal_code || '75001'} {settings?.city || 'Paris'}, {settings?.country || 'France'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-blue-100">
                    <p>Tél: {settings?.phone || '+33 1 23 45 67 89'}</p>
                    <p>Email: {settings?.email || 'contact@stockmanager.fr'}</p>
                    {settings?.website && <p>Web: {settings.website}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Informations facture - Plus compact */}
            <div className="bg-gray-50 p-4 border-x border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">FACTURE</h2>
                  <p className="text-gray-600 mt-1">N° {invoice.id}</p>
                </div>
                <div className="text-right text-sm">
                  <p><span className="font-medium">Date:</span> {new Date(invoice.created_at).toLocaleDateString('fr-FR')}</p>
                  <p><span className="font-medium">Échéance:</span> {new Date(invoice.due_date).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
            </div>

            {/* Informations client - Plus compact */}
            <div className="p-6 border-x border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg min-h-[120px]">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">Facturé à:</h3>
                  {client && (
                    <div className="text-gray-700 text-sm">
                      <p className="font-medium">{client.name}</p>
                      {client.code && <p className="text-xs">Code: {client.code}</p>}
                      {client.address && <p className="text-xs">{client.address}</p>}
                      {client.postal_code && client.city && (
                        <p className="text-xs">{client.postal_code} {client.city}</p>
                      )}
                      {client.country && <p className="text-xs">{client.country}</p>}
                      {client.email && <p className="text-xs">Email: {client.email}</p>}
                      {client.phone && <p className="text-xs">Tél: {client.phone}</p>}
                      {client.vat_intra && <p className="text-xs">N° TVA: {client.vat_intra}</p>}
                    </div>
                  )}
                </div>
                <div className="bg-blue-50 p-4 rounded-lg min-h-[120px]">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">Informations:</h3>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>Mode de paiement: Virement</p>
                    <p>Délai: 30 jours</p>
                    {settings?.vat_number && <p>N° TVA: {settings.vat_number}</p>}
                    {settings?.siret && <p>SIRET: {settings.siret}</p>}
                    {settings?.ape_code && <p>Code APE: {settings.ape_code}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Tableau des articles - Plus compact */}
            <div className="border-x border-gray-200 overflow-x-auto">
              <table className="w-full">
                <thead style={{ backgroundColor: settings?.primary_color || '#3B82F6' }} className="text-white">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-sm min-w-[200px]">Désignation</th>
                    <th className="text-center py-3 px-3 font-medium text-sm w-16">Qté</th>
                    <th className="text-right py-3 px-3 font-medium text-sm w-24">Prix unit. HT</th>
                    <th className="text-center py-3 px-3 font-medium text-sm w-16">TVA</th>
                    <th className="text-right py-3 px-3 font-medium text-sm w-24">Total HT</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item: any, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-3 px-4 text-gray-900 text-sm break-words">{item.product_name}</td>
                      <td className="py-3 px-3 text-center text-gray-700 text-sm">{item.quantity}</td>
                      <td className="py-3 px-3 text-right text-gray-700 text-sm">{item.price_ht.toFixed(2)} €</td>
                      <td className="py-3 px-3 text-center text-gray-700 text-sm">{item.vat_rate}%</td>
                      <td className="py-3 px-3 text-right font-medium text-gray-900 text-sm">{item.total_ht.toFixed(2)} €</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totaux avec séparation par taux de TVA */}
            <div className="border-x border-gray-200 p-6">
              <div className="flex justify-end">
                <div className="w-96">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 text-gray-700 border-b border-gray-100">
                      <span>Sous-total HT:</span>
                      <span className="font-medium">{invoice.subtotal.toFixed(2)} €</span>
                    </div>
                    
                    {/* Détail des TVA par taux */}
                    {Object.entries(vatDetails).map(([rate, details]: [string, any]) => (
                      <div key={rate} className="border-l-3 border-blue-500 pl-3 py-1 bg-blue-50">
                        <div className="flex justify-between text-sm text-gray-700">
                          <span>TVA {rate}%:</span>
                          <span className="font-medium">{details.vatAmount.toFixed(2)} €</span>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-between py-2 text-gray-700 border-t border-gray-200">
                      <span>Total TVA:</span>
                      <span className="font-medium">{invoice.tax.toFixed(2)} €</span>
                    </div>
                    
                    <div 
                      className="border-t-2 pt-3 mt-3"
                      style={{ borderColor: settings?.primary_color || '#3B82F6' }}
                    >
                      <div className="flex justify-between py-2 font-bold text-xl text-gray-900">
                        <span>TOTAL TTC:</span>
                        <span className="text-blue-600">{invoice.total.toFixed(2)} €</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pied de page */}
            <div className="bg-gray-100 p-6 rounded-b-lg border-x border-b border-gray-200 text-xs text-gray-600">
              <div className="space-y-2">
                <p><strong>Conditions de paiement:</strong> Paiement à 30 jours. Pénalités de retard: 3 fois le taux légal.</p>
                {settings?.vat_number && <p><strong>N° TVA:</strong> {settings.vat_number}</p>}
                {settings?.ape_code && (
                  <p><strong>Code APE:</strong> {settings.ape_code}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}