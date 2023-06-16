<script lang="ts">
  import { Link, Router, Route } from "svelte-routing";
  import Home from "./routes/Home.svelte";
  import ProductDetail from "./routes/ProductDetail.svelte";
  export let url = "/";
</script>

<Router>
    <Route path="/" component={Home} />
    <Route path="/productdetail" component={ProductDetail} />
</Router>