import { motion } from 'framer-motion';

const Loading = () => {
    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
            <div className="relative">
                {/* Main spinning circle */}
                <motion.div
                    className="w-24 h-24"
                    animate={{
                        rotate: 360
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {/* Create multiple dots in a circle */}
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-3 h-3 bg-white rounded-full"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `rotate(${i * 30}deg) translate(0, -150%)`,
                                transformOrigin: '50% 150%'
                            }}
                            animate={{
                                opacity: [0.2, 1, 0.2],
                                scale: [0.8, 1, 0.8]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.1,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </motion.div>

                {/* Center logo or icon */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-foreground rounded-full"
                    animate={{
                        scale: [0.8, 1, 0.8],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div className="w-full h-full bg-gradient-to-br from-foreground to-white/50 rounded-full" />
                </motion.div>
            </div>
        </div>
    );
};

export default Loading;
