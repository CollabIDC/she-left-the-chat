import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CtaButton from "@/components/CtaButton";

const renderButton = (props = {}) =>
  render(
    <MemoryRouter>
      <CtaButton label="Read the guide" link="/resources" {...props} />
    </MemoryRouter>,
  );

describe("CtaButton", () => {
  it("uses the site's existing gold button style", () => {
    renderButton();
    const button = screen.getByText("Read the guide");
    expect(button.className).toContain("btn-gold");
  });

  it("uses the existing outline style when asked", () => {
    renderButton({ variant: "outline" });
    const button = screen.getByText("Read the guide");
    expect(button.className).toContain("btn-gold-outline");
    expect(button.className).not.toContain("btn-gold ");
  });

  it("renders internal paths through the router in the same tab", () => {
    renderButton();
    const button = screen.getByText("Read the guide");
    expect(button.tagName).toBe("A");
    expect(button.getAttribute("href")).toBe("/resources");
    expect(button.getAttribute("target")).toBeNull();
  });

  it("opens external links in a new tab", () => {
    renderButton({ link: "https://example.com/kit" });
    const button = screen.getByText("Read the guide");
    expect(button.getAttribute("href")).toBe("https://example.com/kit");
    expect(button.getAttribute("target")).toBe("_blank");
    expect(button.getAttribute("rel")).toContain("noopener");
    expect(button.getAttribute("rel")).toContain("noreferrer");
    expect(button.getAttribute("rel")).not.toContain("sponsored");
  });

  it("marks affiliate destinations as sponsored", () => {
    renderButton({ link: "https://example.com/kit", affiliate: true });
    const rel = screen.getByText("Read the guide").getAttribute("rel") ?? "";
    expect(rel).toContain("sponsored");
  });

  it("opens mailto in the same tab", () => {
    renderButton({ link: "mailto:hello@example.com" });
    const button = screen.getByText("Read the guide");
    expect(button.getAttribute("href")).toBe("mailto:hello@example.com");
    expect(button.getAttribute("target")).toBeNull();
  });

  it("is full width on mobile and shrinks from tablet up", () => {
    renderButton();
    const classes = screen.getByText("Read the guide").className;
    expect(classes).toContain("w-full");
    expect(classes).toContain("sm:w-auto");
    expect(classes).toContain("justify-center");
  });

  it("can opt out of full width on mobile", () => {
    renderButton({ fullWidthOnMobile: false });
    const classes = screen.getByText("Read the guide").className;
    expect(classes).not.toContain("w-full");
  });

  it("accepts an editable label and extra spacing classes", () => {
    renderButton({ label: "Get the roadmap", className: "mt-6" });
    expect(screen.getByText("Get the roadmap")).toBeTruthy();
    expect(screen.getByText("Get the roadmap").className).toContain("mt-6");
  });
});
