import React, { useState, useEffect, useRef} from 'react';

function Select2({def, label, value, setValue, options = []}) {
  const [expanded, setExpanded] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded(!expanded);
    setValue(e.target.getAttribute('for'));
  };

  const handleDocumentClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return <div className={'custom-select ' + (expanded ? "custom-select-focus" : "")}>
    <label className="text-within label">{label}</label>
    <div ref={dropdownRef} className={`dropdown-el ${expanded ? 'expanded' : ''}`} onClick={handleDropdownClick}>
      <div style={{minHeight:"3em"}}>
        <span style={{margin:".5em 10px"}}>{value || "Select an Option"}</span>
      </div>
      {options.map((option) => <>
        <input
            type="radio"
            name="sortType"
            value={option.value}
            checked={value === option}
            onClick={()=>setValue(option)}
            id={option}
        />
        <label htmlFor={option} className="select-label"> {option} </label>
      </>)}
    </div>
  </div>;
}

export default Select2;
