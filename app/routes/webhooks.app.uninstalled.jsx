import { authenticate } from "../shopify.server";
import db from "../db.server";

export const action = async ({ request }) => {
  const { shop, session, topic } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);

  // Delete shop data when uninstalled
  const storeSessions = await db.session.deleteMany({ where: { shop } });
  console.log(`Deleted ${storeSessions.count} sessions for ${shop}`);

  return new Response();
};
