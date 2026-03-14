import { useRef, useEffect, useMemo, Suspense, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, useGLTF, OrbitControls } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Box3, Vector3 } from 'three'

gsap.registerPlugin(ScrollTrigger)

const CAMERA_POSITION = [5, 2.5, 10]
const LIGHT_POS_1 = [5, 5, 5]
const LIGHT_POS_2 = [-5, 3, -5]
const MODEL_POS = [0, -0.5, 0]

function PlaceholderCar() {
  const groupRef = useRef()
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.3
  })
  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[2.2, 0.6, 4.8]} />
        <meshStandardMaterial color="#1ED760" wireframe transparent opacity={0.25} />
      </mesh>
      <mesh position={[0, 0.6, -0.3]}>
        <boxGeometry args={[1.8, 0.5, 2.4]} />
        <meshStandardMaterial color="#1ED760" wireframe transparent opacity={0.2} />
      </mesh>
      {[[-0.9, -0.3, 1.5], [0.9, -0.3, 1.5], [-0.9, -0.3, -1.5], [0.9, -0.3, -1.5]].map((pos, i) => (
        <mesh key={i} position={pos} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.35, 0.35, 0.2, 16]} />
          <meshStandardMaterial color="#1ED760" wireframe transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  )
}

class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

function ModelLoader() {
  const groupRef = useRef()
  const gltf = useGLTF('/models/bentley.glb')
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene])

  useEffect(() => {
    if (!scene) return
    scene.scale.set(1, 1, 1)
    scene.position.set(0, 0, 0)

    const box = new Box3().setFromObject(scene)
    const size = new Vector3()
    box.getSize(size)

    const maxDim = Math.max(size.x, size.y, size.z)
    if (maxDim === 0) return

    const scaleFactor = 8.5 / maxDim
    scene.scale.setScalar(scaleFactor)

    const scaledBox = new Box3().setFromObject(scene)
    const scaledCenter = new Vector3()
    scaledBox.getCenter(scaledCenter)

    scene.position.x -= scaledCenter.x
    scene.position.y -= scaledBox.min.y
    scene.position.z -= scaledCenter.z
  }, [scene])

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += 0.12 * delta
  })

  return (
    <group ref={groupRef} position={MODEL_POS}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/models/bentley.glb')

function BentleyModel() {
  return (
    <ModelErrorBoundary fallback={<PlaceholderCar />}>
      <Suspense fallback={<PlaceholderCar />}>
        <ModelLoader />
      </Suspense>
    </ModelErrorBoundary>
  )
}

export default function HeroStage() {
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const textRef = useRef(null)
  const barRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const anims = []

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    anims.push(tl)

    tl.fromTo(
      textRef.current,
      { scale: 0.88, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1 }
    )
      .fromTo(
        canvasRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: 'power2.out' },
        '-=0.7'
      )
      .fromTo(
        barRef.current,
        { opacity: 0, scaleY: 0, y: 10 },
        { opacity: 1, scaleY: 1, y: 0, duration: 0.6 },
        '-=0.4'
      )

    const barPulse = gsap.to(barRef.current, {
      opacity: 0.3,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: 'sine.inOut',
      delay: 1.5,
    })
    anims.push(barPulse)

    if (glowRef.current) {
      const glowPulse = gsap.to(glowRef.current, {
        opacity: 0.4,
        scale: 1.15,
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: 'sine.inOut',
      })
      anims.push(glowPulse)
    }

    const parallax = gsap.to(stageRef.current, {
      yPercent: -5,
      ease: 'none',
      scrollTrigger: {
        trigger: stageRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
    })
    anims.push(parallax)

    return () => {
      anims.forEach((a) => {
        if (a.scrollTrigger) a.scrollTrigger.kill()
        a.kill()
      })
    }
  }, [])

  return (
    <section
      ref={stageRef}
      className="relative w-full overflow-hidden"
      style={{
        height: '100%',
        minHeight: '600px',
        backgroundColor: 'transparent',
        willChange: 'transform',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: `radial-gradient(circle at center,
            rgba(30,215,96,0.12) 0%,
            rgba(30,215,96,0.03) 40%,
            transparent 70%)`,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: `
            linear-gradient(to right, rgba(6,13,8,0.5) 0%, transparent 15%, transparent 85%, rgba(6,13,8,0.5) 100%),
            linear-gradient(to bottom, rgba(6,13,8,0.3) 0%, transparent 20%, transparent 80%, rgba(6,13,8,0.4) 100%)
          `,
        }}
      />

      <div
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center z-[2] pointer-events-none select-none"
        style={{ opacity: 0 }}
      >
        <h1
          className="font-bold uppercase leading-none"
          style={{
            fontSize: 'clamp(60px, 10vw, 140px)',
            fontFamily: 'Montserrat, sans-serif',
            color: '#1ED760',
            opacity: 0.05,
            letterSpacing: '0.02em',
            lineHeight: 1,
          }}
        >
          BENTLEY
        </h1>
      </div>

      <div ref={canvasRef} className="absolute inset-0 z-[3]" style={{ opacity: 0 }}>
        <Canvas
          camera={{ position: CAMERA_POSITION, fov: 40 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minDistance={4}
            maxDistance={12}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
          />
          <ambientLight intensity={0.5} />
          <directionalLight position={LIGHT_POS_1} intensity={1.5} />
          <directionalLight position={LIGHT_POS_2} intensity={0.5} />
          <Environment preset="studio" />
          <BentleyModel />
        </Canvas>
      </div>

      <div
        ref={glowRef}
        className="absolute pointer-events-none z-4"
        style={{
          bottom: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '50%',
          height: '80px',
          background: 'radial-gradient(ellipse at center, rgba(30,215,96,0.10) 0%, rgba(30,215,96,0.02) 50%, transparent 80%)',
          filter: 'blur(24px)',
          willChange: 'transform, opacity',
        }}
      />

      <div
        ref={barRef}
        className="absolute top-1/2 -translate-y-1/2 z-[5]"
        style={{ right: '32px', opacity: 0, transformOrigin: 'center' }}
      >
        <div
          className="rounded-full"
          style={{
            width: '2px',
            height: '60px',
            backgroundColor: '#1ED760',
            opacity: 0.5,
          }}
        />
      </div>
    </section>
  )
}
