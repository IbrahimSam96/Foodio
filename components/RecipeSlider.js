
import Image from "next/image";

// Carousel/Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from "swiper";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/effect-coverflow";

const recipes = [
    { name: 'Beans-Foul-and-Beef-Rice', time: '50', tags: ['One-Pot Wonders'], selected: false },
    { name: 'Eggplant-and-Halloumi-Rolls-with-Tomato-Sauce', time: '35', tags: ['Vegetarian', 'Light Delights'], selected: false },
    { name: 'Peri-Peri-Chicken', time: '55', tags: ['Terrific Traybakes'], selected: false },
    { name: 'Shells-Pasta-with-Yogurt-and-Tahini-Sauce', time: '15', tags: ['Loved By Kiddos'], selected: false },
    { name: 'Baked-Chicken-Tray-with-Thyme', time: '55', tags: ['Terrific Traybakes'], selected: false },
    { name: 'Mongolian-Chicken', time: '25', tags: ['One-Pot Wonders', 'Asian'], selected: false },
    { name: 'Chicken-Curry-with-White-Rice', time: '35', tags: ['Indian'], selected: false },
    { name: 'Beef-Steaks-with-Mushroom-and-Pomegranate-Sauce', time: '35', tags: ['One-Pot Wonders'], selected: false },
    { name: 'Smoked-Beef-Kabab-with-Tomato-Sauce', time: '30', tags: ['Terrific Traybakes'], selected: false },
    { name: 'Beef-Pasta-with-Blue-cheese-sauce', time: '11', tags: ['One-Pot Wonders', 'Quick & Easy'], selected: false },
    { name: 'Herby-Fish-Rolls', time: '35', tags: ['Terrific Traybakes', 'SeaFood'], selected: false },
    { name: 'Potatoes-Cream-and-Sausage-Pasta', time: '40', tags: ['One-Pot Wonders'], selected: false },
    { name: 'Steak-Rolls-with-Pepper-Sauce', time: '30', tags: ['Terrific Traybakes'], selected: false },
    { name: 'Msakhan-Traybake', time: '55', tags: ['Terrific Traybakes'], selected: false },
    { name: 'Chicken-Shawarma-Tacos', time: '15', tags: ['Chicken', 'Loved By Kiddos'], selected: false },
    { name: 'Chicken-Zurbian', time: '55', tags: ['Chicken'], selected: false },
    { name: 'Shrimp-Scampi', time: '10', tags: ['One-Pot Wonders', 'SeaFood', 'Quick & Easy'], selected: false },
    { name: 'Baked-Fish-Fillet-in-Parchment-Paper', time: '40', tags: ['Terrific Traybakes', 'Light Delights'], selected: false },
    { name: 'Teriyaki-Chicken-with-Broccoli', time: '25', tags: ['Asian'], selected: false },
    { name: 'Baked-Fish-Fillet-in-Tomatoes-and-Green-Olives', time: '50', tags: ['Terrific Traybakes', 'Light Delights', 'SeaFood'], selected: false },
    { name: 'Fattet-Il-Kofta', time: '40', tags: ['One-Pot Wonders'], selected: false },
    { name: 'Thai-Style-Chicken', time: '30', tags: ['Light Delights'], selected: false },
    { name: 'Low-Calorie-Beef-Stroganoff', time: '30', tags: ['Light Delights'], selected: false },
    { name: 'Chicken-Shawarma-Salad', time: '10', tags: ['Light Delights'], selected: false },
    { name: 'Bulgur-Salad-with-Grilled-Chicken', time: '25', tags: ['Light Delights'], selected: false },


];

const RecipeSlider = () => {

    const RecipeSlide = ({ recipe }) => {

        return (
            <span className={`grid mx-4`}
            >
                <span className={`relative `}>
                    <Image
                        width={400}
                        height={220}
                        className={`self-center justify-self-center`}
                        alt={`${recipe.name}`}
                        src={`/${`${recipe.name}`}.jpeg`}
                    />
                </span>
                <p className={`justify-self-start self-center text-[1.3em] text-[black] p-2 `}>
                    {recipe.name}
                </p>
                <span className={`m-2 justify-self-start self-center flex`}>

                    <p className={`bg-[#CCCCCC] p-2 inline font-bold rounded text-xs `}> {recipe.time} min </p>

                    {recipe.tags.map((tag) => {
                        return (
                            <p key={tag} className={`bg-[#D2F895] p-2 mx-2 inline text-[green] font-bold rounded text-xs `}> {tag} </p>
                        )
                    })}

                </span>
            </span>
        )
    }

    return (
        <Swiper
            // effect={"coverflow"}
            centeredSlides={false}
            slidesPerView={2.5}
            speed={1000}
            navigation={true}
            modules={[Navigation,]}
            allowTouchMove={true}
            className={`w-full self-center max-w-[1500px] `}
            loop={true}
            // coverflowEffect={{
            //     rotate: 50,
            //     stretch: 0,
            //     depth: 100,
            //     modifier: 1,
            //     slideShadows: false,
            // }}
        // spaceBetween={30}

        >

            {recipes.map((recipe) => {
                return (
                    <SwiperSlide key={recipe.name}>

                        <RecipeSlide recipe={recipe} />

                    </SwiperSlide>
                )
            }
            )}
        </Swiper>
    )
}

export default RecipeSlider; 
