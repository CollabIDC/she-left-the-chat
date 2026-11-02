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

describe("FeaturedBusiness", () => {
  it("renders editable name, description and link", () => {
    renderCard();
    expect(screen.getByText("A pottery studio in Lavapiés")).toBeTruthy();
    expect(
      screen.getByText("They fired the plates I eat off every morning."),
    ).toBeTruthy();
    const visit = screen.getByText("Visit").closest("a")!;
    expect(visit.getAttribute("href")).toBe("https://studio.example.com");
  });

  it("hides the partnership label unless paidPartnership is true", () => {
    const { container } = renderCard();
    expect(screen.queryByText("Paid partnership")).toBeNull();
    expect(container.querySelector("[data-partnership-label]")).toBeNull();
    renderCard({ paidPartnership: true });
    expect(screen.getAllByText("Paid partnership").length).toBeGreaterThan(0);
  });

  it("accepts an editable partnership label", () => {
    renderCard({ paidPartnership: true, partnershipLabel: "Sponsored" });
    expect(screen.getByText("Sponsored")).toBeTruthy();
    expect(screen.queryByText("Paid partnership")).toBeNull();
  });

  it("adds a sponsored rel for paid partners and a plain rel otherwise", () => {
    renderCard();
    let rel = screen.getByText("Visit").closest("a")!.getAttribute("rel") ?? "";
    expect(rel).not.toContain("sponsored");
    renderCard({ paidPartnership: true });
    rel =
      screen
        .getAllByText("Visit")
        .find((el) => el.closest("a")?.getAttribute("target") === "_blank")!
        .closest("a")!
        .getAttribute("rel") ?? "";
    expect(rel).toContain("sponsored");
  });

  it("keeps internal links in the same tab", () => {
    renderCard({ link: "/resources" });
    const visit = screen.getByText("Visit").closest("a")!;
    expect(visit.getAttribute("href")).toBe("/resources");
    expect(visit.getAttribute("target")).toBeNull();
  });

  it("accepts editable button label and photo", () => {
    renderCard({ buttonLabel: "Book a class", photo: "/studio.jpg" });
    expect(screen.getByText("Book a class")).toBeTruthy();
    expect(screen.getByText("Visit")).toBeNull();
    expect(screen.getByAltText("A pottery studio in Lavapiés")).toBeTruthy();
  });

  it("stretches full width on mobile", () => {
    const { container } = renderCard();
    const card = container.querySelector("article")!;
    const button = card.querySelector("a")!;
    expect(card.className).toContain("w-full");
    expect(button.className).toContain("w-full");
  });
});
