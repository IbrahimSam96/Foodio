import Image from "next/image";
import { useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DoneIcon from '@mui/icons-material/Done';

const Slider = ({ filteredRecipes, setFilteredRecipes, selectedReicpes, setSelectedRecipes, numberOfRecipes, overSelected, setOverSelected }) => {

    const [swiperRef, setSwiperRef] = useState();

    const handlePrevious = useCallback(() => {
        swiperRef?.slidePrev();

    }, [swiperRef]);

    const handleNext = useCallback(() => {
        swiperRef?.slideNext();

    }, [swiperRef]);


    const RecipeSlide = ({ recipe }) => {


        const SelectRecipe = (recipe) => {

            if (recipe.selected == true) {
                console.log('already selected')
                // Removes Error if reaches maximum number fo seleted recipes
                if (selectedReicpes.length == numberOfRecipes) {
                    setOverSelected(false)
                }
                let updatedArray = selectedReicpes;
                // Removes selected object from selectedRecipes
                for (var i = 0; i < updatedArray.length; i++) {
                    if (updatedArray[i].name === recipe.name) {
                        updatedArray.splice(i, 1);
                    }
                }


                setSelectedRecipes(updatedArray)

                // Make it unselected
                const updated = filteredRecipes.map(c => {
                    if (c.name === recipe.name) c.selected = !c.selected;
                    return c;
                });

                setFilteredRecipes(updated);

            }
            //Not Selected 
            else {
                // Exceeds plans selected number of recipes
                if (selectedReicpes.length == numberOfRecipes) {
                    setOverSelected(true)
                }
                else {
                    const updated = filteredRecipes.map(c => {
                        if (c.name === recipe.name) c.selected = !c.selected;
                        return c;
                    });

                    setFilteredRecipes(updated);

                    let updatedArray = selectedReicpes;

                    updatedArray.push(recipe)
                    setSelectedRecipes(updatedArray)
                    console.log(selectedReicpes)
                }
            }
        }


        return (
            <span className={`grid ${recipe.selected ? `opacity-50` : ``}`}
                onClick={() => {
                    SelectRecipe(recipe);
                }} >
                <span className={`relative `}>

                    {recipe.selected && <DoneIcon className={`absolute top-[40%] left-[45%] p-[5px] text-[50px] inline bg-[green] fill-white rounded-[50%] `} />}

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

    const EmptySlide = () => {
        return (
            <p className={` text-[1.5em] font-medium font-serif text-[rgb(36,36,36)] p-3 mx-auto`}>
                Select a category to see more recipes
            </p>
        )
    }

    return (
        <div className={`flex`}>
            {filteredRecipes == 0 ? EmptySlide() :
                <>
                    <span
                        onClick={handlePrevious}
                        className={`hidden lg:inline my-auto mx-4 rounded-[50%] border-[1px] border-[green] hover:cursor-pointer hover:bg-[#E4FABF] `}>
                        <KeyboardArrowLeftIcon className={`text-[35px] text-[green]`} />
                    </span>

                    <Swiper
                        onSwiper={setSwiperRef}
                        className={`max-w-[1500px] w-full`}
                        centeredSlides={false}
                        slidesPerView={3.5}
                        // speed={1000}
                        navigation={false}
                        allowTouchMove={true}
                        loop={false}
                        spaceBetween={20}

                    >

                        {filteredRecipes.map((recipe) => (
                            <SwiperSlide key={recipe.name}>

                                <RecipeSlide recipe={recipe} />

                            </SwiperSlide>
                        )
                        )}

                    </Swiper>

                    <span
                        onClick={handleNext}
                        className={`hidden lg:inline my-auto mx-4 rounded-[50%] border-[1px] border-[green] hover:cursor-pointer hover:bg-[#E4FABF] `}>
                        <KeyboardArrowRightIcon className={`text-[35px] text-[green]`} />
                    </span>
                </>
            }



        </div>


    )
}
export default Slider; 