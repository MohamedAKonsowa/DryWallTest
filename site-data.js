const BUSINESS = {
  name: 'Louisville Drywall & Painting LLC',
  phone: '+1 5022180426',
  phoneDisplay: '(502) 218-0426',
  email: 'quotes@louisvilledrywallpaints.org',
  facebook: 'https://www.facebook.com/profile.php?id=61590733854853',
  angi: 'https://www.angi.com/companylist/us/ky/louisville/louisville-drywall-and-paints-reviews-162824847.htm',
  thumbtack:
    'https://www.thumbtack.com/ky/louisville/drywall-repair/louisville-drywall-painting/service/581785818697179146',
  yelp: 'https://www.yelp.com/biz/louisville-drywall-and-painting-louisville',
  siteUrl: process.env.SITE_URL || 'https://louisvilledrywallpaints.com',
  brochurePath: '/docs/louisville-drywall-painting-homeowner-brochure.pdf',
  brochurePreview: '/images/brochure-preview.png',
};

function getSameAs() {
  return [BUSINESS.facebook, BUSINESS.angi, BUSINESS.thumbtack, BUSINESS.yelp];
}

const SERVICES = [
  {
    slug: 'drywall-repair',
    path: '/drywall-repair',
    name: 'Drywall Patching & Repair',
    serviceType: 'Drywall patching and repair',
    title: 'Drywall Patching & Repair in Louisville KY | Hole, Crack & Water Damage Fixes',
    description:
      'Drywall patching and repair in Louisville KY — nail holes, doorknob holes, cracks, water damage, and sheet replacement. Free estimates. Call (502) 218-0426.',
    image: '/images/work-beam.png',
    imageAlt: 'Drywall patching and repair finishing around a wood beam in a Louisville home',
    intro:
      'Need a wall patched fast? Louisville Drywall & Painting LLC specializes in drywall patching and repair jobs — from small nail holes and doorknob damage to crack repair, water-damaged sheets, and full wall replacements. We serve Louisville, surrounding KY communities, and rural Southern Indiana.',
    details: [
      'Nail holes, screw holes, and small dent patching',
      'Doorknob holes, large holes, and cutouts for outlets or remounts',
      'Crack repair along seams, corners, and ceiling lines',
      'Water damage, stain repair, and sheet replacement',
      'Texture blending so patches match the surrounding wall',
      'Ceiling patches and multi-room repair jobs',
    ],
    formValue: 'Drywall Patching & Repair',
  },
  {
    slug: 'drywall-installation',
    path: '/drywall-installation',
    name: 'Drywall Installation',
    serviceType: 'Drywall installation',
    title: 'Drywall Installation in Louisville & Surrounding Areas | Louisville Drywall & Painting LLC',
    description:
      'Affordable drywall installation in Louisville, surrounding KY communities, and Southern Indiana. Hung, taped, mudded, and finished. Free estimates. Call (502) 218-0426.',
    image: '/images/work-vaulted.png',
    imageAlt: 'Drywall installation on a vaulted ceiling during a Louisville area home remodel',
    intro:
      'Need new drywall hung in a Louisville home, basement, garage, or addition? Louisville Drywall & Painting LLC installs drywall the right way — hung, taped, mudded, and finished — so your walls are ready for paint. We also serve surrounding towns and rural areas across Kentucky and Southern Indiana.',
    details: [
      'New construction and remodel drywall hanging in Louisville and nearby',
      'Vaulted ceilings, garages, basements, and room additions',
      'Taping, mudding, and smooth finishing',
      'Clear on-site quotes and affordable rates',
    ],
    formValue: 'Drywall Installation',
  },
  {
    slug: 'drywall-finishing',
    path: '/drywall-finishing',
    name: 'Drywall Finishing',
    serviceType: 'Drywall finishing',
    title: 'Drywall Finishing in Louisville & Surrounding Areas | Louisville Drywall & Painting LLC',
    description:
      'Smooth, paint-ready drywall finishing in Louisville and surrounding areas. Taping, mudding, and sanding across KY and Southern IN. Free estimates. Call (502) 218-0426.',
    image: '/images/work-garage.png',
    imageAlt: 'Garage drywall taped and mudded for a smooth paint-ready finish in Louisville area',
    intro:
      'Already have drywall hung but need a professional finish? We tape, mud, and sand walls and ceilings in Louisville and surrounding areas until they are smooth and ready for primer and paint.',
    details: [
      'Joint taping and multi-coat mudding',
      'Smooth and paint-ready wall finishes',
      'Garage, basement, and living area finishing',
      'Affordable rates with a clear quote before work starts',
    ],
    formValue: 'Drywall Finishing',
  },
  {
    slug: 'interior-painting',
    path: '/interior-painting',
    name: 'Interior Painting',
    serviceType: 'Interior painting',
    title: 'Interior Painting in Louisville & Surrounding Areas | Louisville Drywall & Painting LLC',
    description:
      'Affordable interior painting in Louisville and surrounding KY and Southern Indiana. Rooms, basements, and touch-ups after drywall patch jobs. Call (502) 218-0426.',
    image: '/images/basement.jpg',
    imageAlt: 'Interior painting prep on walls in a Louisville area home',
    intro:
      'Fresh paint transforms a room — especially after a patch or repair. We handle interior painting for Louisville homeowners and surrounding communities — rooms, basements, trim, and touch-ups.',
    details: [
      'Room and basement painting in Louisville and nearby',
      'Touch-ups after drywall patches and repairs',
      'Wall and ceiling prep and painting',
      'Clear on-site quotes and affordable rates',
    ],
    formValue: 'Interior Painting',
  },
];

const LOCATIONS = [
  {
    slug: 'louisville-ky',
    path: '/drywall-contractor-louisville-ky',
    city: 'Louisville',
    state: 'Kentucky',
    stateAbbr: 'KY',
    title: 'Drywall Patching & Repair in Louisville, KY | Louisville Drywall & Painting LLC',
    description:
      'Drywall patching and repair in Louisville, KY — holes, cracks, water damage, sheet replacement, finishing, and paint. Free estimates. Call (502) 218-0426.',
    intro:
      'Based in Louisville, we handle drywall patch jobs and repairs across the metro — nail holes, doorknob damage, crack repair, water-damaged sheets, ceiling patches, plus installation, finishing, and paint touch-ups.',
  },
  {
    slug: 'shelbyville-ky',
    path: '/drywall-contractor-shelbyville-ky',
    city: 'Shelbyville',
    state: 'Kentucky',
    stateAbbr: 'KY',
    title: 'Drywall Patching & Repair in Shelbyville, KY | Louisville Drywall & Painting LLC',
    description:
      'Drywall patching, hole repair, crack fixes, and painting in Shelbyville, KY. Free on-site estimates. Call (502) 218-0426.',
    intro:
      'Serving Shelbyville and Shelby County with drywall patching, repair jobs, installation, and painting. From nail holes to full wall replacements, we travel to rural homes and small-town remodels.',
  },
  {
    slug: 'la-grange-ky',
    path: '/drywall-contractor-la-grange-ky',
    city: 'La Grange',
    state: 'Kentucky',
    stateAbbr: 'KY',
    title: 'Drywall Patching & Repair in La Grange, KY | Louisville Drywall & Painting LLC',
    description:
      'Drywall patching and repair for La Grange, KY homes — holes, cracks, water damage, plus finishing and paint. Free estimates. Call (502) 218-0426.',
    intro:
      'La Grange and Oldham County homeowners call us for drywall patch jobs, hole and crack repair, sheet replacement, finishing, and painting — without big-contractor pricing.',
  },
  {
    slug: 'bardstown-ky',
    path: '/drywall-contractor-bardstown-ky',
    city: 'Bardstown',
    state: 'Kentucky',
    stateAbbr: 'KY',
    title: 'Drywall Patching & Repair in Bardstown, KY | Louisville Drywall & Painting LLC',
    description:
      'Affordable drywall patching and repair in Bardstown, KY and Nelson County. Holes, cracks, water damage. Call (502) 218-0426.',
    intro:
      'From Bardstown farmhouses to country home repair jobs, we patch drywall, replace damaged sheets, finish walls, and paint across Nelson County.',
  },
  {
    slug: 'corydon-in',
    path: '/drywall-contractor-corydon-in',
    city: 'Corydon',
    state: 'Indiana',
    stateAbbr: 'IN',
    title: 'Drywall Patching & Repair in Corydon, IN | Louisville Drywall & Painting LLC',
    description:
      'Drywall patching, repair, and painting in Corydon, IN and Harrison County. Rural Southern Indiana service. Call (502) 218-0426.',
    intro:
      'We cross the river to serve Corydon and rural Harrison County with drywall patching, hole repair, crack fixes, and interior painting — free on-site estimates for every job.',
  },
  {
    slug: 'madison-in',
    path: '/drywall-contractor-madison-in',
    city: 'Madison',
    state: 'Indiana',
    stateAbbr: 'IN',
    title: 'Drywall Patching & Repair in Madison, IN | Louisville Drywall & Painting LLC',
    description:
      'Drywall patching and repair in Madison, IN and Jefferson County. Small crew, fair rates, free estimates. Call (502) 218-0426.',
    intro:
      'Madison and Jefferson County homeowners call us for drywall patch jobs, repair, installation, finishing, and room painting at affordable labor rates.',
  },
  {
    slug: 'salem-in',
    path: '/drywall-contractor-salem-in',
    city: 'Salem',
    state: 'Indiana',
    stateAbbr: 'IN',
    title: 'Drywall Patching & Repair in Salem, IN | Louisville Drywall & Painting LLC',
    description:
      'Affordable drywall patching and repair in Salem, IN and Washington County. Holes, cracks, water damage. Call (502) 218-0426.',
    intro:
      'Serving Salem and rural Washington County with drywall patching, repair jobs, finishing, and painting — we come to your home and provide a clear, no-pressure quote.',
  },
];

function getSitemapPaths() {
  return [
    '/',
    '/services',
    '/policies',
    '/brochure',
    ...SERVICES.map((s) => s.path),
    ...LOCATIONS.map((l) => l.path),
  ];
}

module.exports = { BUSINESS, SERVICES, LOCATIONS, getSitemapPaths, getSameAs };
