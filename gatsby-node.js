require('typescript-require');

let basePath;
exports.onPreBootstrap = () => {
  basePath = `/`;
};

exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
    const config = getConfig()
    if (stage.startsWith('develop') && config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'react-dom': '@hot-loader/react-dom'
      }
    }
}

const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions;
  createResolvers({
    ortl_MediaItem: {
      imageFile: {
        type: `File`,
        resolve(source) {
          return createRemoteFileNode({
            url: encodeURI(source.sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      }
    },
  })
}

exports.createPages = async ({ page, graphql, actions, reporter }) => {
  const { createPage } = actions;
  const App = require.resolve('./src/app/app.tsx');

  const ortalioData = await graphql(`
    query {
      ortl {
        ortalioMedias(first:100) {
          edges {
            node {
              id
              slug
              ortalioMediaField {
                title
                content
                fieldGroupName
                shortDescription
                soundcloudUrl
                youtubeUrl
              }
              featuredImage {
                node {
                  altText
                  sourceUrl(size: THUMBNAIL)
                  imageFile {
                    childImageSharp {
                      fixed(width: 100, height: 100) {
                        width
                        height
                        src
                        srcSet
                      }
                    }
                  }
                }
              }
            }
          }
        }
        ortalioSettingBy(slug: "site-global-data") {
          ortalioSettingsField {
            metaDescription
            metaKeywords
            metaTitle
            siteDescription
            siteIntro
            siteTitle
          }
        }
        ortalioSocialMedias(first:20) {
          edges {
            node {
              ortalioSocialMediaField {
                url
              }
              featuredImage {
                node { 
                  altText
                  sourceUrl
                  imageFile {
                    childImageSharp {
                      fixed(width: 100, height: 50) {
                        width
                        height
                        src
                        srcSet
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
`);

  if (ortalioData.errors) {
    reporter.panic(ortalioData.errors);
  }

  const data = ortalioData?.data?.ortl;

  createPage({
    path: basePath,
    component: App,
    context: { data }
  });
};