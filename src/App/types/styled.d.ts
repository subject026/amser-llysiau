// import original module declarations
import 'styled-components';

// // and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      [key: string]: string;
    };
    layout: {
      [key: string]: string;
    };
    button: {
      primary: {
        default: {
          [key: string]: string;
        };
      };
    };
  }
}
