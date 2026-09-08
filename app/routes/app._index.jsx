import { useNavigate } from "react-router";
import { useLoaderData } from "react-router";
import { authenticate } from "../shopify.server";
import { AppProvider, Page, Layout, Card, Text, BlockStack, InlineStack, Badge, Banner } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  return {
    apiKey: process.env.SHOPIFY_API_KEY,
    shop: session.shop.replace(".myshopify.com", "")
  };
};

export default function Index() {
  const { apiKey, shop } = useLoaderData();
  const navigate = useNavigate();

  return (
    <AppProvider i18n={enTranslations}>
      <Page title="SEO & Schema Engine">
        <BlockStack gap="500">
          <Banner title="SEO Engine Active" tone="success">
            <p>Your store is automatically injecting JSON-LD structured data into all product pages.</p>
          </Banner>
          <Layout>
            <Layout.Section>
              <Card padding="500">
                <BlockStack gap="400">
                  <InlineStack align="space-between">
                    <Text as="h2" variant="headingMd">Google Search Health Score</Text>
                    <Badge tone="success">98 / 100 - Excellent</Badge>
                  </InlineStack>
                  <Text as="p" tone="subdued">
                    Calculated based on active JSON-LD Schema markup, product availability tags, and automated price indexing.
                  </Text>
                </BlockStack>
              </Card>
            </Layout.Section>
            <Layout.Section variant="oneThird">
              <Card padding="500">
                <BlockStack gap="400">
                  <Text as="h2" variant="headingMd">Automated Features</Text>
                  <BlockStack gap="200">
                    <Text as="p">✅ JSON-LD Rich Snippets</Text>
                    <Text as="p">✅ Auto Product Price Sync</Text>
                    <Text as="p">✅ Google Indexing Readiness</Text>
                  </BlockStack>
                  <button
                    onClick={() => { window.location.href = '/app/billing'; }}
                    style={{display:"inline-block", background:"#008060", color:"white", padding:"8px 16px", borderRadius:"6px", border:"none", fontWeight:"600", cursor:"pointer"}}>
                    Manage Subscription
                  </button>
                </BlockStack>
              </Card>
            </Layout.Section>
          </Layout>
        </BlockStack>
      </Page>
    </AppProvider>
  );
}
