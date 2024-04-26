# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


    const handleScroll = (event) => {
        if (scrollLocked) return; // Exit if scroll is locked
    
        if (event.deltaY > 50) { // Scrolling down
            setAlignment((prevAlignment) => {
                switch (prevAlignment) {
                    case "left": return "center";
                    case "center": return "right";
                    case "right": return "right"; // or loop back to "left" if desired
                    default: return prevAlignment;
                }
            });
        } else { // Scrolling up
            setAlignment((prevAlignment) => {
                switch (prevAlignment) {
                    case "left": return "left"; // or loop to "right" if desired
                    case "center": return "left";
                    case "right": return "center";
                    default: return prevAlignment;
                }
            });
        }
        setScrollLocked(true); // Lock scroll after setting alignment
        // Inside the handleScroll function, after updating the alignment
        setTimeout(() => {
            setScrollLocked(false); // Unlock the scroll after 500ms
        }, 500); // Match this duration with your CSSTransition timeout
    };

    const handleWheel = (e) => {
        handleScroll(e);
    };
    
    useEffect(() => {
        window.addEventListener("wheel", handleWheel, { passive: false });
    
        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [scrollLocked]); // Add `scrollLocked` to the dependency array
