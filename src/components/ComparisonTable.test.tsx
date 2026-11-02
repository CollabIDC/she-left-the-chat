import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ComparisonTable, {
  type ComparisonRow,
} from "@/components/ComparisonTable";

const renderTable = (props = {}) =>
  render(
    <MemoryRouter>
      <ComparisonTable {...props} />
    </MemoryRouter>,
  );

describe("ComparisonTable", () => {
  it("shows one row per provider in order: Jetpac, Holafly, Airalo, Saily", () => {
    renderTable();
    const names = screen.getAllByText("Jetpac")[0].closest("section")!;
    const order = ["Jetpac", "Holafly", "Airalo", "Saily"].map((n) =>
      names.textContent!.indexOf(n),
    );
    expect(order).toEqual([...order].sort((a, b) => a - b));
    expect(screen.getAllByText("Jetpac").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Holafly").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Airalo").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Saily").length).toBeGreaterThan(0);
  });

  it("ships every link as the editable '#' placeholder, with no invented URLs", () => {
    renderTable();
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("a"),
    ).filter((a) => a.textContent === "Shop");
    expect(links).toHaveLength(8); // 4 providers, one table row + one mobile card each
    links.forEach((a) => {
      expect(a.getAttribute("href")).toBe("#");
      expect(a.getAttribute("target")).toBeNull();
      expect(a.hasAttribute("data-placeholder-link")).toBe(true);
    });
  });

  it("leaves every comparison value blank until real figures are supplied", () => {
    renderTable();
    expect(screen.getAllByText("Add").length).toBe(40); // 4 rows x 5 columns x 2 layouts
  });

  it("lets one row's link be edited without touching the others", () => {
    const rows: ComparisonRow[] = [
      { name: "Jetpac", specs: {}, link: "https://jetpac.example" },
      { name: "Holafly", specs: {}, link: "#" },
      { name: "Airalo", specs: {}, link: "#" },
      { name: "Saily", specs: {}, link: "#" },
    ];
    renderTable({ rows });
    const jetpac = screen
      .getAllByText("Jetpac")[0]
      .closest("tr")!
      .querySelector("a")!;
    expect(jetpac.getAttribute("href")).toBe("https://jetpac.example");
    expect(jetpac.getAttribute("rel")).toContain("sponsored");
    const holafly = screen.getAllByText("Holafly")[0].closest("tr")!.querySelector("a")!;
    expect(holafly.getAttribute("href")).toBe("#");
    expect(holafly.getAttribute("rel")).toBeNull();
  });

  it("accepts editable specs, column labels and button labels", () => {
    const rows: ComparisonRow[] = [
      {
        name: "Jetpac",
        specs: { price: "Add real price", data: "Add real data" },
        link: "#",
        linkLabel: "Get eSIM",
      },
    ];
    renderTable({ rows });
    expect(screen.getAllByText("Get eSIM").length).toBe(2);
    expect(screen.getAllByText("Add real price").length).toBe(2);
    expect(screen.getAllByText("Add real data").length).toBe(2);
  });

  it("renders a stacked card list for phones and a table for tablet up", () => {
    renderTable();
    const section = document.querySelector("section")!;
    const cards = section.querySelector(".md\\:hidden");
    const table = section.querySelector(".md\\:block");
    expect(cards?.querySelectorAll("article")).toHaveLength(4);
    expect(table?.querySelector("table")).toBeTruthy();
  });

  it("renders nothing when there are no rows", () => {
    const { container } = renderTable({ rows: [] });
    expect(container.innerHTML).toBe("");
  });
});
