'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FileText,
  Plus,
  Trash2,
  Download,
  Send,
  Printer,
  Calculator,
  LayoutDashboard,
  Search,
  LogOut,
  User as UserIcon,
  Database,
  CheckCircle,
} from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { AuthService, type UserRecord } from '@/lib/authService';

export interface QuotationItem {
  id: string;
  description: string;
  category: string;
  quantity: number;
  unitPrice: number;
}

const INITIAL_ITEMS: QuotationItem[] = [
  {
    id: 'item-1',
    description: 'Custom Monochrome Italian Bouclé L-Shape Sofa',
    category: 'Furniture',
    quantity: 1,
    unitPrice: 2850,
  },
  {
    id: 'item-2',
    description: 'Minimalist Black Matte Marble Coffee Table',
    category: 'Furniture',
    quantity: 1,
    unitPrice: 920,
  },
  {
    id: 'item-3',
    description: 'Architectural Linear LED Pendant Light (Black Finish)',
    category: 'Lighting',
    quantity: 2,
    unitPrice: 480,
  },
  {
    id: 'item-4',
    description: 'Acoustic Sound-Dampening Wall Panels (Nordic Oak)',
    category: 'Wall Decor',
    quantity: 12,
    unitPrice: 115,
  },
  {
    id: 'item-5',
    description: 'Handwoven Natural Wool Area Rug (8ft × 10ft)',
    category: 'Flooring',
    quantity: 1,
    unitPrice: 1450,
  },
];

export default function QuotationPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [clientName, setClientName] = useState('Priyank Panchal');
  const [projectTitle, setProjectTitle] = useState('Executive Penthouse Living Room Design');
  const [quotationNo, setQuotationNo] = useState('QT-2026-0891');
  const [items, setItems] = useState<QuotationItem[]>(INITIAL_ITEMS);
  const [discountPercent, setDiscountPercent] = useState<number>(5);
  const [taxPercent, setTaxPercent] = useState<number>(18);
  const [sentNotice, setSentNotice] = useState('');

  useEffect(() => {
    AuthService.checkAuth()
      .then(authenticatedUser => {
        if (authenticatedUser) {
          setUser(authenticatedUser);
        } else {
          router.replace('/login');
        }
      })
      .catch(() => {
        router.replace('/login');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [router]);

  const handleSignOut = async () => {
    await AuthService.logout();
    router.push('/login');
  };

  const handleAddItem = () => {
    const newItem: QuotationItem = {
      id: `item-${Date.now()}`,
      description: 'New Interior Decor Item',
      category: 'Decor',
      quantity: 1,
      unitPrice: 250,
    };
    setItems(prev => [...prev, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const handleUpdateItem = (id: string, field: keyof QuotationItem, value: any) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = (taxableAmount * taxPercent) / 100;
  const grandTotal = taxableAmount + taxAmount;

  const handleSendQuotation = () => {
    setSentNotice('Quotation QT-2026-0891 has been sent to client email!');
    setTimeout(() => setSentNotice(''), 3000);
  };

  if (isLoading || !user) {
    return (
      <div className="auth-grid-bg min-h-screen flex items-center justify-center">
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 flex flex-col items-center gap-4">
          <Logo size={36} showWordmark={true} />
          <div className="w-8 h-8 border-3 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
          <span className="text-xs font-semibold text-gray-500">Verifying session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Header */}
      <header className="h-16 border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 bg-white z-40">
        <div className="flex items-center gap-4">
          <Logo size={28} showWordmark={true} />
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-6 relative items-center">
          <Search size={16} className="absolute left-3 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search quotations, clients, items..."
            className="w-full h-9 pl-9 pr-12 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-gray-900 transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 border border-gray-200 rounded-full bg-gray-50">
            <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs">
              <UserIcon size={13} />
            </div>
            <span className="text-xs font-semibold text-gray-900">@{user.user_id}</span>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-900 transition-all cursor-pointer"
            title="Sign Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-60 border-r border-gray-200 p-4 hidden md:flex flex-col justify-between flex-shrink-0">
          <div className="space-y-4">
            <span className="text-[11px] font-bold text-gray-400 tracking-wider px-3 block">
              WORKSPACE
            </span>
            <nav className="space-y-1">
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="w-full h-10 px-3 rounded-lg text-xs font-semibold flex items-center gap-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all cursor-pointer"
              >
                <LayoutDashboard size={17} />
                <span>Dashboard</span>
              </button>
              <button
                type="button"
                onClick={() => router.push('/quotation')}
                className="w-full h-10 px-3 rounded-lg text-xs font-bold flex items-center gap-2.5 bg-gray-100 text-gray-900 border border-gray-200 transition-all cursor-pointer"
              >
                <FileText size={17} />
                <span>Quotation</span>
              </button>
            </nav>
          </div>

          {/* Database Footer Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center gap-3">
            <div className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-900">
              <Database size={15} />
            </div>
            <div className="flex-1 flex flex-col">
              <span className="text-xs font-semibold text-gray-900">MongoDB Atlas</span>
              <span className="text-[10px] text-gray-500">Connected Live</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
        </aside>

        {/* Quotation Workspace Content */}
        <main className="flex-1 p-6 md:p-8 max-w-5xl overflow-y-auto">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-gray-900 bg-gray-50 text-gray-900">
                  {quotationNo}
                </span>
                <span className="text-xs text-gray-400 font-medium">• Interior Design Estimate</span>
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight mt-1">
                Project Quotation Builder
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSendQuotation}
                className="h-9 px-3.5 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Send size={15} />
                <span>Send Quotation</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="h-9 px-3.5 border border-gray-200 hover:bg-gray-50 text-gray-900 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Printer size={15} />
                <span>Print PDF</span>
              </button>
            </div>
          </div>

          {sentNotice && (
            <div className="w-full bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-xs font-semibold flex items-center gap-2 mb-6">
              <CheckCircle size={16} />
              <span>{sentNotice}</span>
            </div>
          )}

          {/* Quotation Document Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8 space-y-6"
          >
            {/* Metadata Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-200">
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    className="w-full h-9 px-3 text-sm font-semibold border border-gray-200 rounded-lg outline-none focus:border-gray-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={projectTitle}
                    onChange={e => setProjectTitle(e.target.value)}
                    className="w-full h-9 px-3 text-sm font-semibold border border-gray-200 rounded-lg outline-none focus:border-gray-900"
                  />
                </div>
              </div>

              <div className="space-y-3 md:text-right">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Quotation Number
                  </span>
                  <input
                    type="text"
                    value={quotationNo}
                    onChange={e => setQuotationNo(e.target.value)}
                    className="w-full md:w-48 h-9 px-3 text-sm font-mono font-bold border border-gray-200 rounded-lg outline-none focus:border-gray-900 md:ml-auto block"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    Issue Date
                  </span>
                  <span className="text-xs font-semibold text-gray-700">Aug 09, 2026</span>
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-bold text-gray-900">Line Items & Furniture Specifications</h4>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="h-8 px-3 bg-gray-50 border border-gray-200 hover:bg-gray-900 hover:text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-all cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add Line Item</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-2.5 px-3">Item Description</th>
                      <th className="py-2.5 px-3 w-32">Category</th>
                      <th className="py-2.5 px-3 w-20 text-center">Qty</th>
                      <th className="py-2.5 px-3 w-28 text-right">Unit Price ($)</th>
                      <th className="py-2.5 px-3 w-28 text-right">Total ($)</th>
                      <th className="py-2.5 px-3 w-12 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {items.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="py-3 px-3">
                          <input
                            type="text"
                            value={item.description}
                            onChange={e => handleUpdateItem(item.id, 'description', e.target.value)}
                            className="w-full h-8 px-2 text-xs font-medium border border-gray-200 rounded outline-none focus:border-gray-900"
                          />
                        </td>
                        <td className="py-3 px-3">
                          <input
                            type="text"
                            value={item.category}
                            onChange={e => handleUpdateItem(item.id, 'category', e.target.value)}
                            className="w-full h-8 px-2 text-xs border border-gray-200 rounded outline-none focus:border-gray-900"
                          />
                        </td>
                        <td className="py-3 px-3 text-center">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={e => handleUpdateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                            className="w-14 h-8 px-1 text-center text-xs font-bold border border-gray-200 rounded outline-none focus:border-gray-900"
                          />
                        </td>
                        <td className="py-3 px-3 text-right">
                          <input
                            type="number"
                            min="0"
                            value={item.unitPrice}
                            onChange={e => handleUpdateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                            className="w-24 h-8 px-2 text-right text-xs font-bold border border-gray-200 rounded outline-none focus:border-gray-900"
                          />
                        </td>
                        <td className="py-3 px-3 text-right font-bold text-gray-900">
                          ${(item.quantity * item.unitPrice).toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                            title="Remove item"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Calculations & Summary */}
            <div className="flex flex-col md:flex-row justify-between items-start pt-6 border-t border-gray-200 gap-6">
              <div className="space-y-2 max-w-xs">
                <span className="text-xs font-bold text-gray-900 block">Terms & Conditions</span>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  This quotation is valid for 30 days from issuance date. 50% deposit required upon confirmation.
                </p>
              </div>

              <div className="w-full md:w-72 bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center text-xs text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">${subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <span>Discount (%)</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={discountPercent}
                      onChange={e => setDiscountPercent(parseFloat(e.target.value) || 0)}
                      className="w-12 h-6 px-1 text-center text-xs font-bold border border-gray-200 rounded bg-white"
                    />
                  </div>
                  <span className="font-semibold text-red-600">-${discountAmount.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <span>GST / Tax (%)</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={taxPercent}
                      onChange={e => setTaxPercent(parseFloat(e.target.value) || 0)}
                      className="w-12 h-6 px-1 text-center text-xs font-bold border border-gray-200 rounded bg-white"
                    />
                  </div>
                  <span className="font-semibold text-gray-900">+${taxAmount.toLocaleString()}</span>
                </div>

                <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-900">Total Payable</span>
                  <span className="text-lg font-extrabold text-gray-900 tracking-tight">
                    ${grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
