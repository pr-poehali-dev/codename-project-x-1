import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Ковролин в квартире",
    category: "Глубокая химчистка",
    location: "Результат до/после",
    year: "",
    image: "https://cdn.poehali.dev/projects/4baf3de1-dd67-4c5a-92bd-46b2ee1428d9/files/100f92bd-c84b-4eac-a915-007ee238f759.jpg",
  },
  {
    id: 2,
    title: "Чистка экстрактором",
    category: "Оборудование Santoema",
    location: "В процессе работы",
    year: "",
    image: "https://cdn.poehali.dev/projects/4baf3de1-dd67-4c5a-92bd-46b2ee1428d9/files/81f842cb-7f73-46b9-8bf8-f3dbab9ceb64.jpg",
  },
  {
    id: 3,
    title: "Свежесть покрытия",
    category: "После химчистки",
    location: "Результат работы",
    year: "",
    image: "https://cdn.poehali.dev/projects/4baf3de1-dd67-4c5a-92bd-46b2ee1428d9/files/a0a07440-4ee2-4d01-8d1f-761a7447f728.jpg",
  },
  {
    id: 4,
    title: "Роторная машина",
    category: "Профессиональная техника",
    location: "Оборудование из Италии",
    year: "",
    image: "https://cdn.poehali.dev/projects/4baf3de1-dd67-4c5a-92bd-46b2ee1428d9/files/0a111c87-4a0e-489c-9218-382ae6d2f7f1.jpg",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(projects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Фото до и после</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Наши работы</h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Заказать чистку
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === project.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {project.category} · {project.location}
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground/60 flex-shrink-0" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}