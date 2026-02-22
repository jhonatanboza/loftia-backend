import mercadopago from "mercadopago";

mercadopago.configurations.setAccessToken("SEU_ACCESS_TOKEN");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { quantity } = req.body;

    const preference = {
      items: [
        {
          title: "Kit 3 Luminárias LED",
          quantity: Number(quantity),
          unit_price: 129.9,
        },
      ],
      back_urls: {
        success: "https://loftia.com.br/obrigado.html",
        failure: "https://loftia.com.br/falha.html",
        pending: "https://loftia.com.br/pendente.html"
      },
      auto_return: "approved",
    };

    try {
      const response = await mercadopago.preferences.create(preference);
      res.status(200).json({ id: response.body.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
