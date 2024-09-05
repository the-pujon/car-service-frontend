import About from "@/components/home/About"
import FeaturedServices from "@/components/home/FeaturedServices"
import Features from "@/components/home/Features"
import Hero from "@/components/home/Hero"
import Review from "@/components/home/Review"

const Home = () => {
    return (
        <div>
            <Hero />
            <Features />
            <About />
            <FeaturedServices />
            <Review />
        </div>
    )
}

export default Home