<script>
  // Config state
  let entityName = $state("");
  let entityWebsite = $state("");
  let entityAddress = $state("");

  let fileType = $state("html");
  let cssFramework = $state("classes");
  let privacyFilePath = $state("./privacy.html");
  let termsFilePath = $state("./terms.html");

  // Privacy
  let privacyEmail = $state("");
  let platforms = $state(["web"]);
  let locations = $state([]);
  let personalInformation = $state([]);
  let sensitiveInformation = $state([]);
  let socialSignIn = $state(false);
  let paymentData = $state(false);
  let appUsageData = $state(false);
  let thirdPartyDisclosure = $state(false);
  let thirdPartySharing = $state(false);
  let webTracking = $state(false);
  let thirdPartyAnalytics = $state(false);
  let securityMeasures = $state(false);
  let usStatePrivacyLaws = $state(false);
  let dpo = $state(false);
  let cpraCompliance = $state(false);
  let vcdpaCompliance = $state(false);
  let cookieConsent = $state(false);
  let dataBreachNotification = $state(false);
  let crossBorderTransfers = $state(false);
  let coppaCompliance = $state(false);

  // Terms
  let supportEmail = $state("");
  let userAccounts = $state(false);
  let underEighteen = $state(false);
  let underThirteen = $state(false);
  let purchasableGoods = $state(false);
  let subscription = $state(false);
  let freeTrial = $state(false);
  let autoRenew = $state(false);
  let refundPolicy = $state("none");
  let userContent = $state(false);
  let userContentLicense = $state(false);
  let governingLaw = $state("California");
  let disputeResolution = $state("litigation");
  let mediation = $state(false);
  let prohibitedUses = $state([]);
  let liabilityLimitation = $state(false);
  let serviceSLA = $state(false);
  let forceMajeure = $state(true);
  let dmcaTakedown = $state(false);
  let taxLiability = $state(false);

  let activeTab = $state("entity");
  let copied = $state(false);

  const platformOptions = ["web", "mobile", "desktop", "browserExtension"];
  const locationOptions = ["us", "eu", "uk", "other"];
  const personalInfoOptions = [
    "name",
    "email",
    "phone",
    "address",
    "password",
    "ipAddress",
    "deviceId",
    "creditCard",
    "locationData",
    "anonymizedUsageData",
  ];
  const sensitiveInfoOptions = [
    "ssn",
    "financial",
    "health",
    "biometric",
    "genetic",
    "political",
    "sexualOrientation",
    "criminalHistory",
    "religion",
  ];
  const prohibitedOptions = [
    "crawling",
    "illegal",
    "harmful",
    "infringing",
    "abusive",
    "spam",
    "advertising",
    "impersonation",
    "accountTransfer",
  ];

  const tabs = [
    { id: "entity", label: "Entity" },
    { id: "output", label: "Output" },
    { id: "privacy", label: "Privacy" },
    { id: "terms", label: "Terms" },
  ];

  function toggleArray(arr, value) {
    const idx = arr.indexOf(value);
    if (idx === -1) return [...arr, value];
    return arr.filter((v) => v !== value);
  }

  function buildConfig() {
    const config = {
      $schema: "https://policygen.xyz/schemas/0.7/schema.json",
      output: {
        fileType,
        cssFramework,
        locales: ["en"],
        privacyFilePath,
        termsFilePath,
      },
      entity: {},
      privacy: {},
      terms: {},
    };

    // Entity - only include non-empty
    if (entityName) config.entity.name = entityName;
    if (entityWebsite) config.entity.website = entityWebsite;
    if (entityAddress) config.entity.address = entityAddress;

    // Privacy
    if (privacyEmail) config.privacy.privacyEmail = privacyEmail;
    if (platforms.length) config.privacy.platforms = platforms;
    if (locations.length) config.privacy.locations = locations;
    if (personalInformation.length)
      config.privacy.personalInformation = personalInformation;
    if (sensitiveInformation.length)
      config.privacy.sensitiveInformation = sensitiveInformation;
    if (socialSignIn) config.privacy.socialSignIn = true;
    if (paymentData) config.privacy.paymentData = true;
    if (appUsageData) config.privacy.appUsageData = true;
    if (thirdPartyDisclosure) config.privacy.thirdPartyDisclosure = true;
    if (thirdPartySharing) config.privacy.thirdPartySharing = true;
    if (webTracking) config.privacy.webTracking = true;
    if (thirdPartyAnalytics) config.privacy.thirdPartyAnalytics = true;
    if (securityMeasures) config.privacy.securityMeasures = true;
    if (usStatePrivacyLaws) config.privacy.usStatePrivacyLaws = true;
    if (dpo) config.privacy.dpo = true;
    if (cpraCompliance) config.privacy.cpraCompliance = true;
    if (vcdpaCompliance) config.privacy.vcdpaCompliance = true;
    if (cookieConsent) config.privacy.cookieConsent = true;
    if (dataBreachNotification) config.privacy.dataBreachNotification = true;
    if (crossBorderTransfers) config.privacy.crossBorderTransfers = true;
    if (coppaCompliance) config.privacy.coppaCompliance = true;

    // Terms
    if (supportEmail) config.terms.supportEmail = supportEmail;
    if (userAccounts) config.terms.userAccounts = true;
    if (underEighteen) config.terms.underEighteen = true;
    if (underThirteen) config.terms.underThirteen = true;
    if (purchasableGoods) config.terms.purchasableGoods = true;
    if (subscription) config.terms.subscription = true;
    if (freeTrial) config.terms.freeTrial = true;
    if (autoRenew) config.terms.autoRenew = true;
    if (refundPolicy !== "none") config.terms.refundPolicy = refundPolicy;
    if (userContent) config.terms.userContent = true;
    if (userContentLicense) config.terms.userContentLicense = true;
    config.terms.governingLaw = governingLaw;
    config.terms.disputeResolution = disputeResolution;
    if (mediation) config.terms.mediation = true;
    if (prohibitedUses.length) config.terms.prohibitedUses = prohibitedUses;
    if (liabilityLimitation) config.terms.liabilityLimitation = true;
    if (serviceSLA) config.terms.serviceSLA = true;
    if (!forceMajeure) config.terms.forceMajeure = false;
    if (dmcaTakedown) config.terms.dmcaTakedown = true;
    if (taxLiability) config.terms.taxLiability = true;

    return config;
  }

  let configJson = $derived(JSON.stringify(buildConfig(), null, 2));

  async function copyConfig() {
    await navigator.clipboard.writeText(configJson);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }

  function downloadConfig() {
    const blob = new Blob([configJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "policygen.json";
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<div class="grid gap-6 lg:grid-cols-2">
  <!-- Left: Form -->
  <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6">
    <!-- Tabs -->
    <div class="mb-6 flex gap-1 rounded-lg bg-[var(--color-bg)] p-1">
      {#each tabs as tab}
        <button
          onclick={() => (activeTab = tab.id)}
          class="flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors {activeTab ===
          tab.id
            ? 'bg-[var(--color-purple)] text-white'
            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}"
        >
          {tab.label}
        </button>
      {/each}
    </div>

    <!-- Entity Tab -->
    {#if activeTab === "entity"}
      <div class="flex flex-col gap-4">
        <div>
          <label for="entityName" class="mb-1 block text-sm font-medium text-[var(--color-text)]"
            >Organization Name</label
          >
          <input
            id="entityName"
            type="text"
            bind:value={entityName}
            placeholder="Acme Corp"
            class="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-purple)] focus:outline-none"
          />
        </div>
        <div>
          <label for="entityWebsite" class="mb-1 block text-sm font-medium text-[var(--color-text)]"
            >Website URL</label
          >
          <input
            id="entityWebsite"
            type="url"
            bind:value={entityWebsite}
            placeholder="https://acme.com"
            class="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-purple)] focus:outline-none"
          />
        </div>
        <div>
          <label for="entityAddress" class="mb-1 block text-sm font-medium text-[var(--color-text)]"
            >Address</label
          >
          <input
            id="entityAddress"
            type="text"
            bind:value={entityAddress}
            placeholder="123 Main St, San Francisco, CA"
            class="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-purple)] focus:outline-none"
          />
        </div>
      </div>
    {/if}

    <!-- Output Tab -->
    {#if activeTab === "output"}
      <div class="flex flex-col gap-4">
        <div>
          <label for="fileType" class="mb-1 block text-sm font-medium text-[var(--color-text)]"
            >File Type</label
          >
          <select
            id="fileType"
            bind:value={fileType}
            class="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] focus:border-[var(--color-purple)] focus:outline-none"
          >
            <option value="html">HTML</option>
            <option value="astro">Astro</option>
          </select>
        </div>
        <div>
          <label for="cssFramework" class="mb-1 block text-sm font-medium text-[var(--color-text)]"
            >CSS Framework</label
          >
          <select
            id="cssFramework"
            bind:value={cssFramework}
            class="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] focus:border-[var(--color-purple)] focus:outline-none"
          >
            <option value="classes">Plain Classes</option>
            <option value="tailwind">Tailwind</option>
            <option value="daisyui">DaisyUI</option>
          </select>
        </div>
        <div>
          <label for="privacyFilePath" class="mb-1 block text-sm font-medium text-[var(--color-text)]"
            >Privacy Policy File Path</label
          >
          <input
            id="privacyFilePath"
            type="text"
            bind:value={privacyFilePath}
            class="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] focus:border-[var(--color-purple)] focus:outline-none"
          />
        </div>
        <div>
          <label for="termsFilePath" class="mb-1 block text-sm font-medium text-[var(--color-text)]"
            >Terms of Service File Path</label
          >
          <input
            id="termsFilePath"
            type="text"
            bind:value={termsFilePath}
            class="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] focus:border-[var(--color-purple)] focus:outline-none"
          />
        </div>
      </div>
    {/if}

    <!-- Privacy Tab -->
    {#if activeTab === "privacy"}
      <div class="flex flex-col gap-5 max-h-[60vh] overflow-y-auto pr-2">
        <div>
          <label for="privacyEmail" class="mb-1 block text-sm font-medium text-[var(--color-text)]"
            >Privacy Email</label
          >
          <input
            id="privacyEmail"
            type="email"
            bind:value={privacyEmail}
            placeholder="privacy@acme.com"
            class="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-purple)] focus:outline-none"
          />
        </div>

        <fieldset>
          <legend class="mb-2 block text-sm font-medium text-[var(--color-text)]">Platforms</legend>
          <div class="flex flex-wrap gap-2">
            {#each platformOptions as opt}
              <label
                class="inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-1.5 text-xs transition-colors {platforms.includes(opt) ? 'border-[var(--color-purple)] bg-[var(--color-purple)]/10 text-[var(--color-purple-light)]' : 'border-[var(--color-border)] text-[var(--color-text-muted)]'}"
              >
                <input
                  type="checkbox"
                  checked={platforms.includes(opt)}
                  onchange={() => (platforms = toggleArray(platforms, opt))}
                  class="sr-only"
                />
                {opt}
              </label>
            {/each}
          </div>
        </fieldset>

        <fieldset>
          <legend class="mb-2 block text-sm font-medium text-[var(--color-text)]">Locations</legend>
          <div class="flex flex-wrap gap-2">
            {#each locationOptions as opt}
              <label
                class="inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-1.5 text-xs transition-colors {locations.includes(opt) ? 'border-[var(--color-purple)] bg-[var(--color-purple)]/10 text-[var(--color-purple-light)]' : 'border-[var(--color-border)] text-[var(--color-text-muted)]'}"
              >
                <input
                  type="checkbox"
                  checked={locations.includes(opt)}
                  onchange={() => (locations = toggleArray(locations, opt))}
                  class="sr-only"
                />
                {opt}
              </label>
            {/each}
          </div>
        </fieldset>

        <fieldset>
          <legend class="mb-2 block text-sm font-medium text-[var(--color-text)]"
            >Personal Information Collected</legend
          >
          <div class="flex flex-wrap gap-2">
            {#each personalInfoOptions as opt}
              <label
                class="inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-1.5 text-xs transition-colors {personalInformation.includes(opt) ? 'border-[var(--color-purple)] bg-[var(--color-purple)]/10 text-[var(--color-purple-light)]' : 'border-[var(--color-border)] text-[var(--color-text-muted)]'}"
              >
                <input
                  type="checkbox"
                  checked={personalInformation.includes(opt)}
                  onchange={() =>
                    (personalInformation = toggleArray(
                      personalInformation,
                      opt,
                    ))}
                  class="sr-only"
                />
                {opt}
              </label>
            {/each}
          </div>
        </fieldset>

        <fieldset>
          <legend class="mb-2 block text-sm font-medium text-[var(--color-text)]"
            >Sensitive Information Collected</legend
          >
          <div class="flex flex-wrap gap-2">
            {#each sensitiveInfoOptions as opt}
              <label
                class="inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-1.5 text-xs transition-colors {sensitiveInformation.includes(opt) ? 'border-[var(--color-purple)] bg-[var(--color-purple)]/10 text-[var(--color-purple-light)]' : 'border-[var(--color-border)] text-[var(--color-text-muted)]'}"
              >
                <input
                  type="checkbox"
                  checked={sensitiveInformation.includes(opt)}
                  onchange={() =>
                    (sensitiveInformation = toggleArray(
                      sensitiveInformation,
                      opt,
                    ))}
                  class="sr-only"
                />
                {opt}
              </label>
            {/each}
          </div>
        </fieldset>

        <div class="grid grid-cols-2 gap-3">
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input type="checkbox" bind:checked={socialSignIn} class="accent-[var(--color-purple)]" />
            Social Sign-In
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input type="checkbox" bind:checked={paymentData} class="accent-[var(--color-purple)]" />
            Payment Data
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input type="checkbox" bind:checked={appUsageData} class="accent-[var(--color-purple)]" />
            App Usage Data
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input
              type="checkbox"
              bind:checked={thirdPartyDisclosure}
              class="accent-[var(--color-purple)]"
            />
            3rd Party Disclosure
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input
              type="checkbox"
              bind:checked={thirdPartySharing}
              class="accent-[var(--color-purple)]"
            />
            3rd Party Sharing
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input type="checkbox" bind:checked={webTracking} class="accent-[var(--color-purple)]" />
            Web Tracking
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input
              type="checkbox"
              bind:checked={thirdPartyAnalytics}
              class="accent-[var(--color-purple)]"
            />
            3rd Party Analytics
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input
              type="checkbox"
              bind:checked={securityMeasures}
              class="accent-[var(--color-purple)]"
            />
            Security Measures
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input
              type="checkbox"
              bind:checked={usStatePrivacyLaws}
              class="accent-[var(--color-purple)]"
            />
            US State Privacy Laws
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input type="checkbox" bind:checked={dpo} class="accent-[var(--color-purple)]" />
            Data Protection Officer
          </label>
        </div>

        <h4 class="mt-2 text-sm font-semibold text-[var(--color-text-muted)] border-t border-[var(--color-border)] pt-4">
          v0.6 Compliance
        </h4>
        <div class="grid grid-cols-2 gap-3">
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input
              type="checkbox"
              bind:checked={cpraCompliance}
              class="accent-[var(--color-purple)]"
            />
            CPRA Compliance
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input
              type="checkbox"
              bind:checked={vcdpaCompliance}
              class="accent-[var(--color-purple)]"
            />
            VCDPA Compliance
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input
              type="checkbox"
              bind:checked={cookieConsent}
              class="accent-[var(--color-purple)]"
            />
            Cookie Consent
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input
              type="checkbox"
              bind:checked={dataBreachNotification}
              class="accent-[var(--color-purple)]"
            />
            Breach Notification
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input
              type="checkbox"
              bind:checked={crossBorderTransfers}
              class="accent-[var(--color-purple)]"
            />
            Cross-Border Transfers
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input
              type="checkbox"
              bind:checked={coppaCompliance}
              class="accent-[var(--color-purple)]"
            />
            COPPA Compliance
          </label>
        </div>
      </div>
    {/if}

    <!-- Terms Tab -->
    {#if activeTab === "terms"}
      <div class="flex flex-col gap-5 max-h-[60vh] overflow-y-auto pr-2">
        <div>
          <label for="supportEmail" class="mb-1 block text-sm font-medium text-[var(--color-text)]"
            >Support Email</label
          >
          <input
            id="supportEmail"
            type="email"
            bind:value={supportEmail}
            placeholder="support@acme.com"
            class="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-purple)] focus:outline-none"
          />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input type="checkbox" bind:checked={userAccounts} class="accent-[var(--color-purple)]" />
            User Accounts
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input
              type="checkbox"
              bind:checked={underEighteen}
              class="accent-[var(--color-purple)]"
            />
            Allow Under 18
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input
              type="checkbox"
              bind:checked={underThirteen}
              class="accent-[var(--color-purple)]"
            />
            Allow Under 13
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input
              type="checkbox"
              bind:checked={purchasableGoods}
              class="accent-[var(--color-purple)]"
            />
            Purchasable Goods
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input
              type="checkbox"
              bind:checked={subscription}
              class="accent-[var(--color-purple)]"
            />
            Subscriptions
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input type="checkbox" bind:checked={freeTrial} class="accent-[var(--color-purple)]" />
            Free Trial
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input type="checkbox" bind:checked={autoRenew} class="accent-[var(--color-purple)]" />
            Auto-Renew
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input type="checkbox" bind:checked={userContent} class="accent-[var(--color-purple)]" />
            User Content
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input
              type="checkbox"
              bind:checked={userContentLicense}
              class="accent-[var(--color-purple)]"
            />
            Content License
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input type="checkbox" bind:checked={mediation} class="accent-[var(--color-purple)]" />
            Require Mediation
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input
              type="checkbox"
              bind:checked={liabilityLimitation}
              class="accent-[var(--color-purple)]"
            />
            Limit Liability
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input type="checkbox" bind:checked={serviceSLA} class="accent-[var(--color-purple)]" />
            Service SLA
          </label>
        </div>

        <div>
          <label for="refundPolicy" class="mb-1 block text-sm font-medium text-[var(--color-text)]"
            >Refund Policy</label
          >
          <select
            id="refundPolicy"
            bind:value={refundPolicy}
            class="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] focus:border-[var(--color-purple)] focus:outline-none"
          >
            <option value="none">None</option>
            <option value="full">Full</option>
            <option value="prorata">Pro-Rata</option>
          </select>
        </div>

        <div>
          <label for="governingLaw" class="mb-1 block text-sm font-medium text-[var(--color-text)]"
            >Governing Law</label
          >
          <input
            id="governingLaw"
            type="text"
            bind:value={governingLaw}
            class="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] focus:border-[var(--color-purple)] focus:outline-none"
          />
        </div>

        <div>
          <label for="disputeResolution" class="mb-1 block text-sm font-medium text-[var(--color-text)]"
            >Dispute Resolution</label
          >
          <select
            id="disputeResolution"
            bind:value={disputeResolution}
            class="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] focus:border-[var(--color-purple)] focus:outline-none"
          >
            <option value="litigation">Litigation</option>
            <option value="arbitration">Arbitration</option>
          </select>
        </div>

        <fieldset>
          <legend class="mb-2 block text-sm font-medium text-[var(--color-text)]"
            >Prohibited Uses</legend
          >
          <div class="flex flex-wrap gap-2">
            {#each prohibitedOptions as opt}
              <label
                class="inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-1.5 text-xs transition-colors {prohibitedUses.includes(opt) ? 'border-[var(--color-purple)] bg-[var(--color-purple)]/10 text-[var(--color-purple-light)]' : 'border-[var(--color-border)] text-[var(--color-text-muted)]'}"
              >
                <input
                  type="checkbox"
                  checked={prohibitedUses.includes(opt)}
                  onchange={() =>
                    (prohibitedUses = toggleArray(prohibitedUses, opt))}
                  class="sr-only"
                />
                {opt}
              </label>
            {/each}
          </div>
        </fieldset>

        <h4 class="mt-2 text-sm font-semibold text-[var(--color-text-muted)] border-t border-[var(--color-border)] pt-4">
          v0.6 Features
        </h4>
        <div class="grid grid-cols-2 gap-3">
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input
              type="checkbox"
              bind:checked={forceMajeure}
              class="accent-[var(--color-purple)]"
            />
            Force Majeure
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input
              type="checkbox"
              bind:checked={dmcaTakedown}
              class="accent-[var(--color-purple)]"
            />
            DMCA Takedown
          </label>
          <label class="flex items-center gap-2 text-sm text-[var(--color-text)]">
            <input type="checkbox" bind:checked={taxLiability} class="accent-[var(--color-purple)]" />
            Tax Liability
          </label>
        </div>
      </div>
    {/if}
  </div>

  <!-- Right: JSON Preview -->
  <div class="flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
    <div
      class="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3"
    >
      <div class="flex items-center gap-2">
        <div class="h-3 w-3 rounded-full" style="background-color: #ef444460"></div>
        <div class="h-3 w-3 rounded-full" style="background-color: #eab30860"></div>
        <div class="h-3 w-3 rounded-full" style="background-color: #22c55e60"></div>
        <span class="ml-2 text-xs" style="color: var(--color-text-muted)">policygen.json</span>
      </div>
      <div class="flex items-center gap-2">
        <button
          onclick={copyConfig}
          class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
          style="border: 1px solid var(--color-border); color: var(--color-text-muted)"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <button
          onclick={downloadConfig}
          class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
          style="background-color: var(--color-purple); color: white"
        >
          Download
        </button>
      </div>
    </div>
    <pre
      class="flex-1 overflow-auto p-4 text-sm leading-relaxed"
      style="color: var(--color-text-muted); font-family: var(--font-mono)">{configJson}</pre>
  </div>
</div>
