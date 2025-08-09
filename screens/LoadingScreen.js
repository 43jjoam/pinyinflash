// Loading Screen Component - Displays while cards are being prepared

const LoadingScreen = () => (
     <div className="mobile-center text-center text-white">
        <div>
            <h2 className="text-3xl font-bold mb-2">{t('generatingTitle')}</h2>
            <p>{t('generatingSubtitle')}</p>
        </div>
    </div>
);
