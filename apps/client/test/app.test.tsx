import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { Provider } from "react-redux";
import { vi, describe, it, expect, afterEach } from "vitest";
import { store } from "../src/store/index";
import App from "../src/App";

let user: UserEvent;

const setup = () => {
  user = userEvent.setup();

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

afterEach(() => vi.restoreAllMocks());

describe("app", () => {
  it("shows the short URL on success", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ shortUrl: "http://localhost:3000/abc1234" })
    } as Response);

    setup();

    await userEvent.type(
      screen.getByTestId("url-input"),
      "https://example.com"
    );
    await userEvent.click(screen.getByTestId("submit-button"));

    expect(
      await screen.findByText("http://localhost:3000/abc1234")
    ).toBeTruthy();
  });

  it("shows an error on failure", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Invalid URL" })
    } as Response);

    setup();

    await userEvent.type(screen.getByTestId("url-input"), "bad");
    await userEvent.click(screen.getByTestId("submit-button"));

    expect(await screen.findByText("Invalid URL")).toBeTruthy();
  });

  it("copies URL to clipboard", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ shortUrl: "http://localhost:3000/abc1234" })
    } as Response);

    setup();

    await userEvent.type(
      screen.getByTestId("url-input"),
      "https://example.com"
    );
    await userEvent.click(screen.getByTestId("submit-button"));

    const copyButton = screen.getByTestId("copy-button");
    await user.click(copyButton);
    const clipboardText = await navigator.clipboard.readText();
    expect(clipboardText).toBe("http://localhost:3000/abc1234");
  });
});
