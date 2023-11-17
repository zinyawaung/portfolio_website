import React from "react";
import Lottie from "react-lottie";
import githubAnimationData from './github.json';
import './home.css';

const Social =()=>{
 // Lottie animation options
 const githubOptions = {
        loop: true,
        autoplay: true,
        animationData: githubAnimationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
        return(
             <div className="home__social">
                <a href="https://www.instagram.com/zinyaw_aung" className="home__social-icon" target="_blank">
                <i class="uil uil-instagram"></i>
                </a>

                <a href="https://www.linkedin.com/in/zinyawaung" className="home__social-icon" target="_blank">
                <i class="uil uil-linkedin-alt"></i>
                </a>

                {/* <a href="https://github.com/zinyawaung" className="home__social-icon" target="_blank">
                <i class="uil uil-github-alt"></i>
                </a> */}

                <a href="https://github.com/zinyawaung" 
                className="home__social-icon" target="_blank" 
                style={{ color: '#333333', textDecoration: 'none' }}
                onMouseOver={(e) => e.target.style.color = '#black'}
                onMouseOut={(e) => e.target.style.color = '#333333'} >
                {/* Add Lottie animation for GitHub */}
                <Lottie options={githubOptions} height={20} width={20}/>
                </a>
             </div>
        )
}

export default Social