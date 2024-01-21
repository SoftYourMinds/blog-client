export function extractTags(input: string): string[] {
    const tagRegex = /#(\w+)/g; // Regular expression to match hashtags
    const matches = input.match(tagRegex);
  
    if (matches) {
      // Remove the '#' symbol and create an array of tags
      return matches.map(match => match.substring(1));
    } else {
      return [];
    }
  }