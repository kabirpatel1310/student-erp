---
name: Institutional Trust
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#43474e'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#455f87'
  primary: '#022448'
  on-primary: '#ffffff'
  primary-container: '#1e3a5f'
  on-primary-container: '#8aa4cf'
  inverse-primary: '#adc8f5'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#1d252b'
  on-tertiary: '#ffffff'
  tertiary-container: '#333a41'
  on-tertiary-container: '#9ca4ac'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#adc8f5'
  on-primary-fixed: '#001c3b'
  on-primary-fixed-variant: '#2d486d'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#dce3ec'
  tertiary-fixed-dim: '#c0c7d0'
  on-tertiary-fixed: '#151c23'
  on-tertiary-fixed-variant: '#40484f'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-bold:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is engineered for high-stakes academic administration, prioritizing clarity, authority, and systematic efficiency. The brand personality is institutional and reliable, evoking the stability of a long-standing educational entity while maintaining the speed of modern enterprise software.

The visual style follows a **Corporate / Modern** aesthetic with a lean toward **Governmental Professionalism**. It utilizes a structured grid, high-contrast text for legibility, and a restrained use of color to direct user attention toward critical data points and status indicators. The environment is designed to feel spacious but dense with information, ensuring administrators can process large datasets without cognitive fatigue.

## Colors

The palette is anchored by **Navy (#1E3A5F)** to establish executive authority in headers and primary navigation. **Blue (#2563EB)** serves as the functional accent for interactive elements like links, primary buttons, and active states. 

Surface colors use **Light Blue (#EFF6FF)** for card backgrounds and container fills to subtly separate content from the **Pure White (#FFFFFF)** page background. Typography is strictly **Dark (#111827)** to ensure maximum WCAG accessibility. Semantic colors (Green, Red, Yellow) are reserved exclusively for status badges and data visualization to prevent visual noise.

## Typography

This design system utilizes **Inter** for all roles to leverage its exceptional legibility in data-heavy environments. The scale is highly disciplined:
- **Headlines:** Use Navy (#1E3A5F) with tighter letter spacing for a compact, authoritative feel.
- **Body Text:** Primarily 16px for readability, switching to 14px for dense data tables and sidebars.
- **Labels:** Uppercase with slight tracking is used for table headers and section overlines to differentiate them from actionable content.

## Layout & Spacing

The layout is based on a **Fixed Grid** system for desktop (1280px max-width) to maintain a consistent reading experience across large monitors. 

- **Desktop:** 12-column grid with 24px gutters and 40px outer margins.
- **Tablet:** 8-column grid with 16px gutters.
- **Mobile:** 4-column grid with 16px gutters; vertical stacking for all card-based content.

Spacing follows a strict 4px baseline. Use 16px (md) for standard internal padding in cards and 24px (lg) for vertical section spacing.

## Elevation & Depth

To maintain a "Government Portal" feel, this design system avoids aggressive shadows. Depth is communicated via **Low-contrast outlines** and subtle tonal layering.

- **Level 0 (Background):** White (#FFFFFF).
- **Level 1 (Cards/Containers):** Light Blue (#EFF6FF) with a 1px border in a darkened tint of the background (#D1E4FF). 
- **Interactive States:** On hover, cards may transition to a subtle ambient shadow (4px blur, 10% opacity Navy) to indicate interactivity.
- **Separators:** Use 1px solid lines (#E5E7EB) for horizontal rules in lists and tables.

## Shapes

The shape language is **Soft** but conservative. 
- **Standard Elements:** 4px (0.25rem) radius for buttons, input fields, and small components.
- **Large Containers:** 8px (0.5rem) radius for cards and modal overlays.
- **Status Badges:** 100px (full pill) to distinguish them from functional buttons.

This subtle rounding maintains a professional "printed document" feel while appearing modern and accessible.

## Components

### Buttons
- **Primary:** Navy (#1E3A5F) background, white text. No gradient. 
- **Secondary:** Transparent background, Blue (#2563EB) border and text.
- **Tertiary:** Light Blue (#EFF6FF) background, Blue (#2563EB) text.

### Status Badges
High-contrast text on a light background for maximum legibility:
- **Paid/Present:** Dark Green text on Light Green background.
- **Pending/Absent:** Dark Red text on Light Red background.
- **Partial:** Dark Yellow text on Light Yellow background.

### Input Fields
White background with a 1px grey border. On focus, the border changes to Blue (#2563EB) with a 2px outer glow of the same color at 20% opacity.

### Cards
Light Blue (#EFF6FF) fill with a 1px border. No shadows by default. Headers within cards should have a subtle bottom border to separate the title from the content body.

### Lists & Tables
Tables are the core of the system. Use a "Zebra Stripe" approach with White and Light Blue (#EFF6FF) rows. Header rows must be Navy (#1E3A5F) with White text for clear structural anchoring.