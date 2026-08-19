"use client";
import React from 'react';
import { getOptimizedUrl } from '../utils/getOptimizedUrl';
import { useCMS } from '../context/CMSContext';
import './CustomSections.css';

const CustomSections = () => {
  const { customSections } = useCMS();

  if (!customSections || customSections.length === 0) return null;

  return (
    <>
      {customSections.map((section, index) => (
        <section 
          key={section.id || index} 
          id={section.id || `custom-section-${index}`}
          className={`custom-section`}
          style={{ backgroundColor: index % 2 === 0 ? 'var(--bg-main)' : 'var(--bg-section)' }}
        >
          <div className="container">
            <div className="section-header">
              {section.label && <span className="section-label">{section.label}</span>}
              {section.title && <h2 className="section-title">{section.title}</h2>}
              {section.subtitle && <p className="section-subtitle">{section.subtitle}</p>}
            </div>

            <div className={`custom-content-grid ${section.image ? 'has-image' : 'no-image'} ${section.imagePosition === 'left' ? 'image-left' : 'image-right'}`}>
              <div className="custom-text-content">
                {section.text && (
                  <div 
                    className="custom-text" 
                    dangerouslySetInnerHTML={{ __html: section.text.replace(/\n/g, '<br/>') }} 
                  />
                )}
                {section.ctaText && (
                  <a href={section.ctaLink || '#'} className="custom-cta">{section.ctaText}</a>
                )}
              </div>
              
              {section.image && (
                <div className="custom-image-content">
                  <img src={getOptimizedUrl(section.image)} alt={section.title || 'Custom Section Image'} className="custom-img" />
                </div>
              )}
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default CustomSections;

