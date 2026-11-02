import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WhoIUsed from "@/components/WhoIUsed";
import type { Business } from "@/components/WhoIUsed";

const ITEMS: Business[] = [
  {
    name: "A neighbourhood florist",
    does: "Weekly stems for the kitchen table.",
    link: "https://florist.example.com",
    note: "Ordered every Friday for a year.",
  },
  {
    name: "The moving company",
    does: "Packed and shipped the whole flat.",
    link: "/resources",
  },
];

const renderDirectory = (props = {}) =>
  render(
    <MemoryRouter>
      <WhoIUsed items={ITEMS} {...props} />
    </MemoryRouter>,
  );

describe("WhoIUsed", () => {
  it("renders one row per business with its name, what it does and note", () => {
    renderDirectory();
    expect(screen.getByText("A neighbourhood florist")).toBeTruthy();
    expect(screen.getByText("Weekly stems for the kitchen table.")).toBeTruthy();
    expect(screen.getByText("Ordered every Friday for a year.")).toBeTruthy();
    expect(screen.getByText("The moving company")).toBeTruthy();
    expect(screen.getByText("Packed and shipped the whole flat.")).toBeTruthy();
  });

  it("opens external links in a new tab with a sponsored rel", () => {
    renderDirectory();
    const visit = screen.getByText("A neighbourhood florist")
      .closest("li")!
      .querySelector("a")!;
    expect(visit.getAttribute("href")).toBe("https://florist.example.com");
    expect(visit.getAttribute("target")).toBe("_blank");
    const rel = visit.getAttribute("rel") ?? "";
    expect(rel).toContain("noopener");
    expect(rel).toContain("noreferrer");
    expect(rel).toContain("sponsored");
  });

  it("keeps internal links in the same tab without a sponsored rel", () => {
    renderDirectory();
    const visit = screen.getByText("The moving company")
      .closest("li")!
      .querySelector("a")!;
    expect(visit.getAttribute("href")).toBe("/resources");
    expect(visit.getAttribute("target")).toBeNull();
    expect(visit.getAttribute("rel")).toBeNull();
  });

  it("uses a default Visit label and accepts an editable one", () => {
    renderDirectory();
    expect(screen.getAllByText("Visit")).toHaveLength(2);
    renderDirectory({ linkLabel: "See their work" });
    expect(screen.getAllByText("See their work")).toHaveLength(2);
  });

  it("renders optional heading, subheading and eyebrow", () => {
    renderDirectory({
      eyebrow: "Who I Used",
      heading: "People and places I actually paid for",
      subheading: "No one asked to be here.",
    });
    expect(screen.getByText("Who I Used")).toBeTruthy();
    expect(
      screen.getByText("People and places I actually paid for"),
    ).toBeTruthy();
    expect(screen.getByText("No one asked to be here.")).toBeTruthy();
  });

  it("renders nothing when the list is empty", () => {
    const { container } = render(
      <MemoryRouter>
        <WhoIUsed items={[]} />
      </MemoryRouter>,
    );
    expect(container.innerHTML).toBe("");
  });
});
