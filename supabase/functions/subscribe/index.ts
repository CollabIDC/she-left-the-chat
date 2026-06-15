import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const KIT_API_KEY = "kit_bd8240292e08e27da93f4b767451dc4b";
const KIT_FORM_ID = "9568035";

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { email_address } = await req.json();

    if (!email_address || typeof email_address !== 'string') {
      return new Response(JSON.stringify({ error: 'email_address is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const headers = {
      'Content-Type': 'application/json',
      'X-Kit-Api-Key': KIT_API_KEY,
    };
    const body = JSON.stringify({ email_address });

    const subRes = await fetch('https://api.kit.com/v4/subscribers', {
      method: 'POST',
      headers,
      body,
    });
    const subText = await subRes.text();

    const formRes = await fetch(`https://api.kit.com/v4/forms/${KIT_FORM_ID}/subscribers`, {
      method: 'POST',
      headers,
      body,
    });
    const formText = await formRes.text();

    return new Response(
      JSON.stringify({
        success: true,
        subscriber: { status: subRes.status, body: subText },
        form: { status: formRes.status, body: formText },
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('subscribe error:', error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
