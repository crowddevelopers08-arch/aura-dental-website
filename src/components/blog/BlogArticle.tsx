import Image from "next/image";
import BlogFaq from "./BlogFaq";

/*
  Long-form blog renderer. Every rule here is lifted from the live site's blog
  template (template_child.min.css + the post-template <style> block):

    .content-wrapper  max-width 1240px, 20px gutters (0 from 1380px up)
    .bl-bg            #ececec band, applied per widget so runs merge into one
    .blog-heading     the h1, on the same #ececec band, centred
    .padding-blog     20px 20px 10px
    align-mobile-center — body copy centres below 768px, lists stay left
*/

export type BlogBlock =
  | { type: "title"; html: string }
  | {
      type: "section";
      html: string;
      image?: string;
      alt?: string;
      /** A `.video-wrapper` in the media column instead of a still. */
      video?: string;
      imageWidth?: string;
      /** `media-left` / `media-right` — which side the illustration sits on. */
      side?: "left" | "right";
      body?: BlogBlock[];
      bg?: boolean;
    }
  | { type: "h2" | "h3" | "h4" | "h5" | "h6"; html: string; bg?: boolean }
  | { type: "p"; html: string; bg?: boolean }
  | { type: "list"; variant?: "bullet" | "benefits" | "ordered"; items: string[]; bg?: boolean }
  | { type: "img"; src: string; alt: string; bg?: boolean }
  | { type: "table"; head: string[]; rows: string[][]; bg?: boolean }
  | {
      type: "process";
      steps: { n: string; title: string; body: string; tag: string }[];
      bg?: boolean;
    }
  | { type: "highlight"; title: string; paras: string[]; items: string[]; bg?: boolean }
  | {
      type: "procon";
      boxes: { tone: "pros" | "cons"; title: string; items: string[] }[];
      bg?: boolean;
    }
  | { type: "olist"; items: { title: string; body: string; items?: string[] }[]; bg?: boolean }
  | { type: "author"; initials: string; name: string; role: string; bio: string; bg?: boolean }
  | { type: "faq-heading"; html: string; icon?: string | null }
  | { type: "faq"; items: { q: string; a: { html: string }[] }[] };

/** `.content-wrapper` — 1240px, 20px gutters that disappear on very wide screens. */
const WRAP = "mx-auto w-full max-w-[1240px] px-5 min-[1380px]:px-0";

/** One HubSpot widget: the optional #ececec band plus the 1240px column. */
function Band({
  bg,
  className = "",
  children,
}: {
  bg?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={bg ? "bg-[#ececec]" : undefined}>
      <div className={`${WRAP} ${className}`}>{children}</div>
    </div>
  );
}

/** Body copy centres on phones (`align-mobile-center`) and is left-aligned above that. */
const RICH = "text-center md:text-left";

/** Shared inline-HTML styling: bold runs and the occasional inline link. */
const LINK = "[&_a]:text-[#467886] [&_a]:underline";

function Heading({ html, level = 2 }: { html: string; level?: 2 | 3 | 4 }) {
  const cls =
    level === 2
      ? "text-[32px] font-bold leading-[1.2] text-black"
      : level === 3
        ? "text-[26px] font-bold leading-[1.2] text-black"
        : "text-[24px] font-semibold leading-[1.2] text-black";
  const Tag = (`h${level}` as const) satisfies "h2" | "h3" | "h4";
  return <Tag className={cls} dangerouslySetInnerHTML={{ __html: html }} />;
}

function Paragraph({ html }: { html: string }) {
  return (
    <p
      className={`mb-[15px] text-[18px] leading-[1.4] text-black ${LINK}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function List({ variant, items }: { variant?: string; items: string[] }) {
  // `.blog-benefits-list` — no marker, a 12px solid green dot instead.
  if (variant === "benefits") {
    return (
      <ul className="mb-[15px] list-none pl-0 text-left">
        {items.map((it, i) => (
          <li
            key={i}
            className={`relative mb-2.5 pl-10 text-[18px] leading-[1.4] text-black before:absolute before:top-[7px] before:left-2 before:h-3 before:w-3 before:rounded-full before:bg-[#1d4231] before:content-[''] ${LINK}`}
            dangerouslySetInnerHTML={{ __html: it }}
          />
        ))}
      </ul>
    );
  }

  const Tag = variant === "ordered" ? "ol" : "ul";
  return (
    <Tag
      className={`mb-[15px] ml-2.5 pl-5 text-left ${
        variant === "ordered" ? "list-decimal" : "list-disc"
      }`}
    >
      {items.map((it, i) => (
        <li
          key={i}
          className={`mb-2.5 text-[18px] leading-[1.4] text-black ${LINK}`}
          dangerouslySetInnerHTML={{ __html: it }}
        />
      ))}
    </Tag>
  );
}

/** `.implant-cost-table` — hairlined grid under a deep-green header row. */
function CostTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] border-collapse border border-black bg-white text-left">
        {head.length > 0 && (
          <thead>
            <tr>
              {head.map((c, i) => (
                <th
                  key={i}
                  className="border border-black bg-[#1d4231] px-[15px] py-3 align-bottom text-[18px] font-semibold text-white"
                  dangerouslySetInnerHTML={{ __html: c }}
                />
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((c, i) => (
                <td
                  key={i}
                  className="border border-black px-[15px] py-3 align-middle text-[18px] leading-[1.4] text-black"
                  dangerouslySetInnerHTML={{ __html: c }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** `.implant-process` — numbered green discs beside each stage of treatment. */
function ProcessSteps({ steps }: { steps: { n: string; title: string; body: string; tag: string }[] }) {
  return (
    <div className="pb-[25px] text-left">
      {steps.map((s, i) => (
        <div key={i} className="flex gap-5 pt-[30px] pb-2.5">
          <div className="flex h-10 w-10 min-w-10 items-center justify-center rounded-full bg-[#1d4231] font-bold text-white">
            {s.n}
          </div>
          <div>
            <h4
              className="mb-2.5 text-[24px] font-semibold leading-[1.2] text-black"
              dangerouslySetInnerHTML={{ __html: s.title }}
            />
            <p
              className={`mb-3 text-[18px] leading-[1.4] text-black ${LINK}`}
              dangerouslySetInnerHTML={{ __html: s.body }}
            />
            <span className="inline-block rounded-[20px] bg-white px-2.5 py-[3px] text-[18px] font-bold text-[#1d4231]">
              {s.tag}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/** `.highlight-box` — white card with the thick green rule down its left edge. */
function HighlightBox({
  title,
  paras,
  items,
}: {
  title: string;
  paras: string[];
  items: string[];
}) {
  return (
    <div className="my-6 rounded-xl border border-[#1d4231] border-l-4 border-l-[#1d4231] bg-white px-6 py-5 text-left">
      {title && (
        <div
          className="mb-2 text-[18px] font-semibold tracking-[0.08em] uppercase text-black"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}
      {paras.map((p, i) => (
        <p
          key={i}
          className={`mb-[15px] text-[18px] leading-[1.4] text-black last:mb-0 ${LINK}`}
          dangerouslySetInnerHTML={{ __html: p }}
        />
      ))}
      {items.length > 0 && (
        <ul className="ml-2.5 list-disc pl-5">
          {items.map((it, i) => (
            <li
              key={i}
              className={`mb-2.5 text-[18px] leading-[1.4] text-black last:mb-0 ${LINK}`}
              dangerouslySetInnerHTML={{ __html: it }}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

/** `.pro-con-grid` — suitability side by side, ticks on the left, bangs on the right. */
function ProConGrid({
  boxes,
}: {
  boxes: { tone: "pros" | "cons"; title: string; items: string[] }[];
}) {
  return (
    <div className="mb-5 grid grid-cols-1 gap-4 text-left md:grid-cols-2">
      {boxes.map((box, i) => (
        <div
          key={i}
          className={`rounded-xl border bg-white px-6 py-5 ${
            box.tone === "cons" ? "border-[#f0c8c4]" : "border-[#c0e4d4]"
          }`}
        >
          <div
            className="mb-3 text-[18px] font-semibold uppercase text-black"
            dangerouslySetInnerHTML={{ __html: box.title }}
          />
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {box.items.map((it, j) => (
              <li key={j} className="flex items-start gap-2 text-[18px] leading-[1.5] text-black">
                <span className="shrink-0 font-bold" aria-hidden="true">
                  {box.tone === "cons" ? "!" : "✓"}
                </span>
                <span dangerouslySetInnerHTML={{ __html: it }} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** `.ordered` — the numbered question list, indented on desktop only. */
function OrderedQuestions({
  items,
}: {
  items: { title: string; body: string; items?: string[] }[];
}) {
  return (
    <div className="mb-6 ml-0 text-left min-[577px]:ml-6">
      {items.map((it, i) => (
        <div key={i}>
          <p
            className="mb-1.5 text-[18px] leading-[1.4] text-black"
            dangerouslySetInnerHTML={{ __html: it.title }}
          />
          {it.body && (
            <p
              className={`mb-[15px] text-[18px] leading-[1.4] text-black ${LINK}`}
              dangerouslySetInnerHTML={{ __html: it.body }}
            />
          )}
          {it.items && it.items.length > 0 && (
            <ul className="mb-[15px] ml-2.5 list-disc pl-5">
              {it.items.map((li, j) => (
                <li
                  key={j}
                  className="mb-2.5 text-[18px] leading-[1.4] text-black"
                  dangerouslySetInnerHTML={{ __html: li }}
                />
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

/** `.author-card` inside a rounded `.highlight-box` — the reviewing dentist. */
function AuthorCard({
  initials,
  name,
  role,
  bio,
}: {
  initials: string;
  name: string;
  role: string;
  bio: string;
}) {
  return (
    <div className="my-10 rounded-2xl border border-[#1d4231] border-l-4 border-l-[#1d4231] bg-white p-5">
      <div className="flex flex-col items-center gap-5 text-center min-[577px]:flex-row min-[577px]:items-start min-[577px]:text-left">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1d4231] font-bold text-white">
          {initials}
        </div>
        <div>
          <div
            className="mb-0.5 text-[18px] font-semibold text-black"
            dangerouslySetInnerHTML={{ __html: name }}
          />
          <div
            className="mb-1.5 text-[18px] text-[#d2b770]"
            dangerouslySetInnerHTML={{ __html: role }}
          />
          <p
            className={`m-0 text-[18px] leading-[1.4] text-black ${LINK}`}
            dangerouslySetInnerHTML={{ __html: bio }}
          />
        </div>
      </div>
    </div>
  );
}

/** Renders the blocks that can appear nested inside a section's `media-text`. */
function Inner({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => (
        <Piece key={i} block={b} />
      ))}
    </>
  );
}

/** A block rendered without its own band — used inside sections and FAQ answers. */
function Piece({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "p":
      return <Paragraph html={block.html} />;
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      return <Heading html={block.html} level={block.type === "h2" ? 2 : block.type === "h3" ? 3 : 4} />;
    case "list":
      return <List variant={block.variant} items={block.items} />;
    case "table":
      return <CostTable head={block.head} rows={block.rows} />;
    case "process":
      return <ProcessSteps steps={block.steps} />;
    case "highlight":
      return <HighlightBox title={block.title} paras={block.paras} items={block.items} />;
    case "procon":
      return <ProConGrid boxes={block.boxes} />;
    case "olist":
      return <OrderedQuestions items={block.items} />;
    case "author":
      return (
        <AuthorCard
          initials={block.initials}
          name={block.name}
          role={block.role}
          bio={block.bio}
        />
      );
    case "img":
      return (
        <Image
          src={block.src}
          alt={block.alt}
          width={1200}
          height={720}
          className="h-auto w-full"
        />
      );
    default:
      return null;
  }
}

export default function BlogArticle({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <article className="pb-10">
      {blocks.map((block, i) => {
        switch (block.type) {
          /* `.blog-heading` — the post title on its own grey band. */
          case "title":
            return (
              <div key={i} className="bg-white pt-5">
                <div className={WRAP}>
                  <h1
                    className="bg-[#ececec] p-5 text-center text-[32px] font-semibold leading-[1.2] text-black md:text-[40px]"
                    dangerouslySetInnerHTML={{ __html: block.html }}
                  />
                </div>
              </div>
            );

          /* `.media-content-section` — a section heading, optionally with the
             illustration alongside it (`media-right` puts it on the right). */
          case "section": {
            const width = block.imageWidth ?? "25%";
            const rest = `calc(100% - ${width})`;
            const media = block.image ?? block.video;
            return (
              <Band key={i} bg={block.bg} className="pt-5 pb-2.5">
                {media ? (
                  <>
                    {/* `.media-heading.mobile-only` — below 768px the heading
                        jumps above the picture; on desktop it sits in the
                        text column (`.desktop-only`). */}
                    {block.html && (
                      <div className={`md:hidden ${RICH}`}>
                        <Heading html={block.html} />
                      </div>
                    )}
                    <div
                      className={`flex flex-col gap-5 md:items-center md:gap-[30px] ${
                        block.side === "left" ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      <div className="w-full" style={{ flexBasis: width }}>
                        {block.image ? (
                          <Image
                            src={block.image}
                            alt={block.alt ?? ""}
                            width={600}
                            height={600}
                            className="block h-auto w-full"
                          />
                        ) : (
                          // `.video-wrapper` — a 16:9 box the clip letterboxes into.
                          <div className="relative w-full bg-black pt-[56.25%]">
                            <video
                              src={block.video}
                              controls
                              playsInline
                              preload="metadata"
                              className="absolute inset-0 h-full w-full"
                            />
                          </div>
                        )}
                      </div>
                      <div className={`w-full min-w-0 ${RICH}`} style={{ flexBasis: rest }}>
                        {block.html && (
                          <div className="hidden md:block">
                            <Heading html={block.html} />
                          </div>
                        )}
                        {block.body && <Inner blocks={block.body} />}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className={RICH}>
                    {block.html && <Heading html={block.html} />}
                    {block.body && <Inner blocks={block.body} />}
                  </div>
                )}
              </Band>
            );
          }

          /* `.faq` media section — the little support icon beside the FAQ title. */
          case "faq-heading":
            return (
              <Band key={i} className="pt-5 pb-2.5">
                <div className="flex items-center justify-center gap-2.5">
                  {block.icon && (
                    <Image src={block.icon} alt="" width={45} height={47} className="block" />
                  )}
                  <Heading html={block.html} />
                </div>
              </Band>
            );

          case "faq":
            return (
              <Band key={i} className="pt-2.5">
                <BlogFaq items={block.items} />
              </Band>
            );

          default:
            return (
              <Band key={i} bg={block.bg} className={`py-2.5 ${RICH}`}>
                <Piece block={block} />
              </Band>
            );
        }
      })}
    </article>
  );
}
