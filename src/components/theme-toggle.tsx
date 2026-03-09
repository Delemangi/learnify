import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

const cycle: Array<"system" | "light" | "dark"> = ["system", "light", "dark"];

const labels: Record<string, string> = {
  system: "Системска тема",
  light: "Светла тема",
  dark: "Темна тема",
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const next = () => {
    const idx = cycle.indexOf(theme);
    setTheme(cycle[(idx + 1) % cycle.length]);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={next}
      aria-label={labels[theme]}
      title={labels[theme]}
    >
      {theme === "light" && <Sun className="h-5 w-5" />}
      {theme === "dark" && <Moon className="h-5 w-5" />}
      {theme === "system" && <Monitor className="h-5 w-5" />}
    </Button>
  );
}
