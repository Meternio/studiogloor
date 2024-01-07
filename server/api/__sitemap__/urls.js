// server/api/__sitemap__/urls.js
export default defineSitemapEventHandler(async () => {
  const response = await fetch(`https://api.storyblok.com/v2/cdn/links/?starts_with=art-gallery&is_startpage=0&token=${process.env.STORYBLOK_TOKEN}`);
  const data = await response.json();

  //iterate over links object and create array of objects with loc and _sitemap keys
  const links = Object.keys(data.links).map((key) => {
    return {
      loc: `/${data.links[key].slug}`,
      _sitemap: "pages",
    };
  });

  return links;
});