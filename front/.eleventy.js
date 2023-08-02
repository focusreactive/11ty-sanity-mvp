let Nunjucks = require("nunjucks");
const ClientObj = require("@sanity/client");
const imageUrlBuilder = require('@sanity/image-url');
const blocksToHtml = require('@sanity/block-content-to-html')


const client = ClientObj.createClient({
	projectId: "nzudkmke",
	dataset: "production",
	token: 'sk4pvS2ZY8GiQuEiYsW4eIEQ9Vgcuh1xhMnL80ch5sA3ozTtHkpJfqJItI4pyWvT2ijrE2Mlszuee9hPTlTq0U3yy54jTcdPohzqms00vxfzIpzOFqdOOtuMSTAiUEFaVa2i3XVjUpLxIPjclRbCqxM0d85dqv7cigcTOiTEC2jsYfYLRt3w',
	useCdn: true,
});

const builder = imageUrlBuilder(client);

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/assets");

	let nunjucksEnvironment = new Nunjucks.Environment(
		new Nunjucks.FileSystemLoader("src/_includes"),
		{
			autoescape: false,
		}
	);

	nunjucksEnvironment.addFilter('imgURL', function(value) {
		return builder.image(value).url()
	})

	nunjucksEnvironment.addFilter('blockContent', function(value) {
		return blocksToHtml({
			blocks: value
		})
	})

	eleventyConfig.setLibrary("njk", nunjucksEnvironment);

	return {
		addPassthroughFileCopy: true,
		markdownTemplateEngine: "njk",
		HTMLTemplateEngine: "njk",
		dataTemplateEngine: "njk",
		templateFormats: ["html", "njk", "md"],
		dir: {
			input: "src",
			output: "_site",
			includes: "_includes",
			layouts: "_layouts",
		},
	};
};
