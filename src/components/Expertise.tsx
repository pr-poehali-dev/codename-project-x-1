import { useEffect, useRef, useState } from "react"
import { Sparkles, Home, Building2, Stars } from "lucide-react"
import { HighlightedText } from "./HighlightedText"

const expertiseAreas = [
  {
    title: "Химчистка ковролина в квартире",
    description: "Глубокая очистка ковролина экстрактором Santoema. Удаляем пятна, пыль и запахи, возвращаем покрытию свежий вид.",
    price: "от 150 ₽/м²",
    icon: Home,
  },
  {
    title: "Чистка ковровых покрытий в офисе",
    description: "Профессиональная химчистка больших площадей. Работаем в удобное время, не мешая рабочему процессу.",
    price: "от 120 ₽/м²",
    icon: Building2,
  },
  {
    title: "Выведение сложных пятен",
    description: "Удаляем застарелые загрязнения, следы от напитков, грязи и животных безопасной гипоаллергенной химией.",
    price: "от 200 ₽/м²",
    icon: Sparkles,
  },
  {
    title: "Антибактериальная обработка",
    description: "Дезинфекция и устранение запахов. Гипоаллергенные средства безопасны для детей и домашних животных.",
    price: "от 100 ₽/м²",
    icon: Stars,
  },
]

export function Expertise() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Услуги и цены</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
            <HighlightedText>Чистка</HighlightedText> любой
            <br />
            сложности
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Профессиональная химчистка ковролина и ковровых покрытий. Цены ориентировочные — точную стоимость рассчитаем после осмотра.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {expertiseAreas.map((area, index) => {
            const Icon = area.icon
            return (
              <div
                key={area.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`relative pl-8 border-l border-border transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`transition-all duration-1000 ${
                    visibleItems.includes(index) ? "animate-draw-stroke" : ""
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <Icon className="w-10 h-10 mb-4 text-foreground" strokeWidth={1.25} />
                </div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h3 className="text-xl font-medium">{area.title}</h3>
                  <span className="text-orange-500 font-medium whitespace-nowrap">{area.price}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{area.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}