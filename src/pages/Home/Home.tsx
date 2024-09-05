import About from "@/components/home/About"
import FeaturedServices from "@/components/home/FeaturedServices"
import Features from "@/components/home/Features"
import Hero from "@/components/home/Hero"
import Review from "@/components/home/Review"
import Testimonials from "@/components/home/Testimonials"
//import Testimonials from "@/components/home/Testimonials"
//import Testimonials from './../../components/home/Testimonials';

const Home = () => {
    return (
        <div>
            <Hero />
            <Features />
            <About />
            <FeaturedServices />
            <Testimonials />
            <Review />

        </div>
    )
}

export default Home