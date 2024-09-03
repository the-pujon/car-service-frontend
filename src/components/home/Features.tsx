import featureIcon1 from "../../assets/feature/Icon-1.png"
import featureIcon2 from "../../assets/feature/Icon-2.png"
import featureIcon3 from "../../assets/feature/Icon-3.png"
import featureIcon4 from "../../assets/feature/Icon-4.png"

const Features = () => {
    return (
        <div className="wrapper grid grid-cols-4 divide-white place-items-center divide-x border-y-[1px] border-white">
            <div className="flex flex-col text-xl text-white  justify-center items-start py-6 px-9 font-semibold w-full">
                <img src={featureIcon1} />
                Contactless Washing
                <div className="text-sm font-extralight pt-3 w-64">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, accusamus.
                </div>
            </div>
            <div className="flex flex-col text-xl text-white  justify-center items-start py-6 px-9 font-semibold w-full" >
                <img src={featureIcon2} />
                Safety Materials
                <div className="text-sm font-extralight pt-3 w-64">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, accusamus.
                </div>
            </div>
            <div className="flex flex-col text-xl text-white  justify-center items-start py-6 px-9 font-semibold w-full">
                <img src={featureIcon3} />
                Modern Equipments
                <div className="text-sm font-extralight pt-3 w-64">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, accusamus.
                </div>
            </div>
            <div className="flex flex-col text-xl text-white  justify-center items-start py-6 px-9 font-semibold w-full">
                <img src={featureIcon4} />
                Extensive Cleaning
                <div className="text-sm font-extralight pt-3 w-64">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, accusamus.
                </div>
            </div>
        </div>
    )
}

export default Features