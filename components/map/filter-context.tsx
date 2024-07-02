import { PropsWithChildren, createContext, useContext } from 'react'

import {
  CategoriesArray,
  FilterAccessibilityArray,
  StorageKeys,
} from '@/constants'

import { Accessibility, Category } from '@/types'
import useLocalStorageState from 'use-local-storage-state'

type FilterContextType = {
  categories: Category[]
  accessibilities: Accessibility[]
  toggleCategory: (category: Category) => void
  toggleAccessibility: (accessibility: Accessibility) => void
}

export const FilterContext = createContext<FilterContextType>({
  categories: [],
  accessibilities: [],
  toggleCategory: () => {},
  toggleAccessibility: () => {},
})

export const FilterProvider = ({ children }: PropsWithChildren) => {
  const [categories, setCategories] = useLocalStorageState<Category[]>(
    StorageKeys.FilterCategories,
    { defaultValue: CategoriesArray }
  )
  const [accessibilities, setAccessibilities] = useLocalStorageState<
    Accessibility[]
  >(StorageKeys.FilterAccessibilities, {
    defaultValue: FilterAccessibilityArray,
  })

  const toggleCategory = (category: Category) =>
    setCategories(
      categories.includes(category)
        ? [...categories.filter((cat) => cat !== category)]
        : [...categories, category]
    )

  const toggleAccessibility = (accessibility: Accessibility) =>
    setAccessibilities(
      accessibilities.includes(accessibility)
        ? [...accessibilities.filter((acc) => acc !== accessibility)]
        : [...accessibilities, accessibility]
    )

  return (
    <FilterContext.Provider
      value={{
        categories,
        accessibilities,
        toggleAccessibility,
        toggleCategory,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFiter = () => useContext(FilterContext)
