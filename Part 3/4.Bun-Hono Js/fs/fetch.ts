async function fetchDemo() {
  const res = await fetch('https://dummyjson.com/products/1');
  const data = await res.json();
  console.log(data)
}
fetchDemo()