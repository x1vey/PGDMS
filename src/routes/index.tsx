import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Rajan Iyer — Leadership Portfolio · March 2026" },
      {
        name: "description",
        content:
          "PDGMS monthly leadership portfolio for Rajan Iyer, Production Planning Lead — Sterile Injectables.",
      },
    ],
  }),
});

function Index() {
  return (
    <iframe
      src="/portfolio/index.html"
      title="Rajan Iyer — Leadership Portfolio"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        border: "none",
      }}
    />
  );
}
