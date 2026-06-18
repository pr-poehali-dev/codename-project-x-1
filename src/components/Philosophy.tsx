import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const philosophyItems = [
  {
    title: "Оборудование Santoema (Италия)",
    description:
      "Работаем на профессиональной роторной машине и экстракторе итальянского производства фирмы Santoema. Глубокая очистка волокон без вреда для покрытия.",
  },
  {
    title: "Безопасная гипоаллергенная химия",
    description:
      "Используем только сертифицированные безопасные и гипоаллергенные средства. Они подходят для семей с детьми, аллергиками и домашними животными.",
  },
  {
    title: "Удобное для вас время",
    description:
      "Работаем в комфортное для клиента время — приедем, когда удобно именно вам, без выходных и переплат за срочность.",
  },
  {
    title: "Видимый результат до/после",
    description: "Показываем реальные фото и видео работ. Вы увидите состояние ковролина до и после нашей чистки своими глазами.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
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
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Title and image */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Почему мы</p>
            <h2 className="text-6xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
              Чистота с
              <br />
              <HighlightedText>гарантией</HighlightedText>
            </h2>

            <div className="relative hidden lg:block">
              <img
                src="https://cdn.poehali.dev/projects/4baf3de1-dd67-4c5a-92bd-46b2ee1428d9/files/0a111c87-4a0e-489c-9218-382ae6d2f7f1.jpg"
                alt="Профессиональный экстрактор Santoema"
                className="opacity-90 relative z-10 w-auto rounded-lg"
              />
            </div>
          </div>

          {/* Right column - Description and Philosophy items */}
          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              Химчистка ковролина — это не просто уборка. Это здоровая атмосфера в вашем доме или офисе. Мы возвращаем покрытиям свежесть и чистоту, заботясь о вашем комфорте.
            </p>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-muted-foreground/50 text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}