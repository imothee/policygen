import fs from "node:fs";
import path from "node:path";
import ejs from "ejs";
import i18next from "i18next";
import { beforeAll, describe, expect, test } from "vitest";
import en from "../src/locales/en";
import { getCssStyles } from "../src/utils/renderTemplate";

describe("terms.html.ejs template", () => {
  let template: string;
  let t: typeof i18next.t;

  beforeAll(async () => {
    const templatePath = path.resolve(__dirname, "../templates/terms.html.ejs");
    template = fs.readFileSync(templatePath, "utf-8");

    await i18next.init({
      fallbackLng: "en",
      interpolation: { escapeValue: true },
      resources: { en },
    });
    t = i18next.t.bind(i18next);
  });

  const baseConfig = {
    entity: {
      name: "Test Corp",
      website: "https://test.com",
      address: "123 Main St",
    },
    output: { fileType: "html", cssFramework: "tailwind", locales: ["en"] },
    terms: {
      supportEmail: "support@test.com",
      underEighteen: false,
      underThirteen: false,
      purchasableGoods: false,
      subscription: false,
      freeTrial: false,
      autoRenew: false,
      refundPolicy: "none",
      userContent: false,
      userContentLicense: false,
      userAccounts: true,
      governingLaw: "California",
      disputeResolution: "litigation",
      mediation: false,
      prohibitedUses: ["illegal", "harmful"],
      serviceSLA: false,
      liabilityLimitation: true,
      liabilityLimitationType: "amount_paid",
      liabilityLimitationTimeframe: "6 months",
      liabilityLimitationAmount: 0,
      forceMajeure: true,
      dmcaTakedown: false,
      taxLiability: false,
    },
  };

  test("renders basic terms of service without errors", async () => {
    const css = getCssStyles("tailwind");
    const rendered = await ejs.render(template, {
      css,
      t,
      config: baseConfig,
      updated: "January 1, 2025",
    });

    expect(rendered).toContain("Terms of Service");
    expect(rendered).toContain("support@test.com");
    expect(rendered).toContain("Test Corp");
  });

  test("includes force majeure section when enabled", async () => {
    const css = getCssStyles("tailwind");
    const rendered = await ejs.render(template, {
      css,
      t,
      config: baseConfig,
      updated: "January 1, 2025",
    });

    expect(rendered).toContain("section-force-majeure");
    expect(rendered).toContain("Force Majeure");
  });

  test("excludes force majeure section when disabled", async () => {
    const css = getCssStyles("tailwind");
    const configWithoutForceMajeure = {
      ...baseConfig,
      terms: { ...baseConfig.terms, forceMajeure: false },
    };

    const rendered = await ejs.render(template, {
      css,
      t,
      config: configWithoutForceMajeure,
      updated: "January 1, 2025",
    });

    expect(rendered).not.toContain("section-force-majeure");
  });

  test("includes DMCA section when enabled", async () => {
    const css = getCssStyles("tailwind");
    const configWithDmca = {
      ...baseConfig,
      terms: {
        ...baseConfig.terms,
        dmcaTakedown: true,
        dmcaEmail: "dmca@test.com",
      },
    };

    const rendered = await ejs.render(template, {
      css,
      t,
      config: configWithDmca,
      updated: "January 1, 2025",
    });

    expect(rendered).toContain("section-dmca");
    expect(rendered).toContain("dmca@test.com");
    expect(rendered).toContain("DMCA");
  });

  test("includes tax liability section when enabled", async () => {
    const css = getCssStyles("tailwind");
    const configWithTax = {
      ...baseConfig,
      terms: {
        ...baseConfig.terms,
        taxLiability: true,
        taxJurisdiction: "United States",
      },
    };

    const rendered = await ejs.render(template, {
      css,
      t,
      config: configWithTax,
      updated: "January 1, 2025",
    });

    expect(rendered).toContain("section-tax-liability");
    expect(rendered).toContain("Tax Liability");
  });

  test("includes subscription sections when enabled", async () => {
    const css = getCssStyles("tailwind");
    const configWithSubscription = {
      ...baseConfig,
      terms: {
        ...baseConfig.terms,
        subscription: true,
        freeTrial: true,
        autoRenew: true,
        refundPolicy: "prorata",
      },
    };

    const rendered = await ejs.render(template, {
      css,
      t,
      config: configWithSubscription,
      updated: "January 1, 2025",
    });

    expect(rendered).toContain("section-subscriptions");
  });

  test("renders a readable account-transfer prohibition", async () => {
    const rendered = await ejs.render(template, {
      css: getCssStyles("tailwind"),
      t,
      config: {
        ...baseConfig,
        terms: { ...baseConfig.terms, prohibitedUses: ["accountTransfer"] },
      },
      updated: "January 1, 2025",
    });

    expect(rendered).toContain(
      "You must not transfer your account to another party without our consent.",
    );
    expect(rendered).not.toContain(">accountTransfer<");
  });

  test("HTML tags are properly closed", async () => {
    const css = getCssStyles("tailwind");
    const rendered = await ejs.render(template, {
      css,
      t,
      config: baseConfig,
      updated: "January 1, 2025",
    });

    // Check that h2 tags are closed with h2, not h1
    const h2OpenCount = (rendered.match(/<h2/g) || []).length;
    const h2CloseCount = (rendered.match(/<\/h2>/g) || []).length;
    expect(h2OpenCount).toBe(h2CloseCount);

    // Check no mismatched h1 closings
    const h1CloseWithoutOpen = rendered.match(/<\/h1>/g);
    const h1Open = rendered.match(/<h1/g) || [];
    expect(h1CloseWithoutOpen?.length || 0).toBe(h1Open.length);
  });

  test("prohibited uses are rendered correctly", async () => {
    const css = getCssStyles("tailwind");
    const rendered = await ejs.render(template, {
      css,
      t,
      config: baseConfig,
      updated: "January 1, 2025",
    });

    expect(rendered).toContain("section-prohibited-use");
  });
});
