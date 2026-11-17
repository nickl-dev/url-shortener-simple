import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks";
import { shorten } from "./store/urlSlice";

function App() {
  const [url, setUrl] = useState("");
  const dispatch = useAppDispatch();
  const { shortUrl, loading, error } = useAppSelector((state) => state.url);

  return (
    <>
      <main>
        <h1>URL Shortener</h1>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
        <button disabled={loading} onClick={() => dispatch(shorten(url))}>
          Shorten
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {shortUrl && (
          <p>
            <a href={shortUrl}>{shortUrl}</a>
          </p>
        )}
      </main>
    </>
  );
}

export default App;
