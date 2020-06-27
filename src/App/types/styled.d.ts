// // import original module declarations
// import 'styled-components';

// // // and extend them!
// declare module 'styled-components' {
//   export interface DefaultTheme {
//     colors: {
//       [key: string]: string;
//     };
//     layout: {
//       [key: string]: string;
//     };
//     button: {
//       primary: {
//         default: {
//           [key: string]: string;
//         };
//       };
//     };
//   }
// }

import {} from 'styled-components';
import Theme from '../components/styled/Theme';
declare module 'styled-components' {
  export type TTheme = typeof Theme;
  export interface DefaultTheme extends TTheme {}
}
