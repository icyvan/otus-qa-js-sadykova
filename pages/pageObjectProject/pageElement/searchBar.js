export function searchBar(page) {
  const searchField = page.locator('[id="search"]');
  const searchButton = page.locator('button[title="Search"]');
  const searchResults = page.locator('.product-item');

  async function goToSearch(product) {
    await searchField.click();
    await searchField.fill(product);
    await searchButton.click();
  }

  return {
    goToSearch,
    searchResults
  };
}
