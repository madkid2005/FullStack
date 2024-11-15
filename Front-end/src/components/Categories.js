import React, { useState, useEffect } from 'react';
import './Categories.css'; // Importing external CSS for better style management

function Categories() {
    const [categories, setCategories] = useState([]);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [hoveredMother, setHoveredMother] = useState(false);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products/categories/') // Use your actual API URL
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);


    const handleMouseEnter = () => {
        setHoveredMother(true);
    }

    const handleMouseLeave = () => {
        setHoveredMother(false);
    }

    return (
        <div className="category-list-container  ">
            <span onMouseEnter={handleMouseEnter} className="ms-3 mt-0 mb-0 d-flex align-items-center fw-bold">
                <i className="bi bi-list fw-bold me-2 mt-1" style={{ fontSize: '1.4rem' }}></i>
                <span className='fw-bold' style={{ fontSize: '0.9rem' }}>دسته بندی کالاها</span>
            </span>


            {hoveredMother && (

                <ul onMouseLeave={handleMouseLeave} className="category-list z-3  position-absolute ">
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <li
                                key={category.id}
                                className="category-item "
                                onMouseEnter={() => setHoveredCategory(category.id)}
                                onMouseLeave={() => setHoveredCategory(null)}
                            >
                                <div className="category-name">
                                    <span className='text-start'>
                                        {category.name}
                                    </span>
                                    {category.icon && <img src={category.icon} alt={category.name} className="category-icon" />}
                                </div>

                                {/* Display children when the category is hovered */}
                                {hoveredCategory === category.id && category.children.length > 0 && (
                                    <ul className="child-category-list">
                                        {category.children.map(child => (
                                            <li key={child.id} className="child-category-item">{child.name}</li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))
                    ) : (
                        <p>در حال بارگذاری...</p>
                    )}
                </ul>
            )}

        </div>
    );
}

export default Categories;
