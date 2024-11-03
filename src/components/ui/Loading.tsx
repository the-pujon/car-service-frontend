import { motion } from 'framer-motion';
import { Car,Droplets,Sparkles } from 'lucide-react';

const Loading = () => {
    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
            <div className="relative flex flex-col items-center">
                {/* Main container with gradient background */}
                <div className="relative bg-gradient-to-b from-foreground/20 to-transparent p-16 rounded-full">
                    {/* Car container */}
                    <motion.div
                        className="relative"
                        animate={{
                            y: [-5,5,-5]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Car className="text-foreground w-20 h-20" />

                        {/* Water drops falling animation */}
                        {[...Array(3)].map((_,i) => (
                            <motion.div
                                key={i}
                                className="absolute -top-8"
                                style={{ left: `${(i + 1) * 25}%` }}
                                animate={{
                                    y: [0,60],
                                    opacity: [0,1,0]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.4,
                                    ease: "easeIn"
                                }}
                            >
                                <Droplets className="text-blue-400 w-4 h-4" />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Rotating sparkles */}
                    <motion.div
                        className="absolute inset-0"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {[...Array(8)].map((_,i) => (
                            <motion.div
                                key={i}
                                className="absolute"
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    transform: `rotate(${i * 45}deg) translate(0, -180%)`
                                }}
                                animate={{
                                    scale: [1,1.5,1],
                                    opacity: [0.3,1,0.3]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.2
                                }}
                            >
                                <Sparkles className="text-yellow-400 w-5 h-5" />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Ripple effect */}
                    {[...Array(3)].map((_,i) => (
                        <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-foreground/30 rounded-full"
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                            animate={{
                                scale: [1,2],
                                opacity: [0.5,0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.6,
                                ease: "easeOut"
                            }}
                        />
                    ))}
                </div>

                {/* Loading text with gradient */}
                <motion.div
                    className="mt-12 relative"
                    animate={{
                        opacity: [0.5,1,0.5]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <h2 className="text-2xl font-bold tracking-widest bg-gradient-to-r from-blue-400 via-white to-blue-400 text-transparent bg-clip-text">
                        SPARKLE CAR WASH
                    </h2>
                </motion.div>
            </div>
        </div>
    );
};

export default Loading;
