import React, {type ReactNode} from 'react';
import Copyright from '@theme-original/Footer/Copyright';
import type CopyrightType from '@theme/Footer/Copyright';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof CopyrightType>;

export default function CopyrightWrapper(props: Props): ReactNode {
  return (
    <div style={{ display: 'grid', placeItems: 'center' }}>
      <div style={{ alignItems: 'center', display: 'grid', gridAutoFlow: 'column', gap: 10 }}>
        <Copyright copyright={`Copyright © ${new Date().getFullYear()} GlyphCat`} />
        <span style={{ fontSize: '9pt', opacity: 0.5 }}>{'( • ω • )'}</span>
      </div>
    </div>
  );
}
