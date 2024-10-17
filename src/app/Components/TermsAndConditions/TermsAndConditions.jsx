import React from 'react';
import BackButton from '../Button/BackButton'
import './style.css';
import Image from 'next/image';
import logoIcon from '../../images/snow.png';

const TermsAndConditions = () => {
    return (
        <div>
            <BackButton title={'Privacy Policy'} ></BackButton>
            <div className="tac-privacy-policy-container container">
                <div className="tac-privacy-policy-content">
                    <a className="navbar-brand d-flex align-items-center mb-2" href="#">
                        <Image src={logoIcon} alt="WishFolio Logo" width={40} height={40} />
                        <span className="brand-text">Wish<span className="highlight-text">Folio</span></span>
                    </a>

                    <p className="tac-text">
                        Lorem ipsum dolor sit amet consectetur. Ullamcorper felis sit pellentesque quam donec.
                        Diam et pretium commodo phasellus lacus ut sagittis. Enim vitae et nulla aliquet arcu
                        viverra pretium nunc. Ut magna gravida aliquet faucibus at. Bibendum sed augue tincidunt
                        suspendisse felis et. Sem turpis ut magna eget mattis enim proin.
                    </p>

                    <p className="tac-text">
                        In habitasse mi massa tempus. Elit tempus volutpat auctor convallis varius massa lacus.
                        Diam viverra fringilla nec amet. Tempor nulla pellentesque morbi nulla et. In nulla sed
                        maecenas sed a egestas vitae enim. Praesent arcu platea quisque amet quis nisi eu.
                    </p>

                    <p className="tac-text">
                        Odio aliquet blandit amet nulla in nibh neque sed. Eget euismod viverra iaculis lectus diam.
                        Malesuada gravida amet aliquet tempus mi nunc pellentesque pharetra vulputate.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default TermsAndConditions;
