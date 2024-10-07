import { motion } from "framer-motion"
import featureIcon1 from "../../assets/feature/Icon-1.png"
import featureIcon2 from "../../assets/feature/Icon-2.png"
import featureIcon3 from "../../assets/feature/Icon-3.png"
import featureIcon4 from "../../assets/feature/Icon-4.png"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: { y: 20,opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100
        }
    }
}

const Features = () => {
    return (
        <motion.div
            className="wrapper backdrop-blur-sm py-10 grid grid-cols-1 lg:grid-cols-4 divide-white place-items-center divide-x border-y-[1px] border-white"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {[
                { icon: featureIcon1,alt: "Contactless Washing",title: "Contactless Washing",description: "Enjoy a safe, touch-free car wash experience with our advanced contactless washing technology." },
                { icon: featureIcon2,alt: "Safety Materials",title: "Safety Materials",description: "We use high-quality, car-safe cleaning materials to protect your vehicle's paint and finish." },
                { icon: featureIcon3,alt: "Modern Equipments",title: "Modern Equipments",description: "Our state-of-the-art washing equipment ensures a thorough and efficient clean for your car." },
                { icon: featureIcon4,alt: "Extensive Cleaning",title: "Extensive Cleaning",description: "From basic washes to detailed cleaning, we offer comprehensive services for all your car care needs." }
            ].map((feature,index) => (
                <motion.div
                    key={index}
                    className="flex flex-col text-xl text-white justify-center items-start py-6 px-9 font-semibold w-full"
                    variants={itemVariants}
                >
                    <motion.img src={feature.icon} alt={feature.alt} whileHover={{ scale: 1.1 }} />
                    {feature.title}
                    <motion.div
                        className="text-sm font-extralight pt-3 w-64"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {feature.description}
                    </motion.div>
                </motion.div>
            ))}
        </motion.div>
    )
}

export default Features