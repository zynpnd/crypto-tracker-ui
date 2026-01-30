"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type CoinInfo = {
  priceUsd: string;
  dex: string;
  chain: string;
};

type ApiResponse = {
  source: string;
  data: Record<string, CoinInfo>;
};

const COIN_LOGOS: Record<string, string> = {
  BTC: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  ETH: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  SOL: "https://cryptologos.cc/logos/solana-sol-logo.png",
};

function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-slate-900/60 p-6 w-72 border border-white/5 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-800" />
        <div className="h-4 w-12 bg-slate-800 rounded" />
      </div>
      <div className="mt-6 h-8 w-32 bg-slate-800 rounded" />
      <div className="mt-4 flex gap-2">
        <div className="h-6 w-16 bg-slate-800 rounded-full" />
        <div className="h-6 w-16 bg-slate-800 rounded-full" />
      </div>
    </div>
  );
}


export default function Home() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://crypto-tracker-api-uuf2.onrender.com/prices/")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
     <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="grid gap-6 md:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="grid gap-6 md:grid-cols-3">
        {data &&
          Object.entries(data.data).map(([symbol, info]) => (
            <div key={symbol} className="
                rounded-2xl  bg-slate-900/70  backdrop-blur 
                p-6 w-72 shadow-lg border border-white/5 transition 
                hover:scale-[1.02] hover:shadow-xl"
            >
            <div className="flex items-center gap-3">
              <Image
                src={COIN_LOGOS[symbol]}
                alt={symbol}
                width={40}
                height={40}
                unoptimized
                className="rounded-full"
              />

              <h2 className="text-xl font-semibold">{symbol}</h2>
            </div>

          {/* Price */}
          <p className="mt-4 text-3xl font-bold tracking-tight">
            $
            {Number(info.priceUsd).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          {/* Meta */}
          <div className="mt-4 flex gap-2">
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
              {info.dex}
            </span>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
              {info.chain}
            </span>
          </div>
            </div>

          ))}
      </div>
      <footer className="fixed bottom-0 w-full py-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Crypto Tracker ·
      </footer>
    </main>
  );
}
