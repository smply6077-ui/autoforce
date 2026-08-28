'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/lib/cartStore';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, updateQty, removeItem, total, clear } = useCartStore();
  const [form, setForm] = useState({ name: '', phone: '', address: '', payment: 'cash' });
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);

    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        customer_name: form.name,
        customer_phone: form.phone,
        delivery_address: form.address,
        payment_method: form.payment,
        total: total(),
      })
      .select()
      .single();

    if (!error && order) {
      await supabase.from('order_items').insert(
        items.map((i) => ({
          order_id: order.id,
          product_id: i.id,
          product_name: i.name,
          unit_price: i.price,
          quantity: i.quantity,
        }))
      );
      clear();
      router.push('/comanda-confirmata');
    }
    setSubmitting(false);
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">Coșul este gol.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-10">
      <div>
        <h1 className="text-xl font-bold mb-4">Coșul tău</h1>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 border-b pb-4">
              {item.image_url && (
                <div className="relative w-16 h-16 shrink-0">
                  <Image src={item.image_url} alt={item.name} fill className="object-contain" />
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-brand font-bold">{item.price} MDL</p>
              </div>
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => updateQty(item.id, Number(e.target.value))}
                className="w-14 border rounded px-2 py-1 text-center"
              />
              <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                ✕
              </button>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>{total()} MDL</span>
        </div>
      </div>

      <form onSubmit={placeOrder} className="space-y-4">
        <h2 className="text-xl font-bold">Detalii livrare</h2>
        <input
          required
          placeholder="Nume complet"
          className="w-full border rounded px-3 py-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          required
          placeholder="Telefon"
          className="w-full border rounded px-3 py-2"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          placeholder="Adresă de livrare"
          className="w-full border rounded px-3 py-2"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <select
          className="w-full border rounded px-3 py-2"
          value={form.payment}
          onChange={(e) => setForm({ ...form, payment: e.target.value })}
        >
          <option value="cash">Numerar la livrare</option>
          <option value="card">Card la livrare</option>
        </select>
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-brand text-white py-3 rounded font-medium hover:bg-red-700 disabled:opacity-50"
        >
          {submitting ? 'Se trimite...' : 'Plasează comanda'}
        </button>
      </form>
    </div>
  );
}
