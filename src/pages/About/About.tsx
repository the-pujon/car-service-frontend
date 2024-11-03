import { motion } from 'framer-motion';
import { Award,Clock,Users,Leaf,MapPin,Phone,Mail } from 'lucide-react';
import aboutHero from '@/assets/heroImage/hero4.jpg';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20,opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative h-[40vh] md:h-[50vh] overflow-hidden"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.7), rgba(17, 24, 39, 0.7)), url(${aboutHero})`,
                    }}
                />
                <div className="wrapper relative h-full flex items-center">
                    <motion.div
                        initial={{ y: 20,opacity: 0 }}
                        animate={{ y: 0,opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                            About Sparkle Car Wash
                        </h1>
                        <p className="text-lg text-gray-200">
                            Your trusted partner in premium car care services since 2009
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Main Content */}
            <motion.div
                className="wrapper py-16 md:py-24"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Mission & Vision */}
                <motion.div variants={itemVariants} className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center">Our Mission & Vision</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-primary-foreground p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                            <p className="text-gray-300">
                                To provide exceptional car care services that exceed customer expectations while maintaining
                                environmental responsibility through eco-friendly practices and innovative solutions.
                            </p>
                        </div>
                        <div className="bg-primary-foreground p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                            <p className="text-gray-300">
                                To become the leading car care service provider known for quality, sustainability,
                                and customer satisfaction across the region.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Key Features */}
                <motion.div variants={itemVariants} className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Award,title: "Quality Service",desc: "Premium car care with attention to detail" },
                            { icon: Leaf,title: "Eco-Friendly",desc: "Sustainable practices and green solutions" },
                            { icon: Users,title: "Expert Team",desc: "Skilled professionals with years of experience" },
                            { icon: Clock,title: "Quick Service",desc: "Efficient service without compromising quality" }
                        ].map((feature,index) => (
                            <div key={index} className="bg-primary-foreground p-6 rounded-lg text-center">
                                <feature.icon className="w-12 h-12 mx-auto mb-4 text-foreground" />
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-300">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Contact Information */}
                <motion.div variants={itemVariants} className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="flex items-center gap-4">
                            <MapPin className="w-8 h-8 text-foreground" />
                            <div>
                                <h3 className="font-semibold">Location</h3>
                                <p className="text-gray-300">123 Wash Street, City, State 12345</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Phone className="w-8 h-8 text-foreground" />
                            <div>
                                <h3 className="font-semibold">Phone</h3>
                                <p className="text-gray-300">(555) 123-4567</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Mail className="w-8 h-8 text-foreground" />
                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <p className="text-gray-300">info@sparklecarwash.com</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    variants={itemVariants}
                    className="text-center bg-primary-foreground p-8 rounded-lg"
                >
                    <h2 className="text-2xl font-bold mb-4">Ready to Experience Our Service?</h2>
                    <p className="text-gray-300 mb-6">
                        Book your appointment today and give your car the care it deserves.
                    </p>
                    <Button asChild className="button">
                        <Link to="/services">Book Now</Link>
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default About;