
import { Product } from './types';

import img1 from './image-product/07d62405-4bf0-4442-9928-2993d2ac50db-.jpg';
import img2 from './image-product/1171e54d-5942-4399-81d2-f80cd26ddbee-image-0-1721631859336.avif';
import img3 from './image-product/1551fd7f-5dd1-43ba-b013-979be756b04b-.jpg';
import img4 from './image-product/15687470857-1602233773042.png';
import img5 from './image-product/15c1e198-e42c-4ac9-b912-0a06d52fc49d-29586587163-1615975569416.png';
import img6 from './image-product/1e0f4754-8917-43b7-9b43-fdd81d01b583-.jpg';
import img7 from './image-product/2fbf2a97-e36b-42d4-8251-a848fc4bc7a6-.jpg';
import img8 from './image-product/34c77d44-c491-4663-942f-935dc937a3f7-26827567979-1615975702259.png';
import img9 from './image-product/3b17d37f-0064-4445-b71e-36569811f228-image-0-1713324173928.avif';
import img10 from './image-product/42a00656-9535-4678-9de7-a20043142d03-.jpg';
import img11 from './image-product/5e461bd5-7c40-465e-b64f-e10f6c731cc4-.jpg';
import img12 from './image-product/63fd6b6f-149b-4193-a4e2-0e7eb53aac46-image-0-1715599249754.png';
import img13 from './image-product/657b6899-c683-4260-bbc0-f3c1ee93878e-image-0-1745899777674.avif';
import img14 from './image-product/7761fd0c-4be9-44e1-97c9-9d80a05a445b-.jpg';
import img15 from './image-product/797bc8d4-deed-4237-8d40-378769b68398-.jpg';
import img16 from './image-product/96549462329-1604470103696.png';
import img17 from './image-product/9f90e63c-e305-435b-8fa3-d668b1f08be2-.jpg';
import img18 from './image-product/b94ccda8-4e22-4845-9e35-55146d7109e0-image-0-1763478856019.png';
import img19 from './image-product/bf73df84-671e-4aa5-809a-260be142a4dd-.jpg';
import img20 from './image-product/ca3bead9-ef5a-464f-ab3a-2d86da5559d8-.jpg';
import img21 from './image-product/dca6e065-2752-4fde-a585-ae6614bc38be-image-0-1729482303355.avif';
import img22 from './image-product/e16edf6b-d9ee-4a82-b6e2-195c13f12910-.jpg';
import img23 from './image-product/ea254b1e-ae77-4593-a98d-6e53498dd9be-image-0-1761884362126.avif';
import img24 from './image-product/f7dd131a-7a91-4333-a32e-912d5f245a11-image-0-1763478885630.avif';
import img25 from './image-product/fc8dcc7d-4500-4296-ad1e-7c38245ff78d-.jpg';
import img26 from './image-product/image-0-1595501377354.avif';
import img27 from './image-product/image-0-1597395454752.avif';

const IMAGES = [
  img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11,img12,img13,img14,img15,img16,img17,img18,img19,img20,img21,img22,img23,img24,img25,img26,img27
];

const imageFor = (id: number) => IMAGES.length ? IMAGES[(id - 1) % IMAGES.length] : '/images/product-1.svg';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Advanced Snail Mucin Essence",
    brand: "COSRX",
    price: 215000,
    originalPrice: 280000,
    rating: 4.9,
    reviews: 1240,
    image: imageFor(1),
    description: "A lightweight essence which absorbs into skin fast to give skin a natural glow from the inside. This essence is created from nutritious, low-stimulation filtered snail mucin to keep your skin moisturized and illuminated all day.",
    category: "Skincare",
    isSale: true
  },
  {
    id: 2,
    name: "Low pH Good Morning Cleanser",
    brand: "COSRX",
    price: 55000,
    rating: 4.7,
    reviews: 850,
    image: imageFor(2),
    description: "Cleanse daily with this gentle and effective gel type cleanser. Formulated with tea tree oil and natural BHA to refine skin texture, the Low pH Good Morning Gel Cleanser's pH level is the closest to your skin's natural pH level.",
    category: "Cleanser",
    isNew: true
  },
  {
    id: 3,
    name: "Matte Lipstick - Dusty Rose",
    brand: "MAC",
    price: 350000,
    rating: 4.8,
    reviews: 320,
    image: imageFor(3),
    description: "The iconic product that made M·A·C famous. This creamy rich formula features high colour payoff in a no-shine matte finish.",
    category: "Makeup"
  },
  {
    id: 4,
    name: "Hydrating Water Gel",
    brand: "Neutrogena",
    price: 180000,
    originalPrice: 200000,
    rating: 4.5,
    reviews: 2100,
    image: imageFor(4),
    description: "Neutrogena Hydro Boost Water Gel instantly quenches dry skin and keeps it looking smooth, supple and hydrated day after day.",
    category: "Moisturizer",
    isSale: true
  },
  {
    id: 5,
    name: "UV Protection Sunscreen SPF 50",
    brand: "Biore",
    price: 120000,
    rating: 4.6,
    reviews: 500,
    image: imageFor(5),
    description: "Micro Defense formula provides even coverage for fine lines and uneven surfaces at a micro level. Powerful UV protection in a light, watery texture.",
    category: "Sunscreen",
    isNew: true
  },
  {
    id: 6,
    name: "Niacinamide 10% + Zinc 1%",
    brand: "The Ordinary",
    price: 110000,
    rating: 4.8,
    reviews: 5600,
    image: imageFor(6),
    description: "A high-strength vitamin and mineral blemish formula. Niacinamide (Vitamin B3) is indicated to reduce the appearance of skin blemishes and congestion.",
    category: "Serum"
  },
  {
    id: 7,
    name: "Clay Mask Pore Cleansing",
    brand: "Innisfree",
    price: 190000,
    originalPrice: 220000,
    rating: 4.7,
    reviews: 900,
    image: imageFor(7),
    description: "10-in-1 clay mask that is formulated with Jeju Volcanic Clusters & Spheres to provide intensive pore care.",
    category: "Mask",
    isSale: true
  },
  {
    id: 8,
    name: "Setting Spray Matte Finish",
    brand: "NYX",
    price: 145000,
    rating: 4.4,
    reviews: 120,
    image: imageFor(8),
    description: "Demand perfection! For that fresh makeup look that lasts, the NYX Professional Makeup Matte Setting Spray - Matte is a gorgeous shine-free finish.",
    category: "Makeup"
  },
  {
    id: 9,
    name: "Glow Recipe Watermelon Glow Sleeping Mask",
    brand: "Glow Recipe",
    price: 425000,
    originalPrice: 500000,
    rating: 4.9,
    reviews: 1890,
    image: imageFor(9),
    description: "A bouncy, breathable overnight mask that visibly improves skin tone, texture, and pores with watermelon and hyaluronic acid for a radiant complexion.",
    category: "Mask",
    isSale: true
  },
  {
    id: 10,
    name: "Retinol Night Serum",
    brand: "The Ordinary",
    price: 135000,
    rating: 4.6,
    reviews: 3200,
    image: imageFor(10),
    description: "High-strength retinoid serum for advanced anti-aging. Helps reduce visible signs of aging and targets fine lines, photodamage, and general skin aging.",
    category: "Serum",
    isNew: true
  },
  {
    id: 11,
    name: "Vitamin C Brightening Serum",
    brand: "Klairs",
    price: 285000,
    rating: 4.8,
    reviews: 1560,
    image: imageFor(11),
    description: "A brightening serum formulated with pure Vitamin C that works to fade acne scars, brighten skin tone, and improve overall skin clarity.",
    category: "Serum"
  },
  {
    id: 12,
    name: "Centella Calming Toner",
    brand: "COSRX",
    price: 165000,
    rating: 4.7,
    reviews: 2340,
    image: imageFor(12),
    description: "A gentle, hydrating toner with centella asiatica extract to soothe irritated skin and strengthen the skin barrier.",
    category: "Toner",
    isNew: true
  },
  {
    id: 13,
    name: "Rose Gold Highlighter Palette",
    brand: "Huda Beauty",
    price: 520000,
    originalPrice: 600000,
    rating: 4.9,
    reviews: 890,
    image: imageFor(13),
    description: "Ultra-pigmented highlighter palette with three complementary shades that create a gorgeous glow in natural or warm light.",
    category: "Makeup",
    isSale: true
  },
  {
    id: 14,
    name: "Hyaluronic Acid Deep Moisture Cream",
    brand: "Laneige",
    price: 385000,
    rating: 4.8,
    reviews: 1670,
    image: imageFor(14),
    description: "Deeply hydrating cream with hyaluronic acid that provides long-lasting moisture and plumps the skin for a youthful appearance.",
    category: "Moisturizer"
  },
  {
    id: 15,
    name: "Green Tea Cleansing Oil",
    brand: "Innisfree",
    price: 175000,
    rating: 4.6,
    reviews: 1120,
    image: imageFor(15),
    description: "Gentle cleansing oil enriched with green tea extract that effectively removes makeup and impurities while nourishing the skin.",
    category: "Cleanser"
  },
  {
    id: 16,
    name: "Lip Sleeping Mask - Berry",
    brand: "Laneige",
    price: 240000,
    originalPrice: 280000,
    rating: 4.9,
    reviews: 4500,
    image: imageFor(16),
    description: "An intensive overnight lip mask that delivers intense moisture and antioxidants while you sleep with Berry Mix Complex.",
    category: "Lip Care",
    isSale: true
  },
  {
    id: 17,
    name: "AHA BHA Peeling Solution",
    brand: "SOME BY MI",
    price: 145000,
    rating: 4.7,
    reviews: 2890,
    image: imageFor(17),
    description: "A powerful exfoliating solution with AHA and BHA that targets dead skin cells, uneven texture, and enlarged pores for smoother skin.",
    category: "Exfoliator",
    isNew: true
  },
  {
    id: 18,
    name: "Velvet Matte Lip Tint",
    brand: "3CE",
    price: 195000,
    rating: 4.8,
    reviews: 980,
    image: imageFor(18),
    description: "Long-lasting matte lip tint with a velvety finish that delivers vibrant color without drying out your lips.",
    category: "Makeup"
  },
  {
    id: 19,
    name: "Propolis Light Ampoule",
    brand: "COSRX",
    price: 275000,
    originalPrice: 320000,
    rating: 4.9,
    reviews: 1450,
    image: imageFor(19),
    description: "A lightweight ampoule with 83.25% propolis extract that revitalizes, nourishes and provides an intense glow to dull, tired skin.",
    category: "Ampoule",
    isSale: true
  },
  {
    id: 20,
    name: "Ceramide Repair Cream",
    brand: "Dr. Jart+",
    price: 465000,
    rating: 4.8,
    reviews: 1230,
    image: imageFor(20),
    description: "Rich cream with ceramides that repairs and strengthens the skin barrier while providing deep hydration for sensitive skin.",
    category: "Moisturizer"
  },
  {
    id: 21,
    name: "Tea Tree Relief Serum",
    brand: "SOME BY MI",
    price: 185000,
    rating: 4.7,
    reviews: 2100,
    image: imageFor(21),
    description: "Soothing serum with tea tree extract that targets acne, reduces inflammation, and balances oil production for clearer skin.",
    category: "Serum",
    isNew: true
  },
  {
    id: 22,
    name: "Cushion Foundation SPF 50",
    brand: "Hera",
    price: 395000,
    rating: 4.8,
    reviews: 1560,
    image: imageFor(22),
    description: "Lightweight cushion foundation with high SPF protection that provides buildable coverage and a natural, dewy finish.",
    category: "Makeup"
  },
  {
    id: 23,
    name: "Black Sugar Scrub Mask",
    brand: "Skinfood",
    price: 165000,
    originalPrice: 190000,
    rating: 4.6,
    reviews: 3450,
    image: imageFor(23),
    description: "Exfoliating scrub mask with black sugar that gently removes dead skin cells and leaves skin soft, smooth, and radiant.",
    category: "Exfoliator",
    isSale: true
  },
  {
    id: 24,
    name: "Rice Overnight Spa Mask",
    brand: "Laneige",
    price: 385000,
    rating: 4.9,
    reviews: 2890,
    image: imageFor(24),
    description: "Brightening overnight mask with rice extract that works while you sleep to reveal brighter, more luminous skin.",
    category: "Mask"
  },
  {
    id: 25,
    name: "Double Wear Foundation",
    brand: "Estée Lauder",
    price: 625000,
    rating: 4.8,
    reviews: 1890,
    image: imageFor(25),
    description: "Long-wearing, flawless foundation with 24-hour staying power that won't smudge or rub off, with a natural matte finish.",
    category: "Makeup"
  },
  {
    id: 26,
    name: "Collagen Eye Cream",
    brand: "Innisfree",
    price: 215000,
    originalPrice: 250000,
    rating: 4.7,
    reviews: 890,
    image: imageFor(26),
    description: "Firming eye cream with collagen that reduces the appearance of fine lines, wrinkles, and dark circles around delicate eye area.",
    category: "Eye Care",
    isSale: true
  },
  {
    id: 27,
    name: "Essence Water Mist",
    brand: "SK-II",
    price: 895000,
    rating: 4.9,
    reviews: 1230,
    image: imageFor(27),
    description: "Luxurious facial mist with Pitera essence that instantly hydrates, refreshes, and preps skin for better absorption of skincare.",
    category: "Mist",
    isNew: true
  },
  {
    id: 28,
    name: "Glow Serum Foundation",
    brand: "Rare Beauty",
    price: 475000,
    rating: 4.8,
    reviews: 1670,
    image: imageFor(1),
    description: "Radiant serum foundation that blurs imperfections while giving skin a natural, dewy glow with buildable, medium coverage.",
    category: "Makeup"
  },
  {
    id: 29,
    name: "Cica Sleeping Mask",
    brand: "Dr. Jart+",
    price: 425000,
    originalPrice: 480000,
    rating: 4.8,
    reviews: 1450,
    image: imageFor(2),
    description: "Overnight mask with centella asiatica that calms, repairs, and strengthens sensitive skin while you sleep.",
    category: "Mask",
    isSale: true
  },
  {
    id: 30,
    name: "Peptide Firming Serum",
    brand: "The Inkey List",
    price: 295000,
    rating: 4.7,
    reviews: 980,
    image: imageFor(3),
    description: "Anti-aging serum with peptides that helps improve skin elasticity, firmness, and reduces the appearance of fine lines and wrinkles.",
    category: "Serum",
    isNew: true
  }
];

export const CATEGORIES = [
  "Skincare",
  "Makeup",
  "Hair Care",
  "Body",
  "Fragrance",
  "Tools",
  "Natural",
  "New Arrivals"
];
