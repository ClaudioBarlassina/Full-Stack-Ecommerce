import { Router } from "express";
import fs from "fs";

const router = Router();
const DB_PATH = "./data/db.json";

/* helpers */
const readDB = () => {
  const data = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data).products;
};

const writeDB = (products) => {
  fs.writeFileSync(
    DB_PATH,
    JSON.stringify({ products }, null, 2)
  );
};

/* =========================
   GET /productos
   ========================= */
router.get("/", (req, res) => {
  console.log("Query params:", req.query);

  const { 
    category,
    brand,  
    minPrice, 
    maxPrice, 
    search,
    page = 1, 
    limit = 10 
  } = req.query;

  let products = readDB();

  /* =========================
     FILTROS
     ========================= */

  if (category) {
    products = products.filter(
      p => p.category?.toLowerCase() === category.toLowerCase()
    );
  }

  if (minPrice) {
    products = products.filter(
      p => p.price >= Number(minPrice)
    );
  }

  if (maxPrice) {
    products = products.filter(
      p => p.price <= Number(maxPrice)
    );
  }

  if (search) {
    products = products.filter(
      p => p.name?.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (brand) {
  products = products.filter(
    p => p.brand?.toLowerCase() === brand.toLowerCase()
  );
}

  /* =========================
     PAGINACIÓN
     ========================= */

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const start = (pageNumber - 1) * limitNumber;
  const end = start + limitNumber;

  const paginatedProducts = products.slice(start, end);

  res.json({
    total: products.length,
    page: pageNumber,
    totalPages: Math.ceil(products.length / limitNumber),
    data: paginatedProducts
  });
});


/* =========================
   GET /productos/:id
   ========================= */
router.get("/:id", (req, res) => {
  const products = readDB();
  const product = products.find(p => p.id == req.params.id);

  if (!product) {
    return res.status(404).json({ error: "No encontrado" });
  }

  res.json(product);
});

/* =========================
   POST /productos
   ========================= */
router.post("/", (req, res) => {
  const products = readDB();

  const newProduct = {
    id: Date.now(),
    ...req.body
  };

  products.push(newProduct);
  writeDB(products);

  res.status(201).json(newProduct);
});

export default router;
