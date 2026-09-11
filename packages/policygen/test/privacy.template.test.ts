import fs from "node:fs";
import path from "node:path";
import ejs from "ejs";
import i18next from "i18next";
import { beforeAll, describe, expect, test } from "vitest";
import en from "../src/locales/en";
import { getCssStyles } from "../src/utils/renderTemplate";

describe("privacy.html.ejs template", () => {
  let template: string;
  let t: typeof i18next.t;

  beforeAll(async () => {
    const templatePath = path.resolve(
      __dirname,
      "../templates/privacy.html.ejs",
    );
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
    privacy: {
      privacyEmail: "privacy@test.com",
      platforms: ["web"],
      locations: ["us"],
      socialSignIn: false,
      personalInformation: ["name", "email"],
      sensitiveInformation: [],
      thirdPartyData: [],
      paymentData: false,
      paymentProcessors: [],
      appUsageData: false,
      thirdPartyDisclosure: false,
      thirdPartyDisclosureEntities: [],
      thirdPartySharing: false,
      thirdPartySharingEntities: [],
      securityMeasures: true,
      webTracking: false,
      thirdPartyAnalytics: false,
      serviceRequirements: [],
      legalBasis: [],
      usStatePrivacyLaws: false,
      dpo: false,
      cpraCompliance: false,
      vcdpaCompliance: false,
      cookieConsent: false,
      dataBreachNotification: false,
      crossBorderTransfers: false,
      coppaCompliance: false,
    },
  };

  test("renders basic privacy policy without errors", async () => {
    const css = getCssStyles("tailwind");
    const rendered = await ejs.render(template, {
      css,
      t,
      config: baseConfig,
      updated: "January 1, 2025",
    });

    expect(rendered).toContain("Privacy Policy");
    expect(rendered).toContain("privacy@test.com");
    expect(rendered).toContain("Test Corp");
  });

  test("includes payment processors when configured", async () => {
    const css = getCssStyles("tailwind");
    const configWithPayment = {
      ...baseConfig,
      privacy: {
        ...baseConfig.privacy,
        paymentData: true,
        paymentProcessors: [
          "https://stripe.com/privacy",
          "https://paypal.com/privacy",
        ],
      },
    };

    const rendered = await ejs.render(template, {
      css,
      t,
      config: configWithPayment,
      updated: "January 1, 2025",
    });

    expect(rendered).toContain("https://stripe.com/privacy");
    expect(rendered).toContain("https://paypal.com/privacy");
  });

  test("includes CPRA section when enabled", async () => {
    const css = getCssStyles("tailwind");
    const configWithCpra = {
      ...baseConfig,
      privacy: { ...baseConfig.privacy, cpraCompliance: true },
    };

    const rendered = await ejs.render(template, {
      css,
      t,
      config: configWithCpra,
      updated: "January 1, 2025",
    });

    expect(rendered).toContain("section-cpra");
    expect(rendered).toContain("California Privacy Rights Act");
  });

  test("includes VCDPA section when enabled", async () => {
    const css = getCssStyles("tailwind");
    const configWithVcdpa = {
      ...baseConfig,
      privacy: { ...baseConfig.privacy, vcdpaCompliance: true },
    };

    const rendered = await ejs.render(template, {
      css,
      t,
      config: configWithVcdpa,
      updated: "January 1, 2025",
    });

    expect(rendered).toContain("section-vcdpa");
    expect(rendered).toContain("Virginia Consumer Data Protection Act");
  });

  test("includes cookie consent section when enabled", async () => {
    const css = getCssStyles("tailwind");
    const configWithCookies = {
      ...baseConfig,
      privacy: {
        ...baseConfig.privacy,
        cookieConsent: true,
        cookieConsentProvider: "OneTrust",
      },
    };

    const rendered = await ejs.render(template, {
      css,
      t,
      config: configWithCookies,
      updated: "January 1, 2025",
    });

    expect(rendered).toContain("section-cookie-consent");
    expect(rendered).toContain("OneTrust");
  });

  test("includes data breach section when enabled", async () => {
    const css = getCssStyles("tailwind");
    const configWithBreach = {
      ...baseConfig,
      privacy: {
        ...baseConfig.privacy,
        dataBreachNotification: true,
        dataBreachTimeframe: "72 hours",
      },
    };

    const rendered = await ejs.render(template, {
      css,
      t,
      config: configWithBreach,
      updated: "January 1, 2025",
    });

    expect(rendered).toContain("section-data-breach");
    expect(rendered).toContain("72 hours");
  });

  test("includes cross-border transfers section when enabled", async () => {
    const css = getCssStyles("tailwind");
    const configWithTransfers = {
      ...baseConfig,
      privacy: {
        ...baseConfig.privacy,
        crossBorderTransfers: true,
        transferMechanisms: ["scc", "adequacy"],
      },
    };

    const rendered = await ejs.render(template, {
      css,
      t,
      config: configWithTransfers,
      updated: "January 1, 2025",
    });

    expect(rendered).toContain("section-cross-border-transfers");
  });

  test("includes COPPA section when enabled", async () => {
    const css = getCssStyles("tailwind");
    const configWithCoppa = {
      ...baseConfig,
      privacy: {
        ...baseConfig.privacy,
        coppaCompliance: true,
        childrenMinAge: 13,
      },
    };

    const rendered = await ejs.render(template, {
      css,
      t,
      config: configWithCoppa,
      updated: "January 1, 2025",
    });

    expect(rendered).toContain("section-coppa");
  });

  test("renders only configured AI handling claims", async () => {
    const css = getCssStyles("tailwind");
    const configWithAi = {
      ...baseConfig,
      privacy: {
        ...baseConfig.privacy,
        aiUsage: {
          providers: ["openai"],
          usedFor: ["Summarizing support requests"],
          dataHandling: "Requests are retained for up to 30 days.",
          automatedDecisions: "AI suggests routing; a person makes the decision.",
        },
      },
    };

    const rendered = await ejs.render(template, {
      css,
      t,
      config: configWithAi,
      updated: "January 1, 2025",
    });

    expect(rendered).toContain("section-ai-usage");
    expect(rendered).toContain("OpenAI API");
    expect(rendered).toContain("Summarizing support requests");
    expect(rendered).toContain("Requests are retained for up to 30 days.");
    expect(rendered).toContain(
      "AI suggests routing; a person makes the decision.",
    );
    expect(rendered).not.toContain("no-training terms");
  });

  test("renders readable labels for camelCase data identifiers", async () => {
    const rendered = await ejs.render(template, {
      css: getCssStyles("tailwind"),
      t,
      config: {
        ...baseConfig,
        privacy: {
          ...baseConfig.privacy,
          personalInformation: ["ipAddress"],
          sensitiveInformation: ["criminalHistory"],
          thirdPartyData: ["socialMedia"],
        },
      },
      updated: "January 1, 2025",
    });

    expect(rendered).toContain("IP Address");
    expect(rendered).toContain("Criminal or legal history");
    expect(rendered).toContain("Social Media data");
    expect(rendered).not.toContain(">ipAddress<");
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
});
