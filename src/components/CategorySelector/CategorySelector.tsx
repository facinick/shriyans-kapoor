'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/Select/Select';
import { CATEGORY_ALL } from '@/lib/constants';
import { useRouter } from '@/lib/hooks/useRouter';
import { Label } from '@radix-ui/react-label';
import { useEffect, useState } from 'react';
import { DEFAULT_LINK_SETTINGS } from '../ui/Link/Link';
import VisuallyHidden from '../VisuallyHidden';

interface CategorySelectorProps {
  categories: Array<string>;
  currentCategory: string;
  currentPage: number;
}

export default function CategorySelector({ categories, currentCategory, currentPage }: CategorySelectorProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);

  useEffect(() => {
    // Update state if the URL category changes
    setSelectedCategory(currentCategory);
  }, [currentCategory]);

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);

    // Update the URL with the new category without losing the page query param
    router?.push(`/${newCategory}?page=${currentPage || '1'}`, DEFAULT_LINK_SETTINGS)
  };

  return (
    <>
      <VisuallyHidden>
        <Label htmlFor="category-select">Select Category</Label>
      </VisuallyHidden>
      <Select
        name={'Category selector'}
        value={selectedCategory}
        onValueChange={handleCategoryChange}
      >
        <SelectTrigger
          id='category-select'
          title="Select Category"
          aria-label="Select Category"
          name={'Select Category'}
          className="w-[150px]"
        >
          <SelectValue placeholder="Category">{selectedCategory}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            <SelectItem key={CATEGORY_ALL} value={CATEGORY_ALL}>
              {CATEGORY_ALL}
            </SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
