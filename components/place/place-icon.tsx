import { Category } from '@/types'
import {
  MdAccountBalance,
  MdCoffee,
  MdDirectionsBus,
  MdFavorite,
  MdHotel,
  MdRestaurant,
  MdShoppingBag,
  MdShoppingCart,
} from 'react-icons/md'

const iconsMap = {
  [Category.Groceries]: <MdShoppingCart size={24} />,
  [Category.Shopping]: <MdShoppingBag size={24} />,
  [Category.Food]: <MdRestaurant size={24} />,
  [Category.Drinks]: <MdCoffee size={24} />,
  [Category.Sites]: <MdAccountBalance size={24} />,
  [Category.Health]: <MdFavorite size={24} />,
  [Category.Hotels]: <MdHotel size={24} />,
  [Category.Transport]: <MdDirectionsBus size={24} />,
}

type PlaceIconProps = {
  category: Category
}

export const PlaceIcon = ({ category }: PlaceIconProps) => {
  return iconsMap[category]
}
