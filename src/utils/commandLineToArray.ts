const commandLineToArray = (commandLine: string): string[] => {
  // `aa "bb cc" 'dd' ee` => ['aa', 'bb cc', 'dd', 'ee']
  const regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
  const result = [];
  let match;
  while ((match = regex.exec(commandLine))) {
    result.push(match[1] || match[2] || match[0]);
  }
  return result;
}

export default commandLineToArray;