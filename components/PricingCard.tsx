"use client";

interface PlanProps {
  plan: {
    id: string | number;
    period: string;
    price: number | string;
    full_price: number | string;
    is_best: boolean;
    text: string;
  };
  isMain?: boolean;
  isExpired: boolean;
  selected: boolean;
  onSelect: () => void;
}

export default function PricingCard({
  plan,
  isMain,
  isExpired,
  selected,
  onSelect,
}: PlanProps) {
  const currentPrice = isExpired ? Number(plan.full_price) : Number(plan.price);
  const oldPrice = Number(plan.full_price);
  const discount = Math.round(100 - (Number(plan.price) * 100) / oldPrice);

  const isForever =
    plan.id === 4 || plan.period.toLowerCase().includes("навсегда");

  return (
    <div
      onClick={onSelect}
      className={`relative cursor-pointer transition-all duration-300 rounded-[28px] overflow-visible border-2 flex bg-[#2D3233] w-full p-[1px] md:items-stretch ${
        selected
          ? "border-[#FDB056] z-10 shadow-lg shadow-[#FDB056]/10"
          : isMain && !isForever
            ? "border-[#fd972e]"
            : "border-white/10 hover:border-white/20"
      } ${
        isMain
          ? "md:h-[130px]"
          : `md:flex-col items-center justify-between ${
              isForever ? "md:h-[150px]" : "md:h-[220px]"
            }`
      }`}
    >
      {/* Discount Badge */}
      <div
        className={`absolute bg-[#FD5656] text-white rounded-b-lg z-20 px-2 py-1 flex items-center justify-center w-[41px] min-w-[40px] transition-all duration-500 
    ${isExpired ? "opacity-0 -translate-y-full" : "opacity-100"}
    ${
      isMain
        ? "top-0 right-14 md:right-auto md:left-[25px]"
        : "-top-[1.6px] right-8 md:right-auto md:left-[25px]"
    }`}
      >
        <span className="text-[12px] md:text-sm font-bold leading-none whitespace-nowrap">
          -{discount}%
        </span>
      </div>

      {isMain && (
        <div className="absolute top-1 right-4 text-[#fd972e] text-[10px] font-medium uppercase tracking-widest opacity-80">
          хит!
        </div>
      )}

      {/* --- MOBILE VIEW --- */}
      <div className="flex md:hidden w-full items-center justify-between mt-4 px-5 pb-5">
        <div className="flex flex-col items-start leading-none min-w-[120px]">
          <p className="font-medium text-[14px] text-white/90 mb-3 first-letter:uppercase lowercase">
            {plan.period}
          </p>
          <div className="flex flex-col items-end">
            <div
              className={`flex items-baseline ${isMain ? "text-[#fd972e]" : "text-white"}`}
            >
              <span className="font-[900] text-3xl">{currentPrice}</span>
              <span className="ml-1.5 font-[900] text-xl">₽</span>
            </div>

            <div
              className={`relative mt-1 text-gray-500 text-[13px] flex items-center transition-opacity duration-300 ${isExpired ? "opacity-0 invisible" : "opacity-100"}`}
            >
              <span className="relative">
                {oldPrice} ₽
                <span className="absolute left-0 top-1/2 w-full h-[1.2px] bg-gray-500 -translate-y-1/2"></span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-[140px] ml-4">
          <p className="text-[11px] text-gray-400 leading-snug text-left font-medium">
            {plan.id === 1 || plan.period.toLowerCase().includes("1 неделя") ? (
              "Чтобы просто начать"
            ) : plan.id === 2 ||
              plan.period.toLowerCase().includes("1 месяц") ? (
              <>
                Получить <br /> первые <br /> результаты
              </>
            ) : plan.id === 3 ||
              plan.period.toLowerCase().includes("3 месяца") ? (
              <>
                Привести тело <br /> в порядок
              </>
            ) : isForever ? (
              <>
                Всегда <br /> быть в форме
              </>
            ) : (
              plan.text
            )}
          </p>
        </div>
      </div>

      {/* --- DESKTOP VIEW --- */}
      <div className="hidden md:flex w-full items-stretch justify-between h-full relative px-6 py-4 overflow-visible box-border">
        {isMain ? (
          <>
            {/* Price Section (Left Side) */}
            <div className="flex flex-col w-[55%] items-start justify-center pl-10 h-full">
              <p className="font-medium text-lg text-white mb-1 first-letter:uppercase lowercase pl-6 h-[28px]">
                {plan.period}
              </p>

              {/* Ներմուծված է min-w և հստակ բարձրություններ, որպեսզի կոդը չշարժվի */}
              <div className="flex flex-col items-center w-[130px] h-[76px] justify-between">
                <div className="flex items-baseline pt-1 h-[48px]">
                  {" "}
                  {/* Ֆիքսված բարձրություն */}
                  <span
                    className={`font-[700] text-5xl leading-none ${isExpired ? "text-white" : "text-[#fd972e]"}`}
                  >
                    {currentPrice}
                  </span>
                  <span
                    className={`ml-2 font-[700] text-5xl leading-none pt-[1px] ${isExpired ? "text-white" : "text-[#fd972e]"}`}
                  >
                    ₽
                  </span>
                </div>

                {/* Փոխված է transition-opacity և տրված է ֆիքսված բարձրություն */}
                <div
                  className={`h-[24px] relative self-end text-white/40 text-[16px] flex items-center mr-[-10px] line-through transition-opacity duration-300 ${isExpired ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                >
                  {oldPrice} ₽
                </div>
              </div>
            </div>

            <div className="flex flex-col w-[40%] items-end justify-center h-full pr-6 pl-10">
              <div className="flex flex-col items-start text-right leading-tight text-white/50 text-[12px]">
                <span className="whitespace-nowrap">
                  Для тех, кто хочет всегда быть в форме
                </span>
                <span className="whitespace-nowrap">
                  и поддерживать здоровье
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-start w-full h-full">
            <div className="mt-6 text-center w-full font-medium text-[15px] text-gray-100 first-letter:uppercase lowercase h-[24px]">
              {plan.period}
            </div>

            {/* Հանված է flex-grow, ավելացված է ֆիքսված հաստատուն բարձրություն h-[60px] */}
            <div className="flex flex-col items-center justify-center w-full h-[60px] mt-auto mb-auto">
              <div className="flex items-center text-white h-[32px]">
                {" "}
                {/* Ֆիքսված բարձրություն */}
                <span className="font-[700] text-2xl leading-none">
                  {currentPrice}
                </span>
                <span className="ml-2 font-[700] text-2xl leading-none">₽</span>
              </div>

              {/* Փոխված է transition-opacity և տրված է ֆիքսված բարձրություն */}
              <div
                className={`h-[24px] relative self-end text-white/40 text-[16px] flex items-center mr-5 transition-opacity duration-300 ${isExpired ? "opacity-0 invisible" : "opacity-100"}`}
              >
                <span className="relative">
                  {oldPrice} ₽
                  <span className="absolute left-0 top-1/2 w-full h-[1px] bg-white/40 -translate-y-1/2"></span>
                </span>
              </div>
            </div>

            {!isForever && (
              <div className="h-[35px] pb-1 w-full flex justify-start -ml-4 mt-7 overflow-visible">
                <div className=" w-full">
                  <p className="text-[12px] text-white/50 text-start leading-tight font-small whitespace-nowrap">
                    {plan.id === 1 ||
                    plan.period.toLowerCase().includes("1 неделя") ? (
                      "Чтобы просто начать"
                    ) : plan.id === 2 ||
                      plan.period.toLowerCase().includes("1 месяц") ? (
                      <>
                        Чтобы получить первые <br /> результаты
                      </>
                    ) : plan.id === 3 ||
                      plan.period.toLowerCase().includes("3 месяца") ? (
                      <>
                        Привести тело <br /> в порядок
                      </>
                    ) : (
                      plan.text
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
