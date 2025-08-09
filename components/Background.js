// Background Components - Animated background elements

const FloatingShapes = () => (
    <div className="floating-elements">
        {Array.from({ length: 6 }).map((_, i) => <div key={i} className="floating-shape" />)}
    </div>
);

const ParallaxBackground = () => (
    <>
        <div className="parallax-layer parallax-1"></div>
        <div className="parallax-layer parallax-2"></div>
    </>
);
