import React from 'react';
import { Helmet } from 'react-helmet-async';

export const SEO = ({ 
  title = "RGMS Smarthome & Security | Smart AI CCTV Cameras & GPS Trackers", 
  description = "Shop RGMS smart security cameras, 4G solar surveillance, vehicle GPS trackers with remote engine lock, and 4K smart projectors. Express shipping and dedicated support across India.", 
  keywords = "RGMS, smart security cameras, GPS tracker bike car, 4G solar camera, engine lock GPS, home security India, CCTV camera 360",
  canonical = "",
  ogType = "website",
  ogImage = "/assets/rgms-logo-transparent.png"
}) => {
  const siteUrl = "https://www.rgmservices.in";
  const currentCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <Helmet>
      {/* Basic Title & Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={currentCanonical} />

      {/* Open Graph (Facebook / WhatsApp / LinkedIn) */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={currentCanonical} />
      <meta property="og:site_name" content="RGMS Smarthome" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
    </Helmet>
  );
};

export default SEO;
