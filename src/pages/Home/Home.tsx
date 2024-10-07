import About from "@/components/home/About"
import Experience from "@/components/home/Experience"
import FeaturedServices from "@/components/home/FeaturedServices"
import Features from "@/components/home/Features"
import Hero from "@/components/home/Hero"
import Review from "@/components/home/Review"
import Testimonials from "@/components/home/Testimonials"
import { useEffect } from "react"

const Home = () => {
    useEffect(() => {
        // Check for hash in URL
        const hash = window.location.hash;

        if (hash) {
            // Scroll to the element with the corresponding ID
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    },[]);

    return (
        <div>
            <Hero />
            <About />
            <Features />
            <FeaturedServices />
            <Experience />
            <div id="testimonials" >
                <Testimonials />
            </div>
            <Review />

        </div>
    )
}

export default Home