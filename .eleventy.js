import pluginRss from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
// Own configuration
import * as filters from "./src/_config/filters.js";
import * as collections from "./src/_config/collections.js";
import * as libraries from "./src/_config/libraries.js";
import * as shortcodes from "./src/_config/shortcodes.js";
import { TEMPLATE_ENGINE } from "./src/_config/constants.js";

export default async function (config) {
  // Handling assets (images, fonts, etc.)
  config.addPassthroughCopy({ "./public/": "/" });
  config.addPlugin(pluginRss);
  config.addPlugin(syntaxHighlight);
  // filters
  Object.keys(filters).forEach((name) => {
    config.addFilter(name, filters[name]);
  });

  // collections
  Object.keys(collections).forEach((name) => {
    config.addCollection(name, collections[name]);
  });

  // amending libraries
  Object.keys(libraries).forEach((name) => {
    config.amendLibrary(name, libraries[name]);
  });

  // shortcodes
  Object.keys(shortcodes).forEach((name) => {
    config.addShortcode(name, shortcodes[name]);
  });

  return {
    markdownTemplateEngine: TEMPLATE_ENGINE,
    dataTemplateEngine: TEMPLATE_ENGINE,
    htmlTemplateEngine: TEMPLATE_ENGINE,
    dir: {
      input: "src",
      layouts: "_layouts",
      output: "_site",
    },
  };
}
