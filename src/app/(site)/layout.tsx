import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/layout/ChatWidget";

/**
 * The public marketing site's chrome. It lives here rather than in the root
 * layout so `/dashboard` — an internal tool — renders without the announcement
 * bar, nav, footer and chat bubble. `(site)` is a route group, so none of the
 * URLs underneath it change.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* Bar + header pin together as one unit, so the offer strip stays visible
          on scroll and the header never overlaps it. */}
      <div className="sticky top-0 z-50">
        <AnnouncementBar />
        <Header />
      </div>
      <main>{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}
