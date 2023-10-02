export function prependAndExtractLastLine(lastLine, currentData) {
  const combinedData = `${lastLine}${currentData}`;
  // Remove ANSI escape codes
  const cleanedData = combinedData.replace(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]?/g, '');

  // Split on both \r and \n but not on \r\n
  const lines = cleanedData.split(/\r(?!\n)|\n/);

  return getValidLastLine(lines);
}

function getValidLastLine(lines) {
  if (lines.length === 0) return '';

  const lastLine = lines[lines.length - 1].trim();
  if (lastLine === '' || lastLine.endsWith('$') || lastLine.endsWith('%')) {
    return getValidLastLine(lines.slice(0, -1));  // recursive call with all but the last line
  }
  
  return lastLine;
}
