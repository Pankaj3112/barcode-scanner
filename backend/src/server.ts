import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

app.post("/product/:barcode", async (req: any, res: any) => {
  const { barcode } = req.params;
  const { fields } = req.body;

  try {
    if (!barcode) {
      res.json({ success: false, message: "Send correct barcode" });
    }

    const response = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
    );

    let data = await response.json();

    if (data.status === 0) {
      return res.json({ success: false, message: "Product not found" });
    }

	data = data.product;
	
	const product: any = {};
	fields.map((field: string) => {
		product[field] = data[field];
	})

    res.json({ success: true, data: product });
  } catch (err) {
    res.json({ success: false, message: "Something went wrong" });
  }
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
