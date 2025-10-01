import React from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 200px;
  padding: 15px;
  border: 1px solid #eee;
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CategoryItem = styled.li`
  margin-bottom: 8px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

function CategorySidebar({ categories, onCategoryClick }) {
  return (
    <SidebarContainer>
      <h3>Categories</h3>
      <CategoryList>
        {categories.map((category) => (
          <CategoryItem key={category.id} onClick={() => onCategoryClick(category)}>  {/* Moved onClick here! */}
            {category.name}
          </CategoryItem>
        ))}
      </CategoryList>
    </SidebarContainer>
  );
}

export default CategorySidebar;