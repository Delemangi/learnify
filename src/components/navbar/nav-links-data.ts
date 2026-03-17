export type NavLink = {
  readonly href: string;
  readonly isRoute?: boolean;
  readonly label: string;
};

export const NAV_LINKS: NavLink[] = [
  { href: '/#courses', label: 'Предмети' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#contact', label: 'Контакт' },
  { href: '/about', isRoute: true, label: 'За нас' },
];
