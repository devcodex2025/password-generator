import React from 'react';
import Radio from '@mui/material/Radio';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { getLanguagesWithFlags } from '../utils/languageUtils';

function LanguageSelector({ language, setLanguage }) {
  const languages = getLanguagesWithFlags();

  return (
    <ListItem>
      <ListItemText primary="Select Language" />
      {languages.map((lang) => (
        <div key={lang.value} style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
          <Radio
            value={lang.value}
            checked={language === lang.value}
            onChange={(e) => setLanguage(e.target.value)}
            size="large"
            color="#2A4E63"
            style={{color:'#2A4E63'}}
          />
          <label htmlFor={lang.value} className="mx-2 font-bold text-lg">
            {lang.label}
          </label>
        </div>
      ))}
    </ListItem>
  );
}

export default LanguageSelector;
