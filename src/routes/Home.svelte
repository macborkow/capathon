<script>
  import Scanner from "../components/Scanner.svelte";
  import ProductDetail from "../components/ProductDetail.svelte";
	let foundCode = '';
	function magic(event) {
		foundCode = event.detail.code
	}
  import { onMount } from 'svelte';

  let showSplash = true;

  onMount(() => {
    setTimeout(() => {
      showSplash = false;
    }, 2000);
  });
</script>

{#if showSplash}
  <div class="fade-out splash">
    <!-- Replace the following line with your splash art image -->
    <img class="zoom-out" src="../../public/logo.jpg" alt="Splash Art">
  </div>
{/if}
	{#if !foundCode}
		<Scanner on:code={magic}/>
	{:else}
		<ProductDetail code={foundCode} />
	{/if}
  <a class="floating" href="/overview">☰</a>

<style>
	.floating {
    z-index: 0;
		position: absolute;
		top: 0;
		right: 0;
		padding: 5px;
		display: block;
		border: solid white;
		border-radius: 20%;
		background: white;
		width: 38.8px;
		height: 38.8px;
		text-align: center;
	}
  .splash {
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
		background: rgb(240,205,151);
  }
  .zoom-out {
    animation: zoom-out-animation 2s ease-out;
  }
  .fade-out {
    animation: fade-out-animation 2s ease-out;
  }
  @keyframes zoom-out-animation {
    0% {
			opacity: 1;
    }
    100% {
			opacity: 0;
    }
  }

  @keyframes zoom-out-animation {
    0% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }

</style>
