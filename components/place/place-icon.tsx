import { PlaceType } from '@/types'
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
  [PlaceType.groceries]: <MdShoppingCart size={24} />,
  [PlaceType.shopping]: <MdShoppingBag size={24} />,
  [PlaceType.food]: <MdRestaurant size={24} />,
  [PlaceType.drinks]: <MdCoffee size={24} />,
  [PlaceType.services]: <MdAccountBalance size={24} />,
  [PlaceType.health]: <MdFavorite size={24} />,
  [PlaceType.hotels]: <MdHotel size={24} />,
  [PlaceType.transport]: <MdDirectionsBus size={24} />,
}

type PlaceIconProps = {
  placeType: PlaceType
}

export const PlaceIcon = ({ placeType }: PlaceIconProps) => {
  return iconsMap[placeType]
}
