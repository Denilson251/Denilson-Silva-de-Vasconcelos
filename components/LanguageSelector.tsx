
import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  languages: Language[];
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, selectedLanguage, onLanguageChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="language-select" className="text-sm font-medium text-gray-400">Translate to:</label>
      <select
        id="language-select"
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.name}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};
