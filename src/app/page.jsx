"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LoaderScreen from "@/components/screens/LoaderScreen"
import IntroScreen from "@/components/screens/IntroScreen"
import AnniversaryScreen from "@/components/screens/AnniversaryScreen"
import GameScreen from "@/components/screens/GameScreen"
import PhotoGalleryScreen from "@/components/screens/PhotoGalleryScreen"
import MessageScreen from "@/components/screens/MessageScreen"
import { Music } from 'lucide-react'

export default function AnniversaryApp() {
  const [currentScreen, setCurrentScreen] = useState("loader")
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Audio autoplay was prevented:", error);
        });
      } else {
        audioRef.current.pause()
      }
    }
  }, [isMusicPlaying])

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying)
  }

  const goToIntro = () => {
    setCurrentScreen("intro")
    setIsMusicPlaying(true)
  }
  const goToAnniversary = () => setCurrentScreen("anniversary")
  const goToGame = () => setCurrentScreen("game")
  const goToGallery = () => setCurrentScreen("gallery")
  const goToMessage = () => setCurrentScreen("message")

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-950 via-black to-purple-950 overflow-hidden">
      <audio ref={audioRef} src="/background-music.mp3" loop />

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 text-white/50 hover:text-white"
      >
        <Music size={24} />
      </motion.button>

      <AnimatePresence mode="wait">
        {currentScreen === "loader" && <LoaderScreen key="loader" onComplete={goToIntro} />}
        {currentScreen === "intro" && <IntroScreen key="intro" onNext={goToAnniversary} />}
        {currentScreen === "anniversary" && <AnniversaryScreen key="anniversary" onNext={goToGame} />}
        {currentScreen === "game" && <GameScreen key="game" onNext={goToGallery} />}
        {currentScreen === "gallery" && <PhotoGalleryScreen key="gallery" onNext={goToMessage} />}
        {currentScreen === "message" && <MessageScreen key="message" />}
      </AnimatePresence>

     
    </div>
  )
}
