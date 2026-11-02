import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ShopThisList from "@/components/ShopThisList";
import type { Product } from "@/components/ProductCard";

const ITEMS: Product[] = [
  {
    photo: "/photo-one.jpg",
    name: "Ceramic breakfast plate",
    why: "The blue plate I use every morning.",
    link: "https://shop.example.com/plate",
  },
  {
    photo: "/photo-two.jpg",
    name: "Move abroad roadmap",
    why: "The checklist I wish I had started with.",
    link: "/resources",
  },
];

const renderList = (props = {}) =>
  render(
    <MemoryRouter>
      <ShopThisList items={ITEMS} {...props} />
    </MemoryRouter>,
  );

describe("ShopThisList / ProductCard", () => {
  it("renders one card per item with its name and one-line why", () => {
    renderList();
    expect(screen.getByText("Ceramic breakfast plate")).toBeTruthy();
    expect(screen.getByText("The blue plate I use every morning.")).toBeTruthy();
    expect(screen.getByText("Move abroad roadmap")).toBeTruthy();
    expect(screen.getByText("The checklist I wish I had started with.")).toBeTruthy();
  });

  it("opens external affiliate links in a new tab with a sponsored rel", () => {
    renderList();
    const shop = screen.getByText("Ceramic breakfast plate")
      .closest("article")!
      .querySelector("a")!;
    expect(shop.getAttribute("href")).toBe("https://shop.example.com/plate");
    expect(shop.getAttribute("target")).toBe("_blank");
    const rel = shop.getAttribute("rel") ?? "";
    expect(rel).toContain("noopener");
    expect(rel).toContain("noreferrer");
    expect(rel).toContain("sponsored");
  });

  it("keeps internal links in the same tab without a sponsored rel", () => {
    renderList();
    const shop = screen.getByText("Move abroad roadmap")
      .closest("article")!
      .querySelector("a")!;
    expect(shop.getAttribute("href")).toBe("/resources");
    expect(shop.getAttribute("target")).toBeNull();
    expect(shop.getAttribute("rel")).toBeNull();
  });

  it("shows the default button and affiliate labels", () => {
    renderList();
    expect(screen.getAllByText("Shop")).toHaveLength(2);
    expect(screen.getAllByText("Affiliate link")).toHaveLength(2);
  });

  it("accepts editable button and affiliate labels", () => {
    renderList({ buttonLabel: "Buy now", affiliateLabel: "Commission link" });
    expect(screen.getAllByText("Buy now")).toHaveLength(2);
    expect(screen.getAllByText("Commission link")).toHaveLength(2);
    expect(screen.queryByText("Shop")).toBeNull();
  });

  it("renders nothing when the list is empty", () => {
    const { container } = render(
      <MemoryRouter>
        <ShopThisList items={[]} />
      </MemoryRouter>,
    );
    expect(container.innerHTML).toBe("");
  });
});
