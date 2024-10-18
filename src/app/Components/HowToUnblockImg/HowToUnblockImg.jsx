import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './style.css'; // Import custom styles
import Image from 'next/image';
import  roundarrow from '../../images/roundarrow.png';
import roundarr3 from '../../images/roundarr3.png';
import roundarr4 from '../../images/roundarr4.png';
import roundarr2 from '../../images/roundarrow2.png';


// import starIcon from '../../images/emoji1.png'; 
// import sunIcon from '../../images/emoji2.png';
// import treeIcon from '../../images/emoji3.png';
// import waveIcon from '../../images/emoji4.png';
// import arrowIcon from '../../images/arrow.png';
import './style.css'

const HowToUnblockImg = () => {
    return (
        // <div className="h-level-container text-center">
        //   <div className="h-level-grid">
        //     {/* Sun Level */}
        //     <div className="h-level-item">
        //       <div className="h-level-circle">
        //         <Image src={''} alt="Sun" className="h-level-icon" />
        //         <p>Sun</p>
        //         <div className="h-level-lock-icon">🔒</div>
        //       </div>
        //     </div>
    
        //     {/* Arrow Right */}
        //     <div className="h-level-arrow-right">
        //       <Image src={''} alt="Arrow Right" />
        //     </div>
    
        //     {/* Star Level */}
        //     <div className="h-level-item h-level-active">
        //       <div className="h-level-circle">
        //         <Image src={''} alt="Star" className="h-level-icon" />
        //         <p>Star</p>
        //       </div>
        //     </div>
    
        //     {/* Arrow Left */}
        //     <div className="h-level-arrow-left">
        //       <Image src={''} alt="Arrow Left" />
        //     </div>
    
        //     {/* Tree Level */}
        //     <div className="h-level-item">
        //       <div className="h-level-circle">
        //         <Image src={''} alt="Tree" className="h-level-icon" />
        //         <p>Tree</p>
        //         <div className="h-level-lock-icon">🔒</div>
        //       </div>
        //     </div>
    
        //     {/* Arrow Bottom */}
        //     <div className="h-level-arrow-bottom">
        //       <Image src={''} alt="Arrow Bottom" />
        //     </div>
    
        //     {/* Wave Level */}
        //     <div className="h-level-item">
        //       <div className="h-level-circle">
        //         <Image src={''} alt="Wave" className="h-level-icon" />
        //         <p>Wave</p>
        //         <div className="h-level-lock-icon">🔒</div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        <>
          <div className='htubi-con'>
            <div className="row">
              <div className="col-3">
                <Image src={roundarrow}  className='htubi-round-arrow'></Image>
              </div>
              <div className="col-6">
                <Image src={''}  className=''></Image>
              </div>
              <div className="col-3">
                <Image src={roundarr2}  className='htubi-round-arrow'></Image>
              </div>
              
              
              

            </div>
            <div className="row">
            <div className="col-3">
                <Image src={''}  className=''></Image>
              </div>
              <div className="col-6">
                <Image src={''}  className=''></Image>
              </div>
              <div className="col-3">
                <Image src={''}  className=''></Image>
              </div>
              
              
              
            
            </div>
            <div className="row">
            <div className="col-3">
                <Image src={roundarr4}  className='htubi-round-arrow'></Image>
              </div>
              
              <div className="col-6">
                <Image src={''}  className=''></Image>
              </div>
              
              <div className="col-3">
                <Image src={roundarr3}  className='htubi-round-arrow'></Image>
              </div>
              
            </div>
          </div>
        </>
      );
}

export default HowToUnblockImg;
