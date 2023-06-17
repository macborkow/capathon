<script>
  export let code;
  let product;
  let apiText;
  let crossReferenced = "";
  async function findCrossAllergens() {
    apiText = apiText.map((text) => {
      const thing = text.split(":")[1]?.trim();
      if (thing) {
        return thing;
      } else {
        return text;
      }
    });

    // Convert both arrays to lowercase
    let chosenAllergens = JSON.parse(localStorage.getItem("allergens"));
    if (chosenAllergens) {
      chosenAllergens = chosenAllergens.map((allergen) => allergen.toLowerCase());
      apiText = apiText.map((text) => text.toLowerCase());

      // Find the common elements in the two arrays
      const commonElements = chosenAllergens.filter((allergen) => apiText.includes(allergen));
      crossReferenced = commonElements;
      console.log({ crossReferenced });
    }
  }
  async function fetchData() {
    try {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/https://world.openfoodfacts.org/api/2/product/${code}`);
      const data = await response.json();
      product = data.product;
      apiText = product.allergens_tags;
      findCrossAllergens();
    } catch (error) {
      console.error(error);
    }
  }
  fetchData();
</script>

<main class="p-4">
  {#if product}
    <div class="py-4 mx-3 flex flex-col justify-center items-center gap-4">
      <h1 class="rounded-xl p-4 text-2xl font-bold">Product</h1>
      <h1 class="text-green font-bold">{product.brands}</h1>
      <img class="rounded-lg justify-center" src={product.image_url} alt="Scanned Product" />
      {#if crossReferenced.length !== 0}
        <p class="bg-white rounded p-4 m-2">The ingredients in {product.brands} can contain allergens to you.</p>
        <span class="bg-white p-2 rounded">
          {crossReferenced}
        </span>
      {/if}
      {#if crossReferenced.length === 0}
        <p class="bg-white rounded p-4 text-center">There are no known allergens related to <span class="font-bold">{product.brands}</span> based on your profile.</p>
      {/if}
    </div>
  {/if}
</main>

<style>
  img {
    max-width: 120px;
  }
</style>
