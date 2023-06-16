<script lang="ts">
  import { Link, Router, Route } from "svelte-routing";
  import Home from "./routes/Home.svelte";
  import Overview from "./routes/Overview.svelte";

  export let url = "/";
</script>

<Router>
    <Route path="/" component={Home} />
    <Route path="/overview" component={Overview} />
</Router>
