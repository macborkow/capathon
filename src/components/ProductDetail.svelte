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

{#if product}
  <div class="py-4 mx-3 flex flex-col">
    <h1 class="bg-slate-200 rounded-xl p-1 text-2xl font-bold">Product</h1>
    <h1 class="justify-center">{product.brands}</h1>
    <img class="mt-3 w-40 justify-center" src={product.image_url} alt="Scanned Product" />
    <h3 class="mt-3">Those things in {product.brands} can kill you</h3>
    <h1 class="text-2xl py-3 font-bold">Profile</h1>
    {#if crossReferenced.length !== 0}
      <h6 class="bg-slate-200 rounded-xl p-1">{crossReferenced}</h6>
    {/if}
  </div>
{/if}
<div class="bottom-10 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <a class="p-2" href="/"> <span class="text-3xl">📷</span></a>
</div>
