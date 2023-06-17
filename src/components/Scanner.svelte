<script>
  import { BrowserMultiFormatReader } from "@zxing/library";
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import Plus from "svelte-material-icons/Plus.svelte";

  let currentURL;
  let isCam;
  onMount(() => {
    currentURL = window.location.href;

    setTimeout(() => {
      if (currentURL.includes("/profile") && currentURL.includes("/terms")) {
        isCam = false;
        console.log({ currentURL });
        console.log("cam page", isCam);
      } else {
        isCam = true;
        console.log({ currentURL });
        console.log("not cam page", isCam);
      }
    }, 2000);
  });

  let videoRef;
  let codeReader;
  let videoStream;
  let code = "";

  const dispatch = createEventDispatcher();

  startScanning();

  async function startScanning() {
    codeReader = new BrowserMultiFormatReader();
    try {
      videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.srcObject = videoStream;
      codeReader
        .decodeFromVideoElement(videoRef)
        .then((result) => {
          console.log("Scanned QR code:", result.text);
          code = result.text;
          dispatch("code", {
            code,
          });
        })
        .catch((err) => {
          console.error("Error scanning QR code:", err);
        });
    } catch (err) {
      console.error("Error starting camera:", err);
    }
  }

  function stopScanning() {
    if (codeReader) {
      codeReader.reset();
      codeReader = null;
    }
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
      videoStream = null;
    }
  }

  const viewportWidth = window.innerWidth;

  onMount(async () => {
    const element = document.getElementById("video");
    const width = element.offsetWidth;
    const calc = -(width / 2) + viewportWidth;
    element.style.marginLeft = `${calc}px`;
  });
</script>

{#if isCam}
  <div class="overlay z-10 rounded-full">
    <Plus size="3em" />
  </div>
{/if}

<div class="overflow-hidden">
  <video style="max-width: none; height: 100vh" id="video" bind:this={videoRef} autoplay />
</div>

<style>
  .overlay {
    height: 100px;
    width: 100px;
    padding: 1.4em;
    border: solid black 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
