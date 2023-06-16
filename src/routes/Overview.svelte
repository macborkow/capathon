<script>
  import Check from "svelte-material-icons/Check.svelte";
  import Close from "svelte-material-icons/Close.svelte";
  import ChevronUp from "svelte-material-icons/ChevronUp.svelte";

  let allergenInput = "";
  let matchingAllergens = [];
  let chosenAllergens = [];

  const allergens = ["Milk", "Gluten", "Soybeans", "Eggs", "Nuts", "Fish", "Mustard", "Celery", "Peanuts", "Sulphur dioxide and sulphites", "Sesame seeds", "Crustaceans", "Molluscs", "Lupin"];

  function getFilteredAllergens() {
    return allergens.filter((el) => !chosenAllergens.includes(el));
  }

  function updateMatchingAllergens() {
    matchingAllergens = getFilteredAllergens().filter((allergen) => allergen.toLowerCase().includes(allergenInput.toLowerCase()));
  }

  function addAllergenToLocalStorage(allergen) {
    chosenAllergens.push(allergen);
    chosenAllergens = chosenAllergens;
    localStorage.setItem("allergens", JSON.stringify(chosenAllergens));
    updateMatchingAllergens();
  }

  function removeChosenAllergen(index) {
    chosenAllergens.splice(index, 1);
    chosenAllergens = chosenAllergens;
    localStorage.setItem("allergens", JSON.stringify(chosenAllergens));
    updateMatchingAllergens();
  }

  function retrieveChosenAllergens() {
    const allergens = localStorage.getItem("allergens");
    if (allergens) {
      chosenAllergens = JSON.parse(allergens);
      chosenAllergens = chosenAllergens;
    }
    updateMatchingAllergens();
  }

  let apiText = [];
  const code = "40111445";

  async function fetchData() {
    try {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/https://world.openfoodfacts.org/api/2/product/${code}`);
      const data = await response.json();
      apiText = data.product.allergens_tags;
    } catch (error) {
      console.error(error);
    }
    await retrieveChosenAllergens();
    updateMatchingAllergens();
  }

  fetchData();
</script>

<h1>Your Allergens</h1>
<input type="text" placeholder="Type an allergen..." bind:value={allergenInput} on:input={updateMatchingAllergens} />
{#if matchingAllergens.length > 0}
  <div class="matching-allergens">
    <h3>Matching Allergens:</h3>
    <div>
      {#each matchingAllergens as allergen, index (allergen)}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="allergen-block" on:click={() => addAllergenToLocalStorage(allergen)}>
          {allergen}
        </div>
      {/each}
    </div>
  </div>
{:else}
  <p>No matching allergens found.</p>
{/if}

{#if chosenAllergens.length > 0}
  <div>
    <h1 class="font-bold">Your Allergens</h1>
    <div>
      {#each chosenAllergens as allergen, index (allergen)}
        <div class="flex justify-between p-2 m-2 rounded-2xl bg-white" on:click={() => removeChosenAllergen(index)}>
          <div class="flex items-center justify-center gap-2">
            <h2>
              {allergen}
            </h2>
          </div>
          <span class="flex items-center justify-center circle border bg-red rounded-3xl">
            <Close color="white" size="1.5em" />
          </span>
        </div>
      {/each}
    </div>
  </div>
{:else}
  <p />
{/if}

<style>
  .matching-allergens {
    margin-top: 10px;
    font-size: 16px;
  }

  .allergen-block {
    display: inline-block;
    padding: 5px 10px;
    margin: 5px;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  .chosen-allergens {
    margin-top: 20px;
    font-size: 16px;
  }

  .chosen-allergen-block {
    display: inline-block;
    padding: 5px 10px;
    margin: 5px;
    border: 1px solid #ccc;
    cursor: pointer;
    background-color: #e6e6e6;
  }

  .circle {
    height: 30px;
    width: 30px;
    /* width: 20px; */
  }
</style>
