<script>
  export let code;
  let product;
  let apiText;
  let crossReferenced = '';
  async function findCrossAllergens() {
		apiText = apiText.map(text => {
			const thing = text.split(':')[1]?.trim();
			if (thing) {
				return thing
			} else {
				return text
			}
		});

		// Convert both arrays to lowercase
    let chosenAllergens = JSON.parse(localStorage.getItem('allergens'))
		chosenAllergens = chosenAllergens.map(allergen => allergen.toLowerCase());
		apiText = apiText.map(text => text.toLowerCase());

		// Find the common elements in the two arrays
		const commonElements = chosenAllergens.filter(allergen => apiText.includes(allergen));
		crossReferenced = commonElements;
  
  }
  async function fetchData() {
    try {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/https://world.openfoodfacts.org/api/2/product/${code}`);
      const data = await response.json();
			product = data.product
      apiText = product.allergens_tags;
      findCrossAllergens();
    } catch (error) {
      console.error(error);
    }
  }
  fetchData();

</script>

{#if product}
<h1>{product.brands}</h1>
<div class="py-4 flex justify-center items-center colums-2">
    <img class="w-20" src={product.image_url} alt="Scanned Product">
</div>
<h3> Those things in { product.brands } can kill you </h3>
<h6> { crossReferenced } </h6>
{/if}

