import React from 'react';

const Footer = () => {
  const link = 'https://zeruhabesha.github.io/my_personal_portofilo/';
  const target = '_blank';

  return (
    <div className="container mx-auto text-center py-4">
      <p className="text-sm text-gray-500">
        &copy; <span>{new Date().getFullYear()}</span> Zerihun Kibret -{' '}
        <a
          href={link}
          target={target}
          className="text-gray-600 hover:text-gray-800"
          rel="noopener noreferrer"
        >
          zeruhabesha
        </a>
      </p>
    </div>
  );
};

export default Footer;