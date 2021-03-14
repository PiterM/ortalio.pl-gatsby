require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  // flags: {
  //   PRESERVE_WEBPACK_CACHE: true,
  //   PRESERVE_FILE_DOWNLOAD_CACHE: true,
  // },
  siteMetadata: {
    title: `Ortalio - Muzyka Słowa Wokal | Music Lyrics Voice`,
    siteUrl: 'https://ortalio.pl'
  },
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "ortl",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "ortl",
        // Url to query from
        url: process.env.GRAPHQL_ORTALIO_WORDPRESS_URL,
      },
    },
    
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: 'https://ortalio.pl',
        sitemap: null,
        policy: [{ userAgent: '*', allow: '/', disallow: null }]
      }
    },
  ],
}
