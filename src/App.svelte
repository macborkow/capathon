<script lang="ts">
  import { Link, Router, Route } from "svelte-routing";
  import Counter from "./lib/Counter.svelte";
  import Home from "./routes/Home.svelte";
  import ProductDetail from "./routes/ProductDetail.svelte";
  import Scanner from "./Scanner.svelte"
  export let url = "/";
</script>

<main>
  <Router {url}>
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/productdetail">Productdetail</Link>
    </nav>
    <div>
      <Route path="/home" component={Home} />
      <Route path="/productdetail" component={ProductDetail} />
    </div>
  </Router>
</main>