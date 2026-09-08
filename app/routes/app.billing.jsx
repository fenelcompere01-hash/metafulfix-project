import { redirect } from "@remix-run/node";
import { authenticate, MONTHLY_PLAN, ANNUAL_PLAN } from "../shopify.server";

export const loader = async ({ request }) => {
  const { billing, session } = await authenticate.admin(request);
  const { shop } = session;

  await billing.require({
    plans: [MONTHLY_PLAN, ANNUAL_PLAN],
    isTest: true,
    onFailure: async () =>
      billing.request({
        plan: MONTHLY_PLAN,
        isTest: true,
        returnUrl: `https://admin.shopify.com/store/${shop.replace(
          ".myshopify.com",
          ""
        )}/apps/${process.env.SHOPIFY_API_KEY}`,
      }),
  });

  return redirect("/app");
};
