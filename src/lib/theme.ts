export const theme = {
  brand: {
    primary: "emerald-600",
    primaryHover: "emerald-700",
    primaryLight: "emerald-50",
    primaryText: "text-emerald-600",
    primaryBg: "bg-emerald-600",
    primaryBgHover: "hover:bg-emerald-700",
  },

  dark: {
    bg: "bg-gray-900",
    bgHover: "hover:bg-gray-800",
    text: "text-white",
  },

  bg: {
    page: "bg-white",
    dashboard: "bg-[#fafafa]",
    section: "bg-gray-50",
    card: "bg-white",
    sidebar: "bg-white",
  },

  text: {
    heading: "text-gray-900",
    body: "text-gray-600",
    muted: "text-gray-500",
    subtle: "text-gray-400",
  },

  border: {
    default: "border-gray-200/80",
    light: "border-gray-100",
    strong: "border-gray-300",
  },

  shadow: {
    card: "shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
    cardHover: "shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
    sm: "shadow-sm",
  },

  radius: {
    sm: "rounded-lg",
    md: "rounded-xl",
    full: "rounded-full",
  },

  typography: {
    heroTitle: "text-6xl font-bold tracking-tight",
    heroTitleSmall: "text-5xl font-bold tracking-tight",
    sectionTitle: "text-4xl font-bold",
    sectionTitleSmall: "text-3xl font-bold",
    pageTitle: "text-2xl font-semibold tracking-tight",
    cardTitle: "text-[15px] font-semibold",
    label: "text-[13px] font-medium",
    caption: "text-[12px]",
    bodyLarge: "text-lg",
    body: "text-sm",
  },

  spacing: {
    sectionY: "py-24",
    sectionYLg: "py-28",
    sectionYXl: "py-20",
    container: "mx-auto max-w-6xl px-6",
    containerNarrow: "mx-auto max-w-5xl px-6",
    pageContent: "p-1",
  },

  sidebar: {
    width: "w-[180px]",
    headerHeight: "h-[60px]",
  },
} as const;
