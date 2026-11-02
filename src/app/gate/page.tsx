// XGL directive 2026-11-02 msg 9007 : PIN gate for staging site.
// Clean, dark, KinetiKx-brand (red accent, Oswald/Raleway families already loaded).

export const metadata = { title: "Access — KinetiKx", robots: { index: false, follow: false } };

export default async function GatePage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; e?: string }>;
}) {
  const sp = await searchParams;
  const errored = sp.e === "1";
  const from = sp.from || "/";
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#0a0a0a",
          color: "#f7f7f5",
          fontFamily:
            "'Raleway', system-ui, -apple-system, 'Segoe UI', sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <main
          style={{
            maxWidth: 420,
            width: "100%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Oswald', system-ui, sans-serif",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "#a4161a",
              marginBottom: 18,
            }}
          >
            Staging · Private preview
          </div>
          <h1
            style={{
              fontFamily: "'Oswald', system-ui, sans-serif",
              fontSize: 44,
              fontWeight: 300,
              letterSpacing: "-0.01em",
              margin: "0 0 12px",
            }}
          >
            KinetiKx
          </h1>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: "#f7f7f5b8",
              margin: "0 0 32px",
            }}
          >
            This preview is access-restricted. Enter the PIN provided by Xavier
            to continue.
          </p>
          <form
            action="/api/gate"
            method="POST"
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            <input type="hidden" name="from" value={from} />
            <input
              type="password"
              name="pin"
              autoComplete="off"
              autoFocus
              inputMode="numeric"
              placeholder="•••••••"
              required
              style={{
                background: "#141414",
                border: "1px solid #ffffff22",
                color: "#f7f7f5",
                fontFamily: "'Oswald', system-ui, sans-serif",
                fontSize: 20,
                letterSpacing: "0.3em",
                textAlign: "center",
                padding: "16px 20px",
                borderRadius: 8,
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                background: "#a4161a",
                color: "#f7f7f5",
                border: 0,
                padding: "14px 20px",
                borderRadius: 8,
                fontFamily: "'Oswald', system-ui, sans-serif",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Enter
            </button>
          </form>
          {errored ? (
            <div
              style={{
                marginTop: 18,
                fontSize: 13,
                color: "#a4161a",
                fontFamily: "'Oswald', system-ui, sans-serif",
                letterSpacing: "0.08em",
              }}
            >
              Wrong PIN. Try again.
            </div>
          ) : null}
          <div
            style={{
              marginTop: 36,
              fontFamily: "'Oswald', system-ui, sans-serif",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "#f7f7f566",
            }}
          >
            noindex · nofollow · preview environment
          </div>
        </main>
      </body>
    </html>
  );
}
