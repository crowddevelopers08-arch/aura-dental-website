import Image from "next/image";

export type ArticleBlock =
  | { type: "h2" | "h3" | "h4" | "h5" | "h6" | "p"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "table"; rows: string[][] }
  | { type: "img"; src: string; alt: string };

/** Long-form renderer for /blogs/* and /newsletter/* posts. */
export default function ArticleContent({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <article className="bg-white px-5 py-[30px] md:py-[50px]">
      <div className="mx-auto max-w-[860px]">
        {blocks.map((block, i) => {
          switch (block.type) {
            case "h2":
              return (
                <h2
                  key={i}
                  className="mb-4 mt-12 text-[32px] font-bold leading-[1.3] text-[#1d4231]"
                >
                  {block.text}
                </h2>
              );
            case "h3":
              return (
                <h3 key={i} className="mb-3 mt-5 md:mt-8 text-[26px] font-bold text-[#1d4231]">
                  {block.text}
                </h3>
              );
            case "h4":
            case "h5":
            case "h6":
              return (
                <h4 key={i} className="mb-2.5 mt-6 text-[24px] font-semibold text-[#1d4231]">
                  {block.text}
                </h4>
              );
            case "p":
              return (
                <p key={i} className="mb-4 text-[18px] leading-[1.4] text-[#444]">
                  {block.text}
                </p>
              );
            case "img":
              return (
                <Image
                  key={i}
                  src={block.src}
                  alt={block.alt}
                  width={860}
                  height={520}
                  className="my-5 md:my-8 h-auto w-full rounded-[20px] object-cover"
                />
              );
            case "list":
              return block.ordered ? (
                <ol key={i} className="mb-5 list-decimal space-y-2.5 pl-6">
                  {block.items.map((item, j) => (
                    <li key={j} className="text-[18px] leading-[1.4] text-[#444]">
                      {item}
                    </li>
                  ))}
                </ol>
              ) : (
                <ul key={i} className="mb-5 space-y-2.5">
                  {block.items.map((item, j) => (
                    <li
                      key={j}
                      className="bg-[url('/images/list1.svg')] bg-position-[left_7px] bg-no-repeat pl-[25px] text-[18px] leading-[1.4] text-[#444]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              );
            case "table":
              return (
                <div key={i} className="my-5 md:my-8 overflow-x-auto rounded-[14px] border border-[#e2e2e2]">
                  <table className="w-full min-w-[520px] border-collapse text-left">
                    <tbody>
                      {block.rows.map((row, r) => (
                        <tr key={r} className={r === 0 ? "bg-[#1d4231]" : "even:bg-[#fbfbfb]"}>
                          {row.map((cell, c) => (
                            <td
                              key={c}
                              className={`border-b border-[#e2e2e2] px-4 py-3 align-top text-[15px] leading-relaxed ${
                                r === 0 ? "font-semibold text-white" : "text-[#444]"
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    </article>
  );
}
