<script>
  import Scanner from "../components/Scanner.svelte";
  import ProductDetail from "../components/ProductDetail.svelte";
	let foundCode = '';
	function magic(event) {
		foundCode = event.detail.code
	}
</script>

{#if !foundCode}
<Scanner on:code={magic}/>
{:else}
<ProductDetail code={foundCode} />
{/if}

<a href="/productdetail">ProductDetail</a>
<a href="/overview">Overview</a>
