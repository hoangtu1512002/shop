import React from 'react';

import HeroSlide from '../../components/layout/heroSlide/HeroSlide';
import heroSliderData from '../../assets/fake-data/HeroSlide';
import Helmet from '../../components/layout/helmet/Helmet';

const Home = () => {
    return (
        <Helmet title="Trang chủ">
            {/* hero slide */}

            <HeroSlide
                data={heroSliderData}
                control={true}
                auto={true}
                // timeOut={5000}
            />

            {/* end hẻo slide */}
        </Helmet>
    );
};

export default Home;
