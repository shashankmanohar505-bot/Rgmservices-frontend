// Mock data for RGMS landing page clone. All data is mocked (frontend-only).
const A = '/assets';

export const announcement = {
  text: '\ud83c\udf89 New Year Sale is LIVE! Use code NEWYEAR25 for 25% OFF | Free Shipping on orders above \u20b9999',
};

export const heroBanners = [
  { id: 1, image: `${A}/rgms-banner-1.png`, alt: "India's lowest Smart Sim Plan - 6 Months DATA Free" },
  { id: 2, image: `${A}/rgms-banner-2.png`, alt: 'Color Night Vision up to 15m' },
  { id: 3, image: `${A}/asset-2.jpeg`, alt: 'Smart Security Safer Homes - Get 5% Off' },
  { id: 4, image: `${A}/rgms-banner-3.png`, alt: 'AI Security Camera in India' },
];

export const categories = [
  { id: 1, name: 'CCTV Camera', image: `${A}/cctv_camera_category.png`, tag: 'HOT', tagColor: 'bg-[#f00102]', slug: 'cctv-camera' },
  { id: 2, name: 'WiFi Camera', image: `${A}/wifi_camera_card.png`, tag: 'POPULAR', tagColor: 'bg-[#082f89]', slug: 'wifi-cameras' },
  { id: 3, name: 'Solar Camera', image: `${A}/solar_camera_card.png`, tag: 'WIRELESS', tagColor: 'bg-[#01a345]', slug: 'solar-cameras' },
  { id: 4, name: 'GPS Tracker', image: `${A}/gps_tracker_category.png`, tag: 'LIVE', tagColor: 'bg-[#01a345]', slug: 'gps-trackers' },
  { id: 7, name: 'All Accessories', image: `${A}/cctv_accessories_category.png`, tag: 'NEW', tagColor: 'bg-[#7c3aed]', slug: 'accessories' },
  { id: 8, name: 'Access Control', image: `${A}/access_control_category.png`, tag: 'BIOMETRIC', tagColor: 'bg-[#dc2626]', slug: 'access-control' },
  { id: 10, name: 'Intercom', image: `${A}/intercom_category.png`, tag: 'PBX', tagColor: 'bg-[#d97706]', slug: 'intercom' },
];

export const heroSlides = [
  {
    id: 1,
    badge: "Expert's Choice",
    titleLine1: 'Complete Home Security',
    titleLine2: 'with AI motion detection',
    subtitle: 'Complete 360\u00b0 Security - Triple the Coverage, Triple the Peace of Mind.',
    image: `${A}/asset-19.png`,
    floatTopLeft: { icon: 'mic', title: '2 Way Talk' },
    floatRight: { icon: 'sd', title: 'SD Card + Cloud' },
    specs: [
      { value: '5MP + 5MP + 5MP', label: 'Full HD Lens' },
      { value: '30m IR', label: 'Color Night Vision' },
      { value: '360 degrees', label: 'Pan Tilt' },
    ],
  },
  {
    id: 2,
    badge: "Parent's Choice",
    titleLine1: 'Baby Cameras',
    titleLine2: 'with AI night colour vision',
    subtitle: 'Keep your little one safe with Cry Detection & 2 way audio',
    image: `${A}/asset-13.png`,
    floatTopLeft: { icon: 'mic', title: '2 Way Talk' },
    floatRight: { icon: 'sd', title: 'AI Motion Detection' },
    specs: [
      { value: '4MP + 4MP', label: 'Full HD Lens' },
      { value: '20m IR', label: 'Color Night Vision' },
      { value: 'SD Card + Cloud', label: 'Storage Support' },
    ],
  },
];

export const dealsProducts = [];

export const trustItems = [
  { icon: 'truck', title: 'Shipping', subtitle: 'Across India' },
  { icon: 'shield', title: 'Secure', subtitle: 'Payments' },
  { icon: 'refresh', title: '7 day', subtitle: 'replacement' },
  { icon: 'badge', title: 'Dedicated', subtitle: 'Tech Support' },
];

export const videoProducts = [
  {
    id: 'vid-1',
    name: 'Batman Black 3in1 4G Sim CCTV Camera ...',
    oldPrice: 10000, price: 3999,
    thumb: `${A}/asset-14.png`,
  },
  {
    id: 'vid-2',
    name: 'Tricam Shark Dual Lens/Triple Screen ...',
    oldPrice: 10000, price: 2999,
    thumb: `${A}/asset-17.png`,
  },
  {
    id: 'vid-3',
    name: 'Rose 2X Smart Projector \u2013 Android 13....',
    oldPrice: 8999, price: 4549,
    thumb: `${A}/asset-26.jpeg`,
  },
  {
    id: 'vid-4',
    name: 'Baby Robot WiFi CCTV Camera 3MP Full ...',
    oldPrice: 3000, price: 1199,
    outOfStock: true,
    thumb: `${A}/asset-18.jpeg`,
  },
  {
    id: 'vid-5',
    name: '5+5MP Full HD 10X Optical Zoom Smart ...',
    oldPrice: 8000, price: 4999,
    thumb: `${A}/asset-31.png`,
  },
  {
    id: 'vid-6',
    name: 'Square Android 11.0 Smart Projector, ...',
    oldPrice: 12000, price: 3999,
    thumb: `${A}/asset-21.jpeg`,
  },
];

export const protectingFeatures = [
  {
    icon: 'award', title: 'Legacy of Innovation',
    desc: 'Protecting Indian homes since 2017 with proven, reliable security solutions.',
    link: 'Learn more \u2192', side: 'left',
  },
  {
    icon: 'signal', title: "India's First 4G & Solar",
    desc: 'The first to revolutionize Indian security with 4G and Solar-powered camera technology.',
    link: 'Learn more \u2192', side: 'left',
  },
  {
    icon: 'wifi', title: 'Unbeatable Connectivity',
    desc: 'Stay online 24/7 with the most cost-effective and stable data plans in the market.',
    link: 'View plans \u2192', side: 'left',
  },
  {
    icon: 'wrench', title: 'Pioneers of DIY Security',
    desc: 'Zero wiring, zero hassle. No technician needed. Simple setup that anyone can install in minutes.',
    link: 'Learn more \u2192', side: 'right',
  },
  {
    icon: 'shieldcheck', title: 'Dedicated Customer Support',
    desc: 'Includes 24/7 technical assistance and setup guidance for total peace of mind.',
    link: 'Learn more \u2192', side: 'right',
  },
  {
    icon: 'headset', title: 'We Are Here to Help',
    desc: 'Industry-leading customer support to ensure your security system runs without interruption.',
    link: 'Contact us \u2192', side: 'right',
  },
];

export const futureFeatures = [
  {
    icon: 'user', title: 'AI Smart Human Detection',
    desc: 'Advanced AI filters false alarms (pets/cars), detecting only humans to send instant, accurate alerts to you.',
  },
  {
    icon: 'grid', title: 'Multi-Lens Split Screen',
    desc: 'View multiple angles at once. Multi-lens tech covers wider areas and eliminates blind spots on a single screen.',
  },
  {
    icon: 'video', title: 'Hybrid PTZ and Bullet Designs',
    desc: 'The stability of a fixed lens plus the tracking of a PTZ lens. Get wide coverage and zoom details in one unit.',
  },
  {
    icon: 'lock', title: 'End-to-End Encrypted Storage',
    desc: 'Your privacy matters. We use full encryption on both Cloud and SD Card storage to keep your footage secure.',
  },
];

export const newArrivals = [];

export const brandCategories = [
  { icon: 'projector', title: 'Projectors', desc: 'Cinematic home theater feel' },
  { icon: 'car', title: 'Car Dashcams', desc: 'Evidence for every drive' },
  { icon: 'gamepad', title: 'Gaming', desc: 'Pro-level gaming performance' },
  { icon: 'mic', title: 'Smart Studio', desc: 'Professional audio & light' },
];

export const bestSellers = [];

export const usageTypes = [
  { icon: 'briefcase', color: '#2f6fed', title: 'Office Security', desc: 'Monitor staff & workspaces' },
  { icon: 'baby', color: '#22a94c', title: 'Baby Monitoring', desc: 'Real-time audio & video feed' },
  { icon: 'users', color: '#8b3ff0', title: 'Elderly Care', desc: 'Stay connected with parents' },
  { icon: 'sun', color: '#f2650c', title: 'Outdoor Security', desc: '24/7 weatherproof protection' },
  { icon: 'store', color: '#e63482', title: 'Business Solutions', desc: 'Manage multiple store sites' },
  { icon: 'paw', color: '#5b6472', title: 'Pet Monitoring', desc: 'Talk to your pets from afar' },
];

export const reviews = [
  {
    id: 1,
    initials: 'RM',
    name: 'Rajesh M.',
    verified: 'Verified Buyer',
    stars: 5,
    text: '"Excellent camera with crystal clear video quality. The AI detection is spot on and the app is very user-friendly."',
    product: 'BabyCam Smart',
  },
  {
    id: 2,
    initials: 'PR',
    name: 'Priya R.',
    verified: 'Verified Buyer',
    stars: 5,
    text: '"The 360-degree rotation is smooth and the tracking feature works perfectly. Best purchase this year!"',
    product: 'ProCam 360 AI',
  },
];

export const blogs = [
  {
    id: 1,
    title: 'RGMS R1 Selfie Stick Operations Instructions',
    excerpt: '',
    image: `${A}/rgms-blog-cover.png`,
  },
  {
    id: 2,
    title: 'RGMS 3in1 Dash Camera Installation',
    excerpt: 'Below are the steps for installing RGMS dash camera. Make sure that you have come to this page ...',
    image: `${A}/rgms-blog-cover.png`,
  },
  {
    id: 3,
    title: 'RGMS V360 App Camera Installation',
    excerpt: 'Below are the steps for installing RGMS camera. Make sure that you have come to this page by sc...',
    image: `${A}/rgms-blog-cover.png`,
  },
  {
    id: 4,
    title: 'RGMS HDWifiCam Pro App Camera Installation',
    excerpt: 'Below are the steps for installing RGMS camera. Make sure that you have come to this page by sc...',
    image: `${A}/rgms-blog-cover.png`,
  },
];

export const footerData = {
  about: "RGMS is redefining connected security across India with AI-powered CCTV cameras, real-time GPS trackers, smart access control, and telecom systems.",
  categories: [
    { label: 'CCTV Camera', slug: 'cctv-camera' },
    { label: 'GPS Tracker', slug: 'gps-trackers' },
    { label: 'All Accessories', slug: 'accessories' },
    { label: 'Access Control', slug: 'access-control' },
    { label: 'Intercom', slug: 'intercom' },
    { label: 'All Products Catalog', slug: 'products' }
  ],
  information: [
    { label: 'Home Page', path: '/' },
    { label: 'All Products', path: '/products' },
    { label: 'About RGMS', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'GPS Login Portal', path: 'http://rgms.millitrack.com/modern/#/login' },
    { label: 'Admin Portal', path: '/rgmsadmin' }
  ],
  phone: '+91 7707 019 501',
  whatsapp: '917707019501',
  hours: 'Mon to Saturday : 11:00 AM to 7:00 PM IST',
  email: 'contact@rgms.com',
  address: '8/RC11, B. H. COLONY, PATNA, BIHAR - 800026, INDIA',
  copyright: '© 2026 rgms.com | All rights reserved.',
};

export const megaMenu = [
  {
    title: 'GPS Trackers',
    items: [
      'GPS Wire for Bike & Vehicles',
      'GPS Wire with Engine Lock',
      'GPS Wire Audio & Engine Lock',
      'GPS Magnet 5000 mAh + Voice',
      'GPS Magnet 10000 mAh + Voice',
    ],
  },
  {
    title: 'Smart Cameras',
    items: ['WIFI Cameras', '4G Cameras', 'Solar Cameras', 'SuperCams', 'TriCams'],
  },
  {
    title: 'Smart Homes',
    items: ['Car Dashcams', 'Projectors', 'Home Studio', 'Gaming Controls'],
  },
  {
    title: 'Shop by Usage',
    items: ['Vehicle Security & GPS', 'Baby Monitoring', 'Office Security', 'Farm Security', 'Elderly Care'],
  },
  {
    title: 'Shop by Location',
    items: ['Vehicles & Fleet', 'Indoor', 'Outdoor'],
  },
  {
    title: 'Connect Plus',
    items: ['4G Sim Plans', 'SD Card', 'GPS Tracking Subscriptions'],
  },
];

export const formatPrice = (n) => {
  if (n === null || n === undefined || n === '' || isNaN(n)) return 'Price on Request';
  return 'Rs. ' + Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const convertToSlug = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};
