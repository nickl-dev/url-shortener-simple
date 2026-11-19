import { useState, useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks";
import { shorten } from "./store/urlSlice";
import { Spinner } from "./components/Spinner";

function App() {
  const [url, setUrl] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { shortUrl, posting, postError } = useAppSelector((state) => state.url);

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url.trim()) return;
    setCopied(false);
    dispatch(shorten(url.trim()));
  };

  const copy = async () => {
    if (!shortUrl) return;
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main className="bg-slate-50 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-lg animate-fade-in">
        <h1 className="font-agbalumo text-3xl font-semibold tracking-tight text-slate-900 text-center">
          Shorten a link
        </h1>
        <p className="mt-2 text-center text-slate-500">
          Paste a long URL, get a short one.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-8 flex gap-2 rounded-xl bg-white p-2 shadow-sm ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-indigo-500"
        >
          <input
            data-testid="url-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/very/long/url"
            className="flex-1 bg-transparent px-3 py-2 text-slate-900 placeholder:text-slate-400 outline-none"
          />
          <button
            data-testid="submit-button"
            type="submit"
            disabled={posting}
            className="inline-grid place-items-center [grid-template-areas:'stack'] focus-visible:bg-indigo-700 focus-visible:outline-orange-500  cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-500 disabled:opacity-50"
          >
            <div
              className={`[grid-area:stack] ${posting ? "invisible" : "visible"}`}
            >
              Shorten
            </div>
            <div
              className={`[grid-area:stack] ${posting ? "visible" : "invisible"} `}
            >
              <Spinner />
            </div>
          </button>
        </form>

        {postError && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 ring-1 ring-red-200">
            {postError}
          </p>
        )}

        {shortUrl && !postError && (
          <div className="text-xl font-extrabold flex items-center justify-center animate-bounce mt-4">
            &#8595;
          </div>
        )}

        {shortUrl && !postError && (
          <div className="mt-2 flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="truncate font-medium text-indigo-600 hover:underline"
            >
              {shortUrl}
            </a>
            <button
              onClick={copy}
              className="cursor-pointer shrink-0 rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
