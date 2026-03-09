import { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Users,
  Clock,
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle,
  Code,
  Database,
  Brain,
  Monitor,
  Calculator,
  Network,
  ShieldCheck,
  Cpu,
  Instagram,
  BarChart3,
  FlaskConical,
  Smartphone,
  Layers,
  Search,
  ClipboardCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/hooks/use-theme";
import { ThemeToggle } from "@/components/theme-toggle";
import { AnimateIn } from "@/components/animate-in";
import {
  coursesBySemester,
  semesters,
  type CourseData,
  type IconKey,
  type Semester,
} from "@/data/courses";

const ICON_MAP: Record<IconKey, LucideIcon> = {
  code: Code,
  monitor: Monitor,
  calculator: Calculator,
  brain: Brain,
  database: Database,
  cpu: Cpu,
  network: Network,
  shield: ShieldCheck,
  "bar-chart": BarChart3,
  flask: FlaskConical,
  smartphone: Smartphone,
  users: Users,
  layers: Layers,
  search: Search,
  test: ClipboardCheck,
};

const features = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Индивидуален пристап",
    description: "Секој студент добива персонализирана програма за учење.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Флексибилен распоред",
    description: "Часовите се закажуваат по договор, во термин кој ви одговара.",
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "Искусни тутори",
    description:
      "Предавачи со реално искуство во индустријата и академијата.",
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Подготовка за испити",
    description:
      "Фокус на стари испитни задачи, колоквиуми и практични вежби.",
  },
];

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2 font-bold text-xl">
          <GraduationCap className="h-7 w-7 text-primary" />
          <span>learnify.mk</span>
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a
            href="#courses"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Предмети
          </a>
          <a
            href="#about"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            За нас
          </a>
          <a
            href="#contact"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Контакт
          </a>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#contact">Закажи час</a>
          </Button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-125 w-200 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <AnimateIn>
          <Badge variant="secondary" className="mb-6 text-sm">
            <BookOpen className="mr-1.5 h-3.5 w-3.5" />
            Приватни часови
          </Badge>
        </AnimateIn>

        <AnimateIn delay={100}>
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Чиста Десетка
          </h1>
        </AnimateIn>

        <AnimateIn delay={200}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Приватни часови за студенти од Факултетот за информатички науки и
            компјутерско инженерство. Научи повеќе, разбери подобро, положи
            полесно.
          </p>
        </AnimateIn>

        <AnimateIn delay={350}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#courses">
                <BookOpen className="mr-2 h-5 w-5" />
                Погледни предмети
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact">
                <Phone className="mr-2 h-5 w-5" />
                Контактирај нè
              </a>
            </Button>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

function CourseCard({ course, index }: { course: CourseData; index: number }) {
  const Icon = ICON_MAP[course.icon];
  return (
    <AnimateIn delay={index * 75}>
      <Card className="group relative flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {course.popular && (
          <div className="absolute -top-2.5 right-4">
            <Badge className="bg-amber-500 text-white hover:bg-amber-600 shadow-sm">
              <Star className="mr-1 h-3 w-3" /> Популарен
            </Badge>
          </div>
        )}
        <CardHeader>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
            <Icon className="h-8 w-8" />
          </div>
          <CardTitle className="text-lg">{course.title}</CardTitle>
          <CardDescription>{course.semester} семестар</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm text-muted-foreground">{course.description}</p>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2">
          {course.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </AnimateIn>
  );
}

function CoursesSection() {
  const [active, setActive] = useState<Semester | "Сите">("Сите");

  const displayed =
    active === "Сите"
      ? semesters.flatMap((s) => coursesBySemester[s])
      : coursesBySemester[active];

  return (
    <section id="courses" className="py-20 sm:py-28 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Предмети
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Нудиме приватни часови за најбараните предмети од ФИНКИ. Доколку
              твојот предмет не е наведен, контактирај нè.
            </p>
          </div>
        </AnimateIn>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {(["Сите", ...semesters] as const).map((label) => (
            <Button
              key={label}
              variant={active === label ? "default" : "outline"}
              size="sm"
              onClick={() => setActive(label)}
            >
              {label === "Сите"
                ? "Сите предмети"
                : `${label} семестар`}
            </Button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayed.map((course, index) => (
            <CourseCard key={course.title} course={course} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Зошто Learnify?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Знаеме колку е тешко на ФИНКИ. Затоа сме тука — да ти помогнеме
              да ги разбереш концептите и да положиш со одлична оценка.
            </p>
          </div>
        </AnimateIn>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <AnimateIn key={feature.title} delay={index * 100}>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Контакт
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Јави се за да закажеме бесплатен воведен час и да направиме план за
              учење специјално за тебе.
            </p>
          </div>
        </AnimateIn>

        <div className="mx-auto mt-12 grid max-w-3xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimateIn delay={0}>
            <Card className="text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <CardTitle className="text-base">Телефон</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="tel:+38970123456"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  +389 70 123 456
                </a>
              </CardContent>
            </Card>
          </AnimateIn>

          <AnimateIn delay={100}>
            <Card className="text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <CardTitle className="text-base">Е-пошта</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:info@learnify.mk"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  info@learnify.mk
                </a>
              </CardContent>
            </Card>
          </AnimateIn>

          <AnimateIn delay={200} className="sm:col-span-2 lg:col-span-1">
            <Card className="text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Instagram className="h-6 w-6" />
                </div>
                <CardTitle className="text-base">Instagram</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="https://instagram.com/learnify.mk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  @learnify.mk
                </a>
              </CardContent>
            </Card>
          </AnimateIn>
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            Скопје, Северна Македонија
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm font-medium">
            <GraduationCap className="h-5 w-5 text-primary" />
            learnify.mk
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Learnify.mk. Сите права
            задржани.
          </p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <CoursesSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
