const products = [
  // ===== OILY SKIN =====
  {
    _id: "prod-oily-001",
    name: "La Roche-Posay Effaclar Purifying Foaming Gel",
    brand: "La Roche-Posay (France)",
    skinType: "Oily",
    description:
      "Dermatologist-tested cleanser formulated for oily and acne-prone skin. Helps remove excess oil without over-drying.",
  },
  {
    _id: "prod-oily-002",
    name: "Biore UV Aqua Rich Watery Essence",
    brand: "Biore (Japan)",
    skinType: "Oily",
    description:
      "Lightweight, oil-free sunscreen suitable for oily skin. Clinically tested and non-comedogenic.",
  },
  {
    _id: "prod-oily-003",
    name: "Innisfree No Sebum Mineral Powder",
    brand: "Innisfree (South Korea)",
    skinType: "Oily",
    description:
      "Sebum-control powder designed to reduce shine and keep skin matte throughout the day.",
  },
  {
    _id: "prod-oily-004",
    name: "Shiseido Waso Quick Matte Moisturizer",
    brand: "Shiseido (Japan)",
    skinType: "Oily",
    description:
      "Lightweight moisturizer developed to balance oil production while maintaining hydration.",
  },
  {
    _id: "prod-oily-005",
    name: "Caudalie Vinopure Purifying Gel Cleanser",
    brand: "Caudalie (France)",
    skinType: "Oily",
    description:
      "Purifying gel cleanser developed to reduce excess oil and refine pores. Dermatologically tested.",
  },
  {
    _id: "prod-oily-006",
    name: "Bioderma Sébium Foaming Gel",
    brand: "Bioderma (France)",
    skinType: "Oily",
    description:
      "Dermatologist-developed cleanser designed to gently purify oily and combination skin.",
  },
  {
    _id: "prod-oily-007",
    name: "COSRX Oil-Free Ultra-Moisturizing Lotion",
    brand: "COSRX (South Korea)",
    skinType: "Oily",
    description:
      "Lightweight lotion suitable for oily and acne-prone skin types.",
  },

  // ===== DRY SKIN =====
  {
    _id: "prod-dry-001",
    name: "La Roche-Posay Lipikar Baume AP+M",
    brand: "La Roche-Posay (France)",
    skinType: "Dry",
    description:
      "Dermatologist-recommended moisturizer for dry and very dry skin. Helps restore skin barrier.",
  },
  {
    _id: "prod-dry-002",
    name: "Pond's Rejuveness Anti-Wrinkle Cream",
    brand: "Pond's (Global)",
    skinType: "Dry",
    description:
      "Hydrating cream tested for skin compatibility and designed to improve skin smoothness.",
  },
  {
    _id: "prod-dry-003",
    name: "Beauty of Joseon Dynasty Cream",
    brand: "Beauty of Joseon (South Korea)",
    skinType: "Dry",
    description:
      "Deeply moisturizing cream formulated with traditional herbal ingredients for hydration support.",
  },
  {
    _id: "prod-dry-004",
    name: "Shiseido Essential Energy Hydrating Cream",
    brand: "Shiseido (Japan)",
    skinType: "Dry",
    description:
      "Clinically tested moisturizer that delivers long-lasting hydration.",
  },
  {
    _id: "prod-dry-005",
    name: "Caudalie Vinosource-Hydra Moisturizing Cream",
    brand: "Caudalie (France)",
    skinType: "Dry",
    description:
      "Hydrating cream formulated to restore moisture and comfort for dry skin.",
  },
  {
    _id: "prod-dry-006",
    name: "Hada Labo Gokujyun Hyaluronic Acid Lotion",
    brand: "Hada Labo (Japan)",
    skinType: "Dry",
    description:
      "Hydrating lotion formulated with hyaluronic acid to deeply moisturize dry skin.",
  },
  {
    _id: "prod-dry-007",
    name: "SK-II Skinpower Cream",
    brand: "SK-II (Japan)",
    skinType: "Dry",
    description:
      "Advanced moisturizing cream developed to support skin elasticity.",
  },
  {
    _id: "prod-dry-008",
    name: "Laneige Water Bank Blue Hyaluronic Cream",
    brand: "Laneige (South Korea)",
    skinType: "Dry",
    description:
      "Hydrating cream clinically tested to improve skin moisture retention.",
  },

  // ===== COMBINATION SKIN =====
  {
    _id: "prod-combo-001",
    name: "Avène Cleanance Hydra Soothing Cream",
    brand: "Avène (France)",
    skinType: "Combination",
    description:
      "Dermatologist-developed cream for combination skin needing balanced hydration.",
  },
  {
    _id: "prod-combo-002",
    name: "Innisfree Green Tea Seed Serum",
    brand: "Innisfree (South Korea)",
    skinType: "Combination",
    description:
      "Hydrating serum formulated to balance moisture levels without excess oil.",
  },
  {
    _id: "prod-combo-003",
    name: "Biore Deep Pore Charcoal Cleanser",
    brand: "Biore (Japan)",
    skinType: "Combination",
    description:
      "Deep-cleansing formula designed to remove impurities and excess oil.",
  },
  {
    _id: "prod-combo-004",
    name: "Beauty of Joseon Glow Serum",
    brand: "Beauty of Joseon (South Korea)",
    skinType: "Combination",
    description:
      "Lightweight serum formulated to improve clarity and hydration balance.",
  },
  {
    _id: "prod-combo-005",
    name: "Hada Labo Shirojyun Whitening Lotion",
    brand: "Hada Labo (Japan)",
    skinType: "Combination",
    description:
      "Lightweight hydrating toner developed to balance moisture levels.",
  },
  {
    _id: "prod-combo-006",
    name: "SK-II Facial Treatment Essence",
    brand: "SK-II (Japan)",
    skinType: "Combination",
    description:
      "Iconic essence clinically tested to improve skin texture and radiance.",
  },
  {
    _id: "prod-combo-007",
    name: "Laneige Water Sleeping Mask",
    brand: "Laneige (South Korea)",
    skinType: "Combination",
    description:
      "Overnight mask designed to restore hydration and refresh tired skin.",
  },

  // ===== SENSITIVE SKIN =====
  {
    _id: "prod-sensitive-001",
    name: "La Roche-Posay Toleriane Hydrating Gentle Cleanser",
    brand: "La Roche-Posay (France)",
    skinType: "Sensitive",
    description:
      "Dermatologist-tested gentle cleanser designed for sensitive and reactive skin.",
  },
  {
    _id: "prod-sensitive-002",
    name: "Dr. Belmeur Daily Repair Moisturizer",
    brand: "Dr. Belmeur (South Korea)",
    skinType: "Sensitive",
    description:
      "Hypoallergenic moisturizer tested for sensitive skin to support barrier repair.",
  },
  {
    _id: "prod-sensitive-003",
    name: "Avène Thermal Spring Water Spray",
    brand: "Avène (France)",
    skinType: "Sensitive",
    description:
      "Soothing thermal water spray clinically tested to calm sensitive skin.",
  },
  {
    _id: "prod-sensitive-004",
    name: "Shiseido Ultimune Power Infusing Concentrate",
    brand: "Shiseido (Japan)",
    skinType: "Sensitive",
    description:
      "Strengthening serum developed with skin compatibility testing.",
  },
  {
    _id: "prod-sensitive-005",
    name: "Bioderma Sensibio H2O Micellar Water",
    brand: "Bioderma (France)",
    skinType: "Sensitive",
    description:
      "Gentle micellar solution clinically tested for sensitive skin tolerance.",
  },
  {
    _id: "prod-sensitive-006",
    name: "COSRX Low pH Good Morning Gel Cleanser",
    brand: "COSRX (South Korea)",
    skinType: "Sensitive",
    description:
      "Mild cleanser formulated for sensitive skin with low pH balance.",
  },
  {
    _id: "prod-sensitive-007",
    name: "Etude House SoonJung 2x Barrier Intensive Cream",
    brand: "Etude House (South Korea)",
    skinType: "Sensitive",
    description:
      "Hypoallergenic cream tested for sensitive and damaged skin barriers.",
  },
];

module.exports = products;