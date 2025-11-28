import React from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { removeFromCart, increaseQty, decreaseQty } from "../../../store/cartSlice";

const CartSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  const total = items.reduce((acc, l) => acc + l.price * l.quantity, 0);
  const currency = items[0]?.currency ?? "GLD";

  return (
    <section className="w-full bg-[#071126] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">

        {/* LEFT: Items */}
        <div className="space-y-6">
          {items.map((item) => (
            <article
              key={item.id}
              className="w-full rounded-3xl bg-gradient-to-r from-[#101a33] to-[#0c1530] shadow-xl/30 px-6 sm:px-8 lg:px-10 py-6 flex items-center gap-6"
            >
              <div className="shrink-0 w-28 h-28 flex items-center">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-extrabold">{item.name}</h2>
                <p className="mt-2 text-sm text-gray-300">{item.description}</p>

                <div className="mt-5 flex items-center">
                  <div className="inline-flex items-center bg-[#1f2c4a] rounded-xl px-4 py-2 gap-4">
                    <button
                      className="px-2 py-1 bg-white/10 hover:bg-white/15 rounded-md"
                      onClick={() => dispatch(decreaseQty(item.id))}
                    >
                      –
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-white/10 hover:bg-white/15 rounded-md"
                      onClick={() => dispatch(increaseQty(item.id))}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="ml-4 text-red-300 hover:text-red-200 text-sm underline"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-300">Price</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-extrabold">{item.currency}</span>
                  <span className="text-2xl font-extrabold text-[#F7C84B]">
                    {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* RIGHT: Summary */}
        <aside className="lg:pt-4">
          <div className="lg:sticky lg:top-6 rounded-3xl bg-[#0b0f1f] border border-white/10 p-6">
            <h3 className="text-xl font-bold mb-4">Product Cart</h3>

            <div className="divide-y divide-white/10">
              {items.map((l) => (
                <div key={l.id} className="py-4 flex justify-between">
                  <p className="font-medium">{l.name}</p>
                  <div className="flex gap-1">
                    <span className="text-sm font-extrabold">{currency}</span>
                    <span className="text-lg font-extrabold text-[#F7C84B]">
                      {(l.price * l.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}

              <div className="py-4 flex justify-between">
                <span className="text-gray-300">Total</span>
                <div className="flex gap-2">
                  <span className="text-base font-extrabold">{currency}</span>
                  <span className="text-2xl font-extrabold text-[#F7C84B]">
                    {total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <button className="mt-4 w-full bg-[#F7C84B] text-[#101a33] py-2.5 rounded-xl font-semibold">
              Buy now
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default CartSection;
