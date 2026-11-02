import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CalloutCard from "@/components/CalloutCard";

const renderCard = (props = {}) =>
  render(
    <MemoryRouter>
      <CalloutCard
        heading="Sort Your Coverage Before You Fly"
        body="A long stay needs different coverage than a vacation."
        buttonLabel="Get a SafetyWing quote for a long stay"
        buttonLink="#"
        {...props}
      />
    </MemoryRouter>,
  );

describe("CalloutCard", () => {
  it("renders the editable heading and body", () => {
    renderCard();
    expect(screen.getByText("Sort Your Coverage Before You Fly")).toBeTruthy();
    expect(screen.getByText("A long stay needs different coverage than a vacation.")).toBeTruthy();
  });

  it("renders the editable button label", () => {
    renderCard();
    expect(screen.getByText("Get a SafetyWing quote for a long stay")).toBeTruthy();
  });

  it("treats # as an editable placeholder, not a destination", () => {
    renderCard();
    const button = screen.getByText("Get a SafetyWing quote for a long stay");
    expect(button.getAttribute("href")).toBe("#");
    expect(button.getAttribute("data-placeholder-link")).toBe("");
    expect(button.getAttribute("target")).toBeNull();
    expect(button.getAttribute("rel")).toBeNull();
  });

  it("uses the site's existing gold button style", () => {
    renderCard();
    expect(screen.getByText("Get a SafetyWing quote for a long stay").className).toContain("btn-gold");
  });

  it("routes internal paths through the router in the same tab", () => {
    renderCard({ buttonLink: "/resources/banking-and-money-guide" });
    const button = screen.getByText("Get a SafetyWing quote for a long stay");
    expect(button.getAttribute("href")).toBe("/resources/banking-and-money-guide");
    expect(button.getAttribute("target")).toBeNull();
    expect(button.getAttribute("data-placeholder-link")).toBeNull();
  });

  it("opens external links in a new tab", () => {
    renderCard({ buttonLink: "https://example.com/quote" });
    const button = screen.getByText("Get a SafetyWing quote for a long stay");
    expect(button.getAttribute("href")).toBe("https://example.com/quote");
    expect(button.getAttribute("target")).toBe("_blank");
    expect(button.getAttribute("rel")).toContain("noopener");
    expect(button.getAttribute("data-placeholder-link")).toBeNull();
  });

  it("is full width on mobile and shrinks from tablet up", () => {
    renderCard();
    const classes = screen.getByText("Get a SafetyWing quote for a long stay").className;
    expect(classes).toContain("w-full");
    expect(classes).toContain("sm:w-auto");
    expect(classes).toContain("justify-center");
  });

  it("renders no button when label or link is omitted", () => {
    renderCard({ buttonLink: undefined });
    expect(screen.queryByText("Get a SafetyWing quote for a long stay")).toBeNull();
  });
});
