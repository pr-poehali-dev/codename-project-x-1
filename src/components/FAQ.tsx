import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Сколько сохнет ковролин после чистки?",
    answer:
      "Благодаря профессиональному экстрактору Santoema покрытие остаётся лишь слегка влажным. Полное высыхание занимает обычно от 3 до 6 часов в зависимости от толщины ковролина и проветривания помещения.",
  },
  {
    question: "Безопасна ли ваша химия для детей и животных?",
    answer:
      "Да. Мы используем только сертифицированные безопасные и гипоаллергенные средства. После высыхания покрытие полностью безопасно для детей, аллергиков и домашних животных.",
  },
  {
    question: "На каком оборудовании вы работаете?",
    answer:
      "Мы используем профессиональную роторную машину и экстрактор итальянского производства фирмы Santoema. Это оборудование обеспечивает глубокую очистку волокон и бережно относится к покрытию.",
  },
  {
    question: "В какое время вы работаете?",
    answer:
      "Мы работаем в удобное для клиента время — выберем час, который подходит именно вам, в том числе в выходные. Никаких переплат за срочность.",
  },
  {
    question: "Сколько стоит химчистка ковролина?",
    answer:
      "Цены начинаются от 100 ₽/м² и зависят от площади, типа покрытия и степени загрязнения. Точную стоимость мы рассчитаем после осмотра — звоните, и мы подскажем ориентир по телефону.",
  },
  {
    question: "Можно ли увидеть результат до и после?",
    answer:
      "Конечно. На сайте есть фото работ до и после, а также видео процесса. По запросу можем показать ещё примеры наших работ.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}