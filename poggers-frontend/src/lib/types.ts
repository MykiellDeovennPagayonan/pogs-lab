const colorVariants = {
  blue: 'bg-blue-500',
  red: 'bg-red-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  white: 'bg-white',
  orange: 'bg-orange-500',
  pink: 'bg-pink-500',
  gray: 'bg-gray-500',
  violet: 'bg-violet-500'
 };
 
 export interface Pogs {
  id?: number;
  name: string;
  ticker_symbol: string;
  color: keyof typeof colorVariants;
  price: number;
 }