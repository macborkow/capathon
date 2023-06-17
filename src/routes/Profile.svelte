<script>
  import Check from "svelte-material-icons/Check.svelte";
  import Close from "svelte-material-icons/Close.svelte";

  let allergenInput = "";
  let matchingAllergens = [];
  let chosenAllergens = [];

  const allergens = ["Milk", "Gluten", "Soybeans", "Eggs", "Nuts", "Fish", "Mustard", "Celery", "Peanuts", "Sulphur dioxide and sulphites", "Sesame seeds", "Crustaceans", "Molluscs", "Lupin"];

  function getFilteredAllergens() {
    return allergens.filter((el) => !chosenAllergens.includes(el));
  }

  function updateMatchingAllergens() {
    matchingAllergens = getFilteredAllergens().filter((allergen) => allergen.toLowerCase().includes(allergenInput.toLowerCase()) && allergenInput != "");
  }

  function addAllergenToLocalStorage(allergen) {
    chosenAllergens.push(allergen);
    chosenAllergens = chosenAllergens;
    localStorage.setItem("allergens", JSON.stringify(chosenAllergens));
    allergenInput = "";
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

<main class="p-4">
  <div class="flex justify-center items-center flex-col gap-4">
    <h1 class=" rounded-xl p-4 text-2xl font-bold">Profile</h1>

    <input class="p-2 rounded-2xl text-center" type="text" placeholder="Type an allergen..." bind:value={allergenInput} on:input={updateMatchingAllergens} />
  </div>
  {#if matchingAllergens.length > 0}
    <div class="matching-allergens">
      <h3 class="text-center p-2">Matching Allergens:</h3>
      <div>
        {#each matchingAllergens as allergen, index (allergen)}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div class="flex justify-between p-2 m-2 rounded-2xl bg-white" on:click={() => addAllergenToLocalStorage(allergen)}>
            <div class=" flex items-center justify-center gap-2">
              {allergen}
            </div>
            <span class="flex items-center justify-center circle border bg-green rounded-3xl">
              <Check color="white" size="1.5em" />
            </span>
          </div>
        {/each}
      </div>
    </div>
  {:else if allergenInput != ""}
    <p class="text-center p-2">No matching allergens found.</p>
  {/if}

  {#if chosenAllergens.length > 0}
    <div class="my-3">
      <h2 class="font-bold text-center">Your Allergens</h2>
      <div>
        {#each chosenAllergens as allergen, index (allergen)}
          <div class="flex justify-between p-2 m-2 rounded-2xl bg-white" on:click={() => removeChosenAllergen(index)}>
            <div class="flex items-center justify-center gap-2">
              <h2>
                {allergen}
              </h2>
            </div>
            <span class="flex items-center justify-center circle border bg-red mt-1 rounded-3xl">
              <Close color="white" size="1.5em" />
            </span>
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <p />
  {/if}

  <div class="absolute bottom-5 w-44 p-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <a class="flex items-center justify-center gap-2" href="/">
      <span class="text-white drop-shadow-2xl shad mt-1"> New scan </span>
      <a href="/"> <span class="text-3xl">📷</span></a>
    </a>
  </div>
</main>

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
