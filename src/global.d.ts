import type React from 'react';

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'iconify-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
          icon?: string;
          style?: React.CSSProperties;
          class?: string;
          className?: string;
          inline?: boolean;
          width?: string | number;
          height?: string | number;
          rotate?: string | number;
          flip?: string;
        };
      }
    }
  }
}
