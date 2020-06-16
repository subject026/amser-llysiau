const strings = 'clock within blog clock my laptop hour different each other created pig burger out beef He swore he just saw his sushi move If my calculator history embarrassing browser clouds cotton candy'.split(
  ' ',
);

const getString = () => strings[Math.floor(Math.random() * strings.length)];

export default (words: number): string => {
  let word = getString();
  for (let i = 1; i < words; i += 1) {
    word += ` ${getString()}`;
  }
  return word;
};
