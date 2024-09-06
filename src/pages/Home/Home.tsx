import About from "@/components/home/About"
import Experience from "@/components/home/Experience"
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
            <About />
            <Features />
            <FeaturedServices />
            <Experience />
            <Testimonials />
            <Review />

        </div>
    )
}

export default Home