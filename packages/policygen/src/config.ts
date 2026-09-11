export enum CSSFramework {
  tailwind = "tailwind",
  daisyui = "daisyui",
  classes = "classes",
}

export enum DisputeResolution {
  arbitration = "arbitration",
  litigation = "litigation",
}

export enum LegalBasis {
  advertising = "advertising",
  marketing = "marketing",
  analytics = "analytics",
  security = "security",
  fraudPrevention = "fraudPrevention",
}

export enum LiabilityLimitationType {
  amountPaid = "amount_paid",
  amount = "amount",
  minAmountPaidOrAmount = "minAmountPaidOrAmount",
}

export enum Locations {
  us = "us",
  eu = "eu",
  uk = "uk",
  other = "other",
}

export enum PersonalInformation {
  name = "name",
  email = "email",
  phone = "phone",
  address = "address",
  password = "password",
  ipAddress = "ipAddress",
  deviceId = "deviceId",
  creditCard = "creditCard",
  locationData = "locationData",
  anonymizedUsageData = "anonymizedUsageData",
}

export enum Platforms {
  web = "web",
  mobile = "mobile",
  desktop = "desktop",
  browserExtension = "browserExtension",
}

export enum BrowserExtensionPermission {
  activeTab = "activeTab",
  tabs = "tabs",
  storage = "storage",
  cookies = "cookies",
  history = "history",
  bookmarks = "bookmarks",
  downloads = "downloads",
  notifications = "notifications",
  clipboardRead = "clipboardRead",
  clipboardWrite = "clipboardWrite",
  geolocation = "geolocation",
  identity = "identity",
  webRequest = "webRequest",
  declarativeNetRequest = "declarativeNetRequest",
  scripting = "scripting",
  contextMenus = "contextMenus",
  alarms = "alarms",
}

export enum BrowserExtensionDataType {
  currentTabUrl = "currentTabUrl",
  browsingHistory = "browsingHistory",
  bookmarks = "bookmarks",
  formInput = "formInput",
  pageContent = "pageContent",
  cookies = "cookies",
  localStorage = "localStorage",
  credentials = "credentials",
}

export type BrowserExtensionConfig = {
  name: string;
  permissions: BrowserExtensionPermission[];
  hostPermissions: string[];
  dataCollected: BrowserExtensionDataType[];
  dataSentTo?: string;
  runsLocally: boolean;
  storeListingUrl?: string;
};

/**
 * AI / LLM provider used by the product. Values are stable identifiers
 * resolved against translation strings to render provider name + URL +
 * description. Add new providers here as they're adopted.
 */
export enum AiProvider {
  anthropic = "anthropic",
  awsBedrock = "awsBedrock",
  openai = "openai",
  azureOpenAi = "azureOpenAi",
  googleAi = "googleAi",
  vertexAi = "vertexAi",
  cohere = "cohere",
  mistral = "mistral",
  ollama = "ollama",
}

/**
 * AI usage disclosure block. Surfaces in privacy as a dedicated section
 * naming the providers data flows to, what AI is used for, and the
 * operator-supplied data-handling and automated-decision disclosures.
 */
export type AiUsageConfig = {
  /** AI providers user data may flow to */
  providers: AiProvider[];
  /** Free-text bullets for what AI is used for (e.g. "summarizing user inputs") */
  usedFor: string[];
  /** Factual description of data sent, retained, or used for training */
  dataHandling: string;
  /** Factual description of consequential automated decisions, when applicable */
  automatedDecisions?: string;
};

export enum ProhibitedUses {
  crawling = "crawling",
  illegal = "illegal",
  harmful = "harmful",
  infringing = "infringing",
  abusive = "abusive",
  spam = "spam",
  advertising = "advertising",
  impersonation = "impersonation",
  accountTransfer = "accountTransfer",
}

export enum RefundPolicy {
  none = "none",
  full = "full",
  prorata = "prorata",
}

export enum RefundType {
  full = "full",
  prorata = "prorata",
}

export enum SensitiveInformation {
  ssn = "ssn",
  financial = "financial",
  health = "health",
  biometric = "biometric",
  genetic = "genetic",
  political = "political",
  sexualOrientation = "sexualOrientation",
  criminalHistory = "criminalHistory",
  religion = "religion",
}

export enum ServiceRequirements {
  accounts = "accounts",
  communication = "communication",
  orders = "orders",
}

export enum ThirdPartyData {
  advertising = "advertising",
  analytics = "analytics",
  socialMedia = "socialMedia",
  purchase = "purchase",
  email = "email",
  support = "support",
  crm = "crm",
  job = "job",
  address = "address",
  behavior = "behavior",
}

/**
 * Cross-border data transfer mechanisms for GDPR compliance.
 * - scc: Standard Contractual Clauses - EU-approved contract terms for data transfers
 * - bcr: Binding Corporate Rules - internal rules for multinational companies
 * - adequacy: Adequacy Decision - transfers to countries deemed adequate by EU Commission
 */
export enum TransferMechanism {
  scc = "scc",
  bcr = "bcr",
  adequacy = "adequacy",
}

export enum Locale {
  en = "en",
}

export enum FileType {
  html = "html",
  astro = "astro",
}

export type EntityConfig = {
  name: string;
  website: string;
  address: string;
};

/**
 * Privacy policy configuration.
 */
export type PrivacyConfig = {
  /** Contact email for privacy-related questions and requests */
  privacyEmail: string;
  /** Platforms where your service operates (web, mobile, desktop, browserExtension) */
  platforms: Platforms[];
  /** Geographic regions where you operate (affects which laws apply) */
  locations: Locations[];
  /** Whether you offer social sign-in (Google, Facebook, etc.) */
  socialSignIn: boolean;
  /** Types of personal information you collect */
  personalInformation: PersonalInformation[];
  /** Types of sensitive information you collect (health, biometric, etc.) */
  sensitiveInformation: SensitiveInformation[];
  /** Types of data received from third parties */
  thirdPartyData: ThirdPartyData[];
  /** Whether you collect payment/billing information */
  paymentData: boolean;
  /** URLs to payment processor privacy policies (e.g., Stripe, PayPal) */
  paymentProcessors: string[];
  /** Whether you collect app usage data and logs */
  appUsageData: boolean;
  /** Whether you share data with third-party service providers */
  thirdPartyDisclosure: boolean;
  /** Categories of third parties you disclose data to */
  thirdPartyDisclosureEntities: string[];
  /** Whether you sell or share data for advertising/marketing */
  thirdPartySharing: boolean;
  /** Categories of third parties you share/sell data to */
  thirdPartySharingEntities: string[];
  /** Whether you implement security measures (encryption, access controls) */
  securityMeasures: boolean;
  /** Whether you use cookies and web tracking technologies */
  webTracking: boolean;
  /** Whether you use third-party analytics (Google Analytics, etc.) */
  thirdPartyAnalytics: boolean;
  /** Purposes for which you process data */
  serviceRequirements: ServiceRequirements[];
  /** Legal bases for data processing under GDPR */
  legalBasis: LegalBasis[];
  /** How long you retain user data (e.g., "1 year", "until account deletion") */
  dataRetentionPeriod?: string;
  /** Whether you comply with US state privacy laws (CCPA, etc.) */
  usStatePrivacyLaws: boolean;
  /** URL where users can manage their privacy settings */
  privacyPage?: string;
  /** Whether you have a Data Protection Officer */
  dpo: boolean;
  /** Name of your Data Protection Officer */
  dpoName?: string;
  /** Contact email for your DPO */
  dpoEmail?: string;
  /** Contact phone for your DPO */
  dpoPhone?: string;
  /** Configuration for browser extension privacy disclosures */
  browserExtension?: BrowserExtensionConfig;
  /**
   * AI usage disclosure. When set, renders a dedicated AI section listing
   * providers user data may flow to, what AI is used for, and operator-supplied
   * data-handling and automated-decision disclosures.
   */
  aiUsage?: AiUsageConfig;

  // v0.6 features (all optional for backward compatibility)

  /**
   * CPRA (California Privacy Rights Act) compliance.
   * Adds California-specific rights: right to correct data, limit sensitive data use,
   * and opt-out of automated decision-making. Required if you have CA users and
   * meet CPRA thresholds.
   * @default false
   */
  cpraCompliance?: boolean;

  /**
   * VCDPA (Virginia Consumer Data Protection Act) compliance.
   * Adds Virginia-specific consumer rights disclosures. Required if you process
   * data of 100,000+ VA consumers or derive 50%+ revenue from selling VA consumer data.
   * @default false
   */
  vcdpaCompliance?: boolean;

  /**
   * Whether you implement cookie consent mechanisms.
   * Adds a cookie policy section explaining consent, preferences, and management.
   * @default false
   */
  cookieConsent?: boolean;

  /**
   * Name of your cookie consent provider (e.g., "OneTrust", "CookieYes", "Termly").
   * Displayed in the cookie consent section.
   */
  cookieConsentProvider?: string;

  /**
   * Whether you have data breach notification procedures.
   * Adds section explaining how users will be notified in case of a breach.
   * @default false
   */
  dataBreachNotification?: boolean;

  /**
   * Timeframe for breach notification (e.g., "72 hours").
   * GDPR requires notification within 72 hours.
   */
  dataBreachTimeframe?: string;

  /**
   * Whether you transfer data across international borders.
   * Adds section explaining transfer safeguards (SCCs, BCRs, adequacy decisions).
   * @default false
   */
  crossBorderTransfers?: boolean;

  /**
   * Legal mechanisms used for cross-border data transfers.
   * - scc: Standard Contractual Clauses
   * - bcr: Binding Corporate Rules
   * - adequacy: Adequacy decisions (e.g., EU-US Data Privacy Framework)
   */
  transferMechanisms?: TransferMechanism[];

  /**
   * COPPA (Children's Online Privacy Protection Act) compliance.
   * Required if you knowingly collect data from children under 13 in the US.
   * Adds parental consent requirements and children's privacy disclosures.
   * @default false
   */
  coppaCompliance?: boolean;

  /**
   * Minimum age for users (typically 13 for COPPA, 16 for some EU countries).
   * Used in COPPA compliance section.
   */
  childrenMinAge?: number;
};

/**
 * Terms of service configuration.
 */
export type TermsConfig = {
  /** Whether users under 18 can use your service */
  underEighteen: boolean;
  /** Whether users under 13 can use your service (COPPA implications) */
  underThirteen: boolean;
  /** Whether you sell one-time purchasable goods/products */
  purchasableGoods: boolean;
  /** Whether you offer subscription-based services */
  subscription: boolean;
  /** Whether you offer free trial periods */
  freeTrial: boolean;
  /** Whether subscriptions auto-renew */
  autoRenew: boolean;
  /** Your refund policy (none, full, prorata) */
  refundPolicy: RefundPolicy;
  /** Whether users can submit/upload content */
  userContent: boolean;
  /** Whether you claim a license to user-generated content */
  userContentLicense: boolean;
  /** Whether user accounts are required */
  userAccounts: boolean;
  /** Jurisdiction for governing law (e.g., "California", "Delaware") */
  governingLaw: string;
  /** How disputes are resolved (arbitration or litigation) */
  disputeResolution: DisputeResolution;
  /** Whether mediation is required before formal disputes */
  mediation: boolean;
  /** List of prohibited uses of your service */
  prohibitedUses: ProhibitedUses[];
  /** Whether you offer a Service Level Agreement */
  serviceSLA: boolean;
  /** SLA uptime percentage (e.g., 99.9) */
  serviceSLAAmount: number;
  /** SLA measurement timeframe (e.g., "30 days", "monthly") */
  serviceSLATimeframe?: string;
  /** Whether SLA violations result in refunds/credits */
  serviceSLARefund: boolean;
  /** Type of SLA refund (full or prorated) */
  serviceSLARefundType?: RefundType;
  /** Custom SLA terms (overrides default SLA text) */
  serviceSLACustom?: string;
  /** Whether you limit liability */
  liabilityLimitation: boolean;
  /** How liability is calculated */
  liabilityLimitationType?: LiabilityLimitationType;
  /** Timeframe for liability calculation (e.g., "6 months") */
  liabilityLimitationTimeframe?: string;
  /** Fixed dollar amount for liability cap */
  liabilityLimitationAmount: number;
  /** Contact email for support questions */
  supportEmail: string;

  // v0.6 features (all optional for backward compatibility)

  /**
   * Force majeure clause.
   * Protects against liability for failures due to events beyond your control
   * (natural disasters, wars, pandemics, government actions, etc.).
   * Recommended for most services.
   * @default true
   */
  forceMajeure?: boolean;

  /**
   * DMCA takedown procedure.
   * Required if you host user-generated content in the US and want safe harbor
   * protection under 17 U.S.C. § 512. Adds section explaining how copyright
   * holders can submit takedown notices.
   * @default false
   */
  dmcaTakedown?: boolean;

  /**
   * Designated email for DMCA takedown notices.
   * Should be monitored and responded to promptly.
   */
  dmcaEmail?: string;

  /**
   * Tax liability disclaimer.
   * Clarifies that users are responsible for applicable taxes on purchases.
   * Important for international services.
   * @default false
   */
  taxLiability?: boolean;

  /**
   * Tax jurisdiction (e.g., "United States", "European Union").
   * Used in tax liability section.
   */
  taxJurisdiction?: string;
};

/**
 * Props to pass to the Astro Layout component.
 * Allows any string/number/boolean/object values.
 * @additionalProperties true
 */
export interface AstroLayoutProps {
  [key: string]: string | number | boolean | object | null | undefined;
}

export type AstroLayoutConfig = {
  /** Path to the Layout component (e.g., "~/layouts/Layout.astro") */
  path: string;
  /** Props to pass to the Layout component */
  props?: AstroLayoutProps;
};

/**
 * Inner shell wrapper rendered between the Astro Layout and the policy
 * content. Use this when the Layout is just an HTML wrapper and your
 * marketing nav/footer live in a separate shell component (common in
 * suite-style apps).
 */
export type AstroShellConfig = {
  /** Path to the shell component (e.g., "~/components/MarketingShell.astro") */
  path: string;
  /** Props to pass to the shell component */
  props?: AstroLayoutProps;
};

export type OutputConfig = {
  // Individual file paths for privacy and terms
  privacyFilePath?: string;
  termsFilePath?: string;

  // File type
  fileType: FileType;

  // CSS framework
  cssFramework: CSSFramework;

  // Locales
  locales: Locale[];

  /**
   * Astro layout configuration (only used when fileType is "astro").
   * If not provided, generates a standalone HTML page.
   */
  astroLayout?: AstroLayoutConfig;

  /**
   * Optional inner shell wrapper rendered inside the Astro Layout.
   * Useful when the marketing chrome (nav/footer) lives in a separate
   * component from the page Layout.
   */
  astroShell?: AstroShellConfig;
};

export type PolicygenConfig = {
  $schema?: string;
  output: OutputConfig;
  entity: EntityConfig;
  privacy?: PrivacyConfig;
  terms?: TermsConfig;
};

export const defaultEntityConfig: EntityConfig = {
  name: "",
  website: "",
  address: "",
};

export const defaultPrivacyConfig: PrivacyConfig = {
  privacyEmail: "",
  platforms: [Platforms.web],
  locations: [],
  socialSignIn: false,
  personalInformation: [],
  sensitiveInformation: [],
  thirdPartyData: [],
  paymentData: false,
  paymentProcessors: [],
  appUsageData: false,
  thirdPartyDisclosure: false,
  thirdPartyDisclosureEntities: [],
  thirdPartySharing: false,
  thirdPartySharingEntities: [],
  securityMeasures: false,
  webTracking: false,
  thirdPartyAnalytics: false,
  serviceRequirements: [],
  legalBasis: [],
  dataRetentionPeriod: undefined,
  usStatePrivacyLaws: false,
  privacyPage: undefined,
  dpo: false,
  dpoName: undefined,
  dpoEmail: undefined,
  dpoPhone: undefined,
  browserExtension: undefined,
  // v0.6 features
  cpraCompliance: false,
  vcdpaCompliance: false,
  cookieConsent: false,
  cookieConsentProvider: undefined,
  dataBreachNotification: false,
  dataBreachTimeframe: undefined,
  crossBorderTransfers: false,
  transferMechanisms: undefined,
  coppaCompliance: false,
  childrenMinAge: undefined,
};

export const defaultTermsConfig: TermsConfig = {
  supportEmail: "",
  underEighteen: false,
  underThirteen: false,
  purchasableGoods: false,
  subscription: false,
  freeTrial: false,
  autoRenew: false,
  refundPolicy: RefundPolicy.none,
  userContent: false,
  userContentLicense: false,
  userAccounts: false,
  governingLaw: "California",
  disputeResolution: DisputeResolution.litigation,
  mediation: false,
  prohibitedUses: [],
  serviceSLA: false,
  serviceSLAAmount: 0,
  serviceSLATimeframe: undefined,
  serviceSLARefund: false,
  serviceSLARefundType: undefined,
  serviceSLACustom: undefined,
  liabilityLimitation: false,
  liabilityLimitationType: undefined,
  liabilityLimitationTimeframe: "twelve (12) months",
  liabilityLimitationAmount: 0,
  // v0.6 features
  forceMajeure: true,
  dmcaTakedown: false,
  dmcaEmail: undefined,
  taxLiability: false,
  taxJurisdiction: undefined,
};

export const defaultOutputConfig: OutputConfig = {
  privacyFilePath: undefined,
  termsFilePath: undefined,
  fileType: FileType.html,
  cssFramework: CSSFramework.classes,
  locales: [Locale.en],
};

export const defaultConfig: PolicygenConfig = {
  output: defaultOutputConfig,
  entity: defaultEntityConfig,
  privacy: defaultPrivacyConfig,
  terms: defaultTermsConfig,
};
