import {
  BarChart3,
  BookOpen,
  Brain,
  Calculator,
  CheckCircle,
  ClipboardCheck,
  Clock,
  Code,
  Cpu,
  Database,
  FlaskConical,
  GraduationCap,
  Layers,
  type LucideIcon,
  Mail,
  MapPin,
  Monitor,
  Network,
  Phone,
  Search,
  ShieldCheck,
  Smartphone,
  Star,
  Users,
} from 'lucide-react';
import { useState } from 'react';

import { AnimateIn } from '@/components/animate-in';
import { ThemeToggle } from '@/components/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  type CourseData,
  coursesBySemester,
  type IconKey,
  type Semester,
  semesters,
} from '@/data/courses';
import { ThemeProvider } from '@/hooks/use-theme';

const ICON_MAP: Record<IconKey, LucideIcon> = {
  'bar-chart': BarChart3,
  brain: Brain,
  calculator: Calculator,
  code: Code,
  cpu: Cpu,
  database: Database,
  flask: FlaskConical,
  layers: Layers,
  monitor: Monitor,
  network: Network,
  search: Search,
  shield: ShieldCheck,
  smartphone: Smartphone,
  test: ClipboardCheck,
  users: Users,
};

const features = [
  {
    description: 'Секој студент добива персонализирана програма за учење.',
    icon: <Users className="h-6 w-6" />,
    title: 'Индивидуален пристап',
  },
  {
    description:
      'Часовите се закажуваат по договор, во термин кој ви одговара.',
    icon: <Clock className="h-6 w-6" />,
    title: 'Флексибилен распоред',
  },
  {
    description: 'Предавачи со реално искуство во индустријата и академијата.',
    icon: <Star className="h-6 w-6" />,
    title: 'Искусни тутори',
  },
  {
    description: 'Фокус на стари испитни задачи, колоквиуми и практични вежби.',
    icon: <CheckCircle className="h-6 w-6" />,
    title: 'Подготовка за испити',
  },
];

const Navbar = () => (
  <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <a
        className="flex items-center gap-2 font-bold text-xl"
        href="#"
      >
        <GraduationCap className="h-7 w-7 text-primary" />
        <span>learnify.mk</span>
      </a>
      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        <a
          className="text-muted-foreground hover:text-foreground transition-colors"
          href="#courses"
        >
          Предмети
        </a>
        <a
          className="text-muted-foreground hover:text-foreground transition-colors"
          href="#about"
        >
          За нас
        </a>
        <a
          className="text-muted-foreground hover:text-foreground transition-colors"
          href="#contact"
        >
          Контакт
        </a>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button
          asChild
          className="hidden sm:inline-flex"
          size="sm"
        >
          <a href="#contact">Закажи час</a>
        </Button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative overflow-hidden py-20 sm:py-32">
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-24 left-1/2 h-125 w-200 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
    </div>

    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
      <AnimateIn>
        <Badge
          className="mb-6 text-sm"
          variant="secondary"
        >
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
          <Button
            asChild
            size="lg"
          >
            <a href="#courses">
              <BookOpen className="mr-2 h-5 w-5" />
              Погледни предмети
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
          >
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

const CourseCard = ({
  course,
  index,
}: {
  readonly course: CourseData;
  readonly index: number;
}) => {
  const Icon = ICON_MAP[course.icon];
  const visibleTags = course.tags.slice(0, 2);
  const remainingTags = course.tags.length - visibleTags.length;

  return (
    <AnimateIn delay={index * 75}>
      <Card className="group relative flex h-full flex-col border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {course.popular ? (
          <div className="absolute -top-2.5 right-4">
            <Badge className="bg-amber-500 text-white hover:bg-amber-600 shadow-sm">
              <Star className="mr-1 h-3 w-3" /> Популарен
            </Badge>
          </div>
        ) : null}
        <CardHeader className="space-y-3 pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
              <Icon className="h-7 w-7" />
            </div>
            <Badge
              className="shrink-0"
              variant="outline"
            >
              {course.semester === 'winter' ? 'Зимски' : 'Летен'}
            </Badge>
          </div>
          <CardTitle className="text-lg">{course.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-4">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {course.description}
          </p>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 pt-0">
          {visibleTags.map((tag) => (
            <Badge
              className="text-xs"
              key={tag}
              variant="secondary"
            >
              {tag}
            </Badge>
          ))}
          {remainingTags > 0 ? (
            <Badge
              className="text-xs"
              variant="secondary"
            >
              +{remainingTags}
            </Badge>
          ) : null}
        </CardFooter>
      </Card>
    </AnimateIn>
  );
};

const COLLAPSED_COUNT = 8;

const CoursesSection = () => {
  const [active, setActive] = useState<'Сите' | Semester>('Сите');
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');

  const allCourses = (
    active === 'Сите'
      ? semesters.flatMap((s) => coursesBySemester[s])
      : [...coursesBySemester[active]]
  ).sort((a, b) => Number(Boolean(b.popular)) - Number(Boolean(a.popular)));

  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  const filtered = allCourses.filter((course) => {
    if (!normalizedQuery) {
      return true;
    }

    return [course.title, course.description, ...course.tags]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery);
  });

  const visible =
    isSearching || expanded ? filtered : filtered.slice(0, COLLAPSED_COUNT);
  const hiddenCount = filtered.length - visible.length;

  const handleFilterChange = (label: 'Сите' | Semester) => {
    setActive(label);
    setExpanded(false);
  };

  return (
    <section
      className="py-20 sm:py-28 bg-muted/40"
      id="courses"
    >
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

        <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              className="h-11 w-full rounded-full border border-border/70 bg-background pl-11 pr-4 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              placeholder="Пребарај предмет..."
              type="search"
              value={query}
            />
          </div>

          <div className="flex shrink-0 items-center justify-center gap-1.5">
            {(['Сите', ...semesters] as const).map((label) => (
              <Button
                key={label}
                onClick={() => {
                  handleFilterChange(label);
                }}
                size="sm"
                variant={active === label ? 'default' : 'outline'}
              >
                {label === 'Сите'
                  ? 'Сите'
                  : label === 'winter'
                    ? 'Зимски'
                    : 'Летен'}
              </Button>
            ))}
          </div>
        </div>

        {isSearching ? (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {filtered.length === 0
              ? 'Нема резултати'
              : `${filtered.length} ${filtered.length === 1 ? 'предмет' : 'предмети'}`}
          </p>
        ) : null}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((course, index) => (
            <CourseCard
              course={course}
              index={index}
              key={course.title}
            />
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-border/70 bg-muted/30 px-6 py-10 text-center">
            <p className="text-base font-medium">Нема пронајдени предмети</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Обиди се со друго име на предмет, ознака или клучен поим.
            </p>
          </div>
        ) : null}

        {!isSearching && hiddenCount > 0 ? (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => {
                setExpanded(true);
              }}
              size="lg"
              variant="outline"
            >
              Прикажи уште {hiddenCount} предмети
            </Button>
          </div>
        ) : null}

        {!isSearching && expanded && filtered.length > COLLAPSED_COUNT ? (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => {
                setExpanded(false);
              }}
              size="lg"
              variant="ghost"
            >
              Прикажи помалку
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

const AboutSection = () => (
  <section
    className="py-20 sm:py-28"
    id="about"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <AnimateIn>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Зошто Learnify?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Знаеме колку е тешко на ФИНКИ. Затоа сме тука — да ти помогнеме да
            ги разбереш концептите и да положиш со одлична оценка.
          </p>
        </div>
      </AnimateIn>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <AnimateIn
            delay={index * 100}
            key={feature.title}
          >
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

const ContactSection = () => (
  <section
    className="py-20 sm:py-28 bg-muted/40"
    id="contact"
  >
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
                className="text-muted-foreground hover:text-foreground transition-colors"
                href="tel:+38970123456"
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
                className="text-muted-foreground hover:text-foreground transition-colors"
                href="mailto:info@learnify.mk"
              >
                info@learnify.mk
              </a>
            </CardContent>
          </Card>
        </AnimateIn>

        <AnimateIn
          className="sm:col-span-2 lg:col-span-1"
          delay={200}
        >
          <Card className="text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect
                    height="20"
                    rx="5"
                    ry="5"
                    width="20"
                    x="2"
                    y="2"
                  />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line
                    x1="17.5"
                    x2="17.51"
                    y1="6.5"
                    y2="6.5"
                  />
                </svg>
              </div>
              <CardTitle className="text-base">Instagram</CardTitle>
            </CardHeader>
            <CardContent>
              <a
                className="text-muted-foreground hover:text-foreground transition-colors"
                href="https://instagram.com/learnify.mk"
                rel="noopener noreferrer"
                target="_blank"
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

const Footer = () => (
  <footer className="border-t py-8">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2 text-sm font-medium">
          <GraduationCap className="h-5 w-5 text-primary" />
          learnify.mk
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Learnify.mk. Сите права задржани.
        </p>
      </div>
    </div>
  </footer>
);

const App = () => (
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

export default App;
