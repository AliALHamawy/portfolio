import { useState } from "react";
import "./Main.css";
import { myProjects } from "./myProject";
import { motion, AnimatePresence } from "motion/react";

export default function Main() {
    const [currentActive, setCurrentActive] = useState("all");
    const [arr, setArr] = useState(myProjects);
    const [copiedLink, setCopiedLink] = useState(null);
    const handleClick = (buttonCategory) => {
        setCurrentActive(buttonCategory);
        if (buttonCategory === "all") {
            setArr(myProjects);
            return;
        }
        const newArr = myProjects.filter(
            (item) => item.category === buttonCategory
        );
        setArr(newArr);
    };

    const handleCopy = async (link) => {
        try {
            await navigator.clipboard.writeText(link);
            setCopiedLink(link);
            setTimeout(() => setCopiedLink(null), 1500);
        } catch (error) {
            console.error("Failed to copy link:", error);
        }
    };

    // Handle image loading errors
    const handleImageError = (e) => {
        // Check if we've already tried to load the placeholder
        if (e.target.src.includes("placeholder.svg")) {
            // If placeholder also fails, remove the image or set a solid color
            e.target.style.display = "none";
            return;
        }
        // Try to load the placeholder image
        e.target.src = "/portfolio/projects%20photo/placeholder.svg";
    };

    return (
        <main className="flex" id="main">
            <section className="flex left-section">
                <button
                    onClick={() => {
                        setCurrentActive("all");
                        setArr(myProjects);
                    }}
                    className={currentActive === "all" ? "active" : null}
                >
                    All Projects
                </button>
                <button
                    onClick={() => handleClick("css")}
                    className={currentActive === "css" ? "active" : null}
                >
                    HTML & CSS
                </button>
                <button
                    onClick={() => handleClick("js")}
                    className={currentActive === "js" ? "active" : null}
                >
                    JS
                </button>
                <button
                    onClick={() => handleClick("react")}
                    className={currentActive === "react" ? "active" : null}
                >
                    React
                </button>
            </section>

            <section className="right-section flex">
                <AnimatePresence>
                    {arr.map((item, index) => {
                        return (
                            <motion.article
                                layout
                                initial={{ transform: "scale(0.7)", opacity: 0 }}
                                animate={{ transform: "scale(1)", opacity: 1 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                key={`${item.projectTitle}-${index}`}
                                className="card"
                            >
                                <img 
                                    src={item.imgPath} 
                                    alt={item.projectTitle}
                                    onError={handleImageError}
                                />
                                <div className="box">
                                    <h1 className="title">{item.projectTitle}</h1>
                                    <p className="sub-title">{item.subTitle}</p>
                                    <div className="flex icons">
                                        <div style={{ gap: "11px" }} className="flex">
                                            <a
                                                className="icon-link"
                                                type="button"
                                                onClick={() => handleCopy(item.link)}
                                                aria-label="Copy live link"
                                            />
                                            <a
                                                className="icon-github"
                                                href={item.gitRepo}
                                                target="_blank"
                                                rel="noreferrer"
                                                aria-label="GitHub repository"
                                            />
                                        </div>
                                        <a
                                            className="link flex"
                                            href={item.link}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <span style={{ marginRight: "4px" }}>more</span>
                                            <span
                                                style={{ alignSelf: "end", fontSize: ".8rem" }}
                                                className="icon-arrow-right"
                                            ></span>
                                        </a>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </AnimatePresence>
            </section>
            <AnimatePresence>
                {copiedLink && (
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="copied-toast"
                    >
                        Link copied!
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}