import './Contact.css'
import { useForm, ValidationError } from '@formspree/react';
import Lottie from "lottie-react";
import doneAnimation from '../../../public/animations/done.json'
import emailAnimation from '../../../public/animations/contact.json'
import React, { useRef, useEffect } from "react";

export default function Contact() {

    const [state, handleSubmit] = useForm("xdkjyjrr");
    const lottieRef = useRef();
    const animationSpeed = 0.9;

    useEffect(() => {
        if (!lottieRef.current) return;
        lottieRef.current.setSpeed(animationSpeed);
    }, [animationSpeed]); // Added missing dependency

    return (
        <section className='contact-us' id='contact'>
            <h1 className='title'>
                <span className="icon-envelope-open"></span> Contact Us
            </h1>
            <p className='sub-title'>Contact me and give me your advices. I will recieve your message</p>
            <div style={{justifyContent: "space-between"}} className="contactContainer flex">
                <form onSubmit={handleSubmit} className=''>
                    <div className='flex'>
                        <label htmlFor="email">Email Adress:</label>
                        <input autoComplete='off' type="email" id='email' placeholder='Email Adress' name='email' required />
                        <ValidationError
                            prefix="Email"
                            field="email"
                            errors={state.errors}
                        />
                    </div>
                    <div className='flex' style={{ marginTop: '24px' }}>
                        <label htmlFor="textarea" >Your Message:</label>
                        <textarea name="message" id="textarea" placeholder='I well receive your message' required />
                        <ValidationError
                            prefix="Message"
                            field="message"
                            errors={state.errors}
                        />
                    </div>
                    <button type='submit' disabled={state.submitting}>
                        {state.submitting ? "sending..." : "send"}
                    </button>   
                    {state.succeeded && (<p className='flex' style={{ fontSize: "16px", marginTop: "1.7rem" , alignItems: "center" }}>
                        <Lottie loop={false} style={{height: 55}} animationData={doneAnimation} />

                        Thanks for your message!</p>)}
                </form>
                <div className="animation">
                    <Lottie className='email' lottieRef={lottieRef} style={{width: "300px" , padding: "0 10px 50px 0"}} animationData={emailAnimation} />
                </div>
            </div>
        </section>
    )
}
