import { redirect } from "react-router";
import { authenticate, MONTHLY_PLAN, ANNUAL_PLAN } from "../shopify.server";

export const loader = async ({ request }) => {
  const { billing, session } = await authenticate.admin(request);
  const { shop } = session;

  const billingCheck = await billing.check({
    plans: [MONTHLY_PLAN, ANNUAL_PLAN],
    isTest: true,
  });

  if (!billingCheck.hasActivePayment) {
    // No active plan — request one
    return billing.request({
      plan: MONTHLY_PLAN,
      isTest: true,
      returnUrl: `https://admin.shopify.com/store/${shop.replace(
        ".myshopify.com",
        ""
      )}/apps/${process.env.SHOPIFY_API_KEY}`,
    });
  }

  // Already subscribed — redirect to Shopify subscription management
  return redirect(
    `https://admin.shopify.com/store/${shop.replace(
      ".myshopify.com",
      ""
    )}/charges/${process.env.SHOPIFY_API_KEY}/pricing_plans`
  );
};
