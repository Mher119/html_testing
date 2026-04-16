"use client";

import { useState, useEffect } from "react";
import PricingCard from "@/components/PricingCard";
import Image from "next/image";

interface PricingPlan {
  id: string | number;
  is_best: boolean;
  period: string;
  price: number | string;
  full_price: number | string;
  text: string;
}

export default function HomePage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [timeLeft, setTimeLeft] = useState(120);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [showCheckboxError, setShowCheckboxError] = useState(false);

  const isExpired = timeLeft <= 0;

  useEffect(() => {
    fetch("https://t-core.fit-hub.pro/Test/GetTariffs")
      .then((res) => res.json())
      .then((data) => {
        setPlans(data);
        const bestPlan = data.find((p: PricingPlan) => p.is_best);
        if (bestPlan) setSelectedPeriod(bestPlan.period);
      });
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handlePurchase = () => {
    if (!agreed) {
      setShowCheckboxError(true);
      setTimeout(() => setShowCheckboxError(false), 1000);
      return;
    }
    console.log("Purchased:", selectedPeriod);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <main className="min-h-screen bg-[#12171d] text-white pb-20 font-sans">
      {/* Timer Header */}
      <header className="sticky top-0 z-50 p-3 text-center bg-[#1D5B43] min-h-[92px] md:min-h-[102px] flex flex-col justify-center ">
        <p className="text-[12px] font-medium tracking-tight text-white md:text-[20px]">
          Успейте открыть пробную неделю
        </p>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span
            className={`text-[#FFBB00] text-md ${timeLeft <= 30 && timeLeft > 0 ? "animate-blink-red" : ""}`}
          >
            ✦
          </span>
          <div
            className={`text-3xl font-bold tracking-wider tabular-nums ${timeLeft <= 30 && timeLeft > 0 ? "animate-blink-red" : "text-[#FFBB00]"}`}
          >
            {formatTime(timeLeft)}
          </div>
          <span
            className={`text-[#FFBB00] text-md ${timeLeft <= 30 && timeLeft > 0 ? "animate-blink-red" : ""}`}
          >
            ✦
          </span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <h1
          className="text-2xl md:text-3xl font-black mb-6 md:mb-10 tracking-tight leading-tight 
                 text-left md:ml-5"
        >
          Выбери подходящий <br className="block md:hidden" />
          для себя <span className="text-[#FDB056]">тариф</span>
        </h1>

        <div className="relative">
          {/* Flex container: Mobile-ում իրար տակ (col), Desktop-ում կողք-կողքի (row) */}
          {/* Flex container: Column on mobile (col), Row on desktop (row) */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start relative z-10">
            {/* Athlete Image Container */}
            <div className="w-full md:w-2/5 flex justify-center items-end self-end overflow-visible min-h-[230px] md:min-h-[605px]">
              <Image
                src="/athlete-pro.webp"
                alt="Athlete"
                width={960}
                height={1350}
                className="object-contain shrink-0 relative will-change-transform
      /* Desktop */
      md:w-auto md:h-[605px] md:max-w-none md:top-[-25px]
      /* Mobile */
      w-[124px] h-[230px]"
                priority
              />
            </div>

            {/* Content Area (Plans + Button + Legal) */}
            <div className="flex-1 flex flex-col gap-4 w-full">
              {/* Main Plan */}
              {plans
                .filter((p) => p.is_best)
                .map((plan) => (
                  <PricingCard
                    key={plan.id}
                    plan={plan}
                    isMain
                    isExpired={isExpired}
                    selected={selectedPeriod === plan.period}
                    onSelect={() => {
                      setSelectedPeriod(plan.period);
                      setShowCheckboxError(false);
                    }}
                  />
                ))}

              {/* Other Plans Grid */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-2 min-w-0">
                {plans
                  .filter((p) => !p.is_best)
                  .reverse()
                  .map((plan) => (
                    <div key={plan.id} className="min-w-0">
                      <PricingCard
                        plan={plan}
                        isExpired={isExpired}
                        selected={selectedPeriod === plan.period}
                        onSelect={() => {
                          setSelectedPeriod(plan.period);
                          setShowCheckboxError(false);
                        }}
                      />
                    </div>
                  ))}
              </div>

              {/* Info Block */}
              <div className="bg-[#2D3233] rounded-2xl p-3 flex gap-3 items-start mt-2 w-full md:w-full md:max-w-[67%]">
                <span className="text-[#fd972e] font-bold text-lg leading-none">
                  !
                </span>
                <p className="text-[11px] text-gray-200 leading-snug">
                  Следуя плану на 3 месяца и более, люди получают
                  {/* on desktop */}
                  <br className="hidden md:block" /> в 2 раза лучший результат,
                  {/* on mobile */}
                  чем за 1 месяц
                </p>
              </div>

              {/* Checkbox Section */}
              <label
                className={`flex items-start gap-3 cursor-pointer mt-2 py-2 transition-all rounded-xl ${
                  showCheckboxError && !agreed
                    ? "bg-red-500/10 border border-red-500 animate-shake px-2"
                    : "border border-transparent"
                }`}
              >
                <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="peer appearance-none w-6 h-6 border border-gray-600 rounded bg-[#2D3233] cursor-pointer"
                  />
                  <svg
                    className="absolute w-4 h-4 pointer-events-none hidden peer-checked:block text-[#fd972e]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-[11px] text-gray-400 leading-snug select-none max-w-[280px] md:max-w-none">
                  Я согласен с{" "}
                  <span className="underline decoration-gray-600">
                    офертой рекуррентных платежей
                  </span>{" "}
                  {/* " " for desktop */}
                  <br className="block md:hidden" />и{" "}
                  <span className="underline decoration-gray-600">
                    Политикой <br className="hidden md:block" />
                    конфиденциальности
                  </span>
                </span>
              </label>

              {/* Buy Button: on Mobile 100%, on Desktop 50% (ex w-3/6-ը) */}
              <button
                onClick={handlePurchase}
                className="w-full md:w-3/6 bg-[#fd972e] text-[#191E1F] font-[900] py-4 md:py-3 rounded-2xl tracking-widest text-lg animate-blink active:scale-95 mt-2 flex justify-center items-center uppercase"
              >
                Купить
              </button>

              {/* Legal Disclaimer */}
              <p className="text-[9px] text-gray-500 leading-tight px-1 mt-2 opacity-80 md:max-w-[450px]">
                Нажимая кнопку «Купить», Пользователь соглашается на разовое
                списание денежных средств для получения пожизненного доступа к
                приложению. Пользователь соглашается, что данные
                кредитной/дебетовой карты будут сохранены для осуществления
                покупок дополнительных услуг сервиса в случае желания
                пользователя.
              </p>
            </div>
          </div>
        </div>

        {/* Guarantee Section: The translate effect's saving on Desktop */}
        <div className="mt-8 md:mt-12 bg-[#1d232a] rounded-[28px] md:rounded-[32px] p-6 border border-white/5 w-full md:ml-10 md:transform md:translate-x-9">
          <div className="inline-block border-[1.5px] border-[#81FE95] text-[#81FE95] rounded-full px-4 py-2 md:px-5 md:py-3 text-[10px] md:text-sm font-bold mb-4 uppercase tracking-widest">
            гарантия возврата 30 дней
          </div>
          <p className="text-[13px] md:text-sm text-[#DCDCDC] leading-relaxed">
            Мы уверены, что наш план сработает для тебя и ты увидишь видимые
            результаты уже через 4 недели! Мы даже готовы полностью вернуть твои
            деньги в течение 30 дней с момента покупки, если ты не получишь
            видимых результатов.
          </p>
        </div>
      </div>
    </main>
  );
}
