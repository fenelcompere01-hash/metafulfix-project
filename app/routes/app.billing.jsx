import { authenticate, MONTHLY_PLAN, ANNUAL_PLAN } from "../shopify.server";

export const loader = async ({ request }) => {
  const { billing, session } = await authenticate.admin(request);
  const { shop } = session;

  const billingCheck = await billing.check({
    plans: [MONTHLY_PLAN, ANNUAL_PLAN],
    isTest: true,
  });

  if (!billingCheck.hasActivePayment) {
    return billing.request({
      plan: MONTHLY_PLAN,
      isTest: true,
      returnUrl: `https://admin.shopify.com/store/${shop.replace(".myshopify.com", "")}/apps/${process.env.SHOPIFY_API_KEY}`,
    });
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: `https://admin.shopify.com/store/${shop.replace(".myshopify.com", "")}/charges/${process.env.SHOPIFY_API_KEY}/pricing_plans`,
    },
  });
};
