// BeWay Design System: props of every component in components/bundle.js. Documentation, not type-checked.
import * as React from "react";


export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: 'info' | 'success' | 'warning' | 'danger';
  title?: React.ReactNode;
  /** Lucide icon name; each tone has a default. */
  icon?: string;
  onDismiss?: () => void;
}
export declare function Alert(props: AlertProps): React.JSX.Element;

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  /** Used for initials and the accessible label. */
  name?: string;
  size?: number;
  shape?: 'rounded' | 'circle' | 'hexagon';
  alt?: string;
}
export declare function Avatar(props: AvatarProps): React.JSX.Element;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'accent' | 'navy' | 'success' | 'warning' | 'danger' | 'inverse';
  /** Lucide icon name rendered before the label. */
  icon?: string;
  /** Small status dot instead of an icon. */
  dot?: boolean;
}
export declare function Badge(props: BadgeProps): React.JSX.Element;

export interface Crumb { label: string; href?: string }
export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  /** Last item renders as the current page. */
  items?: Crumb[];
}
export declare function Breadcrumbs(props: BreadcrumbsProps): React.JSX.Element;

/**
 * BeWay action button.
 * @startingPoint section="Core" subtitle="Buttons, icon buttons, badges and tags" viewport="700x260"
 */
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children?: React.ReactNode;
  /** Render as a link: `href` makes it an <a>; combine with `as` to use your router's Link. Disabled links get aria-disabled and leave the tab order. */
  as?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
  /** primary = cyan (one per view); secondary = navy; outline/ghost = quiet; gradient = hero only. */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  /** Lucide icon name rendered before the label. */
  icon?: string;
  /** Lucide icon name rendered after the label — usually "arrow-right". */
  iconAfter?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  /** For dark navy surfaces and photos: secondary turns white, outline and ghost turn light. */
  onInverse?: boolean;
}
export declare function Button(props: ButtonProps): React.JSX.Element;

/**
 * Content container at the 16px card radius.
 * @startingPoint section="Core" subtitle="Card surfaces: light, sunken, inverse, gradient" viewport="700x300"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  surface?: 'light' | 'sunken' | 'inverse' | 'gradient';
  /** Any CSS length; defaults to var(--space-5). */
  padding?: string;
  /** Default 'none': the 1px border carries the card. Shadows only for floating things ('md', 'lg'). */
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  /** Adds hover lift + pointer for clickable cards. */
  interactive?: boolean;
}
export declare function Card(props: CardProps): React.JSX.Element;

/** Native <input type="checkbox">. id, name, value, required and aria-* props go to the input; the rest go to the wrapping label. */
export interface CheckboxProps extends Omit<React.HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  id?: string;
  name?: string;
  value?: string;
  required?: boolean;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean | 'true' | 'false';
  checked?: boolean;
  defaultChecked?: boolean;
  label?: React.ReactNode;
  /** Second muted line under the label. */
  description?: string;
  disabled?: boolean;
  onChange?: (next: boolean) => void;
}
export declare function Checkbox(props: CheckboxProps): React.JSX.Element;

export interface CompanyCardStat { icon?: string; value: React.ReactNode; label: string }
export interface CompanyCardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  name: string;
  category?: string;
  /** Lucide icon name next to the category. */
  categoryIcon?: string;
  description?: string;
  /** Cover photo URL. Omit for the brand gradient. */
  cover?: string;
  /** Logo URL, shown in a white chip. Falls back to the name's initial. */
  logo?: string;
  logoAlt?: string;
  /** Up to five tiles. */
  stats?: CompanyCardStat[];
  ctaLabel?: string;
  onView?: () => void;
}
export declare function CompanyCard(props: CompanyCardProps): React.JSX.Element;

/**
 * Centred modal over a navy blurred scrim.
 * @startingPoint section="Feedback" subtitle="Dialog, toast and tooltip" viewport="700x340"
 */
export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  /** Without a title, pass aria-label. */
  'aria-label'?: string;
  title?: React.ReactNode;
  description?: string;
  /** Right-aligned action row — usually two Buttons. */
  footer?: React.ReactNode;
  /** Called on Escape, scrim click and the close button. Without it the dialog cannot be dismissed by the user. */
  onClose?: (event?: React.SyntheticEvent) => void;
  /** Accessible label of the close button. */
  closeLabel?: string;
  /** Max width in px. 480 default, 640 for forms. */
  width?: number;
}
export declare function Dialog(props: DialogProps): React.JSX.Element;

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** accent = cyan tile, for invitations to act; neutral = grey tile, for plain empty results. */
  tone?: 'accent' | 'neutral';
  /** Lucide icon name. */
  icon?: string;
  title?: React.ReactNode;
  description?: string;
  /** Usually one Button. */
  action?: React.ReactNode;
}
export declare function EmptyState(props: EmptyStateProps): React.JSX.Element;

export interface FeatureCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Lucide icon name. */
  icon?: string;
  title?: React.ReactNode;
  description?: string;
}
export declare function FeatureCard(props: FeatureCardProps): React.JSX.Element;

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  /** Muted helper copy below the control. */
  hint?: string;
  /** Replaces hint and turns the message red. */
  error?: string;
  required?: boolean;
  /** Optional: Field generates an id for its single child when neither this nor the child's own id is set. */
  htmlFor?: string;
}
export declare function Field(props: FieldProps): React.JSX.Element;

export interface FooterLink { label: string; href?: string }
export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  assetBase?: string;
  /** Replaces the logo. */
  logo?: React.ReactNode;
  logoHeight?: number;
  links?: FooterLink[];
  legalLinks?: FooterLink[];
  copyright?: string;
}
export declare function Footer(props: FooterProps): React.JSX.Element;

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /** Lucide icon name, kebab-case or PascalCase (e.g. "arrow-right"). */
  name: string;
  /** Pixel box. 16 inline with small text, 20 default, 24 in nav, 32+ feature marks. */
  size?: number;
  /** Lucide default is 2. Use 1.5 only at 32px+. */
  strokeWidth?: number;
  /** Defaults to currentColor — colour the parent, not the icon. */
  color?: string;
}
export declare function Icon(props: IconProps): React.JSX.Element;

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render as a link: `href` makes it an <a>; combine with `as` to use your router's Link. */
  as?: React.ElementType;
  href?: string;
  /** Lucide icon name. */
  icon: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'outline' | 'solid';
  /** Required — becomes aria-label and the tooltip. */
  label: string;
  onInverse?: boolean;
  disabled?: boolean;
}
export declare function IconButton(props: IconButtonProps): React.JSX.Element;

/**
 * Single-line text field.
 * @startingPoint section="Forms" subtitle="Inputs, selects, checkboxes, radios and switches" viewport="700x330"
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Lucide icon name shown inside the left edge. */
  icon?: string;
  invalid?: boolean;
}
export declare function Input(props: InputProps): React.JSX.Element;

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * primary  — mark + wordmark + tagline, for light surfaces
   * negative — mark keeps its navy→cyan gradient, wordmark white (dark surfaces)
   * mono     — mark and wordmark all white (photography, busy dark surfaces)
   * stacked  — mark over centred wordmark + tagline (narrow / square spaces)
   * mark     — hexagon only, transparent background
   * auto     — primary on the light theme, negative on the dark theme
   */
  variant?: 'primary' | 'negative' | 'mono' | 'stacked' | 'mark' | 'auto';
  /** Rendered height in px. Minimum 24px for the mark, 32px for lockups. */
  height?: number;
  /** Path to the design system's assets folder. */
  assetBase?: string;
}
export declare function Logo(props: LogoProps): React.JSX.Element;

export interface LogoMarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Caps label above the row. Pass "" to omit. */
  label?: string;
  logos: { src: string; alt?: string }[];
  /** Logo height in px. Default 28. */
  height?: number;
  /** Opt-in slow horizontal scroll. */
  animate?: boolean;
}
export declare function LogoMarquee(props: LogoMarqueeProps): React.JSX.Element;

export interface NavBarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSubmit'> {
  tone?: 'light' | 'navy';
  /** Folder holding the logo PNGs. */
  assetBase?: string;
  /** Replaces the logo. */
  logo?: React.ReactNode;
  logoHeight?: number;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  loginLabel?: string;
  ctaLabel?: string;
  onLogin?: () => void;
  onCta?: () => void;
  /** Centre navigation links, left of the search. */
  links?: React.ReactNode;
  /** Replaces the login and CTA buttons (signed-in state). */
  actions?: React.ReactNode;
}
export declare function NavBar(props: NavBarProps): React.JSX.Element;

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  page?: number;
  pageCount?: number;
  onChange?: (page: number) => void;
}
export declare function Pagination(props: PaginationProps): React.JSX.Element;

export interface PhotoProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  overlay?: 'hero' | 'card' | 'none';
  /** CSS aspect-ratio, e.g. "16 / 9". */
  ratio?: string;
  height?: number | string;
  radius?: number | string;
  /** Content layered above the overlay. */
  children?: React.ReactNode;
}
export declare function Photo(props: PhotoProps): React.JSX.Element;

/** Native <input type="radio">. id, name, value, required and aria-* props go to the input; the rest go to the wrapping label. */
export interface RadioProps extends Omit<React.HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  id?: string;
  name?: string;
  value?: string;
  required?: boolean;
  checked?: boolean;
  label?: React.ReactNode;
  description?: string;
  disabled?: boolean;
  /** Called with the radio's `value`. */
  onChange?: (value?: string) => void;
}
export declare function Radio(props: RadioProps): React.JSX.Element;

export interface RadioGroupOption { value: string; label: string; description?: string; /** Disables just this option. */ disabled?: boolean }
export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options?: (string | RadioGroupOption)[];
  value?: string;
  onChange?: (value: string) => void;
  direction?: 'row' | 'column';
  /** Shared name of the native radios; generated when omitted. */
  name?: string;
  /** Disables every option. */
  disabled?: boolean;
}
export declare function RadioGroup(props: RadioGroupProps): React.JSX.Element;

export interface SectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  onInverse?: boolean;
  align?: 'left' | 'center';
}
export declare function SectionLabel(props: SectionLabelProps): React.JSX.Element;

export interface SelectOption { value: string; label: string }

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Strings or {value,label} pairs. */
  options?: (string | SelectOption)[];
  invalid?: boolean;
}
export declare function Select(props: SelectProps): React.JSX.Element;

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  width?: number | string;
  height?: number | string;
  /** Round placeholder; width follows height. */
  circle?: boolean;
  radius?: number | string;
  /** Opt-in slow pulse. Skipped when the user prefers reduced motion. */
  animate?: boolean;
}
export declare function Skeleton(props: SkeletonProps): React.JSX.Element;

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  value: React.ReactNode;
  label: string;
  /** Lucide icon name above the value. */
  icon?: string;
  align?: 'center' | 'left';
  onInverse?: boolean;
}
export declare function Stat(props: StatProps): React.JSX.Element;

export interface StatStripProps extends React.HTMLAttributes<HTMLDivElement> {
  items: { value: React.ReactNode; label: string; icon?: string }[];
  onInverse?: boolean;
}
export declare function StatStrip(props: StatStripProps): React.JSX.Element;

export interface StepNavStep {
  label: string;
  /** Optional second line under the label. */
  hint?: string;
  /** Overrides the state derived from `current` / `completed`. */
  status?: 'done' | 'current' | 'todo';
}

/**
 * Vertical progress rail for multi-step forms (Pre-Registro, Live CV).
 * Hexagonal markers echo the BeWay mark; the connector fills cyan as steps complete. The current marker is flat cyan with no glow.
 */
export interface StepNavProps extends React.HTMLAttributes<HTMLElement> {
  steps: (string | StepNavStep)[];
  /** Index of the step being edited. */
  current?: number;
  /** Explicit list of completed indices; without it every step before `current` is done. */
  completed?: number[];
  /** Micro-caps eyebrow above the percentage. */
  title?: string;
  /** Overrides the computed completion percentage. */
  percent?: number;
  /** Replaces the "N de M secciones completadas" line. */
  meta?: string;
  /** Makes steps clickable. Omitted = read-only rail. */
  onSelect?: (index: number) => void;
  /** Navy sidebar variant. */
  onInverse?: boolean;
  /** CSS width of the nav. Default '100%' (fills its column); pass 300 for a fixed rail. */
  width?: string | number;
  /** Slot pinned to the bottom, above a hairline — account links, help. */
  footer?: React.ReactNode;
}
export declare function StepNav(props: StepNavProps): React.JSX.Element;

/** Native <input type="checkbox" role="switch">. id, name, value, required and aria-* props go to the input; the rest go to the wrapping label. */
export interface SwitchProps extends Omit<React.HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  id?: string;
  name?: string;
  value?: string;
  required?: boolean;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean | 'true' | 'false';
  checked?: boolean;
  defaultChecked?: boolean;
  label?: React.ReactNode;
  disabled?: boolean;
  onChange?: (next: boolean) => void;
}
export declare function Switch(props: SwitchProps): React.JSX.Element;

export interface TableColumn<T = any> {
  key: string;
  header: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: number | string;
  render?: (row: T) => React.ReactNode;
}
export interface TableProps<T = any> extends React.HTMLAttributes<HTMLDivElement> {
  columns: TableColumn<T>[];
  rows: T[];
  /** Property used as React key. Default "id". */
  rowKey?: string;
  caption?: React.ReactNode;
  dense?: boolean;
  onRowClick?: (row: T) => void;
  /** Rendered under the table when rows is empty. */
  empty?: React.ReactNode;
}
export declare function Table(props: TableProps): React.JSX.Element;

export interface TabItem { value: string; label: string; icon?: string; count?: number }

/**
 * Underlined tab bar.
 * @startingPoint section="Navigation" subtitle="Tab bar, breadcrumbs and pagination" viewport="700x220"
 */
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: (string | TabItem)[];
  value?: string;
  onChange?: (value: string) => void;
  onInverse?: boolean;
}
export declare function Tabs(props: TabsProps): React.JSX.Element;

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Renders a remove affordance and fires on click. */
  onRemove?: (e: React.MouseEvent) => void;
  /** Filled pill. Navy for the default variant, cyan for variant="filter". */
  selected?: boolean;
  /** "filter" = category filter chip, cyan when selected. "default" = any other tag, navy when selected. */
  variant?: 'default' | 'filter';
  onClick?: (e: React.MouseEvent) => void;
}
export declare function Tag(props: TagProps): React.JSX.Element;

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
  disabled?: boolean;
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}
export declare function Textarea(props: TextareaProps): React.JSX.Element;

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: 'info' | 'success' | 'warning' | 'danger';
  title?: React.ReactNode;
  message?: string;
  onDismiss?: () => void;
}
export declare function Toast(props: ToastProps): React.JSX.Element;

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}
export declare function Tooltip(props: TooltipProps): React.JSX.Element;
