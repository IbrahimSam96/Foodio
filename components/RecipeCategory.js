import DoneIcon from '@mui/icons-material/Done';

const RecipeCategory = ({ category, selected, categories, setCategories, recipes, setFilteredRecipes }) => {


    function handleCategory(e) {
        const updated = categories.map(c => {
            if (c.name === category) c.selected = !c.selected;
            return c;
        });
        setCategories(updated);
    }

    function filterRecipes() {
        let finalArray = []

        const selectedCategories = categories.filter(c => {
            return c.selected;
        }).map(c => c.name);

        finalArray = recipes.filter(r => {
            return r.tags.some(tag => {
                return selectedCategories.includes(tag);
            });
        });
        setFilteredRecipes(finalArray)
    }


    return (
        <span onClick={(e) => {
            handleCategory(e)
            filterRecipes()
        }}
            className={`hover:cursor-pointer group py-4 px-4 m-2 border-[2px] rounded text-center w-[175px] relative
            ${selected ? `border-[green] bg-[#D2F895] text-[green] font-bold ` : `hover:border-[green] border-[#CCCCCC] text-[black]`}`
            }
        >
            {selected &&
                <DoneIcon className={`absolute top-0 left-0 m-[2px] p-[2px] text-[15px] inline bg-[green] fill-white rounded-[50%] `} />
            }
            <p className={`text-sm my-auto inline`}>
                {category}
            </p>
        </span>

    )
}

export default RecipeCategory; 