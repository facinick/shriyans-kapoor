'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/Select/Select';
import { CATEGORY_ALL } from '@/lib/constants';
import { useRouter } from '@/lib/hooks/useRouter';
import { useEffect, useState } from 'react';
import { DEFAULT_LINK_SETTINGS } from '../ui/Link/Link';

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
    <Select
      name={'Category selector'}
      value={selectedCategory}
      onValueChange={handleCategoryChange} // Trigger URL update when a new category is selected
    >
      <SelectTrigger title="Select Category" aria-label="Select Category" name={'Select Category'} className="w-[180px]">
        <SelectValue placeholder="Category" />
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
  );
}
