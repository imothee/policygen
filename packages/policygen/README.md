# PolicyGen

Generate privacy and terms of service policies for your website or app. Define your policy config once in JSON, then generate well-structured HTML or Astro pages automatically.

[Documentation](https://policygen.xyz) | [GitHub](https://github.com/cosmicglue-io/policygen)

---

## Quick Start

### Installation

```bash
npm install --save-dev policygen
```

Or use directly with `npx`:

```bash
npx policygen init
```

### Configuration

Create a `policygen.json` config file in your project root:

```bash
npx policygen init
```

The `init` wizard walks you through policy-related questions. Pass `--default` to emit a blank config file instead.

The config file uses a [JSON schema](https://policygen.xyz/schemas/0.7/schema.json) for editor autocompletion:

```json
{
  "$schema": "https://policygen.xyz/schemas/0.7/schema.json",
  "output": {
    "fileType": "html",
    "cssFramework": "classes",
    "locales": ["en"],
    "privacyFilePath": "./privacy.html",
    "termsFilePath": "./terms.html"
  },
  "entity": { "name": "Acme Inc.", "website": "https://acme.com", "address": "..." },
  "privacy": { ... },
  "terms": { ... }
}
```

### Generation

```bash
# Generate all policies
npx policygen generate

# Generate only privacy policy
npx policygen generate:privacy

# Generate only terms of service
npx policygen generate:terms
```

---

## Features

### Output Formats

- **HTML** — standalone HTML pages with configurable CSS framework support (plain classes, Tailwind, DaisyUI)
- **Astro** — `.astro` component files with optional layout wrapping and prop passing
- **Astro shells** — optional nested shell components for shared navigation and footer chrome

### Privacy Policy

Covers a wide range of compliance requirements:

- **Platform support** — web, mobile, desktop, and browser extensions
- **Browser extension disclosures** — permissions, host permissions, data collected, local vs. remote processing
- **AI disclosures** — providers, product uses, operator-supplied data handling, and automated decisions
- **Regulatory compliance** — GDPR, CCPA/CPRA, VCDPA, COPPA
- **Cookie consent** — consent mechanisms with named provider support
- **Cross-border transfers** — SCCs, BCRs, adequacy decisions
- **Data breach notification** — configurable notification timeframes
- **Data Protection Officer** — DPO contact details
- **Third-party sharing and disclosure** — analytics, advertising, processors

### Terms of Service

- **Subscriptions & billing** — auto-renewal, free trials, refund policies (none/full/prorated)
- **User content** — content licensing, DMCA takedown procedures
- **Liability & disputes** — liability caps, arbitration vs. litigation, mediation, governing law
- **Service SLA** — uptime targets, measurement timeframes, SLA refund types
- **Force majeure** — protection against events beyond your control
- **Tax liability** — jurisdiction-specific tax disclaimers
- **Prohibited uses** — crawling, spam, impersonation, illegal activity, and more

---

## Documentation

For full configuration reference and advanced usage, visit [policygen.xyz](https://policygen.xyz).

## Sponsors

PolicyGen is published and maintained by [CosmicGlue](https://cosmicglue.io).

## License

MIT
