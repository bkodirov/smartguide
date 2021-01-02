module.exports = ({ env }) => ({
  plugins: {
    navigation: {
      additionalFields: ['audience'],
        excludedContentTypes: ["plugins::", "strapi"],
        allowedLevels: 2,
        contentTypesNameFields: {
        'blog_posts': ['altTitle'],
          'pages': ['title'],
      },
    },
  },
});
