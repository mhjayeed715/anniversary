"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { useState, useEffect, useCallback } from "react"

export default function GameScreen({ onNext }) {
    const [score, setScore] = useState(0)
    const [time, setTime] = useState(15)
    const [hearts, setHearts] = useState([])

    const handleNext = useCallback(() => {
        onNext()
    }, [onNext])

    useEffect(() => {
        if (time === 0 && score < 8) {
            // You can add a "try again" message here
            handleNext()
        } else if (score >= 8) {
            handleNext()
        }
    }, [time, score, handleNext])

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0))
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        const heartInterval = setInterval(() => {
            const newHeart = {
                id: Date.now(),
                x: Math.random() * (window.innerWidth - 100),
                y: Math.random() * (window.innerHeight - 200) + 100,
            }
            setHearts(prevHearts => [...prevHearts, newHeart])
        }, 1000)

        const heartDisappearInterval = setInterval(() => {
            setHearts(prevHearts => prevHearts.slice(1))
        }, 2000)

        return () => {
            clearInterval(heartInterval)
            clearInterval(heartDisappearInterval)
        }
    }, [])

    const handleHeartClick = (id) => {
        setHearts(hearts.filter(heart => heart.id !== id))
        setScore(score + 1)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 bg-gradient-to-br from-indigo-950 via-black to-purple-950 flex flex-col items-center justify-center text-white z-40"
        >
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-pink-400">Catch the Hearts</h2>
                <p className="text-lg mt-2 text-white/80">Tap 8 little hearts to unlock our next memory ❤️</p>
                <div className="flex justify-center gap-8 mt-4 text-2xl">
                    <p className="font-bold">Hearts: <span className="text-pink-400">{score}</span>/8</p>
                    <p className="font-bold">Time: <span className="text-pink-400">{time}</span>s</p>
                </div>
            </div>

            {hearts.map(heart => (
                <motion.div
                    key={heart.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    style={{
                        position: 'absolute',
                        left: heart.x,
                        top: heart.y,
                        cursor: 'pointer'
                    }}
                    onClick={() => handleHeartClick(heart.id)}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                >
                    <Heart size={48} className="text-pink-500 hover:text-pink-400" fill="currentColor" />
                </motion.div>
            ))}
        </motion.div>
    )
}