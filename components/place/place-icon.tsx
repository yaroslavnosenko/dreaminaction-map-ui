import {
  MdAccountBalance,
  MdDirectionsBus,
  MdFavorite,
  MdFestival,
  MdHotel,
  MdRestaurant,
  MdShoppingBag,
  MdShoppingCart,
  MdSportsBasketball,
  MdVilla,
} from 'react-icons/md'

import { Category } from '@/types'

const iconsMap = {
  [Category.groceries]: <MdShoppingCart size={24} />,
  [Category.shopping]: <MdShoppingBag size={24} />,
  [Category.food]: <MdRestaurant size={24} />,
  [Category.sport]: <MdSportsBasketball size={24} />,
  [Category.sites]: <MdVilla size={24} />,
  [Category.health]: <MdFavorite size={24} />,
  [Category.hotels]: <MdHotel size={24} />,
  [Category.transport]: <MdDirectionsBus size={24} />,
  [Category.culture]: <MdFestival size={24} />,
  [Category.government]: <MdAccountBalance size={24} />,
}

type PlaceIconProps = {
  category: Category
}

export const PlaceIcon = ({ category }: PlaceIconProps) => {
  return iconsMap[category]
}
