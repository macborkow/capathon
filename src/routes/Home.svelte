<script>
	import Plus from "svelte-material-icons/Plus.svelte";
	import Scanner from "../components/Scanner.svelte";
	import ProductDetail from "../components/ProductDetail.svelte";
	let foundCode = "";
	function magic(event) {
		foundCode = event.detail.code;
	}
</script>

{#if !foundCode}
	<Scanner on:code={magic} />
{:else}
	<ProductDetail code={foundCode} />
{/if}

<div>
	<a href="/overview">
		<span class="floating p-5" style="background-color: #D92F55; border-radius: 50%">
			<Plus size="2em"/>
		</span>
	</a>
</div>

<style>
	.floating {
		position: absolute;
		bottom: 2em;
		right: 2em;
	}
</style>
