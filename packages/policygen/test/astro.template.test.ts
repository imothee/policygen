import fs from "node:fs";
import path from "node:path";
import ejs from "ejs";
import i18next from "i18next";
import { beforeAll, describe, expect, it } from "vitest";
import {
  defaultEntityConfig,
  defaultOutputConfig,
  defaultPrivacyConfig,
  defaultTermsConfig,
  FileType,
  type PolicygenConfig,
} from "../src/config";
import en from "../src/locales/en";
import { getCssStyles } from "../src/utils/renderTemplate";

describe("Astro template rendering", () => {
  let privacyTemplate: string;
  let termsTemplate: string;
  let t: typeof i18next.t;

  beforeAll(async () => {
    const templateDir = path.join(__dirname, "../templates");
    privacyTemplate = fs.readFileSync(
      path.join(templateDir, "privacy.astro.ejs"),
      "utf-8",
    );
    termsTemplate = fs.readFileSync(
      path.join(templateDir, "terms.astro.ejs"),
      "utf-8",
    );

    await i18next.init({
      fallbackLng: "en",
      interpolation: { escapeValue: true },
      resources: { en },
    });
    t = i18next.t.bind(i18next);
  });

  const getBaseConfig = (): PolicygenConfig => ({
    output: {
      ...defaultOutputConfig,
      fileType: FileType.astro,
      privacyFilePath: "./privacy.astro",
      termsFilePath: "./terms.astro",
    },
    entity: {
      ...defaultEntityConfig,
      name: "Test Company",
      website: "https://test.com",
    },
    privacy: {
      ...defaultPrivacyConfig,
      privacyEmail: "privacy@test.com",
    },
    terms: {
      ...defaultTermsConfig,
      supportEmail: "support@test.com",
    },
  });

  const getRenderData = () => ({
    css: getCssStyles("daisyui"),
    t,
    updated: "January 1, 2024",
  });

  describe("Privacy template", () => {
    it("should render standalone HTML when no astroLayout is configured", () => {
      const rendered = ejs.render(privacyTemplate, {
        ...getRenderData(),
        config: getBaseConfig(),
      });

      expect(rendered).toContain("<!doctype html>");
      expect(rendered).toContain('<html lang="en">');
      expect(rendered).toContain("</body>");
      expect(rendered).toContain("</html>");
      expect(rendered).not.toContain("import Layout");
      expect(rendered).not.toContain("import Shell");
    });

    it("should render with Layout when astroLayout is configured", () => {
      const baseConfig = getBaseConfig();
      const configWithLayout: PolicygenConfig = {
        ...baseConfig,
        output: {
          ...baseConfig.output,
          astroLayout: {
            path: "~/layouts/Layout.astro",
            props: {
              useContainer: true,
              title: "Test",
            },
          },
        },
      };

      const rendered = ejs.render(privacyTemplate, {
        ...getRenderData(),
        config: configWithLayout,
      });

      expect(rendered).toContain('import Layout from "~/layouts/Layout.astro"');
      expect(rendered).toContain("<Layout");
      expect(rendered).toContain("useContainer={true}");
      expect(rendered).toContain('title="Test"');
      expect(rendered).toContain("</Layout>");
      expect(rendered).not.toContain("<!doctype html>");
    });

    it("should render Layout without props when props not specified", () => {
      const baseConfig = getBaseConfig();
      const configWithLayout: PolicygenConfig = {
        ...baseConfig,
        output: {
          ...baseConfig.output,
          astroLayout: {
            path: "~/layouts/Layout.astro",
          },
        },
      };

      const rendered = ejs.render(privacyTemplate, {
        ...getRenderData(),
        config: configWithLayout,
      });

      expect(rendered).toContain("<Layout>");
      expect(rendered).not.toContain("useContainer");
    });

    it("should render a shell inside the layout", () => {
      const baseConfig = getBaseConfig();
      const rendered = ejs.render(privacyTemplate, {
        ...getRenderData(),
        config: {
          ...baseConfig,
          output: {
            ...baseConfig.output,
            astroLayout: { path: "~/layouts/Layout.astro" },
            astroShell: {
              path: "~/components/MarketingShell.astro",
              props: { section: "legal" },
            },
          },
        },
      });

      expect(rendered).toContain(
        'import Shell from "~/components/MarketingShell.astro"',
      );
      expect(rendered.indexOf("<Layout>")).toBeLessThan(
        rendered.indexOf('<Shell section="legal">'),
      );
      expect(rendered.indexOf("</Shell>")).toBeLessThan(
        rendered.indexOf("</Layout>"),
      );
    });
  });

  describe("Terms template", () => {
    it("should render standalone HTML when no astroLayout is configured", () => {
      const rendered = ejs.render(termsTemplate, {
        ...getRenderData(),
        config: getBaseConfig(),
      });

      expect(rendered).toContain("<!doctype html>");
      expect(rendered).toContain('<html lang="en">');
      expect(rendered).toContain("</body>");
      expect(rendered).toContain("</html>");
      expect(rendered).not.toContain("import Layout");
    });

    it("should render with Layout when astroLayout is configured", () => {
      const baseConfig = getBaseConfig();
      const configWithLayout: PolicygenConfig = {
        ...baseConfig,
        output: {
          ...baseConfig.output,
          astroLayout: {
            path: "~/layouts/Main.astro",
            props: {
              showHeader: false,
              pageTitle: "Terms",
            },
          },
        },
      };

      const rendered = ejs.render(termsTemplate, {
        ...getRenderData(),
        config: configWithLayout,
      });

      expect(rendered).toContain('import Layout from "~/layouts/Main.astro"');
      expect(rendered).toContain("<Layout");
      expect(rendered).toContain("showHeader={false}");
      expect(rendered).toContain('pageTitle="Terms"');
      expect(rendered).toContain("</Layout>");
    });
  });
});
