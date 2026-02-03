'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Load react-select only on the client to avoid hydration issues
const Select = dynamic(() => import('react-select'), { ssr: false });

const SearchableSelectField = ({ label, required, options, value, onChange,disabled=false }) => (
  <div className="mb-4">
    <label className="form-input-label">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
   <Select
  options={options}
  value={options.find((o) => o.value === value) || null}
  onChange={(selected) => onChange(selected?.value || '')}
  isClearable
  placeholder={`Select ${label}`}
  classNamePrefix="react-select"
  isDisabled={disabled}
  styles={{
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? '#14B8A6' : base.borderColor,
      boxShadow: (state.isFocused || state.isHovered) ? '0 0 0 2px #14B8A6' : base.boxShadow,
      '&:hover': {
        boxShadow: '0 0 0 2px #14B8A6',
        borderColor: '#14B8A6',
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: '#6B7280', // Tailwind gray-500
    }),
  }}
/>


  </div>
);

export default SearchableSelectField;

