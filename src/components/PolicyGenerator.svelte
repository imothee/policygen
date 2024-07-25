<script>
  import Policygen from "policygen/client";
  import { DefaultConfiguration } from "policygen/configuration";
  import { ConfigFields } from "policygen/config-fields";

  const config = {
    ...DefaultConfiguration,
    ...{
      entityName: "Policygen.xyz",
      entityWebsite: "policygen.xyz",
      supportEmail: "support@policygen.xyz",
      privacyEmail: "privacy@policygen.xyz",
    },
  };

  function onCheckboxMultiChange(key, event) {
    const { target } = event;
    const { id, value } = target;
    const index = config[key].indexOf(id);
    if (index === -1) {
      config[key].push(id);
    } else {
      config[key].splice(id, 1);
    }
  }

  function onStringArrayChange(event) {
    const { target } = event;
    const { id, value } = target;
    config[id] = value.split(",").map((item) => item.trim());
  }

  function camelToTitle(camelCase) {
    return (
      camelCase
        // inject space before the upper case letters
        .replace(/([A-Z])/g, function (match) {
          return " " + match;
        })
        // replace first char with upper case
        .replace(/^./, function (match) {
          return match.toUpperCase();
        })
    );
  }

  let policy = "";

  async function generatePrivacyPolicy() {
    const policygen = new Policygen({ config });
    policy = await policygen.privacyPolicy();
  }

  async function generateTermsOfService() {
    const policygen = new Policygen({ config });
    policy = await policygen.termsOfService();
  }
</script>

<div class="flex flex-col md:flex-row space-x-4">
  <div class="md:w-1/2">
    <form onsubmit="return false;">
      <div class="grid grid-cols-1 mx-4 gap-x-6 gap-y-4 sm:grid-cols-6 mt-10">
        <div class="col-span-full text-foreground text-center">
          Your Policy Details
        </div>
        <div class="col-span-3">
          <button
            on:click={generatePrivacyPolicy}
            class="bg-accent-two text-white w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-background focus:ring-2 focus:ring-inset focus:ring-accent-two sm:text-sm sm:leading-6"
          >
            Generate Privacy Policy</button
          >
        </div>
        <div class="col-span-3">
          <button
            on:click={generateTermsOfService}
            class="bg-accent-two text-white w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-background focus:ring-2 focus:ring-inset focus:ring-accent-two sm:text-sm sm:leading-6"
          >
            Generate Terms of Service</button
          >
        </div>

        {#each Object.entries(ConfigFields) as [key, value]}
          <div class="col-span-full">
            <label
              for={key}
              class="mb-1 block text-foreground-darken font-medium"
              >{camelToTitle(key)}</label
            >
            {#if value === "string"}
              <input
                type="text"
                id={key}
                bind:value={config[key]}
                required
                class="block bg-background-lighten text-white w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-background placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-accent-two sm:text-sm sm:leading-6"
              />
            {:else if value === "optional:string"}
              <input
                type="text"
                id={key}
                bind:value={config[key]}
                class="block bg-background-lighten text-white w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-background placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-accent-two sm:text-sm sm:leading-6"
              />
            {:else if value === "string_array"}
              <input
                type="text"
                id={key}
                on:input={onStringArrayChange}
                placeholder="comma, separated, values"
                class="block bg-background-lighten text-white w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-background placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-accent-two sm:text-sm sm:leading-6"
              />
            {:else if value === "number"}
              <input
                type="number"
                id={key}
                bind:value={config[key]}
                required
                class="block bg-background-lighten text-white w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-background placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-accent-two sm:text-sm sm:leading-6"
              />
            {:else if value === "boolean"}
              <input
                type="checkbox"
                id={key}
                bind:checked={config[key]}
                class=""
              />
            {:else if Array.isArray(value)}
              <div class="text-sm grid grid-cols-3">
                {#each value as item}
                  <div class="flex space-x-2">
                    <label
                      for={item}
                      class="mb-1 block text-foreground-darken font-medium"
                      >{item}</label
                    >
                    <input
                      type="checkbox"
                      id={item}
                      on:change={(event) => onCheckboxMultiChange(key, event)}
                    />
                  </div>
                {/each}
              </div>
            {:else if typeof value === "object"}
              {#each Object.keys(value) as item}
                <div class="text-sm ml-4">
                  <label
                    for={item}
                    class="mb-1 block text-foreground-darken font-medium"
                    >{item}</label
                  >
                  <input
                    type="text"
                    id={key}
                    bind:value={config[key][item]}
                    class="block bg-background-lighten text-white w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-background placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-accent-two sm:text-sm sm:leading-6"
                  />
                </div>
              {/each}
            {:else if typeof value === "string" && value.startsWith("select:")}
              <select
                id={key}
                bind:value={config[key]}
                required
                class="block bg-background-lighten text-white w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-background placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-accent-two sm:text-sm sm:leading-6"
              >
                {#each value.split(":")[1].split(",") as option}
                  <option value={option}>{option}</option>
                {/each}
              </select>
            {/if}
          </div>
        {/each}
      </div>
    </form>
  </div>
  <div class="md:w-1/2">
    <h1 class="text-foreground text-center mt-10">Generated Policy</h1>
    <p class="text-foreground mt-10">{@html policy}</p>
  </div>
</div>
