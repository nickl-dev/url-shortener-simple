import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { vi, it, expect, afterEach } from "vitest";
import { store } from "../src/store/index";
import App from "../src/App";

const setup = () => {
  <Provider store={store}>
    <App />
  </Provider>;
};

afterEach(() => vi.restoreAllMocks());

it("shows the short URL on success", async () => {
  vi.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: async () => ({ shortUrl: "http://localhost:3000/abc1234" })
  } as Response);

  setup();

  await userEvent.type(screen.getByTestId("url-input"), "https://example.com");
  await userEvent.click(
    screen.getByTestId("submit-button", { name: /shorten/i })
  );

  expect(await screen.findByText("http://localhost:3000/abc1234")).toBeTruthy();
});
