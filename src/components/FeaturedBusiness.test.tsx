import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FeaturedBusiness from "@/components/FeaturedBusiness";

const BASE = {
  name: "A pottery studio in Lavapiés",
  description: "They fired the plates I eat off every morning.",
  link: "https://studio.example.com",
};

const renderCard = (props = {}) =>
  render(
    <MemoryRouter>
      <FeaturedBusiness {...BASE} {...props} />
    </MemoryRouter>,
  );

const linkIn = (container: HTMLElement) =>
  container.querySelector("article a") as HTMLAnchorElement;

describe("FeaturedBusiness", () => {
  it("renders editable name, description and link", () => {
    const { container } = renderCard();
    expect(screen.getByText("A pottery studio in Lavapiés")).toBeTruthy();
    expect(
      screen.getByText("They fired the plates I eat off every morning."),
    ).toBeTruthy();
    expect(linkIn(container).getAttribute("href")).toBe(
      "https://studio.example.com",
    );
  });

  it("hides the partnership label unless paidPartnership is true", () => {
    const { container } = renderCard();
    expect(screen.queryByText("Paid partnership")).toBeNull();
    expect(container.querySelector("[data-partnership-label]")).toBeNull();

    const paid = renderCard({ paidPartnership: true });
    expect(
      paid.container.querySelector("[data-partnership-label]")?.textContent,
    ).toBe("Paid partnership");
  });

  it("accepts an editable partnership label", () => {
    const { container } = renderCard({
      paidPartnership: true,
      partnershipLabel: "Sponsored",
    });
    expect(
      container.querySelector("[data-partnership-label]")?.textContent,
    ).toBe("Sponsored");
    expect(screen.queryByText("Paid partnership")).toBeNull();
  });

  it("adds a sponsored rel for paid partners and a plain rel otherwise", () => {
    const plain = renderCard();
    expect(linkIn(plain.container).getAttribute("rel")).toBe(
      "noopener noreferrer",
    );

    const paid = renderCard({ paidPartnership: true });
    expect(linkIn(paid.container).getAttribute("rel")).toBe(
      "noopener noreferrer sponsored",
    );
  });

  it("keeps internal links in the same tab", () => {
    const { container } = renderCard({ link: "/resources" });
    const visit = linkIn(container);
    expect(visit.getAttribute("href")).toBe("/resources");
    expect(visit.getAttribute("target")).toBeNull();
  });

  it("accepts editable button label and photo", () => {
    const { container } = renderCard({
      buttonLabel: "Book a class",
      photo: "/studio.jpg",
    });
    expect(linkIn(container).textContent).toBe("Book a class");
    expect(screen.queryByText("Visit")).toBeNull();
    expect(screen.getByAltText("A pottery studio in Lavapiés")).toBeTruthy();
  });

  it("stretches full width on mobile", () => {
    const { container } = renderCard();
    const card = container.querySelector("article")!;
    const button = linkIn(container);
    expect(card.className).toContain("w-full");
    expect(button.className).toContain("w-full");
  });
});
