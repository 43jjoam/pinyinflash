// Icon Component - SVG icons used throughout the app

const Icon = ({ name, size = 24, fill = 'none', className = '' }) => {
    const icons = {
        chevronLeft: <polyline points="15,18 9,12 15,6"></polyline>,
        chevronRight: <polyline points="9,18 15,12 9,6"></polyline>,
        heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>,
        bookOpen: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></>,
        helpCircle: <><circle cx="12" cy="12" r="10"></circle><path d="m9,9a3,3 0 1,1 5.12,2.12l-1.12,0.88"></path><path d="m12,17l.01,0"></path></>,
        grid: <><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></>,
    };
    
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {icons[name]}
        </svg>
    );
};
