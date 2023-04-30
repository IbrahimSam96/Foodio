

const Slider = () => {


    const [swiperRef, setSwiperRef] = useState();

    const handlePrevious = useCallback(() => {
        swiperRef?.slidePrev();

    }, [swiperRef]);

    const handleNext = useCallback(() => {
        swiperRef?.slideNext();

    }, [swiperRef]);

    
    return (
        <div className={`flex`}>
            <span
                onClick={handlePrevious}
                className={`inline my-auto mx-4 rounded-[50%] border-[1px] border-[green] hover:cursor-pointer hover:bg-[#E4FABF] `}>
                <KeyboardArrowLeftIcon className={`text-[35px] text-[green]`} />
            </span>

            <Swiper
                onSwiper={setSwiperRef}
                className={`max-w-[1000px] `}
                centeredSlides={false}
                slidesPerView={3.5}
                // speed={1000}
                navigation={false}
                allowTouchMove={true}
                loop={false}
                spaceBetween={30}

            >
                <SwiperSlide >
                    <span className={`grid grid-cols-1 grid-rows-1`} >
                        <Image
                            width={400}
                            height={220}
                            className={`col-start-1 row-start-1`}
                            alt={'Beans-Foul-and-Beef-Rice'}
                            src={'/Beans-Foul-and-Beef-Rice.jpeg'}
                        />
                        <p className={` justify-self-center self-center text-[0.8em] font-medium font-serif text-[white] p-2 bg-[green] `}>
                            Beans-Foul-and-Beef-Rice
                        </p>
                    </span>

                </SwiperSlide >

                <SwiperSlide >
                    <span className={`grid`} >

                        <Image
                            width={450}
                            height={220}
                            className={`inline mx-8 justify-self-center `}
                            alt={'Eggplant-and-Halloumi-Rolls-with-Tomato-Sauce'}
                            src={'/Eggplant-and-Halloumi-Rolls-with-Tomato-Sauce.jpeg'}
                        />
                        <p className={`text-[0.8em] font-medium font-serif text-[rgb(36,36,36)] p-2 justify-self-center  `}>
                            Eggplant-and-Halloumi-Rolls-with-Tomato-Sauce
                        </p>
                    </span>
                </SwiperSlide >
                <SwiperSlide >
                    <span className={`grid`} >

                        <Image
                            width={450}
                            height={220}
                            className={`inline mx-8 justify-self-center `}
                            alt={'Peri-Peri-Chicken'}
                            src={'/Peri-Peri-Chicken.jpeg'}
                        />
                        <p className={`text-[0.8em] font-medium font-serif text-[rgb(36,36,36)] p-2 justify-self-center  `}>
                            Peri-Peri-Chicken
                        </p>
                    </span>
                </SwiperSlide >
                <SwiperSlide >
                    <span className={`grid`} >

                        <Image
                            width={450}
                            height={220}
                            className={`inline mx-8 justify-self-center `}
                            alt={'Shells-Pasta-with-Yogurt-and-Tahini-Sauce'}
                            src={'/Shells-Pasta-with-Yogurt-and-Tahini-Sauce.jpeg'}
                        />
                        <p className={`text-[0.8em] font-medium font-serif text-[rgb(36,36,36)] p-2 justify-self-center  `}>
                            Shells-Pasta-with-Yogurt-and-Tahini-Sauce
                        </p>
                    </span>

                </SwiperSlide >

            </Swiper>

            <span
                onClick={handleNext}
                className={`inline my-auto mx-4 rounded-[50%] border-[1px] border-[green] hover:cursor-pointer hover:bg-[#E4FABF] `}>
                <KeyboardArrowRightIcon className={`text-[35px] text-[green]`} />
            </span>
        </div>


    )
}
export default Slider; 