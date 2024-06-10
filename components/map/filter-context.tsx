import { CategoriesArray, FilterAccessibilityArray } from '@/constants'
import { Accessibility, Category } from '@/types'
import { PropsWithChildren, createContext, useContext, useState } from 'react'

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
  const [categories, setCategories] = useState<Category[]>(CategoriesArray)
  const [accessibilities, setAccessibilities] = useState<Accessibility[]>(
    FilterAccessibilityArray
  )

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
