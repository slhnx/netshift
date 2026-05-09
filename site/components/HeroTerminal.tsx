import { Prompt, TerminalWindow, c } from "@/components/Terminal";

export function HeroTerminal() {
  return (
    <TerminalWindow title="netshift demo">
      <Prompt>
        <span className={c.cmd}>ns</span> <span className={c.flag}>get</span>{" "}
        <span className={c.str}>https://httpbin.org/json</span>
      </Prompt>
      <div className="rounded-lg border border-border bg-background/5 p-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="rounded border border-border px-1.5 py-0.5 text-term-green">
            200 OK
          </span>
          <span className={c.dim}>91 ms</span>
          <span className={c.dim}>·</span>
          <span className={c.dim}>1.2 KB</span>
        </div>
        <pre className="mt-3 overflow-x-auto text-[12px] text-zinc-300">
          {`{
  "slideshow": {
    "title": "Sample response",
    "author": "NetShift"
  }
}`}
        </pre>
      </div>
      <div className="text-sm text-zinc-300">
        <span className={c.ok}>saved</span> as{" "}
        <span className={c.key}>demo-request</span>
      </div>
    </TerminalWindow>
  );
}
