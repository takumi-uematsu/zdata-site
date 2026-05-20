import MockChrome from "./MockChrome";

export default function MockConcierge() {
  return (
    <MockChrome
      title="concierge"
      subtitle="チャット"
      ribbon="● ONLINE"
      tone="dark"
    >
      <div className="flex h-full flex-col px-4 py-4 text-white">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-windowBlue via-twilight to-sunsetPink font-syne italic text-[11px] font-bold text-deepNight">
            Z
          </div>
          <div className="flex-1">
            <p className="font-jp text-[11.5px] font-bold text-white">
              Z-Data コンシェルジュ
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-windowLight/85">
              <span
                aria-hidden
                className="mr-1 inline-block h-1.5 w-1.5 animate-twinkle rounded-full bg-windowLight"
              />
              learning · 0PD #2,341
            </p>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">
            14 : 32
          </span>
        </div>

        <div className="mt-3 flex flex-1 flex-col gap-2.5">
          <Bubble side="ai">
            商談化率の改善ですね。お役に立てそうな話があります。
          </Bubble>
          <Bubble side="ai">
            まず、現状の<span className="text-windowLight">離脱ポイント</span>は
            <strong className="text-white">初回商談</strong>と
            <strong className="text-white">2回目の提案</strong>のどちらが多いですか？
          </Bubble>
          <Bubble side="user">
            初回商談です。価格を聞かれた瞬間に止まることが多くて…
          </Bubble>
          <Bubble side="ai" typing>
            <span className="inline-flex gap-1">
              <span className="h-1.5 w-1.5 animate-twinkle rounded-full bg-white/70" />
              <span
                className="h-1.5 w-1.5 animate-twinkle rounded-full bg-white/70"
                style={{ animationDelay: "0.4s" }}
              />
              <span
                className="h-1.5 w-1.5 animate-twinkle rounded-full bg-white/70"
                style={{ animationDelay: "0.8s" }}
              />
            </span>
          </Bubble>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-sm border border-white/12 bg-white/[0.03] px-3 py-2">
          <span className="font-jp text-[11.5px] text-white/35">
            メッセージを入力…
          </span>
          <span className="ml-auto inline-flex h-6 w-6 items-center justify-center rounded-sm bg-sunsetPink text-deepNight">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M2 21l21-9L2 3l5 9-5 9z" />
            </svg>
          </span>
        </div>
      </div>
    </MockChrome>
  );
}

function Bubble({
  children,
  side,
  typing,
}: {
  children: React.ReactNode;
  side: "ai" | "user";
  typing?: boolean;
}) {
  if (side === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[78%] rounded-md bg-windowBlue/15 px-3 py-2 font-jp text-[11.5px] leading-relaxed text-white">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-start">
      <div
        className={`max-w-[82%] rounded-md border border-white/8 bg-white/[0.04] px-3 py-2 font-jp leading-relaxed text-white/90 ${typing ? "min-h-[26px]" : "text-[11.5px]"}`}
      >
        {children}
      </div>
    </div>
  );
}
