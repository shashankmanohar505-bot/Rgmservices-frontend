import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import { Footer, WhatsAppIcon } from './BottomSections';
import { dealsProducts, formatPrice, newArrivals, bestSellers, convertToSlug } from '../mock/mock';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import SEO from './SEO';
import { 
  ShieldCheck, Zap, Lock, Mic, Battery, Radio, CheckCircle2, 
  ChevronRight, SlidersHorizontal, ArrowLeft, HelpCircle, X, Eye, Star, ShoppingCart
} from 'lucide-react';

// Comprehensive Category Configuration Matrix
const CATEGORY_CONFIGS = {
  'all': {
    name: 'All Products',
    badge: 'Official RGMS Complete Collection',
    title: 'Explore All RGMS Security Cameras & Smart Devices',
    description: 'Browse the entire collection of RGMS AI security cameras, 4G solar surveillance systems, vehicle GPS trackers with remote engine lock, and 4K smart cinema projectors.',
    whatsappTopic: 'All Products Catalog',
    iconBadges: [
      { label: 'Genuine RGMS Products', icon: ShieldCheck, color: 'text-[#01a345]' },
      { label: '24/7 Tech Support', icon: Zap, color: 'text-[#082f89]' },
      { label: 'Secure Payments', icon: Lock, color: 'text-[#f00102]' },
    ],
    tabs: [
      { id: 'all', label: 'All Products' },
      { id: 'cctv', label: 'CCTV Camera' },
      { id: 'gps', label: 'GPS Tracker' },
      { id: 'accessories', label: 'All Accessories' },
      { id: 'access-control', label: 'Access Control' },
      { id: 'intercom', label: 'Intercom' },
    ],
    matchProduct: () => true,
    faqs: [
      {
        q: 'Do all RGMS products come with dedicated tech support?',
        a: 'Yes! Every RGMS product includes dedicated customer support and 24/7 assistance to help you with installation and usage.',
      },
      {
        q: 'How fast is delivery across India?',
        a: 'We ship orders within 24 hours. Express delivery takes 2 to 4 business days across India.',
      },
    ],
    tableTitle: 'RGMS Complete Product Range Overview',
    tableSubtitle: 'Compare features across our AI security, vehicle GPS, and home entertainment lineup.',
    tableHeaders: ['Category', 'Top Feature', 'Connectivity', 'Support', 'Price Range'],
    tableRows: [
      ['GPS Trackers', 'Remote Engine Lock & Voice', '2G / 4G SIM', 'Lifetime Support', '₹1,499 – ₹3,999'],
      ['WiFi Cameras', '360° PTZ & Human Detection', '2.4GHz WiFi', 'Lifetime Support', '₹1,199 – ₹3,499'],
      ['4G & Solar Cameras', 'Zero WiFi / Solar Panel Power', '4G SIM Card', 'Lifetime Support', '₹4,499 – ₹7,899'],
      ['Smart Projectors', '1080P/4K Android Cinema', 'WiFi & Bluetooth', 'Lifetime Support', '₹7,819 – ₹24,999'],
    ]
  },

  'gps-trackers': {
    name: 'GPS Trackers',
    badge: 'Official RGMS Vehicle Security Collection',
    title: 'GPS Trackers & Anti-Theft Security Systems',
    description: 'Protect your bikes, cars, trucks, and commercial fleets with RGMS real-time GPS tracking, remote engine immobilizer cutoff, live audio monitoring, and long-life battery backups.',
    whatsappTopic: 'GPS Trackers',
    iconBadges: [
      { label: 'Real-Time Live Tracking', icon: Zap, color: 'text-[#01a345]' },
      { label: 'Remote Engine Lock', icon: Lock, color: 'text-[#f00102]' },
      { label: 'Live Audio Listening', icon: Mic, color: 'text-[#01a345]' },
      { label: '10,000 mAh Battery', icon: Battery, color: 'text-[#FF9933]' },
    ],
    tabs: [
      { id: 'all', label: 'All GPS Trackers' },
      { id: 'wire', label: 'GPS Wire Models' },
      { id: 'magnet', label: 'GPS Magnetic (Wireless)' },
      { id: 'lock', label: 'Engine Lock Models' },
      { id: 'voice', label: 'Live Voice Models' },
    ],
    matchProduct: (p) => p.id.startsWith('gps') || p.name.toLowerCase().includes('gps') || p.name.toLowerCase().includes('tracker'),
    faqs: [
      {
        q: 'How does the Remote Engine Lock / Cutoff feature work?',
        a: 'The Engine Lock GPS tracker connects to your vehicle’s ignition relay. From the mobile app, you can press "Engine Off" to cut power to the engine safely when the vehicle is stationary or moving under 20km/h, preventing theft.',
      },
      {
        q: 'Does the Magnetic GPS Tracker require any installation or wiring?',
        a: 'No wiring required at all! The RGMS Magnetic GPS Tracker comes with extra-strong neodymium magnets. Simply slap it onto any metal surface on your vehicle or asset, and it starts tracking instantly.',
      },
      {
        q: 'How long does the 5000 mAh & 10000 mAh battery last?',
        a: 'The 5000 mAh model lasts up to 15–20 days on continuous tracking (or up to 45 days in intelligent sleep mode). The 10000 mAh model lasts up to 30–40 days continuous (or up to 90 days in sleep mode).',
      },
      {
        q: 'Can I listen to live audio around the GPS Tracker?',
        a: 'Yes! Models with Audio/Voice monitoring feature an ultra-sensitive built-in microphone. You can call the tracker SIM or initiate a voice monitor request from the app to listen in real time without any speaker sound on the tracker.',
      },
    ],
    tableTitle: 'Compare RGMS GPS Tracker Features',
    tableSubtitle: 'Choose the ideal GPS tracker suited for your bike, car, truck, or fleet requirement.',
    tableHeaders: ['Model Name', 'Type / Installation', 'Engine Cutoff', 'Voice Monitor', 'Battery Backup', 'Price'],
    tableRows: [
      ['GPS Wire (Non-Lock)', 'Hardwired to Vehicle', 'No', 'No', 'Vehicle Battery + Internal Backup', '₹1,499'],
      ['GPS Wire with Engine Lock', 'Hardwired to Relay', '✓ Remote Cutoff', 'No', 'Vehicle Battery + Internal Backup', '₹1,999'],
      ['GPS Wire Audio & Engine Lock', 'Hardwired to Relay', '✓ Remote Cutoff', '✓ Live Voice Listening', 'Vehicle Battery + Internal Backup', '₹2,499'],
      ['GPS Magnet 5000 mAh', 'Wireless Strong Magnet', 'N/A', '✓ Live Voice Listening', '5,000 mAh (15-20 Days)', '₹2,999'],
      ['GPS Magnet 10000 mAh', 'Wireless Heavy Magnet', 'N/A', '✓ Live Voice Listening', '10,000 mAh (30-40 Days)', '₹3,999'],
    ]
  },

  'wifi-cameras': {
    name: 'Wifi Cameras',
    badge: 'Official RGMS Smart Home Security',
    title: 'Wireless WiFi CCTV Security Cameras',
    description: 'Keep an eye on your home, office, or shop 24/7 with RGMS Smart WiFi Cameras featuring 360° PTZ coverage, AI human motion detection, two-way audio, and color night vision.',
    whatsappTopic: 'WiFi Cameras',
    iconBadges: [
      { label: '360° PTZ Coverage', icon: Zap, color: 'text-[#01a345]' },
      { label: 'AI Motion Detection', icon: ShieldCheck, color: 'text-[#082f89]' },
      { label: '2-Way Audio Talk', icon: Mic, color: 'text-[#01a345]' },
      { label: 'Color Night Vision', icon: Eye, color: 'text-[#FF9933]' },
    ],
    tabs: [
      { id: 'all', label: 'All WiFi Cameras' },
      { id: 'ptz', label: '360° PTZ' },
      { id: 'indoor', label: 'Indoor' },
      { id: 'outdoor', label: 'Outdoor' },
    ],
    matchProduct: (p) => p.name.toLowerCase().includes('wifi') || p.id.includes('deal-1') || p.id.includes('deal-5') || p.id.includes('deal-6') || p.id.includes('best-3') || p.id.includes('best-5') || p.id.includes('best-6'),
    faqs: [
      {
        q: 'Do these WiFi cameras work without internet?',
        a: 'WiFi cameras require a local 2.4GHz WiFi connection for live mobile view. However, they record continuous offline footage directly to an inserted SD card even without active internet.',
      },
      {
        q: 'Is physical technician installation required?',
        a: 'No! All RGMS cameras are DIY plug-and-play. Simply connect to power, download the app, and scan the QR code to set up in under 2 minutes.',
      },
      {
        q: 'Can multiple smartphones view the live feed?',
        a: 'Yes! You can share camera access with up to 5 family members or managers using the RGMS companion mobile app.',
      },
    ],
    tableTitle: 'Compare RGMS WiFi Camera Features',
    tableSubtitle: 'Find the best WiFi security camera for home, office, or outdoor monitoring.',
    tableHeaders: ['Camera Model', 'Resolution', 'PTZ Rotation', 'Night Vision', 'Storage', 'Price'],
    tableRows: [
      ['Astro Dual Lens WiFi', '4MP + 4MP Full HD', '360° Pan & Tilt', 'Color Night Vision', 'Up to 128GB SD / Cloud', '₹1,699'],
      ['Smart Bulb WiFi Camera', '3MP Ultra HD', '360° Auto Rotation', 'Infrared / LED Night Vision', 'Up to 128GB SD', '₹1,299'],
      ['Batman 3-in-1 WiFi Camera', 'Triple Lens (Multi-View)', '360° PTZ + Dual Fixed', 'Full Color Night Vision', 'Up to 128GB SD / Cloud', '₹3,499'],
      ['Mini Fox 360° Baby Cam', '3MP Full HD', '360° Smooth PTZ', 'Enhanced IR Night Vision', 'Up to 128GB SD', '₹1,199'],
    ]
  },

  '4g-cameras': {
    name: '4G Cameras',
    badge: 'Official RGMS Standalone Security',
    title: '4G SIM Support Smart CCTV Cameras',
    description: 'No WiFi? No Problem! Secure remote farms, construction sites, godowns, and outdoor locations with 4G SIM enabled smart CCTV cameras.',
    whatsappTopic: '4G SIM Cameras',
    iconBadges: [
      { label: 'Direct 4G SIM Support', icon: Radio, color: 'text-[#01a345]' },
      { label: 'No WiFi Required', icon: Zap, color: 'text-[#082f89]' },
      { label: 'AI Motion Tracking', icon: Lock, color: 'text-[#f00102]' },
      { label: 'Full Color Night Vision', icon: Eye, color: 'text-[#FF9933]' },
    ],
    tabs: [
      { id: 'all', label: 'All 4G Cameras' },
      { id: 'sim', label: '4G SIM Outdoor' },
      { id: 'triple', label: 'Triple Lens' },
    ],
    matchProduct: (p) => p.name.toLowerCase().includes('4g') || p.id.includes('4g') || p.id.includes('deal-2') || p.id.includes('deal-3') || p.id.includes('best-2') || p.id.includes('best-4'),
    faqs: [
      {
        q: 'Which SIM cards work with RGMS 4G Cameras?',
        a: 'RGMS 4G Cameras support standard 4G SIM cards from Jio, Airtel, Vi, and BSNL.',
      },
      {
        q: 'How much data does a 4G camera consume per day?',
        a: 'Data usage is highly optimized, consuming around 150MB - 300MB daily for normal live checking and instant motion alerts.',
      },
    ],
    tableTitle: 'Compare RGMS 4G SIM Cameras',
    tableSubtitle: 'Ideal for areas with zero broadband internet availability.',
    tableHeaders: ['Camera Model', 'Connectivity', 'Lens Specs', 'Weatherproof', 'Audio', 'Price'],
    tableRows: [
      ['Trigenie 4G Triple Lens', '4G SIM Card', '5MP x 3 Triple Lens', 'IP66 Waterproof', '2-Way Audio', '₹4,499'],
      ['Trigenie 4G Outdoor FHD', '4G SIM Card', '3MP x 3 FHD', 'IP66 Waterproof', '2-Way Audio', '₹4,599'],
      ['SuperCam 4G Indoor Dual Lens', '4G SIM Card', '4MP + 4MP Dual Lens', 'Indoor Desktop/Wall', '2-Way Audio', '₹1,999'],
    ]
  },

  'solar-cameras': {
    name: 'Solar Cameras',
    badge: 'Official RGMS Green Energy Security',
    title: 'Solar Powered Security Cameras',
    description: '100% Wire-free security powered by solar panels. Never worry about power cuts or wiring for remote property monitoring.',
    whatsappTopic: 'Solar Cameras',
    iconBadges: [
      { label: 'Solar Panel Powered', icon: Zap, color: 'text-[#FF9933]' },
      { label: 'Zero Electricity Cost', icon: ShieldCheck, color: 'text-[#01a345]' },
      { label: '4G SIM Enabled', icon: Radio, color: 'text-[#082f89]' },
      { label: 'IP66 Waterproof', icon: Lock, color: 'text-[#f00102]' },
    ],
    tabs: [
      { id: 'all', label: 'All Solar Cameras' },
      { id: 'solar-4g', label: '4G Solar' },
    ],
    matchProduct: (p) => p.name.toLowerCase().includes('solar') || p.id.includes('solar') || p.id.includes('deal-4'),
    faqs: [
      {
        q: 'Does the solar camera work during rainy days?',
        a: 'Yes! The built-in high-capacity rechargeable battery pack stores 4 to 7 days of continuous standby power even without direct sun.',
      },
      {
        q: 'Is electrical power wiring needed?',
        a: 'No wiring is needed at all. Mount the panel where sunlight hits and start monitoring instantly.',
      },
    ],
    tableTitle: 'Compare RGMS Solar Camera Models',
    tableSubtitle: '100% Wireless, Eco-friendly 24/7 Outdoor Protection.',
    tableHeaders: ['Model Name', 'Power Source', 'Network', 'Resolution', 'Night Vision', 'Price'],
    tableRows: [
      ['TRIGENIE 4G Solar 18MP', 'Solar Panel + Battery', '4G SIM Card', '18MP (6MPx3) Triple Lens', 'Full Color Night Vision', '₹7,899'],
    ]
  },

  'projectors': {
    name: 'Projectors',
    badge: 'Official RGMS Home Entertainment',
    title: 'Smart Android HD Home Cinema Projectors',
    description: 'Transform your living room into a 150-inch cinematic home theater with Lumora auto-focus Android projectors.',
    whatsappTopic: 'Smart Projectors',
    iconBadges: [
      { label: '1080P Native & 4K', icon: Eye, color: 'text-[#01a345]' },
      { label: 'Auto Focus & Keystone', icon: Zap, color: 'text-[#082f89]' },
      { label: 'Android 13 Built-in', icon: Radio, color: 'text-[#FF9933]' },
      { label: '15,000 Lumens', icon: ShieldCheck, color: 'text-[#01a345]' },
    ],
    tabs: [
      { id: 'all', label: 'All Projectors' },
      { id: 'lumora', label: 'Lumora Series' },
    ],
    matchProduct: (p) => p.name.toLowerCase().includes('projector') || p.id.includes('new-1') || p.id.includes('new-2') || p.id.includes('new-3') || p.id.includes('new-4') || p.id.includes('new-5') || p.id.includes('new-6') || p.id.includes('vid-3') || p.id.includes('vid-6'),
    faqs: [
      {
        q: 'Can I stream OTT apps directly on the projector?',
        a: 'Yes! Built-in Android OS allows you to stream Netflix, Prime Video, YouTube, Hotstar directly via WiFi.',
      },
      {
        q: 'What is the maximum screen size?',
        a: 'RGMS Lumora projectors support big screen projections up to 150 to 200 inches.',
      },
    ],
    tableTitle: 'Compare Lumora Smart Projector Models',
    tableSubtitle: 'Elevate your movies, gaming, and presentations with high lumen projectors.',
    tableHeaders: ['Projector Model', 'Native Resolution', 'Brightness', 'OS & Connectivity', 'Audio', 'Price'],
    tableRows: [
      ['Lumora Ultra Smart', '1080P FHD / 4K Support', '12,000 Lumens', 'Android 13, WiFi, BT', 'Built-in Loudspeakers', '₹7,819'],
      ['Lumora Native 1080P AI', '1080P Native FHD', '15,000 Lumens', 'Auto Focus & Keystone', 'HDMI ARC + BT Voice', '₹9,999'],
      ['Lumora Ultra Pro Max', '1080P Full HD Native', '22,000 Lumens', 'Android 12 AI Keystone', '15W Loud Speakers', '₹24,999'],
    ]
  },

  'dashcams': {
    name: 'Dashcams',
    badge: 'Official RGMS Vehicle Driving Records',
    title: 'Smart Car Dashcams & Driving Cameras',
    description: 'Record every drive in crystal-clear Full HD for road safety, parking guard protection, and legal evidence.',
    whatsappTopic: 'Car Dashcams',
    iconBadges: [
      { label: 'Dual Front & Rear', icon: Eye, color: 'text-[#01a345]' },
      { label: 'Loop Recording', icon: Zap, color: 'text-[#082f89]' },
      { label: 'Parking Guard', icon: ShieldCheck, color: 'text-[#01a345]' },
      { label: 'G-Sensor Emergency', icon: Lock, color: 'text-[#f00102]' },
    ],
    tabs: [
      { id: 'all', label: 'All Dashcams' },
    ],
    matchProduct: (p) => p.name.toLowerCase().includes('dash') || p.name.toLowerCase().includes('car') || p.id.includes('vid-2'),
    faqs: [
      {
        q: 'How does automatic loop recording work?',
        a: 'When your SD card storage becomes full, old videos are automatically overwritten while emergency collision recordings stay protected.',
      },
    ],
    tableTitle: 'Compare RGMS Car Dashcam Specs',
    tableSubtitle: 'Essential security for your personal or commercial vehicle.',
    tableHeaders: ['Dashcam Model', 'Channels', 'Resolution', 'Night Vision', 'Special Features', 'Price'],
    tableRows: [
      ['RGMS 3-in-1 Dash Camera', '3 Way (Front/Cabin/Rear)', '1080P Full HD', 'Infrared Night Vision', 'G-Sensor & Loop Record', '₹2,999'],
    ]
  },

  'supercams': {
    name: 'Supercams',
    badge: 'Official RGMS Ultra Security',
    title: 'SuperCam Multi-Lens Security Systems',
    description: 'Experience triple lens, triple screen live view technology for 360-degree zero-blind-spot coverage.',
    whatsappTopic: 'Supercams',
    iconBadges: [
      { label: 'Triple Lens View', icon: Eye, color: 'text-[#01a345]' },
      { label: '10MP Ultra Clarity', icon: Zap, color: 'text-[#082f89]' },
      { label: '360° Smart PTZ', icon: ShieldCheck, color: 'text-[#01a345]' },
      { label: 'AI Human Detection', icon: Lock, color: 'text-[#f00102]' },
    ],
    tabs: [
      { id: 'all', label: 'All Supercams' },
    ],
    matchProduct: (p) => p.name.toLowerCase().includes('supercam') || p.id.includes('best-1') || p.id.includes('best-4') || p.id.includes('best-6'),
    faqs: [
      {
        q: 'What is SuperCam Triple Screen View?',
        a: 'SuperCam displays 3 camera views at the same time: 2 fixed wide-angle lenses + 1 pan-tilt tracking lens.',
      },
    ],
    tableTitle: 'Compare SuperCam Models',
    tableSubtitle: 'Maximum security coverage in a single camera housing.',
    tableHeaders: ['Model', 'Resolution', 'PTZ Type', 'Connectivity', 'Price'],
    tableRows: [
      ['Supercam 10MP Wireless', '10MP Ultra HD', '360° PTZ', 'WiFi', '₹1,599'],
      ['SuperCam 4G Dual Lens', '4+4MP FHD', 'Dual Screen View', '4G SIM', '₹1,999'],
      ['SuperCam 5+5MP Smart', '5+5MP Dual Lens', '360° PTZ', 'WiFi', '₹1,781'],
    ]
  },

  'home-studio': {
    name: 'Home Studio',
    badge: 'Official RGMS Studio Setup',
    title: 'Professional Home Studio & Audio Equipment',
    description: 'Elevate your content creation, podcasting, and live streams with pro studio lighting and wireless microphones.',
    whatsappTopic: 'Home Studio',
    iconBadges: [
      { label: 'Crystal Audio', icon: Mic, color: 'text-[#01a345]' },
      { label: 'Wireless Mic', icon: Radio, color: 'text-[#082f89]' },
      { label: 'Pro Lighting', icon: Zap, color: 'text-[#FF9933]' },
      { label: 'Plug & Play', icon: ShieldCheck, color: 'text-[#01a345]' },
    ],
    tabs: [
      { id: 'all', label: 'All Studio Products' },
    ],
    matchProduct: (p) => p.name.toLowerCase().includes('studio') || p.name.toLowerCase().includes('mic') || p.name.toLowerCase().includes('audio'),
    faqs: [
      {
        q: 'Is RGMS audio gear compatible with iPhone & Android smartphones?',
        a: 'Yes, plug-and-play connectors for Type-C, Lightning, and 3.5mm headphone jacks are included.',
      },
    ],
    tableTitle: 'Studio Accessories Overview',
    tableSubtitle: 'Quality audio and light setup for creators.',
    tableHeaders: ['Category', 'Compatibility', 'Setup Time', 'Support', 'Starting Price'],
    tableRows: [
      ['Wireless Microphones', 'iOS, Android, PC', '< 1 Minute', 'Dedicated Tech Support', '₹1,499'],
      ['Ring Light & Tripod', 'Universal Phone Mount', '< 2 Minutes', 'Dedicated Tech Support', '₹1,299'],
    ]
  },

  'gaming': {
    name: 'Gaming',
    badge: 'Official RGMS Gaming Gear',
    title: 'Gaming Controllers & Precision Accessories',
    description: 'Dominate your games with ultra-responsive gaming controllers and immersive gaming gear.',
    whatsappTopic: 'Gaming Controls',
    iconBadges: [
      { label: 'Zero Latency', icon: Zap, color: 'text-[#01a345]' },
      { label: 'Ergonomic Grip', icon: ShieldCheck, color: 'text-[#082f89]' },
      { label: 'Multi-Platform', icon: Radio, color: 'text-[#FF9933]' },
      { label: 'Rechargeable', icon: Battery, color: 'text-[#01a345]' },
    ],
    tabs: [
      { id: 'all', label: 'All Gaming Gear' },
    ],
    matchProduct: (p) => p.name.toLowerCase().includes('gaming') || p.name.toLowerCase().includes('controller'),
    faqs: [
      {
        q: 'Which platforms do RGMS controllers support?',
        a: 'Supports Android, iOS, PC, smart TVs, and consoles via Bluetooth and 2.4GHz wireless.',
      },
    ],
    tableTitle: 'Gaming Gear Specs',
    tableSubtitle: 'Engineered for smooth gaming performance.',
    tableHeaders: ['Product', 'Connectivity', 'Battery Life', 'Platform Support', 'Price'],
    tableRows: [
      ['RGMS Pro Wireless Gaming Controller', 'Bluetooth 5.0 / 2.4G', 'Up to 12 Hours', 'PC, Mobile, Android TV', '₹1,999'],
    ]
  },

  'dvr-nvr': {
    name: 'DVR & NVR Systems',
    badge: 'Official RGMS Recording Center',
    title: 'Professional DVR & NVR Recording Systems',
    description: 'Record, store, and stream multiple security camera channels with high-performance digital and network video recorders.',
    whatsappTopic: 'DVR / NVR Systems',
    iconBadges: [
      { label: 'Multi-Channel Support', icon: ShieldCheck, color: 'text-[#01a345]' },
      { label: 'Up to 4K Recording', icon: Eye, color: 'text-[#082f89]' },
      { label: 'H.265+ Compression', icon: Zap, color: 'text-[#FF9933]' },
      { label: 'Dedicated Support', icon: Lock, color: 'text-[#f00102]' },
    ],
    tabs: [
      { id: 'all', label: 'All Recording Systems' },
    ],
    matchProduct: (p) => p.name.toLowerCase().includes('dvr') || p.name.toLowerCase().includes('nvr'),
    faqs: [
      {
        q: 'How many channels do your DVRs/NVRs support?',
        a: 'We offer 4, 8, 16, and 32-channel models supporting up to 4K resolution per channel.',
      },
    ],
    tableTitle: 'DVR & NVR Comparison',
    tableSubtitle: 'High capacity video storage systems for continuous recording.',
    tableHeaders: ['Model', 'Channels', 'Max Resolution', 'Storage Slot', 'Price'],
    tableRows: [
      ['RGMS Pro 8Ch NVR', '8 Channels', '4K Ultra HD', '1x SATA (Up to 8TB)', '₹4,999'],
      ['RGMS Smart 4Ch DVR', '4 Channels', '5MP Lite', '1x SATA (Up to 6TB)', '₹2,499'],
    ]
  },

  'bullet-dome-camera': {
    name: 'Bullet & Dome Cameras',
    badge: 'Official RGMS Surveillance Lenses',
    title: 'Commercial Dome & Weatherproof Bullet Cameras',
    description: 'Durable dome cameras for discrete indoor monitoring and heavy-duty bullet cameras for weatherproof outdoor surveillance.',
    whatsappTopic: 'Bullet and Dome Cameras',
    iconBadges: [
      { label: 'IP66 Weatherproof', icon: ShieldCheck, color: 'text-[#01a345]' },
      { label: 'Infrared Night Vision', icon: Eye, color: 'text-[#082f89]' },
      { label: 'Motion Detection', icon: Zap, color: 'text-[#FF9933]' },
      { label: 'Dedicated Support', icon: Lock, color: 'text-[#f00102]' },
    ],
    tabs: [
      { id: 'all', label: 'All Bullet & Dome' },
    ],
    matchProduct: (p) => p.name.toLowerCase().includes('bullet') || p.name.toLowerCase().includes('dome'),
    faqs: [
      {
        q: 'What is the main difference between Bullet and Dome cameras?',
        a: 'Dome cameras are circular and designed for indoor ceiling mounts to provide a wider field of view discretely. Bullet cameras are longer, more visible, and designed for outdoor use with better weatherproof sealing.',
      },
    ],
    tableTitle: 'Bullet vs Dome Cameras',
    tableSubtitle: 'Choose the best style for your target coverage area.',
    tableHeaders: ['Camera Style', 'Ideal Location', 'Lens Angle', 'IR Distance', 'Price'],
    tableRows: [
      ['Dome Indoor Camera', 'Ceiling / Indoors', '110 Degrees', '20 Meters', '₹1,499'],
      ['Bullet Outdoor Camera', 'Wall / Outdoors', '90 Degrees', '30 Meters', '₹1,999'],
    ]
  },

  'wired-gps': {
    name: 'Wired GPS Trackers',
    badge: 'Official RGMS Vehicle Immobilizers',
    title: 'Hardwired Vehicle GPS Trackers & Engine Locks',
    description: 'Permanently connected anti-theft trackers with remote engine cutoff relay, ignition alerts, and real-time fleet analytics.',
    whatsappTopic: 'Wired GPS Trackers',
    iconBadges: [
      { label: 'Remote Engine Lock', icon: Lock, color: 'text-[#f00102]' },
      { label: 'Ignition Status Alerts', icon: Zap, color: 'text-[#082f89]' },
      { label: 'Geofence Boundaries', icon: ShieldCheck, color: 'text-[#01a345]' },
      { label: 'Dedicated Support', icon: Radio, color: 'text-[#FF9933]' },
    ],
    tabs: [
      { id: 'all', label: 'All Wired GPS' },
    ],
    matchProduct: (p) => p.name.toLowerCase().includes('gps wire') || p.name.toLowerCase().includes('engine lock') || (p.category === 'gps-trackers' && p.name.toLowerCase().includes('wire')),
    faqs: [
      {
        q: 'Is installing a wired GPS tracker safe for my vehicle’s electrical system?',
        a: 'Yes, the installation uses standard relay couplers and does not involve cutting the main wiring harness, keeping your vehicle’s electrical system completely safe and secure.',
      },
    ],
    tableTitle: 'Wired GPS Tracker Features',
    tableSubtitle: 'Hardwired safety systems for cars, bikes, and trucks.',
    tableHeaders: ['Model Name', 'Engine Lock', 'Audio Monitoring', 'Support', 'Price'],
    tableRows: [
      ['GPS Wire with Engine Lock', '✓ Yes', 'No', 'Lifetime Support', '₹1,999'],
      ['GPS Wire Audio & Engine Lock', '✓ Yes', '✓ Yes', 'Lifetime Support', '₹2,499'],
    ]
  },

  'magnet-gps': {
    name: 'Magnetic GPS Trackers',
    badge: 'Official RGMS Wireless Trackers',
    title: 'Portable Neodymium Magnetic GPS Trackers',
    description: 'Strong magnet trackers with massive battery backup, live voice monitoring, and zero installation or wiring requirement.',
    whatsappTopic: 'Magnetic GPS Trackers',
    iconBadges: [
      { label: 'No Wiring Required', icon: ShieldCheck, color: 'text-[#01a345]' },
      { label: 'Extra-Strong Magnets', icon: Zap, color: 'text-[#082f89]' },
      { label: 'Live Audio Monitor', icon: Mic, color: 'text-[#FF9933]' },
      { label: 'Up to 90 Days Sleep', icon: Battery, color: 'text-[#01a345]' },
    ],
    tabs: [
      { id: 'all', label: 'All Magnetic GPS' },
    ],
    matchProduct: (p) => p.name.toLowerCase().includes('magnet') || p.name.toLowerCase().includes('magnetic') || (p.category === 'gps-trackers' && p.name.toLowerCase().includes('magnet')),
    faqs: [
      {
        q: 'Can the magnetic tracker fall off on bumpy roads?',
        a: 'No, we use industrial-grade neodymium magnets that require over 20kg of pull force to separate, keeping them completely secure.',
      },
    ],
    tableTitle: 'Magnetic GPS Tracker Lineup',
    tableSubtitle: 'Wireless asset trackers for cargo and fleets.',
    tableHeaders: ['Battery Capacity', 'Active Life', 'Voice Monitor', 'Magnet Strength', 'Price'],
    tableRows: [
      ['5,000 mAh Model', '15-20 Days', '✓ Yes', 'Extra Strong', '₹2,999'],
      ['10,000 mAh Model', '30-40 Days', '✓ Yes', 'Heavy Duty', '₹3,999'],
    ]
  },

  'biometric': {
    name: 'Biometric Access Control',
    badge: 'Official RGMS Access Logs',
    title: 'Biometric Fingerprint & Facial Attendance Systems',
    description: 'Track employee attendance and secure restricted office entries with highly accurate biometric scanners.',
    whatsappTopic: 'Biometric Attendance Systems',
    iconBadges: [
      { label: 'Fingerprint + RFID', icon: ShieldCheck, color: 'text-[#01a345]' },
      { label: 'Attendance Reports', icon: Zap, color: 'text-[#082f89]' },
      { label: 'Wiegand Interface', icon: Radio, color: 'text-[#FF9933]' },
      { label: 'Dedicated Support', icon: Lock, color: 'text-[#f00102]' },
    ],
    tabs: [
      { id: 'all', label: 'All Biometrics' },
    ],
    matchProduct: (p) => p.name.toLowerCase().includes('biometric') || p.name.toLowerCase().includes('fingerprint') || (p.category === 'access-control' && p.name.toLowerCase().includes('biometric')),
    faqs: [
      {
        q: 'How do I download attendance logs?',
        a: 'You can pull attendance reports directly to a USB pen drive or connect the device to your local network/PC software.',
      },
    ],
    tableTitle: 'Biometric Scanner Comparison',
    tableSubtitle: 'Manage attendance and security logs easily.',
    tableHeaders: ['User Capacity', 'Log Capacity', 'Verification Mode', 'Power', 'Price'],
    tableRows: [
      ['3,000 Users', '100,000 Logs', 'Fingerprint / RFID / PIN', '12V DC', '₹4,999'],
    ]
  },

  'door-lock': {
    name: 'Smart Door Locks',
    badge: 'Official RGMS Home Entry',
    title: 'Keyless Smart Fingerprint & PIN Door Locks',
    description: 'Secure your homes and luxury offices with premium smart handles supporting fingerprints, passcode entry, card access, and emergency key.',
    whatsappTopic: 'Smart Door Locks',
    iconBadges: [
      { label: 'Fingerprint Handle', icon: ShieldCheck, color: 'text-[#01a345]' },
      { label: 'Passcode & Card Lock', icon: Lock, color: 'text-[#f00102]' },
      { label: 'Emergency Key Access', icon: Zap, color: 'text-[#FF9933]' },
      { label: 'Dedicated Support', icon: Radio, color: 'text-[#082f89]' },
    ],
    tabs: [
      { id: 'all', label: 'All Smart Locks' },
    ],
    matchProduct: (p) => p.name.toLowerCase().includes('door lock') || p.name.toLowerCase().includes('smart lock') || (p.category === 'access-control' && p.name.toLowerCase().includes('lock')),
    faqs: [
      {
        q: 'What happens if the smart lock battery dies completely?',
        a: 'You can power the lock temporarily using a power bank plugged into the emergency micro-USB port on the front handle, or use the mechanical emergency override key.',
      },
    ],
    tableTitle: 'Smart Door Lock Specifications',
    tableSubtitle: 'Durable smart handles for maximum access security.',
    tableHeaders: ['Finish Style', 'Lock Methods', 'Battery Type', 'Support', 'Price'],
    tableRows: [
      ['Matte Black / Copper', 'Fingerprint, PIN, RFID, Key', '4x AA Batteries', 'Lifetime Support', '₹5,999'],
    ]
  },

  'epbx': {
    name: 'EPBx Telecom Systems',
    badge: 'Official RGMS PBX Exchanges',
    title: 'EPBx Internal Telephone Exchange Systems',
    description: 'Seamless office and hospital communication systems supporting multi-line routing and extension dialling.',
    whatsappTopic: 'EPBx Systems',
    iconBadges: [
      { label: 'Multi-Line Routing', icon: Radio, color: 'text-[#01a345]' },
      { label: 'Extension Dialling', icon: Zap, color: 'text-[#082f89]' },
      { label: 'Music on Hold', icon: ShieldCheck, color: 'text-[#FF9933]' },
      { label: 'Dedicated Support', icon: Lock, color: 'text-[#f00102]' },
    ],
    tabs: [
      { id: 'all', label: 'All EPBx Systems' },
    ],
    matchProduct: (p) => p.name.toLowerCase().includes('epbx') || p.name.toLowerCase().includes('pbx') || (p.category === 'intercom' && p.name.toLowerCase().includes('epbx')),
    faqs: [
      {
        q: 'Do your EPBx systems work with standard analog phones?',
        a: 'Yes, they are compatible with standard RJ11 analog desk phones and telephone lines.',
      },
    ],
    tableTitle: 'EPBx Systems Exchange Specs',
    tableSubtitle: 'PBX networks for office telephone management.',
    tableHeaders: ['Outside Lines', 'Extension Ports', 'Feature Support', 'Support', 'Price'],
    tableRows: [
      ['8 Lines', '16 Extensions', 'Transfer, Forward, Hold', 'Lifetime Support', '₹8,999'],
    ]
  },

  'tg-phone': {
    name: 'TG Phone Handsets',
    badge: 'Official RGMS Intercom Extension',
    title: 'TG Phone Intercom Telephone Handsets',
    description: 'Reliable analog and digital desk telephone handsets compatible with EPBx and standard telephone networks.',
    whatsappTopic: 'TG Phone Handsets',
    iconBadges: [
      { label: 'Clear Voice Intercom', icon: Mic, color: 'text-[#01a345]' },
      { label: 'Universal Compatibility', icon: ShieldCheck, color: 'text-[#082f89]' },
      { label: 'Speed Dial Buttons', icon: Zap, color: 'text-[#FF9933]' },
      { label: 'Dedicated Support', icon: Lock, color: 'text-[#f00102]' },
    ],
    tabs: [
      { id: 'all', label: 'All Intercom Phones' },
    ],
    matchProduct: (p) => p.name.toLowerCase().includes('tg phone') || p.name.toLowerCase().includes('handset') || (p.category === 'intercom' && p.name.toLowerCase().includes('phone')),
    faqs: [
      {
        q: 'Do these phones require additional batteries or power adapters?',
        a: 'No, standard analog handsets run directly on standard telephone line power from your EPBx system.',
      },
    ],
    tableTitle: 'Desk Intercom Handsets Specs',
    tableSubtitle: 'Universal telephone handsets for internal calling.',
    tableHeaders: ['Dialer Style', 'Connection', 'Volume Control', 'Price'],
    tableRows: [
      ['Keypad with Display', 'RJ11 Line Cable', 'Adjustable Ringer', '₹999'],
    ]
  },

  'cctv-camera': {
    name: 'CCTV Camera',
    badge: 'Official RGMS Surveillance Systems',
    title: 'CCTV Cameras, DVR & NVR Systems',
    description: 'Complete CCTV surveillance solutions including DVR/NVR recorders, Bullet, Dome, 4G SIM, Solar, and WiFi cameras for homes, offices, and commercial sites.',
    whatsappTopic: 'CCTV Camera Systems',
    iconBadges: [
      { label: 'DVR / NVR Recording', icon: ShieldCheck, color: 'text-[#01a345]' },
      { label: '4G & WiFi Ready', icon: Radio, color: 'text-[#082f89]' },
      { label: 'AI Motion Detection', icon: Zap, color: 'text-[#FF9933]' },
      { label: 'Dedicated Support', icon: Lock, color: 'text-[#f00102]' },
    ],
    tabs: [
      { id: 'all', label: 'All CCTV' },
      { id: 'dvr', label: 'DVR / NVR' },
      { id: 'bullet', label: 'Bullet / Dome' },
      { id: '4g', label: '4G SIM Camera' },
      { id: 'solar', label: 'Solar Camera' },
      { id: 'wifi', label: 'Wifi Camera' },
    ],
    matchProduct: (p) => p.name.toLowerCase().includes('camera') || p.name.toLowerCase().includes('cctv') || p.name.toLowerCase().includes('dvr') || p.name.toLowerCase().includes('nvr'),
    faqs: [
      {
        q: 'What is the difference between DVR and NVR?',
        a: 'DVR (Digital Video Recorder) works with analog cameras over coaxial cables. NVR (Network Video Recorder) works with IP cameras over network/ethernet cables and supports higher resolutions.',
      },
      {
        q: 'Can I mix Bullet and Dome cameras in one system?',
        a: 'Yes! RGMS DVR/NVR systems support mixing of bullet, dome, and IP cameras in a single recording setup.',
      },
    ],
    tableTitle: 'CCTV Camera Comparison',
    tableSubtitle: 'Choose the right surveillance system for your property.',
    tableHeaders: ['Type', 'Connectivity', 'Resolution', 'Power', 'Price Range'],
    tableRows: [
      ['Bullet / Dome Camera', 'Coaxial / PoE', '2MP – 8MP', 'PoE / 12V DC', '₹1,499 – ₹4,999'],
      ['4G SIM Camera', '4G SIM Card', '3MP – 18MP', '12V DC / Solar', '₹4,499 – ₹7,899'],
      ['Solar Camera', 'Solar + 4G SIM', '3MP – 18MP', '100% Solar', '₹5,999 – ₹8,999'],
      ['WiFi Camera', '2.4GHz WiFi', '3MP – 10MP', '5V USB / 12V DC', '₹1,199 – ₹3,499'],
    ]
  },

  'accessories': {
    name: 'All Accessories',
    badge: 'Official RGMS CCTV Accessories',
    title: 'CCTV Accessories & Installation Hardware',
    description: 'Everything you need for a complete CCTV installation — racks, SMPS, PoE switches, ethernet switches, junction boxes, cables, mounts, and more.',
    whatsappTopic: 'CCTV Accessories',
    iconBadges: [
      { label: 'Genuine RGMS Parts', icon: ShieldCheck, color: 'text-[#01a345]' },
      { label: 'Complete Kits Available', icon: Zap, color: 'text-[#082f89]' },
      { label: 'Express Delivery India', icon: Radio, color: 'text-[#FF9933]' },
      { label: 'Dedicated Support', icon: Lock, color: 'text-[#f00102]' },
    ],
    tabs: [
      { id: 'all', label: 'All Accessories' },
      { id: 'rack', label: 'Rack / SMPS' },
      { id: 'cable', label: 'Cables & Connectors' },
      { id: 'mount', label: 'Mounts & Stands' },
    ],
    matchProduct: (p) => p.name.toLowerCase().includes('accessory') || p.name.toLowerCase().includes('cable') || p.name.toLowerCase().includes('rack') || p.name.toLowerCase().includes('switch') || p.name.toLowerCase().includes('smps'),
    faqs: [
      {
        q: 'Which SMPS is best for powering 4 or 8 CCTV cameras?',
        a: 'For 4 cameras, a 5A SMPS works well. For 8 cameras, use a 10A SMPS with a distribution box for clean, stable power to each camera.',
      },
      {
        q: 'What type of cable is used for CCTV installations?',
        a: 'Coaxial cables (RG59/RG6) are used for analog CCTV, while Cat6 ethernet cables are used for IP/PoE cameras.',
      },
    ],
    tableTitle: 'CCTV Accessories Overview',
    tableSubtitle: 'Professional-grade parts for reliable CCTV installations.',
    tableHeaders: ['Accessory', 'Use Case', 'Compatibility', 'Price Range'],
    tableRows: [
      ['Rack / Cabinet', 'Secure DVR & NVR storage', 'Universal', '₹1,999 – ₹5,999'],
      ['SMPS Power Supply', 'Multi-camera power distribution', 'All CCTV cameras', '₹499 – ₹1,499'],
      ['PoE Switch', 'IP camera power over ethernet', 'IP / PoE Cameras', '₹1,499 – ₹4,999'],
      ['Junction Box', 'Outdoor cable protection', 'All CCTV Systems', '₹199 – ₹499'],
      ['Camera Stand / Wall Mount', 'Mounting & positioning', 'Bullet / Dome Cameras', '₹99 – ₹499'],
    ]
  },

  'access-control': {
    name: 'Access Control',
    badge: 'Official RGMS Smart Entry Systems',
    title: 'Biometric & Smart Access Control Systems',
    description: 'Secure your home, office, or factory with RGMS biometric fingerprint attendance systems, smart door locks, and access control panels.',
    whatsappTopic: 'Access Control Systems',
    iconBadges: [
      { label: 'Biometric Fingerprint', icon: ShieldCheck, color: 'text-[#01a345]' },
      { label: 'Smart Door Lock', icon: Lock, color: 'text-[#f00102]' },
      { label: 'Attendance System', icon: Zap, color: 'text-[#082f89]' },
      { label: 'Dedicated Support', icon: Radio, color: 'text-[#FF9933]' },
    ],
    tabs: [
      { id: 'all', label: 'All Access Control' },
      { id: 'biometric', label: 'Biometric' },
      { id: 'door', label: 'Door Lock' },
    ],
    matchProduct: (p) => p.name.toLowerCase().includes('biometric') || p.name.toLowerCase().includes('fingerprint') || p.name.toLowerCase().includes('door lock') || p.name.toLowerCase().includes('access'),
    faqs: [
      {
        q: 'How many fingerprints can the biometric system store?',
        a: 'RGMS biometric systems can store up to 3000 fingerprint templates and 100,000 attendance records.',
      },
      {
        q: 'Can the door lock work without power?',
        a: 'Yes, RGMS smart door locks include a battery backup that keeps the lock operational during power cuts.',
      },
    ],
    tableTitle: 'Access Control System Comparison',
    tableSubtitle: 'Smart entry systems for homes, offices, and commercial premises.',
    tableHeaders: ['Product', 'Technology', 'Capacity', 'Power', 'Price Range'],
    tableRows: [
      ['Biometric Attendance System', 'Fingerprint + RFID', '3000 Users', '12V DC', '₹4,999 – ₹9,999'],
      ['Smart Door Lock', 'Fingerprint + PIN + Key', 'Unlimited PIN', 'AA Battery + Backup', '₹5,999 – ₹14,999'],
    ]
  },

  'intercom': {
    name: 'Intercom',
    badge: 'Official RGMS Communication Systems',
    title: 'Intercom & EPBx Communication Systems',
    description: 'Professional intercom systems and EPBx telephone exchange solutions for homes, offices, hospitals, and multi-storey buildings.',
    whatsappTopic: 'Intercom Systems',
    iconBadges: [
      { label: 'EPBx / PABX Systems', icon: Radio, color: 'text-[#01a345]' },
      { label: 'TG Phone Handsets', icon: Mic, color: 'text-[#082f89]' },
      { label: 'Multi-Extension', icon: Zap, color: 'text-[#FF9933]' },
      { label: 'Dedicated Support', icon: ShieldCheck, color: 'text-[#f00102]' },
    ],
    tabs: [
      { id: 'all', label: 'All Intercom' },
      { id: 'epbx', label: 'EPBx Systems' },
      { id: 'phone', label: 'TG Phone' },
    ],
    matchProduct: (p) => p.name.toLowerCase().includes('intercom') || p.name.toLowerCase().includes('epbx') || p.name.toLowerCase().includes('phone'),
    faqs: [
      {
        q: 'What is an EPBx system?',
        a: 'EPBx (Electronic Private Branch Exchange) is an internal telephone exchange that allows multiple extensions within a building to communicate with each other and with external lines.',
      },
      {
        q: 'How many extensions can one EPBx system support?',
        a: 'RGMS EPBx systems support from 4 to 64+ extensions depending on the model, suitable for small offices to large buildings.',
      },
    ],
    tableTitle: 'Intercom & EPBx System Comparison',
    tableSubtitle: 'Reliable internal communication for offices, hospitals, and residential buildings.',
    tableHeaders: ['System', 'Extensions', 'Lines', 'Installation', 'Price Range'],
    tableRows: [
      ['EPBx 8+16 System', 'Up to 16 Extensions', '8 Outside Lines', 'Professional Install', '₹8,999 – ₹19,999'],
      ['TG Phone Handset', 'Single Extension', 'Compatible with EPBx', 'Plug & Play', '₹999 – ₹2,499'],
    ]
  }
};


const getCategoryConfig = (slug) => {
  const normalized = (slug || 'all').toLowerCase().trim();
  if (normalized === 'all' || normalized === 'products' || normalized === 'shop-all' || normalized === 'all-products' || !slug) {
    return CATEGORY_CONFIGS['all'];
  }
  if (CATEGORY_CONFIGS[normalized]) {
    return CATEGORY_CONFIGS[normalized];
  }
  if (normalized.includes('gps') || normalized.includes('tracker')) return CATEGORY_CONFIGS['gps-trackers'];
  if (normalized.includes('wifi')) return CATEGORY_CONFIGS['wifi-cameras'];
  if (normalized.includes('4g')) return CATEGORY_CONFIGS['4g-cameras'];
  if (normalized.includes('solar')) return CATEGORY_CONFIGS['solar-cameras'];
  if (normalized.includes('projector')) return CATEGORY_CONFIGS['projectors'];
  if (normalized.includes('dash')) return CATEGORY_CONFIGS['dashcams'];
  if (normalized.includes('super')) return CATEGORY_CONFIGS['supercams'];
  if (normalized.includes('studio')) return CATEGORY_CONFIGS['home-studio'];
  if (normalized.includes('game') || normalized.includes('gaming')) return CATEGORY_CONFIGS['gaming'];
  if (normalized.includes('cctv') || normalized.includes('bullet') || normalized.includes('dome') || normalized.includes('dvr') || normalized.includes('nvr')) return CATEGORY_CONFIGS['cctv-camera'];
  if (normalized.includes('access') || normalized.includes('biometric') || normalized.includes('door-lock')) return CATEGORY_CONFIGS['access-control'];
  if (normalized.includes('accessori') || normalized.includes('rack') || normalized.includes('smps') || normalized.includes('cable') || normalized.includes('mount')) return CATEGORY_CONFIGS['accessories'];
  if (normalized.includes('intercom') || normalized.includes('epbx') || normalized.includes('phone')) return CATEGORY_CONFIGS['intercom'];

  const formattedName = normalized.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    name: formattedName || 'Products',
    badge: 'Official RGMS Collection',
    title: `${formattedName || 'Smart Products'} & Security Solutions`,
    description: `Explore RGMS top-rated ${formattedName || 'smart devices'} with dedicated customer support, express delivery across India, and certified quality.`,
    whatsappTopic: formattedName || 'Products',
    iconBadges: [
      { label: 'Official RGMS Product', icon: ShieldCheck, color: 'text-[#01a345]' },
      { label: 'Dedicated Support', icon: Zap, color: 'text-[#082f89]' },
      { label: 'Express Delivery', icon: Radio, color: 'text-[#FF9933]' },
    ],
    tabs: [{ id: 'all', label: `All ${formattedName || 'Products'}` }],
    matchProduct: (p) => p.name.toLowerCase().includes(normalized.replace('-', ' ')) || p.name.toLowerCase().includes(normalized.split('-')[0]),
    faqs: [
      {
        q: 'Is customer support available for this product?',
        a: 'Yes, all RGMS products include lifetime dedicated technical support and assistance.',
      }
    ],
    tableTitle: `Compare ${formattedName} Features`,
    tableSubtitle: 'Quality smart devices for modern Indian homes and businesses.',
    tableHeaders: ['Product Name', 'Highlights', 'Support', 'Price'],
    tableRows: []
  };
};

export const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products: contextProducts } = useProducts();
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const config = useMemo(() => getCategoryConfig(slug), [slug]);

  useEffect(() => {
    setActiveFilter('all');
    window.scrollTo(0, 0);
  }, [slug]);

  const allProducts = useMemo(() => {
    return contextProducts || [];
  }, [contextProducts]);

  const categoryProducts = useMemo(() => {
    if (!slug || slug === 'all' || slug === 'products' || slug === 'shop-all' || slug === 'all-products') {
      return allProducts;
    }
    return allProducts.filter(config.matchProduct);
  }, [allProducts, config, slug]);

  const filteredProducts = useMemo(() => {
    let list = [...categoryProducts];
    if (activeFilter !== 'all') {
      if (activeFilter === 'cctv') {
        list = list.filter((p) => 
          p.category === 'cctv-camera' || 
          p.category === 'wifi-cameras' || 
          p.category === '4g-cameras' || 
          p.category === 'solar-cameras' || 
          p.category === 'supercams' || 
          p.category === 'dashcams' || 
          (CATEGORY_CONFIGS['cctv-camera'] && CATEGORY_CONFIGS['cctv-camera'].matchProduct(p))
        );
      } else if (activeFilter === 'gps') {
        list = list.filter((p) => 
          p.category === 'gps-trackers' || 
          (CATEGORY_CONFIGS['gps-trackers'] && CATEGORY_CONFIGS['gps-trackers'].matchProduct(p))
        );
      } else if (activeFilter === 'accessories') {
        list = list.filter((p) => 
          p.category === 'accessories' || 
          (CATEGORY_CONFIGS['accessories'] && CATEGORY_CONFIGS['accessories'].matchProduct(p))
        );
      } else if (activeFilter === 'access-control') {
        list = list.filter((p) => 
          p.category === 'access-control' || 
          (CATEGORY_CONFIGS['access-control'] && CATEGORY_CONFIGS['access-control'].matchProduct(p))
        );
      } else if (activeFilter === 'intercom') {
        list = list.filter((p) => 
          p.category === 'intercom' || 
          (CATEGORY_CONFIGS['intercom'] && CATEGORY_CONFIGS['intercom'].matchProduct(p))
        );
      } else {
        const f = activeFilter.toLowerCase();
        list = list.filter((p) => 
          p.name.toLowerCase().includes(f) || 
          p.id.toLowerCase().includes(f) ||
          (p.category && p.category.toLowerCase().includes(f))
        );
      }
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 5) - (a.rating || 5));
    }

    return list;
  }, [categoryProducts, activeFilter, sortBy]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#07152e]">
      <SEO 
        title={`${config.title} | RGMS Official Store`}
        description={config.description}
        keywords={`${config.name}, RGMS ${config.name}, buy ${config.name} India, ${config.name} price`}
        canonical={`/category/${slug || 'gps-trackers'}`}
      />
      <Header />

      {/* Hero Category Banner */}
      <section className="bg-gradient-to-br from-[#041b54] via-[#082f89] to-[#041b54] text-white pt-10 pb-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#cbd5e1] mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} className="text-[#01a345]" />
            <span className="text-white">Categories</span>
            <ChevronRight size={14} className="text-[#01a345]" />
            <span className="text-[#01a345] font-bold uppercase tracking-wider">{config.name}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#01a345]/20 text-[#01a345] border border-[#01a345]/40 text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                <ShieldCheck size={14} /> {config.badge}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                {config.title}
              </h1>

              <p className="text-[#cbd5e1] text-sm sm:text-base max-w-2xl leading-relaxed font-medium">
                {config.description}
              </p>

              {/* Feature Highlights Badges */}
              <div className="flex flex-wrap gap-3 pt-2">
                {config.iconBadges.map((b, idx) => {
                  const IconComp = b.icon;
                  return (
                    <span key={idx} className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-white border border-white/10">
                      <IconComp size={14} className={b.color} /> {b.label}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Quick WhatsApp Support Callout Box */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl text-center space-y-4">
              <div className="w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                <WhatsAppIcon size={24} />
              </div>
              <h3 className="text-lg font-extrabold text-white">Need {config.name} Help?</h3>
              <p className="text-xs text-[#cbd5e1] font-medium">Chat directly with our RGMS Product Team for recommendations, bulk orders, or setup support.</p>
              <a
                href={`https://wa.me/917707019501?text=Hello%20RGMS%20Team!%20I%20want%20to%20know%20more%20about%20${encodeURIComponent(config.whatsappTopic)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-extrabold py-3 px-5 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95"
              >
                <WhatsAppIcon size={16} /> WhatsApp Us: +91 7707 019 501
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Category Filter Strip */}
      <section className="bg-white border-b border-slate-200 py-4 shadow-sm sticky top-[72px] z-30">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Subcategory Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide w-full md:w-auto pb-1 md:pb-0">
            {config.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  activeFilter === tab.id
                    ? 'bg-[#082f89] text-white shadow-md'
                    : 'bg-[#f1f5f9] text-[#64748b] hover:bg-[#e8eeff] hover:text-[#082f89]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
            <span className="text-xs font-extrabold text-[#64748b] uppercase tracking-wider flex items-center gap-1">
              <SlidersHorizontal size={14} /> Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#f1f5f9] border border-slate-200 text-xs font-bold text-[#07152e] px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#082f89]"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>
      </section>

      {/* Main Products Listing Section */}
      <section className="max-w-[1280px] mx-auto px-4 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-[#07152e]">Available {config.name} Models</h2>
            <p className="text-xs text-[#64748b] font-medium mt-1">Showing {filteredProducts.length} premium models with dedicated customer support</p>
          </div>
          <Link to="/" className="text-xs font-extrabold text-[#082f89] hover:underline flex items-center gap-1">
            <ArrowLeft size={14} /> Back to Homepage
          </Link>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 max-w-xl mx-auto my-6">
            <div className="w-16 h-16 bg-[#e8eeff] text-[#082f89] rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <ShieldCheck size={36} />
            </div>
            <h3 className="text-xl font-black text-[#07152e]">No Products Available</h3>
            <p className="text-xs sm:text-sm text-[#64748b] font-medium leading-relaxed">
              We currently don't have any products available in this category. Please check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${convertToSlug(product.name)}-${product.id}`)}
              className="group bg-white rounded-3xl p-5 shadow-[0_4px_20px_rgba(8,47,137,0.06)] hover:shadow-[0_20px_40px_rgba(8,47,137,0.14)] hover:-translate-y-1.5 transition-all duration-300 border border-slate-100 flex flex-col justify-between relative overflow-hidden cursor-pointer"
            >
              {/* Badge */}
              {product.badge && (
                <span className="absolute top-4 left-4 bg-[#f00102] text-white text-[10px] font-black px-2.5 py-1 rounded-md z-10 shadow-md uppercase tracking-wider">
                  {product.badge}
                </span>
              )}

              {/* Product Image */}
              <div className="h-[180px] flex items-center justify-center my-2 p-2 bg-[#f8fafc] rounded-2xl group-hover:bg-[#e8eeff]/40 transition-colors">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Rating & Review */}
              <div className="flex items-center gap-1.5 my-2">
                <span className="bg-[#f5a623]/20 text-[#d97706] text-[11px] font-black px-2 py-0.5 rounded-md flex items-center gap-1">
                  ★ {product.rating || 5.0}
                </span>
                <span className="text-[11px] text-[#64748b] font-semibold">({product.reviews || 40} reviews)</span>
              </div>

              {/* Product Title */}
              <h3 className="text-xs sm:text-[13px] font-bold text-[#07152e] leading-snug line-clamp-2 min-h-[36px]" title={product.name}>
                {product.name}
              </h3>

              {/* Key Highlights list */}
              <div className="my-3 space-y-1 border-t border-slate-100 pt-2.5 text-[11px] text-[#64748b]">
                {product.name.toLowerCase().includes('lock') && (
                  <p className="flex items-center gap-1.5 font-semibold text-[#f00102]">
                    <CheckCircle2 size={13} className="text-[#f00102]" /> Remote Engine Lock/Cutoff
                  </p>
                )}
                {(product.name.toLowerCase().includes('voice') || product.name.toLowerCase().includes('audio')) && (
                  <p className="flex items-center gap-1.5 font-semibold text-[#01a345]">
                    <CheckCircle2 size={13} className="text-[#01a345]" /> Live Voice & Audio Listening
                  </p>
                )}
                {product.name.toLowerCase().includes('solar') && (
                  <p className="flex items-center gap-1.5 font-semibold text-[#FF9933]">
                    <CheckCircle2 size={13} className="text-[#FF9933]" /> 100% Solar Panel Powered
                  </p>
                )}
                {product.name.toLowerCase().includes('4g') && (
                  <p className="flex items-center gap-1.5 font-semibold text-[#082f89]">
                    <CheckCircle2 size={13} className="text-[#082f89]" /> 4G SIM Card Support
                  </p>
                )}
              </div>

              {/* Price & Actions */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-baseline gap-2 mb-3">
                  {product.oldPrice && (
                    <span className="text-xs text-[#94a3b8] line-through font-semibold">{formatPrice(product.oldPrice)}</span>
                  )}
                  <span className="text-lg font-black text-[#082f89]">{formatPrice(product.price)}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="bg-[#082f89] hover:bg-[#0e45c4] text-white text-[11.5px] font-bold py-2.5 rounded-xl shadow-md transition-all active:scale-95"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                    className="bg-slate-100 hover:bg-[#e8eeff] hover:text-[#082f89] text-[#07152e] text-[11.5px] font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1"
                  >
                    <Eye size={13} /> View Specs
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
        )}
      </section>

      {/* Model Specification Comparison Table */}
      {config.tableRows && config.tableRows.length > 0 && (
        <section className="bg-white py-14 border-t border-b border-slate-200">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-black text-[#01a345] uppercase tracking-wider bg-[#e2f5ec] px-3 py-1 rounded-full">
                Feature Comparison Matrix
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#07152e] mt-2">
                {config.tableTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#64748b] font-medium mt-1">
                {config.tableSubtitle}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-[#041b54] text-white text-xs font-extrabold uppercase">
                    {config.tableHeaders.map((h, i) => (
                      <th
                        key={i}
                        className={`p-4 ${i === 0 ? 'rounded-tl-2xl' : ''} ${i === config.tableHeaders.length - 1 ? 'rounded-tr-2xl' : ''}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-[#07152e]">
                  {config.tableRows.map((row, rIdx) => (
                    <tr key={rIdx} className={`hover:bg-slate-50 transition-colors ${rIdx % 2 === 1 ? 'bg-[#f8fafc]' : ''}`}>
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`p-4 ${cIdx === 0 ? 'font-bold text-[#082f89]' : ''} ${cell.includes('✓') ? 'text-[#01a345] font-bold' : ''} ${cIdx === row.length - 1 ? 'font-black text-[#082f89]' : ''}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Accordion Section */}
      {config.faqs && config.faqs.length > 0 && (
        <section className="max-w-[1280px] mx-auto px-4 lg:px-8 py-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black text-[#082f89] uppercase tracking-wider bg-[#e8eeff] px-3 py-1 rounded-full flex items-center gap-1.5 w-max mx-auto">
              <HelpCircle size={14} /> Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#07152e] mt-2">
              Got Questions About {config.name}?
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {config.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-extrabold text-sm text-[#07152e] hover:text-[#082f89] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronRight
                    size={18}
                    className={`transition-transform duration-300 shrink-0 text-[#082f89] ${openFaq === idx ? 'rotate-90' : ''}`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-[#64748b] leading-relaxed font-medium border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Full Big Specification & Details Page Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-4xl lg:max-w-5xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-8 shadow-2xl relative border border-slate-200">
            {/* Sticky Header with Close Button */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-sm z-20 pt-1">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="bg-[#082f89] text-white text-[10px] sm:text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {selectedProduct.badge || 'RGMS Certified'}
                </span>
                <span className="text-xs font-bold text-[#64748b] hidden sm:inline-block">
                  Official Technical Specification & Product Guide
                </span>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-[#07152e] flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-xs"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Top Grid: Product Showcase + Core Buying Info */}
            <div className="grid md:grid-cols-12 gap-6 sm:gap-8 items-start mb-8">
              {/* Product Image Column */}
              <div className="md:col-span-5 bg-[#f8fafc] rounded-3xl p-6 border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="w-full h-[220px] sm:h-[280px] flex items-center justify-center">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="mt-4 flex items-center gap-2 text-[11px] font-bold text-[#082f89] bg-[#e8eeff] px-3.5 py-1.5 rounded-full">
                  <ShieldCheck size={14} className="text-[#01a345]" /> Tested & Certified by RGMS Labs
                </div>
              </div>

              {/* Product Info & Pricing Column */}
              <div className="md:col-span-7 space-y-4">
                {selectedProduct.rating && (
                  <div className="flex items-center gap-2">
                    <div className="flex text-[#f5a623]">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={14} className={s <= Math.round(selectedProduct.rating) ? 'fill-[#f5a623]' : 'fill-slate-200 text-slate-200'} />
                      ))}
                    </div>
                    <span className="text-xs font-black text-[#07152e]">
                      {selectedProduct.rating.toFixed(1)} ({selectedProduct.reviews || 48} verified buyer reviews)
                    </span>
                  </div>
                )}

                <h3 className="text-xl sm:text-2xl font-black text-[#07152e] leading-snug tracking-tight">
                  {selectedProduct.name}
                </h3>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-2xl sm:text-3xl font-black text-[#082f89] tabular-nums">
                    {formatPrice(selectedProduct.price)}
                  </span>
                  {selectedProduct.oldPrice && (
                    <>
                      <span className="text-sm text-[#94a3b8] line-through font-semibold tabular-nums">
                        {formatPrice(selectedProduct.oldPrice)}
                      </span>
                      <span className="bg-[#01a345]/15 text-[#01a345] text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                        Save {Math.round(((selectedProduct.oldPrice - selectedProduct.price) / selectedProduct.oldPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#475569] font-medium leading-relaxed">
                  {selectedProduct.description || 'High-performance smart security device built for extreme reliability, crystal-clear 4K optics, instant mobile app alerts, and robust weatherproof protection.'}
                </p>

                {/* Highlights List */}
                <div className="bg-[#f8fafc] rounded-2xl p-4 border border-slate-100 space-y-2.5">
                  <p className="text-[11px] font-black text-[#082f89] uppercase tracking-wider">Key Highlights:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#1e293b] font-semibold">
                    <div className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#01a345] shrink-0" /> 2-Min DIY Easy Mobile Setup</div>
                    <div className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#01a345] shrink-0" /> 24/7 Dedicated Tech Support</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="w-full bg-[#082f89] hover:bg-[#0e45c4] text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={16} /> Add to Cart
                  </button>
                  <a
                    href={`https://wa.me/917707019501?text=Hello%20RGMS!%20I%20want%20to%20order%20${encodeURIComponent(selectedProduct.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-2xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    <WhatsAppIcon size={18} /> Order on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Detailed Technical Specifications Table */}
            <div className="mt-8 border-t border-slate-200 pt-6">
              <h4 className="text-base sm:text-lg font-black text-[#07152e] mb-4 flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-[#082f89]" /> Technical Specifications Sheet
              </h4>

              <div className="bg-[#f8fafc] rounded-2xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-200/80 bg-slate-100/60">
                      <td className="py-3 px-4 font-bold text-[#07152e] w-1/3 sm:w-1/4">Model Name</td>
                      <td className="py-3 px-4 font-semibold text-[#334155]">{selectedProduct.name}</td>
                    </tr>
                    <tr className="border-b border-slate-200/80">
                      <td className="py-3 px-4 font-bold text-[#07152e]">Category</td>
                      <td className="py-3 px-4 font-semibold text-[#334155] capitalize">{selectedProduct.category ? selectedProduct.category.replace('-', ' ') : 'Smart Security'}</td>
                    </tr>
                    <tr className="border-b border-slate-200/80 bg-slate-100/60">
                      <td className="py-3 px-4 font-bold text-[#07152e]">Optics & Sensor</td>
                      <td className="py-3 px-4 font-semibold text-[#334155]">Ultra HD Starlight Sensor • Color Night Vision up to 15m</td>
                    </tr>
                    <tr className="border-b border-slate-200/80">
                      <td className="py-3 px-4 font-bold text-[#07152e]">Connectivity</td>
                      <td className="py-3 px-4 font-semibold text-[#334155]">4G SIM Card Slot / 2.4GHz High-Gain WiFi Network</td>
                    </tr>
                    <tr className="border-b border-slate-200/80 bg-slate-100/60">
                      <td className="py-3 px-4 font-bold text-[#07152e]">Audio & Siren</td>
                      <td className="py-3 px-4 font-semibold text-[#334155]">2-Way Live Audio Talkback + Built-in Security Alarm Siren</td>
                    </tr>
                    <tr className="border-b border-slate-200/80">
                      <td className="py-3 px-4 font-bold text-[#07152e]">Storage Options</td>
                      <td className="py-3 px-4 font-semibold text-[#334155]">MicroSD Slot (up to 128GB) + Secure Encrypted Cloud Backup</td>
                    </tr>
                    <tr className="border-b border-slate-200/80 bg-slate-100/60">
                      <td className="py-3 px-4 font-bold text-[#07152e]">Weather Resistance</td>
                      <td className="py-3 px-4 font-semibold text-[#334155]">IP66 Dustproof & Waterproof Heavy-Duty Enclosure</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-[#07152e]">Tech Support</td>
                      <td className="py-3 px-4 font-semibold text-[#334155]">24/7 Lifetime Support via WhatsApp & Phone</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* In The Box Section */}
            <div className="mt-8 bg-[#e8eeff]/50 rounded-2xl p-5 border border-[#082f89]/15">
              <h5 className="text-xs font-black text-[#082f89] uppercase tracking-wider mb-2">Package Contents (In The Box):</h5>
              <p className="text-xs text-[#334155] font-medium leading-relaxed">
                1x {selectedProduct.name} Main Unit • 1x Heavy-Duty Power Adapter & Cable • 1x Mounting Bracket & Screw Kit • 1x Quick Start Guide
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CategoryPage;
