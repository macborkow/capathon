<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Home from "./routes/Home.svelte";
  import Profile from "./routes/Profile.svelte";
</script>

<Router>
  <Route path="/" component={Home} />
  <Route path="/profile" component={Profile} />
</Router>

<style>
  :global(body) {
    background: linear-gradient(to top, rgb(217, 47, 85), rgb(255, 178, 120));
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
</style>
