import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const VAPI_API_KEY = Deno.env.get("VAPI_API_KEY")!;
const VAPI_OUTBOUND_ASSISTANT_ID = Deno.env.get("VAPI_OUTBOUND_ASSISTANT_ID")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;

serve(async (req) => {
  const { action, customerPhone, customerEmail, customerName } = await req.json();

  if (action === "make_call") {
    const vapiRes = await fetch("https://api.vapi.ai/call/phone", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${VAPI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assistantId: VAPI_OUTBOUND_ASSISTANT_ID,
        customer: { number: customerPhone, name: customerName },
      }),
    });
    return new Response(JSON.stringify(await vapiRes.json()), { status: 200 });
  }

  if (action === "send_email") {
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: customerEmail,
        subject: "Welcome to Piloteyo AI",
        html: `<p>Hi ${customerName}, thanks for reaching out!</p>`,
      }),
    });
    return new Response(JSON.stringify(await emailRes.json()), { status: 200 });
  }

  return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400 });
});