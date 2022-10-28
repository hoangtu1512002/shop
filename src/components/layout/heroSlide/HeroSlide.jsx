import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const HeroSlide = (props) => {
    const data = props.data;

    const timeOut = props.timeOut ? props.timeOut : 3000;

    const [activeSlider, setActiveSlide] = useState(0);

    const nextSlide = useCallback(() => {
        const index = activeSlider + 1 === data.length ? 0 : activeSlider + 1;
        setActiveSlide(index);
    }, [activeSlider, data]);

    const prevSlide = () => {
        const index = activeSlider - 1 < 0 ? data.length - 1 : activeSlider - 1;
        setActiveSlide(index);
    };

    useEffect(() => {
        if (props.auto) {
            const slideAuto = setInterval(() => {
                nextSlide();
            }, timeOut);
            return () => {
                clearInterval(slideAuto);
            };
        }
    }, [nextSlide, timeOut, props]);

    return (
        <div className="hero-slider">
            {data.map((item, i) => (
                <HeroSlideItem key={i} item={item} active={i === activeSlider} />
            ))}

            {props.control ? (
                <div className="hero-slider__control">
                    <div className="hero-slider__control__item" onClick={prevSlide}>
                        <i className="bx bx-chevron-left"></i>
                    </div>

                    <div className="hero-slider__control__item">
                        <div className="index">
                            {activeSlider + 1}/{data.length}
                        </div>
                    </div>

                    <div className="hero-slider__control__item" onClick={nextSlide}>
                        <i className="bx bx-chevron-right"></i>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

HeroSlide.propTypes = {
    data: PropTypes.array.isRequired,
    control: PropTypes.bool,
    auto: PropTypes.bool,
    timeOut: PropTypes.number,
};

const HeroSlideItem = (props) => {
    return (
        <div className={`hero-slider__item ${props.active ? 'active' : ''}`}>
            <div className="hero-slider__item__info">
                <div className={`hero-slider__item__info__title color-${props.item.color}`}>
                    <span>{props.item.title}</span>
                </div>

                <div className="hero-slider__item__info__description">
                    <span>{props.item.description}</span>
                </div>

                <div className="hero-slider__item__info__btn">
                    <Link to={props.item.path}>
                        <button>xem chi tiết</button>
                    </Link>
                </div>
            </div>
            <div className="hero-slider__item__image">
                <div className={`shape bg-${props.item.color}`}></div>
                <img src={props.item.img} alt="" />
            </div>
        </div>
    );
};

export default HeroSlide;
