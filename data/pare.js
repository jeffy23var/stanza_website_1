/* PARÉ catalogue data.
   Source: PARÉ LUXE, INNOV2+, DURA+, LVT and TOUGH brochures.
   Shade hex colours are close approximations for the swatches; use real swatch photos when you have them.
   Warranty left empty ("") means the brochure does not state it: confirm with PARÉ before filling in. */
window.PARE = {
  series: [
    {
      id: "luxe", name: "LUXE", kind: "Luxury interior panels",
      line: "Panels scanned from real wood, in an ultra dead-matt finish.",
      warranty: "10-year warranty",
      images: ["img/pare/luxe-1.webp", "img/pare/luxe-2.webp", "img/pare/luxe-3.webp"],
      text: "An ultra-premium collection of architectural panels. Each one is scanned from real wood, so the grain is authentic, and finished in a muted, velvety dead-matt surface. Made for luxury homes and five-star hotels.",
      products: [
        { name: "Panelo", detail: "Seamless ceiling panels. Code 124, 340 × 3060 mm." },
        { name: "Flut", detail: "Sleek linear profiles for walls and ceilings. Code 125, 325 × 3060 mm." },
        { name: "Verto", detail: "Contemporary slatted design with depth. Code 126, 345 × 3060 mm." }
      ],
      shades: [
        { name: "Amber Oak", hex: "#B7854F" }, { name: "Ivory Oak", hex: "#D9C7A8" }, { name: "Slate Wood", hex: "#6E6A64" },
        { name: "Classic Walnut", hex: "#6B4A33" }, { name: "Nutmeg Maple", hex: "#9C6F48" }, { name: "Vintage Teak", hex: "#8A5A36" }
      ],
      features: ["Waterproof", "Maintenance free", "Dead-matt look", "Anti-bacterial", "Impact resistant", "Easy installation", "Lightweight", "Fire retardant", "Termite proof"],
      specs: [["Thickness", "1.2 mm"], ["Length", "3060 mm"], ["Standard", "ASTM D-4477"], ["Trims", "J, T, inside and outside corner"]]
    },
    {
      id: "innov", name: "INNOV2+", kind: "Ceiling and wall systems",
      line: "Five interlocking profiles in up to 25 shades.",
      warranty: "10-year warranty",
      images: ["img/pare/innov-1.webp", "img/pare/innov-2.webp", "img/pare/innov-3.webp", "img/pare/innov-4.webp"],
      text: "Heat-transfer printed panels with a unique interlocking system. Dome, Prism, Stripes and Unic can be interlocked with one another to create your own pattern.",
      products: [
        { name: "Dome", detail: "Rounded profile, interior and exterior use. Also as Dome DB dual tone." },
        { name: "Prism", detail: "Faceted profile. Also as Prism DB dual tone." },
        { name: "Stripes", detail: "Fine linear slats. Also as Stripes DB dual tone." },
        { name: "Unic", detail: "Bold single-rib profile. Also as Unic DB dual tone." },
        { name: "Wave", detail: "Soft wave profile, 25+ shades including pastels." }
      ],
      shades: [
        { name: "Spiced Walnut", hex: "#5E3F2B" }, { name: "Oak Wood Ocre", hex: "#A4743F" }, { name: "Honey Maple", hex: "#C59A5C" },
        { name: "Danish Teak", hex: "#8B5A35" }, { name: "Oak Noir", hex: "#3B312B" }, { name: "Noce Grande", hex: "#7A5A42" },
        { name: "Linen Grey", hex: "#A9A49B" }, { name: "Mint Green", hex: "#A9BFA5" }, { name: "Steel Blue", hex: "#6F8797" }
      ],
      features: ["Lightweight", "Fire retardant", "Custom sizing", "Easy to install", "Waterproof", "Anti-bacterial", "No VOC", "Unique interlocking", "Impact resistant", "Termite free", "Lead free", "Recyclable", "Maintenance free", "Real wood look", "No ply required"],
      specs: [["Reaction to fire", "D-s3,d0 (EN 13501-1)"], ["Standard", "ASTM D-4477"], ["Trims", "L, Flat, U and Reverse trims"]]
    },
    {
      id: "dura", name: "DURA+", kind: "Exterior facade systems",
      line: "Next-generation facade cladding, in Norma and Stretta profiles.",
      warranty: "",
      images: ["img/pare/dura-1.webp", "img/pare/dura-2.webp", "img/pare/dura-3.webp", "img/pare/dura-4.webp"],
      text: "A three-layer exterior cladding with a dead-matt wood look that stands up to sun and rain, for facades, soffits and outdoor walls.",
      products: [
        { name: "DURA+ Norma", detail: "Wide 3660 mm facade panel." },
        { name: "DURA+ Stretta", detail: "Narrow 3660 mm facade panel for a finer line." }
      ],
      shades: [
        { name: "Artisan Oak", hex: "#9A6B43" }, { name: "Dark Teak", hex: "#5A4232" }, { name: "Larch", hex: "#B07F4B" }, { name: "Imperial Nut", hex: "#7B5232" }
      ],
      features: ["Innovative three-layer technology", "Waterproof", "Easy and fast installation", "Easy to maintain", "Corrosion resistance", "Dead-matt wood look", "Mix and match", "Recyclable", "Long life", "Custom sizing"],
      specs: [["Length", "3660 mm"], ["Trims", "Inside and outside corner, starter, finishing"]]
    },
    {
      id: "lvt", name: "LVT Flooring", kind: "Luxury vinyl tile",
      line: "The warmth of wood, 100% waterproof, in ten shades.",
      warranty: "5 years residential, 2 years commercial",
      images: ["img/pare/lvt-1.webp", "img/pare/lvt-2.webp", "img/pare/lvt-3.webp", "img/pare/lvt-4.webp"],
      text: "A glue-down luxury vinyl plank with a UV coating, clear wear layer and high-resolution wood decor. For homes, hotels, clinics, offices and stores.",
      products: [
        { name: "LVT plank", detail: "914.4 × 152.4 mm, 2 mm thick, 0.2 mm wear layer." }
      ],
      shades: [
        { name: "Blonde Maple", hex: "#CDB08A" }, { name: "Golden Pecan Teak", hex: "#B9844F" }, { name: "Arctic Pine", hex: "#D8C9B1" },
        { name: "Natural Greywood", hex: "#9E958A" }, { name: "Driftwood Beige", hex: "#C2AE94" }, { name: "Amber Teak", hex: "#9E6537" },
        { name: "Toffee Walnut", hex: "#7C5233" }, { name: "Elegant Oak", hex: "#B08155" }, { name: "Prime Oak", hex: "#A87A4D" }, { name: "Chocolate Oak", hex: "#5C3D2A" }
      ],
      features: ["Fire retardant", "Waterproof", "Scratch resistant", "Stain resistant", "Easy to install and maintain", "Realistic wood texture", "Termite and pest proof", "Lead-free and eco-friendly"],
      specs: [["Installation", "Adhesive glue-down"], ["Plank", "914.4 × 152.4 mm"], ["Thickness", "2 mm"], ["Wear layer", "0.2 mm"], ["Finish", "Textured wood, matte"]],
      install: ["Prepare the subfloor: clean, dry and level; fill cracks and low spots.", "Spread the recommended adhesive evenly with a notched trowel and let it set slightly.", "Lay tiles tightly from one corner, then roll them down firmly."]
    },
    {
      id: "tough", name: "TOUGH", kind: "HDF laminate flooring",
      line: "AC4-rated click flooring. No glue required.",
      warranty: "",
      images: ["img/pare/tough-2.webp", "img/pare/tough-3.webp", "img/pare/tough-1.webp"],
      text: "An HDF laminate with a click interlocking system, rated for heavy domestic use and light commercial spaces.",
      products: [
        { name: "TOUGH plank", detail: "1190 × 220 mm, 8 mm thick, matt finish." }
      ],
      shades: [],
      features: ["AC4 abrasion class", "Click interlocking, no glue", "Stain resistance group 5", "Light fastness class 7", "Flame resistance CFL-S1"],
      specs: [["Plank", "1190 × 220 mm"], ["Thickness", "8 mm"], ["Abrasion", "AC4 (EN 13329)"], ["Impact", "IC1"], ["Thickness swelling", "≤ 18%"], ["Finish", "Matt"]]
    }
  ]
};
