import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Stay22Embed from "@/components/Stay22Embed";

describe("Stay22Embed", () => {
  it("renders nothing when no snippet is supplied", () => {
    const { container } = render(<Stay22Embed />);
    expect(container.innerHTML).toBe("");
  });

  it("renders nothing when the snippet is blank", () => {
    const { container } = render(<Stay22Embed snippet="   " />);
    expect(container.innerHTML).toBe("");
  });

  it("injects the supplied snippet into a full-width host", () => {
    const { container } = render(
      <Stay22Embed snippet='<iframe src="https://stay22.example/embed"></iframe>' />,
    );
    const host = container.querySelector("[data-stay22-embed]") as HTMLElement;
    expect(host).toBeTruthy();
    expect(host.innerHTML).toContain("https://stay22.example/embed");
    expect(host.parentElement?.className).toContain("w-full");
  });

  it("re-creates snippet scripts so the embed can boot", () => {
    const { container } = render(
      <Stay22Embed snippet="<script>window.__stay22Loaded = true;</script>" />,
    );
    const host = container.querySelector("[data-stay22-embed]") as HTMLElement;
    expect(host.querySelector("script")).toBeTruthy();
  });

  it("accepts a heading and subheading without inventing any embed code", () => {
    render(
      <Stay22Embed
        snippet="<div>widget</div>"
        heading="Find a place to stay"
        subheading="Prices from partners I use."
      />,
    );
    expect(screen.getByText("Find a place to stay")).toBeTruthy();
    expect(screen.getByText("Prices from partners I use.")).toBeTruthy();
  });

  it("renders children when no snippet string is given", () => {
    const { container } = render(
      <Stay22Embed>
        <p>your own embed markup</p>
      </Stay22Embed>,
    );
    expect(screen.getByText("your own embed markup")).toBeTruthy();
    expect(container.querySelector("[data-stay22-embed]")).toBeTruthy();
  });
});
