import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Articles",
        path: "content/posts",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titre",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (URL)",
            description:
              "Identifiant URL de l'article (auto-généré depuis le titre si vide)",
          },
          {
            type: "datetime",
            name: "date",
            label: "Date de publication",
            required: true,
          },
          {
            type: "image",
            name: "featuredImage",
            label: "Image à la une",
          },
          {
            type: "string",
            name: "category",
            label: "Catégorie",
            options: [
              { value: "article", label: "Article" },
              { value: "reportage", label: "Reportage" },
              { value: "video", label: "Vidéo" },
            ],
          },
          {
            type: "string",
            name: "excerpt",
            label: "Résumé court",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "body",
            label: "Contenu (HTML)",
            ui: {
              component: "textarea",
            },
          },
        ],
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              return (
                values?.slug ||
                values?.title
                  ?.toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-|-$/g, "") ||
                ""
              );
            },
          },
        },
      },
    ],
  },
});
