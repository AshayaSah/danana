export interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  colors?: string[];
  sizes?: string[];
  description: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "young-woman-colorful-jacket",
    title: "A Young Woman in Colorful Jacket",
    price: 108,
    images: [
      "https://images.unsplash.com/photo-1520975954732-57dd22299614?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1529139574466-a303027c028b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Women's button-ups",
    colors: ["Pink", "Green", "Yellow"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    description: "Experience a unique Western style with an eye-catching floral pattern adorning this shirt. Featuring two flap pockets on the chest and a traditional western back yoke. Made in Italy, this 100% cotton shirt from Aglini also comes in Blue Floral and Grey Floral. Explore our selection of Aglini for more options.",
    inStock: false
  },
  {
    id: "2",
    slug: "young-man-vibrant-jacket",
    title: "Young Man in Vibrant Jacket",
    price: 108,
    compareAtPrice: 147,
    images: ["https://images.unsplash.com/photo-1521223832859-c8fa4fba7493?auto=format&fit=crop&q=80&w=800"],
    category: "Men's Jackets",
    description: "A vibrant jacket perfect for the streets. Features bold colors and a modern fit.",
    inStock: true,
    colors: ["Multi"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "3",
    slug: "fashionable-woman-orange-sunglasses",
    title: "Fashionable Woman with Orange Sunglasses",
    price: 108,
    compareAtPrice: 147,
    images: ["https://images.unsplash.com/photo-1509631179647-0c7733173ee0?auto=format&fit=crop&q=80&w=800"],
    category: "Accessories",
    description: "Stylish orange sunglasses that make a bold statement.",
    inStock: true
  },
  {
    id: "4",
    slug: "stretch-tee-in-milk",
    title: "Stretch Tee in Milk",
    price: 98,
    compareAtPrice: 137,
    images: ["https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&q=80&w=800"],
    category: "Women's Basics",
    description: "A comfortable stretch tee in an off-white milk color. Perfect for everyday wear.",
    inStock: true,
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: "5",
    slug: "stylish-model-floral-shirt",
    title: "Stylish Model in Floral Shirt",
    price: 208,
    compareAtPrice: 247,
    images: ["https://images.unsplash.com/photo-1492288991661-058aa541ff43?auto=format&fit=crop&q=80&w=800"],
    category: "Men's Shirts",
    description: "A stylish floral shirt for the modern man.",
    inStock: true,
    sizes: ["S", "M", "L"]
  },
  {
    id: "6",
    slug: "retro-contemporary-fashion",
    title: "Stylish Woman in Retro-Contemporary Fashion",
    price: 148,
    images: ["https://images.unsplash.com/photo-1550614000-4b95dd247596?auto=format&fit=crop&q=80&w=800"],
    category: "Women's Fashion",
    description: "A beautiful blend of retro and contemporary styles.",
    inStock: true
  },
  {
    id: "7",
    slug: "close-up-person-light-green-activewear",
    title: "Close-up of Person in Light Green Activewear",
    price: 948,
    images: ["https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800"],
    category: "Activewear",
    description: "Premium light green activewear.",
    inStock: true
  },
  {
    id: "8",
    slug: "monochromatic-pink-suit",
    title: "Monochromatic Pink Suit for Men",
    price: 788,
    images: ["https://images.unsplash.com/photo-1594938298596-eb5fd3f67825?auto=format&fit=crop&q=80&w=800"],
    category: "Men's Suits",
    description: "A bold monochromatic pink suit.",
    inStock: true
  },
  {
    id: "9",
    slug: "futuristic-hooded-jacket",
    title: "Futuristic Hooded Jacket",
    price: 678,
    images: ["https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800"],
    category: "Outerwear",
    description: "A forward-looking hooded jacket.",
    inStock: true
  },
  {
    id: "10",
    slug: "woman-in-fashionable-attire",
    title: "Woman in Fashionable Attire",
    price: 78,
    images: ["https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800"],
    category: "Women's Fashion",
    description: "Casual yet fashionable black attire.",
    inStock: true
  },
  {
    id: "11",
    slug: "serene-contemplation-cream",
    title: "Serene Contemplation in Cream",
    price: 98,
    images: ["https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&q=80&w=800"],
    category: "Knitwear",
    description: "A comfortable cream sweater.",
    inStock: true,
    sizes: ["S", "M", "L"]
  },
  {
    id: "12",
    slug: "confident-young-man-streetwear",
    title: "Confident Young Man with Fashionable Streetwear",
    price: 78,
    compareAtPrice: 117,
    images: ["https://images.unsplash.com/photo-1523398002811-999aa8d9511e?auto=format&fit=crop&q=80&w=800"],
    category: "Streetwear",
    description: "A bold streetwear look.",
    inStock: true
  },
  {
    id: "13",
    slug: "young-man-in-casual-attire",
    title: "Young Man in Casual Attire",
    price: 108,
    compareAtPrice: 147,
    images: ["https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?auto=format&fit=crop&q=80&w=800"],
    category: "Men's Casual",
    description: "A comfortable hoodie for a casual look.",
    inStock: true
  },
  {
    id: "14",
    slug: "elegant-woman-in-beige-suit",
    title: "Elegant Woman in Beige Suit",
    price: 138,
    compareAtPrice: 177,
    images: ["https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?auto=format&fit=crop&q=80&w=800"],
    category: "Women's Suits",
    description: "An elegant beige suit set.",
    inStock: true
  },
  {
    id: "15",
    slug: "minimalist-fashion-models",
    title: "Minimalist Fashion Models",
    price: 108,
    images: ["https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80&w=800"],
    category: "Unisex",
    description: "Minimalist matching outfits.",
    inStock: true
  },
  {
    id: "16",
    slug: "young-woman-in-colorful-sweater",
    title: "Young Woman in Colorful Sweater",
    price: 208,
    compareAtPrice: 247,
    images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800"],
    category: "Knitwear",
    description: "A beautiful colorful sweater.",
    inStock: true
  }
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
