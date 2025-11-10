import React, { useMemo, useState } from "react";

export type CartItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  quantity: number;
  image: string;
};

type Props = {
  items: CartItem[];
  onChange?(updated: CartItem[]): void;
  onRemove?(id: number): void;
};

const CartSection: React.FC<Props> = ({ items, onChange, onRemove }) => {
  const [lines, setLines] = useState<CartItem[]>(items);

  const updateQty = (id: number, delta: number) => {
    setLines(prev => {
      const next = prev.map(l =>
        l.id === id ? { ...l, quantity: Math.max(1, l.quantity + delta) } : l
      );
      onChange?.(next);
      return next;
    });
  };

  const removeLine = (id: number) => {
    setLines(prev => {
      const next = prev.filter(l => l.id !== id);
      onChange?.(next);
      onRemove?.(id);
      return next;
    });
  };

  const total = useMemo(
    () => lines.reduce((acc, l) => acc + l.price * l.quantity, 0),
    [lines]
  );
  const currency = lines[0]?.currency ?? "GLD";

  return (
    <section className="w-full bg-[#071126] text-white">
      {/* Contenedor principal en 2 columnas (responsive) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        {/* Columna izquierda: líneas del carrito */}
        <div className="space-y-6">
          {lines.map(item => (
            <article
              key={item.id}
              className="w-full rounded-3xl bg-gradient-to-r from-[#101a33] to-[#0c1530] shadow-xl/30 shadow-black/20 px-6 sm:px-8 lg:px-10 py-6 lg:py-8 flex items-center gap-6 lg:gap-10"
            >
              {/* Imagen */}
              <div className="shrink-0 w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 flex items-center justify-center">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl lg:text-3xl font-extrabold">{item.name}</h2>
                <p className="mt-2 text-sm lg:text-base text-gray-300">{item.description}</p>

                {/* Cantidad + Remove */}
                <div className="mt-5 flex items-center">
                  <div className="inline-flex items-center justify-between bg-[#1f2c4a] text-white/90 rounded-xl px-4 py-2 gap-4 min-w-[180px]">
                    <button
                      className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/15"
                      onClick={() => updateQty(item.id, -1)}
                      aria-label="Decrease"
                    >
                      –
                    </button>
                    <span className="font-medium select-none">{item.quantity}</span>
                    <button
                      className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/15"
                      onClick={() => updateQty(item.id, +1)}
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="ml-4 text-red-300 hover:text-red-200 text-sm underline underline-offset-4"
                    onClick={() => removeLine(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Precio por línea (derecha) */}
              <div className="text-right">
                <p className="text-sm text-gray-300">Price</p>
                <div className="mt-1 flex items-baseline gap-2 justify-end">
                  <span className="text-xl lg:text-2xl font-extrabold">{item.currency}</span>
                  <span className="text-2xl lg:text-3xl font-extrabold text-[#F7C84B]">
                    {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  {item.currency} {item.price.toLocaleString()} / unit
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Columna derecha: resumen sticky */}
        <aside className="lg:pt-4">
          <div className="lg:sticky lg:top-6 rounded-3xl bg-[#0b0f1f] border border-white/10 p-6">
            <h3 className="text-xl font-bold mb-4">Product Car</h3>

            <div className="divide-y divide-white/10">
              {lines.map(l => (
                <div key={l.id} className="py-4 flex items-center justify-between">
                  <div className="pr-4">
                    <p className="font-medium">{l.name}</p>
                    {l.quantity > 1 && (
                      <p className="text-xs text-gray-400">
                        {l.quantity} × {currency} {l.price.toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-extrabold">{currency}</span>
                    <span className="text-lg font-extrabold text-[#F7C84B]">
                      {(l.price * l.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}

              <div className="py-4 flex items-center justify-between">
                <span className="text-gray-300">Total</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-extrabold">{currency}</span>
                  <span className="text-2xl font-extrabold text-[#F7C84B]">
                    {total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <button className="mt-4 w-full bg-[#F7C84B] text-[#101a33] font-semibold py-2.5 rounded-xl hover:brightness-95 transition">
              Buy now
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default CartSection;
