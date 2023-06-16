<script>
    import { BrowserMultiFormatReader } from '@zxing/library';

    let videoRef;
    let codeReader;
    let videoStream;

    async function startScanning() {
    codeReader = new BrowserMultiFormatReader();
    try {
        videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.srcObject = videoStream;
        codeReader
        .decodeFromVideoElement(videoRef)
        .then((result) => {
            console.log('Scanned QR code:', result.text);
        })
        .catch((err) => {
            console.error('Error scanning QR code:', err);
        });
    } catch (err) {
        console.error('Error starting camera:', err);
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
</script>

<style>
/* Add necessary styles for the video element */
video {
    width: 100%;
    max-width: 400px;
    height: auto;
}
</style>

<div>
    <button on:click={startScanning}>Start Scanning</button>
    <button on:click={stopScanning}>Stop Scanning</button>
    <br />
    <video id="video" bind:this={videoRef} autoplay></video>
</div>
  