import type { Metadata } from "next";
import { CartView } from "@/components/itoma/CartView";

export const metadata: Metadata = { title: "カート" };

export default function CartPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-5 py-16 md:px-10 md:py-24">
      <h1 className="mb-12 font-mincho text-4xl tracking-[0.2em]">
        カート
      </h1>
      <CartView />
    </div>
  );
}
