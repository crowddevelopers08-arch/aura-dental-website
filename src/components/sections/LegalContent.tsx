export type LegalBlock =
  | { type: "h2" | "h3" | "h4" | "p"; text: string }
  | { type: "list"; items: string[] };

/** Renders the long-form legal copy for /privacy-policy and /terms-and-conditions. */
export default function LegalContent({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <section className="bg-white px-5 pb-[30px] md:pb-[50px] pt-2">
      <div className="mx-auto max-w-[900px]">
        {blocks.map((block, i) => {
          if (block.type === "list") {
            return (
              <ul key={i} className="mb-5 space-y-2.5">
                {block.items.map((item) => (
                  <li
                    key={item.slice(0, 60)}
                    className="bg-[url('/images/list1.svg')] bg-position-[left_7px] bg-no-repeat pl-[25px] text-[18px] leading-[1.4] text-[#444]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );
          }

          if (block.type === "h2") {
            return (
              <h2
                key={i}
                className="mb-4 mt-6 md:mt-10 text-[32px] font-bold leading-[1.3] text-[#1d4231]"
              >
                {block.text}
              </h2>
            );
          }

          if (block.type === "h3") {
            return (
              <h3 key={i} className="mb-3 mt-7 text-[26px] font-bold text-[#1d4231]">
                {block.text}
              </h3>
            );
          }

          if (block.type === "h4") {
            return (
              <h4 key={i} className="mb-2.5 mt-6 text-[24px] font-semibold text-[#1d4231]">
                {block.text}
              </h4>
            );
          }

          return (
            <p key={i} className="mb-4 text-[18px] leading-[1.4] text-[#444]">
              {block.text}
            </p>
          );
        })}
      </div>
    </section>
  );
}
