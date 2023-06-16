<script>
  if (navigator.mediaDevices?.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        var video = document.createElement("video");
        video.srcObject = stream;
        video.autoplay = true;
        document.body.appendChild(video);
      })
      .catch(function (error) {
        console.error("Error accessing the camera:", error);
      });
  } else {
    console.error("getUserMedia is not supported in this browser.");
  }
</script>

