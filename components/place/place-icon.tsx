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

import { Category } from '@/types'

const iconsMap = {
  [Category.groceries]: <MdShoppingCart size={24} />,
  [Category.shopping]: <MdShoppingBag size={24} />,
  [Category.food]: <MdRestaurant size={24} />,
  [Category.drinks]: <MdCoffee size={24} />,
  [Category.sites]: <MdAccountBalance size={24} />,
  [Category.health]: <MdFavorite size={24} />,
  [Category.hotels]: <MdHotel size={24} />,
  [Category.transport]: <MdDirectionsBus size={24} />,
}

type PlaceIconProps = {
  category: Category
}

export const PlaceIcon = ({ category }: PlaceIconProps) => {
  return iconsMap[category]
}
