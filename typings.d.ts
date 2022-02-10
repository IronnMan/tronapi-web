declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

declare module 'lodash.find';
declare module 'lodash.filter';
declare module 'lodash.uniqueid';
declare module 'crypto-js';
declare module 'react-color';
declare module 'react-copy-to-clipboard';
