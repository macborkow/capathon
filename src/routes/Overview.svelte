<script>
  let allergenInput = '';
  let matchingAllergens = [];
  let chosenAllergens = [];

  const allergens = [
    'Milk',
    'Gluten',
    'Soybeans',
    'Eggs',
    'Nuts',
    'Fish',
    'Mustard',
    'Celery',
    'Peanuts',
    'Sulphur dioxide and sulphites',
    'Sesame seeds',
    'Crustaceans',
    'Molluscs',
    'Lupin'
  ];

	function getFilteredAllergens() {
		return allergens.filter( ( el ) => !chosenAllergens.includes( el ) );
	}

  function updateMatchingAllergens() {
    matchingAllergens = getFilteredAllergens().filter((allergen) =>
      allergen.toLowerCase().includes(allergenInput.toLowerCase())
    );
  }
	
  function addAllergenToLocalStorage(allergen) {
    /*
    if (chosenAllergens.find(item => item != allergen)) {
      return
    }
*/
    chosenAllergens.push(allergen);
		chosenAllergens = chosenAllergens;
    localStorage.setItem('allergens', JSON.stringify(chosenAllergens));
		updateMatchingAllergens();
  }

  function removeChosenAllergen(index) {
    chosenAllergens.splice(index, 1);
		chosenAllergens = chosenAllergens;
    localStorage.setItem('allergens', JSON.stringify(chosenAllergens));
		updateMatchingAllergens();
  }

  function retrieveChosenAllergens() {
    const allergens = localStorage.getItem('allergens');
    if (allergens) {
      chosenAllergens = JSON.parse(allergens);
			chosenAllergens = chosenAllergens;
    }
		updateMatchingAllergens();
  }


	let apiText = [];
	const code = '40111445';

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
</style>

<h1>Allergen Search</h1>
<input
  type="text"
  placeholder="Type an allergen..."
  bind:value={allergenInput}
  on:input={updateMatchingAllergens}
/>


{#if matchingAllergens.length > 0}
  <div class="matching-allergens">
    <h3>Matching Allergens:</h3>
    <div>
      {#each matchingAllergens as allergen, index (allergen)}
        <div
          class="allergen-block"
          on:click={() => addAllergenToLocalStorage(allergen)}
        >
          {allergen}
        </div>
      {/each}
    </div>
  </div>
{:else}
  <p>No matching allergens found.</p>
{/if}

{#if chosenAllergens.length > 0}
  <div class="chosen-allergens">
    <h3>Chosen Allergens:</h3>
    <div>
      {#each chosenAllergens as allergen, index (allergen)}
        <div
          class="chosen-allergen-block"
          on:click={() => removeChosenAllergen(index)}
        >
          {allergen}
        </div>
      {/each}
    </div>
  </div>
{:else}
  <p></p>
{/if}

