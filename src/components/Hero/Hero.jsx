import "./Hero.css";
import heroAnimation from '../../../public/animations/hero.json'
import Lottie from "lottie-react";
import { motion } from "motion/react";


export default function Hero() {
    return (
        <section className="hero flex" id="hero">
            <div className="left-section">
                <div className="avatar-row">
                    <motion.img 
                    initial={{transform: "scale(0)"}}
                    animate={{transform: "scale(1)"}}
                    transition={{damping: 6 , type: "spring" , stiffness: 100}}
                    src="/portfolio/me.jpg"
                    alt="" className="avatar" />
                    <span>
                        <i className="icon-verified" />
                    </span>
                    <motion.h1 
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1.25}}
                    className="title ali">ALI AL-Hammway</motion.h1>
                </div>
                <motion.h1
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
                className="title">FrontEnd Dev</motion.h1>
                <p className="sub-title">
                    I'm Ali AL-Hamawy, I'm frontend developer, stille learning...
                </p>
                <div className="icons">
                    <a className="icon icon-github" href="https://github.com/AliALHamawy" target="_blank" />
                    <a className="icon icon-facebook" href="https://www.facebook.com/share/19YAnfW1F6/" target="_blank" />
                    <a className="icon icon-instagram" href="https://www.instagram.com/alialhamawy" target="_blank" />
                    <a className="icon icon-x1" href="https://x.com/Ali806307633649?t=ME6sGZeTgRtThVqKTDNNIw&s=09" target="_blank" />
                </div>
            </div>
            <div className="right-section animation"><Lottie style={{width: "500px"}} animationData={heroAnimation} /></div>
        </section>
    );
}
