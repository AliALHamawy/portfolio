import { useState, useEffect } from "react";
import "./Header.css";

export default function Header() {
    const [showModal, setShowModal] = useState(false);
    const [animateOut, setAnimateOut] = useState(false);
    const [theme, setTheme] = useState(
        localStorage.getItem("currentMode") ?? "dark"
    );
    useEffect(() => {
        // أول شيء امسح كل الكلاسات القديمة (dark/light) حتى لا تتراكم
        if (theme == "light") {
            document.body.classList.remove("dark");
            document.body.classList.add("light");
        } else {
            document.body.classList.remove("light");
            document.body.classList.add("dark");
        }
    }, [theme]);

    const openModal = () => {
        setShowModal(true);
        setAnimateOut(false);
    };
    const closeModal = () => {
        setAnimateOut(true);
        setTimeout(() => {
            setShowModal(false);
            setAnimateOut(false);
        }, 250); // should match animation duration in CSS
    };

    return (
        <header className="flex">
            <button className="menu icon-menu flex" onClick={openModal} />
            <div />
            <nav className="flex">
                <ul className="flex">
                    <li>
                        <a href="#hero">About</a>
                    </li>
                    <li>
                        <a href="#main">Projects</a>
                    </li>
                    <li>
                        <a href="#contact">Contact</a>
                    </li>
                </ul>
            </nav>
            <button
                onClick={() => {
                    // send value to LS
                    localStorage.setItem(
                        "currentMode",
                        theme === "dark" ? "light" : "dark"
                    );
                    // get value from LS
                    setTheme(localStorage.getItem("currentMode"));
                }}
                className="mode"
            >
                {theme === "dark" ? (
                    <span className="icon-moon-stroke"></span>
                ) : (
                    <span className="icon-sun-stroke"></span>
                )}
            </button>

            {(showModal || animateOut) && (
                <div className="fixed" onClick={closeModal}>
                    <button
                        className="close-modal-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            closeModal();
                        }}
                    >
                        &times;
                    </button>
                    <ul
                        className={`modal${animateOut ? " popOut" : ""}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <li>
                            <a href="#hero" onClick={closeModal}>
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#main" onClick={closeModal}>
                                Projects
                            </a>
                        </li>
                        <li>
                            <a href="#contact" onClick={closeModal}>
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
}
