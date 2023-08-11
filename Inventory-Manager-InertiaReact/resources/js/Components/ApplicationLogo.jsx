import React from 'react';
import logoImage from '../../images/misurga-background.png';


export default function ApplicationLogo(props) {
    return (
        
        <img  src={logoImage} alt="Logo" style={{ width: '90px', height: 'auto' }}{...props} />
    );
}
