import { authenticate } from "../shopify.server"; 
export async function action({ request }) { 
  try { 
    const { topic, shop, session, payload } = await authenticate.webhooks(request); 
    switch (topic) { 
      case "CUSTOMERS_DATA_REQUEST": 
      case "CUSTOMERS_REDACT": 
      case "SHOP_REDACT": 
        return new Response("OK", { status: 200 }); 
      default: 
        return new Response("Unhandled topic", { status: 404 }); 
    } 
  } catch (error) { 
    return new Response("Unauthorized", { status: 401 }); 
  } 
} 
