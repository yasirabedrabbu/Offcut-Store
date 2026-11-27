import { PRODUCTS } from './data';

const DESC = [
  'Heavyweight cotton tee with a winged skull print on the chest.',
  'Boxy heavyweight blank in washed black. The base layer of everything.',
  'Boxy heavyweight blank in off white. Same cut, same weight.',
  'Longsleeve with the Offcut mark. Ribbed cuffs, relaxed fit.',
  'Tee with a rose and chain graphic. Soft hand, slightly cropped.',
  'Wool blend varsity jacket with snap closure and ribbed trims.',
  'Longsleeve with the No Restocks slogan. When it is gone, it is gone.',
  'Heavy fleece hoodie with the arch logo. Oversized fit.',
  'Tee with a barbed heart graphic. Garment dyed, boxy fit.',
  'Heavy fleece zip hoodie in black. Full length YKK zip.',
];

export const ITEMS = PRODUCTS.map(([name, price], k) => ({
  k,
  name,
  price,
  amount: Number(price.replace('€', '')),
  desc: DESC[k],
  sizes: k === 5 ? ['S', 'M', 'L', 'XL'] : ['S', 'M', 'L', 'XL', 'XXL'],
  slug: name
    .toLowerCase()
    .replace(/ — /g, '-')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, ''),
}));

export const bySlug = (slug) => ITEMS.find((i) => i.slug === slug);