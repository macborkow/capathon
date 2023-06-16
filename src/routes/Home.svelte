<script>
	import Plus from "svelte-material-icons/Plus.svelte";
	import Scanner from "../components/Scanner.svelte";
	import ProductDetail from "../components/ProductDetail.svelte";
	let foundCode = "";
	function magic(event) {
		foundCode = event.detail.code;
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

<div>
	<a href="/overview">
		<span class="floating p-5" style="background-color: rgb(255, 178, 120); border-radius: 50%">
			<Plus size="2em"/>
		</span>
	</a>
</div>

<style>
	.floating {
    z-index: 0;
		position: absolute;
		bottom: 2em;
		right: 2em;
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
