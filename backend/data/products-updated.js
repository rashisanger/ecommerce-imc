const products = [
  {
    "name": "Aloe Baby Hair & Body Wash",
    "description": "Gentle herbal wash for baby’s sensitive skin and hair with Aloe Vera.",
    "price": 285,
    "discountPrice": 250,
    "countInStock": 50,
    "sku": "IMC-BABY-001",
    "category": "Baby Care",
    "collections": "Baby Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798640/products/IMC-BABY-001.webp",
        "altText": "Aloe Baby Hair & Body Wash"
      }
    ],
    "isFeatured": true,
    "isPublished": true,
    "tags": [
      "baby",
      "aloe",
      "herbal"
    ]
  },
  {
    "name": "Aloe Baby Talcum Powder",
    "description": "Keeps baby skin fresh, dry and odor-free using natural herbs.",
    "price": 225,
    "countInStock": 40,
    "sku": "IMC-BABY-002",
    "category": "Baby Care",
    "collections": "Baby Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798642/products/IMC-BABY-002.webp",
        "altText": "Aloe Baby Talcum Powder"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "baby",
      "powder",
      "aloe"
    ]
  },
  {
    "name": "Bal Shakti Tonic",
    "description": "Herbal tonic to improve digestion, brain function and growth in kids.",
    "price": 225,
    "countInStock": 30,
    "sku": "IMC-HEALTH-003",
    "category": "Health & Nutrition",
    "collections": "Health & Nutrition",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798651/products/IMC-HEALTH-003.webp",
        "altText": "Bal Shakti Tonic"
      }
    ],
    "isFeatured": true,
    "isPublished": true,
    "tags": [
      "health",
      "kids",
      "tonic"
    ]
  },
  {
    "name": "Moisturizing Lotion for Babies",
    "description": "Hydrating and soothing lotion for delicate baby skin.",
    "price": 275,
    "countInStock": 35,
    "sku": "IMC-BABY-004",
    "category": "Baby Care",
    "collections": "Baby Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798643/products/IMC-BABY-004.webp",
        "altText": "Moisturizing Lotion for Babies"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "baby",
      "lotion",
      "skin"
    ]
  },
  {
    "name": "Massage Oil for Babies",
    "description": "Herbal massage oil to nourish baby’s skin and muscles.",
    "price": 285,
    "countInStock": 25,
    "sku": "IMC-BABY-005",
    "category": "Baby Care",
    "collections": "Baby Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798644/products/IMC-BABY-005.webp",
        "altText": "Massage Oil for Babies"
      }
    ],
    "isFeatured": true,
    "isPublished": true,
    "tags": [
      "baby",
      "oil",
      "massage"
    ]
  },
  {
    "name": "Aloe Charcoal Face Wash",
    "description": "Deep cleansing face wash to remove toxins and excess oil.",
    "price": 235,
    "countInStock": 45,
    "sku": "IMC-SKIN-006",
    "category": "Skin Care",
    "collections": "Skin Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798685/products/IMC-SKIN-006.webp",
        "altText": "Aloe Charcoal Face Wash"
      }
    ],
    "isFeatured": true,
    "isPublished": true,
    "tags": [
      "facewash",
      "charcoal",
      "skin"
    ]
  },
  {
    "name": "Herbal Aloe Gel",
    "description": "Multipurpose aloe gel for glowing and hydrated skin.",
    "price": 90,
    "countInStock": 60,
    "sku": "IMC-SKIN-007",
    "category": "Skin Care",
    "collections": "Skin Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798686/products/IMC-SKIN-007.webp",
        "altText": "Herbal Aloe Gel"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "aloe",
      "gel",
      "skin"
    ]
  },
  {
    "name": "Aloe Almond Cream",
    "description": "Nourishing cream enriched with almond oil and aloe vera.",
    "price": 230,
    "countInStock": 40,
    "sku": "IMC-SKIN-008",
    "category": "Skin Care",
    "collections": "Skin Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798687/products/IMC-SKIN-008.webp",
        "altText": "Aloe Almond Cream"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "cream",
      "almond",
      "skin"
    ]
  },
  {
    "name": "Aloe Fairness Cream",
    "description": "Brightens skin tone and maintains hydration.",
    "price": 390,
    "countInStock": 20,
    "sku": "IMC-SKIN-009",
    "category": "Skin Care",
    "collections": "Skin Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798689/products/IMC-SKIN-009.webp",
        "altText": "Aloe Fairness Cream"
      }
    ],
    "isFeatured": true,
    "isPublished": true,
    "tags": [
      "fairness",
      "cream",
      "skin"
    ]
  },
  {
    "name": "Aloe Sunscreen Lotion SPF 40",
    "description": "Protects skin from UV rays and sunburn.",
    "price": 210,
    "countInStock": 50,
    "sku": "IMC-SKIN-010",
    "category": "Skin Care",
    "collections": "Skin Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798690/products/IMC-SKIN-010.webp",
        "altText": "Aloe Sunscreen Lotion SPF 40"
      }
    ],
    "isFeatured": true,
    "isPublished": true,
    "tags": [
      "sunscreen",
      "spf40",
      "skin"
    ]
  },
  {
    "name": "Aloe Hand Wash Neem Lemon",
    "description": "Antibacterial hand wash with aloe, neem and lemon.",
    "price": 120,
    "countInStock": 80,
    "sku": "IMC-PERSONAL-011",
    "category": "Personal Care",
    "collections": "Personal Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798668/products/IMC-PERSONAL-011.webp",
        "altText": "Aloe Hand Wash Neem Lemon"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "handwash",
      "hygiene",
      "personal"
    ]
  },
  {
    "name": "Antiseptic Talcum Powder",
    "description": "Prevents fungal infection and keeps skin fresh.",
    "price": 180,
    "countInStock": 70,
    "sku": "IMC-PERSONAL-012",
    "category": "Personal Care",
    "collections": "Personal Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798669/products/IMC-PERSONAL-012.webp",
        "altText": "Antiseptic Talcum Powder"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "talcum",
      "antiseptic",
      "personal"
    ]
  },
  {
    "name": "Unisex Perfume",
    "description": "A dash of fragrance will suit your personality. Select and wear IMC Unisex Pocket Perfume.",
    "price": 105,
    "countInStock": 25,
    "sku": "IMC-PERSONAL-013",
    "category": "Personal Care",
    "collections": "Personal Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798670/products/IMC-PERSONAL-013.webp",
        "altText": "Unisex Perfume"
      }
    ],
    "isFeatured": true,
    "isPublished": true,
    "tags": [
      "hair",
      "color",
      "shampoo"
    ]
  },
  {
    "name": "Keshwin Almond Hair Oil",
    "description": "Strengthens hair and nourishes scalp with ayurvedic herbs.",
    "price": 190,
    "countInStock": 45,
    "sku": "IMC-PERSONAL-014",
    "category": "Personal Care",
    "collections": "Personal Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798671/products/IMC-PERSONAL-014.webp",
        "altText": "Keshwin Almond Hair Oil"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "hair",
      "oil",
      "ayurveda"
    ]
  },
  {
    "name": "Aloe Amla Hair Oil",
    "description": "Prevents hair fall and promotes hair growth.",
    "price": 190,
    "countInStock": 50,
    "sku": "IMC-PERSONAL-015",
    "category": "Personal Care",
    "collections": "Personal Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798673/products/IMC-PERSONAL-015.webp",
        "altText": "Aloe Amla Hair Oil"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "hair",
      "amla",
      "oil"
    ]
  },
  {
    "name": "Herbal Breast Fit Cream",
    "description": "Herbal cream formulated to help tone and nourish the skin.",
    "price": 375,
    "countInStock": 25,
    "sku": "IMC-PERSONAL-016",
    "category": "Personal Care",
    "collections": "Personal Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798674/products/IMC-PERSONAL-016.webp",
        "altText": "Herbal Breast Fit Cream"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "herbal",
      "cream",
      "personal"
    ]
  },
  {
    "name": "Aloe Charcoal Dental Gel",
    "description": "Aloe Charcoal Dental Gel helps in maintaining the optimum oral hygiene",
    "price": 151,
    "countInStock": 30,
    "sku": "IMC-PERSONAL-017",
    "category": "Personal Care",
    "collections": "Personal Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798675/products/IMC-PERSONAL-017.webp",
        "altText": "Aloe Charcoal Dental Gel"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "herbal",
      "personal",
      "care"
    ]
  },
  {
    "name": "Aloe Kesar Bathing Bar",
    "description": "Ayurvedic bathing bar enriched with aloe, tulsi and kesar.",
    "price": 110,
    "countInStock": 60,
    "sku": "IMC-SKIN-018",
    "category": "Skin Care",
    "collections": "Skin Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798691/products/IMC-SKIN-018.webp",
        "altText": "Aloe Kesar Bathing Bar"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "soap",
      "ayurvedic",
      "skin"
    ]
  },
  {
    "name": "Aloe Multani Mitti Bathing Bar",
    "description": "Cleanses skin and helps remove dead skin cells naturally.",
    "price": 105,
    "countInStock": 55,
    "sku": "IMC-SKIN-019",
    "category": "Skin Care",
    "collections": "Skin Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798692/products/IMC-SKIN-019.webp",
        "altText": "Aloe Multani Mitti Bathing Bar"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "soap",
      "multani",
      "skin"
    ]
  },
  {
    "name": "Aloe Panchgavya Bathing Bar",
    "description": "Traditional ayurvedic soap for gentle cleansing and nourishment.",
    "price": 110,
    "countInStock": 45,
    "sku": "IMC-SKIN-020",
    "category": "Skin Care",
    "collections": "Skin Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798694/products/IMC-SKIN-020.webp",
        "altText": "Aloe Panchgavya Bathing Bar"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "soap",
      "ayurveda",
      "skin"
    ]
  },
  {
    "name": "After Shaving Lotion",
    "description": "Aloe After shaving lotion",
    "price": 169,
    "countInStock": 80,
    "sku": "IMC-SKIN-021",
    "category": "Skin Care",
    "collections": "Skin Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798695/products/IMC-SKIN-021.webp",
        "altText": "After Shaving Lotion"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "aloe",
      "soap",
      "skin"
    ]
  },
  {
    "name": "Ayurvedic Skin Care Soap",
    "description": "Keeps skin clean, youthful and refreshed.",
    "price": 85,
    "countInStock": 70,
    "sku": "IMC-SKIN-022",
    "category": "Skin Care",
    "collections": "Skin Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798697/products/IMC-SKIN-022.webp",
        "altText": "Ayurvedic Skin Care Soap"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "ayurvedic",
      "soap",
      "skin"
    ]
  },
  {
    "name": "Charcoal Tulsi Cucumber Soap",
    "description": "Activated charcoal soap for deep cleansing and oil control.",
    "price": 100,
    "countInStock": 50,
    "sku": "IMC-SKIN-023",
    "category": "Skin Care",
    "collections": "Skin Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798698/products/IMC-SKIN-023.webp",
        "altText": "Charcoal Tulsi Cucumber Soap"
      }
    ],
    "isFeatured": true,
    "isPublished": true,
    "tags": [
      "charcoal",
      "soap",
      "skin"
    ]
  },
  {
    "name": "Massage Oil",
    "description": "Herbal massage oil for skin nourishment and relaxation.",
    "price": 115,
    "countInStock": 60,
    "sku": "IMC-PERSONAL-024",
    "category": "Personal Care",
    "collections": "Personal Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798676/products/IMC-PERSONAL-024.webp",
        "altText": "Massage Oil"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "oil",
      "massage",
      "herbal"
    ]
  },
  {
    "name": "Keshwin Aloe Icy Hair Oil",
    "description": "Cooling hair oil with aloe and ayurvedic herbs.",
    "price": 185,
    "countInStock": 40,
    "sku": "IMC-PERSONAL-025",
    "category": "Personal Care",
    "collections": "Personal Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798677/products/IMC-PERSONAL-025.webp",
        "altText": "Keshwin Aloe Icy Hair Oil"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "hair",
      "oil",
      "cooling"
    ]
  },
  {
    "name": "Keshwin Herbal Hair Oil",
    "description": "Ayurvedic hair oil for nourishment and relaxation.",
    "price": 190,
    "countInStock": 35,
    "sku": "IMC-PERSONAL-026",
    "category": "Personal Care",
    "collections": "Personal Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798678/products/IMC-PERSONAL-026.webp",
        "altText": "Keshwin Herbal Hair Oil"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "hair",
      "herbal",
      "oil"
    ]
  },
  {
    "name": "Aloe Almond Cream",
    "description": "Moisturizing cream for daily skin care.",
    "price": 230,
    "countInStock": 40,
    "sku": "IMC-SKIN-027",
    "category": "Skin Care",
    "collections": "Skin Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798699/products/IMC-SKIN-027.webp",
        "altText": "Aloe Almond Cream"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "cream",
      "skin",
      "aloe"
    ]
  },
  {
    "name": "Herbal Face Scrub",
    "description": "Gentle exfoliating scrub with herbal ingredients.",
    "price": 220,
    "countInStock": 45,
    "sku": "IMC-SKIN-028",
    "category": "Skin Care",
    "collections": "Skin Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798701/products/IMC-SKIN-028.webp",
        "altText": "Herbal Face Scrub"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "scrub",
      "face",
      "herbal"
    ]
  },
  {
    "name": "Aloe Face and Body Scrub",
    "description": "Rejuvenating face scrub for glowing skin.",
    "price": 360,
    "countInStock": 100,
    "sku": "IMC-SKIN-029",
    "category": "Skin Care",
    "collections": "Skin Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798702/products/IMC-SKIN-029.webp",
        "altText": "Aloe Face and Body Scrub"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "facepack",
      "herbal",
      "skin"
    ]
  },
  {
    "name": "Aloe Rose Water",
    "description": "Refreshing rose water enriched with aloe vera.",
    "price": 99,
    "countInStock": 80,
    "sku": "IMC-SKIN-030",
    "category": "Skin Care",
    "collections": "Skin Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798703/products/IMC-SKIN-030.webp",
        "altText": "Aloe Rose Water"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "rose",
      "aloe",
      "skin"
    ]
  },
  {
    "name": "Herbal Lip Glow",
    "description": "Lip balm to keep lips soft and moisturized.",
    "price": 245,
    "countInStock": 50,
    "sku": "IMC-PERSONAL-031",
    "category": "Personal Care",
    "collections": "Personal Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798679/products/IMC-PERSONAL-031.webp",
        "altText": "Herbal Lip Glow"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "lip",
      "balm",
      "herbal"
    ]
  },
  {
    "name": "Aloe Calamine Lotion",
    "description": "Soothing lotion for skin irritation and rashes.",
    "price": 245,
    "countInStock": 55,
    "sku": "IMC-SKIN-032",
    "category": "Skin Care",
    "collections": "Skin Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798705/products/IMC-SKIN-032.webp",
        "altText": "Aloe Calamine Lotion"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "calamine",
      "lotion",
      "skin"
    ]
  },
  {
    "name": "Aloe Cleansing Milk",
    "description": "Gentle cleanser to remove impurities and makeup.",
    "price": 150,
    "countInStock": 60,
    "sku": "IMC-SKIN-033",
    "category": "Skin Care",
    "collections": "Skin Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798706/products/IMC-SKIN-033.webp",
        "altText": "Aloe Cleansing Milk"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "cleanser",
      "milk",
      "skin"
    ]
  },
  {
    "name": "Face Toner",
    "description": "Enriched with Vitamin E and other natural nutrients, IMC Face Toner is a natural treatment for the face.",
    "price": 250,
    "countInStock": 90,
    "sku": "IMC-SKIN-034",
    "category": "Skin Care",
    "collections": "Skin Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798707/products/IMC-SKIN-034.webp",
        "altText": "Face Toner"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "Skin Care",
      "toner",
      "face"
    ]
  },
  {
    "name": "Keshwin Anti Dandruff Shampoo",
    "description": "Shampoo to help reduce dandruff and nourish scalp.",
    "price": 280,
    "countInStock": 40,
    "sku": "IMC-PERSONAL-035",
    "category": "Personal Care",
    "collections": "Personal Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798680/products/IMC-PERSONAL-035.webp",
        "altText": "Keshwin Anti Dandruff Shampoo"
      }
    ],
    "isFeatured": true,
    "isPublished": true,
    "tags": [
      "shampoo",
      "hair",
      "dandruff"
    ]
  },
  {
    "name": "Wild Amla Shakti Powder",
    "description": "Herbal powder for daily nutrition support.",
    "price": 250,
    "countInStock": 45,
    "sku": "IMC-HEALTH-036",
    "category": "Health & Nutrition",
    "collections": "Health & Nutrition",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798654/products/IMC-HEALTH-036.webp",
        "altText": "Wild Amla Shakti Powder"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "amla",
      "health",
      "nutrition"
    ]
  },
  {
    "name": "Liver Care Tablets",
    "description": "Ayurvedic tablets to support liver health.",
    "price": 825,
    "countInStock": 25,
    "sku": "IMC-HEALTH-037",
    "category": "Health & Nutrition",
    "collections": "Health & Nutrition",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798655/products/IMC-HEALTH-037.webp",
        "altText": "Liver Care Tablets"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "liver",
      "health",
      "tablets"
    ]
  },
  {
    "name": "Brahmi Vati Tablets",
    "description": "Supports brain health and concentration.",
    "price": 825,
    "countInStock": 20,
    "sku": "IMC-HEALTH-038",
    "category": "Health & Nutrition",
    "collections": "Health & Nutrition",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798657/products/IMC-HEALTH-038.webp",
        "altText": "Brahmi Vati Tablets"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "brain",
      "health",
      "brahmi"
    ]
  },
  {
    "name": "Arjunarishta",
    "description": "Traditional ayurvedic formulation for heart wellness.",
    "price": 295,
    "countInStock": 30,
    "sku": "IMC-HEALTH-039",
    "category": "Health & Nutrition",
    "collections": "Health & Nutrition",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798658/products/IMC-HEALTH-039.webp",
        "altText": "Arjunarishta"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "heart",
      "ayurveda",
      "health"
    ]
  },
  {
    "name": "Infectokare Tablets",
    "description": "Herbal tablets for general wellness support.",
    "price": 835,
    "countInStock": 15,
    "sku": "IMC-HEALTH-040",
    "category": "Health & Nutrition",
    "collections": "Health & Nutrition",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798659/products/IMC-HEALTH-040.webp",
        "altText": "Infectokare Tablets"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "health",
      "tablets",
      "herbal"
    ]
  },
  {
    "name": "Bio Energy Healthy Heart Card",
    "description": "Wellness product designed for heart care.",
    "price": 800,
    "countInStock": 10,
    "sku": "IMC-HEALTH-041",
    "category": "Health & Nutrition",
    "collections": "Health & Nutrition",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798660/products/IMC-HEALTH-041.webp",
        "altText": "Bio Energy Healthy Heart Card"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "heart",
      "energy",
      "health"
    ]
  },
  {
    "name": "Bio Energy Magnetic Watch (Gents)",
    "description": "Magnetic watch designed for wellness support.",
    "price": 11500,
    "countInStock": 5,
    "sku": "IMC-HEALTH-042",
    "category": "Health & Nutrition",
    "collections": "Health & Nutrition",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798662/products/IMC-HEALTH-042.webp",
        "altText": "Bio Energy Magnetic Watch (Gents)"
      }
    ],
    "isFeatured": true,
    "isPublished": true,
    "tags": [
      "watch",
      "energy",
      "health"
    ]
  },
  {
    "name": "Bio Energy Magnetic Watch (Ladies)",
    "description": "Wellness magnetic watch for daily use.",
    "price": 11500,
    "countInStock": 5,
    "sku": "IMC-HEALTH-043",
    "category": "Health & Nutrition",
    "collections": "Health & Nutrition",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798663/products/IMC-HEALTH-043.webp",
        "altText": "Bio Energy Magnetic Watch (Ladies)"
      }
    ],
    "isFeatured": true,
    "isPublished": true,
    "tags": [
      "watch",
      "energy",
      "health"
    ]
  },
  {
    "name": "Puraknari Tablets",
    "description": "Ayurvedic tablets for women wellness support.",
    "price": 2715,
    "countInStock": 10,
    "sku": "IMC-HEALTH-044",
    "category": "Health & Nutrition",
    "collections": "Health & Nutrition",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798664/products/IMC-HEALTH-044.webp",
        "altText": "Puraknari Tablets"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "health",
      "ayurveda",
      "tablets"
    ]
  },
  {
    "name": "Alouric Tablets",
    "description": "Herbal formulation for joint and wellness support.",
    "price": 910,
    "countInStock": 15,
    "sku": "IMC-HEALTH-045",
    "category": "Health & Nutrition",
    "collections": "Health & Nutrition",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798665/products/IMC-HEALTH-045.webp",
        "altText": "Alouric Tablets"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "health",
      "joints",
      "tablets"
    ]
  },
  {
    "name": "Navel Oil",
    "description": "Herbal oil traditionally used for body wellness.",
    "price": 565,
    "countInStock": 20,
    "sku": "IMC-HEALTH-046",
    "category": "Health & Nutrition",
    "collections": "Health & Nutrition",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798667/products/IMC-HEALTH-046.webp",
        "altText": "Navel Oil"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "oil",
      "health",
      "herbal"
    ]
  },
  {
    "name": "Aloe Haldi chandan Face Wash",
    "description": "This Ayurvedic Product - enriched with Aloe Vera, Haldi, Chandan and other natural herbs helps in keeping the face radiant and healthy.",
    "price": 250,
    "countInStock": 90,
    "sku": "IMC-SKIN-047",
    "category": "Skin Care",
    "collections": "Skin Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798708/products/IMC-SKIN-047.webp",
        "altText": "Aloe Haldi chandan Face Wash"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "Skin Care",
      "toner",
      "face"
    ]
  },
  {
    "name": "Aloe Charcaol face Wash",
    "description": "Treat And Pamper The Skin With IMC Aloe Charcoal Facewash.",
    "price": 230,
    "countInStock": 90,
    "sku": "IMC-SKIN-048",
    "category": "Skin Care",
    "collections": "Skin Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798709/products/IMC-SKIN-048.webp",
        "altText": "Aloe Charcaol face Wash"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "Skin Care",
      "toner",
      "face"
    ]
  },
  {
    "name": "Aloe Facial Kit",
    "description": "The kit contains six unique products with potent ingredients which may bring visible difference in the skin keeping it healthier and younger.",
    "price": 665,
    "countInStock": 90,
    "sku": "IMC-SKIN-049",
    "category": "Skin Care",
    "collections": "Skin Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798711/products/IMC-SKIN-049.webp",
        "altText": "Aloe Facial Kit"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "Skin Care",
      "toner",
      "face"
    ]
  },
  {
    "name": "Face Serum",
    "description": "Enriched with Vitamin C and other natural nutrients, IMC Face Serum is a natural treatment for the face.",
    "price": 990,
    "countInStock": 90,
    "sku": "IMC-SKIN-050",
    "category": "Skin Care",
    "collections": "Skin Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798712/products/IMC-SKIN-050.webp",
        "altText": "Face Serum"
      }
    ],
    "isFeatured": false,
    "isPublished": true,
    "tags": [
      "Skin Care",
      "toner",
      "face"
    ]
  },
  {
    "name": "ToothPaste for Babies",
    "description": "Let your baby charm with every smile. For defending, protecting and shining the teeth of babies",
    "price": 98,
    "countInStock": 35,
    "sku": "IMC-BABY-051",
    "category": "Baby Care",
    "collections": "Baby Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798646/products/IMC-BABY-051.webp",
        "altText": "ToothPaste for Babies"
      }
    ],
    "isFeatured": true,
    "isPublished": true,
    "tags": [
      "scrub",
      "aloeberry",
      "skin",
      "baby"
    ]
  },
  {
    "name": "Aloe Baby Skin Bar",
    "description": "Let your baby charm with every smile. For defending, protecting and shining the teeth of babies",
    "price": 116,
    "countInStock": 35,
    "sku": "IMC-BABY-052",
    "category": "Baby Care",
    "collections": "Baby Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798648/products/IMC-BABY-052.webp",
        "altText": "Aloe Baby Skin Bar"
      }
    ],
    "isFeatured": true,
    "isPublished": true,
    "tags": [
      "scrub",
      "aloeberry",
      "skin",
      "baby"
    ]
  },
  {
    "name": "Aloe Baby Wipes",
    "description": "Aloe Baby Wipes are specially manufactured to take care of the tender and gentle skin of babies.",
    "price": 279,
    "countInStock": 35,
    "sku": "IMC-BABY-053",
    "category": "Baby Care",
    "collections": "Baby Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798650/products/IMC-BABY-053.webp",
        "altText": "Aloe Baby Wipes"
      }
    ],
    "isFeatured": true,
    "isPublished": true,
    "tags": [
      "scrub",
      "aloeberry",
      "skin",
      "baby"
    ]
  },
  {
    "name": "Aloe Shower Gel",
    "description": "Consisting of ingredients such as Aloe Extract, Neem Extract, Tulsi Oil, Lemon Peel Oil, this amazing product Aloe Shower Gel is a health friendly skincare product.",
    "price": 280,
    "countInStock": 40,
    "sku": "IMC-PERSONAL-054",
    "category": "Personal Care",
    "collections": "Personal Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798681/products/IMC-PERSONAL-054.webp",
        "altText": "Aloe Shower Gel"
      }
    ],
    "isFeatured": true,
    "isPublished": true,
    "tags": [
      "shampoo",
      "hair",
      "dandruff"
    ]
  },
  {
    "name": "Moisturizing Lotion",
    "description": "The soft and supple core of Aloe Vera gives Aloe Moisturising Lotion a naturally soothing power.",
    "price": 280,
    "countInStock": 40,
    "sku": "IMC-PERSONAL-055",
    "category": "Personal Care",
    "collections": "Personal Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798682/products/IMC-PERSONAL-055.webp",
        "altText": "Moisturizing Lotion"
      }
    ],
    "isFeatured": true,
    "isPublished": true,
    "tags": [
      "shampoo",
      "hair",
      "dandruff"
    ]
  },
  {
    "name": "Aloe Besan Haldi Face Pack",
    "description": "Enriched with Aloevera, Multani Mitti, Turmeric, Chickpea Flour, Calamine Powder, Carrot Seed Oil, and various natural ingredients.",
    "price": 280,
    "countInStock": 40,
    "sku": "IMC-PERSONAL-056",
    "category": "Personal Care",
    "collections": "Personal Care",
    "brand": "IMC",
    "images": [
      {
        "url": "https://res.cloudinary.com/dnmr5iw9v/image/upload/v1765798684/products/IMC-PERSONAL-056.webp",
        "altText": "Aloe Besan Haldi Face Pack"
      }
    ],
    "isFeatured": true,
    "isPublished": true,
    "tags": [
      "shampoo",
      "hair",
      "dandruff"
    ]
  }
];

module.exports = products;
