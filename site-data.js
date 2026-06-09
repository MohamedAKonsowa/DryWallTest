const BUSINESS = {
  name: 'Louisville Drywall & Painting LLC',
  phone: '+1 5025462608',
  phoneDisplay: '(502) 546-2608',
  email: 'quotes@louisvilledrywallpaints.org',
  facebook: 'https://www.facebook.com/profile.php?id=61590733854853',
  siteUrl: process.env.SITE_URL || 'https://louisvilledrywallpaints.com',
};

const SERVICES = [
  {
    slug: 'drywall-installation',
    path: '/drywall-installation',
    name: 'Drywall Installation',
    serviceType: 'Drywall installation',
    title: 'Drywall Installation in Louisville & Surrounding Areas | Louisville Drywall & Painting LLC',
    description:
      'Affordable drywall installation in Louisville, surrounding KY communities, and Southern Indiana. Hung, taped, mudded, and finished. Free estimates. Call (502) 546-2608.',
    image: '/images/work-vaulted.png',
    imageAlt: 'Drywall installation on a vaulted ceiling during a Louisville area home remodel',
    intro:
      'Need new drywall hung in a Louisville home, basement, garage, or addition? Louisville Drywall & Painting LLC installs drywall the right way — hung, taped, mudded, and finished — so your walls are ready for paint. We also serve surrounding towns and rural areas across Kentucky and Southern Indiana.',
    details: [
      'New construction and remodel drywall hanging in Louisville and nearby',
      'Vaulted ceilings, garages, basements, and room additions',
      'Taping, mudding, and smooth finishing',
      'You purchase materials — we provide skilled labor at affordable rates',
    ],
    formValue: 'Drywall Installation',
  },
  {
    slug: 'drywall-repair',
    path: '/drywall-repair',
    name: 'Drywall Repair',
    serviceType: 'Drywall repair',
    title: 'Drywall Repair in Louisville & Surrounding Areas | Louisville Drywall & Painting LLC',
    description:
      'Drywall repair in Louisville and surrounding KY and Southern Indiana. Hole patching, cracks, and water damage fixes. Free estimates. Call (502) 546-2608.',
    image: '/images/work-beam.png',
    imageAlt: 'Drywall repair and finishing around a wood beam in a Louisville area home',
    intro:
      'Holes, cracks, water damage, or bad patches? We repair drywall in Louisville, surrounding communities, and rural homes across Kentucky and Southern Indiana — from a single wall to whole-room fixes.',
    details: [
      'Hole and crack patching for Louisville-area homes',
      'Water damage and stain repair',
      'Texture blending and seamless patches',
      'Ceiling and wall repairs in homes, farmhouses, and country properties',
    ],
    formValue: 'Drywall Repair',
  },
  {
    slug: 'drywall-finishing',
    path: '/drywall-finishing',
    name: 'Drywall Finishing',
    serviceType: 'Drywall finishing',
    title: 'Drywall Finishing in Louisville & Surrounding Areas | Louisville Drywall & Painting LLC',
    description:
      'Smooth, paint-ready drywall finishing in Louisville and surrounding areas. Taping, mudding, and sanding across KY and Southern IN. Free estimates. Call (502) 546-2608.',
    image: '/images/work-garage.png',
    imageAlt: 'Garage drywall taped and mudded for a smooth paint-ready finish in Louisville area',
    intro:
      'Already have drywall hung but need a professional finish? We tape, mud, and sand walls and ceilings in Louisville and surrounding areas until they are smooth and ready for primer and paint.',
    details: [
      'Joint taping and multi-coat mudding',
      'Smooth and paint-ready wall finishes',
      'Garage, basement, and living area finishing',
      'Affordable labor — you buy your own mud, tape, and supplies',
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
      'Affordable interior painting in Louisville and surrounding KY and Southern Indiana. Rooms, basements, and touch-ups. You buy paint — we handle labor. Call (502) 546-2608.',
    image: '/images/basement.jpg',
    imageAlt: 'Interior painting prep on walls in a Louisville area home',
    intro:
      'Fresh paint transforms a room. We handle interior painting labor for Louisville homeowners and surrounding communities — rooms, basements, trim, and touch-ups — while you choose and buy the paint.',
    details: [
      'Room and basement painting in Louisville and nearby',
      'Wall and ceiling prep and painting',
      'Trim and touch-up work',
      'You purchase paint and supplies — affordable labor-only pricing',
    ],
    formValue: 'Interior Painting',
  },
];

const LOCATIONS = [
  {
    slug: 'shelbyville-ky',
    path: '/drywall-contractor-shelbyville-ky',
    city: 'Shelbyville',
    state: 'Kentucky',
    stateAbbr: 'KY',
    title: 'Drywall & Painting Contractor in Shelbyville, KY | Louisville Drywall & Painting LLC',
    description:
      'Drywall installation, repair, finishing, and interior painting in Shelbyville, KY and surrounding rural areas. Free estimates. Call (502) 546-2608.',
    intro:
      'Serving Shelbyville and the surrounding countryside with affordable drywall and painting work. We travel to rural homes and small-town remodels throughout Shelby County.',
  },
  {
    slug: 'la-grange-ky',
    path: '/drywall-contractor-la-grange-ky',
    city: 'La Grange',
    state: 'Kentucky',
    stateAbbr: 'KY',
    title: 'Drywall & Painting Contractor in La Grange, KY | Louisville Drywall & Painting LLC',
    description:
      'Drywall and interior painting for La Grange, KY area homes and farmhouses. Affordable rates, free on-site estimates. Call (502) 546-2608.',
    intro:
      'La Grange and Oldham County homeowners trust our small crew for drywall installs, repairs, finishing, and painting — without big-contractor pricing.',
  },
  {
    slug: 'bardstown-ky',
    path: '/drywall-contractor-bardstown-ky',
    city: 'Bardstown',
    state: 'Kentucky',
    stateAbbr: 'KY',
    title: 'Drywall & Painting Contractor in Bardstown, KY | Louisville Drywall & Painting LLC',
    description:
      'Affordable drywall contractor serving Bardstown, KY and rural Nelson County. Installation, repair, finishing, and painting. Call (502) 546-2608.',
    intro:
      'From Bardstown farmhouses to country home remodels, we provide drywall and painting labor across Nelson County and nearby rural communities.',
  },
  {
    slug: 'corydon-in',
    path: '/drywall-contractor-corydon-in',
    city: 'Corydon',
    state: 'Indiana',
    stateAbbr: 'IN',
    title: 'Drywall & Painting Contractor in Corydon, IN | Louisville Drywall & Painting LLC',
    description:
      'Drywall installation, repair, and painting in Corydon, IN and Harrison County. Rural Southern Indiana service. Free estimates. Call (502) 546-2608.',
    intro:
      'We cross the river to serve Corydon and rural Harrison County with affordable drywall and interior painting — free on-site estimates for every job.',
  },
  {
    slug: 'madison-in',
    path: '/drywall-contractor-madison-in',
    city: 'Madison',
    state: 'Indiana',
    stateAbbr: 'IN',
    title: 'Drywall & Painting Contractor in Madison, IN | Louisville Drywall & Painting LLC',
    description:
      'Drywall and painting services in Madison, IN and Jefferson County. Small crew, fair rates, free estimates. Call (502) 546-2608.',
    intro:
      'Madison and Jefferson County homeowners call us for drywall installation, repair, finishing, and room painting at affordable labor rates.',
  },
  {
    slug: 'salem-in',
    path: '/drywall-contractor-salem-in',
    city: 'Salem',
    state: 'Indiana',
    stateAbbr: 'IN',
    title: 'Drywall & Painting Contractor in Salem, IN | Louisville Drywall & Painting LLC',
    description:
      'Affordable drywall contractor in Salem, IN and Washington County. Installation, repair, finishing, and painting. Call (502) 546-2608.',
    intro:
      'Serving Salem and rural Washington County with hands-on drywall and painting work — we come to your home and provide a clear, no-pressure quote.',
  },
];

function getSitemapPaths() {
  return [
    '/',
    '/services',
    ...SERVICES.map((s) => s.path),
    ...LOCATIONS.map((l) => l.path),
  ];
}

module.exports = { BUSINESS, SERVICES, LOCATIONS, getSitemapPaths };
