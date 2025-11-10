import React, { useMemo, useState } from "react";

export type CartItem = {
  id: number;
  name: string;
  description: string;
  price: number;       // precio unitario
  currency: string;    // "GLD"
  quantity: number;    // cantidad en el carrito
  image: string;       // ruta de imagen
};

type Props = {
  items: CartItem[];
  onChange?(updated: CartItem[]): void;   // se dispara si cambian cantidades
  onRemove?(id: number): void;            // eliminar línea (opcional)
};

const CartSection: React.FC<Props> = ({ items, onChange, onRemove }) => {
  const [lines, setLines] = useState<CartItem[]>(items);

  const updateQty = (id: number, delta: number) => {
    setLines((prev) => {
      const next = prev.map((l) =>
        l.id === id ? { ...l, quantity: Math.max(1, l.quantity + delta) } : l
      );
      onChange?.(next);
      return next;
    });
  };

  const removeLine = (id: number) => {
    setLines((prev) => {
      const next = prev.filter((l) => l.id !== id);
      onChange?.(next);
      onRemove?.(id);
      return next;
    });
  };

  const totalGLD = useMemo(
    () => lines.reduce((acc, l) => acc + l.price * l.quantity, 0),
    [lines]
  );

  return (
    <section className="w-full px-6 lg:px-10 py-10 bg-[#071126] text-white">
      <div className="max-w-6xl mx-auto space-y-6">
        {lines.map((item) => (
          <article
            key={item.id}
            className="
              w-full rounded-3xl
              bg-gradient-to-r from-[#101a33] to-[#0c1530]
              shadow-xl/30 shadow-black/20
              px-6 sm:px-8 lg:px-10 py-6 lg:py-8
              flex items-center gap-6 lg:gap-10
            "
          >
            {/* Imagen */}
            <div className="shrink-0 w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Información */}
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl lg:text-3xl font-extrabold">
                {item.name}
              </h2>
              <p className="mt-2 text-sm lg:text-base text-gray-300">
                {item.description}
              </p>

              {/* Control de cantidad */}
              <div className="mt-5">
                <div
                  className="
                    inline-flex items-center justify-between
                    bg-[#1f2c4a] text-white/90 rounded-xl
                    px-4 py-2 gap-4
                    min-w-[180px]
                  "
                >
                  <button
                    className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/15"
                    onClick={() => updateQty(item.id, -1)}
                    aria-label="Disminuir cantidad"
                  >
                    –
                  </button>
                  <span className="font-medium select-none">{item.quantity}</span>
                  <button
                    className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/15"
                    onClick={() => updateQty(item.id, +1)}
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>

                {/* Quitar (opcional) */}
                <button
                  className="ml-4 text-red-300 hover:text-red-200 text-sm underline underline-offset-4"
                  onClick={() => removeLine(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>

            {/* Precio a la derecha */}
            <div className="text-right">
              <p className="text-sm text-gray-300">Price</p>
              <div className="mt-1 flex items-baseline gap-2 justify-end">
                <span className="text-xl lg:text-2xl font-extrabold">
                  {item.currency}
                </span>
                <span className="text-2xl lg:text-3xl font-extrabold text-[#F7C84B]">
                  {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>

              {/* Unitario (pequeño) */}
              <p className="mt-1 text-xs text-gray-400">
                {item.currency} {item.price.toLocaleString()} / unit
              </p>
            </div>
          </article>
        ))}

        {/* Resumen */}
        <div className="pt-4 flex items-center justify-end">
          <div className="text-right">
            <p className="text-sm text-gray-300">Total</p>
            <div className="flex items-baseline gap-2 justify-end">
              <span className="text-xl font-extrabold">GLD</span>
              <span className="text-3xl font-extrabold text-[#F7C84B]">
                {totalGLD.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartSection;
